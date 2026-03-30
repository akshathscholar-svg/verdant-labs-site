import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import EarlyAccessForm from './components/EarlyAccessForm';
import Reveal from './components/Reveal';
import CountUp from './components/CountUp';
import FloatingOrbs from './components/FloatingOrbs';

const photoAssets = {
  hero: {
    src: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80',
    alt: 'Young seedlings growing in a tray under soft natural light',
  },
  detailPrimary: {
    src: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
    alt: 'Healthy striped succulent in a pastel planter on a bright surface',
  },
  detailSecondary: {
    src: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80',
    alt: 'Compact succulent in a minimal white planter against a clean backdrop',
  },
  prototype: {
    src: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=80',
    alt: 'Dense green fern foliage in low light',
  },
} as const;

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />

      {/* Hero */}
      <section
        id="top"
        className="px-6 pb-20 pt-12 md:px-10 lg:px-12 lg:pt-14 xl:pt-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="max-w-3xl">
              <Reveal>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
                  Predictive plant care
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="hero-shimmer text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
                  Protect your plants before stress becomes visible.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A564E] md:text-xl">
                  Verdant Labs builds Canopy AI, a botanical intelligence system
                  that helps plant owners detect environmental stress early and act
                  with confidence.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#prototype"
                    className="cta-glow rounded-full bg-[#B78A2A] px-6 py-3 text-center font-medium text-white transition hover:bg-[#9D7620] hover:shadow-[0_8px_30px_rgba(183,138,42,0.3)]"
                  >
                    View Prototype
                  </a>

                  <a
                    href="#early-access"
                    className="rounded-full border border-[#CFC3AE] bg-white px-6 py-3 text-center font-medium text-[#1F1F1B] transition hover:border-[#B78A2A] hover:shadow-md"
                  >
                    Join Early Access
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="mt-12 rounded-[1.9rem] border border-[#E5DBCC] bg-white/80 p-6 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                    Built For Valuable Collections
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    Botanical intelligence for premium plant owners.
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[#5C584F]">
                    Designed for collectors who care about prevention, not guesswork,
                    with context-rich recommendations that are easier to trust than
                    a dashboard full of raw sensor data.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-[#F7F3EC] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#B78A2A]">
                        Inputs
                      </p>
                      <p className="mt-2 text-sm text-[#4F4B44]">
                        Moisture, humidity, heat, and light.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F7F3EC] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#B78A2A]">
                        Output
                      </p>
                      <p className="mt-2 text-sm text-[#4F4B44]">
                        Plain-language next steps with context.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F7F3EC] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#B78A2A]">
                        Use Case
                      </p>
                      <p className="mt-2 text-sm text-[#4F4B44]">
                        Rare plants, home collections, and high-value specimens.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} direction="right" className="relative xl:pl-4">
              <FloatingOrbs />

              <div className="relative rounded-[2rem] border border-[#E5DBCC] bg-white p-4 shadow-[0_20px_70px_rgba(60,48,25,0.08)] sm:p-5">
                <div className="rounded-[1.6rem] bg-gradient-to-br from-[#FCFBF8] to-[#EFE7D9] p-4 sm:p-5">
                  <div className="grid gap-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#D8CAB1] bg-[#F8F4EC] shadow-sm">
                      <Image
                        src={photoAssets.hero.src}
                        alt={photoAssets.hero.alt}
                        fill
                        sizes="(max-width: 1279px) 100vw, 42vw"
                        className="object-cover"
                        priority
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1C2118]/80 via-[#1C2118]/25 to-transparent p-5 sm:p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#F0E5C7]">
                          Live Conditions
                        </p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-white/88 sm:text-base">
                          A clearer read on moisture, light, and ambient stress
                          before leaves ever start to curl.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-5 md:col-span-2">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Canopy AI
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold">
                          Environmental stress, interpreted.
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[#5C584F]">
                          Verdant Labs pairs ambient sensing with plant-specific
                          recommendations so owners can act while the plant still
                          looks healthy.
                        </p>
                      </div>

                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-4 sm:p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Healthy Baseline
                        </p>
                        <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-[#F7F3EC] sm:aspect-[5/6]">
                          <Image
                            src={photoAssets.detailPrimary.src}
                            alt={photoAssets.detailPrimary.alt}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 16vw"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-4 sm:p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Collector Profile
                        </p>
                        <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-[#F7F3EC] sm:aspect-[5/6]">
                          <Image
                            src={photoAssets.detailSecondary.src}
                            alt={photoAssets.detailSecondary.alt}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 16vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust Metrics Strip */}
          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/70 px-5 py-4 text-center backdrop-blur transition hover:border-[#B78A2A]/40 hover:scale-[1.02] hover:shadow-md">
                <p className="text-2xl font-semibold text-[#B78A2A]">4</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7A756C]">
                  Sensor Types
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/70 px-5 py-4 text-center backdrop-blur transition hover:border-[#B78A2A]/40 hover:scale-[1.02] hover:shadow-md">
                <p className="text-2xl font-semibold text-[#B78A2A]">&lt; 2s</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7A756C]">
                  Alert Latency
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/70 px-5 py-4 text-center backdrop-blur transition hover:border-[#B78A2A]/40 hover:scale-[1.02] hover:shadow-md">
                <p className="text-2xl font-semibold text-[#B78A2A]">24/7</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7A756C]">
                  Continuous Monitoring
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/70 px-5 py-4 text-center backdrop-blur transition hover:border-[#B78A2A]/40 hover:scale-[1.02] hover:shadow-md">
                <p className="text-2xl font-semibold text-[#B78A2A]">3 Tiers</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7A756C]">
                  For Every Collector
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.3fr)]">
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4 transition hover:border-[#B78A2A]/40 hover:shadow-md">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Core Signals
                </p>
                <p className="mt-2 text-sm leading-6 text-[#4F4B44]">
                  Moisture, light, temperature, and humidity tracked in real time.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4 transition hover:border-[#B78A2A]/40 hover:shadow-md">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Outcome
                </p>
                <p className="mt-2 text-sm leading-6 text-[#4F4B44]">
                  Clear recommendations instead of dashboards full of raw numbers.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4 transition hover:border-[#B78A2A]/40 hover:shadow-md">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Vision
                </p>
                <p className="mt-2 text-sm leading-6 text-[#4F4B44]">
                  A smarter, more proactive future for plant ownership.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#D8CAB1] bg-[#F3EDE2] p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Why It Matters
                </p>
                <p className="mt-3 text-base leading-7 text-[#5C584F]">
                  Plant stress compounds quietly. A better product experience is not
                  just about more sensing. It is about surfacing the right signal in
                  time for someone to do something useful with it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section
        id="problem"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              The Problem
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Plant stress starts before the damage is visible.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">Guesswork</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Most plant owners rely on schedules, intuition, and generic care
                  advice that is not personalized to the plant.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">Late detection</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  By the time leaves curl, yellow, or droop, the plant may already
                  be under significant environmental stress.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">High-value risk</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Rare and specialty plants can be expensive, making poor care
                  decisions much more costly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solution"
        className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              The Solution
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Canopy AI turns environmental data into clear plant-care decisions.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  01
                </p>
                <h3 className="mt-3 text-xl font-semibold">Sense</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Sensors monitor soil moisture, temperature, humidity, and light
                  around the plant in real time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  02
                </p>
                <h3 className="mt-3 text-xl font-semibold">Interpret</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Verdant Labs translates those signals into plant-specific stress
                  insight instead of overwhelming users with raw numbers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  03
                </p>
                <h3 className="mt-3 text-xl font-semibold">Act</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Users receive actionable next steps that make plant care more
                  precise, proactive, and confident.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section
        id="tiers"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Product Tiers
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Start with environmental intelligence, then expand into visual monitoring.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal delay={0.1}>
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Foundation</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Core environmental monitoring for serious plant owners.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Soil moisture monitoring</li>
                  <li>&#8226; Temperature and humidity tracking</li>
                  <li>&#8226; Light sensing</li>
                  <li>&#8226; App access and recommendations</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-[1.75rem] border border-[#CFA74F] bg-white p-7 shadow-[0_18px_50px_rgba(120,92,28,0.08)] transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(120,92,28,0.14)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  Featured
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Canopy AI</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Adds visual intelligence to the core system.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Everything in Foundation</li>
                  <li>&#8226; Camera add-on module</li>
                  <li>&#8226; Visual monitoring</li>
                  <li>&#8226; Richer plant insight over time</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:-translate-y-1 hover:scale-[1.02] hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Elite</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Premium intelligence for advanced collectors.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Everything in Canopy AI</li>
                  <li>&#8226; Long-term stress analysis</li>
                  <li>&#8226; Advanced alerts and insights</li>
                  <li>&#8226; Early access to new features</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prototype */}
      <section
        id="prototype"
        className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Prototype
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              A working hardware prototype is already in development.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <Reveal delay={0.1}>
              <div className="rounded-[1.9rem] border border-[#E5DBCC] bg-white p-8 shadow-sm">
                <p className="text-base leading-8 text-[#5A564E]">
                  Verdant Labs has already developed an early hardware prototype
                  that demonstrates real-time environmental monitoring. The system
                  is now being refined into a cleaner, more product-like enclosure
                  for premium plant owners.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] bg-[#F7F3EC] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
                      Current Focus
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5C584F]">
                      Cleaner internals, improved shell design, stronger product
                      presentation, and better recommendations.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] bg-[#F7F3EC] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
                      Next Stage
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5C584F]">
                      Camera add-on development, richer plant analysis, and a more
                      refined intelligence layer.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} direction="right">
              <div className="rounded-[1.9rem] border border-[#122113] bg-[#0F180F] p-3 shadow-[0_18px_50px_rgba(16,24,15,0.18)] sm:p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem]">
                  <Image
                    src={photoAssets.prototype.src}
                    alt={photoAssets.prototype.alt}
                    fill
                    sizes="(max-width: 1279px) 100vw, 38vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#091009]/90 via-[#091009]/30 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/82 backdrop-blur">
                    Prototype Feed
                  </div>

                  <div className="absolute inset-x-4 bottom-4 grid gap-3 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                    <div className="rounded-[1.35rem] border border-white/15 bg-[#10180F]/70 p-4 text-white backdrop-blur">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#E9DFC9]">
                        Stress Forecast
                      </p>
                      <p className="mt-2 text-3xl font-semibold">Low risk</p>
                      <p className="mt-2 text-sm leading-6 text-white/76">
                        Light and moisture are holding inside the target range,
                        with no immediate intervention needed.
                      </p>
                    </div>

                    <div className="rounded-[1.35rem] border border-white/15 bg-white/12 p-4 text-white backdrop-blur">
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#E9DFC9]">
                        Sensor Snapshot
                      </p>

                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-black/18 px-3 py-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/62">
                            Moisture
                          </p>
                          <p className="mt-2 text-xl font-semibold">
                            <CountUp end={41} suffix="%" />
                          </p>
                        </div>

                        <div className="rounded-2xl bg-black/18 px-3 py-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/62">
                            Humidity
                          </p>
                          <p className="mt-2 text-xl font-semibold">
                            <CountUp end={58} suffix="%" />
                          </p>
                        </div>

                        <div className="rounded-2xl bg-black/18 px-3 py-3">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/62">
                            Light
                          </p>
                          <p className="mt-2 text-xl font-semibold">
                            <CountUp end={8.2} suffix="k lux" decimals={1} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder Quote */}
      <section className="bg-[#F7F3EC] px-6 pb-0 pt-4 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[1.9rem] border border-[#E5DBCC] bg-white p-8 text-center shadow-sm md:p-12">
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
              <blockquote className="text-xl font-medium leading-8 text-[#1F1F1B] md:text-2xl md:leading-9">
                I started Verdant Labs because I kept losing rare plants to
                problems I could not see in time. The technology to prevent that
                existed — it just had not been packaged into something a plant
                owner would actually use.
              </blockquote>
              <div className="mt-6">
                <p className="text-sm font-semibold text-[#1F1F1B]">
                  Akshath Saravanan
                </p>
                <p className="text-sm text-[#7A756C]">
                  Founder, Verdant Labs
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Early Access */}
      <section
        id="early-access"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Early Access
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Reserve your spot for Canopy AI.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Be among the first to experience predictive plant care. Join the
              waitlist and we&apos;ll reach out as soon as Canopy AI is ready.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 rounded-[1.9rem] border border-[#E2D6C2] bg-white p-8">
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