'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { saveSetupResults } from '@/app/actions/devices';
import { LeafIcon, CactusIcon, FlowerIcon, SeedlingIcon, PalmIcon, CloverIcon, SparklesIcon, CameraIcon } from '@/app/components/Icons';
import type { ComponentType } from 'react';

interface Props {
  deviceId: string;
}

const STEPS = [
  { title: 'Your Plant', subtitle: 'Tell us what you\'re growing' },
  { title: 'Environment', subtitle: 'Where does your plant live?' },
  { title: 'Care Routine', subtitle: 'How do you take care of it?' },
  { title: 'Final Details', subtitle: 'Almost there!' },
];

const PLANT_TYPES: { value: string; label: string; icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'leafy', label: 'Leafy Green', icon: LeafIcon },
  { value: 'succulent', label: 'Succulent / Cactus', icon: CactusIcon },
  { value: 'flowering', label: 'Flowering', icon: FlowerIcon },
  { value: 'vine', label: 'Vine / Trailing', icon: SeedlingIcon },
  { value: 'tree', label: 'Tree / Palm', icon: PalmIcon },
  { value: 'fern', label: 'Fern', icon: CloverIcon },
  { value: 'other', label: 'Other / Not sure', icon: SparklesIcon },
];

const LOCATIONS = [
  { value: 'window', label: 'By a window' },
  { value: 'shelf', label: 'On a shelf' },
  { value: 'desk', label: 'On a desk' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'outdoor', label: 'Outdoor / Patio' },
  { value: 'other', label: 'Somewhere else' },
];

const DIRECTIONS = [
  { value: 'north', label: 'North' },
  { value: 'south', label: 'South' },
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
  { value: 'unsure', label: 'Not sure' },
];

const SUNLIGHT = [
  { value: 'low', label: 'Low / Indirect' },
  { value: 'moderate', label: 'Moderate / Some direct' },
  { value: 'bright', label: 'Bright / Direct' },
  { value: 'unsure', label: 'I\'m not sure' },
];

const WATER_FREQ = [
  { value: 'few-days', label: 'Every few days' },
  { value: 'weekly', label: 'About once a week' },
  { value: 'biweekly', label: 'Every 2 weeks' },
  { value: 'monthly', label: 'About once a month' },
  { value: 'irregular', label: 'It varies a lot' },
];

const SOIL_COND = [
  { value: 'moist', label: 'Stays moist' },
  { value: 'dries', label: 'Dries out between waterings' },
  { value: 'very-dry', label: 'Gets very dry / cracked' },
  { value: 'unsure', label: 'I don\'t usually check' },
];

const ISSUES = [
  { value: 'yellowing', label: 'Yellowing leaves' },
  { value: 'brown-tips', label: 'Brown / crispy tips' },
  { value: 'drooping', label: 'Drooping / wilting' },
  { value: 'pests', label: 'Pests or bugs' },
  { value: 'slow-growth', label: 'Slow growth' },
  { value: 'none', label: 'No issues!' },
];

const EXPERIENCE = [
  { value: 'beginner', label: 'Just starting out' },
  { value: 'some', label: 'Some experience' },
  { value: 'parent', label: 'Dedicated plant parent' },
  { value: 'expert', label: 'Expert / Collector' },
];

function OptionButton({ selected, onClick, children, className = '' }: {
  selected: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
        selected
          ? 'border-[#B78A2A] bg-[#B78A2A]/10 text-[#B78A2A]'
          : 'border-[#E5DBCC] bg-white/80 text-[#4F4B44] hover:border-[#B78A2A]/40'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default function SetupWizard({ deviceId }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  const [answers, setAnswers] = useState({
    knownSpecies: '',
    plantType: '',
    plantSize: '',
    location: '',
    windowDirection: '',
    sunlight: '',
    waterFrequency: '',
    soilCondition: '',
    fertilizer: '',
    issues: '',
    experience: '',
    nickname: '',
  });

  function set(key: keyof typeof answers, value: string) {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setPhotoBase64(result);
    };
    reader.readAsDataURL(file);
  }

  function canAdvance(): boolean {
    if (step === 0) return !!(answers.plantType);
    if (step === 1) return !!(answers.location && answers.sunlight);
    if (step === 2) return !!(answers.waterFrequency);
    if (step === 3) return !!(answers.experience && answers.nickname.trim());
    return true;
  }

  async function handleFinish() {
    setAnalyzing(true);
    try {
      // Call AI to generate plant profile
      const res = await fetch('/api/ai/plant-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, photoBase64 }),
      });

      if (!res.ok) throw new Error('AI analysis failed');
      const profile = await res.json();

      // Save to database
      await saveSetupResults(deviceId, answers, profile);

      // Redirect to dashboard
      router.push('/prototype-dashboard');
    } catch (err) {
      console.error(err);
      setAnalyzing(false);
      alert('Something went wrong. Please try again.');
    }
  }

  if (analyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6 py-24 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="text-5xl"
        >
          <LeafIcon size={48} className="text-[#B78A2A]" />
        </motion.div>
        <div>
          <h2 className="text-xl font-semibold text-[#1F1F1B]">Sprite is analyzing your plant...</h2>
          <p className="mt-2 text-sm text-[#7A756C]">
            Identifying species, building care profile, and personalizing your dashboard.
          </p>
        </div>
        <motion.div
          className="h-1 w-48 overflow-hidden rounded-full bg-[#E5DBCC]"
        >
          <motion.div
            className="h-full rounded-full bg-[#B78A2A]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 8, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-xs text-[#8A857C]">{Math.round(((step + 1) / STEPS.length) * 100)}% complete</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5DBCC]">
          <motion.div
            className="h-full rounded-full bg-[#B78A2A]"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-semibold tracking-tight text-[#1F1F1B] sm:text-3xl">
            {STEPS[step].title}
          </h1>
          <p className="mt-1 text-sm text-[#7A756C]">{STEPS[step].subtitle}</p>

          <div className="mt-8 space-y-6">
            {/* Step 0: Plant identity */}
            {step === 0 && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Do you know your plant&apos;s name?
                  </label>
                  <input
                    type="text"
                    value={answers.knownSpecies}
                    onChange={e => set('knownSpecies', e.target.value)}
                    placeholder="e.g. Monstera, Pothos, Fiddle Leaf Fig..."
                    className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                  />
                  <p className="mt-1 text-[11px] text-[#8A857C]">Leave blank if you&apos;re not sure — we&apos;ll help identify it.</p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Upload a photo <span className="normal-case text-[#8A857C]">(optional, helps with ID)</span>
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="hidden"
                  />
                  {photoPreview ? (
                    <div className="relative">
                      <img src={photoPreview} alt="Plant" className="h-40 w-40 rounded-xl border border-[#E5DBCC] object-cover" />
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setPhotoBase64(null); }}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C4684A] text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex h-32 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E5DBCC] text-sm text-[#7A756C] transition hover:border-[#B78A2A]/40 hover:text-[#B78A2A]"
                    >
                      <CameraIcon size={16} /> Tap to upload a photo
                    </button>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    What type of plant is it?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {PLANT_TYPES.map(t => (
                      <OptionButton key={t.value} selected={answers.plantType === t.value} onClick={() => set('plantType', t.value)}>
                        <span className="mr-2 inline-flex">{(() => { const Icon = t.icon; return <Icon size={16} />; })()}</span>{t.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    How big is your plant?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 'small', l: 'Small', d: 'Under 1 ft' },
                      { v: 'medium', l: 'Medium', d: '1–3 ft' },
                      { v: 'large', l: 'Large', d: '3+ ft' },
                    ].map(s => (
                      <OptionButton key={s.v} selected={answers.plantSize === s.v} onClick={() => set('plantSize', s.v)}>
                        <span className="block font-semibold">{s.l}</span>
                        <span className="text-[11px] text-[#8A857C]">{s.d}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Environment */}
            {step === 1 && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Where is your plant located?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {LOCATIONS.map(l => (
                      <OptionButton key={l.value} selected={answers.location === l.value} onClick={() => set('location', l.value)}>
                        {l.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    What direction does the nearest window face?
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {DIRECTIONS.map(d => (
                      <OptionButton key={d.value} selected={answers.windowDirection === d.value} onClick={() => set('windowDirection', d.value)}>
                        {d.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    How much sunlight does it get daily?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SUNLIGHT.map(s => (
                      <OptionButton key={s.value} selected={answers.sunlight === s.value} onClick={() => set('sunlight', s.value)}>
                        {s.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Care routine */}
            {step === 2 && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    How often do you water?
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {WATER_FREQ.map(w => (
                      <OptionButton key={w.value} selected={answers.waterFrequency === w.value} onClick={() => set('waterFrequency', w.value)}>
                        {w.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    What does the soil look like between waterings?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SOIL_COND.map(s => (
                      <OptionButton key={s.value} selected={answers.soilCondition === s.value} onClick={() => set('soilCondition', s.value)}>
                        {s.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Do you use fertilizer?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 'regularly', l: 'Yes, regularly' },
                      { v: 'sometimes', l: 'Sometimes' },
                      { v: 'never', l: 'Never' },
                    ].map(f => (
                      <OptionButton key={f.v} selected={answers.fertilizer === f.v} onClick={() => set('fertilizer', f.v)}>
                        {f.l}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Final details */}
            {step === 3 && (
              <>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Any issues you&apos;ve noticed?
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {ISSUES.map(i => (
                      <OptionButton key={i.value} selected={answers.issues === i.value} onClick={() => set('issues', i.value)}>
                        {i.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Your plant care experience
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {EXPERIENCE.map(e => (
                      <OptionButton key={e.value} selected={answers.experience === e.value} onClick={() => set('experience', e.value)}>
                        {e.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#7A756C]">
                    Give your plant a nickname
                  </label>
                  <input
                    type="text"
                    value={answers.nickname}
                    onChange={e => set('nickname', e.target.value)}
                    placeholder="e.g. Fernanda, Big Leaf, Office Buddy..."
                    className="w-full rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-4 py-3 text-sm text-[#1F1F1B] outline-none transition placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          className="rounded-full border border-[#E5DBCC] px-5 py-2.5 text-sm font-medium text-[#5C584F] transition hover:border-[#B78A2A] disabled:opacity-30 disabled:hover:border-[#E5DBCC]"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(s => s + 1)}
            disabled={!canAdvance()}
            className="rounded-full bg-[#B78A2A] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={!canAdvance() || loading}
            className="rounded-full bg-[#B78A2A] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9D7620] disabled:opacity-40"
          >
            {loading ? 'Saving...' : 'Analyze My Plant'}
            {!loading && <SparklesIcon size={14} className="ml-1 inline" />}
          </button>
        )}
      </div>
    </div>
  );
}
