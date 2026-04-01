'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import TextReveal from '../components/TextReveal';
import VineDivider from '../components/VineDivider';

const steps = [
  {
    number: '01',
    title: 'Place the Sensor',
    subtitle: 'Sense',
    description:
      'Position the Verdant sensor near your plant. It begins reading soil moisture, ambient temperature, humidity, and light levels in real time — no setup, no calibration.',
    detail: 'Works with any indoor plant, from tropical rarities to common houseplants.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="#B78A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="6" width="16" height="28" rx="3" />
        <line x1="24" y1="34" x2="24" y2="42" />
        <line x1="18" y1="42" x2="30" y2="42" />
        <circle cx="24" cy="18" r="3" />
        <path d="M20 14a6 6 0 0 1 8 0" />
        <path d="M17 11a10 10 0 0 1 14 0" />
      </svg>
    ),
    metrics: ['Moisture', 'Temperature', 'Humidity', 'Light'],
  },
  {
    number: '02',
    title: 'Data Flows Continuously',
    subtitle: 'Stream',
    description:
      'Sensor readings are transmitted to the Canopy AI cloud every few seconds. Historical trends build a baseline unique to each plant and its environment.',
    detail: 'Encrypted end-to-end. Your plant data stays private.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="#B78A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24h36" />
        <path d="M12 18c4-6 8-6 12 0s8 6 12 0" />
        <path d="M12 30c4-6 8-6 12 0s8 6 12 0" />
        <circle cx="6" cy="24" r="2" fill="#B78A2A" />
        <circle cx="42" cy="24" r="2" fill="#B78A2A" />
      </svg>
    ),
    metrics: ['Real-time sync', 'Historical trends', 'Encrypted'],
  },
  {
    number: '03',
    title: 'Canopy AI Interprets',
    subtitle: 'Analyze',
    description:
      'Our AI cross-references live readings against species-specific care profiles. It identifies early signs of stress — dropping moisture, rising heat, fading light — before your plant shows symptoms.',
    detail: 'Trained on thousands of plant species and environmental scenarios.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="#B78A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 14v10l6 6" />
        <circle cx="24" cy="24" r="3" fill="#B78A2A" />
        <path d="M14 10l-2-2" />
        <path d="M34 10l2-2" />
      </svg>
    ),
    metrics: ['Stress detection', 'Species matching', 'Trend analysis'],
  },
  {
    number: '04',
    title: 'You Get Clear Next Steps',
    subtitle: 'Act',
    description:
      'Instead of dashboards full of numbers, you receive plain-language recommendations: "Move to brighter spot", "Water within 24 hours", "Humidity dropping — consider misting."',
    detail: 'Actionable, timely, and specific to your plant.',
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="#B78A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h32v32H8z" rx="4" />
        <path d="M14 24l6 6 14-14" />
      </svg>
    ),
    metrics: ['Plain language', 'Timely alerts', 'Personalized care'],
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-full z-0 hidden h-16 w-px bg-gradient-to-b from-[#B78A2A] to-[#E5DBCC] lg:block" />
      )}

      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E5DBCC] bg-white shadow-sm">
              {step.icon}
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                Step {step.number} — {step.subtitle}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {step.title}
              </h3>
            </div>
          </div>
          <p className="mt-5 text-base leading-7 text-[#5A564E] lg:pl-[5.25rem]">
            {step.description}
          </p>
          <p className="mt-3 text-sm italic text-[#8A857C] lg:pl-[5.25rem]">
            {step.detail}
          </p>
        </div>

        <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <div className="rounded-2xl border border-[#E5DBCC] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {step.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-[#F3EDE2] px-4 py-2 text-sm font-medium text-[#5C584F]"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Visual pipeline indicator */}
            <div className="mt-5 flex items-center gap-2">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full border-2 transition-colors ${
                      i <= index
                        ? 'border-[#B78A2A] bg-[#B78A2A]'
                        : 'border-[#D8CAB1] bg-white'
                    }`}
                  />
                  {i < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 transition-colors ${
                        i < index ? 'bg-[#B78A2A]' : 'bg-[#E5DBCC]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorksClient() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />

      {/* Hero */}
      <section className="px-6 pb-16 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              How It Works
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              From sensor to action
              <br />
              <span className="text-[#B78A2A]">in four simple steps.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Canopy AI transforms raw environmental data into clear, timely
              plant care recommendations — no plant science degree required.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 pb-20 md:px-10 lg:px-12">
        <VineDivider className="mb-12" />
        <div className="mx-auto max-w-5xl space-y-16">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* Summary pipeline */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              <TextReveal text="The complete pipeline, at a glance." />
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            {['Sensor', 'Data Stream', 'Canopy AI', 'Your Action'].map(
              (label, i) => (
                <Reveal key={label} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#B78A2A] bg-[#B78A2A] text-lg font-bold text-white shadow-sm">
                      {i + 1}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#1F1F1B]">
                      {label}
                    </p>
                    {i < 3 && (
                      <div className="absolute right-0 top-7 hidden w-[calc(100%-3.5rem)] translate-x-1/2 border-t-2 border-dashed border-[#B78A2A]/40 sm:block" />
                    )}
                  </div>
                </Reveal>
              )
            )}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/#early-access"
                className="btn-ripple inline-block rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620] hover:shadow-lg"
              >
                Join Early Access
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
