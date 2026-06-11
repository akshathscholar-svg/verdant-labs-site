'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SunIcon, DropletIcon, ThermometerIcon, WindIcon, BrainIcon, LeafIcon } from '../components/Icons';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

type SerialPortLike = {
  open: (options: { baudRate: number }) => Promise<void>;
  close: () => Promise<void>;
  readable: ReadableStream<Uint8Array> | null;
};

type SerialNavigator = Navigator & {
  serial?: {
    requestPort: () => Promise<SerialPortLike>;
  };
};

interface SerialPayload {
  temperature?: number;
  humidity?: number;
  light?: number;
  moisture?: number;
  stressScore?: number;
  plantStatus?: string;
  aiRecommendation?: string;
  sht40?: boolean | string | number;
  bh1750?: boolean | string | number;
  soil?: boolean | string | number;
  oled?: boolean | string | number;
}

interface DashboardData {
  temperature: number;
  humidity: number;
  light: number;
  moisture: number;
  stressScore: number;
  plantStatus: string;
  aiRecommendation: string;
  sht40: boolean | null;
  bh1750: boolean | null;
  soil: boolean | null;
  oled: boolean | null;
}

const defaultData: DashboardData = {
  temperature: 0,
  humidity: 0,
  light: 0,
  moisture: 0,
  stressScore: 0,
  plantStatus: 'Awaiting data',
  aiRecommendation: '',
  sht40: null,
  bh1750: null,
  soil: null,
  oled: null,
};

const toNumber = (value: unknown, fallback: number) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const toHealth = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'string') {
    const v = value.trim().toLowerCase();
    if (v === 'ok' || v === 'true' || v === 'connected' || v === 'online' || v === '1') return true;
    if (v === 'false' || v === 'disconnected' || v === 'offline' || v === '0' || v === 'error') return false;
  }
  return null;
};

const statusTheme: Record<ConnectionStatus, { dot: string; text: string; bg: string }> = {
  disconnected: { dot: 'bg-[#8A857C]', text: 'text-[#6B675F]', bg: 'bg-[#F0E9DB]' },
  connecting: { dot: 'bg-[#B78A2A]', text: 'text-[#8F6C1D]', bg: 'bg-[#F3E8CC]' },
  connected: { dot: 'bg-[#6B8F5E]', text: 'text-[#4E7042]', bg: 'bg-[#E9F1E6]' },
  error: { dot: 'bg-[#C4684A]', text: 'text-[#A45036]', bg: 'bg-[#F8E5DE]' },
};

export default function DashboardClient() {
  const [serialSupported, setSerialSupported] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>(defaultData);
  const [hasData, setHasData] = useState(false);

  const portRef = useRef<SerialPortLike | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const keepReadingRef = useRef(false);

  useEffect(() => {
    setSerialSupported(typeof window !== 'undefined' && !!(navigator as SerialNavigator).serial);
  }, []);

  const disconnect = useCallback(async () => {
    keepReadingRef.current = false;
    try {
      if (readerRef.current) {
        await readerRef.current.cancel();
        readerRef.current.releaseLock();
      }
    } catch {
      // no-op: reader may already be released/cancelled
    } finally {
      readerRef.current = null;
    }

    try {
      if (portRef.current) {
        await portRef.current.close();
      }
    } catch {
      // no-op: port may already be closed
    } finally {
      portRef.current = null;
      setStatus('disconnected');
    }
  }, []);

  useEffect(() => () => {
    void disconnect();
  }, [disconnect]);

  const applyPayload = useCallback((payload: SerialPayload) => {
    setData(prev => ({
      temperature: toNumber(payload.temperature, prev.temperature),
      humidity: toNumber(payload.humidity, prev.humidity),
      light: toNumber(payload.light, prev.light),
      moisture: toNumber(payload.moisture, prev.moisture),
      stressScore: toNumber(payload.stressScore, prev.stressScore),
      plantStatus: typeof payload.plantStatus === 'string' && payload.plantStatus.trim().length > 0
        ? payload.plantStatus
        : prev.plantStatus,
      aiRecommendation: typeof payload.aiRecommendation === 'string'
        ? payload.aiRecommendation
        : prev.aiRecommendation,
      sht40: payload.sht40 !== undefined ? toHealth(payload.sht40) : prev.sht40,
      bh1750: payload.bh1750 !== undefined ? toHealth(payload.bh1750) : prev.bh1750,
      soil: payload.soil !== undefined ? toHealth(payload.soil) : prev.soil,
      oled: payload.oled !== undefined ? toHealth(payload.oled) : prev.oled,
    }));
    setHasData(true);
  }, []);

  const startReading = useCallback(async (port: SerialPortLike) => {
    if (!port.readable) {
      throw new Error('Serial port is not readable.');
    }
    keepReadingRef.current = true;
    const reader = port.readable.getReader();
    readerRef.current = reader;
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (keepReadingRef.current) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;
          try {
            const payload = JSON.parse(line) as SerialPayload;
            applyPayload(payload);
            setStatus('connected');
            setError(null);
          } catch {
            // Ignore malformed lines and keep reading
          }
        }
      }
    } finally {
      reader.releaseLock();
      readerRef.current = null;
    }
  }, [applyPayload]);

  const connect = useCallback(async () => {
    if (!serialSupported) return;

    setStatus('connecting');
    setError(null);
    try {
      if (portRef.current) {
        await disconnect();
      }
      const serialApi = (navigator as SerialNavigator).serial;
      if (!serialApi) {
        throw new Error('Web Serial is unavailable in this browser.');
      }
      const port = await serialApi.requestPort();
      await port.open({ baudRate: 115200 });
      portRef.current = port;
      setStatus('connected');
      await startReading(port);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Serial connection failed.');
      await disconnect();
      setStatus('error');
    }
  }, [disconnect, serialSupported, startReading]);

  const statusChip = statusTheme[status];

  const healthRows = useMemo(() => ([
    { key: 'sht40', label: 'SHT40', value: data.sht40 },
    { key: 'bh1750', label: 'BH1750', value: data.bh1750 },
    { key: 'soil', label: 'Soil', value: data.soil },
    { key: 'oled', label: 'OLED', value: data.oled },
  ]), [data.bh1750, data.oled, data.sht40, data.soil]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
        <section className="border-b border-[#E7DECF] px-6 pb-10 pt-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B78A2A]">Canopy AI V2</p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Live Prototype Dashboard</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B675F]">
                This demo reads directly from the V2 prototype over USB.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusChip.bg} ${statusChip.text}`}>
                <span className={`h-2 w-2 rounded-full ${statusChip.dot}`} />
                {status}
              </span>
              <button
                onClick={connect}
                disabled={!serialSupported || status === 'connecting'}
                className="rounded-full bg-[#B78A2A] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9D7620] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'connecting' ? 'Connecting…' : 'Connect V2 Prototype'}
              </button>
            </div>
          </div>
        </section>

        {!serialSupported && (
          <section className="mx-auto max-w-6xl px-6 py-5">
            <div className="rounded-xl border border-[#E5DBCC] bg-white/80 p-4 text-sm text-[#6B675F]">
              Use Chrome or Edge on a laptop connected to the prototype by USB.
            </div>
          </section>
        )}

        {error && (
          <section className="mx-auto max-w-6xl px-6 pt-5">
            <div className="rounded-xl border border-[#EACABB] bg-[#F8E5DE] p-4 text-sm text-[#A45036]">
              {error}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#C4684A]">
                <ThermometerIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">Temperature</h2>
              </div>
              <p className="text-3xl font-bold">{data.temperature.toFixed(1)}°C</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#7B9DAE]">
                <WindIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">Humidity</h2>
              </div>
              <p className="text-3xl font-bold">{data.humidity.toFixed(1)}%</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#B78A2A]">
                <SunIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">Light</h2>
              </div>
              <p className="text-3xl font-bold">{data.light.toFixed(0)} lux</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#6B8F5E]">
                <DropletIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">Soil Moisture</h2>
              </div>
              <p className="text-3xl font-bold">{data.moisture.toFixed(1)}%</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#B78A2A]">
                <BrainIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">AI Stress Score</h2>
              </div>
              <p className="text-3xl font-bold">{data.stressScore.toFixed(1)}</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-[#6B8F5E]">
                <LeafIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">Plant Status</h2>
              </div>
              <p className="text-xl font-semibold">{data.plantStatus || 'Awaiting data'}</p>
            </article>

            <article className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm sm:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-[#6B8F5E]">
                <BrainIcon size={18} />
                <h2 className="text-xs font-bold uppercase tracking-wider">AI Recommendation</h2>
              </div>
              <p className="text-base font-medium leading-relaxed">
                {data.aiRecommendation || 'Waiting for AI recommendation from prototype.'}
              </p>
            </article>
          </div>

          <section className="mt-6 rounded-2xl border border-[#E5DBCC] bg-white/80 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-[#3A3832]">Device Health</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {healthRows.map(row => (
                <div key={row.key} className="rounded-xl border border-[#EEE5D8] bg-[#FCFAF5] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8A857C]">{row.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#2F2D28]">
                    {row.value === null ? 'Unknown' : row.value ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {!hasData && status === 'connected' && (
            <p className="mt-5 text-sm text-[#6B675F]">Connected. Waiting for JSON lines from the prototype serial stream.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
