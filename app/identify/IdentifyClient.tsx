'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { identifyPlant, type PlantResult } from '../actions/identify';
import {
  SunIcon, DropletIcon, CalendarIcon, FogIcon, ThermometerIcon,
  PlantPotIcon, FlaskIcon, DollarIcon, HomeIcon, MapIcon,
  RulerIcon, TrendingUpIcon, SeedlingIcon, WheatIcon,
  ScissorsIcon, HandshakeIcon, WarningIcon,
} from '../components/Icons';
import type { ComponentType } from 'react';

/* ── compress image client-side to fit server action limits ── */
function compressImage(dataUrl: string, maxDim = 1024, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = (height * maxDim) / width; width = maxDim; }
        else { width = (width * maxDim) / height; height = maxDim; }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataUrl;
  });
}

type CameraState = 'idle' | 'requesting' | 'live' | 'denied';

export default function IdentifyClient() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [cameraState, setCameraState] = useState<CameraState>('idle');

  const fileRef = useRef<HTMLInputElement>(null);
  const mobileFileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── cleanup camera on unmount ── */
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  /* ── start live camera ── */
  const startCamera = useCallback(async () => {
    setCameraState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState('live');
    } catch {
      setCameraState('denied');
    }
  }, []);

  /* ── stop camera ── */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraState('idle');
  }, []);

  /* ── capture from live video ── */
  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    stopCamera();
    const compressed = await compressImage(dataUrl);
    setPreview(compressed);
    setMode('upload');
    setLoading(true);
    setError(null);
    setResult(null);
    const res = await identifyPlant(compressed);
    setLoading(false);
    if (res.ok) setResult(res.result);
    else setError(res.error);
  }, [stopCamera]);

  /* ── read file → compress → auto-identify ── */
  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please upload an image file.'); return; }
    if (file.size > 20 * 1024 * 1024) { setError('Image must be under 20 MB.'); return; }
    setError(null);
    setResult(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const raw = reader.result as string;
      const compressed = await compressImage(raw);
      setPreview(compressed);
      const res = await identifyPlant(compressed);
      setLoading(false);
      if (res.ok) setResult(res.result);
      else setError(res.error);
    };
    reader.readAsDataURL(file);
  }, []);

  /* ── drop handler ── */
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  /* ── reset ── */
  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    setLoading(false);
    stopCamera();
    setMode('upload');
    if (fileRef.current) fileRef.current.value = '';
    if (mobileFileRef.current) mobileFileRef.current.value = '';
  };

  /* ── switch to camera tab ── */
  const handleCameraTab = () => {
    setMode('camera');
    startCamera();
  };

  /* ── grid helpers ── */
  const careGrid: { label: string; value: string; icon: ComponentType<{ size?: number; className?: string }> }[] = result
    ? [
        { label: 'Light', value: result.light, icon: SunIcon },
        { label: 'Water', value: result.water, icon: DropletIcon },
        { label: 'How Often', value: result.waterFrequency, icon: CalendarIcon },
        { label: 'Humidity', value: result.humidity, icon: FogIcon },
        { label: 'Temperature', value: result.temperature, icon: ThermometerIcon },
        { label: 'Soil', value: result.soil, icon: PlantPotIcon },
        { label: 'Fertilizer', value: result.fertilizerNeeds, icon: FlaskIcon },
        { label: 'Est. Cost', value: result.estimatedCost, icon: DollarIcon },
      ]
    : [];

  const growerGrid: { label: string; value: string; icon: ComponentType<{ size?: number; className?: string }> }[] = result
    ? [
        { label: 'Indoor / Outdoor', value: result.indoorOutdoor, icon: HomeIcon },
        { label: 'Growing Zones', value: result.growingZones, icon: MapIcon },
        { label: 'Mature Size', value: result.matureSize, icon: RulerIcon },
        { label: 'Growth Rate', value: result.growthRate, icon: TrendingUpIcon },
        { label: 'Planting Season', value: result.plantingSeason, icon: SeedlingIcon },
        { label: 'Harvest Season', value: result.harvestSeason, icon: WheatIcon },
        { label: 'Propagation', value: result.propagation, icon: ScissorsIcon },
        { label: 'Companion Plants', value: result.companionPlants, icon: HandshakeIcon },
      ]
    : [];

  const showInput = !preview && !loading;

  return (
    <div
      className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      {/* ── Top bar ── */}
      <div className="border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#5C584F] transition hover:text-[#B78A2A]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Verdant Labs
          </Link>
          <span className="rounded-full border border-[#B78A2A]/30 bg-[#B78A2A]/8 px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest text-[#B78A2A]">
            Camera Studio
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-10">
        {/* ── Title ── */}
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
            Canopy AI
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Camera Studio
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5C584F]">
            Capture or upload a plant photo. AI identifies the species, care
            requirements, grower info, and estimated cost in seconds.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            INPUT AREA
           ══════════════════════════════════════════════════════ */}
        {showInput && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Tab Switcher */}
            <div className="mx-auto mb-6 flex max-w-xs overflow-hidden rounded-full border border-[#E5DBCC] bg-white p-1">
              <button
                onClick={() => { setMode('upload'); stopCamera(); }}
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === 'upload'
                    ? 'bg-[#B78A2A] text-white shadow-sm'
                    : 'text-[#5C584F] hover:text-[#1F1F1B]'
                }`}
              >
                Upload
              </button>
              <button
                onClick={handleCameraTab}
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                  mode === 'camera'
                    ? 'bg-[#B78A2A] text-white shadow-sm'
                    : 'text-[#5C584F] hover:text-[#1F1F1B]'
                }`}
              >
                Camera
              </button>
            </div>

            {/* ── Upload Mode ── */}
            {mode === 'upload' && (
              <div
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
                onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(false); }}
                onDrop={(e) => { e.stopPropagation(); handleDrop(e); }}
                className={`flex flex-col items-center gap-5 rounded-[1.75rem] border-2 border-dashed p-10 text-center transition-colors ${
                  dragOver ? 'border-[#B78A2A] bg-[#B78A2A]/5' : 'border-[#DDD5C6] bg-white/40'
                }`}
              >
                <div className="pointer-events-none flex h-16 w-16 items-center justify-center rounded-full bg-[#B78A2A]/10">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>

                <div className="pointer-events-none">
                  <p className="text-sm font-semibold">Drop a plant photo here</p>
                  <p className="mt-1 text-xs text-[#5C584F]">JPG, PNG, WebP — up to 20 MB</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="rounded-full bg-[#B78A2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9D7620]"
                  >
                    Choose File
                  </button>
                  <button
                    onClick={() => mobileFileRef.current?.click()}
                    className="rounded-full border border-[#B78A2A]/30 px-5 py-2.5 text-sm font-medium text-[#B78A2A] transition hover:bg-[#B78A2A]/5 sm:hidden"
                  >
                    Take Photo
                  </button>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                />
                <input
                  ref={mobileFileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                />
              </div>
            )}

            {/* ── Camera Mode ── */}
            {mode === 'camera' && (
              <div className="overflow-hidden rounded-[1.75rem] border border-[#E5DBCC] bg-[#0F180F]">
                {/* Viewfinder */}
                <div className="relative aspect-[4/3] w-full bg-black">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    playsInline
                    muted
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Framing Guide Overlay */}
                  {cameraState === 'live' && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-[70%] w-[70%] rounded-3xl border-2 border-white/20" />
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-xs font-medium text-white/60">
                          Center the plant within the frame
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Permission states */}
                  {cameraState === 'requesting' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80">
                      <svg className="h-6 w-6 animate-spin text-[#B78A2A]" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <p className="text-sm text-white/70">Requesting camera access…</p>
                    </div>
                  )}

                  {cameraState === 'denied' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/80 px-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C4684A]/20">
                        <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#C4684A]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="1" y1="1" x2="23" y2="23" />
                          <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2v9.34" />
                          <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Camera Access Denied</p>
                        <p className="mt-1 text-xs text-white/50">
                          Enable camera permissions in your browser settings, then try again.
                        </p>
                      </div>
                      <button
                        onClick={startCamera}
                        className="rounded-full bg-[#B78A2A] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#9D7620]"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  {cameraState === 'idle' && mode === 'camera' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <button
                        onClick={startCamera}
                        className="rounded-full bg-[#B78A2A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9D7620]"
                      >
                        Start Camera
                      </button>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                {cameraState === 'live' && (
                  <div className="flex items-center justify-center gap-6 bg-[#0F180F] py-5">
                    <button
                      onClick={() => { stopCamera(); setMode('upload'); }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:bg-white/10"
                      aria-label="Cancel"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>

                    <button
                      onClick={capturePhoto}
                      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/80 bg-white transition hover:scale-105 active:scale-95"
                      aria-label="Capture photo"
                    >
                      <div className="h-12 w-12 rounded-full bg-white" />
                    </button>

                    <div className="h-10 w-10" /> {/* spacer for centering */}
                  </div>
                )}
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { tip: 'Good lighting', sub: 'Natural light works best' },
                { tip: 'Clear focus', sub: 'Show leaves and stem' },
                { tip: 'Close up', sub: 'Fill the frame with the plant' },
              ].map((t) => (
                <div key={t.tip} className="rounded-xl border border-[#E5DBCC] bg-white/60 p-3 text-center">
                  <p className="text-xs font-semibold text-[#3B3933]">{t.tip}</p>
                  <p className="mt-0.5 text-[10px] text-[#8A857C]">{t.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            LOADING STATE
           ══════════════════════════════════════════════════════ */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6 py-8">
            {preview && (
              <div className="overflow-hidden rounded-[1.75rem] border border-[#E7DECF] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Analyzing" className="max-h-[320px] w-full object-contain" />
              </div>
            )}
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <svg className="h-12 w-12 animate-spin text-[#B78A2A]" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" opacity="0.15" />
                  <path d="M25 5a20 20 0 0 1 20 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-[#1F1F1B]">Analyzing your plant…</p>
                <p className="mt-1 text-xs text-[#8A857C]">
                  Identifying species, care needs, and grower details
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Error ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 px-6 py-5 text-center"
            >
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={handleReset}
                className="mt-3 rounded-full bg-red-100 px-5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-200"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════
            RESULT CARD
           ══════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-2"
            >
              {/* Image + name header */}
              <div className="relative overflow-hidden rounded-t-[1.75rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview!} alt={result.commonName} className="h-60 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 px-7 pb-6">
                  <h2 className="text-2xl font-bold text-white">{result.commonName}</h2>
                  <p className="mt-0.5 text-sm italic text-white/70">{result.scientificName}</p>
                </div>
              </div>

              {/* Info body */}
              <div className="rounded-b-[1.75rem] border border-t-0 border-[#E7DECF] bg-white p-7">
                {/* Quick badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F0EBDF] px-3 py-1 text-[11px] font-medium text-[#5C584F]">
                    {result.family}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    result.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700'
                      : result.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                  }`}>
                    {result.difficulty}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    result.toxicity.includes('Non') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {result.toxicity}
                  </span>
                  <span className="rounded-full bg-[#F0EBDF] px-3 py-1 text-[11px] font-medium text-[#5C584F]">
                    {result.indoorOutdoor}
                  </span>
                </div>

                {/* Summary */}
                <p className="mt-5 text-sm leading-relaxed text-[#3B3933]">{result.summary}</p>

                {/* ── Care Guide ── */}
                <div className="mt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Care Guide</p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {careGrid.map((item) => (
                      <div key={item.label} className="rounded-xl bg-[#F7F3EC] p-3.5">
                        <div className="flex items-center gap-1.5">
                          {(() => { const Icon = item.icon; return <Icon size={14} className="text-[#B78A2A]" />; })()}
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B78A2A]">{item.label}</p>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-snug text-[#3B3933]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Grower Info ── */}
                <div className="mt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">Grower Info</p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {growerGrid.map((item) => (
                      <div key={item.label} className="rounded-xl bg-[#F7F3EC] p-3.5">
                        <div className="flex items-center gap-1.5">
                          {(() => { const Icon = item.icon; return <Icon size={14} className="text-[#B78A2A]" />; })()}
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B78A2A]">{item.label}</p>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-snug text-[#3B3933]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Common Problems ── */}
                <div className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <WarningIcon size={14} className="text-amber-700" />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">Common Problems</p>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#3B3933]">{result.commonProblems}</p>
                </div>

                {/* ── Fun Fact ── */}
                <div className="mt-4 rounded-xl border border-[#B78A2A]/20 bg-[#B78A2A]/[0.04] p-4">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">Fun Fact</p>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#3B3933]">{result.funFact}</p>
                </div>

                {/* Actions */}
                <div className="mt-7 flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-full bg-[#B78A2A] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#9D7620]"
                  >
                    Identify Another
                  </button>
                  <Link
                    href="/#early-access"
                    className="flex-1 rounded-full border border-[#B78A2A]/30 py-3 text-center text-sm font-semibold text-[#B78A2A] transition hover:bg-[#B78A2A]/5"
                  >
                    Join Early Access
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-12" />
      </div>
    </div>
  );
}
