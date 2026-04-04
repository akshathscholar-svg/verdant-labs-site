'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlantContext {
  species?: string;
  nickname?: string;
  sensorData?: {
    temperature?: number;
    humidity?: number;
    moisture?: number;
    light?: number;
  };
  careProfile?: Record<string, unknown>;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* ── Realistic Amazon three-toed sloth SVG ── */
function SlothAvatar({ size = 64, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      animate={animate ? { y: [0, -2, 0, 1, 0] } : undefined}
      transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <defs>
        {/* Fur gradient — warm brown tones */}
        <radialGradient id="slFur" cx="0.5" cy="0.4" r="0.55">
          <stop offset="0%" stopColor="#A89279" />
          <stop offset="60%" stopColor="#8C7A62" />
          <stop offset="100%" stopColor="#6E5D45" />
        </radialGradient>
        <radialGradient id="slBelly" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#C4B7A0" />
          <stop offset="100%" stopColor="#A89279" />
        </radialGradient>
        <radialGradient id="slFace" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0%" stopColor="#E2D8C6" />
          <stop offset="70%" stopColor="#C9BBA3" />
          <stop offset="100%" stopColor="#B5A68D" />
        </radialGradient>
      </defs>

      {/* ── Mossy branch ── */}
      <motion.path
        d="M5 22 Q40 10 80 14 Q120 10 155 22"
        stroke="#5E4D35"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M5 22 Q40 10 80 14 Q120 10 155 22', 'M5 22 Q40 13 80 16 Q120 13 155 22', 'M5 22 Q40 10 80 14 Q120 10 155 22'],
        } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Branch bark texture */}
      <path d="M30 18 L32 22" stroke="#4E3D27" strokeWidth="1" opacity="0.5" />
      <path d="M70 14 L72 18" stroke="#4E3D27" strokeWidth="1" opacity="0.4" />
      <path d="M110 16 L112 20" stroke="#4E3D27" strokeWidth="1" opacity="0.5" />
      {/* Moss patches on branch */}
      <ellipse cx="22" cy="18" rx="8" ry="3" fill="#6B8F5E" opacity="0.5" />
      <ellipse cx="65" cy="13" rx="6" ry="2.5" fill="#7DAA6E" opacity="0.4" />
      <ellipse cx="105" cy="16" rx="7" ry="2.5" fill="#6B8F5E" opacity="0.45" />
      {/* Small leaves */}
      <motion.path d="M18 14 Q22 8 26 13 Q22 11 18 14Z" fill="#6B8F5E"
        animate={animate ? { rotate: [-2, 4, -2] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '22px 14px' }}
      />
      <motion.path d="M98 12 Q102 6 106 11 Q102 9 98 12Z" fill="#7DAA6E"
        animate={animate ? { rotate: [2, -4, 2] } : undefined}
        transition={animate ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '102px 12px' }}
      />
      <motion.path d="M130 17 Q134 11 138 16 Q134 14 130 17Z" fill="#5E8A50"
        animate={animate ? { rotate: [-1, 3, -1] } : undefined}
        transition={animate ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '134px 17px' }}
      />

      {/* ── Left arm — long, slender, reaching to branch ── */}
      <motion.path
        d="M54 42 Q46 30 52 20"
        stroke="#7A6A52"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M54 42 Q46 30 52 20', 'M54 44 Q45 31 52 21', 'M54 42 Q46 30 52 20'],
        } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Left arm fur highlight */}
      <path d="M52 30 Q48 28 50 25" stroke="#8C7A62" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Left three-toed claws */}
      <motion.g
        animate={animate ? { rotate: [-3, 3, -3] } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '52px 18px' }}
      >
        <path d="M49 18 Q47 12 46 9" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M52 17 Q51 11 51 8" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M55 18 Q56 12 57 9" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* ── Right arm — long, slender, reaching to branch ── */}
      <motion.path
        d="M106 42 Q114 30 108 20"
        stroke="#7A6A52"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M106 42 Q114 30 108 20', 'M106 44 Q115 31 108 21', 'M106 42 Q114 30 108 20'],
        } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : undefined}
      />
      {/* Right arm fur highlight */}
      <path d="M108 30 Q112 28 110 25" stroke="#8C7A62" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Right three-toed claws */}
      <motion.g
        animate={animate ? { rotate: [3, -3, 3] } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : undefined}
        style={{ transformOrigin: '108px 18px' }}
      >
        <path d="M105 18 Q103 12 102 9" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M108 17 Q108 11 108 8" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M111 18 Q113 12 114 9" stroke="#4A3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* ── Body — elongated, slender torso (not fat) ── */}
      <motion.ellipse
        cx="80" cy="68" rx="26" ry="30"
        fill="url(#slFur)"
        animate={animate ? { ry: [30, 31, 30] } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Belly — lighter, elongated */}
      <ellipse cx="80" cy="72" rx="17" ry="20" fill="url(#slBelly)" />
      {/* Fur texture on body */}
      <path d="M68 55 L66 58" stroke="#6E5D45" strokeWidth="0.8" opacity="0.35" />
      <path d="M92 55 L94 58" stroke="#6E5D45" strokeWidth="0.8" opacity="0.35" />
      <path d="M72 65 L70 69" stroke="#6E5D45" strokeWidth="0.8" opacity="0.3" />
      <path d="M88 65 L90 69" stroke="#6E5D45" strokeWidth="0.8" opacity="0.3" />
      <path d="M75 76 L73 80" stroke="#6E5D45" strokeWidth="0.8" opacity="0.25" />
      <path d="M85 76 L87 80" stroke="#6E5D45" strokeWidth="0.8" opacity="0.25" />
      {/* Back streak — algae-green tint (realistic) */}
      <path d="M68 50 Q80 46 92 50" stroke="#7A8F65" strokeWidth="3" fill="none" opacity="0.15" strokeLinecap="round" />
      <path d="M70 58 Q80 54 90 58" stroke="#7A8F65" strokeWidth="2" fill="none" opacity="0.12" strokeLinecap="round" />

      {/* ── Head — round, smaller than body ── */}
      <motion.g
        animate={animate ? { rotate: [-2, 3, -1, 2, -2], y: [0, 1, 0, -0.5, 0] } : undefined}
        transition={animate ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <ellipse cx="80" cy="46" rx="20" ry="17" fill="url(#slFur)" />
        {/* Face mask — pale, cream-colored */}
        <ellipse cx="80" cy="48" rx="16" ry="13" fill="url(#slFace)" />

        {/* Eye patches — dark brown teardrops (three-toed sloth marking) */}
        <path d="M67 42 Q63 48 67 52 Q70 48 67 42Z" fill="#3D3126" />
        <path d="M93 42 Q97 48 93 52 Q90 48 93 42Z" fill="#3D3126" />

        {/* Eyes — dark, round, expressive */}
        <motion.g
          animate={animate ? { scaleY: [1, 1, 1, 0.05, 1, 1, 1, 1, 1, 1, 0.05, 1] } : undefined}
          transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
          style={{ transformOrigin: '80px 46px' }}
        >
          <circle cx="70" cy="46" r="3.5" fill="#1A1410" />
          <circle cx="90" cy="46" r="3.5" fill="#1A1410" />
          {/* Eye shine */}
          <circle cx="71.3" cy="44.8" r="1.2" fill="white" opacity="0.9" />
          <circle cx="91.3" cy="44.8" r="1.2" fill="white" opacity="0.9" />
          {/* Warm iris ring */}
          <circle cx="70" cy="46" r="3.5" stroke="#3D2E1A" strokeWidth="0.5" fill="none" />
          <circle cx="90" cy="46" r="3.5" stroke="#3D2E1A" strokeWidth="0.5" fill="none" />
        </motion.g>

        {/* Nose — small, dark, rounded */}
        <ellipse cx="80" cy="52" rx="3.5" ry="2.5" fill="#3D3126" />
        <ellipse cx="80" cy="52" rx="2" ry="1.2" fill="#2A211A" />
        {/* Nostrils */}
        <circle cx="78.5" cy="52.2" r="0.7" fill="#1A1410" />
        <circle cx="81.5" cy="52.2" r="0.7" fill="#1A1410" />

        {/* Mouth — gentle contented line */}
        <motion.path
          d="M75 55 Q80 58 85 55"
          stroke="#5C4D3C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          animate={animate ? { d: ['M75 55 Q80 58 85 55', 'M75 55 Q80 59 85 55', 'M75 55 Q80 58 85 55'] } : undefined}
          transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
        />

        {/* Cheek fur tufts */}
        <path d="M62 48 L59 50" stroke="#8C7A62" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M98 48 L101 50" stroke="#8C7A62" strokeWidth="1" opacity="0.4" strokeLinecap="round" />

        {/* Ears — small, hidden in fur */}
        <ellipse cx="62" cy="40" rx="4" ry="5" fill="#7A6A52" />
        <ellipse cx="62" cy="40" rx="2.5" ry="3" fill="#8C7A62" />
        <ellipse cx="98" cy="40" rx="4" ry="5" fill="#7A6A52" />
        <ellipse cx="98" cy="40" rx="2.5" ry="3" fill="#8C7A62" />

        {/* Forehead stripe — dark median line */}
        <path d="M80 35 L80 42" stroke="#5C4D3C" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      </motion.g>

      {/* ── Hind legs — long, dangling ── */}
      <motion.path
        d="M66 92 Q60 108 64 120"
        stroke="#7A6A52"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M66 92 Q60 108 64 120', 'M66 92 Q58 110 62 123', 'M66 92 Q60 108 64 120'],
        } : undefined}
        transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      <motion.path
        d="M94 92 Q100 108 96 120"
        stroke="#7A6A52"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M94 92 Q100 108 96 120', 'M94 92 Q102 110 98 123', 'M94 92 Q100 108 96 120'],
        } : undefined}
        transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } : undefined}
      />
      {/* Hind claws */}
      <path d="M61 120 Q59 125 58 128" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 121 Q63 126 63 129" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M67 120 Q68 125 69 128" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M93 120 Q91 125 90 128" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M96 121 Q96 126 96 129" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />
      <path d="M99 120 Q101 125 102 128" stroke="#4A3D2E" strokeWidth="2" strokeLinecap="round" />

      {/* ── Tail stub ── */}
      <motion.path
        d="M80 95 Q84 102 82 108"
        stroke="#7A6A52"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M80 95 Q84 102 82 108', 'M80 95 Q86 103 83 110', 'M80 95 Q84 102 82 108'],
        } : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />

      {/* ── Falling leaf ── */}
      <motion.g
        animate={animate ? {
          x: [0, 12, 25, 18, 30],
          y: [0, 12, 28, 45, 65],
          rotate: [0, 40, 90, 140, 180],
          opacity: [0, 0.8, 0.8, 0.6, 0],
        } : undefined}
        transition={animate ? { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 } : undefined}
      >
        <path d="M125 20 Q128 16 131 20 Q128 18 125 20Z" fill="#6B8F5E" />
        <path d="M128 17 L128 21" stroke="#5E8A50" strokeWidth="0.5" />
      </motion.g>
    </motion.svg>
  );
}

/* Smaller sloth for chat bubbles */
function SlothMini() {
  return (
    <svg width="22" height="22" viewBox="0 0 160 160" fill="none">
      <ellipse cx="80" cy="68" rx="26" ry="30" fill="#8C7A62" />
      <ellipse cx="80" cy="72" rx="17" ry="20" fill="#A89279" />
      <ellipse cx="80" cy="46" rx="20" ry="17" fill="#8C7A62" />
      <ellipse cx="80" cy="48" rx="16" ry="13" fill="#C9BBA3" />
      <path d="M67 42 Q63 48 67 52 Q70 48 67 42Z" fill="#3D3126" />
      <path d="M93 42 Q97 48 93 52 Q90 48 93 42Z" fill="#3D3126" />
      <circle cx="70" cy="46" r="3.5" fill="#1A1410" />
      <circle cx="90" cy="46" r="3.5" fill="#1A1410" />
      <circle cx="71.3" cy="44.8" r="1.2" fill="white" />
      <circle cx="91.3" cy="44.8" r="1.2" fill="white" />
      <ellipse cx="80" cy="52" rx="3.5" ry="2.5" fill="#3D3126" />
      <path d="M75 55 Q80 58 85 55" stroke="#5C4D3C" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Sprite({ plantContext }: { plantContext?: PlantContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          plantContext,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Whoops... I dozed off for a sec. Try again?' }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex w-[340px] flex-col overflow-hidden rounded-2xl border border-[#E5DBCC] bg-[#F7F3EC] shadow-xl sm:w-[380px]"
            style={{ maxHeight: 'min(520px, calc(100vh - 160px))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#E5DBCC] bg-white/70 px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center">
                <SlothMini />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1F1F1B]">Sprite</p>
                <p className="text-[10px] text-[#7A756C]">Your sleepy plant care expert</p>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full text-[#8A857C] transition hover:bg-[#E5DBCC] hover:text-[#4F4B44]">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: 200 }}>
              {messages.length === 0 && !thinking && (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <SlothAvatar size={72} animate={true} />
                  <p className="text-xs font-semibold text-[#5C584F]">Hey... I&apos;m Sprite</p>
                  <p className="max-w-[260px] text-[11px] leading-relaxed text-[#7A756C]">
                    I may be slow, but I know everything about plants. Ask me anything — I promise I won&apos;t fall asleep... probably.
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {['How\'s my plant?', 'Watering tips', 'Why yellow leaves?'].map(q => (
                      <button key={q} onClick={() => { setInput(q); }}
                        className="rounded-full border border-[#E5DBCC] bg-white px-3 py-1 text-[10px] font-medium text-[#5C584F] transition hover:border-[#B78A2A] hover:text-[#B78A2A]">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
                      <SlothMini />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-[#B78A2A] text-white'
                      : 'rounded-bl-md border border-[#E5DBCC] bg-white text-[#3B3933]'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {thinking && (
                <div className="mb-3 flex justify-start">
                  <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
                    <SlothMini />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#E5DBCC] bg-white px-4 py-3">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-[#8B8279]" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.25 }} className="h-1.5 w-1.5 rounded-full bg-[#8B8279]" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }} className="h-1.5 w-1.5 rounded-full bg-[#8B8279]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#E5DBCC] bg-white/70 p-3">
              <form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask Sprite anything..."
                  className="flex-1 rounded-xl border border-[#E5DBCC] bg-[#F7F3EC] px-3.5 py-2 text-sm text-[#1F1F1B] outline-none placeholder:text-[#8A857C] focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || thinking}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B78A2A] text-white transition hover:bg-[#9D7620] disabled:opacity-40"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sprite button — big sloth, no circle */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      >
        <SlothAvatar size={160} animate={!open} />

        {/* Speech bubble prompt */}
        {!open && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-full right-0 mb-1 whitespace-nowrap rounded-xl border border-[#E5DBCC] bg-white px-3 py-1.5 text-[11px] font-medium text-[#5C584F] shadow-md"
          >
            Need help with your plant?
            <span className="absolute -bottom-1 right-8 h-2 w-2 rotate-45 border-b border-r border-[#E5DBCC] bg-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
