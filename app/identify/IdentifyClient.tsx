'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { identifyPlant, type PlantResult } from '../actions/identify';

/* ── compress image client-side to fit server action limits ── */
function compressImage(dataUrl: string, maxDim = 1024, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (height * maxDim) / width;
          width = maxDim;
        } else {
          width = (width * maxDim) / height;
          height = maxDim;
        }
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

export default function IdentifyClient() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  /* ── read file → compress → auto-identify ── */
  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Image must be under 20 MB.');
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const raw = reader.result as string;
      const compressed = await compressImage(raw);
      setPreview(compressed);

      // Auto-identify immediately after compression
      const res = await identifyPlant(compressed);
      setLoading(false);
      if (res.ok) {
        setResult(res.result);
      } else {
        setError(res.error);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  /* ── drag & drop ── */
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
    if (fileRef.current) fileRef.current.value = '';
    if (cameraRef.current) cameraRef.current.value = '';
  };

  /* ── grid helpers ── */
  const careGrid = result
    ? [
        { label: 'Light', value: result.light, icon: '☀️' },
        { label: 'Water', value: result.water, icon: '💧' },
        { label: 'How Often', value: result.waterFrequency, icon: '📅' },
        { label: 'Humidity', value: result.humidity, icon: '🌫️' },
        { label: 'Temperature', value: result.temperature, icon: '🌡️' },
        { label: 'Soil', value: result.soil, icon: '🪴' },
        { label: 'Fertilizer', value: result.fertilizerNeeds, icon: '🧪' },
        { label: 'Est. Cost', value: result.estimatedCost, icon: '💰' },
      ]
    : [];

  const growerGrid = result
    ? [
        { label: 'Indoor / Outdoor', value: result.indoorOutdoor, icon: '🏡' },
        { label: 'Growing Zones', value: result.growingZones, icon: '🗺️' },
        { label: 'Mature Size', value: result.matureSize, icon: '📏' },
        { label: 'Growth Rate', value: result.growthRate, icon: '📈' },
        { label: 'Planting Season', value: result.plantingSeason, icon: '🌱' },
        { label: 'Harvest Season', value: result.harvestSeason, icon: '🌾' },
        { label: 'Propagation', value: result.propagation, icon: '✂️' },
        { label: 'Companion Plants', value: result.companionPlants, icon: '🤝' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
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
            AI
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-5 py-10">
        {/* ── Title ── */}
        <div className="mb-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
            Canopy AI
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Plant Identifier
          </h1>
          <p className="mt-2 text-sm text-[#5C584F]">
            Upload or take a photo — AI will identify the species, care needs, grower info, and estimated cost.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            UPLOAD AREA
           ══════════════════════════════════════════════════════ */}
        {!preview && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center gap-5 rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
                dragOver
                  ? 'border-[#B78A2A] bg-[#B78A2A]/5'
                  : 'border-[#DDD5C6] bg-white/40'
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B78A2A]/10">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <div>
                <p className="text-sm font-semibold">Drop a plant photo here</p>
                <p className="mt-1 text-xs text-[#5C584F]">
                  or use the buttons below
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="rounded-full bg-[#B78A2A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#9D7620]"
                >
                  Upload Photo
                </button>
                <button
                  onClick={() => cameraRef.current?.click()}
                  className="rounded-full border border-[#B78A2A]/30 px-5 py-2.5 text-sm font-medium text-[#B78A2A] transition hover:bg-[#B78A2A]/5"
                >
                  Take Photo
                </button>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processFile(f);
                }}
              />
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) processFile(f);
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            LOADING STATE
           ══════════════════════════════════════════════════════ */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-5 py-8"
          >
            {preview && (
              <div className="overflow-hidden rounded-2xl border border-[#E7DECF] shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Analyzing"
                  className="max-h-[300px] w-full object-contain"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5 animate-spin text-[#B78A2A]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p className="text-sm font-medium text-[#5C584F]">Identifying your plant…</p>
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
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-700"
            >
              <p>{error}</p>
              <button
                onClick={handleReset}
                className="mt-3 rounded-full bg-red-100 px-4 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200"
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
              <div className="relative overflow-hidden rounded-t-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview!}
                  alt={result.commonName}
                  className="h-56 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 px-6 pb-5">
                  <h2 className="text-2xl font-bold text-white">
                    {result.commonName}
                  </h2>
                  <p className="mt-0.5 text-sm italic text-white/70">
                    {result.scientificName}
                  </p>
                </div>
              </div>

              {/* Info body */}
              <div className="rounded-b-3xl border border-t-0 border-[#E7DECF] bg-white p-6">
                {/* Quick badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F0EBDF] px-3 py-1 text-[11px] font-medium text-[#5C584F]">
                    {result.family}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                    result.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700'
                      : result.difficulty === 'Moderate'
                        ? 'bg-amber-50 text-amber-700'
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
                <p className="mt-4 text-sm leading-relaxed text-[#3B3933]">
                  {result.summary}
                </p>

                {/* ── Care Guide ── */}
                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                    Care Guide
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {careGrid.map((item) => (
                      <div key={item.label} className="rounded-xl bg-[#F7F3EC] p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{item.icon}</span>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B78A2A]">
                            {item.label}
                          </p>
                        </div>
                        <p className="mt-1 text-[13px] leading-snug text-[#3B3933]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Grower Info ── */}
                <div className="mt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                    Grower Info
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {growerGrid.map((item) => (
                      <div key={item.label} className="rounded-xl bg-[#F7F3EC] p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{item.icon}</span>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B78A2A]">
                            {item.label}
                          </p>
                        </div>
                        <p className="mt-1 text-[13px] leading-snug text-[#3B3933]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Common Problems ── */}
                <div className="mt-5 rounded-xl border border-amber-200/60 bg-amber-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">⚠️</span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                      Common Problems
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#3B3933]">
                    {result.commonProblems}
                  </p>
                </div>

                {/* ── Fun Fact ── */}
                <div className="mt-4 rounded-xl border border-[#B78A2A]/20 bg-[#B78A2A]/[0.04] p-4">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                      Fun Fact
                    </p>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#3B3933]">
                    {result.funFact}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-full bg-[#B78A2A] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#9D7620]"
                  >
                    Identify Another
                  </button>
                  <Link
                    href="/#early-access"
                    className="flex-1 rounded-full border border-[#B78A2A]/30 py-2.5 text-center text-sm font-medium text-[#B78A2A] transition hover:bg-[#B78A2A]/5"
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
