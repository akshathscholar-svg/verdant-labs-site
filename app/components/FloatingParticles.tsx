'use client';

import { useReducedMotion } from 'framer-motion';

const particles = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 4.3 + 2) % 100}%`,
  delay: `${(i * 1.7) % 12}s`,
  duration: `${14 + (i % 8) * 2}s`,
  size: 2 + (i % 3),
  opacity: 0.08 + (i % 4) * 0.03,
}));

export default function FloatingParticles() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle absolute rounded-full bg-[#B78A2A]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
