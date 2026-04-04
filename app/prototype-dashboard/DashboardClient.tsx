'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sprite from '../components/Sprite';

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
  personalized?: boolean;
  careProfile?: CareProfile | null;
  plantNickname?: string | null;
  plantSpecies?: string | null;
  plantImageUrl?: string | null;
}

interface CareProfile {
  species?: string;
  commonName?: string;
  family?: string;
  description?: string;
  difficulty?: string;
  care?: {
    temperature?: { min?: number; max?: number; unit?: string; note?: string };
    humidity?: { min?: number; max?: number; unit?: string; note?: string };
    light?: { level?: string; note?: string };
    water?: { frequency?: string; note?: string };
    soil?: string;
    fertilizer?: string;
  };
  facts?: string[];
  warnings?: string[];
  seasonalTips?: Record<string, string>;
}

interface HistoryPoint {
  time: string;
  temperature: number;
  humidity: number;
  moisture: number;
  light: number;
}

/* ── App palette ── */
const C = {
  temp: '#C4684A',    // terracotta
  humid: '#7B9DAE',   // muted slate-blue
  moist: '#6B8F5E',   // sage green
  light: '#B78A2A',   // brand gold
};

const POLL = 60_000;

function statusBadge(s: string) {
  if (s === 'Healthy') return { bg: 'bg-[#6B8F5E]/10', text: 'text-[#6B8F5E]', dot: 'bg-[#6B8F5E]' };
  if (s === 'Monitor Closely') return { bg: 'bg-[#B78A2A]/10', text: 'text-[#B78A2A]', dot: 'bg-[#B78A2A]' };
  if (s === 'Needs Attention') return { bg: 'bg-[#C4684A]/10', text: 'text-[#C4684A]', dot: 'bg-[#C4684A]' };
  return { bg: 'bg-[#F3EDE2]', text: 'text-[#5C584F]', dot: 'bg-[#8A857C]' };
}

function condBadge(c: string) {
  if (c === 'In Range' || c === 'Moderate' || c === 'Bright')
    return { cls: 'bg-[#6B8F5E]/10 text-[#6B8F5E]', icon: '\u25CF' };
  if (c === 'Too Low' || c === 'Very Low' || c === 'Dry')
    return { cls: 'bg-[#B78A2A]/10 text-[#B78A2A]', icon: '\u25BC' };
  if (c === 'Too High' || c === 'Wet')
    return { cls: 'bg-[#C4684A]/10 text-[#C4684A]', icon: '\u25B2' };
  return { cls: 'bg-[#F3EDE2] text-[#5C584F]', icon: '\u2014' };
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
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F3EDE2]">
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
      className="group overflow-hidden rounded-2xl border border-[#E5DBCC] bg-white/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-md">
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F3EC] text-xl">{icon}</div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7A756C]">{label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-semibold leading-none tracking-tight text-[#1F1F1B]">{value}</span>
                <span className="text-xs font-medium text-[#8A857C]">{unit}</span>
              </div>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${badge.cls}`}>
            {badge.icon} {cond}
          </span>
        </div>
        {target && <p className="mt-3 text-[11px] text-[#7A756C]">Target <span className="font-medium text-[#5C584F]">{target}</span></p>}
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
      const r = await fetch('/api/prototype-data?personalized=true', { cache: 'no-store' });
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
      <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
        {/* Hero */}
        <section className="border-b border-[#E7DECF] bg-[#F7F3EC] px-6 pb-8 pt-14 md:pb-10 md:pt-18">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B78A2A] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B78A2A]" />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B78A2A]">Live Prototype</p>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#1F1F1B] sm:text-3xl md:text-4xl">Monitoring Dashboard</h1>
                <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-[#7A756C]">
                  Canopy AI hardware prototype &mdash; sensor data refreshes every 60&nbsp;seconds.
                </p>
              </div>
              {data && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-5 rounded-xl border border-[#E5DBCC] bg-white/80 px-4 py-3 shadow-sm">
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#8A857C]">Next refresh</p>
                    <p className="text-xl font-bold tabular-nums text-[#3B3933]">{countdown}<span className="text-xs font-medium text-[#8A857C]">s</span></p>
                  </div>
                  <div className="h-7 w-px bg-[#E5DBCC]" />
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#8A857C]">Readings</p>
                    <p className="text-xl font-bold text-[#3B3933]">{history.length}</p>
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
              <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#E5DBCC] border-t-[#B78A2A]" />
              <p className="text-xs text-[#7A756C]">Connecting to sensor&hellip;</p>
            </motion.div>
          ) : error && !data ? (
            <motion.div key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mx-auto max-w-sm px-6 py-28 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#C4684A]/10 text-lg">&#9888;&#65039;</div>
              <p className="text-sm text-[#4F4B44]">Unable to reach sensor</p>
              <p className="mt-1 text-[11px] text-[#7A756C]">{error}</p>
              <button onClick={fetchData} className="mt-5 rounded-full bg-[#B78A2A] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#9D7620]">Retry</button>
            </motion.div>
          ) : data ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">

                {/* Status strip */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E5DBCC] bg-white/80 p-4 shadow-sm sm:p-5">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EDE2] text-xl">&#127794;</div>
                    <div>
                      <h2 className="text-base font-bold text-[#1F1F1B]">
                        {data.plantNickname || data.plantName}
                      </h2>
                      <div className="flex items-center gap-2">
                        {badge && (
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />{data.plantStatus}
                          </span>
                        )}
                        {data.plantSpecies && (
                          <span className="text-[11px] text-[#7A756C]">{data.plantSpecies}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium text-[#8A857C]">Last updated</p>
                    <p className="text-[11px] font-semibold text-[#5C584F]">{fmtDate(data.updatedAt)}</p>
                  </div>
                </motion.div>

                {/* Personalized plant profile card */}
                {data.personalized && data.careProfile && (
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
                    className="mb-7 rounded-2xl border border-[#6B8F5E]/20 bg-gradient-to-br from-[#6B8F5E]/5 to-[#F7F3EC] p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      {data.plantImageUrl && (
                        <img src={data.plantImageUrl} alt={data.plantSpecies || 'Plant'} className="h-24 w-24 rounded-xl border border-[#E5DBCC] object-cover shadow-sm" />
                      )}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B8F5E]">Plant Profile</p>
                          {data.careProfile.difficulty && (
                            <span className="rounded-full bg-[#6B8F5E]/10 px-2 py-0.5 text-[9px] font-bold text-[#6B8F5E]">
                              {data.careProfile.difficulty}
                            </span>
                          )}
                        </div>
                        {data.careProfile.description && (
                          <p className="mb-3 text-[13px] leading-relaxed text-[#4F4B44]">{data.careProfile.description}</p>
                        )}
                        {data.careProfile.care && (
                          <div className="grid gap-2 text-[11px] sm:grid-cols-2 lg:grid-cols-3">
                            {data.careProfile.care.light?.level && (
                              <div className="rounded-lg bg-white/60 px-3 py-2">
                                <span className="font-bold text-[#B78A2A]">☀️ Light:</span>{' '}
                                <span className="text-[#4F4B44]">{data.careProfile.care.light.level}</span>
                              </div>
                            )}
                            {data.careProfile.care.water?.frequency && (
                              <div className="rounded-lg bg-white/60 px-3 py-2">
                                <span className="font-bold text-[#7B9DAE]">💧 Water:</span>{' '}
                                <span className="text-[#4F4B44]">{data.careProfile.care.water.frequency}</span>
                              </div>
                            )}
                            {data.careProfile.care.temperature && (
                              <div className="rounded-lg bg-white/60 px-3 py-2">
                                <span className="font-bold text-[#C4684A]">🌡️ Temp:</span>{' '}
                                <span className="text-[#4F4B44]">{data.careProfile.care.temperature.min}–{data.careProfile.care.temperature.max}{data.careProfile.care.temperature.unit}</span>
                              </div>
                            )}
                          </div>
                        )}
                        {data.careProfile.warnings && data.careProfile.warnings.length > 0 && (
                          <div className="mt-3 rounded-lg bg-[#C4684A]/5 px-3 py-2 text-[11px] text-[#C4684A]">
                            ⚠️ {data.careProfile.warnings[0]}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick bars */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
                  className="mb-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { l: 'Temperature', v: data.temperature, mx: 120, u: '\u00B0F', c: C.temp },
                    { l: 'Humidity', v: data.humidity, mx: 100, u: '%', c: C.humid },
                    { l: 'Moisture', v: data.moisture, mx: 1023, u: 'raw', c: C.moist },
                    { l: 'Light', v: data.light, mx: 1023, u: 'lux', c: C.light },
                  ].map(m => (
                    <div key={m.l} className="rounded-xl border border-[#E5DBCC] bg-white/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A756C]">{m.l}</span>
                        <span className="text-[11px] font-bold text-[#4F4B44]">
                          {m.l === 'Temperature' ? m.v.toFixed(1) : Math.round(m.v)} {m.u}
                        </span>
                      </div>
                      <Bar pct={(m.v / m.mx) * 100} color={m.c} />
                    </div>
                  ))}
                </motion.div>

                {/* Sensor cards */}
                <div className="mb-7 grid gap-4 sm:grid-cols-2">
                  <MetricCard icon="&#127777;&#65039;" label="Temperature" value={data.temperature.toFixed(1)} unit={'\u00B0F'}
                    cond={data.tempCondition} target={data.tempRange} color={C.temp}
                    chart={history.map(h => h.temperature)} chartId="tc" i={0} />
                  <MetricCard icon="&#128167;" label="Humidity" value={`${Math.round(data.humidity)}`} unit="%"
                    cond={data.humidityCondition} target={data.humidityRange} color={C.humid}
                    chart={history.map(h => h.humidity)} chartId="hc" i={1} />
                  <MetricCard icon="&#127793;" label="Soil Moisture" value={`${Math.round(data.moisture)}`} unit="raw"
                    cond={data.moistureLabel} target={'0 (wet) \u2192 1023 (dry)'} color={C.moist}
                    chart={history.map(h => h.moisture)} chartId="mc" i={2} />
                  <MetricCard icon="&#9728;&#65039;" label="Light Exposure" value={`${Math.round(data.light)}`} unit="lux"
                    cond={data.lightLabel} color={C.light}
                    chart={history.map(h => h.light)} chartId="lc" i={3} />
                </div>

                {/* Insight + Action */}
                <div className="mb-7 grid gap-4 sm:grid-cols-2">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3EDE2] text-sm">&#128202;</div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7A756C]">Trend Insight</p>
                    </div>
                    <p className="text-[13px] leading-relaxed text-[#4F4B44]">{data.trendInsight}</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.45 }}
                    className="rounded-2xl border border-[#D8CAB1] bg-gradient-to-br from-[#F3EDE2] to-[#F7F3EC] p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-sm shadow-sm">&#127919;</div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#B78A2A]">Action Required</p>
                    </div>
                    <p className="text-[13px] font-semibold leading-relaxed text-[#3B3933]">{data.nextAction}</p>
                  </motion.div>
                </div>

                {/* Session history */}
                {history.length > 2 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.45 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm sm:p-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-[#1F1F1B]">Session History</h3>
                        <p className="text-[11px] text-[#7A756C]">{history.length} readings this session</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[9px] font-bold uppercase tracking-wider text-[#7A756C]">
                        {[
                          { l: 'Temp', c: C.temp }, { l: 'Humid', c: C.humid },
                          { l: 'Moist', c: C.moist }, { l: 'Light', c: C.light },
                        ].map(x => (
                          <span key={x.l} className="flex items-center gap-1">
                            <span className="h-1.5 w-3 rounded-full" style={{ backgroundColor: x.c }} />{x.l}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {[
                        { l: 'Temperature (\u00B0F)', d: history.map(h => h.temperature), c: C.temp, id: 'ht' },
                        { l: 'Humidity (%)', d: history.map(h => h.humidity), c: C.humid, id: 'hh' },
                        { l: 'Soil Moisture', d: history.map(h => h.moisture), c: C.moist, id: 'hm' },
                        { l: 'Light', d: history.map(h => h.light), c: C.light, id: 'hl' },
                      ].map(ch => (
                        <div key={ch.id}>
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: ch.c }}>{ch.l}</p>
                          <Area data={ch.d} color={ch.c} id={ch.id} h={52} />
                          <div className="mt-0.5 flex justify-between text-[9px] text-[#8A857C]">
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
      {/* Sprite AI assistant */}
      {data && (
        <Sprite plantContext={{
          species: data.plantSpecies || data.plantName,
          nickname: data.plantNickname || undefined,
          sensorData: {
            temperature: data.temperature,
            humidity: data.humidity,
            moisture: data.moisture,
            light: data.light,
          },
          careProfile: data.careProfile as Record<string, unknown> || undefined,
        }} />
      )}
      <Footer />
    </>
  );
}
