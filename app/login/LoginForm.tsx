'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn, type AuthState } from '@/app/actions/auth';
import Link from 'next/link';
import { Suspense } from 'react';

const initial: AuthState = {};

function LoginFormInner() {
  const [state, action, pending] = useActionState(signIn, initial);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const errorParam = searchParams.get('error');

  return (
    <form action={action} className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
      {message && (
        <div className="mb-5 rounded-xl bg-[#6B8F5E]/10 px-4 py-3 text-sm text-[#6B8F5E]">
          {message}
        </div>
      )}

      {(state.error || errorParam) && (
        <div className="mb-5 rounded-xl bg-[#C4684A]/10 px-4 py-3 text-sm text-[#C4684A]">
          {state.error || 'Authentication failed. Please try again.'}
        </div>
      )}

      <div className="space-y-4">
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
            autoComplete="current-password"
            className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
            placeholder="Your password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-[#B78A2A] py-3 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign In'}
      </button>

      <p className="mt-5 text-center text-sm text-[#7A756C]">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-[#B78A2A] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 rounded-xl bg-[#F3EDE2]" />
          <div className="h-10 rounded-xl bg-[#F3EDE2]" />
          <div className="h-10 rounded-full bg-[#F3EDE2]" />
        </div>
      </div>
    }>
      <LoginFormInner />
    </Suspense>
  );
}
