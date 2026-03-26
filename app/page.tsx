export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] text-[#1F1F1B]">
      <header className="sticky top-0 z-50 border-b border-[#E7DECF] bg-[#F7F3EC]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7A14A] bg-white text-sm font-semibold text-[#B78A2A]">
              VL
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#B78A2A]">
                Verdant Labs
              </p>
              <p className="text-sm text-[#5C584F]">Botanical Intelligence</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#3B3933] md:flex">
            <a href="#problem" className="transition hover:text-[#B78A2A]">
              Problem
            </a>
            <a href="#solution" className="transition hover:text-[#B78A2A]">
              Solution
            </a>
            <a href="#tiers" className="transition hover:text-[#B78A2A]">
              Product
            </a>
            <a href="#prototype" className="transition hover:text-[#B78A2A]">
              Prototype
            </a>
            <a href="#contact" className="transition hover:text-[#B78A2A]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="px-6 pb-20 pt-12 md:px-10 lg:px-12 lg:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-[#B78A2A]">
              Predictive plant care
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Protect your plants before stress becomes visible.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A564E] md:text-xl">
              Verdant Labs builds Canopy AI, a botanical intelligence system
              that helps plant owners detect environmental stress early and act
              with confidence.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#prototype"
                className="rounded-full bg-[#B78A2A] px-6 py-3 text-center font-medium text-white transition hover:bg-[#9D7620]"
              >
                View Prototype
              </a>

              <a
                href="#contact"
                className="rounded-full border border-[#CFC3AE] bg-white px-6 py-3 text-center font-medium text-[#1F1F1B] transition hover:border-[#B78A2A]"
              >
                Contact Verdant Labs
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Core Signals
                </p>
                <p className="mt-2 text-sm text-[#4F4B44]">
                  Moisture, light, temperature, humidity
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Outcome
                </p>
                <p className="mt-2 text-sm text-[#4F4B44]">
                  Clear recommendations, not raw data
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5DBCC] bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B78A2A]">
                  Vision
                </p>
                <p className="mt-2 text-sm text-[#4F4B44]">
                  A smarter future for plant ownership
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-[#E9DFC9] blur-3xl" />
            <div className="absolute -bottom-6 right-0 h-40 w-40 rounded-full bg-[#DDE6D8] blur-3xl" />

            <div className="relative rounded-[2rem] border border-[#E5DBCC] bg-white p-5 shadow-[0_20px_70px_rgba(60,48,25,0.08)]">
              <div className="rounded-[1.6rem] bg-gradient-to-br from-[#FCFBF8] to-[#EFE7D9] p-5">
                <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.5rem] border border-dashed border-[#D8CAB1] bg-[#F8F4EC] p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                      Hero Image Placeholder
                    </p>
                    <div className="mt-4 flex h-72 items-center justify-center rounded-[1.25rem] bg-white text-center text-sm leading-6 text-[#7A7468]">
                      Add a premium plant image,
                      <br />
                      product render,
                      <br />
                      or Canopy AI mockup here.
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                        Canopy AI
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">
                        Environmental stress, interpreted.
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#5C584F]">
                        A hardware + software system designed to help plant
                        owners act before visible decline appears.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Product Visual
                        </p>
                        <div className="mt-3 flex h-28 items-center justify-center rounded-2xl bg-[#F7F3EC] text-center text-xs text-[#7A7468]">
                          Shell / enclosure
                          <br />
                          render placeholder
                        </div>
                      </div>

                      <div className="rounded-[1.5rem] border border-[#E5DBCC] bg-white p-5">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                          Botanical Brand
                        </p>
                        <div className="mt-3 flex h-28 items-center justify-center rounded-2xl bg-[#F7F3EC] text-center text-xs text-[#7A7468]">
                          Plant lifestyle
                          <br />
                          image placeholder
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="problem"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
            The Problem
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Plant stress starts before the damage is visible.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7">
              <h3 className="text-xl font-semibold">Guesswork</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Most plant owners rely on schedules, intuition, and generic care
                advice that is not personalized to the plant.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7">
              <h3 className="text-xl font-semibold">Late detection</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                By the time leaves curl, yellow, or droop, the plant may already
                be under significant environmental stress.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7">
              <h3 className="text-xl font-semibold">High-value risk</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Rare and specialty plants can be expensive, making poor care
                decisions much more costly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solution"
        className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
            The Solution
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Canopy AI turns environmental data into clear plant-care decisions.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                01
              </p>
              <h3 className="mt-3 text-xl font-semibold">Sense</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Sensors monitor soil moisture, temperature, humidity, and light
                around the plant in real time.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                02
              </p>
              <h3 className="mt-3 text-xl font-semibold">Interpret</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Verdant Labs translates those signals into plant-specific stress
                insight instead of overwhelming users with raw numbers.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E5DBCC] bg-white p-7 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                03
              </p>
              <h3 className="mt-3 text-xl font-semibold">Act</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Users receive actionable next steps that make plant care more
                precise, proactive, and confident.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tiers"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
            Product Tiers
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Start with environmental intelligence, then expand into visual monitoring.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7">
              <h3 className="text-2xl font-semibold">Foundation</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Core environmental monitoring for serious plant owners.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                <li>• Soil moisture monitoring</li>
                <li>• Temperature and humidity tracking</li>
                <li>• Light sensing</li>
                <li>• App access and recommendations</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-[#CFA74F] bg-white p-7 shadow-[0_18px_50px_rgba(120,92,28,0.08)]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#B78A2A]">
                Featured
              </p>
              <h3 className="mt-3 text-2xl font-semibold">Canopy AI</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Adds visual intelligence to the core system.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                <li>• Everything in Foundation</li>
                <li>• Camera add-on module</li>
                <li>• Visual monitoring</li>
                <li>• Richer plant insight over time</li>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-[#E2D6C2] bg-white p-7">
              <h3 className="text-2xl font-semibold">Elite</h3>
              <p className="mt-3 text-base leading-7 text-[#5A564E]">
                Premium intelligence for advanced collectors.
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4F4B44]">
                <li>• Everything in Canopy AI</li>
                <li>• Long-term stress analysis</li>
                <li>• Advanced alerts and insights</li>
                <li>• Early access to new features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="prototype"
        className="bg-[#F7F3EC] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
            Prototype
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            A working hardware prototype is already in development.
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
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

            <div className="rounded-[1.9rem] border border-dashed border-[#D9CDBA] bg-[#F3EDE2] p-8">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
                Prototype Visual
              </p>
              <div className="mt-4 flex h-80 items-center justify-center rounded-[1.4rem] bg-white text-center text-sm leading-7 text-[#7A7468]">
                Add your real prototype photo,
                <br />
                shell render,
                <br />
                or Canopy AI device image here.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[#E7DECF] bg-[#F3EDE2] px-6 py-20 md:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-[#B78A2A]">
            Contact
          </p>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Follow Verdant Labs as Canopy AI develops.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5A564E]">
            Interested in early access, prototype updates, or the future of
            predictive plant care? Reach out and stay connected.
          </p>

          <div className="mt-10 rounded-[1.9rem] border border-[#E2D6C2] bg-white p-8">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#B78A2A]">
              Early Access
            </p>
            <p className="mt-3 text-base leading-7 text-[#4F4B44]">
              Email: akshathsaravanan@gmail.com
            </p>
            <p className="mt-2 text-base leading-7 text-[#4F4B44]">
              Phone: 812-431-5458
            </p>
            <p className="mt-2 text-base leading-7 text-[#4F4B44]">
              Prototype progress, design updates, and product development coming
              soon.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}