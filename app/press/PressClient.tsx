'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const brandColors = [
  { name: 'Verdant Gold', hex: '#B78A2A', label: 'Primary' },
  { name: 'Warm Cream', hex: '#F7F3EC', label: 'Background' },
  { name: 'Linen', hex: '#F3EDE2', label: 'Surface' },
  { name: 'Deep Bark', hex: '#1F1F1B', label: 'Text' },
  { name: 'Muted Olive', hex: '#5A564E', label: 'Body Text' },
  { name: 'Border Sand', hex: '#E5DBCC', label: 'Borders' },
];

const keyFacts = [
  { label: 'Founded', value: '2025' },
  { label: 'Headquarters', value: 'United States' },
  { label: 'Product', value: 'Canopy AI' },
  { label: 'Category', value: 'Botanical Intelligence' },
  { label: 'Sensor Types', value: '4 (Moisture, Temp, Humidity, Light)' },
  { label: 'Business Model', value: 'Hardware + Subscription' },
];

export default function PressClient() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />

      {/* Hero */}
      <section className="px-6 pb-10 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Press & Media
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Media kit & brand assets.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Everything journalists, bloggers, and partners need to write about
              Verdant Labs and Canopy AI.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="px-6 pb-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                Company Boilerplate
              </h2>
              <p className="mt-4 text-base leading-7 text-[#5A564E]">
                Verdant Labs builds Canopy AI, a botanical intelligence platform that
                helps indoor plant owners prevent plant decline through monitoring,
                early stress detection, and actionable guidance. By pairing real-time
                ambient sensing with species-specific AI recommendations, Canopy AI
                turns raw environmental data into plain-language next steps — so
                plant owners can act before damage worsens. Founded in 2025, Verdant
                Labs starts with engaged indoor plant owners and is building toward
                a smarter plant-care platform over time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Key Facts */}
      <section className="px-6 pb-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
              Key Facts
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyFacts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.05}>
                <div className="rounded-xl border border-[#E5DBCC] bg-white p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8A857C]">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#1F1F1B]">
                    {fact.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className="px-6 pb-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
              Brand Colors
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {brandColors.map((color, i) => (
              <Reveal key={color.hex} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl border border-[#E5DBCC]">
                  <div
                    className="h-20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="bg-white p-3">
                    <p className="text-xs font-semibold text-[#1F1F1B]">
                      {color.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#8A857C]">
                      {color.hex}
                    </p>
                    <p className="text-[10px] text-[#AAA598]">{color.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Downloads */}
      <section className="px-6 pb-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
              Logo Assets
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="flex flex-col items-center rounded-2xl border border-[#E5DBCC] bg-white p-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#F7F3EC]">
                  <Image
                    src="/logo-icon.png"
                    alt="Verdant Labs icon"
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold">Icon Mark</p>
                <p className="text-xs text-[#8A857C]">PNG, 512×512</p>
                <a
                  href="/logo-icon-512.png"
                  download
                  className="mt-4 rounded-full border border-[#CFC3AE] px-5 py-2 text-sm font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
                >
                  Download PNG
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col items-center rounded-2xl border border-[#E5DBCC] bg-[#1A1A15] p-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src="/logo-icon.png"
                    alt="Verdant Labs icon on dark"
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">
                  Icon Mark (Dark BG)
                </p>
                <p className="text-xs text-white/50">PNG, 512×512</p>
                <a
                  href="/logo-icon-512.png"
                  download
                  className="mt-4 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:border-[#B78A2A]"
                >
                  Download PNG
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 pb-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
              Typography
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8A857C]">
                    Primary Font
                  </p>
                  <p className="mt-2 text-3xl font-semibold">Geist Sans</p>
                  <p className="mt-2 text-sm text-[#5A564E]">
                    Used for all headings, body text, and UI elements. Clean,
                    modern, and highly legible.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8A857C]">
                    Monospace Font
                  </p>
                  <p className="mt-2 font-mono text-3xl font-semibold">
                    Geist Mono
                  </p>
                  <p className="mt-2 text-sm text-[#5A564E]">
                    Used for code snippets, technical labels, and data displays.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Media inquiries
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              For press inquiries, interviews, or partnership requests:
            </p>
            <a
              href="mailto:akshath.scholar@gmail.com"
              className="mt-6 inline-block rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620]"
            >
              akshath.scholar@gmail.com
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
