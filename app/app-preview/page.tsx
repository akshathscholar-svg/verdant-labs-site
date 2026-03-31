import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'App Preview - Canopy AI | Verdant Labs',
  description:
    'Preview the upcoming Canopy AI dashboard — botanical intelligence for premium plant owners.',
};

/* ── mock data ────────────────────────────────────────────── */

const sensors = [
  {
    label: 'Soil Moisture',
    value: '41%',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.7C12 2.7 5 10.2 5 14.5a7 7 0 0 0 14 0C19 10.2 12 2.7 12 2.7Z" />
      </svg>
    ),
    trend: 'Decreasing',
    trendDown: true,
    bars: [72, 65, 58, 53, 48, 44, 41],
  },
  {
    label: 'Light',
    value: '8.2k lux',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    trend: 'Stable',
    trendDown: false,
    bars: [78, 82, 80, 79, 81, 82, 82],
  },
  {
    label: 'Temperature',
    value: '72 °F',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z" />
      </svg>
    ),
    trend: 'Stable',
    trendDown: false,
    bars: [70, 71, 72, 72, 73, 72, 72],
  },
  {
    label: 'Humidity',
    value: '58%',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.7C12 2.7 5 10.2 5 14.5a7 7 0 0 0 14 0C19 10.2 12 2.7 12 2.7Z" />
        <path d="M8 14.5a4 4 0 0 0 4 4" opacity="0.5" />
      </svg>
    ),
    trend: 'Stable',
    trendDown: false,
    bars: [55, 56, 57, 58, 58, 57, 58],
  },
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const futureFeatures = [
  {
    label: 'Species-Specific Insights',
    desc: 'Tailored care profiles for 500+ houseplant species.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.5 4.5 0 0 0 8 20c4 0 8.5-3 11-8a2.19 2.19 0 0 0 0-2 2.19 2.19 0 0 0-2-2Z" />
        <path d="M2 2l20 20" />
      </svg>
    ),
  },
  {
    label: 'Health History',
    desc: 'Month-over-month health timeline for every plant.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: 'Predictive Alerts',
    desc: 'Get warned before stress becomes visible.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: 'Visual Stress Detection',
    desc: 'Camera-based leaf analysis for early damage signs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
];

/* ── component ────────────────────────────────────────────── */

function MiniBarChart({
  bars,
  color = '#B78A2A',
}: {
  bars: number[];
  color?: string;
}) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-[5px]" aria-hidden>
      {bars.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-[18px] rounded-sm"
            style={{
              height: `${(v / max) * 48}px`,
              backgroundColor: color,
              opacity: 0.25 + (i / (bars.length - 1)) * 0.75,
            }}
          />
          <span className="text-[9px] text-[#5C584F]/60">{dayLabels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AppPreview() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      {/* Thin top bar */}
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
          <span className="rounded-full border border-[#B78A2A]/30 bg-[#B78A2A]/8 px-3 py-0.5 text-[11px] font-medium uppercase tracking-widest text-[#B78A2A]">
            Preview
          </span>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-lg px-5 py-10 md:max-w-xl">
        {/* ── Page title ── */}
        <div className="mb-10 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
            App Preview
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            Canopy AI Dashboard
          </h1>
          <p className="mt-2 text-sm text-[#5C584F]">
            A preview of what the Canopy AI experience will look like at launch.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            PHONE FRAME
           ══════════════════════════════════════════════════════ */}
        <div className="relative mx-auto w-full max-w-[380px]">
          {/* Phone bezel */}
          <div className="rounded-[2.5rem] border-[6px] border-[#2A2A26] bg-[#FDFBF7] shadow-2xl shadow-black/10">
            {/* Notch */}
            <div className="mx-auto mt-2 h-[22px] w-[120px] rounded-full bg-[#2A2A26]" />

            {/* Screen area */}
            <div className="px-5 pb-8 pt-5">
              {/* ── App header ── */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B78A2A]">
                    Canopy AI
                  </h2>
                  <p className="mt-0.5 text-lg font-bold tracking-tight">
                    Monstera Albo
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Stable
                </span>
              </div>

              {/* ── Sensor grid ── */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {sensors.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[#E7DECF] bg-white/70 p-3.5"
                  >
                    <div className="flex items-center gap-2 text-[#5C584F]">
                      {s.icon}
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xl font-bold tracking-tight">
                      {s.value}
                    </p>
                    <p
                      className={`mt-1 text-[10px] font-medium ${
                        s.trendDown ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {s.trendDown ? '↓' : '→'} {s.trend}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── Status summary ── */}
              <div className="mt-5 rounded-2xl border border-[#E7DECF] bg-white/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                  Plant Status
                </p>
                <div className="mt-2 space-y-2.5 text-[13px] leading-relaxed text-[#3B3933]">
                  <div className="flex gap-2">
                    <span className="mt-0.5 text-emerald-500">●</span>
                    <p>
                      <span className="font-semibold">Overall:</span> Stable —
                      all readings within healthy range.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-0.5 text-amber-500">●</span>
                    <p>
                      <span className="font-semibold">Trend:</span> Moisture
                      has been gradually decreasing over the last 24 hours.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-0.5 text-[#B78A2A]">●</span>
                    <p>
                      <span className="font-semibold">Action:</span> Water
                      within the next 24 hours to maintain healthy soil
                      conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Trend chart ── */}
              <div className="mt-5 rounded-2xl border border-[#E7DECF] bg-white/70 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                  7-Day Moisture Trend
                </p>
                <div className="mt-3 flex justify-center">
                  <MiniBarChart bars={sensors[0].bars} />
                </div>
              </div>

              {/* ── AI insight card ── */}
              <div className="mt-5 rounded-2xl border border-[#B78A2A]/25 bg-[#B78A2A]/[0.04] p-4">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#B78A2A]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B78A2A]">
                    Canopy AI Insight
                  </p>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#3B3933]">
                  Current humidity is acceptable for your Monstera Albo, but
                  soil moisture is trending downward. Monitor closely and
                  prepare to water soon — ideally before it drops below 35%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            COMING SOON FEATURES (outside phone frame)
           ══════════════════════════════════════════════════════ */}
        <div className="mt-14">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B78A2A]">
            Coming Soon
          </p>
          <h3 className="mt-2 text-center text-lg font-bold tracking-tight">
            Future Capabilities
          </h3>
          <p className="mt-1 text-center text-sm text-[#5C584F]">
            Features on our roadmap, coming in future updates.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {futureFeatures.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-dashed border-[#E7DECF] bg-white/50 p-4"
              >
                <div className="flex items-center gap-2.5 text-[#B78A2A]">
                  {f.icon}
                  <p className="text-sm font-semibold">{f.label}</p>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5C584F]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA back */}
        <div className="mt-14 text-center">
          <Link
            href="/#early-access"
            className="inline-block rounded-full bg-[#B78A2A] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#9D7620]"
          >
            Join Early Access
          </Link>
          <p className="mt-3 text-xs text-[#5C584F]">
            Be the first to experience Canopy AI when we launch.
          </p>
        </div>
      </div>
    </div>
  );
}
