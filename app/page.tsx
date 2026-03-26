export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto flex max-w-6xl flex-col px-6 py-20 md:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-yellow-700">
            Verdant Labs
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Predictive intelligence for plant care.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
            Canopy AI helps plant owners detect environmental stress before
            visible damage appears, replacing guesswork with clear,
            data-backed decisions.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#prototype"
              className="rounded-full bg-yellow-600 px-6 py-3 text-center font-medium text-white transition hover:bg-yellow-700"
            >
              View Prototype
            </a>

            <a
              href="#contact"
              className="rounded-full border border-neutral-300 px-6 py-3 text-center font-medium text-neutral-900 transition hover:border-neutral-500"
            >
              Contact Verdant Labs
            </a>
          </div>
        </div>
      </section>
            <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-yellow-700">
            The Problem
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Plant stress starts before the damage is visible.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-xl font-semibold">Guesswork</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Most plant owners rely on watering schedules, intuition, or
                generic internet advice.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-xl font-semibold">Late detection</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                By the time leaves yellow, droop, or curl, stress has often
                already affected the plant.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-xl font-semibold">High value at risk</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Rare and specialty plants can be expensive, making poor care
                decisions much more costly.
              </p>
            </div>
          </div>
        </div>
      </section>
            <section className="px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-yellow-700">
            The Solution
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Canopy AI turns environmental data into clear plant-care decisions.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-yellow-700">
                01
              </p>
              <h3 className="mt-3 text-xl font-semibold">Sense</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Sensors track soil moisture, temperature, humidity, and light
                around the plant.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-yellow-700">
                02
              </p>
              <h3 className="mt-3 text-xl font-semibold">Interpret</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Verdant Labs translates raw environmental readings into
                plant-specific insight and stress detection.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-yellow-700">
                03
              </p>
              <h3 className="mt-3 text-xl font-semibold">Act</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Users get actionable next steps instead of confusing raw data.
              </p>
            </div>
          </div>
        </div>
      </section>
            <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-yellow-700">
            Product Tiers
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Start with environmental intelligence, then expand into visual monitoring.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-2xl font-semibold">Foundation</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Core monitoring for serious plant owners.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                <li>• Soil moisture monitoring</li>
                <li>• Temperature and humidity tracking</li>
                <li>• Light sensing</li>
                <li>• App access and recommendations</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-yellow-300 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Canopy AI</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Adds visual intelligence to the core system.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                <li>• Everything in Foundation</li>
                <li>• Camera add-on module</li>
                <li>• Visual monitoring</li>
                <li>• Richer plant insight over time</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <h3 className="text-2xl font-semibold">Elite</h3>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                Premium intelligence for advanced collectors.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral-700">
                <li>• Everything in Canopy AI</li>
                <li>• Long-term stress analysis</li>
                <li>• Advanced alerts and insights</li>
                <li>• Early access to new features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
            <section id="prototype" className="px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-yellow-700">
            Prototype
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            A working hardware prototype is already in development.
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <p className="text-base leading-8 text-neutral-600">
                Verdant Labs has already developed an early physical prototype
                that demonstrates real-time environmental monitoring. The system
                is being refined into a cleaner, more product-like enclosure
                designed for rare and specialty plant owners.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-yellow-700">
                    Current Focus
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Shell refinement, cleaner internals, improved wiring, and
                    stronger user-facing recommendations.
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-yellow-700">
                    Next Step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    Add visual monitoring through a camera module and expand the
                    intelligence layer over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-yellow-700">
                Placeholder
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Prototype photo / render area
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Later, this section can hold your prototype image, enclosure
                render, or Canopy AI hardware mockup.
              </p>
            </div>
          </div>
        </div>
      </section>
            <section
        id="contact"
        className="border-t border-neutral-200 bg-neutral-50 px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-yellow-700">
            Contact
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Follow Verdant Labs as Canopy AI develops.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Interested in early access, prototype updates, potential involvement in pilot trials, or the future of
            predictive plant care? Reach out and stay connected.
          </p>

          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-yellow-700">
              Early Access
            </p>
            <p className="mt-3 text-base leading-7 text-neutral-700">
              Email: akshath.scholar@gmail.com
            </p>
            <p className="mt-2 text-base leading-7 text-neutral-700">
              Phone: 812-629-6247
            </p>
            <p className="mt-2 text-base leading-7 text-neutral-700">
              Website updates and prototype progress coming soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}