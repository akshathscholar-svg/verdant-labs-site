'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { WrenchIcon, BrainIcon, DollarIcon, LeafIcon } from '../components/Icons';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const sectionIcons = [WrenchIcon, BrainIcon, DollarIcon, LeafIcon];
const sections: FaqSection[] = [
  {
    title: 'Product & Hardware',
    items: [
      {
        question: 'What does the Verdant sensor measure?',
        answer:
          'The sensor tracks four key environmental metrics in real time: soil moisture, ambient temperature, humidity, and light levels. These readings power the Canopy AI recommendations.',
      },
      {
        question: 'How big is the sensor unit?',
        answer:
          'The sensor is designed to be compact and discreet — roughly the size of a small USB stick. It sits next to your plant and blends into your space without being obtrusive.',
      },
      {
        question: 'Does it need Wi-Fi?',
        answer:
          'Yes, the sensor connects to your home Wi-Fi to transmit data to the Canopy AI cloud. A stable 2.4GHz connection is recommended for best performance.',
      },
      {
        question: 'How is it powered?',
        answer:
          'The sensor runs on a long-lasting rechargeable battery. A single charge lasts several weeks under normal use, and it charges via USB-C.',
      },
      {
        question: 'Can I use one sensor for multiple plants?',
        answer:
          'Each sensor is designed to monitor one plant at a time for the most accurate readings. We recommend one sensor per plant, especially for high-value specimens.',
      },
    ],
  },
  {
    title: 'Canopy AI & Software',
    items: [
      {
        question: 'How does Canopy AI generate recommendations?',
        answer:
          'Canopy AI cross-references real-time sensor data with species-specific care profiles. It identifies when conditions deviate from optimal ranges and generates plain-language action items.',
      },
      {
        question: 'Does Canopy AI work with all plant species?',
        answer:
          'At launch, Canopy AI will support thousands of common houseplant species. We\'re continuously expanding the plant database, and you can request species to be added.',
      },
      {
        question: 'Is there a mobile app?',
        answer:
          'Yes — Canopy AI will be available as an iOS and Android app. The app is where you\'ll view sensor data, receive recommendations, and manage your plant collection.',
      },
      {
        question: 'Can I use the AI plant identifier without a sensor?',
        answer:
          'Absolutely. The AI plant identifier on our website is free to use — just upload or snap a photo. The sensor adds real-time environmental monitoring on top of that.',
      },
    ],
  },
  {
    title: 'Pricing & Availability',
    items: [
      {
        question: 'How much will it cost?',
        answer:
          'Final pricing hasn\'t been announced yet. Early access members will receive priority pricing and exclusive launch discounts. Join the waitlist to be first in line.',
      },
      {
        question: 'Is there a subscription fee?',
        answer:
          'The Foundation tier includes basic monitoring with no subscription. Canopy AI and Elite tiers include premium features with a small monthly subscription for the AI intelligence layer.',
      },
      {
        question: 'When will it ship?',
        answer:
          'We\'re targeting a Spring 2027 launch for early access members. Hardware is currently in the prototype refinement stage with real-world testing underway.',
      },
      {
        question: 'Will it be available internationally?',
        answer:
          'Initial launch will focus on the United States, with international availability planned shortly after. Join early access to stay updated on expansion.',
      },
    ],
  },
  {
    title: 'Setup & Care',
    items: [
      {
        question: 'How long does setup take?',
        answer:
          'Setup is designed to take under 5 minutes. Plug in the sensor, connect to Wi-Fi through the app, and select your plant species. Canopy AI handles the rest.',
      },
      {
        question: 'Does it work outdoors?',
        answer:
          'The current sensor is designed for indoor use. Outdoor compatibility is on our roadmap, with weather-resistant hardware planned for a future product tier.',
      },
      {
        question: 'What if my plant isn\'t in the database?',
        answer:
          'You can manually enter care parameters, or use the AI plant identifier to snap a photo. We\'re constantly adding new species based on user requests.',
      },
      {
        question: 'How do I contact support?',
        answer:
          'Email us at akshath.scholar@gmail.com. We\'re a small team and respond to every message personally.',
      },
    ],
  },
];

function Accordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5DBCC] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition hover:text-[#B78A2A]"
      >
        <span className="pr-4 text-base font-medium">{item.question}</span>
        <motion.svg
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 text-[#B78A2A]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base leading-7 text-[#5A564E]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqClient() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <div className="mx-auto max-w-3xl px-6 pt-6"><BackButton /></div>

      {/* Hero */}
      <section className="px-6 pb-10 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              FAQ
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Frequently asked questions.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-lg leading-8 text-[#5A564E]">
              Everything you need to know about Canopy AI and Verdant Labs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="px-6 pb-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section, si) => (
            <Reveal key={section.title} delay={si * 0.05}>
              <div>
                <div className="flex items-center gap-3">
                  {(() => { const Icon = sectionIcons[si]; return Icon ? <Icon size={22} className="text-[#B78A2A]" /> : null; })()}
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <div className="mt-4 rounded-2xl border border-[#E5DBCC] bg-white px-6">
                  {section.items.map((item) => (
                    <Accordion key={item.question} item={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              Reach out directly — we respond to every message.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="mailto:akshath.scholar@gmail.com"
                className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-6 py-3 font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
              >
                Email Us
              </a>
              <Link
                href="/#early-access"
                className="btn-ripple rounded-full bg-[#B78A2A] px-6 py-3 font-medium text-white transition hover:bg-[#9D7620]"
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
