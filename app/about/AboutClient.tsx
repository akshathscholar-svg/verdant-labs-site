'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { SeedlingIcon, MicroscopeIcon, RecycleIcon, HandshakeIcon } from '../components/Icons';

const valueIcons = [SeedlingIcon, MicroscopeIcon, RecycleIcon, HandshakeIcon];
const values = [
  {
    title: 'Plant-First Design',
    description: 'Every feature starts with what the plant needs, then works backwards to the interface.',
  },
  {
    title: 'Science-Driven',
    description: 'Our care profiles are built on peer-reviewed botanical research and validated sensor data.',
  },
  {
    title: 'Sustainability',
    description: 'From recyclable packaging to energy-efficient sensors, we build with the planet in mind.',
  },
  {
    title: 'Community',
    description: 'We believe the best plant care comes from shared knowledge and collective learning.',
  },
];

const milestones = [
  { year: '2024', label: 'Research & prototyping begins' },
  { year: 'Early 2025', label: 'Canopy AI v1 development' },
  { year: 'Mid 2025', label: 'Beta sensor hardware testing' },
  { year: 'Late 2025', label: 'Early access launch' },
  { year: '2026', label: 'Public release & plant library expansion' },
];

export default function AboutClient() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC]">
        <div className="mx-auto max-w-5xl px-6 pt-6"><BackButton /></div>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E7DECF] bg-gradient-to-b from-[#F7F3EC] to-[#EDE8DE] px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#B78A2A]">
              About Us
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight text-[#2E2C28] md:text-5xl">
              Making Botanical Intelligence Accessible
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5C584F]">
              Verdant Labs combines precision sensors with AI to help every plant
              owner — from beginners to collectors — keep their greenery thriving.
            </p>
          </Reveal>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <Reveal>
            <h2 className="text-2xl font-light text-[#2E2C28] md:text-3xl">
              Our Story
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-[#5C584F]">
              <p>
                It started, as many good ideas do, with a dead plant. A prized
                Monstera Albo that had been over-watered despite the best intentions.
                The question was simple: <em>why is caring for plants still
                guesswork?</em>
              </p>
              <p>
                That question led to Verdant Labs. We set out to build a system
                that could translate raw sensor data — moisture, light, temperature,
                humidity — into clear, species-specific guidance powered by AI.
                The result is <strong>Canopy AI</strong>.
              </p>
              <p>
                Today we&apos;re a small, focused team of engineers, botanists, and
                designers working out of San Francisco. We&apos;re building something
                we wish existed when we killed our first houseplant — and we think
                you&apos;ll love it too.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Values */}
        <section className="border-t border-[#E7DECF] bg-gradient-to-b from-[#EDE8DE] to-[#F7F3EC] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="text-center text-2xl font-light text-[#2E2C28] md:text-3xl">
                What We Believe
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-[#E7DECF] bg-white p-6 text-center">
                    {(() => { const Icon = valueIcons[i]; return <Icon size={28} className="mx-auto text-[#B78A2A]" />; })()}
                    <h3 className="mt-4 text-sm font-semibold text-[#2E2C28]">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#5C584F]">
                      {v.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
          <Reveal>
            <h2 className="text-center text-2xl font-light text-[#2E2C28] md:text-3xl">
              Milestones
            </h2>
          </Reveal>
          <div className="mt-14 space-y-6">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08}>
                <div className="flex items-start gap-5">
                  <span className="w-24 shrink-0 text-right text-xs font-semibold uppercase tracking-wider text-[#B78A2A]">
                    {m.year}
                  </span>
                  <div className="relative pt-0.5">
                    <span className="absolute -left-[7px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#B78A2A] bg-[#F7F3EC]" />
                    <span className="text-sm text-[#5C584F]">{m.label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#E7DECF] bg-gradient-to-b from-[#EDE8DE] to-[#F7F3EC] px-6 py-20 text-center">
          <Reveal>
            <h2 className="text-2xl font-light text-[#2E2C28] md:text-3xl">
              Join the Early Access
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#5C584F]">
              Be among the first to experience Canopy AI and the Verdant sensor.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="/#early-access"
              className="mt-8 inline-block rounded-full bg-[#B78A2A] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
            >
              Get Early Access
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
