'use client';

import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#tiers', label: 'Product' },
  { href: '#prototype', label: 'Prototype' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <a href="#top" className="flex items-center gap-3">
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

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#3B3933] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[#B78A2A]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#early-access"
            className="rounded-full bg-[#B78A2A] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#9D7620]"
          >
            Early Access
          </a>
        </nav>

        <button
          className="flex items-center justify-center rounded-lg p-2 text-[#3B3933] transition hover:bg-[#E7DECF] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[#E7DECF] bg-[#F7F3EC] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3B3933] transition hover:text-[#B78A2A]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#early-access"
              className="mt-2 rounded-full bg-[#B78A2A] px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#9D7620]"
              onClick={() => setMobileOpen(false)}
            >
              Early Access
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
