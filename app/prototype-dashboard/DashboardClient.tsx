'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PrototypeData {
  plantName: string;
  plantStatus: string;
  moisture: number;
  moistureLabel: string;
  light: number;
  lightLabel: string;
  temperature: number;
  humidity: number;
  tempRange: string;
  humidityRange: string;
  tempCondition: string;
  humidityCondition: string;
  trendInsight: string;
  nextAction: string;
  updatedAt: string;
}

interface HistoryPoint {
  time: string;
  temperature: number;
  humidity: number;
  moisture: number;
  light: number;
}

const POLL = 60_000;

function statusBadge(s: string) {
  if (s === 'Healthy') return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  if (s === 'Monitor Closely') return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
  if (s === 'Needs Attention') return { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' };
  return { bg: 'bg-stone-100', text: 'text-stone-600', dot: 'bg-stone-400' };
}

function condBadge(c: string) {
  if (c === 'In Range' || c === 'Moderate' || c === 'Bright')
    return { cls: 'bg-emerald-50 text-emerald-700', icon: '●' };
  if (c === 'Too Low' || c === 'Very Low' || c === 'Dry')
    return { cls: 'bg-amber-50 text-amber-700', icon: '▼' };
  if (c === 'Too High' || c === 'Wet')
    return { cls: 'bg-rose-50 text-rose-700', icon: '▲' };
  return { cls: 'bg-stone-50 text-stone-600', icon: '—' };
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString([], {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

/* Smooth area sparkline */
function Area({ data, color, id, h = 52 }: { data: number[]; color: string; id: string; h?: number }) {
  if (data.length < 2) return null;
  const W = 260, P = 3;
  const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
  const step = (W - P * 2) / (data.length - 1);
  const pts = data.map((v, i) => ({ x: P + i * step, y: h - P - ((v - mn) / rng) * (h - P * 2 - 4) }));
  const line = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
  const area = `${line} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: h }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill="white" stroke={color} strokeWidth="2" />
    </svg>
  );
}

/* Animated progress bar */
function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
        initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }} />
    </div>
  );
}

/* ── Sensor metric card ── */
function MetricCard({ icon, label, value, unit, cond, target, color, chart, chartId, i }: {
  icon: string; label: string; value: string; unit: string; cond: string;
  target?: string; color: string; chart: number[]; chartId: string; i: number;
}) {
  const badge = condBadge(cond);
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="group overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-md">
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50/80 text-xl">{icon}</div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-semibold leading-none tracking-tight text-stone-800">{value}</span>
                <span className="text-xs font-medium text-stone-400">{unit}</span>
              </div>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.cls}`}>
            {badge.icon} {cond}
          </span>
        </div>
        {target && <p className="mt-3 text-[11px] text-stone-400">Target <span className="font-medium text-stone-500">{target}</span></p>}
        {chart.length > 1 && <div className="mt-4 -mx-2"><Area data={chart} color={color} id={chartId} /></div>}
      </div>
    </motion.div>
  );
}

export default function DashboardClient() {
  const [data, setData] = useState<PrototypeData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(POLL / 1000);

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch('/api/prototype-data', { cache: 'no-store' });
      if (!r.ok) throw new Error(`${r.status}`);
      const j: PrototypeData = await r.json();
      setData(j);
      setError(null);
      setHistory(prev => [...prev, {
        time: j.updatedAt, temperature: j.temperature,
        humidity: j.humidity, moisture: j.moisture, light: j.light,
      }].slice(-30));
    } catch (e) { setError(e instanceof Error ? e.message : 'Connection failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); const id = setInterval(() => { fetchData(); setCountdown(POLL / 1000); }, POLL); return () => clearInterval(id); }, [fetchData]);
  useEffect(() => { const id = setInterval(() => setCountdown(c => c > 0 ? c - 1 : POLL / 1000), 1000); return () => clearInterval(id); }, []);

  const badge = data ? statusBadge(data.plantStatus) : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Hero */}
        <section className="border-b border-stone-200/50 bg-gradient-to-b from-white to-[#FAFAF8] px-6 pb-8 pt-14 md:pb-10 md:pt-18">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">Live Prototype</p>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl md:text-4xl">Monitoring Dashboard</h1>
                <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-stone-400">
                  Canopy AI hardware prototype &mdash; sensor data refreshes every 60&nbsp;seconds.
                </p>
              </div>
              {data && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-5 rounded-xl border border-stone-200/60 bg-white px-4 py-3 shadow-sm">
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Next refresh</p>
                    <p className="text-xl font-bold tabular-nums text-stone-700">{countdown}<span className="text-xs font-medium text-stone-400">s</span></p>
                  </div>
                  <div className="h-7 w-px bg-stone-150" />
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Readings</p>
                    <p className="text-xl font-bold text-stone-700">{history.length}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {loading && !data ? (
            <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-28">
              <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-stone-200 border-t-emerald-500" />
              <p className="text-xs text-stone-400">Connecting to sensor&hellip;</p>
            </motion.div>
          ) : error && !data ? (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mx-auto max-w-sm px-6 py-28 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-lg">⚠️</div>
              <p className="text-sm text-stone-600">Unable to reach sensor</p>
              <p className="mt-1 text-[11px] text-stone-400">{error}</p>
              <button onClick={fetchData} className="mt-5 rounded-full bg-stone-800 px-5 py-2 text-xs font-semibold text-white hover:bg-stone-700 transition">Retry</button>
            </motion.div>
          ) : data ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">

                {/* Status strip */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200/60 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">🪴</div>
                    <div>
                      <h2 className="text-base font-bold text-stone-800">{data.plantName}</h2>
                      {badge && (
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />{data.plantStatus}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-stone-400">Last updated</p>
                    <p className="text-[11px] font-semibold text-stone-500">{fmtDate(data.updatedAt)}</p>
                  </div>
                </motion.div>

                {/* Quick bars */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
                  className="mb-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { l: 'Temperature', v: data.temperature, mx: 120, u: '°F', c: '#E87461' },
                    { l: 'Humidity', v: data.humidity, mx: 100, u: '%', c: '#5BA3D9' },
                    { l: 'Moisture', v: data.moisture, mx: 1023, u: 'raw', c: '#5DAF6A' },
                    { l: 'Light', v: data.light, mx: 1023, u: 'lux', c: '#D4A843' },
                  ].map(m => (
                    <div key={m.l} className="rounded-xl border border-stone-200/50 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{m.l}</span>
                        <span className="text-[11px] font-bold text-stone-600">
                          {m.l === 'Temperature' ? m.v.toFixed(1) : Math.round(m.v)} {m.u}
                        </span>
                      </div>
                      <Bar pct={(m.v / m.mx) * 100} color={m.c} />
                    </div>
                  ))}
                </motion.div>

                {/* Sensor cards */}
                <div className="mb-7 grid gap-4 sm:grid-cols-2">
                  <MetricCard icon="🌡️" label="Temperature" value={data.temperature.toFixed(1)} unit="°F"
                    cond={data.tempCondition} target={data.tempRange} color="#E87461"
                    chart={history.map(h => h.temperature)} chartId="tc" i={0} />
                  <MetricCard icon="💧" label="Humidity" value={`${Math.round(data.humidity)}`} unit="%"
                    cond={data.humidityCondition} target={data.humidityRange} color="#5BA3D9"
                    chart={history.map(h => h.humidity)} chartId="hc" i={1} />
                  <MetricCard icon="🌱" label="Soil Moisture" value={`${Math.round(data.moisture)}`} unit="raw"
                    cond={data.moistureLabel} target="0 (wet) → 1023 (dry)" color="#5DAF6A"
                    chart={history.map(h => h.moisture)} chartId="mc" i={2} />
                  <MetricCard icon="☀️" label="Light Exposure" value={`${Math.round(data.light)}`} unit="lux"
                    cond={data.lightLabel} color="#D4A843"
                    chart={history.map(h => h.light)} chartId="lc" i={3} />
                </div>

                {/* Insight + Action */}
                <div className="mb-7 grid gap-4 sm:grid-cols-2">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45 }}
                    className="rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-sm">📊</div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">Trend Insight</p>
                    </div>
                    <p className="text-[13px] leading-relaxed text-stone-600">{data.trendInsight}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.45 }}
                    className="rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm shadow-sm">🎯</div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-600">Action Required</p>
                    </div>
                    <p className="text-[13px] font-semibold leading-relaxed text-stone-700">{data.nextAction}</p>
                  </motion.div>
                </div>

                {/* Session history */}
                {history.length > 2 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.45 }}
                    className="rounded-2xl border border-stone-200/60 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-stone-800">Session History</h3>
                        <p className="text-[11px] text-stone-400">{history.length} readings this session</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-stone-400">
                        {[
                          { l: 'Temp', c: '#E87461' }, { l: 'Humid', c: '#5BA3D9' },
                          { l: 'Moist', c: '#5DAF6A' }, { l: 'Light', c: '#D4A843' },
                        ].map(x => (
                          <span key={x.l} className="flex items-center gap-1">
                            <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: x.c }} />{x.l}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {[
                        { l: 'Temperature (°F)', d: history.map(h => h.temperature), c: '#E87461', id: 'ht' },
                        { l: 'Humidity (%)', d: history.map(h => h.humidity), c: '#5BA3D9', id: 'hh' },
                        { l: 'Soil Moisture', d: history.map(h => h.moisture), c: '#5DAF6A', id: 'hm' },
                        { l: 'Light', d: history.map(h => h.light), c: '#D4A843', id: 'hl' },
                      ].map(ch => (
                        <div key={ch.id}>
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: ch.c }}>{ch.l}</p>
                          <Area data={ch.d} color={ch.c} id={ch.id} h={52} />
                          <div className="mt-0.5 flex justify-between text-[9px] text-stone-300">
                            <span>{fmtTime(history[0].time)}</span>
                            <span>{fmtTime(history[history.length - 1].time)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
