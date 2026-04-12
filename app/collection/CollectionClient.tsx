'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

/* ── Demo plant data ── */
const plants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    species: 'Monstera deliciosa',
    room: 'Living Room',
    score: 94,
    status: 'Healthy',
    statusColor: '#5B8C3E',
    moisture: 42,
    temp: 72,
    humidity: 58,
    light: 8200,
    trend: [82, 88, 91, 90, 94, 92, 93, 94],
    alert: null,
    lastWatered: '2 days ago',
  },
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    room: 'Office',
    score: 71,
    status: 'Low Light',
    statusColor: '#B78A2A',
    moisture: 35,
    temp: 70,
    humidity: 45,
    light: 3100,
    trend: [85, 82, 79, 76, 74, 72, 71, 71],
    alert: 'Light declining — consider moving closer to a south-facing window.',
    lastWatered: '4 days ago',
  },
  {
    id: 3,
    name: 'Pothos Golden',
    species: 'Epipremnum aureum',
    room: 'Bedroom',
    score: 88,
    status: 'Healthy',
    statusColor: '#5B8C3E',
    moisture: 51,
    temp: 71,
    humidity: 52,
    light: 5400,
    trend: [80, 83, 85, 86, 87, 88, 88, 88],
    alert: null,
    lastWatered: '1 day ago',
  },
  {
    id: 4,
    name: 'Bird of Paradise',
    species: 'Strelitzia reginae',
    room: 'Living Room',
    score: 62,
    status: 'Needs Water',
    statusColor: '#C4684A',
    moisture: 18,
    temp: 74,
    humidity: 40,
    light: 9500,
    trend: [90, 85, 80, 75, 70, 66, 64, 62],
    alert: 'Soil moisture critically low — water within 12 hours.',
    lastWatered: '8 days ago',
  },
  {
    id: 5,
    name: 'Snake Plant',
    species: 'Dracaena trifasciata',
    room: 'Hallway',
    score: 96,
    status: 'Thriving',
    statusColor: '#5B8C3E',
    moisture: 28,
    temp: 69,
    humidity: 48,
    light: 4800,
    trend: [92, 93, 94, 95, 95, 96, 96, 96],
    alert: null,
    lastWatered: '12 days ago',
  },
  {
    id: 6,
    name: 'Calathea Orbifolia',
    species: 'Goeppertia orbifolia',
    room: 'Bathroom',
    score: 79,
    status: 'Monitor',
    statusColor: '#7B9DAE',
    moisture: 55,
    temp: 73,
    humidity: 65,
    light: 2800,
    trend: [84, 83, 82, 81, 80, 80, 79, 79],
    alert: 'Humidity trending down — consider a pebble tray or humidifier.',
    lastWatered: '3 days ago',
  },
];

const rooms = ['All Rooms', 'Living Room', 'Office', 'Bedroom', 'Hallway', 'Bathroom'];

function ScoreRing({ score, color, size = 44 }: { score: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5DBCC" strokeWidth="3" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" className="text-[11px] font-bold" fill={color}>
        {score}
      </text>
    </svg>
  );
}

function MiniTrend({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data) - 5;
  const h = 28;
  const w = 64;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CollectionClient() {
  const [activeRoom, setActiveRoom] = useState('All Rooms');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = activeRoom === 'All Rooms' ? plants : plants.filter((p) => p.room === activeRoom);

  const alertCount = plants.filter((p) => p.alert).length;
  const avgScore = Math.round(plants.reduce((s, p) => s + p.score, 0) / plants.length);
  const healthyCount = plants.filter((p) => p.score >= 80).length;

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      {/* ── Top bar ── */}
      <div className="border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-[#5C584F] transition hover:text-[#B78A2A]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Verdant Labs
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#5B8C3E]/30 bg-[#5B8C3E]/10 px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest text-[#5B8C3E]">
              Demo
            </span>
            <span className="rounded-full border border-[#B78A2A]/30 bg-[#B78A2A]/8 px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest text-[#B78A2A]">
              Elite
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        {/* ── Header ── */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">Collection Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Your Plant Collection</h1>
          <p className="mt-1 text-sm text-[#7A756C]">
            This is a demo preview of the Canopy AI collection management experience.
          </p>
        </div>

        {/* ── Overview Cards ── */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Plants', value: String(plants.length), color: 'var(--foreground)' },
            { label: 'Collection Score', value: String(avgScore), color: avgScore >= 80 ? '#5B8C3E' : '#B78A2A' },
            { label: 'Healthy', value: `${healthyCount}/${plants.length}`, color: '#5B8C3E' },
            { label: 'Active Alerts', value: String(alertCount), color: alertCount > 0 ? '#C4684A' : '#5B8C3E' },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-[#E5DBCC] bg-white p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A857C]">{c.label}</p>
              <p className="mt-1 text-3xl font-bold" style={{ color: c.color }}>{c.value}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Alerts Strip ── */}
        {alertCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-3"
          >
            {plants.filter((p) => p.alert).map((p) => (
              <div key={p.id} className="flex items-start gap-3 rounded-2xl border border-[#C4684A]/20 bg-[#FBF2EE] p-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: p.statusColor + '18' }}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" style={{ color: p.statusColor }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1F1F1B]">{p.name}</p>
                  <p className="mt-0.5 text-[13px] text-[#5A564E]">{p.alert}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Filters & View Toggle ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {rooms.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRoom(r)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  activeRoom === r
                    ? 'bg-[#B78A2A] text-white'
                    : 'border border-[#E5DBCC] bg-white text-[#5C584F] hover:border-[#B78A2A]/40'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-lg border border-[#E5DBCC]">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 text-sm ${view === 'grid' ? 'bg-[#B78A2A] text-white' : 'bg-white text-[#5C584F]'}`}
              aria-label="Grid view"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-sm ${view === 'list' ? 'bg-[#B78A2A] text-white' : 'bg-white text-[#5C584F]'}`}
              aria-label="List view"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Grid View ── */}
        {view === 'grid' && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-[1.5rem] border border-[#E5DBCC] bg-white p-5 transition hover:border-[#B78A2A]/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold">{p.name}</h3>
                    <p className="text-xs italic text-[#8A857C]">{p.species}</p>
                  </div>
                  <ScoreRing score={p.score} color={p.statusColor} />
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: p.statusColor + '15', color: p.statusColor }}
                  >
                    {p.status}
                  </span>
                  <span className="text-[10px] text-[#8A857C]">{p.room}</span>
                </div>

                {/* Sensor readings */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    { label: 'Moist', value: `${p.moisture}%`, color: '#6B8F5E' },
                    { label: 'Temp', value: `${p.temp}°F`, color: '#C4684A' },
                    { label: 'Humid', value: `${p.humidity}%`, color: '#7B9DAE' },
                    { label: 'Light', value: p.light >= 1000 ? `${(p.light / 1000).toFixed(1)}k` : String(p.light), color: '#B78A2A' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg bg-[#F7F3EC] p-2 text-center">
                      <p className="text-[9px] uppercase tracking-wider text-[#8A857C]">{s.label}</p>
                      <p className="text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Trend + last watered */}
                <div className="mt-3 flex items-center justify-between">
                  <MiniTrend data={p.trend} color={p.statusColor} />
                  <p className="text-[10px] text-[#8A857C]">Watered {p.lastWatered}</p>
                </div>

                {/* Alert */}
                {p.alert && (
                  <div className="mt-3 rounded-lg border border-[#B78A2A]/20 bg-[#FBF6EC] p-2.5">
                    <p className="text-[11px] leading-5 text-[#5A564E]">{p.alert}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* ── List View ── */}
        {view === 'list' && (
          <div className="space-y-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-5 rounded-2xl border border-[#E5DBCC] bg-white p-4 transition hover:border-[#B78A2A]/40 hover:shadow-md"
              >
                <ScoreRing score={p.score} color={p.statusColor} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{p.name}</h3>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: p.statusColor + '15', color: p.statusColor }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A857C]">{p.species} · {p.room} · Watered {p.lastWatered}</p>
                </div>
                <div className="hidden items-center gap-4 text-xs sm:flex">
                  <span style={{ color: '#6B8F5E' }} className="font-semibold">{p.moisture}%</span>
                  <span style={{ color: '#C4684A' }} className="font-semibold">{p.temp}°F</span>
                  <span style={{ color: '#7B9DAE' }} className="font-semibold">{p.humidity}%</span>
                  <MiniTrend data={p.trend} color={p.statusColor} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-[1.75rem] border border-[#E5DBCC] bg-gradient-to-br from-white to-[#F3EDE2] p-8 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
            Coming with Elite Plan
          </p>
          <h2 className="mt-2 text-xl font-bold md:text-2xl">
            Manage your entire collection from one dashboard.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#5A564E]">
            The Collection Dashboard is part of the Elite tier. Track health
            scores, environmental trends, and alerts across every plant — with
            room-level filtering and AI-powered recommendations.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#early-access"
              className="btn-ripple rounded-full bg-[#B78A2A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#9D7620]"
            >
              Request Early Access
            </Link>
            <Link
              href="/#tiers"
              className="rounded-full border border-[#CFC3AE] bg-white px-7 py-3 text-sm font-semibold text-[#1F1F1B] transition hover:border-[#B78A2A]"
            >
              View Plans
            </Link>
          </div>
        </motion.div>

        <div className="h-8" />
      </div>
    </div>
  );
}
