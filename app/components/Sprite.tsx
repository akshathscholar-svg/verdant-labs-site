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

/* ── Realistic Masai giraffe walking on savanna ── */
function GiraffeAvatar({ size = 64, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
    >
      <defs>
        <radialGradient id="gBody" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#E8C96A" />
          <stop offset="100%" stopColor="#D4A843" />
        </radialGradient>
        <radialGradient id="gBelly" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F0DCA0" />
          <stop offset="100%" stopColor="#E2C472" />
        </radialGradient>
      </defs>

      {/* ── Savanna ground ── */}
      <path d="M0 162 Q40 158 90 160 Q140 158 180 162 L180 180 L0 180Z" fill="#C5A84E" opacity="0.25" />
      <path d="M10 165 L25 163" stroke="#A08830" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M60 163 L70 161" stroke="#A08830" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      <path d="M130 164 L145 162" stroke="#A08830" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Grass tufts */}
      <path d="M15 163 Q17 157 19 163" stroke="#7A9444" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M55 161 Q57 155 59 161" stroke="#6B8F3E" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M120 163 Q122 157 124 163" stroke="#7A9444" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M155 162 Q157 156 159 162" stroke="#6B8F3E" strokeWidth="1" fill="none" opacity="0.35" />

      {/* ── Tail ── */}
      <motion.path
        d="M42 78 Q32 85 28 95"
        stroke="#B08830"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={animate ? {
          d: ['M42 78 Q32 85 28 95', 'M42 78 Q28 82 24 92', 'M42 78 Q35 88 32 98', 'M42 78 Q28 82 24 92', 'M42 78 Q32 85 28 95'],
        } : undefined}
        transition={animate ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Tail tuft */}
      <motion.g
        animate={animate ? {
          x: [0, -4, 4, -2, 0],
          y: [0, -2, 3, -1, 0],
        } : undefined}
        transition={animate ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <ellipse cx="28" cy="96" rx="3" ry="5" fill="#3D2A12" transform="rotate(-10 28 96)" />
      </motion.g>

      {/* ── Back legs (behind body) ── */}
      {/* Back-left leg */}
      <motion.g
        animate={animate ? {
          rotate: [8, -12, 8],
        } : undefined}
        transition={animate ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '55px 95px' }}
      >
        <path d="M55 95 L50 128 L48 160" stroke="#C9A03C" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M55 95 L50 128 L48 160" stroke="#B08830" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Patches on leg */}
        <ellipse cx="51" cy="110" rx="3" ry="4" fill="#7A5520" opacity="0.6" />
        <ellipse cx="49" cy="130" rx="2.5" ry="3" fill="#7A5520" opacity="0.5" />
        {/* Hoof */}
        <ellipse cx="48" cy="161" rx="3.5" ry="2" fill="#3D2A12" />
      </motion.g>
      {/* Back-right leg */}
      <motion.g
        animate={animate ? {
          rotate: [-12, 8, -12],
        } : undefined}
        transition={animate ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '65px 95px' }}
      >
        <path d="M65 95 L62 128 L60 160" stroke="#C19530" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M65 95 L62 128 L60 160" stroke="#A88028" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="63" cy="115" rx="3" ry="3.5" fill="#7A5520" opacity="0.5" />
        <ellipse cx="61" cy="138" rx="2.5" ry="3" fill="#7A5520" opacity="0.45" />
        <ellipse cx="60" cy="161" rx="3.5" ry="2" fill="#3D2A12" />
      </motion.g>

      {/* ── Body ── */}
      <motion.ellipse
        cx="80" cy="82" rx="38" ry="22"
        fill="url(#gBody)"
        animate={animate ? { cy: [82, 80, 82], ry: [22, 22.5, 22] } : undefined}
        transition={animate ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {/* Belly underside */}
      <ellipse cx="80" cy="88" rx="30" ry="12" fill="url(#gBelly)" />
      {/* Body patches — irregular Masai-style */}
      <path d="M58 72 Q62 68 68 72 Q65 78 58 76Z" fill="#7A5520" opacity="0.7" />
      <path d="M72 68 Q78 64 84 68 Q80 74 72 72Z" fill="#8B6328" opacity="0.65" />
      <path d="M88 70 Q94 66 100 70 Q96 76 88 74Z" fill="#7A5520" opacity="0.7" />
      <path d="M64 82 Q70 78 76 82 Q72 88 64 86Z" fill="#8B6328" opacity="0.6" />
      <path d="M82 80 Q88 76 94 80 Q90 86 82 84Z" fill="#7A5520" opacity="0.65" />
      <path d="M96 78 Q101 74 106 78 Q102 83 96 82Z" fill="#8B6328" opacity="0.6" />
      <path d="M50 80 Q55 77 60 81 Q56 85 50 83Z" fill="#7A5520" opacity="0.55" />
      <path d="M74 90 Q79 87 84 90 Q80 94 74 93Z" fill="#8B6328" opacity="0.5" />

      {/* ── Front legs ── */}
      {/* Front-left leg */}
      <motion.g
        animate={animate ? {
          rotate: [-12, 8, -12],
        } : undefined}
        transition={animate ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '95px 95px' }}
      >
        <path d="M95 95 L92 128 L90 160" stroke="#D4A843" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M95 95 L92 128 L90 160" stroke="#C19530" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="93" cy="112" rx="3" ry="4" fill="#7A5520" opacity="0.6" />
        <ellipse cx="91" cy="135" rx="2.5" ry="3" fill="#7A5520" opacity="0.5" />
        <ellipse cx="90" cy="161" rx="3.5" ry="2" fill="#3D2A12" />
      </motion.g>
      {/* Front-right leg */}
      <motion.g
        animate={animate ? {
          rotate: [8, -12, 8],
        } : undefined}
        transition={animate ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '105px 95px' }}
      >
        <path d="M105 95 L102 128 L100 160" stroke="#D4A843" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M105 95 L102 128 L100 160" stroke="#C19530" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="103" cy="118" rx="3" ry="3.5" fill="#7A5520" opacity="0.55" />
        <ellipse cx="101" cy="142" rx="2.5" ry="3" fill="#7A5520" opacity="0.45" />
        <ellipse cx="100" cy="161" rx="3.5" ry="2" fill="#3D2A12" />
      </motion.g>

      {/* ── Neck — long, angled forward ── */}
      <motion.g
        animate={animate ? {
          rotate: [-1, 2, -1, 3, -1],
        } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
        style={{ transformOrigin: '108px 75px' }}
      >
        {/* Neck body */}
        <path d="M105 75 Q118 55 128 28 Q132 20 136 14" stroke="#D4A843" strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M105 75 Q118 55 128 28 Q132 20 136 14" stroke="#E2C060" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Mane — dark dorsal stripe */}
        <path d="M108 72 Q120 52 130 26 Q133 18 136 12" stroke="#8B6328" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
        {/* Mane hair tufts */}
        <path d="M112 62 L115 59" stroke="#6B4A18" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M118 48 L121 45" stroke="#6B4A18" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M124 35 L127 32" stroke="#6B4A18" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M130 22 L133 19" stroke="#6B4A18" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        {/* Neck patches */}
        <ellipse cx="113" cy="62" rx="4" ry="5" fill="#7A5520" opacity="0.55" transform="rotate(-25 113 62)" />
        <ellipse cx="120" cy="48" rx="4" ry="4.5" fill="#8B6328" opacity="0.5" transform="rotate(-30 120 48)" />
        <ellipse cx="126" cy="35" rx="3.5" ry="4" fill="#7A5520" opacity="0.55" transform="rotate(-30 126 35)" />
        <ellipse cx="132" cy="22" rx="3" ry="3.5" fill="#8B6328" opacity="0.5" transform="rotate(-20 132 22)" />

        {/* ── Head ── */}
        <motion.g
          animate={animate ? {
            rotate: [0, -4, 2, -3, 0],
            y: [0, -1, 1, -0.5, 0],
          } : undefined}
          transition={animate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined}
          style={{ transformOrigin: '138px 14px' }}
        >
          {/* Head shape — elongated, tapered muzzle */}
          <ellipse cx="140" cy="12" rx="12" ry="8" fill="#D4A843" transform="rotate(-10 140 12)" />
          <ellipse cx="148" cy="12" rx="7" ry="5.5" fill="#DEB855" transform="rotate(-8 148 12)" />
          {/* Muzzle / nose area */}
          <ellipse cx="154" cy="13" rx="4" ry="4" fill="#C49A38" />
          {/* Nostrils */}
          <circle cx="156" cy="12" r="1" fill="#4A3520" />
          <circle cx="156" cy="14.5" r="1" fill="#4A3520" />
          {/* Mouth line */}
          <path d="M155 15 Q152 17 148 16" stroke="#7A5520" strokeWidth="0.8" fill="none" strokeLinecap="round" />

          {/* Eye — large, dark, gentle with long lashes */}
          <motion.g
            animate={animate ? { scaleY: [1, 1, 1, 0.05, 1, 1, 1, 1, 0.05, 1, 1, 1] } : undefined}
            transition={animate ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : undefined}
            style={{ transformOrigin: '145px 9px' }}
          >
            <ellipse cx="145" cy="9" rx="3" ry="3" fill="#1A1410" />
            <circle cx="146" cy="8" r="1" fill="white" opacity="0.85" />
            {/* Lashes */}
            <path d="M143 6.5 L142 4.5" stroke="#3D2A12" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M145 6 L145 4" stroke="#3D2A12" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M147 6.5 L148 4.5" stroke="#3D2A12" strokeWidth="0.8" strokeLinecap="round" />
          </motion.g>

          {/* Ossicones (horns) */}
          <path d="M139 4 L138 -2" stroke="#8B6328" strokeWidth="3" strokeLinecap="round" />
          <circle cx="138" cy="-3" r="2.5" fill="#5C4020" />
          <path d="M145 3 L146 -3" stroke="#8B6328" strokeWidth="3" strokeLinecap="round" />
          <circle cx="146" cy="-4" r="2.5" fill="#5C4020" />

          {/* Ears */}
          <motion.path d="M134 6 Q129 2 131 8" fill="#D4A843" stroke="#B08830" strokeWidth="0.8"
            animate={animate ? { d: ['M134 6 Q129 2 131 8', 'M134 6 Q128 1 131 8', 'M134 6 Q129 2 131 8'] } : undefined}
            transition={animate ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
          />
          <path d="M134 6 Q130 3 131.5 7" fill="#E8B860" />
          <motion.path d="M149 4 Q154 0 152 7" fill="#D4A843" stroke="#B08830" strokeWidth="0.8"
            animate={animate ? { d: ['M149 4 Q154 0 152 7', 'M149 4 Q155 -1 152 7', 'M149 4 Q154 0 152 7'] } : undefined}
            transition={animate ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : undefined}
          />
          <path d="M149.5 5 Q153 1.5 151.5 6" fill="#E8B860" />

          {/* Head patches */}
          <ellipse cx="140" cy="9" rx="3" ry="2.5" fill="#8B6328" opacity="0.45" />
          <ellipse cx="150" cy="10" rx="2.5" ry="2" fill="#7A5520" opacity="0.4" />
        </motion.g>
      </motion.g>

      {/* ── Distant acacia tree ── */}
      <path d="M20 155 L20 138" stroke="#8B7340" strokeWidth="1.5" opacity="0.2" />
      <ellipse cx="20" cy="135" rx="10" ry="5" fill="#6B8F3E" opacity="0.15" />
    </motion.svg>
  );
}

/* Smaller giraffe for chat bubbles */
function GiraffeMini() {
  return (
    <svg width="22" height="22" viewBox="0 0 180 180" fill="none">
      {/* Body */}
      <ellipse cx="80" cy="82" rx="38" ry="22" fill="#D4A843" />
      <ellipse cx="80" cy="88" rx="30" ry="12" fill="#E2C472" />
      {/* Body patches */}
      <path d="M65 75 Q70 71 77 75 Q73 80 65 78Z" fill="#7A5520" opacity="0.6" />
      <path d="M82 73 Q88 69 94 73 Q90 78 82 76Z" fill="#8B6328" opacity="0.55" />
      {/* Neck */}
      <path d="M105 75 Q118 55 128 28 Q132 20 136 14" stroke="#D4A843" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M105 75 Q118 55 128 28 Q132 20 136 14" stroke="#E2C060" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Head */}
      <ellipse cx="140" cy="12" rx="12" ry="8" fill="#D4A843" transform="rotate(-10 140 12)" />
      <ellipse cx="148" cy="12" rx="7" ry="5.5" fill="#DEB855" transform="rotate(-8 148 12)" />
      {/* Eye */}
      <ellipse cx="145" cy="9" rx="2.5" ry="2.5" fill="#1A1410" />
      <circle cx="146" cy="8" r="0.8" fill="white" />
      {/* Ossicones */}
      <path d="M139 4 L138 -1" stroke="#8B6328" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="138" cy="-2" r="2" fill="#5C4020" />
      <path d="M145 3 L146 -2" stroke="#8B6328" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="146" cy="-3" r="2" fill="#5C4020" />
      {/* Legs (simplified) */}
      <path d="M60 98 L57 155" stroke="#C19530" strokeWidth="5" strokeLinecap="round" />
      <path d="M72 98 L69 155" stroke="#C19530" strokeWidth="5" strokeLinecap="round" />
      <path d="M95 98 L92 155" stroke="#C19530" strokeWidth="5" strokeLinecap="round" />
      <path d="M105 98 L102 155" stroke="#C19530" strokeWidth="5" strokeLinecap="round" />
      {/* Hooves */}
      <ellipse cx="57" cy="156" rx="3" ry="1.5" fill="#3D2A12" />
      <ellipse cx="69" cy="156" rx="3" ry="1.5" fill="#3D2A12" />
      <ellipse cx="92" cy="156" rx="3" ry="1.5" fill="#3D2A12" />
      <ellipse cx="102" cy="156" rx="3" ry="1.5" fill="#3D2A12" />
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
                <GiraffeMini />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1F1F1B]">Sprite</p>
                <p className="text-[10px] text-[#7A756C]">Your tall plant care expert</p>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full text-[#8A857C] transition hover:bg-[#E5DBCC] hover:text-[#4F4B44]">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: 200 }}>
              {messages.length === 0 && !thinking && (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <GiraffeAvatar size={72} animate={true} />
                  <p className="text-xs font-semibold text-[#5C584F]">Hey there! I&apos;m Sprite</p>
                  <p className="max-w-[260px] text-[11px] leading-relaxed text-[#7A756C]">
                    I see the big picture when it comes to plant care. Ask me anything — I&apos;ve got a tall perspective on things.
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
                      <GiraffeMini />
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
                    <GiraffeMini />
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

      {/* Floating Sprite button — big giraffe, no circle */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      >
        <GiraffeAvatar size={160} animate={!open} />

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
