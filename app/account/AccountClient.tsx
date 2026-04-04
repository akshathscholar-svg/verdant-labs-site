'use client';

import { signOut } from '@/app/actions/auth';
import Link from 'next/link';

interface Props {
  email: string;
  fullName: string;
  createdAt: string;
}

export default function AccountClient({ email, fullName, createdAt }: Props) {
  const joined = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[#7A756C]">Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F3EDE2] pb-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8A857C]">Name</p>
              <p className="mt-0.5 text-sm font-medium text-[#1F1F1B]">{fullName || '—'}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-[#F3EDE2] pb-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8A857C]">Email</p>
              <p className="mt-0.5 text-sm font-medium text-[#1F1F1B]">{email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8A857C]">Member since</p>
              <p className="mt-0.5 text-sm font-medium text-[#1F1F1B]">{joined}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[#7A756C]">Quick Links</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/prototype-dashboard"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B78A2A]/10 text-base">📊</span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Live Dashboard</p>
              <p className="text-[11px] text-[#7A756C]">Monitor your sensors</p>
            </div>
          </Link>
          <Link
            href="/identify"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6B8F5E]/10 text-base">🌿</span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Plant Identifier</p>
              <p className="text-[11px] text-[#7A756C]">Identify any plant with AI</p>
            </div>
          </Link>
          <Link
            href="/plants"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7B9DAE]/10 text-base">📚</span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Plant Library</p>
              <p className="text-[11px] text-[#7A756C]">Browse care guides</p>
            </div>
          </Link>
          <Link
            href="/app-preview"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C4684A]/10 text-base">📱</span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">App Preview</p>
              <p className="text-[11px] text-[#7A756C]">See the Canopy AI app</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Sign out */}
      <div className="flex justify-end">
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-[#E5DBCC] bg-white px-5 py-2.5 text-sm font-medium text-[#5C584F] transition hover:border-[#C4684A] hover:text-[#C4684A]"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
