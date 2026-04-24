import { LogoMarquee } from "@/components/sandspire/LogoMarquee";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";

const heroServices: { num: string; label: string }[] = [
  { num: "#01", label: "Brand Strategy" },
  { num: "#02", label: "Web Design" },
  { num: "#03", label: "Social Media" },
  { num: "#04", label: "AI Automation" },
];

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-black">
      <div className="relative w-full overflow-hidden">
        <div className="relative isolate h-[93vh] min-h-[680px] overflow-hidden rounded-b-[42px] [transform:translateZ(0)]">
          <div className="absolute inset-0 z-0">
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
          <div className="absolute bottom-0 right-0 z-[1] h-full w-full bg-gradient-to-b from-black/72 via-black/48 to-black/20" />

          <SiteNavBar
            className="sticky top-0 z-30 h-[50px] bg-gradient-to-b from-[#141414]/65 to-[#0d0d0d]/55 px-5 backdrop-blur-[6px] lg:px-7"
            ctaHref="/contact"
            logoLoading="eager"
          />

          {/* Figma 153:558 structure — copy aligned to Sandspire (z-10 so overlays below don’t cover type) */}
          <div className="relative z-10 mx-auto flex h-full max-w-[1220px] flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-12 lg:px-6 lg:pb-16">
            <ScrollReveal className="w-full" y={24} delay={0.04}>
              <div className="flex w-full flex-col gap-14 lg:gap-[5rem]">
              <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:gap-5">
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <p className="font-[family-name:var(--font-body)] text-[clamp(1rem,2vw,1.65rem)] font-medium leading-[1.15] text-white">
                    Hey, we&apos;re a
                  </p>
                  <h1 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(2.35rem,9vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white">
                    Creative Studio
                  </h1>
                </div>

                <div className="flex w-full min-w-0 max-w-[498px] flex-col gap-4 pt-1 lg:pt-2.5">
                  <div className="font-[family-name:var(--font-body)] text-[clamp(1rem,1.85vw,1.6rem)] font-semibold leading-[1.2] text-white">
                    <p className="mb-0">Great brands should feel</p>
                    <p>effortless.</p>
                  </div>
                  <p className="font-[family-name:var(--font-body)] text-[14px] font-normal leading-[1.7] text-white/95 md:text-[15px]">
                    From strategy to launch, we create brands, experiences, and workflows that work
                    without friction—so your customers never have to fight the experience.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-wrap items-start justify-between gap-x-6 gap-y-8 text-white">
                {heroServices.map(({ num, label }) => (
                  <div key={label} className="flex min-w-[140px] flex-col gap-1.5">
                    <p className="font-[family-name:var(--font-body)] text-sm font-semibold leading-tight">
                      {num}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-sm font-normal leading-snug">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>
          <div className="pointer-events-none absolute inset-0 z-[2] rounded-b-[42px] ring-1 ring-white/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 rounded-b-[42px] bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <ScrollReveal className="mt-2 w-full" y={18} delay={0.08}>
          <LogoMarquee />
        </ScrollReveal>
      </div>
    </header>
  );
}
