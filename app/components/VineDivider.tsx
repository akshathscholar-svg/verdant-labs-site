'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function VineDivider({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 60"
      className={`mx-auto block h-14 w-48 ${className}`}
      fill="none"
    >
      {/* Main vine stem */}
      <motion.path
        d="M10 30 C50 10, 80 50, 100 30 S150 10, 190 30"
        stroke="#B78A2A"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : undefined}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      {/* Left leaf */}
      <motion.path
        d="M60 22 C55 12, 68 8, 72 18"
        stroke="#8BA874"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : undefined}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeInOut' }}
      />
      {/* Right leaf */}
      <motion.path
        d="M140 38 C145 48, 132 52, 128 42"
        stroke="#8BA874"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : undefined}
        transition={{ duration: 0.8, delay: 1.0, ease: 'easeInOut' }}
      />
      {/* Center dot */}
      <motion.circle
        cx="100"
        cy="30"
        r="2.5"
        fill="#B78A2A"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.5 } : undefined}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
    </svg>
  );
}
