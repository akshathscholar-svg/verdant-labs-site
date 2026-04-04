'use client';

import { useActionState } from 'react';
import { signUp, type AuthState } from '@/app/actions/auth';
import Link from 'next/link';

const initial: AuthState = {};

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, initial);

  return (
    <form action={action} className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
      {state.error && (
        <div className="mb-5 rounded-xl bg-[#C4684A]/10 px-4 py-3 text-sm text-[#C4684A]">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
            placeholder="At least 6 characters"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-[#B78A2A] py-3 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-60"
      >
        {pending ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="mt-5 text-center text-sm text-[#7A756C]">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[#B78A2A] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
