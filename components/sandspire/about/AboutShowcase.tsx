import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

/**
 * AboutShowcase — proof that the studio is real and working. A row of live
 * client reels, then a marquee of the disciplines we cover under one roof.
 */

const REELS = [
  { src: "/reels/3fils.mp4", poster: "/reels/posters/3fils.jpg", name: "3 Fils", handle: "@3fils" },
  { src: "/reels/slrp.mp4", poster: "/reels/posters/slrp.jpg", name: "Slrp Ramen", handle: "@slrpramen" },
  { src: "/reels/brixjourney.mp4", poster: "/reels/posters/brixjourney.jpg", name: "Brix Journey", handle: "@brixjourney" },
  { src: "/reels/bordomavi.mp4", poster: "/reels/posters/bordomavi.jpg", name: "Bordo Mavi", handle: "@bordomavi" },
];

const CRAFTS = [
  "Reels & short-form",
  "Brand & product photography",
  "Social media management",
  "UGC",
  "Brand strategy",
  "Web design",
  "SEO",
  "Video editing",
  "AI automation",
];

export function AboutShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0a0604] text-[#FAF3E8]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50rem 40rem at 80% 6%, rgba(255,94,0,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1220px] px-6 pt-24 sm:px-8 lg:px-10 lg:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <ScrollReveal>
              <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]">
                <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
                Under one roof
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                Reels are the start.
                <br />
                We run the whole studio.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <p className="max-w-[46ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.65] text-[#FAF3E8]/65 lg:text-[16px]">
              Most brands come to us for the feed: reels, photos, the day-to-day
              social. Then they hand us the website, the brand, the SEO, and the
              AI that quietly handles the busywork. Same studio, same people, no
              handoffs.
            </p>
          </ScrollReveal>
        </div>

        {/* Live reels */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {REELS.map((reel, i) => (
            <ScrollReveal key={reel.src} delay={0.06 + i * 0.06}>
              <figure className="group relative aspect-[9/16] overflow-hidden rounded-[18px] border border-white/10 bg-white/5">
                <video
                  src={reel.src}
                  poster={reel.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />
                <figcaption className="absolute bottom-3 left-3 right-3">
                  <span className="block font-[family-name:var(--font-display)] text-[13px] font-bold leading-tight">
                    {reel.name}
                  </span>
                  <span className="block font-[family-name:var(--font-body)] text-[11px] text-[#FAF3E8]/70">
                    {reel.handle}
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Capabilities marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-white/10 py-6 lg:mt-28">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0604] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0604] to-transparent" />
        <div className="about-craft-marquee flex w-max items-center gap-8">
          {[...CRAFTS, ...CRAFTS, ...CRAFTS].map((craft, i) => (
            <span key={`${craft}-${i}`} className="flex items-center gap-8">
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.4vw,1.7rem)] font-medium tracking-[-0.01em] text-[#FAF3E8]/85">
                {craft}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .about-craft-marquee { animation: about-craft-marquee 38s linear infinite; }
        @keyframes about-craft-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-craft-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
