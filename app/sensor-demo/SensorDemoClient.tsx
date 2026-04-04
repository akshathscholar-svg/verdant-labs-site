'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import BackButton from '../components/BackButton';
import { DropletIcon, SunIcon, ThermometerIcon, WindIcon, CheckCircleIcon, WarningIcon, AlertOctagonIcon } from '../components/Icons';
import type { ComponentType } from 'react';

interface Reading {
  label: string;
  unit: string;
  min: number;
  max: number;
  optimal: [number, number];
  value: number;
  color: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

function getStatus(value: number, optimal: [number, number]): 'low' | 'optimal' | 'high' {
  if (value < optimal[0]) return 'low';
  if (value > optimal[1]) return 'high';
  return 'optimal';
}

function generateRecommendations(readings: Reading[]): { level: string; color: string; recommendations: string[] } {
  const statuses = readings.map((r) => ({
    label: r.label,
    status: getStatus(r.value, r.optimal),
    value: r.value,
    optimal: r.optimal,
  }));

  const recommendations: string[] = [];
  let stressCount = 0;

  for (const s of statuses) {
    if (s.status === 'low') {
      stressCount++;
      switch (s.label) {
        case 'Moisture':
          recommendations.push(`Soil moisture is low (${s.value}%). Water your plant within the next 12–24 hours.`);
          break;
        case 'Light':
          recommendations.push(`Light level is below optimal (${s.value} lux). Move closer to a window or supplement with a grow light.`);
          break;
        case 'Temperature':
          recommendations.push(`Temperature is too cold (${s.value}°F). Move away from drafts or cold windows.`);
          break;
        case 'Humidity':
          recommendations.push(`Humidity is low (${s.value}%). Consider misting or placing a humidity tray nearby.`);
          break;
      }
    } else if (s.status === 'high') {
      stressCount++;
      switch (s.label) {
        case 'Moisture':
          recommendations.push(`Soil is too wet (${s.value}%). Hold off on watering and ensure proper drainage.`);
          break;
        case 'Light':
          recommendations.push(`Light is very intense (${s.value} lux). Consider sheer curtains to filter direct sun.`);
          break;
        case 'Temperature':
          recommendations.push(`Temperature is high (${s.value}°F). Improve ventilation or move away from heat sources.`);
          break;
        case 'Humidity':
          recommendations.push(`Humidity is very high (${s.value}%). Improve air circulation to prevent fungal issues.`);
          break;
      }
    }
  }

  if (recommendations.length === 0) {
    recommendations.push('All readings are within the optimal range. Your plant is in great condition — no action needed.');
  }

  const level = stressCount === 0 ? 'Low Risk' : stressCount <= 2 ? 'Moderate Risk' : 'High Risk';
  const color = stressCount === 0 ? 'text-green-600' : stressCount <= 2 ? 'text-amber-600' : 'text-red-600';

  return { level, color, recommendations };
}

function Slider({
  reading,
  onChange,
}: {
  reading: Reading;
  onChange: (v: number) => void;
}) {
  const status = getStatus(reading.value, reading.optimal);
  const statusColor =
    status === 'optimal'
      ? 'text-green-600'
      : status === 'low'
        ? 'text-amber-600'
        : 'text-red-600';
  const pct = ((reading.value - reading.min) / (reading.max - reading.min)) * 100;

  return (
    <div className="rounded-2xl border border-[#E5DBCC] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{(() => { const Icon = reading.icon; return <Icon size={20} />; })()}</span>
          <span className="text-sm font-semibold text-[#1F1F1B]">
            {reading.label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold" style={{ color: reading.color }}>
            {reading.value}
          </span>
          <span className="text-sm text-[#8A857C]"> {reading.unit}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mt-4">
        {/* Optimal range indicator */}
        <div className="absolute top-1/2 h-2 rounded-full bg-green-100"
          style={{
            left: `${((reading.optimal[0] - reading.min) / (reading.max - reading.min)) * 100}%`,
            width: `${((reading.optimal[1] - reading.optimal[0]) / (reading.max - reading.min)) * 100}%`,
            transform: 'translateY(-50%)',
          }}
        />
        <input
          type="range"
          min={reading.min}
          max={reading.max}
          value={reading.value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 w-full cursor-pointer accent-[#B78A2A]"
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[#8A857C]">
        <span>{reading.min}{reading.unit}</span>
        <span className={`font-medium ${statusColor}`}>
          {status === 'optimal' ? <><CheckCircleIcon size={12} className="inline mr-0.5" /> Optimal</> : status === 'low' ? '↓ Low' : '↑ High'}
        </span>
        <span>{reading.max}{reading.unit}</span>
      </div>
    </div>
  );
}

export default function SensorDemoClient() {
  const [moisture, setMoisture] = useState(42);
  const [light, setLight] = useState(8000);
  const [temperature, setTemperature] = useState(72);
  const [humidity, setHumidity] = useState(55);

  const readings: Reading[] = useMemo(
    () => [
      {
        label: 'Moisture',
        unit: '%',
        min: 0,
        max: 100,
        optimal: [30, 60],
        value: moisture,
        color: '#3B82F6',
        icon: DropletIcon,
      },
      {
        label: 'Light',
        unit: ' lux',
        min: 0,
        max: 30000,
        optimal: [5000, 15000],
        value: light,
        color: '#EAB308',
        icon: SunIcon,
      },
      {
        label: 'Temperature',
        unit: '°F',
        min: 40,
        max: 100,
        optimal: [65, 80],
        value: temperature,
        color: '#EF4444',
        icon: ThermometerIcon,
      },
      {
        label: 'Humidity',
        unit: '%',
        min: 10,
        max: 100,
        optimal: [40, 70],
        value: humidity,
        color: '#06B6D4',
        icon: WindIcon,
      },
    ],
    [moisture, light, temperature, humidity]
  );

  const setters = [setMoisture, setLight, setTemperature, setHumidity];
  const { level, color, recommendations } = generateRecommendations(readings);

  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <Header />
      <div className="mx-auto max-w-4xl px-6 pt-6 lg:px-12"><BackButton /></div>

      {/* Hero */}
      <section className="px-6 pb-10 pt-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Interactive Demo
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              See Canopy AI in action.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5A564E]">
              Adjust the sensor sliders below to simulate different plant
              environments. Watch how Canopy AI generates recommendations in
              real time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Demo */}
      <section className="px-6 pb-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            {/* Sliders */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                Sensor Readings
              </h2>
              {readings.map((r, i) => (
                <Slider key={r.label} reading={r} onChange={setters[i]} />
              ))}
            </div>

            {/* AI Output */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                Canopy AI Response
              </h2>
              <motion.div
                key={recommendations.join(',')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-[1.5rem] border border-[#E5DBCC] bg-white p-6 shadow-sm"
              >
                {/* Risk Level */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      level === 'Low Risk'
                        ? 'bg-green-100'
                        : level === 'Moderate Risk'
                          ? 'bg-amber-100'
                          : 'bg-red-100'
                    }`}
                  >
                    <span className="text-xl">
                      {level === 'Low Risk' ? <CheckCircleIcon size={20} className="text-green-600" /> : level === 'Moderate Risk' ? <WarningIcon size={20} className="text-amber-600" /> : <AlertOctagonIcon size={20} className="text-red-600" />}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#8A857C]">
                      Stress Forecast
                    </p>
                    <p className={`text-xl font-bold ${color}`}>{level}</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                    Recommendations
                  </p>
                  {recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-xl bg-[#F7F3EC] p-4"
                    >
                      <span className="mt-0.5 shrink-0 text-[#B78A2A]">→</span>
                      <p className="text-sm leading-6 text-[#4F4B44]">{rec}</p>
                    </div>
                  ))}
                </div>

                {/* Sensor summary chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {readings.map((r) => {
                    const s = getStatus(r.value, r.optimal);
                    return (
                      <span
                        key={r.label}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          s === 'optimal'
                            ? 'bg-green-100 text-green-700'
                            : s === 'low'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {(() => { const Icon = r.icon; return <Icon size={12} className="inline mr-0.5" />; })()} {r.label}: {r.value}{r.unit}
                      </span>
                    );
                  })}
                </div>
              </motion.div>

              {/* Disclaimer */}
              <p className="mt-4 text-center text-xs text-[#AAA598]">
                This is a simulation. Actual Canopy AI uses species-specific profiles
                and multi-day trend analysis for more nuanced recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-16 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Ready for the real thing?
            </h2>
            <p className="mt-3 text-base text-[#5A564E]">
              The full Canopy AI system pairs real sensors with species-specific
              intelligence. Join early access to be first in line.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/#early-access"
                className="btn-ripple rounded-full bg-[#B78A2A] px-8 py-3 font-medium text-white transition hover:bg-[#9D7620]"
              >
                Join Early Access
              </Link>
              <Link
                href="/how-it-works"
                className="btn-ripple rounded-full border border-[#CFC3AE] bg-white px-8 py-3 font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
              >
                How It Works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
