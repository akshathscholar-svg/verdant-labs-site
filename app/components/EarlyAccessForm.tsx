'use client';

import { useActionState } from 'react';
import { registerEarlyAccess, type RegisterState } from '@/app/actions/register';

const initialState: RegisterState = {
  success: false,
  message: '',
};

export default function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(
    registerEarlyAccess,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-[1.9rem] border border-[#C5E1A5] bg-[#F5FAF0] p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5E0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5B8C3E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#1F1F1B]">
          You&apos;re on the list!
        </h3>
        <p className="mt-2 text-base leading-7 text-[#5A564E]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.message && !state.success && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-sm font-medium text-[#3B3933]"
          >
            Full Name <span className="text-[#B78A2A]">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Jane Smith"
            className="w-full rounded-xl border border-[#E2D6C2] bg-white px-4 py-3 text-sm text-[#1F1F1B] placeholder:text-[#B5AFA4] transition focus:border-[#B78A2A] focus:outline-none focus:ring-2 focus:ring-[#B78A2A]/20"
          />
          {state.errors?.fullName && (
            <p className="mt-1 text-xs text-red-600">{state.errors.fullName[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-[#3B3933]"
          >
            Email <span className="text-[#B78A2A]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="jane@example.com"
            className="w-full rounded-xl border border-[#E2D6C2] bg-white px-4 py-3 text-sm text-[#1F1F1B] placeholder:text-[#B5AFA4] transition focus:border-[#B78A2A] focus:outline-none focus:ring-2 focus:ring-[#B78A2A]/20"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="interestTier"
          className="mb-1.5 block text-sm font-medium text-[#3B3933]"
        >
          Which tier interests you? <span className="text-[#B78A2A]">*</span>
        </label>
        <select
          id="interestTier"
          name="interestTier"
          required
          defaultValue=""
          className="w-full rounded-xl border border-[#E2D6C2] bg-white px-4 py-3 text-sm text-[#1F1F1B] transition focus:border-[#B78A2A] focus:outline-none focus:ring-2 focus:ring-[#B78A2A]/20"
        >
          <option value="" disabled>
            Select a tier
          </option>
          <option value="foundation">Foundation — Environmental monitoring</option>
          <option value="canopy">Canopy AI — Visual intelligence</option>
          <option value="elite">Elite — Advanced collector intelligence</option>
        </select>
        {state.errors?.interestTier && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.interestTier[0]}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="plantCount"
            className="mb-1.5 block text-sm font-medium text-[#3B3933]"
          >
            How many plants do you own?
          </label>
          <select
            id="plantCount"
            name="plantCount"
            defaultValue=""
            className="w-full rounded-xl border border-[#E2D6C2] bg-white px-4 py-3 text-sm text-[#1F1F1B] transition focus:border-[#B78A2A] focus:outline-none focus:ring-2 focus:ring-[#B78A2A]/20"
          >
            <option value="">Prefer not to say</option>
            <option value="1-5">1–5 plants</option>
            <option value="6-20">6–20 plants</option>
            <option value="20+">20+ plants</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="referralSource"
            className="mb-1.5 block text-sm font-medium text-[#3B3933]"
          >
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            defaultValue=""
            className="w-full rounded-xl border border-[#E2D6C2] bg-white px-4 py-3 text-sm text-[#1F1F1B] transition focus:border-[#B78A2A] focus:outline-none focus:ring-2 focus:ring-[#B78A2A]/20"
          >
            <option value="">Prefer not to say</option>
            <option value="social">Social media</option>
            <option value="friend">Friend or referral</option>
            <option value="search">Search engine</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#B78A2A] px-6 py-3.5 text-center font-medium text-white transition hover:bg-[#9D7620] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Joining…
          </span>
        ) : (
          'Join the Waitlist'
        )}
      </button>
    </form>
  );
}
