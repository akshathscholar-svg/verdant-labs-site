import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import EarlyAccessForm from './components/EarlyAccessForm';
import Reveal from './components/Reveal';
import CountUp from './components/CountUp';
import FloatingOrbs from './components/FloatingOrbs';
import FloatingLeaves from './components/FloatingLeaves';
import FloatingParticles from './components/FloatingParticles';
import TiltCard from './components/TiltCard';
import TextReveal from './components/TextReveal';
import VineDivider from './components/VineDivider';
import ParallaxImage from './components/ParallaxImage';
import ZoomImage from './components/ZoomImage';
import SlotCountUp from './components/SlotCountUp';
import NewsletterForm from './components/NewsletterForm';

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
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />

      {/* Hero */}
      <section
        id="top"
        className="relative px-6 pb-20 pt-12 md:px-10 lg:px-12 lg:pt-14 xl:pt-16"
      >
        <FloatingLeaves />
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="max-w-3xl">
              <Reveal>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
                  Smart plant monitoring
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="hero-shimmer text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
                  Smarter indoor plant care through real-time monitoring and guidance.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A564E] md:text-xl">
                  Canopy AI helps indoor plant owners detect stress early and make
                  better care decisions through real-time monitoring, alerts, and
                  guidance. Purchase the device, get 3 months free.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#prototype"
                    className="btn-ripple cta-glow rounded-full bg-[#B78A2A] px-6 py-3 text-center font-medium text-white transition hover:bg-[#9D7620] hover:shadow-[0_8px_30px_rgba(183,138,42,0.3)]"
                  >
                    View Prototype
                  </a>

                  <a
                    href="#early-access"
                    className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-6 py-3 text-center font-medium text-[#1F1F1B] transition hover:border-[#B78A2A] hover:shadow-md"
                  >
                    Join Early Access
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="mt-12 rounded-[1.9rem] border border-[#E5DBCC] bg-white/80 p-6 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                    Built For Plant Owners
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    Turn plant data into clear, everyday guidance.
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-[#5C584F]">
                    Designed for serious indoor plant owners who care about prevention,
                    not guesswork — with species-specific recommendations that are
                    easier to trust than a dashboard full of raw sensor data.
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
                        Multiple plants, collections, and higher-value specimens.
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
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={photoAssets.hero.src}
                        className="absolute inset-0 h-full w-full object-cover"
                      >
                        <source
                          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
                          type="video/mp4"
                        />
                      </video>

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
                        <ZoomImage
                          src={photoAssets.detailPrimary.src}
                          alt={photoAssets.detailPrimary.alt}
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 16vw"
                          className="relative mt-3 aspect-[4/5] rounded-[1.2rem] bg-[#F7F3EC] sm:aspect-[5/6]"
                        />
                      </div>

                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-4 sm:p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Plant Owner Profile
                        </p>
                        <ZoomImage
                          src={photoAssets.detailSecondary.src}
                          alt={photoAssets.detailSecondary.alt}
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 16vw"
                          className="relative mt-3 aspect-[4/5] rounded-[1.2rem] bg-[#F7F3EC] sm:aspect-[5/6]"
                        />
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
                  For Every Plant Owner
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
        <VineDivider className="mb-10" />
        <div className="mx-auto max-w-7xl">
          <Reveal direction="left" distance={60}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              The Problem
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              <TextReveal text="Plant stress starts before the damage is visible." />
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.1} direction="left" distance={50}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">Guesswork</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Most plant owners rely on schedules, intuition, and generic care
                  advice that is not personalized to the plant.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.2} direction="up">
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">Late detection</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  By the time leaves curl, yellow, or droop, the plant may already
                  be under significant environmental stress.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.3} direction="right" distance={50}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-xl font-semibold">High-value risk</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Rare and specialty plants can be expensive, making poor care
                  decisions much more costly.
                </p>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        id="solution"
        className="relative bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <FloatingParticles />
        <VineDivider className="mb-10" />
        <div className="mx-auto max-w-7xl">
          <Reveal direction="right" distance={60}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              The Solution
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              <TextReveal text="Canopy AI turns environmental data into clear plant-care decisions." />
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={0.1} direction="right" distance={50}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  01
                </p>
                <h3 className="mt-3 text-xl font-semibold">Sense</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Sensors monitor soil moisture, temperature, humidity, and light
                  around the plant in real time.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  02
                </p>
                <h3 className="mt-3 text-xl font-semibold">Interpret</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Verdant Labs translates those signals into plant-specific stress
                  insight instead of overwhelming users with raw numbers.
                </p>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.4} direction="left" distance={50}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  03
                </p>
                <h3 className="mt-3 text-xl font-semibold">Act</h3>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Users receive actionable next steps that make plant care more
                  precise, proactive, and confident.
                </p>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section
        id="tiers"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <VineDivider className="mb-10" />
        <div className="mx-auto max-w-7xl">
          <Reveal direction="left" distance={60}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Product Tiers
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              <TextReveal text="Affordable tiers for every plant owner." />
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal delay={0.1} direction="left" distance={60}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Foundation</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold">$59</span>
                  <span className="ml-1 text-sm text-[#5A564E]">device</span>
                  <span className="ml-2 text-sm text-[#5A564E]">+ $3.99/mo</span>
                </div>
                <p className="mt-1 text-xs text-[#B78A2A] font-medium">3 months included free</p>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Entry-level monitoring with core alerts and basic visibility.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Soil moisture monitoring</li>
                  <li>&#8226; Temperature and humidity tracking</li>
                  <li>&#8226; Light sensing</li>
                  <li>&#8226; Core alerts and basic plant insights</li>
                </ul>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <TiltCard className="h-full rounded-[1.75rem] border border-[#CFA74F] bg-white p-7 shadow-[0_18px_50px_rgba(120,92,28,0.08)] transition hover:shadow-[0_24px_60px_rgba(120,92,28,0.14)]">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                  Recommended
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Canopy AI</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="ml-1 text-sm text-[#5A564E]">device</span>
                  <span className="ml-2 text-sm text-[#5A564E]">+ $7.99/mo</span>
                </div>
                <p className="mt-1 text-xs text-[#B78A2A] font-medium">3 months included free</p>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  The full Canopy AI experience — smarter recommendations and stronger guidance.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Everything in Foundation</li>
                  <li>&#8226; Species-specific AI recommendations</li>
                  <li>&#8226; Proactive care guidance</li>
                  <li>&#8226; Richer plant insight over time</li>
                </ul>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.4} direction="right" distance={60}>
              <TiltCard className="h-full rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7 transition hover:border-[#B78A2A]/30 hover:shadow-lg">
                <h3 className="text-2xl font-semibold">Elite</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="ml-1 text-sm text-[#5A564E]">device</span>
                  <span className="ml-2 text-sm text-[#5A564E]">+ $9.99/mo</span>
                </div>
                <p className="mt-1 text-xs text-[#B78A2A] font-medium">3 months included free</p>
                <p className="mt-3 text-base leading-7 text-[#5A564E]">
                  Deeper insights, advanced analytics, and enhanced plant-care tools for collectors.
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                  <li>&#8226; Everything in Canopy AI</li>
                  <li>&#8226; Long-term stress analysis</li>
                  <li>&#8226; Advanced alerts and insights</li>
                  <li>&#8226; Early access to new features</li>
                </ul>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prototype */}
      <section
        id="prototype"
        className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <VineDivider className="mb-10" />
        <div className="mx-auto max-w-7xl">
          <Reveal direction="right" distance={60}>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
              Prototype
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              <TextReveal text="A working prototype, getting closer to consumer-ready." />
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <Reveal delay={0.1}>
              <div className="rounded-[1.9rem] border border-[#E5DBCC] bg-white p-8 shadow-sm">
                <p className="text-base leading-8 text-[#5A564E]">
                  Verdant Labs has a working Arduino-based MVP that demonstrates
                  real-time environmental monitoring. The current prototype tracks
                  moisture, light, temperature, and humidity. New enclosure development
                  moves Canopy AI closer to a consumer-ready product.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] bg-[#F7F3EC] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
                      Current Focus
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5C584F]">
                      Cleaner internals, improved shell design, sensor-first
                      early stress detection, and better recommendations.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] bg-[#F7F3EC] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
                      Next Stage
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#5C584F]">
                      Consumer-ready enclosure, richer plant analysis, and a more
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

                      <div className="mt-3 grid gap-2 grid-cols-3">
                        <div className="rounded-xl bg-black/18 px-2 py-2">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-white/62">
                            Moisture
                          </p>
                          <p className="mt-1 text-lg font-semibold">
                            <SlotCountUp end={41} suffix="%" />
                          </p>
                        </div>

                        <div className="rounded-xl bg-black/18 px-2 py-2">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-white/62">
                            Humidity
                          </p>
                          <p className="mt-1 text-lg font-semibold">
                            <SlotCountUp end={58} suffix="%" />
                          </p>
                        </div>

                        <div className="rounded-xl bg-black/18 px-2 py-2">
                          <p className="text-[10px] uppercase tracking-[0.14em] text-white/62">
                            Light
                          </p>
                          <p className="mt-1 text-lg font-semibold whitespace-nowrap">
                            <SlotCountUp end={8.2} suffix="k" decimals={1} />
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
                I started Verdant Labs because I kept losing plants to
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

      {/* Verdant Journal / Newsletter */}
      <section className="border-t border-[#E7DECF] bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="rounded-[1.9rem] border border-[#E5DBCC] bg-white p-8 shadow-sm md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
                    The Verdant Journal
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                    Plant intelligence, delivered.
                  </h2>
                  <p className="mt-3 text-base leading-7 text-[#5A564E]">
                    Get behind-the-scenes updates on Canopy AI development, plant care
                    tips from our research, and early access news — straight to your
                    inbox.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[#5C584F]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#B78A2A]">✦</span> Monthly updates, no spam
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#B78A2A]">✦</span> Plant care insights from our AI research
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#B78A2A]">✦</span> Early peeks at new features
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#F7F3EC] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B78A2A]/10">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-10 6L2 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-[#1F1F1B]">Subscribe to the Journal</p>
                  </div>
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-12 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[auto_1fr]">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    <svg key="0" viewBox="0 0 24 24" className="h-5 w-5 text-[#6B8F5E]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.68-3.3 12-11"/><path d="M6 15a5 5 0 0 0 6.5-4.4"/></svg>,
                    <svg key="1" viewBox="0 0 24 24" className="h-5 w-5 text-[#7A9F6B]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5 8-8 8-14"/><path d="M10 20c0-5 .5-9 3-13"/><path d="M18 6c-1.8 0-6 2-6.5 6"/></svg>,
                    <svg key="2" viewBox="0 0 24 24" className="h-5 w-5 text-[#6B8F5E]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.68-3.3 12-11"/><path d="M6 15a5 5 0 0 0 6.5-4.4"/></svg>,
                    <svg key="3" viewBox="0 0 24 24" className="h-5 w-5 text-[#5A7E4E]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M5.2 10a7 7 0 0 1 13.6 0"/></svg>,
                    <svg key="4" viewBox="0 0 24 24" className="h-5 w-5 text-[#7A9F6B]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10"/><path d="M12 2c3 3 4.5 7 4.5 10s-1.5 7-4.5 10"/><path d="M2 12h10"/></svg>,
                  ].map((icon, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F3EDE2] bg-white shadow-sm"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#1F1F1B]">
                    Plant owners are paying attention.
                  </p>
                  <p className="text-sm text-[#7A756C]">
                    Join plant owners already on the early access list.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:justify-end">
                {[
                  { quote: 'Finally, proactive plant care.', author: 'Indoor plant owner' },
                  { quote: 'Been waiting for something like this.', author: 'Plant parent' },
                  { quote: 'My monsteras need this.', author: 'Tropical enthusiast' },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-[#E5DBCC] bg-white px-4 py-3 shadow-sm"
                  >
                    <p className="text-sm font-medium text-[#1F1F1B]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-[#8A857C]">— {t.author}</p>
                  </div>
                ))}
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
              Be among the first to experience smarter plant care. Join the
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