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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, I got a bit tangled in my vines! Try again in a moment. 🌿' }]);
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
            style={{ maxHeight: 'min(520px, calc(100vh - 140px))' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#E5DBCC] bg-white/70 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B8F5E]/15 text-sm">
                🌿
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1F1F1B]">Sprite</p>
                <p className="text-[10px] text-[#7A756C]">Your plant care companion</p>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-full text-[#8A857C] transition hover:bg-[#E5DBCC] hover:text-[#4F4B44]">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: 200 }}>
              {messages.length === 0 && !thinking && (
                <div className="flex flex-col items-center gap-2 py-6 text-center">
                  <SpriteIcon size={48} />
                  <p className="text-xs font-semibold text-[#5C584F]">Hey there! I&apos;m Sprite 🌱</p>
                  <p className="max-w-[240px] text-[11px] leading-relaxed text-[#7A756C]">
                    I&apos;m a little wood nymph who knows all about plants. Ask me anything about your green friend!
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {['How\'s my plant doing?', 'Watering tips', 'Why are leaves yellow?'].map(q => (
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
                    <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6B8F5E]/15 text-[10px]">🌿</div>
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
                  <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6B8F5E]/15 text-[10px]">🌿</div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#E5DBCC] bg-white px-4 py-3">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-[#6B8F5E]" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-[#6B8F5E]" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-[#6B8F5E]" />
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

      {/* Floating sprite button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#6B8F5E]/30 bg-gradient-to-br from-[#6B8F5E] to-[#4A7040] shadow-lg shadow-[#6B8F5E]/20 transition-shadow hover:shadow-xl hover:shadow-[#6B8F5E]/30"
      >
        <SpriteIcon size={28} />
        {/* Idle bobbing leaf */}
        <motion.span
          className="absolute -right-1 -top-1 text-xs"
          animate={{ y: [-1, 1, -1], rotate: [-5, 5, -5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          🍃
        </motion.span>
        {!open && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-xl border border-[#E5DBCC] bg-white px-3 py-1.5 text-[11px] font-medium text-[#5C584F] shadow-md"
          >
            Need help with your plant? 🌱
            <span className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b border-r border-[#E5DBCC] bg-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}

function SpriteIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Body */}
      <ellipse cx="20" cy="24" rx="10" ry="12" fill="#8FBF7A" />
      <ellipse cx="20" cy="24" rx="8" ry="10" fill="#A8D99A" />
      {/* Face */}
      <circle cx="16" cy="22" r="2" fill="#2D4A1E" />
      <circle cx="24" cy="22" r="2" fill="#2D4A1E" />
      <circle cx="16.8" cy="21.3" r="0.7" fill="white" />
      <circle cx="24.8" cy="21.3" r="0.7" fill="white" />
      {/* Smile */}
      <path d="M17 27 Q20 30 23 27" stroke="#2D4A1E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Leaf crown */}
      <ellipse cx="15" cy="14" rx="3" ry="5" fill="#6B8F5E" transform="rotate(-20 15 14)" />
      <ellipse cx="25" cy="14" rx="3" ry="5" fill="#6B8F5E" transform="rotate(20 25 14)" />
      <ellipse cx="20" cy="11" rx="2.5" ry="5.5" fill="#7DAA6E" />
      {/* Twig arms */}
      <path d="M10 24 Q6 20 7 17" stroke="#8B6E47" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M30 24 Q34 20 33 17" stroke="#8B6E47" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Tiny leaf on arm */}
      <ellipse cx="7" cy="16" rx="2" ry="1" fill="#6B8F5E" transform="rotate(-30 7 16)" />
      <ellipse cx="33" cy="16" rx="2" ry="1" fill="#6B8F5E" transform="rotate(30 33 16)" />
    </svg>
  );
}
