import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import EarlyAccessForm from './components/EarlyAccessForm';
import Reveal from './components/Reveal';
import TiltCard from './components/TiltCard';
import TextReveal from './components/TextReveal';
import SlotCountUp from './components/SlotCountUp';
import FloatingLeaves from './components/FloatingLeaves';
import FloatingParticles from './components/FloatingParticles';
import VineDivider from './components/VineDivider';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        id="top"
        className="relative overflow-hidden px-6 pb-24 pt-16 md:px-10 lg:px-12 lg:pt-20"
      >
        <FloatingLeaves />

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left — Copy */}
            <div className="max-w-2xl">
              <Reveal>
                <p className="inline-block rounded-full border border-[#E5DBCC] bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A] backdrop-blur">
                  Predictive Plant Intelligence
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="hero-shimmer mt-6 text-[2.75rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Protect valuable plants before damage becomes visible.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#5A564E]">
                  Canopy AI combines continuous environmental monitoring with
                  plant-specific intelligence to detect stress early — so you can
                  act while your plant still looks healthy.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/app-preview"
                    className="btn-ripple cta-glow rounded-full bg-[#B78A2A] px-7 py-3.5 text-center text-[15px] font-semibold text-white transition hover:bg-[#9D7620] hover:shadow-[0_8px_30px_rgba(183,138,42,0.3)]"
                  >
                    See the Platform
                  </Link>
                  <a
                    href="#early-access"
                    className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-7 py-3.5 text-center text-[15px] font-semibold text-[#1F1F1B] transition hover:border-[#B78A2A] hover:shadow-md"
                  >
                    Request Early Access
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="mt-10 flex items-center gap-6 text-sm text-[#7A756C]">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#5B8C3E]" />
                    Working prototype
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#B78A2A]" />
                    Hardware + software
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#7B9DAE]" />
                    3 tiers from $59
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right — Product Preview Card */}
            <Reveal delay={0.2} direction="right">
              <div className="rounded-[2rem] border border-[#E5DBCC] bg-white p-5 shadow-[0_24px_80px_rgba(60,48,25,0.07)]">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#FCFBF8] to-[#EFE7D9] p-5">
                  {/* Dashboard Mock */}
                  <div className="rounded-2xl border border-[#E5DBCC] bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B78A2A]">
                          Collection Health
                        </p>
                        <p className="mt-1 text-2xl font-bold text-[#1F1F1B]">
                          All Clear
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E0]">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#5B8C3E]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-4 gap-3">
                      {[
                        { label: 'Moisture', value: 42, unit: '%', color: '#6B8F5E' },
                        { label: 'Temp', value: 72, unit: '°F', color: '#C4684A' },
                        { label: 'Humidity', value: 58, unit: '%', color: '#7B9DAE' },
                        { label: 'Light', value: 8.2, unit: 'k lx', color: '#B78A2A' },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-[#F7F3EC] p-3 text-center">
                          <p className="text-[10px] uppercase tracking-wider text-[#8A857C]">{s.label}</p>
                          <p className="mt-1 text-lg font-bold" style={{ color: s.color }}>
                            <SlotCountUp end={s.value} suffix={s.unit} decimals={s.label === 'Light' ? 1 : 0} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Plant Cards */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { name: 'Monstera Deliciosa', status: 'Healthy', score: 94, color: '#5B8C3E' },
                      { name: 'Fiddle Leaf Fig', status: 'Low Light', score: 71, color: '#B78A2A' },
                    ].map((p) => (
                      <div key={p.name} className="rounded-xl border border-[#E5DBCC] bg-white p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#1F1F1B]">{p.name}</p>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                            style={{ backgroundColor: p.color + '18', color: p.color }}
                          >
                            {p.score}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#7A756C]">{p.status}</p>
                        {/* Mini trend bar */}
                        <div className="mt-2 flex items-end gap-0.5">
                          {[4, 6, 5, 7, 8, 6, 7, 9, 8, 7].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{ height: h * 2.5, backgroundColor: p.color + '30' }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Alert Preview */}
                  <div className="mt-4 rounded-xl border border-[#B78A2A]/25 bg-[#FBF6EC] p-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B78A2A]/15">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1F1F1B]">Light declining — Fiddle Leaf Fig</p>
                        <p className="mt-0.5 text-[11px] text-[#7A756C]">
                          Move closer to a south-facing window or supplement with grow light.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust Strip */}
          <div className="mt-16 grid gap-4 sm:grid-cols-4">
            {[
              { value: '4', label: 'Environmental Sensors' },
              { value: '<2s', label: 'Alert Latency' },
              { value: '24/7', label: 'Continuous Monitoring' },
              { value: 'AI', label: 'Species-Specific Insight' },
            ].map((m, i) => (
              <Reveal key={m.label} delay={0.05 + i * 0.1}>
                <div className="rounded-2xl border border-[#E5DBCC] bg-white/70 px-5 py-4 text-center backdrop-blur transition hover:border-[#B78A2A]/40 hover:shadow-md">
                  <p className="text-2xl font-bold text-[#B78A2A]">{m.value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A756C]">
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CURRENT TOOLS FAIL ═══════════════════ */}
      <section
        id="problem"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-24 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              The Problem
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              <TextReveal text="Current plant tools were not built for serious collections." />
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5A564E]">
              Reminder apps, basic sensors, and plant ID tools leave a critical
              gap between raw data and actionable care.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Guesswork Over Guidance',
                body: 'Most plant owners rely on fixed schedules and generic advice. No personalization to the actual plant, species, or environment.',
              },
              {
                title: 'Late Detection',
                body: 'By the time leaves yellow, curl, or droop, the plant has been under compounding environmental stress for days or weeks.',
              },
              {
                title: 'Raw Numbers, No Interpretation',
                body: 'Basic sensors show moisture percentages and lux values. They never tell you what those numbers mean for your specific plant.',
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={0.1 + i * 0.12}>
                <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EDE2]">
                    <span className="text-sm font-bold text-[#B78A2A]">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#5A564E]">{c.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW CANOPY AI WORKS ═══════════════════ */}
      <section
        id="solution"
        className="relative bg-[#F7F3EC] px-6 py-24 md:px-10 lg:px-12"
      >
        <FloatingParticles />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              The System
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              <TextReveal text="Monitor. Interpret. Detect. Recommend." />
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5A564E]">
              Canopy AI is not another sensor dashboard. It is a plant health
              operating system that turns environmental data into clear,
              species-specific recommendations.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Sense',
                body: 'Continuous monitoring of soil moisture, temperature, humidity, and light around each plant.',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4m6.36-1.64l-2.83 2.83M22 12h-4M18.36 18.36l-2.83-2.83M12 22v-4M5.64 18.36l2.83-2.83M2 12h4M5.64 5.64l2.83 2.83" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Interpret',
                body: 'AI translates raw readings into plant-specific stress signals — not just numbers, but meaning.',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Detect',
                body: 'Early stress detection catches declining trends before visible damage appears on the plant.',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: 'Recommend',
                body: 'Action-ready guidance: what to do, what not to do, and why — tailored to the plant species.',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <Reveal key={s.step} delay={0.08 + i * 0.1}>
                <div className="group relative h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 transition hover:border-[#B78A2A]/40 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3EDE2] text-[#B78A2A] transition group-hover:bg-[#B78A2A] group-hover:text-white">
                    {s.icon}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B78A2A]">
                    Step {s.step}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#5A564E]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Before / After */}
          <Reveal delay={0.15}>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-[#F3EDE2] p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A857C]">
                  Without Canopy AI
                </p>
                <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[#5A564E]">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#C4684A]">✕</span> Water on a fixed schedule regardless of conditions
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#C4684A]">✕</span> Notice problems only when leaves show damage
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#C4684A]">✕</span> Google generic care advice for each symptom
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#C4684A]">✕</span> No insight into long-term environmental trends
                  </li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-[#B78A2A]/30 bg-white p-8 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B78A2A]">
                  With Canopy AI
                </p>
                <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[#5A564E]">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#5B8C3E]">✓</span> Water based on real-time soil moisture data
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#5B8C3E]">✓</span> Catch declining trends before any visible symptoms
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#5B8C3E]">✓</span> Receive species-specific recommendations automatically
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-[#5B8C3E]">✓</span> Track 24hr and 7-day environmental history per plant
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ COMPETITIVE COMPARISON ═══════════════════ */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-24 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Differentiation
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              This is not another plant app.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-[#5A564E]">
              Canopy AI bridges the gap that plant ID apps, reminder tools, and
              basic sensors leave behind.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#D8CAB1]">
                    <th className="pb-3 pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857C]">
                      Capability
                    </th>
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857C]">
                      Plant&nbsp;ID Apps
                    </th>
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857C]">
                      Reminder Apps
                    </th>
                    <th className="pb-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A857C]">
                      Basic Sensors
                    </th>
                    <th className="pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                      Canopy&nbsp;AI
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#5A564E]">
                  {[
                    ['Continuous environmental monitoring', false, false, true, true],
                    ['Plant identification', true, false, false, true],
                    ['Species-specific recommendations', false, 'partial', false, true],
                    ['Early stress detection', false, false, 'partial', true],
                    ['Hardware integration', false, false, true, true],
                    ['Multi-plant dashboard', false, 'partial', 'partial', true],
                    ['Explainable AI insights', false, false, false, true],
                    ['Visual + environmental analysis', 'partial', false, false, true],
                    ['Collector-grade workflows', false, false, false, true],
                    ['Desktop camera support', false, false, false, true],
                  ].map(([feature, ...cols]) => (
                    <tr key={feature as string} className="border-b border-[#E5DBCC]/60">
                      <td className="py-3 pr-6 font-medium text-[#3B3933]">{feature as string}</td>
                      {(cols as (boolean | string)[]).map((v, j) => (
                        <td
                          key={j}
                          className={`py-3 pr-4 text-center ${j === 3 ? 'font-semibold text-[#5B8C3E]' : ''}`}
                        >
                          {v === true ? (
                            <span className={j === 3 ? 'text-[#5B8C3E]' : 'text-[#5A564E]'}>●</span>
                          ) : v === 'partial' ? (
                            <span className="text-[#C4C0B8]">○</span>
                          ) : (
                            <span className="text-[#D8D3CA]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ PRODUCT TIERS ═══════════════════ */}
      <section
        id="tiers"
        className="bg-[#F7F3EC] px-6 py-24 md:px-10 lg:px-12"
      >
        <VineDivider className="mb-14" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Plans &amp; Pricing
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Three tiers of plant intelligence.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#5A564E]">
              Every tier includes the hardware sensor and 3 months of service
              free. Choose the intelligence level that fits your collection.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Foundation */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-[#E2D6C2] bg-white p-8 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A857C]">
                  Essential
                </p>
                <h3 className="mt-2 text-2xl font-bold">Foundation</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$59</span>
                  <span className="ml-1 text-sm text-[#7A756C]">device</span>
                  <span className="ml-3 rounded-full bg-[#F3EDE2] px-3 py-1 text-sm font-semibold text-[#5A564E]">
                    + $3.99/mo
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5B8C3E]">
                  3 months included free
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[#5A564E]">
                  Core environmental monitoring with baseline visibility into plant
                  conditions. Ideal for getting started.
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-[#5A564E]">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> 4-sensor monitoring (moisture, temp, humidity, light)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Real-time dashboard &amp; alerts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Basic plant insights
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> 24-hour history
                  </li>
                </ul>
                <a
                  href="#early-access"
                  className="mt-8 block rounded-full border border-[#CFC3AE] bg-white py-3 text-center text-sm font-semibold text-[#1F1F1B] transition hover:border-[#B78A2A] hover:shadow-md"
                >
                  Join Waitlist
                </a>
              </div>
            </Reveal>

            {/* Canopy AI — Recommended */}
            <Reveal delay={0.2}>
              <div className="relative flex h-full flex-col rounded-[1.75rem] border-2 border-[#B78A2A] bg-white p-8 shadow-[0_20px_60px_rgba(183,138,42,0.1)]">
                <div className="absolute -top-3.5 left-8 rounded-full bg-[#B78A2A] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Recommended
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B78A2A]">
                  Intelligence
                </p>
                <h3 className="mt-2 text-2xl font-bold">Canopy AI</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="ml-1 text-sm text-[#7A756C]">device</span>
                  <span className="ml-3 rounded-full bg-[#B78A2A]/10 px-3 py-1 text-sm font-semibold text-[#B78A2A]">
                    + $7.99/mo
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5B8C3E]">
                  3 months included free
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[#5A564E]">
                  The full Canopy AI experience. Species-specific intelligence,
                  proactive guidance, and visual plant analysis.
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-[#5A564E]">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Everything in Foundation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> AI species-specific recommendations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Early stress detection &amp; alerts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Camera-based visual diagnosis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> 7-day trend analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Proactive care guidance
                  </li>
                </ul>
                <a
                  href="#early-access"
                  className="btn-ripple mt-8 block rounded-full bg-[#B78A2A] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#9D7620]"
                >
                  Request Early Access
                </a>
              </div>
            </Reveal>

            {/* Elite */}
            <Reveal delay={0.3}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-[#E2D6C2] bg-white p-8 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A857C]">
                  Collector
                </p>
                <h3 className="mt-2 text-2xl font-bold">Elite</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="ml-1 text-sm text-[#7A756C]">device</span>
                  <span className="ml-3 rounded-full bg-[#F3EDE2] px-3 py-1 text-sm font-semibold text-[#5A564E]">
                    + $9.99/mo
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5B8C3E]">
                  3 months included free
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[#5A564E]">
                  Advanced analytics, collector workflows, and premium intelligence
                  for serious indoor plant collections.
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-[#5A564E]">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Everything in Canopy AI
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Long-term stress pattern analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Multi-plant collection dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Room-level environmental insights
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Priority support &amp; early features
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">✦</span> Custom plant thresholds
                  </li>
                </ul>
                <a
                  href="#early-access"
                  className="mt-8 block rounded-full border border-[#CFC3AE] bg-white py-3 text-center text-sm font-semibold text-[#1F1F1B] transition hover:border-[#B78A2A] hover:shadow-md"
                >
                  Join Waitlist
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROTOTYPE CREDIBILITY ═══════════════════ */}
      <section
        id="prototype"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-24 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Working Prototype
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Real hardware. Real data. Real progress.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-8">
                <p className="text-[15px] leading-8 text-[#5A564E]">
                  The Canopy AI prototype is a working Arduino-based sensor
                  system that streams real-time environmental data. It
                  demonstrates continuous monitoring, cloud connectivity, and
                  the intelligence layer that turns readings into plant-care
                  recommendations.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#F7F3EC] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                      What Works Now
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[#5C584F]">
                      <li>• 4-sensor real-time monitoring</li>
                      <li>• Arduino Cloud data streaming</li>
                      <li>• Live web dashboard</li>
                      <li>• AI plant identification</li>
                      <li>• Species-specific care profiles</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-[#F7F3EC] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                      In Development
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[#5C584F]">
                      <li>• Consumer-ready enclosure</li>
                      <li>• Multi-plant dashboard</li>
                      <li>• Advanced trend analysis</li>
                      <li>• Alert center with severity</li>
                      <li>• Visual diagnosis camera</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/prototype-dashboard"
                    className="btn-ripple rounded-full bg-[#B78A2A] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#9D7620]"
                  >
                    View Live Dashboard
                  </Link>
                  <Link
                    href="/sensor-demo"
                    className="rounded-full border border-[#CFC3AE] bg-white px-6 py-3 text-center text-sm font-semibold text-[#1F1F1B] transition hover:border-[#B78A2A]"
                  >
                    Try Sensor Demo
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="right">
              <div className="flex h-full flex-col gap-4">
                {/* Milestone Timeline */}
                <div className="flex-1 rounded-[1.75rem] border border-[#E5DBCC] bg-white p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                    Development Milestones
                  </p>
                  <div className="mt-5 space-y-5">
                    {[
                      { date: 'Winter 2025', label: 'Founded Verdant Labs', done: true },
                      { date: 'Spring 2026', label: 'Research & concept validation', done: true },
                      { date: 'Summer 2026', label: 'Working Arduino MVP', done: true },
                      { date: 'Winter 2026', label: 'Enclosure & app development', done: false },
                      { date: '2027', label: 'Consumer launch', done: false },
                    ].map((m, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            m.done ? 'bg-[#5B8C3E]' : 'border-2 border-[#E5DBCC] bg-white'
                          }`}
                        >
                          {m.done && (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#8A857C]">{m.date}</p>
                          <p className={`text-sm font-medium ${m.done ? 'text-[#1F1F1B]' : 'text-[#8A857C]'}`}>
                            {m.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Sensor Snapshot */}
                <div className="rounded-[1.75rem] border border-[#122113] bg-[#0F180F] p-6 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E9DFC9]">
                    Live Sensor Feed
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: 'Moisture', value: 41, suffix: '%' },
                      { label: 'Humidity', value: 58, suffix: '%' },
                      { label: 'Light', value: 8.2, suffix: 'k lx' },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-white/[0.08] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</p>
                        <p className="mt-1 text-lg font-bold">
                          <SlotCountUp end={s.value} suffix={s.suffix} decimals={s.label === 'Light' ? 1 : 0} />
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-white/40">
                    Streaming from Arduino Cloud — updated every 30 seconds
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ VALUE PROPOSITION ═══════════════════ */}
      <section className="bg-[#F7F3EC] px-6 py-24 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Why It Matters
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              One saved plant can justify the entire system.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Prevent Avoidable Loss', body: 'Catch declining conditions before they compound into irreversible damage.' },
              { title: 'Save Time', body: 'Stop guessing. Get clear recommendations instead of researching every symptom.' },
              { title: 'Gain Visibility', body: 'See the full environmental picture across your collection in one dashboard.' },
              { title: 'Act with Confidence', body: 'Know exactly what to do, what not to do, and why — for each species.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={0.08 + i * 0.08}>
                <div className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EDE2]">
                    <span className="text-sm font-bold text-[#B78A2A]">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#5A564E]">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOUNDER CREDIBILITY ═══════════════════ */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-8 text-center shadow-sm md:p-12">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EDE2]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B78A2A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <blockquote className="text-xl font-medium leading-9 text-[#1F1F1B] md:text-2xl">
                I kept losing valuable plants to problems I could not see in
                time. The sensors existed. The intelligence did not. That is
                what Canopy AI is building.
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-semibold text-[#1F1F1B]">Akshath Saravanan</p>
                <p className="text-sm text-[#7A756C]">Founder, Verdant Labs</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ EXPLORE THE PLATFORM ═══════════════════ */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Explore
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Experience the platform.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: '/app-preview', title: 'App Preview', desc: 'Interactive mockup of the Canopy AI experience.' },
              { href: '/identify', title: 'Camera Studio', desc: 'AI-powered plant identification with live webcam support.' },
              { href: '/collection', title: 'Collection Dashboard', desc: 'Multi-plant management with room filtering and alerts.' },
              { href: '/prototype-dashboard', title: 'Live Dashboard', desc: 'Real-time sensor data from our hardware prototype.' },
            ].map((l, i) => (
              <Reveal key={l.href} delay={0.05 + i * 0.08}>
                <Link
                  href={l.href}
                  className="group block h-full rounded-[1.5rem] border border-[#E5DBCC] bg-white p-6 transition hover:border-[#B78A2A]/40 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold transition group-hover:text-[#B78A2A]">
                    {l.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5A564E]">{l.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-[#B78A2A]">Explore &rarr;</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EARLY ACCESS ═══════════════════ */}
      <section
        id="early-access"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-24 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B78A2A]">
              Early Access
            </p>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Reserve your place in the future of plant care.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Canopy AI is in active development. Join the waitlist to be among
              the first to experience collector-grade plant intelligence.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-[1.75rem] border border-[#E2D6C2] bg-white p-8">
              <EarlyAccessForm />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-center text-sm text-[#8A857C]">
              Questions? Reach out at{' '}
              <a
                href="mailto:akshath.scholar@gmail.com"
                className="text-[#B78A2A] underline underline-offset-2 transition hover:text-[#9D7620]"
              >
                akshath.scholar@gmail.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
