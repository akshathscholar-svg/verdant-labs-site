import Image from 'next/image';

const footerNav = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#tiers', label: 'Product' },
  { href: '#prototype', label: 'Prototype' },
  { href: '#early-access', label: 'Early Access' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E7DECF] bg-[#F7F3EC] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-icon.png"
                alt="Verdant Labs footer logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#B78A2A]">
                  Verdant Labs
                </p>
                <p className="text-xs text-[#5C584F]">Botanical Intelligence</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#7A756C]">
              Building a smarter, more proactive future for plant ownership
              through predictive intelligence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5C584F] transition hover:text-[#B78A2A]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B78A2A]">
              Get in Touch
            </p>
            <div className="mt-4 space-y-3">
              <a
                href="mailto:akshath.scholar@gmail.com"
                className="block text-sm text-[#5C584F] transition hover:text-[#B78A2A]"
              >
                akshath.scholar@gmail.com
              </a>
              <p className="text-sm text-[#7A756C]">
                We&apos;d love to hear from plant enthusiasts, collectors, and
                potential partners.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E7DECF] pt-8 text-center">
          <p className="text-sm text-[#8A857C]">
            &copy; 2026 Verdant Labs. Building the future of plant care.
          </p>
        </div>
      </div>
    </footer>
  );
}
