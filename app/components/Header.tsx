'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { createClient } from '@/app/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';

/* ── Navigation architecture ── */
const navGroups = [
  {
    label: 'Product',
    links: [
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/app-preview', label: 'App Preview' },
      { href: '/identify', label: 'Camera Studio' },
      { href: '/collection', label: 'Collection Dashboard' },
      { href: '/plants', label: 'Plant Care Library' },
      { href: '/sensor-demo', label: 'Sensor Demo' },
      { href: '/prototype-dashboard', label: 'Live Dashboard' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { href: '/faq', label: 'FAQ' },
      { href: '/press', label: 'Press Kit' },
      { href: '/docs', label: 'Documentation' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/journey', label: 'Our Journey' },
      { href: '/about', label: 'About' },
      { href: '/meetups', label: 'Meetups' },
      { href: '/contact', label: 'Contact' },
    ],
  },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  function closeAll() {
    setOpenDropdown(null);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        className="absolute inset-x-0 top-0 h-[2px] bg-[#B78A2A]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="Verdant Labs monogram"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#B78A2A]">
              Verdant Labs
            </p>
            <p className="text-sm text-[#5C584F]">Botanical Intelligence</p>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav ref={navRef} className="hidden items-center gap-7 text-sm font-medium text-[#3B3933] lg:flex">
          {navGroups.map((group) => (
            <div key={group.label} className="relative">
              <button
                onClick={() => toggleDropdown(group.label)}
                className="flex items-center gap-1 transition hover:text-[#B78A2A]"
              >
                {group.label}
                <ChevronIcon open={openDropdown === group.label} />
              </button>
              <AnimatePresence>
                {openDropdown === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 overflow-hidden rounded-xl border border-[#E7DECF] bg-[#F7F3EC] shadow-lg"
                  >
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block whitespace-nowrap px-5 py-2.5 text-sm transition hover:bg-[#E7DECF]/60 hover:text-[#B78A2A]"
                        onClick={closeAll}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5C584F] transition hover:bg-[#E7DECF] hover:text-[#B78A2A] dark:text-[#AAA598] dark:hover:bg-[#2A2A24]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {user ? (
            <Link
              href="/account"
              className="flex items-center gap-2 rounded-full border border-[#E5DBCC] bg-white/80 px-4 py-2 text-sm font-medium text-[#3B3933] transition hover:border-[#B78A2A] hover:text-[#B78A2A]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B78A2A] text-[10px] font-bold text-white">
                {(user.user_metadata?.full_name?.[0] ?? user.email?.[0] ?? '?').toUpperCase()}
              </span>
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="cta-glow rounded-full bg-[#B78A2A] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#9D7620]"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-[#3B3933] transition hover:bg-[#E7DECF] lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden border-t border-[#E7DECF] bg-[#F7F3EC] lg:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-5">
              {navGroups.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.04, duration: 0.25 }}
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                    {group.label}
                  </p>
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-1.5 text-sm font-medium text-[#3B3933] transition hover:text-[#B78A2A]"
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              ))}

              {user ? (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.25 }}
                >
                  <Link
                    href="/account"
                    className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#E5DBCC] bg-white/80 px-5 py-2.5 text-sm font-medium text-[#3B3933] transition hover:border-[#B78A2A]"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B78A2A] text-[10px] font-bold text-white">
                      {(user.user_metadata?.full_name?.[0] ?? user.email?.[0] ?? '?').toUpperCase()}
                    </span>
                    Account
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.25 }}
                >
                  <Link
                    href="/login"
                    className="mt-2 block rounded-full bg-[#B78A2A] px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#9D7620]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
