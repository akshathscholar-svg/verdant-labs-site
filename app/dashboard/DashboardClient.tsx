'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  SunIcon, DropletIcon, ThermometerIcon, WindIcon, WarningIcon, BrainIcon, LeafIcon,
} from '../components/Icons';

interface CanopyData {
  temperature: number;
  humidity: number;
  light: number;
  moisture: number;
  plantStatus: string;
  stressScore: number;
  aiReccomendation: string;
}

const POLL_INTERVAL = 3000; // 3 seconds

export default function DashboardClient() {
  const [data, setData] = useState<CanopyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(Math.floor(POLL_INTERVAL / 1000));

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/canopy-live', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch data');
      }
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(pollInterval);
  }, [fetchData]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(c => c > 0 ? c - 1 : Math.floor(POLL_INTERVAL / 1000));
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  const getStatusBadge = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('healthy') || lowerStatus.includes('thriving')) {
      return { bg: 'bg-[#6B8F5E]/10', text: 'text-[#6B8F5E]', dot: 'bg-[#6B8F5E]' };
    }
    if (lowerStatus.includes('warning') || lowerStatus.includes('stress')) {
      return { bg: 'bg-[#B78A2A]/10', text: 'text-[#B78A2A]', dot: 'bg-[#B78A2A]' };
    }
    if (lowerStatus.includes('critical') || lowerStatus.includes('danger')) {
      return { bg: 'bg-[#C4684A]/10', text: 'text-[#C4684A]', dot: 'bg-[#C4684A]' };
    }
    return { bg: 'bg-[#8A857C]/10', text: 'text-[#8A857C]', dot: 'bg-[#8A857C]' };
  };

  const statusBadge = data ? getStatusBadge(data.plantStatus) : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
        {/* Hero Section */}
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B78A2A]">Live Dashboard</p>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#1F1F1B] sm:text-3xl md:text-4xl">Canopy AI Monitoring</h1>
                <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-[#7A756C]">
                  Real-time sensor data from your Canopy AI device &mdash; updates every 3&nbsp;seconds.
                </p>
              </div>
              {data && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="flex items-center gap-5 rounded-xl border border-[#E5DBCC] bg-white/80 px-4 py-3 shadow-sm">
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#8A857C]">Next refresh</p>
                    <p className="text-xl font-bold tabular-nums text-[#3B3933]">{countdown}<span className="text-xs font-medium text-[#8A857C]">s</span></p>
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
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#C4684A]/10">
                <WarningIcon size={20} className="text-[#C4684A]" />
              </div>
              <p className="text-sm text-[#4F4B44]">Unable to reach sensor</p>
              <p className="mt-1 text-[11px] text-[#7A756C]">{error}</p>
              <button onClick={fetchData} className="mt-5 rounded-full bg-[#B78A2A] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#9D7620]">Retry</button>
            </motion.div>
          ) : data ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
                {/* Status Strip */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EDE2]">
                      <LeafIcon size={20} className="text-[#6B8F5E]" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#1F1F1B]">Plant Status</h2>
                      {statusBadge && (
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`} />
                          {data.plantStatus}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Sensor Cards Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Temperature Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C4684A]/10">
                        <ThermometerIcon size={18} className="text-[#C4684A]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#C4684A]">Temperature</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#1F1F1B]">{data.temperature.toFixed(1)}°C</p>
                    <p className="mt-1 text-[11px] text-[#7A756C]">Environmental temperature</p>
                  </motion.div>

                  {/* Humidity Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7B9DAE]/10">
                        <WindIcon size={18} className="text-[#7B9DAE]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B9DAE]">Humidity</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#1F1F1B]">{data.humidity.toFixed(1)}%</p>
                    <p className="mt-1 text-[11px] text-[#7A756C]">Air humidity level</p>
                  </motion.div>

                  {/* Light Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B78A2A]/10">
                        <SunIcon size={18} className="text-[#B78A2A]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#B78A2A]">Light</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#1F1F1B]">{data.light.toFixed(0)} lux</p>
                    <p className="mt-1 text-[11px] text-[#7A756C]">Light intensity</p>
                  </motion.div>

                  {/* Soil Moisture Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6B8F5E]/10">
                        <DropletIcon size={18} className="text-[#6B8F5E]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B8F5E]">Soil Moisture</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#1F1F1B]">{data.moisture.toFixed(1)}%</p>
                    <p className="mt-1 text-[11px] text-[#7A756C]">Soil moisture content</p>
                  </motion.div>
                </div>

                {/* AI Analysis Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Stress Score Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B78A2A]/10">
                        <BrainIcon size={18} className="text-[#B78A2A]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#B78A2A]">AI Stress Score</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#1F1F1B]">{data.stressScore.toFixed(1)}</p>
                    <p className="mt-1 text-[11px] text-[#7A756C]">Plant stress analysis (0-100)</p>
                  </motion.div>

                  {/* AI Recommendation Card */}
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
                    className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6B8F5E]/10">
                        <BrainIcon size={18} className="text-[#6B8F5E]" />
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B8F5E]">AI Recommendation</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-[#1F1F1B] font-semibold">
                      {data.aiReccomendation || 'No recommendation at this time'}
                    </p>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
