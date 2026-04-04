'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

/* ── Types ── */
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

/* ── Helpers ── */
const POLL_INTERVAL = 60_000; // 60 seconds

function statusColor(status: string) {
  switch (status) {
    case 'Healthy':
      return 'bg-[#4A7C59]/15 text-[#4A7C59] border-[#4A7C59]/30';
    case 'Monitor Closely':
      return 'bg-[#B78A2A]/15 text-[#B78A2A] border-[#B78A2A]/30';
    case 'Needs Attention':
      return 'bg-[#C0392B]/15 text-[#C0392B] border-[#C0392B]/30';
    default:
      return 'bg-[#5C584F]/15 text-[#5C584F] border-[#5C584F]/30';
  }
}

function conditionColor(condition: string) {
  if (condition === 'In Range') return 'text-[#4A7C59]';
  if (condition === 'Too Low' || condition === 'Too High') return 'text-[#C0392B]';
  return 'text-[#B78A2A]';
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/* ── Mini sparkline chart ── */
function Sparkline({
  data,
  color,
  height = 48,
  width = 200,
}: {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Gauge ring ── */
function GaugeRing({
  value,
  max,
  label,
  unit,
  color,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}) {
  const pct = Math.min(value / max, 1);
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct);
  return (
    <div className="flex flex-col items-center">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#E7DECF" strokeWidth="6" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
          className="transition-all duration-700"
        />
        <text x="48" y="44" textAnchor="middle" className="fill-[#2E2C28] text-sm font-semibold" fontSize="16">
          {Math.round(value)}
        </text>
        <text x="48" y="60" textAnchor="middle" className="fill-[#5C584F]" fontSize="10">
          {unit}
        </text>
      </svg>
      <p className="mt-1 text-xs font-medium text-[#5C584F]">{label}</p>
    </div>
  );
}

/* ── Main Component ── */
export default function DashboardClient() {
  const [data, setData] = useState<PrototypeData | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(POLL_INTERVAL / 1000);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/prototype-data', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const json: PrototypeData = await res.json();
      setData(json);
      setError(null);
      setHistory((prev) => {
        const next = [
          ...prev,
          {
            time: json.updatedAt,
            temperature: json.temperature,
            humidity: json.humidity,
            moisture: json.moisture,
            light: json.light,
          },
        ];
        return next.slice(-30); // keep last 30 readings
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setCountdown(POLL_INTERVAL / 1000);
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Countdown timer
  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : POLL_INTERVAL / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E7DECF] bg-gradient-to-b from-[#F7F3EC] to-[#EDE8DE] px-6 py-16 text-center md:py-20">
          <Reveal>
            <div className="mx-auto mb-3 flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4A7C59] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4A7C59]" />
              </span>
              <p className="text-xs uppercase tracking-[0.3em] text-[#4A7C59]">
                Live Monitoring
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto max-w-3xl text-3xl font-light leading-tight text-[#2E2C28] md:text-4xl lg:text-5xl">
              Prototype Dashboard
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#5C584F]">
              Real-time Canopy AI sensor readings — refreshing every 60 seconds.
            </p>
          </Reveal>
        </section>

        {loading && !data ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E7DECF] border-t-[#B78A2A]" />
          </div>
        ) : error && !data ? (
          <div className="mx-auto max-w-md px-6 py-32 text-center">
            <p className="text-sm text-[#C0392B]">Error: {error}</p>
            <button
              onClick={fetchData}
              className="mt-4 rounded-full bg-[#B78A2A] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#9D7620]"
            >
              Retry
            </button>
          </div>
        ) : data ? (
          <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            {/* Status bar */}
            <Reveal>
              <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E7DECF] bg-white p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🌿</span>
                  <div>
                    <h2 className="text-xl font-semibold text-[#2E2C28]">{data.plantName}</h2>
                    <span
                      className={`mt-1 inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${statusColor(data.plantStatus)}`}
                    >
                      {data.plantStatus}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-[#7A7668]">
                  <p>Last updated: {formatTimestamp(data.updatedAt)}</p>
                  <p className="mt-0.5">Next refresh in {countdown}s</p>
                </div>
              </div>
            </Reveal>

            {/* Gauge rings */}
            <Reveal delay={0.05}>
              <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div className="flex justify-center rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <GaugeRing value={data.temperature} max={120} label="Temperature" unit="°F" color="#C0392B" />
                </div>
                <div className="flex justify-center rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <GaugeRing value={data.humidity} max={100} label="Humidity" unit="%" color="#2980B9" />
                </div>
                <div className="flex justify-center rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <GaugeRing value={data.moisture} max={1023} label="Soil Moisture" unit="raw" color="#4A7C59" />
                </div>
                <div className="flex justify-center rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <GaugeRing value={data.light} max={1023} label="Light" unit="lux" color="#B78A2A" />
                </div>
              </div>
            </Reveal>

            {/* Detail cards grid */}
            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Temperature card */}
              <Reveal delay={0.08}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Temperature</p>
                    <span className="text-lg">🌡️</span>
                  </div>
                  <p className="mt-3 text-3xl font-light text-[#2E2C28]">{data.temperature.toFixed(1)}°F</p>
                  <p className={`mt-1 text-xs font-semibold ${conditionColor(data.tempCondition)}`}>{data.tempCondition}</p>
                  <p className="mt-2 text-xs text-[#7A7668]">Target: {data.tempRange}</p>
                  {history.length > 1 && (
                    <div className="mt-4">
                      <Sparkline data={history.map((h) => h.temperature)} color="#C0392B" />
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Humidity card */}
              <Reveal delay={0.12}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Humidity</p>
                    <span className="text-lg">💧</span>
                  </div>
                  <p className="mt-3 text-3xl font-light text-[#2E2C28]">{data.humidity}%</p>
                  <p className={`mt-1 text-xs font-semibold ${conditionColor(data.humidityCondition)}`}>{data.humidityCondition}</p>
                  <p className="mt-2 text-xs text-[#7A7668]">Target: {data.humidityRange}</p>
                  {history.length > 1 && (
                    <div className="mt-4">
                      <Sparkline data={history.map((h) => h.humidity)} color="#2980B9" />
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Soil Moisture card */}
              <Reveal delay={0.16}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Soil Moisture</p>
                    <span className="text-lg">🌱</span>
                  </div>
                  <p className="mt-3 text-3xl font-light text-[#2E2C28]">{Math.round(data.moisture)}</p>
                  <p className={`mt-1 text-xs font-semibold ${data.moistureLabel === 'Dry' ? 'text-[#C0392B]' : data.moistureLabel === 'Wet' ? 'text-[#2980B9]' : 'text-[#4A7C59]'}`}>
                    {data.moistureLabel}
                  </p>
                  <p className="mt-2 text-xs text-[#7A7668]">0 (wet) → 1023 (dry)</p>
                  {history.length > 1 && (
                    <div className="mt-4">
                      <Sparkline data={history.map((h) => h.moisture)} color="#4A7C59" />
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Light card */}
              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Light Exposure</p>
                    <span className="text-lg">☀️</span>
                  </div>
                  <p className="mt-3 text-3xl font-light text-[#2E2C28]">{Math.round(data.light)}</p>
                  <p className={`mt-1 text-xs font-semibold ${data.lightLabel === 'Very Low' ? 'text-[#C0392B]' : data.lightLabel === 'Low' ? 'text-[#B78A2A]' : 'text-[#4A7C59]'}`}>
                    {data.lightLabel}
                  </p>
                  <p className="mt-2 text-xs text-[#7A7668]">0 (dark) → 1023 (bright)</p>
                  {history.length > 1 && (
                    <div className="mt-4">
                      <Sparkline data={history.map((h) => h.light)} color="#B78A2A" />
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Trend Insight card */}
              <Reveal delay={0.24}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Trend Insight</p>
                    <span className="text-lg">📊</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#2E2C28]">{data.trendInsight}</p>
                </div>
              </Reveal>

              {/* Recommended Action card */}
              <Reveal delay={0.28}>
                <div className="rounded-2xl border border-[#B78A2A]/30 bg-[#B78A2A]/5 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Recommended Action</p>
                    <span className="text-lg">🎯</span>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[#2E2C28]">{data.nextAction}</p>
                </div>
              </Reveal>
            </div>

            {/* History chart section */}
            {history.length > 2 && (
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-[#E7DECF] bg-white p-6 md:p-8">
                  <h3 className="mb-1 text-sm font-semibold text-[#2E2C28]">Session History</h3>
                  <p className="mb-6 text-xs text-[#7A7668]">{history.length} readings collected this session</p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#C0392B]">Temperature (°F)</p>
                      <Sparkline data={history.map((h) => h.temperature)} color="#C0392B" height={64} />
                      <div className="mt-1 flex justify-between text-[10px] text-[#7A7668]">
                        <span>{formatTime(history[0].time)}</span>
                        <span>{formatTime(history[history.length - 1].time)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#2980B9]">Humidity (%)</p>
                      <Sparkline data={history.map((h) => h.humidity)} color="#2980B9" height={64} />
                      <div className="mt-1 flex justify-between text-[10px] text-[#7A7668]">
                        <span>{formatTime(history[0].time)}</span>
                        <span>{formatTime(history[history.length - 1].time)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#4A7C59]">Soil Moisture</p>
                      <Sparkline data={history.map((h) => h.moisture)} color="#4A7C59" height={64} />
                      <div className="mt-1 flex justify-between text-[10px] text-[#7A7668]">
                        <span>{formatTime(history[0].time)}</span>
                        <span>{formatTime(history[history.length - 1].time)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#B78A2A]">Light</p>
                      <Sparkline data={history.map((h) => h.light)} color="#B78A2A" height={64} />
                      <div className="mt-1 flex justify-between text-[10px] text-[#7A7668]">
                        <span>{formatTime(history[0].time)}</span>
                        <span>{formatTime(history[history.length - 1].time)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
