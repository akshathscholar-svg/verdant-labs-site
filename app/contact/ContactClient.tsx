'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { MailIcon, NewspaperIcon, WrenchIcon, LeafIcon } from '../components/Icons';

const contactChannels = [
  {
    icon: MailIcon,
    title: 'General Inquiries',
    description: 'Questions about Verdant Labs, partnership opportunities, or anything else.',
    action: 'hello@verdantlabs.app',
    href: 'mailto:hello@verdantlabs.app',
  },
  {
    icon: NewspaperIcon,
    title: 'Press & Media',
    description: 'Interview requests, media assets, and press inquiries.',
    action: 'press@verdantlabs.app',
    href: 'mailto:press@verdantlabs.app',
  },
  {
    icon: WrenchIcon,
    title: 'Technical Support',
    description: 'Help with sensor setup, Canopy AI, or account issues.',
    action: 'support@verdantlabs.app',
    href: 'mailto:support@verdantlabs.app',
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would POST to an API route
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F7F3EC]">
        <div className="mx-auto max-w-5xl px-6 pt-6"><BackButton /></div>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E7DECF] bg-gradient-to-b from-[#F7F3EC] to-[#EDE8DE] px-6 py-24 text-center md:py-32">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#B78A2A]">
              Get in Touch
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mx-auto max-w-3xl text-4xl font-light leading-tight text-[#2E2C28] md:text-5xl">
              Contact Us
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5C584F]">
              We&apos;d love to hear from you. Whether it&apos;s a question, feedback,
              or a partnership idea — reach out anytime.
            </p>
          </Reveal>
        </section>

        {/* Contact Channels */}
        <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="grid gap-8 sm:grid-cols-3">
            {contactChannels.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 0.08}>
                <a
                  href={ch.href}
                  className="group block rounded-2xl border border-[#E7DECF] bg-white p-7 text-center transition hover:border-[#B78A2A]/40 hover:shadow-lg"
                >
                  {(() => { const Icon = ch.icon; return <Icon size={28} className="mx-auto text-[#B78A2A]" />; })()}
                  <h3 className="mt-4 text-lg font-semibold text-[#2E2C28]">
                    {ch.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C584F]">
                    {ch.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[#B78A2A] transition group-hover:underline">
                    {ch.action}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="border-t border-[#E7DECF] bg-gradient-to-b from-[#EDE8DE] to-[#F7F3EC] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-lg">
            <Reveal>
              <h2 className="text-center text-2xl font-light text-[#2E2C28] md:text-3xl">
                Send a Message
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-center text-sm leading-relaxed text-[#5C584F]">
                Fill out the form below and we&apos;ll get back to you within 48 hours.
              </p>
            </Reveal>

            {submitted ? (
              <Reveal>
                <div className="mt-10 rounded-2xl border border-[#B78A2A]/30 bg-white p-10 text-center">
                  <LeafIcon size={36} className="mx-auto text-[#6B8F5E]" />
                  <h3 className="mt-4 text-lg font-semibold text-[#2E2C28]">
                    Message Sent
                  </h3>
                  <p className="mt-2 text-sm text-[#5C584F]">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.15}>
                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C584F]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-[#E7DECF] bg-white px-4 py-3 text-sm text-[#2E2C28] outline-none transition focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C584F]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-[#E7DECF] bg-white px-4 py-3 text-sm text-[#2E2C28] outline-none transition focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5C584F]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-[#E7DECF] bg-white px-4 py-3 text-sm text-[#2E2C28] outline-none transition focus:border-[#B78A2A] focus:ring-1 focus:ring-[#B78A2A]"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#B78A2A] py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
                  >
                    Send Message
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
