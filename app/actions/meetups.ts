'use server';

import { z } from 'zod';
import { createClient } from '@/app/lib/supabase-server';

/* ── Validation ── */
const meetupSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(120, 'Title is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description is too long'),
  location: z.string().min(2, 'Location is required').max(200, 'Location is too long'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  maxAttendees: z.coerce.number().min(2, 'At least 2 attendees').max(200, 'Max 200 attendees'),
});

export type MeetupState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export type Meetup = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  max_attendees: number;
  created_by: string;
  creator_name: string;
  created_at: string;
  rsvp_count: number;
  user_rsvped?: boolean;
};

/* ── Create a meetup ── */
export async function createMeetup(
  _prev: MeetupState,
  formData: FormData
): Promise<MeetupState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'You must be signed in to create a meetup.' };
  }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    location: formData.get('location'),
    date: formData.get('date'),
    time: formData.get('time'),
    maxAttendees: formData.get('maxAttendees'),
  };

  const validated = meetupSchema.safeParse(raw);
  if (!validated.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { title, description, location, date, time, maxAttendees } = validated.data;
  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';

  const { error } = await supabase.from('meetups').insert({
    title,
    description,
    location,
    date,
    time,
    max_attendees: maxAttendees,
    created_by: user.id,
    creator_name: fullName,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: 'Meetup created successfully!' };
}

/* ── List meetups ── */
export async function getMeetups(): Promise<Meetup[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: meetups, error } = await supabase
    .from('meetups')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error || !meetups) return [];

  // Get RSVP counts
  const meetupIds = meetups.map((m: Record<string, unknown>) => m.id as string);
  const { data: rsvps } = await supabase
    .from('meetup_rsvps')
    .select('meetup_id')
    .in('meetup_id', meetupIds);

  // Get user's RSVPs
  let userRsvps: Set<string> = new Set();
  if (user) {
    const { data: myRsvps } = await supabase
      .from('meetup_rsvps')
      .select('meetup_id')
      .eq('user_id', user.id);
    userRsvps = new Set((myRsvps || []).map((r: Record<string, unknown>) => r.meetup_id as string));
  }

  // Count RSVPs per meetup
  const rsvpCounts: Record<string, number> = {};
  (rsvps || []).forEach((r: Record<string, unknown>) => {
    const mid = r.meetup_id as string;
    rsvpCounts[mid] = (rsvpCounts[mid] || 0) + 1;
  });

  return meetups.map((m: Record<string, unknown>) => ({
    id: m.id as string,
    title: m.title as string,
    description: m.description as string,
    location: m.location as string,
    date: m.date as string,
    time: m.time as string,
    max_attendees: m.max_attendees as number,
    created_by: m.created_by as string,
    creator_name: m.creator_name as string,
    created_at: m.created_at as string,
    rsvp_count: rsvpCounts[m.id as string] || 0,
    user_rsvped: userRsvps.has(m.id as string),
  }));
}

/* ── RSVP / un-RSVP ── */
export async function toggleRsvp(meetupId: string): Promise<{ success: boolean; message: string; rsvped: boolean }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'You must be signed in to RSVP.', rsvped: false };
  }

  // Check if already RSVPed
  const { data: existing } = await supabase
    .from('meetup_rsvps')
    .select('id')
    .eq('meetup_id', meetupId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    // Un-RSVP
    await supabase.from('meetup_rsvps').delete().eq('id', existing.id);
    return { success: true, message: 'RSVP cancelled.', rsvped: false };
  }

  // Check max attendees
  const { data: meetup } = await supabase
    .from('meetups')
    .select('max_attendees')
    .eq('id', meetupId)
    .single();

  const { count } = await supabase
    .from('meetup_rsvps')
    .select('*', { count: 'exact', head: true })
    .eq('meetup_id', meetupId);

  if (meetup && count !== null && count >= (meetup.max_attendees as number)) {
    return { success: false, message: 'This meetup is full.', rsvped: false };
  }

  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';

  const { error } = await supabase.from('meetup_rsvps').insert({
    meetup_id: meetupId,
    user_id: user.id,
    user_name: fullName,
  });

  if (error) {
    return { success: false, message: error.message, rsvped: false };
  }

  return { success: true, message: 'RSVP confirmed!', rsvped: true };
}

/* ── Delete a meetup (creator only) ── */
export async function deleteMeetup(meetupId: string): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: 'You must be signed in.' };
  }

  // Verify ownership
  const { data: meetup } = await supabase
    .from('meetups')
    .select('created_by')
    .eq('id', meetupId)
    .single();

  if (!meetup || (meetup.created_by as string) !== user.id) {
    return { success: false, message: 'You can only delete meetups you created.' };
  }

  // Delete RSVPs first, then meetup
  await supabase.from('meetup_rsvps').delete().eq('meetup_id', meetupId);
  await supabase.from('meetups').delete().eq('id', meetupId);

  return { success: true, message: 'Meetup deleted.' };
}
