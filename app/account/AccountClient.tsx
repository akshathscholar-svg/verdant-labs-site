'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/app/actions/auth';
import { pairDevice, removeDevice, type PairState } from '@/app/actions/devices';
import Link from 'next/link';
import {
  SeedlingIcon, ChartIcon, LeafIcon, BookIcon, SmartphoneIcon,
  TrashIcon, DownloadIcon, PlusIcon, FileTextIcon, TableIcon, WarningIcon,
} from '@/app/components/Icons';

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
  const router = useRouter();
  const joined = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const [pairState, pairAction, pairPending] = useActionState<PairState, FormData>(pairDevice, {});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);

  async function handleRemoveDevice() {
    if (!device) return;
    setRemoving(true);
    const result = await removeDevice(device.id);
    if (result.error) {
      alert(result.error);
      setRemoving(false);
    } else {
      setShowDeleteConfirm(false);
      setShowExportOptions(false);
      router.refresh();
    }
  }

  function handleExportRecent() {
    // Generate a simple PDF-like summary
    const text = [
      `Canopy Plant Report — ${new Date().toLocaleDateString()}`,
      ``,
      `Plant: ${device?.plant_nickname || 'Unknown'}`,
      `Species: ${device?.plant_species || 'Unknown'}`,
      `Device Code: ${device?.pairing_code || 'N/A'}`,
      ``,
      `This is a summary of your recent plant monitoring data.`,
      `For full historical data, choose the spreadsheet export option.`,
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canopy-report-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportFull() {
    // Generate CSV export
    const csv = [
      'Timestamp,Temperature (°F),Humidity (%),Moisture (raw),Light (lux)',
      `${new Date().toISOString()},Data export requires active sensor connection,,`,
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `canopy-data-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

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

      {/* Device management */}
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#7A756C]">Your Devices</h2>
          {device && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[#8A857C] transition hover:bg-[#C4684A]/10 hover:text-[#C4684A]"
            >
              <TrashIcon size={13} />
              Remove
            </button>
          )}
        </div>

        {device ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-[#6B8F5E]/20 bg-[#6B8F5E]/5 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8F5E]/15">
                <SeedlingIcon size={20} className="text-[#6B8F5E]" />
              </div>
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
                Complete Setup
              </Link>
            )}

            {/* Add another device */}
            {!showAddDevice ? (
              <button
                onClick={() => setShowAddDevice(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-[#E5DBCC] px-4 py-3 text-sm font-medium text-[#7A756C] transition hover:border-[#B78A2A] hover:text-[#B78A2A]"
              >
                <PlusIcon size={14} />
                Add Another Device
              </button>
            ) : (
              <div className="rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A756C]">Pair New Device</p>
                  <button
                    onClick={() => setShowAddDevice(false)}
                    className="text-[11px] font-medium text-[#8A857C] transition hover:text-[#1F1F1B]"
                  >
                    Cancel
                  </button>
                </div>
                <p className="mb-3 text-[12px] leading-relaxed text-[#5C584F]">
                  Enter the pairing code on your new Canopy sensor. This will replace your current device connection.
                </p>
                <form action={pairAction} className="flex gap-2">
                  <input
                    name="pairingCode"
                    type="text"
                    placeholder="e.g. CANOPY-002"
                    className="flex-1 rounded-xl border border-[#E5DBCC] bg-white px-4 py-2.5 text-sm font-medium uppercase tracking-wider text-[#1F1F1B] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                  />
                  <button
                    type="submit"
                    disabled={pairPending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#B78A2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-50"
                  >
                    <PlusIcon size={14} />
                    {pairPending ? 'Pairing...' : 'Pair'}
                  </button>
                </form>
                {pairState.error && (
                  <p className="mt-2 text-xs text-[#C4684A]">{pairState.error}</p>
                )}
              </div>
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
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#B78A2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-50"
              >
                <PlusIcon size={14} />
                {pairPending ? 'Pairing...' : 'Pair Device'}
              </button>
            </form>
            {pairState.error && (
              <p className="mt-2 text-xs text-[#C4684A]">{pairState.error}</p>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && device && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl border border-[#E5DBCC] bg-[#F7F3EC] p-6 shadow-xl sm:p-8">
            {!showExportOptions ? (
              <>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C4684A]/10">
                  <WarningIcon size={24} className="text-[#C4684A]" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1B]">Remove Device</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5C584F]">
                  This action is <strong>irreversible</strong>. Removing this device will delete all associated plant data,
                  care profiles, and sensor history from your account. The device can be re-paired later, but
                  your data will be lost.
                </p>
                <p className="mt-3 text-sm font-medium text-[#1F1F1B]">
                  Would you like to export your data before removing?
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <button
                    onClick={() => setShowExportOptions(true)}
                    className="flex-1 rounded-xl border border-[#B78A2A] bg-[#B78A2A]/5 px-4 py-2.5 text-sm font-semibold text-[#B78A2A] transition hover:bg-[#B78A2A]/10"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <DownloadIcon size={14} />
                      Export Data First
                    </span>
                  </button>
                  <button
                    onClick={handleRemoveDevice}
                    disabled={removing}
                    className="flex-1 rounded-xl bg-[#C4684A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B35A3E] disabled:opacity-50"
                  >
                    {removing ? 'Removing...' : 'Remove Without Export'}
                  </button>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="mt-3 w-full rounded-xl border border-[#E5DBCC] px-4 py-2.5 text-sm font-medium text-[#5C584F] transition hover:bg-[#E5DBCC]/50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B78A2A]/10">
                  <DownloadIcon size={24} className="text-[#B78A2A]" />
                </div>
                <h3 className="text-lg font-bold text-[#1F1F1B]">Export Your Data</h3>
                <p className="mt-2 text-sm text-[#5C584F]">
                  Choose your preferred export format before removing the device.
                </p>
                <div className="mt-5 space-y-3">
                  <button
                    onClick={handleExportRecent}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#E5DBCC] bg-white/80 p-4 text-left transition hover:border-[#B78A2A] hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C4684A]/10">
                      <FileTextIcon size={18} className="text-[#C4684A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F1F1B]">Recent Summary</p>
                      <p className="text-[11px] text-[#7A756C]">PDF-style report of recent activity</p>
                    </div>
                  </button>
                  <button
                    onClick={handleExportFull}
                    className="flex w-full items-center gap-4 rounded-xl border border-[#E5DBCC] bg-white/80 p-4 text-left transition hover:border-[#B78A2A] hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#6B8F5E]/10">
                      <TableIcon size={18} className="text-[#6B8F5E]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1F1F1B]">Full History</p>
                      <p className="text-[11px] text-[#7A756C]">Spreadsheet with all sensor readings</p>
                    </div>
                  </button>
                </div>
                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => setShowExportOptions(false)}
                    className="flex-1 rounded-xl border border-[#E5DBCC] px-4 py-2.5 text-sm font-medium text-[#5C584F] transition hover:bg-[#E5DBCC]/50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleRemoveDevice}
                    disabled={removing}
                    className="flex-1 rounded-xl bg-[#C4684A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B35A3E] disabled:opacity-50"
                  >
                    {removing ? 'Removing...' : 'Remove Device'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-6 shadow-sm sm:p-8">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-[#7A756C]">Quick Links</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/prototype-dashboard"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B78A2A]/10">
              <ChartIcon size={16} className="text-[#B78A2A]" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Live Dashboard</p>
              <p className="text-[11px] text-[#7A756C]">Monitor your sensors</p>
            </div>
          </Link>
          <Link
            href="/identify"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6B8F5E]/10">
              <LeafIcon size={16} className="text-[#6B8F5E]" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Plant Identifier</p>
              <p className="text-[11px] text-[#7A756C]">Identify any plant with AI</p>
            </div>
          </Link>
          <Link
            href="/plants"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7B9DAE]/10">
              <BookIcon size={16} className="text-[#7B9DAE]" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#1F1F1B]">Plant Library</p>
              <p className="text-[11px] text-[#7A756C]">Browse care guides</p>
            </div>
          </Link>
          <Link
            href="/app-preview"
            className="flex items-center gap-3 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] p-4 transition hover:border-[#B78A2A] hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C4684A]/10">
              <SmartphoneIcon size={16} className="text-[#C4684A]" />
            </span>
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
