'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import { LightbulbIcon, BrainIcon, WrenchIcon, SmartphoneIcon, RocketIcon, ShieldIcon, SparklesIcon, LeafIcon, KeyIcon, SeedlingIcon } from '../components/Icons';
import type { ComponentType } from 'react';

/* ── Timeline data ── */
const milestoneIcons: ComponentType<{ size?: number; className?: string }>[] = [LightbulbIcon, BrainIcon, WrenchIcon, SmartphoneIcon, RocketIcon];
const milestones = [
  {
    date: 'Winter 2025',
    title: 'The Spark',
    description:
      'A collection of indoor plants started showing stress with no visible warning signs. By the time leaves curled, the damage was done. The question became: what if you could detect stress before it was visible? Verdant Labs was founded.',
  },
  {
    date: 'Spring 2026',
    title: 'Research & Canopy AI Concept',
    description:
      'Deep research into plant physiology, environmental sensing, and the gap between raw data and real intelligence. Designed the Canopy AI architecture — a system that pairs ambient sensor data with plant-specific profiles to generate proactive care guidance.',
  },
  {
    date: 'Summer 2026',
    title: 'Working MVP & AI Features',
    description:
      'Built a working Arduino-based prototype reading moisture, humidity, temperature, and light. Launched the AI-powered plant identifier — snap a photo for instant species ID, care instructions, and grower info. Current MVP focuses on sensor-first early stress detection.',
  },
  {
    date: 'Winter 2026',
    title: 'Enclosure & App Development',
    description:
      'New enclosure development moves Canopy AI closer to a consumer-ready product. Building out the full Canopy AI app experience — the interface that turns sensor data into plain-language care recommendations. Refining the hardware and running real-world tests.',
  },
  {
    date: '2027',
    title: 'Consumer Launch',
    description:
      'Shipping finalized hardware units and the full app to early access members. The complete Canopy AI system — sensor, app, and intelligence — ready for indoor plant owners everywhere. Starting with engaged premium users, then expanding to the broader market.',
  },
];

const values = [
  {
    title: 'Prevention over reaction',
    description: 'Catch problems early, before damage is visible.',
  },
  {
    title: 'Intelligence over data',
    description: 'Plain-language recommendations, not raw numbers.',
  },
  {
    title: 'Built for plant owners',
    description: 'Designed for people who truly care about their plants.',
  },
  {
    title: 'Transparent progress',
    description: 'We share what we\'re building as we build it.',
  },
];

const valueIcons: ComponentType<{ size?: number; className?: string }>[] = [ShieldIcon, SparklesIcon, LeafIcon, KeyIcon];

export default function JourneyClient() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      {/* ── Top bar ── */}
      <div className="border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#5C584F] transition hover:text-[#B78A2A]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Verdant Labs
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="px-6 pb-16 pt-16 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Our Journey
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              From a wilting plant to
              <br />
              <span className="text-[#B78A2A]">botanical intelligence.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-8 text-[#5C584F]">
              Verdant Labs started with a simple frustration: plants dying before
              you ever know something is wrong. Here&apos;s how we&apos;re building the
              solution.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#B78A2A]/40 via-[#B78A2A]/20 to-transparent md:left-1/2 md:-translate-x-px" />

            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;

              return (
                <Reveal
                  key={m.title}
                  delay={i * 0.08}
                  direction={isLeft ? 'left' : 'right'}
                >
                  <div className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}>
                    {/* Dot on line */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.08 }}
                      className="absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#B78A2A] bg-[#F7F3EC] md:left-auto md:right-auto md:top-1"
                      style={isLeft ? { right: '-10px', left: 'auto' } : { left: '-10px' }}
                    >
                      <div className="h-2 w-2 rounded-full bg-[#B78A2A]" />
                    </motion.div>

                    {/* Mobile icon */}
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#B78A2A]/10 md:hidden">
                      {(() => { const Icon = milestoneIcons[i]; return Icon ? <Icon size={20} className="text-[#B78A2A]" /> : null; })()}
                    </div>

                    {/* Date badge */}
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                      {m.date}
                    </p>

                    {/* Content card */}
                    <div className="rounded-2xl border border-[#E7DECF] bg-white p-5 shadow-sm transition hover:border-[#B78A2A]/30 hover:shadow-md">
                      <div className="flex items-center gap-2">
                        <span className="hidden md:inline">{(() => { const Icon = milestoneIcons[i]; return Icon ? <Icon size={20} className="text-[#B78A2A]" /> : null; })()}</span>
                        <h3 className="text-lg font-semibold">{m.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#5C584F] md:text-left">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="border-t border-[#E7DECF] bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
                What Drives Us
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                <TextReveal text="Our values shape every decision we make." />
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-[#E7DECF] bg-[#F7F3EC] p-6 transition hover:border-[#B78A2A]/30 hover:shadow-md">
                  {(() => { const Icon = valueIcons[i]; return Icon ? <Icon size={28} className="text-[#B78A2A]" /> : null; })()}
                  <h3 className="mt-3 text-base font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5C584F]">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
                Meet the Founder
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                The person behind the mission.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[1.9rem] border border-[#E7DECF] bg-white p-8 shadow-sm md:p-10">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                {/* Photo placeholder */}
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B78A2A]/20 to-[#D4B96A]/20">
                  <SeedlingIcon size={48} className="text-[#B78A2A]" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold">Akshath Saravanan</h3>
                  <p className="mt-1 text-sm font-medium text-[#B78A2A]">
                    Founder & CEO, Verdant Labs
                  </p>
                  <p className="mt-4 text-base leading-7 text-[#5A564E]">
                    Akshath started Verdant Labs after losing several indoor
                    plants to problems that weren&apos;t visible until it was too late. With
                    a background in engineering and a growing passion for botany, he set
                    out to bridge the gap between raw sensor data and real plant
                    intelligence.
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#5A564E]">
                    His vision is simple: plant care should be proactive, not reactive.
                    Canopy AI represents the intersection of hardware sensing, machine
                    learning, and genuine love for plants — built by someone who
                    understands firsthand how frustrating preventable plant loss can be.
                  </p>

                  {/* Founder quote */}
                  <div className="mt-6 rounded-xl bg-[#F7F3EC] p-5">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#B78A2A]/10">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#B78A2A]" fill="currentColor">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                      </svg>
                    </div>
                    <blockquote className="text-base font-medium italic leading-7 text-[#3B3933]">
                      Every plant that dies from preventable stress is a failure of
                      information, not care. We&apos;re building the bridge between the two.
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[#E7DECF] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Be part of the journey.
            </h2>
            <p className="mt-3 text-sm text-[#5C584F]">
              Join early access and help shape the future of plant care.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#early-access"
                className="btn-ripple cta-glow rounded-full bg-[#B78A2A] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
              >
                Join Early Access
              </Link>
              <Link
                href="/"
                className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-7 py-3 text-sm font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
              >
                Back to Overview
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
