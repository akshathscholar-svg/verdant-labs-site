'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FloatingOrbs() {
  const prefersReduced = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReduced]);

  const offset1 = prefersReduced ? 0 : scrollY * 0.08;
  const offset2 = prefersReduced ? 0 : scrollY * -0.06;

  return (
    <>
      <motion.div
        className="absolute left-2 top-8 hidden h-32 w-32 rounded-full bg-[#E9DFC9] blur-3xl sm:block xl:-left-4 xl:h-40 xl:w-40"
        animate={{ y: offset1, x: offset1 * 0.3 }}
        transition={{ type: 'tween', duration: 0 }}
      />
      <motion.div
        className="absolute -bottom-6 right-0 h-32 w-32 rounded-full bg-[#DDE6D8] blur-3xl sm:h-40 sm:w-40"
        animate={{ y: offset2, x: offset2 * -0.4 }}
        transition={{ type: 'tween', duration: 0 }}
      />
    </>
  );
}
