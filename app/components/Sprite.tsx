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

/* ── Realistic sloth SVG with lots of animation hooks ── */
function SlothAvatar({ size = 64, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      animate={animate ? { y: [0, -2, 0, 1, 0] } : undefined}
      transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      {/* Branch it's hanging from */}
      <motion.path
        d="M10 18 Q60 8 110 18"
        stroke="#6B5B3E"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M10 18 Q60 8 110 18', 'M10 18 Q60 12 110 18', 'M10 18 Q60 8 110 18'] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Small leaves on branch */}
      <motion.ellipse cx="25" cy="14" rx="5" ry="3" fill="#6B8F5E" transform="rotate(-15 25 14)"
        animate={animate ? { rotate: [-15, -10, -15] } : undefined}
        transition={animate ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      <motion.ellipse cx="90" cy="14" rx="5" ry="3" fill="#7DAA6E" transform="rotate(15 90 14)"
        animate={animate ? { rotate: [15, 20, 15] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />

      {/* Left arm reaching up to branch */}
      <motion.path
        d="M42 28 Q38 22 44 17"
        stroke="#8B8279"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M42 28 Q38 22 44 17', 'M42 30 Q37 23 44 18', 'M42 28 Q38 22 44 17'] } : undefined}
        transition={animate ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Left claw */}
      <path d="M43 15 L41 12 M44 15 L44 11 M45 15 L47 12" stroke="#5C564E" strokeWidth="1.5" strokeLinecap="round" />

      {/* Right arm reaching up to branch */}
      <motion.path
        d="M78 28 Q82 22 76 17"
        stroke="#8B8279"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M78 28 Q82 22 76 17', 'M78 30 Q83 23 76 18', 'M78 28 Q82 22 76 17'] } : undefined}
        transition={animate ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 } : undefined}
      />
      {/* Right claw */}
      <path d="M75 15 L73 12 M76 15 L76 11 M77 15 L79 12" stroke="#5C564E" strokeWidth="1.5" strokeLinecap="round" />

      {/* Body - main torso (hanging) */}
      <motion.ellipse
        cx="60" cy="52" rx="22" ry="28"
        fill="#9B9590"
        animate={animate ? { ry: [28, 29, 28], cy: [52, 53, 52] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Belly */}
      <ellipse cx="60" cy="56" rx="15" ry="18" fill="#ADA7A0" />

      {/* Head */}
      <motion.g
        animate={animate ? { rotate: [-2, 2, -1, 3, -2], y: [0, 1, 0, -0.5, 0] } : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <ellipse cx="60" cy="38" rx="18" ry="16" fill="#9B9590" />
        {/* Face mask - lighter area */}
        <ellipse cx="60" cy="40" rx="14" ry="12" fill="#C4BEB7" />

        {/* Eye patches (dark) */}
        <ellipse cx="52" cy="38" rx="6" ry="5" fill="#4A4540" />
        <ellipse cx="68" cy="38" rx="6" ry="5" fill="#4A4540" />

        {/* Eyes - with slow blink */}
        <motion.g
          animate={animate ? { scaleY: [1, 1, 1, 0.1, 1, 1, 1, 1, 1, 0.1, 1] } : undefined}
          transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
          style={{ transformOrigin: '60px 38px' }}
        >
          <circle cx="52" cy="38" r="3" fill="#1F1F1B" />
          <circle cx="68" cy="38" r="3" fill="#1F1F1B" />
          {/* Eye shine */}
          <circle cx="53.2" cy="37" r="1" fill="white" />
          <circle cx="69.2" cy="37" r="1" fill="white" />
        </motion.g>

        {/* Nose */}
        <ellipse cx="60" cy="44" rx="3" ry="2" fill="#5C564E" />

        {/* Sleepy smile */}
        <motion.path
          d="M55 47 Q60 50 65 47"
          stroke="#5C564E"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          animate={animate ? { d: ['M55 47 Q60 50 65 47', 'M55 47 Q60 51 65 47', 'M55 47 Q60 50 65 47'] } : undefined}
          transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
        />

        {/* Ears */}
        <circle cx="44" cy="32" r="4" fill="#8B8279" />
        <circle cx="76" cy="32" r="4" fill="#8B8279" />
      </motion.g>

      {/* Hind legs (dangling) */}
      <motion.path
        d="M48 75 Q44 88 48 95"
        stroke="#8B8279"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M48 75 Q44 88 48 95', 'M48 75 Q42 90 46 97', 'M48 75 Q44 88 48 95'] } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      <motion.path
        d="M72 75 Q76 88 72 95"
        stroke="#8B8279"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M72 75 Q76 88 72 95', 'M72 75 Q78 90 74 97', 'M72 75 Q76 88 72 95'] } : undefined}
        transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } : undefined}
      />
      {/* Hind claws */}
      <path d="M46 95 L44 98 M48 96 L48 99 M50 95 L52 98" stroke="#5C564E" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tail stub */}
      <motion.path
        d="M60 78 Q64 84 62 88"
        stroke="#8B8279"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        animate={animate ? { d: ['M60 78 Q64 84 62 88', 'M60 78 Q66 85 63 90', 'M60 78 Q64 84 62 88'] } : undefined}
        transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />

      {/* Fur texture lines */}
      <path d="M50 42 L48 44" stroke="#847E77" strokeWidth="0.8" opacity="0.5" />
      <path d="M70 42 L72 44" stroke="#847E77" strokeWidth="0.8" opacity="0.5" />
      <path d="M55 60 L53 63" stroke="#847E77" strokeWidth="0.8" opacity="0.4" />
      <path d="M65 60 L67 63" stroke="#847E77" strokeWidth="0.8" opacity="0.4" />
      <path d="M58 68 L57 71" stroke="#847E77" strokeWidth="0.8" opacity="0.3" />
      <path d="M62 68 L63 71" stroke="#847E77" strokeWidth="0.8" opacity="0.3" />

      {/* Small leaf falling near sloth */}
      <motion.g
        animate={animate ? {
          x: [0, 15, 30, 20, 35],
          y: [0, 10, 25, 40, 60],
          rotate: [0, 45, 90, 135, 180],
          opacity: [0, 1, 1, 1, 0],
        } : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 } : undefined}
      >
        <ellipse cx="95" cy="20" rx="3" ry="1.5" fill="#6B8F5E" transform="rotate(-20 95 20)" />
      </motion.g>
    </motion.svg>
  );
}

/* Smaller sloth for chat bubbles */
function SlothMini() {
  return (
    <svg width="22" height="22" viewBox="0 0 120 120" fill="none">
      <ellipse cx="60" cy="52" rx="22" ry="28" fill="#9B9590" />
      <ellipse cx="60" cy="56" rx="15" ry="18" fill="#ADA7A0" />
      <ellipse cx="60" cy="38" rx="18" ry="16" fill="#9B9590" />
      <ellipse cx="60" cy="40" rx="14" ry="12" fill="#C4BEB7" />
      <ellipse cx="52" cy="38" rx="6" ry="5" fill="#4A4540" />
      <ellipse cx="68" cy="38" rx="6" ry="5" fill="#4A4540" />
      <circle cx="52" cy="38" r="3" fill="#1F1F1B" />
      <circle cx="68" cy="38" r="3" fill="#1F1F1B" />
      <circle cx="53.2" cy="37" r="1" fill="white" />
      <circle cx="69.2" cy="37" r="1" fill="white" />
      <ellipse cx="60" cy="44" rx="3" ry="2" fill="#5C564E" />
      <path d="M55 47 Q60 50 65 47" stroke="#5C564E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
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
        <SlothAvatar size={80} animate={!open} />

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
