'use client';

import { useActionState } from 'react';
import { signOut } from '@/app/actions/auth';
import { pairDevice, type PairState } from '@/app/actions/devices';
import Link from 'next/link';

interface DeviceInfo {
  id: string;
  pairing_code: string;
  plant_species: string | null;
  plant_nickname: string | null;
  setup_complete: boolean;
}

interface Props {
  email: string;
  fullName: string;
  createdAt: string;
  device?: DeviceInfo | null;
}

export default function AccountClient({ email, fullName, createdAt, device }: Props) {
  const joined = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const [pairState, pairAction, pairPending] = useActionState<PairState, FormData>(pairDevice, {});

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

      {/* Device pairing */}
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[#7A756C]">Your Device</h2>
        {device ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-[#6B8F5E]/20 bg-[#6B8F5E]/5 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8F5E]/15 text-xl">🌱</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1F1F1B]">
                  {device.plant_nickname || 'Canopy Sensor'}
                </p>
                <p className="text-[11px] text-[#7A756C]">
                  Code: {device.pairing_code}
                  {device.plant_species && <> · {device.plant_species}</>}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                device.setup_complete
                  ? 'bg-[#6B8F5E]/10 text-[#6B8F5E]'
                  : 'bg-[#B78A2A]/10 text-[#B78A2A]'
              }`}>
                {device.setup_complete ? '● Active' : '● Setup needed'}
              </span>
            </div>
            {!device.setup_complete && (
              <Link
                href="/setup"
                className="inline-flex rounded-full bg-[#B78A2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620]"
              >
                Complete Setup →
              </Link>
            )}
          </div>
        ) : (
          <div>
            <p className="mb-4 text-sm text-[#5C584F]">
              Enter the pairing code printed on your Canopy sensor to link it to your account.
            </p>
            <form action={pairAction} className="flex gap-2">
              <input
                name="pairingCode"
                type="text"
                placeholder="e.g. CANOPY-001"
                className="flex-1 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-[#1F1F1B] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
              />
              <button
                type="submit"
                disabled={pairPending}
                className="rounded-xl bg-[#B78A2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-50"
              >
                {pairPending ? 'Pairing...' : 'Pair'}
              </button>
            </form>
            {pairState.error && (
              <p className="mt-2 text-xs text-[#C4684A]">{pairState.error}</p>
            )}
          </div>
        )}
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
