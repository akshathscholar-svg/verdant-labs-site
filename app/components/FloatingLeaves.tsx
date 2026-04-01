'use client';

import { useReducedMotion } from 'framer-motion';

const leaves = [
  { delay: '0s', duration: '18s', left: '8%', size: 18, rotation: 40, opacity: 0.18 },
  { delay: '3s', duration: '22s', left: '22%', size: 14, rotation: -30, opacity: 0.14 },
  { delay: '7s', duration: '20s', left: '45%', size: 20, rotation: 60, opacity: 0.16 },
  { delay: '1s', duration: '25s', left: '65%', size: 12, rotation: -50, opacity: 0.12 },
  { delay: '10s', duration: '19s', left: '82%', size: 16, rotation: 35, opacity: 0.15 },
  { delay: '5s', duration: '23s', left: '35%', size: 22, rotation: -20, opacity: 0.1 },
  { delay: '12s', duration: '21s', left: '55%', size: 15, rotation: 45, opacity: 0.13 },
  { delay: '8s', duration: '24s', left: '92%', size: 13, rotation: -40, opacity: 0.11 },
];

export default function FloatingLeaves() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="floating-leaf absolute"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            opacity: leaf.opacity,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: `rotate(${leaf.rotation}deg)` }}
          >
            <path
              d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.14 20C12.69 20 17 14 17 8Z"
              fill="#8BA874"
            />
            <path
              d="M17 8C17 8 20 11 20 15"
              stroke="#6B8F55"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
