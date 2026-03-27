import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-[#E7DECF] bg-[#F7F3EC] px-6 py-12 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
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

          <p className="text-sm text-[#5C584F]">
            &copy; 2026 Verdant Labs. Building the future of plant care.
          </p>
        </div>
      </div>
    </footer>
  );
}
