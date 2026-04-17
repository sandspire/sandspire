import { LogoMarquee } from "@/components/sandspire/LogoMarquee";

const navLinks: { label: string; href: string }[] = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Use Cases", href: "#who" },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-black">
      <div className="relative w-full overflow-hidden">
        <div className="relative isolate h-[93vh] min-h-[680px] overflow-hidden rounded-b-[42px] [transform:translateZ(0)]">
          <div className="absolute inset-0">
            <video
              className="block h-full w-full rounded-b-[42px] object-cover"
              src="/videos/HeroVideo-2%20(1).mp4"
              poster="/images/HeroVideoFallback.png"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/48 to-black/20" />

          <div className="sticky top-0 z-30 h-[50px] bg-gradient-to-b from-[#141414]/65 to-[#0d0d0d]/55 px-5 backdrop-blur-[6px] lg:px-7">
            <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between gap-5">
              <img
                src="/logos/sandspire.svg"
                alt="Sandspire"
                className="h-7 w-auto"
                loading="eager"
              />

              <nav className="hidden items-center justify-center gap-[38px] md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] font-medium capitalize tracking-[0.12px] text-white/90 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href="#contact"
                className="inline-flex h-9 items-center rounded-full bg-[var(--background)] px-5 text-[13px] font-semibold text-[var(--foreground)]"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="mx-auto flex h-full max-w-[1220px] flex-col justify-end px-6 pb-12 lg:px-6 lg:pb-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,740px)_minmax(0,410px)] lg:items-end">
              <div>
                <p className="text-[28px] font-semibold leading-[1] text-white">
                  Hey, we&apos;re a
                </p>

                <h1 className="mt-2 text-[clamp(2.4rem,5.5vw,4.9rem)] font-bold leading-[1.02] text-white">
                  Creative Agency
                </h1>
              </div>

              <div className="space-y-2.5 lg:pb-[64px]">
                <p className="text-[42px] font-bold leading-[1] text-white">
                  We turn sand into gold.
                </p>
                <p className="max-w-[400px] text-[30px] font-medium leading-[1.2] text-white">
                  We create brands, experiences, and workflows that work without
                  friction.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 text-white sm:grid-cols-2 lg:grid-cols-4 lg:gap-[42px]">
              {[
                ["01", "Brand Strategy"],
                ["02", "Brand Identity Design"],
                ["03", "Packaging Design"],
                ["04", "Creative Direction"],
              ].map(([index, label]) => (
                <div key={label} className="space-y-1">
                  <div
                    className="text-[22px] font-bold leading-[1] text-white"
                  >
                    {index}
                  </div>
                  <p className="text-[14px] font-medium tracking-[0.12px] text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-b-[42px] ring-1 ring-white/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-[42px] bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mt-2">
          <LogoMarquee />
        </div>
      </div>
    </header>
  );
}

