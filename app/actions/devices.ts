'use server';

import { createClient } from '@/app/lib/supabase-server';
import { supabase } from '@/app/lib/supabase';
import { redirect } from 'next/navigation';

export type PairState = { error?: string; success?: boolean };

export async function pairDevice(_prev: PairState, formData: FormData): Promise<PairState> {
  const code = (formData.get('pairingCode') as string)?.trim().toUpperCase();
  if (!code) return { error: 'Please enter a pairing code.' };

  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return { error: 'You must be signed in.' };

  // Look up device by pairing code (service role bypasses RLS)
  const { data: device, error: findErr } = await supabase
    .from('devices')
    .select('id, user_id')
    .eq('pairing_code', code)
    .single();

  if (findErr || !device) return { error: 'Invalid pairing code. Check the code on your device.' };
  if (device.user_id && device.user_id !== user.id) return { error: 'This device is already linked to another account.' };
  if (device.user_id === user.id) return { error: 'This device is already linked to your account.' };

  // Link device to user
  const { error: updateErr } = await supabase
    .from('devices')
    .update({ user_id: user.id, updated_at: new Date().toISOString() })
    .eq('id', device.id);

  if (updateErr) return { error: 'Failed to pair device. Please try again.' };

  redirect('/setup');
}

export async function getUserDevice() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('devices')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return data;
}

export async function saveSetupResults(deviceId: string, answers: Record<string, unknown>, profile: Record<string, unknown>) {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('devices')
    .update({
      questionnaire_answers: answers,
      care_profile: profile,
      plant_species: (profile as { species?: string }).species ?? null,
      plant_nickname: (answers as { nickname?: string }).nickname ?? null,
      plant_image_url: (profile as { imageUrl?: string }).imageUrl ?? null,
      setup_complete: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', deviceId)
    .eq('user_id', user.id);

  if (error) throw new Error('Failed to save setup data');
}
