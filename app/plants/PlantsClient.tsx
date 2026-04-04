'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { LeafIcon, TreeIcon, SnakeIcon, HeartIcon, FlowerIcon, SparklesIcon, BirdIcon, BeadsIcon, PeaceIcon, SeedlingIcon, TargetIcon } from '../components/Icons';
import type { ComponentType } from 'react';

/* ── Plant data ── */
interface Plant {
  name: string;
  scientific: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  light: string;
  water: string;
  humidity: string;
  temperature: string;
  soil: string;
  toxicity: string;
  tip: string;
}

/* Icon array parallel to plants array */
const plantIcons: ComponentType<{ size?: number; className?: string }>[] = [
  LeafIcon, TreeIcon, LeafIcon, SnakeIcon, HeartIcon, FlowerIcon,
  SparklesIcon, BirdIcon, BeadsIcon, PeaceIcon, SeedlingIcon, TargetIcon,
];

const plants: Plant[] = [
  {
    name: 'Monstera Deliciosa',
    scientific: 'Monstera deliciosa',
    category: 'Tropical',
    difficulty: 'Easy',
    light: 'Bright indirect',
    water: 'Every 1–2 weeks, let top inch dry',
    humidity: '60%+',
    temperature: '65–85°F (18–29°C)',
    soil: 'Well-draining, peat-based',
    toxicity: 'Toxic to pets',
    tip: 'Provide a moss pole for larger leaves with more fenestrations.',
  },
  {
    name: 'Fiddle Leaf Fig',
    scientific: 'Ficus lyrata',
    category: 'Tropical',
    difficulty: 'Advanced',
    light: 'Bright indirect to direct',
    water: 'Every 1–2 weeks, keep evenly moist',
    humidity: '40–65%',
    temperature: '60–80°F (16–27°C)',
    soil: 'Well-draining, loamy',
    toxicity: 'Toxic to pets',
    tip: 'Rotate quarterly for even growth. Avoid moving once settled.',
  },
  {
    name: 'Pothos',
    scientific: 'Epipremnum aureum',
    category: 'Trailing',
    difficulty: 'Easy',
    light: 'Low to bright indirect',
    water: 'Every 1–2 weeks, let soil dry',
    humidity: '40–60%',
    temperature: '60–80°F (16–27°C)',
    soil: 'Standard potting mix',
    toxicity: 'Toxic to pets',
    tip: 'Trim regularly to encourage bushier growth.',
  },
  {
    name: 'Snake Plant',
    scientific: 'Dracaena trifasciata',
    category: 'Succulent',
    difficulty: 'Easy',
    light: 'Low to bright indirect',
    water: 'Every 2–6 weeks, let dry completely',
    humidity: '30–50%',
    temperature: '60–85°F (16–29°C)',
    soil: 'Cactus / succulent mix',
    toxicity: 'Mildly toxic to pets',
    tip: 'One of the best air-purifying plants. Nearly indestructible.',
  },
  {
    name: 'Philodendron',
    scientific: 'Philodendron hederaceum',
    category: 'Trailing',
    difficulty: 'Easy',
    light: 'Moderate to bright indirect',
    water: 'Every 1–2 weeks',
    humidity: '50–70%',
    temperature: '65–80°F (18–27°C)',
    soil: 'Well-draining, peat-based',
    toxicity: 'Toxic to pets',
    tip: 'Yellowing leaves usually mean overwatering.',
  },
  {
    name: 'Calathea',
    scientific: 'Calathea ornata',
    category: 'Tropical',
    difficulty: 'Advanced',
    light: 'Low to moderate indirect',
    water: 'Keep soil consistently moist',
    humidity: '60%+',
    temperature: '65–80°F (18–27°C)',
    soil: 'Peat-based, moisture retaining',
    toxicity: 'Non-toxic',
    tip: 'Use filtered water — sensitive to minerals and chlorine.',
  },
  {
    name: 'ZZ Plant',
    scientific: 'Zamioculcas zamiifolia',
    category: 'Succulent',
    difficulty: 'Easy',
    light: 'Low to bright indirect',
    water: 'Every 2–3 weeks, let dry',
    humidity: '40–50%',
    temperature: '60–80°F (16–27°C)',
    soil: 'Well-draining, sandy',
    toxicity: 'Toxic if ingested',
    tip: 'Stores water in rhizomes. Overwatering is the main killer.',
  },
  {
    name: 'Bird of Paradise',
    scientific: 'Strelitzia reginae',
    category: 'Tropical',
    difficulty: 'Moderate',
    light: 'Bright direct to indirect',
    water: 'Every 1–2 weeks',
    humidity: '50–70%',
    temperature: '65–80°F (18–27°C)',
    soil: 'Rich, well-draining',
    toxicity: 'Mildly toxic',
    tip: 'Needs 4–6 hours of light for indoor blooms (rare indoors).',
  },
  {
    name: 'String of Pearls',
    scientific: 'Senecio rowleyanus',
    category: 'Succulent',
    difficulty: 'Moderate',
    light: 'Bright indirect',
    water: 'Every 2 weeks, let dry completely',
    humidity: '40–50%',
    temperature: '60–80°F (16–27°C)',
    soil: 'Cactus / succulent mix',
    toxicity: 'Toxic to pets',
    tip: 'Bottom watering prevents rot and keeps pearls healthy.',
  },
  {
    name: 'Peace Lily',
    scientific: 'Spathiphyllum wallisii',
    category: 'Flowering',
    difficulty: 'Easy',
    light: 'Low to moderate indirect',
    water: 'Every 1–2 weeks, keep moist',
    humidity: '50%+',
    temperature: '65–80°F (18–27°C)',
    soil: 'Peat-based, well-draining',
    toxicity: 'Toxic to pets',
    tip: 'Droopy leaves = needs water. Recovers quickly after watering.',
  },
  {
    name: 'Rubber Plant',
    scientific: 'Ficus elastica',
    category: 'Tropical',
    difficulty: 'Easy',
    light: 'Bright indirect',
    water: 'Every 1–2 weeks',
    humidity: '40–60%',
    temperature: '60–80°F (16–27°C)',
    soil: 'Well-draining, peat-based',
    toxicity: 'Toxic to pets',
    tip: 'Wipe leaves monthly to keep them shiny and photosynthesizing.',
  },
  {
    name: 'Alocasia Polly',
    scientific: 'Alocasia × amazonica',
    category: 'Tropical',
    difficulty: 'Advanced',
    light: 'Bright indirect',
    water: 'Keep evenly moist, never soggy',
    humidity: '60%+',
    temperature: '65–80°F (18–27°C)',
    soil: 'Airy, chunky peat-perlite mix',
    toxicity: 'Toxic to pets',
    tip: 'Goes dormant in winter — reduce watering and don\'t panic if leaves drop.',
  },
];

const categories = ['All', ...Array.from(new Set(plants.map((p) => p.category)))];
const difficulties = ['All', 'Easy', 'Moderate', 'Advanced'];

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Advanced: 'bg-red-100 text-red-800',
};

export default function PlantsClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return plants.filter((p) => {
      const matchSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.scientific.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || p.category === category;
      const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
      return matchSearch && matchCat && matchDiff;
    });
  }, [search, category, difficulty]);

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-12"><BackButton /></div>

      {/* Hero */}
      <section className="px-6 pb-10 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Plant Care Library
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Care profiles for your collection.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Quick-reference care guides for popular houseplants. Filter by
              category or difficulty to find what you need.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plants..."
              className="w-full rounded-xl border border-[#E5DBCC] bg-white px-4 py-2.5 text-sm text-[#1F1F1B] outline-none placeholder:text-[#AAA598] focus:border-[#B78A2A] sm:w-64"
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    category === c
                      ? 'bg-[#B78A2A] text-white'
                      : 'bg-white text-[#5C584F] border border-[#E5DBCC] hover:border-[#B78A2A]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    difficulty === d
                      ? 'bg-[#B78A2A] text-white'
                      : 'bg-white text-[#5C584F] border border-[#E5DBCC] hover:border-[#B78A2A]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-[#8A857C]">
            {filtered.length} plant{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* Plant grid */}
      <section className="px-6 pb-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((plant) => (
                <motion.div
                  key={plant.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="cursor-pointer rounded-2xl border border-[#E5DBCC] bg-white p-5 shadow-sm transition hover:border-[#B78A2A]/40 hover:shadow-md"
                  onClick={() =>
                    setExpanded(expanded === plant.name ? null : plant.name)
                  }
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {(() => { const idx = plants.indexOf(plant); const Icon = plantIcons[idx]; return Icon ? <Icon size={28} className="text-[#B78A2A]" /> : null; })()}
                      <h3 className="mt-2 text-lg font-semibold">{plant.name}</h3>
                      <p className="text-sm italic text-[#8A857C]">
                        {plant.scientific}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${difficultyColor[plant.difficulty]}`}
                    >
                      {plant.difficulty}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-[#F7F3EC] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-[#B78A2A]">
                        Light
                      </p>
                      <p className="mt-0.5 text-[#4F4B44]">{plant.light}</p>
                    </div>
                    <div className="rounded-lg bg-[#F7F3EC] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-[#B78A2A]">
                        Humidity
                      </p>
                      <p className="mt-0.5 text-[#4F4B44]">{plant.humidity}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === plant.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-2 border-t border-[#E5DBCC] pt-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#8A857C]">Water</span>
                            <span className="text-right text-[#4F4B44]">
                              {plant.water}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A857C]">Temp</span>
                            <span className="text-right text-[#4F4B44]">
                              {plant.temperature}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A857C]">Soil</span>
                            <span className="text-right text-[#4F4B44]">
                              {plant.soil}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8A857C]">Toxicity</span>
                            <span className="text-right text-[#4F4B44]">
                              {plant.toxicity}
                            </span>
                          </div>
                          <div className="mt-3 rounded-xl bg-[#F3EDE2] p-3">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#B78A2A]">
                              Pro Tip
                            </p>
                            <p className="mt-1 text-sm text-[#5C584F]">
                              {plant.tip}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="mt-3 text-center text-xs text-[#AAA598]">
                    {expanded === plant.name ? 'Tap to collapse' : 'Tap for full profile'}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-[#8A857C]">
                No plants match your filters. Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Can&apos;t find your plant?
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              Try our AI-powered plant identifier — snap a photo and get an
              instant species ID with a full care profile.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/identify"
                className="btn-ripple rounded-full bg-[#B78A2A] px-6 py-3 font-medium text-white transition hover:bg-[#9D7620]"
              >
                Identify a Plant
              </Link>
              <Link
                href="/#early-access"
                className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-6 py-3 font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
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
