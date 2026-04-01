'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useInView } from 'framer-motion';

type SlotCountUpProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

export default function SlotCountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 1.4,
  decimals = 0,
  className,
}: SlotCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(`${prefix}${'0'.repeat(Math.max(1, end.toFixed(decimals).length))}${suffix}`);
  const finalValue = useMemo(() => end.toFixed(decimals), [end, decimals]);

  useEffect(() => {
    if (!isInView) return;

    const chars = '0123456789';
    const targetChars = finalValue.split('');
    const totalSteps = 20;
    const durationMs = duration * 1000;
    const stepTime = durationMs / totalSteps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      const result = targetChars.map((char, i) => {
        if (char === '.' || char === ',') return char;
        // Each digit settles at a different time based on position
        const charProgress = Math.min(1, progress * (1 + i * 0.15));
        if (charProgress >= 1) return char;
        // Random digit while "spinning"
        return chars[Math.floor(Math.random() * 10)];
      }).join('');

      setDisplay(`${prefix}${result}${suffix}`);

      if (step >= totalSteps) {
        clearInterval(interval);
        setDisplay(`${prefix}${finalValue}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, finalValue, suffix, prefix, duration]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className ?? ''}`}>
      {display}
    </span>
  );
}
