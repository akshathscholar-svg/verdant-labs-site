'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import CountUp from '../components/CountUp';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import TiltCard from '../components/TiltCard';
import TextReveal from '../components/TextReveal';
import VineDivider from '../components/VineDivider';
import BackButton from '../components/BackButton';
import { LeafIcon, ChartIcon, BellIcon, CameraIcon, DropletIcon } from '../components/Icons';
import type { ComponentType } from 'react';

/* ══════════════════════════════════════════════════════════════
   MOCK DATA — per-plant profiles
   ══════════════════════════════════════════════════════════════ */

type PlantKey = 'Monstera Albo' | 'Fiddle Leaf Fig' | 'Golden Pothos';

const plants: Record<
  PlantKey,
  {
    status: string;
    statusOk: boolean;
    sensors: {
      label: string;
      value: number;
      suffix: string;
      decimals: number;
      trend: string;
      down: boolean;
      history: number[];
    }[];
    overall: string;
    trendNote: string;
    action: string;
    insight: string;
  }
> = {
  'Monstera Albo': {
    status: 'Stable',
    statusOk: true,
    sensors: [
      { label: 'Soil Moisture', value: 41, suffix: '%', decimals: 0, trend: 'Decreasing', down: true, history: [72, 65, 58, 53, 48, 44, 41] },
      { label: 'Light', value: 8.2, suffix: 'k lux', decimals: 1, trend: 'Stable', down: false, history: [78, 82, 80, 79, 81, 82, 82] },
      { label: 'Temperature', value: 72, suffix: '°F', decimals: 0, trend: 'Stable', down: false, history: [70, 71, 72, 72, 73, 72, 72] },
      { label: 'Humidity', value: 58, suffix: '%', decimals: 0, trend: 'Stable', down: false, history: [55, 56, 57, 58, 58, 57, 58] },
    ],
    overall: 'Stable — all readings within healthy range.',
    trendNote: 'Moisture has been gradually decreasing over the last 24 hours.',
    action: 'Water within the next 24 hours to maintain healthy soil conditions.',
    insight:
      'Current humidity is acceptable for your Monstera Albo, but soil moisture is trending downward. Monitor closely and prepare to water soon — ideally before it drops below 35%.',
  },
  'Fiddle Leaf Fig': {
    status: 'Monitor',
    statusOk: false,
    sensors: [
      { label: 'Soil Moisture', value: 55, suffix: '%', decimals: 0, trend: 'Stable', down: false, history: [52, 54, 53, 55, 56, 55, 55] },
      { label: 'Light', value: 6.1, suffix: 'k lux', decimals: 1, trend: 'Low', down: true, history: [92, 85, 78, 71, 68, 63, 61] },
      { label: 'Temperature', value: 74, suffix: '°F', decimals: 0, trend: 'Stable', down: false, history: [73, 74, 74, 75, 74, 74, 74] },
      { label: 'Humidity', value: 52, suffix: '%', decimals: 0, trend: 'Decreasing', down: true, history: [60, 58, 56, 55, 54, 53, 52] },
    ],
    overall: 'Monitor — light and humidity trending below optimal.',
    trendNote: 'Light levels have been declining this week as conditions change.',
    action: 'Reposition closer to natural light and consider supplemental humidity.',
    insight:
      'Your Fiddle Leaf Fig is getting less light than ideal. Consider moving it closer to a south-facing window. Humidity is also trending down — a humidifier nearby would help.',
  },
  'Golden Pothos': {
    status: 'Healthy',
    statusOk: true,
    sensors: [
      { label: 'Soil Moisture', value: 48, suffix: '%', decimals: 0, trend: 'Stable', down: false, history: [46, 47, 48, 47, 48, 48, 48] },
      { label: 'Light', value: 3.8, suffix: 'k lux', decimals: 1, trend: 'Stable', down: false, history: [35, 37, 38, 39, 38, 37, 38] },
      { label: 'Temperature', value: 71, suffix: '°F', decimals: 0, trend: 'Stable', down: false, history: [70, 71, 71, 71, 72, 71, 71] },
      { label: 'Humidity', value: 61, suffix: '%', decimals: 0, trend: 'Stable', down: false, history: [59, 60, 61, 60, 61, 61, 61] },
    ],
    overall: 'Healthy — all readings within optimal range.',
    trendNote: 'All environmental conditions have been stable this week.',
    action: 'No immediate action needed. Continue current care routine.',
    insight:
      'Your Golden Pothos is thriving in its current environment. All readings are within optimal range. No action needed — just enjoy your healthy plant.',
  },
};

const plantKeys: PlantKey[] = ['Monstera Albo', 'Fiddle Leaf Fig', 'Golden Pothos'];
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const sensorIcons = [
  <svg key="m" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.7C12 2.7 5 10.2 5 14.5a7 7 0 0 0 14 0C19 10.2 12 2.7 12 2.7Z" /></svg>,
  <svg key="l" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  <svg key="t" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z" /></svg>,
  <svg key="h" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.7C12 2.7 5 10.2 5 14.5a7 7 0 0 0 14 0C19 10.2 12 2.7 12 2.7Z" /><path d="M8 14.5a4 4 0 0 0 4 4" opacity="0.5" /></svg>,
];

/* ── pricing tiers ── */
const tiers = [
  {
    name: 'Foundation',
    hardware: 59,
    monthly: 3.99,
    featured: false,
    features: ['App dashboard access', 'Real-time status updates', 'Environmental monitoring', 'Core alerts and basic insights'],
  },
  {
    name: 'Canopy AI',
    hardware: 79,
    monthly: 7.99,
    featured: true,
    features: ['Everything in Foundation', 'Species-specific insights', 'Proactive AI guidance', 'Health history timeline', 'Trend analysis'],
  },
  {
    name: 'Elite',
    hardware: 99,
    monthly: 9.99,
    featured: false,
    features: ['Everything in Canopy AI', 'Advanced stress detection', 'Long-term analysis', 'Priority feature access', 'Enhanced plant-care tools'],
  },
];

/* ── upcoming features ── */
const featureIcons: ComponentType<{ size?: number; className?: string }>[] = [LeafIcon, ChartIcon, BellIcon, CameraIcon];
const futureFeatures = [
  { label: 'Species-Specific Insights', desc: 'Tailored care profiles for 500+ houseplant species.' },
  { label: 'Health History', desc: 'Month-over-month health timeline for every plant.' },
  { label: 'Predictive Alerts', desc: 'Get warned before stress becomes visible.' },
  { label: 'Visual Stress Detection', desc: 'Camera-based leaf analysis for early damage signs.' },
];

/* ══════════════════════════════════════════════════════════════
   SVG AREA CHART
   ══════════════════════════════════════════════════════════════ */

function AreaChart({ data, color, darkMode }: { data: number[]; color: string; darkMode: boolean }) {
  const W = 240;
  const H = 72;
  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: pad + (1 - (v - min) / range) * (H - pad * 2),
  }));

  let linePath = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
    linePath += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
  }

  const areaPath = `${linePath} L${points[points.length - 1].x},${H} L${points[0].x},${H} Z`;
  const gradId = `grad-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={darkMode ? '#1A1F1A' : '#FDFBF7'} stroke={color} strokeWidth="1.5" />
      ))}
      {points.map((p, i) => (
        <text key={`l${i}`} x={p.x} y={H - 1} textAnchor="middle" fontSize="7" fill={darkMode ? '#6B6860' : '#5C584F'} opacity="0.6">
          {dayLabels[i]}
        </text>
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */

export default function AppPreviewClient() {
  const [activePlant, setActivePlant] = useState<PlantKey>('Monstera Albo');
  const [dark, setDark] = useState(false);
  const [expandedSensor, setExpandedSensor] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneInViewRef = useRef<HTMLDivElement>(null);
  const phoneInView = useInView(phoneInViewRef, { once: true, margin: '-80px' });

  const plant = plants[activePlant];

  /* ── notification toast ── */
  useState(() => {
    if (typeof window === 'undefined') return;
    const t = setTimeout(() => setShowToast(true), 2000);
    const t2 = setTimeout(() => setShowToast(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  });

  /* ── tilt on mouse move ── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const c = dark
    ? { bg: '#1A1F1A', card: '#242924', border: '#3A3F3A', text: '#E8E4DC', muted: '#8A8677', accent: '#B78A2A', phoneBg: '#151A15' }
    : { bg: '#FDFBF7', card: '#FFFFFF', border: '#E7DECF', text: '#1F1F1B', muted: '#5C584F', accent: '#B78A2A', phoneBg: '#FDFBF7' };

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-12"><BackButton /></div>

      {/* ── Hero ── */}
      <section className="px-6 pb-6 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="inline-block rounded-full border border-[#B78A2A]/30 bg-[#B78A2A]/8 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-[#B78A2A]">
              Preview
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              The Canopy AI experience.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5A564E]">
              A preview of the app that turns sensor data into clear,
              plant-specific care recommendations — right on your phone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PHONE FRAME
         ══════════════════════════════════════════════════════ */}
      <section className="px-6 pb-20 pt-8 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div ref={phoneInViewRef}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={phoneInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="relative mx-auto w-full max-w-[380px]"
              style={{ perspective: '1200px' }}
            >
              <div
                ref={phoneRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="rounded-[2.5rem] border-[6px] shadow-2xl shadow-black/12 transition-colors duration-500"
                  style={{ borderColor: dark ? '#1A1F1A' : '#2A2A26', backgroundColor: c.bg }}
                >
                  {/* Notch */}
                  <div
                    className="mx-auto mt-2 h-[22px] w-[120px] rounded-full transition-colors duration-500"
                    style={{ backgroundColor: dark ? '#1A1F1A' : '#2A2A26' }}
                  />

                  {/* Screen */}
                  <div className="relative px-5 pb-8 pt-4 transition-colors duration-500" style={{ color: c.text }}>

                    {/* Toast */}
                    <AnimatePresence>
                      {showToast && (
                        <motion.div
                          initial={{ y: -30, opacity: 0, scale: 0.95 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -20, opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.35 }}
                          className="absolute inset-x-5 top-4 z-10 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[11px] font-medium shadow-lg"
                          style={{
                            backgroundColor: dark ? '#2E3330' : '#FFF8EB',
                            border: `1px solid ${dark ? '#4A5248' : '#E7DECF'}`,
                            color: c.text,
                          }}
                        >
                          <span className="text-base"><DropletIcon size={16} className="text-[#3B82F6]" /></span>
                          <span>Moisture dropping — water soon</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* App header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-medium" style={{ color: c.muted }}>{greeting}</p>
                        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: c.accent }}>
                          Canopy AI
                        </h2>
                      </div>
                      <button
                        onClick={() => setDark(!dark)}
                        className="mt-0.5 rounded-full p-1.5 transition"
                        style={{ backgroundColor: dark ? '#2E3330' : '#F0EBDF' }}
                        aria-label="Toggle dark mode"
                      >
                        {dark ? (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={c.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={c.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                        )}
                      </button>
                    </div>

                    {/* Plant name + status */}
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-lg font-bold tracking-tight">{activePlant}</p>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                          backgroundColor: plant.statusOk
                            ? dark ? 'rgba(16,185,129,0.15)' : 'rgba(236,253,245,1)'
                            : dark ? 'rgba(245,158,11,0.15)' : 'rgba(255,251,235,1)',
                          color: plant.statusOk
                            ? dark ? '#6EE7B7' : '#047857'
                            : dark ? '#FCD34D' : '#B45309',
                        }}
                      >
                        {plant.status}
                      </span>
                    </div>

                    {/* Plant switcher */}
                    <div className="mt-3 flex gap-1.5">
                      {plantKeys.map((key) => (
                        <button
                          key={key}
                          onClick={() => { setActivePlant(key); setExpandedSensor(null); }}
                          className="rounded-full px-2.5 py-1 text-[10px] font-medium transition-all duration-300"
                          style={{
                            backgroundColor: activePlant === key ? c.accent : dark ? '#2E3330' : '#F0EBDF',
                            color: activePlant === key ? '#fff' : c.muted,
                          }}
                        >
                          {key.split(' ').slice(0, 2).join(' ')}
                        </button>
                      ))}
                    </div>

                    <p className="mt-3 text-[10px]" style={{ color: c.muted }}>Last updated: 2 min ago</p>

                    {/* Sensor grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {plant.sensors.map((s, i) => (
                        <motion.button
                          key={`${activePlant}-${s.label}`}
                          layout
                          onClick={() => setExpandedSensor(expandedSensor === i ? null : i)}
                          className="rounded-2xl p-3 text-left transition-colors duration-500"
                          style={{
                            backgroundColor: c.card,
                            border: `1px solid ${expandedSensor === i ? c.accent : c.border}`,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2" style={{ color: c.muted }}>
                            {sensorIcons[i]}
                            <span className="text-[10px] font-medium uppercase tracking-[0.14em]">{s.label}</span>
                          </div>
                          <p className="mt-2 text-xl font-bold tracking-tight" style={{ color: c.text }}>
                            <CountUp key={`${activePlant}-${i}`} end={s.value} suffix={s.suffix} decimals={s.decimals} duration={1.2} />
                          </p>
                          <p className={`mt-1 text-[10px] font-medium ${s.down ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {s.down ? '↓' : '→'} {s.trend}
                          </p>

                          <AnimatePresence>
                            {expandedSensor === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-2 overflow-hidden"
                              >
                                <AreaChart data={s.history} color={s.down ? '#F59E0B' : '#10B981'} darkMode={dark} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      ))}
                    </div>

                    {/* Status summary */}
                    <div
                      className="mt-4 rounded-2xl p-3.5 transition-colors duration-500"
                      style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: c.accent }}>
                        Plant Status
                      </p>
                      <div className="mt-2 space-y-2 text-[12px] leading-relaxed" style={{ color: c.text }}>
                        <div className="flex gap-2">
                          <span className={`mt-0.5 ${plant.statusOk ? 'text-emerald-500' : 'text-amber-500'}`}>●</span>
                          <p><span className="font-semibold">Overall:</span> {plant.overall}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="mt-0.5 text-amber-500">●</span>
                          <p><span className="font-semibold">Trend:</span> {plant.trendNote}</p>
                        </div>
                        <div className="flex gap-2">
                          <span className="mt-0.5" style={{ color: c.accent }}>●</span>
                          <p><span className="font-semibold">Action:</span> {plant.action}</p>
                        </div>
                      </div>
                    </div>

                    {/* 7-day trend chart */}
                    <div
                      className="mt-4 rounded-2xl p-3.5 transition-colors duration-500"
                      style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: c.accent }}>
                        7-Day Moisture Trend
                      </p>
                      <div className="mt-2">
                        <AreaChart data={plant.sensors[0].history} color={c.accent} darkMode={dark} />
                      </div>
                    </div>

                    {/* AI insight */}
                    <div
                      className="mt-4 rounded-2xl p-3.5 transition-colors duration-500"
                      style={{
                        backgroundColor: dark ? 'rgba(183,138,42,0.08)' : 'rgba(183,138,42,0.04)',
                        border: '1px solid rgba(183,138,42,0.25)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: c.accent }}>
                          Canopy AI Insight
                        </p>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed" style={{ color: c.text }}>
                        {plant.insight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BEFORE / AFTER
         ══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12">
        <VineDivider className="mb-12" />
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              The Difference
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              <TextReveal text="Without vs. with Canopy AI." />
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1} direction="left">
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A857C]">
                  Without Canopy
                </p>
                <div className="mt-6 space-y-4 text-base text-[#5A564E]">
                  {[
                    'Guesswork watering schedules',
                    'Notice stress after visible damage',
                    'Generic care advice for every plant',
                    'No environmental awareness',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-400">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="right">
              <div className="h-full rounded-[1.75rem] border-2 border-[#B78A2A]/30 bg-white p-8 shadow-[0_12px_40px_rgba(183,138,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                  With Canopy AI
                </p>
                <div className="mt-6 space-y-4 text-base text-[#3B3933]">
                  {[
                    'Data-driven watering guidance',
                    'Detect stress before it\u2019s visible',
                    'Species-specific recommendations',
                    '24/7 environmental intelligence',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
         ══════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12">
        <VineDivider className="mb-12" />
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Pricing
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              <TextReveal text="Choose your tier." />
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#5A564E]">
              Hardware + subscription for complete botanical intelligence.
              Every purchase includes 3 months of subscription free.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.12}>
                <TiltCard
                  className={`flex h-full flex-col rounded-[1.75rem] p-7 transition ${
                    tier.featured
                      ? 'border-2 border-[#B78A2A] bg-white shadow-[0_18px_50px_rgba(120,92,28,0.08)]'
                      : 'border border-[#E2D6C2] bg-white hover:border-[#B78A2A]/30 hover:shadow-lg'
                  }`}
                >
                  {tier.featured && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-[#B78A2A] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-semibold">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${tier.hardware}</span>
                    <span className="ml-1 text-sm text-[#5A564E]">device</span>
                  </div>
                  <p className="mt-1 text-sm text-[#5A564E]">
                    + ${tier.monthly}/mo after 3 free months
                  </p>

                  <ul className="mt-6 flex-1 space-y-3 text-sm text-[#4F4B44]">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-[#B78A2A]">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#early-access"
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-medium transition ${
                      tier.featured
                        ? 'btn-ripple bg-[#B78A2A] text-white hover:bg-[#9D7620] hover:shadow-lg'
                        : 'border border-[#CFC3AE] text-[#1F1F1B] hover:border-[#B78A2A] hover:shadow-md'
                    }`}
                  >
                    Join Early Access
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          METRICS STRIP
         ══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-4">
          {[
            { value: '500+', label: 'Species Supported' },
            { value: '24/7', label: 'Monitoring' },
            { value: '<5 min', label: 'Setup Time' },
            { value: '4', label: 'Sensor Types' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-[#E5DBCC] bg-white px-5 py-5 text-center transition hover:border-[#B78A2A]/40 hover:shadow-md">
                <p className="text-2xl font-semibold text-[#B78A2A]">{m.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7A756C]">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ROADMAP FEATURES
         ══════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              On the Roadmap
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              <TextReveal text="What's coming next." />
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#5A564E]">
              Features we&apos;re actively building for future updates.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {futureFeatures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                  {(() => { const Icon = featureIcons[i]; return Icon ? <Icon size={28} className="text-[#B78A2A]" /> : null; })()}
                  <h3 className="mt-3 text-lg font-semibold">{f.label}</h3>
                  <p className="mt-2 text-base leading-7 text-[#5A564E]">{f.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Be the first to experience Canopy AI.
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              Join early access and get priority pricing when we launch.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#early-access"
                className="btn-ripple cta-glow rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620]"
              >
                Join Early Access
              </Link>
              <Link
                href="/how-it-works"
                className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-8 py-3 font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
              >
                How It Works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
