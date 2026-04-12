'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { PackageIcon, SignalIcon, BrainIcon, PlugIcon, HomeIcon, WarningIcon } from '../components/Icons';

const guideIcons = [PackageIcon, SignalIcon, BrainIcon, PlugIcon, HomeIcon, WarningIcon];
const guides = [
  {
    title: 'Getting Started',
    description: 'Unbox your sensor, connect to Wi-Fi, and pair with the Canopy AI app in under 5 minutes.',
    sections: ['Unboxing & Setup', 'Wi-Fi Configuration', 'App Pairing', 'First Scan'],
  },
  {
    title: 'Sensor Hardware',
    description: 'Technical specifications, placement tips, and calibration details for optimal readings.',
    sections: ['Specifications', 'Optimal Placement', 'Calibration', 'Battery & Charging'],
  },
  {
    title: 'Canopy AI',
    description: 'How the AI engine processes sensor data and generates personalized care recommendations.',
    sections: ['How It Works', 'Care Profiles', 'Alert System', 'Learning Over Time'],
  },
  {
    title: 'API Reference',
    description: 'REST API endpoints for accessing sensor data, plant profiles, and AI recommendations.',
    sections: ['Authentication', 'Sensor Data', 'Plant Profiles', 'Webhooks'],
  },
  {
    title: 'Smart Home Integration',
    description: 'Connect Verdant with HomeKit, Google Home, and other smart home ecosystems.',
    sections: ['HomeKit Setup', 'Google Home', 'IFTTT Recipes', 'Custom Automations'],
  },
  {
    title: 'Troubleshooting',
    description: 'Common issues, diagnostics, and step-by-step fixes for sensor and app problems.',
    sections: ['Connectivity Issues', 'Inaccurate Readings', 'App Crashes', 'Factory Reset'],
  },
];

export default function DocsClient() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC]">
        <div className="mx-auto max-w-6xl px-6 pt-6"><BackButton /></div>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E7DECF] bg-gradient-to-b from-[#F7F3EC] to-[#EDE8DE] px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#B78A2A]">
              Resources
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight text-[#2E2C28] md:text-5xl">
              Documentation
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5C584F]">
              Everything you need to set up, configure, and get the most out of
              your Verdant sensor and Canopy AI.
            </p>
          </Reveal>
        </section>

        {/* Guides Grid */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <Reveal key={guide.title} delay={i * 0.08}>
                <div className="group rounded-2xl border border-[#E7DECF] bg-white p-7 transition hover:border-[#B78A2A]/40 hover:shadow-lg">
                  {(() => { const Icon = guideIcons[i]; return <Icon size={28} className="text-[#B78A2A]" />; })()}
                  <h3 className="mt-4 text-lg font-semibold text-[#2E2C28]">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C584F]">
                    {guide.description}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {guide.sections.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm text-[#5C584F]"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#B78A2A]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#E7DECF] bg-gradient-to-b from-[#EDE8DE] to-[#F7F3EC] px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-2xl font-light text-[#2E2C28] md:text-3xl">
              Can&apos;t find what you need?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#5C584F]">
              Our team is here to help. Reach out and we&apos;ll get you sorted.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-[#B78A2A] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
            >
              Contact Support
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
