'use client';

import { useState, useEffect, useActionState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { createClient } from '@/app/lib/supabase-browser';
import { getMeetups, createMeetup, toggleRsvp, deleteMeetup } from '../actions/meetups';
import type { Meetup, MeetupState } from '../actions/meetups';
import type { User } from '@supabase/supabase-js';

const initialState: MeetupState = { success: false, message: '' };

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function MeetupsClient() {
  const [user, setUser] = useState<User | null>(null);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null);
  const [formState, formAction, formPending] = useActionState(createMeetup, initialState);

  const loadMeetups = useCallback(async () => {
    setLoading(true);
    const data = await getMeetups();
    setMeetups(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const sb = createClient();
    sb.auth.getUser().then(({ data }) => setUser(data.user));
    loadMeetups();
  }, [loadMeetups]);

  // Reload meetups after successful creation
  useEffect(() => {
    if (formState.success) {
      setShowForm(false);
      loadMeetups();
    }
  }, [formState, loadMeetups]);

  async function handleRsvp(meetupId: string) {
    if (!user) return;
    setRsvpLoading(meetupId);
    const result = await toggleRsvp(meetupId);
    if (result.success) {
      setMeetups(prev => prev.map(m =>
        m.id === meetupId
          ? { ...m, user_rsvped: result.rsvped, rsvp_count: m.rsvp_count + (result.rsvped ? 1 : -1) }
          : m
      ));
    }
    setRsvpLoading(null);
  }

  async function handleDelete(meetupId: string) {
    const result = await deleteMeetup(meetupId);
    if (result.success) {
      setMeetups(prev => prev.filter(m => m.id !== meetupId));
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <div className="mx-auto max-w-4xl px-6 pt-6"><BackButton /></div>

      {/* Hero */}
      <section className="px-6 pb-6 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Community
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Plant Owner Meetups
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Connect with fellow plant parents in your area. Schedule meetups,
              share care tips, swap cuttings, and grow together.
            </p>
          </Reveal>

          {/* Auth-gated actions */}
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {user ? (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-ripple rounded-full bg-[#B78A2A] px-6 py-3 text-center font-medium text-white transition hover:bg-[#9D7620] hover:shadow-[0_8px_30px_rgba(183,138,42,0.3)]"
                >
                  {showForm ? 'Cancel' : 'Schedule a Meetup'}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="btn-ripple rounded-full bg-[#B78A2A] px-6 py-3 text-center font-medium text-white transition hover:bg-[#9D7620]"
                >
                  Sign In to Schedule
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Create Meetup Form */}
      <AnimatePresence>
        {showForm && user && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-6 md:px-10 lg:px-12"
          >
            <div className="mx-auto max-w-4xl">
              <form action={formAction} className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold">Create a New Meetup</h2>

                {formState.message && !formState.success && (
                  <p className="mb-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
                    {formState.message}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Meetup Title
                    </label>
                    <input
                      name="title"
                      required
                      placeholder="e.g. Plant Swap Saturday"
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                    />
                    {formState.errors?.title && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.title[0]}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      placeholder="What's the meetup about? What should people bring?"
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30 resize-none"
                    />
                    {formState.errors?.description && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.description[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Location
                    </label>
                    <input
                      name="location"
                      required
                      placeholder="e.g. Central Park, NYC"
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                    />
                    {formState.errors?.location && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.location[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Max Attendees
                    </label>
                    <input
                      name="maxAttendees"
                      type="number"
                      required
                      min={2}
                      max={200}
                      defaultValue={20}
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                    />
                    {formState.errors?.maxAttendees && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.maxAttendees[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Date
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={today}
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                    />
                    {formState.errors?.date && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.date[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#3B3933]">
                      Time
                    </label>
                    <input
                      name="time"
                      type="time"
                      required
                      className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm outline-none focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                    />
                    {formState.errors?.time && (
                      <p className="mt-1 text-xs text-red-500">{formState.errors.time[0]}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formPending}
                  className="mt-6 rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620] disabled:opacity-50"
                >
                  {formPending ? 'Creating...' : 'Create Meetup'}
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Meetup List */}
      <section className="px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {loading ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E5DBCC] border-t-[#B78A2A]" />
              <p className="mt-3 text-sm text-[#8A857C]">Loading meetups...</p>
            </div>
          ) : meetups.length === 0 ? (
            <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white px-8 py-16 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE2]">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#3B3933]">No upcoming meetups yet</h3>
              <p className="mt-2 text-sm text-[#7A756C]">
                Be the first to schedule a plant owner meetup in your area!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                Upcoming Meetups ({meetups.length})
              </p>
              {meetups.map((meetup) => (
                <Reveal key={meetup.id}>
                  <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-6 shadow-sm transition hover:border-[#B78A2A]/30 hover:shadow-md sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#1F1F1B]">{meetup.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5A564E]">
                          {meetup.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                          {/* Date */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EDE2] px-3 py-1 text-xs font-medium text-[#5C584F]">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {formatDate(meetup.date)}
                          </span>
                          {/* Time */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EDE2] px-3 py-1 text-xs font-medium text-[#5C584F]">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {formatTime(meetup.time)}
                          </span>
                          {/* Location */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EDE2] px-3 py-1 text-xs font-medium text-[#5C584F]">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {meetup.location}
                          </span>
                          {/* Attendees */}
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EDE2] px-3 py-1 text-xs font-medium text-[#5C584F]">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                            {meetup.rsvp_count}/{meetup.max_attendees} attending
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-[#8A857C]">
                          Organized by {meetup.creator_name}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 gap-2 sm:flex-col">
                        {user ? (
                          <>
                            <button
                              onClick={() => handleRsvp(meetup.id)}
                              disabled={rsvpLoading === meetup.id || (meetup.rsvp_count >= meetup.max_attendees && !meetup.user_rsvped)}
                              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                                meetup.user_rsvped
                                  ? 'border border-[#B78A2A] bg-[#B78A2A]/10 text-[#B78A2A] hover:bg-[#B78A2A]/20'
                                  : meetup.rsvp_count >= meetup.max_attendees
                                    ? 'border border-[#E5DBCC] bg-[#F3EDE2] text-[#8A857C] cursor-not-allowed'
                                    : 'bg-[#B78A2A] text-white hover:bg-[#9D7620]'
                              } disabled:opacity-50`}
                            >
                              {rsvpLoading === meetup.id
                                ? '...'
                                : meetup.user_rsvped
                                  ? 'Cancel RSVP'
                                  : meetup.rsvp_count >= meetup.max_attendees
                                    ? 'Full'
                                    : 'RSVP'}
                            </button>
                            {meetup.created_by === user.id && (
                              <button
                                onClick={() => handleDelete(meetup.id)}
                                className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                              >
                                Delete
                              </button>
                            )}
                          </>
                        ) : (
                          <Link
                            href="/login"
                            className="rounded-full bg-[#B78A2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9D7620]"
                          >
                            Sign In to RSVP
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Growing plants is better together.
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              Create an account to schedule meetups, RSVP to events, and connect
              with the Verdant Labs community.
            </p>
            {!user && (
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="btn-ripple rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620]"
                >
                  Create Account
                </Link>
                <Link
                  href="/login"
                  className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-8 py-3 font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
                >
                  Sign In
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
