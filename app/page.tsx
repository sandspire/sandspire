import type { Metadata } from "next";
import Link from "next/link";

import { Home2Lenis } from "@/components/sandspire/Home2Lenis";
import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { SandspireFooter } from "@/components/sandspire/SandspireFooter";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { Home3Hero } from "@/components/sandspire/home3/Home3Hero";
import { Home3Statement } from "@/components/sandspire/home3/Home3Statement";
import { Home3VideoScroll } from "@/components/sandspire/home3/Home3VideoScroll";
import { Home3Services } from "@/components/sandspire/home3/Home3Services";
import { Home3Faq } from "@/components/sandspire/home3/Home3Faq";

export const metadata: Metadata = {
  title: "Sandspire: Reels, photos & social for UAE brands",
  description:
    "A UAE content studio for restaurants, gyms, salons, hotels and the rest. One shoot day becomes a month of reels and photos. And a feed that turns scrolls into walk-ins, not just likes.",
};

/* ------------------------------------------------------------------ */
/* Content (sourced from the locked brand strategy + BRAND-VOICE.md)  */
/* ------------------------------------------------------------------ */

const TRUST = [
  { name: "3 Fils", logo: "/reels/logos/3fils.png" },
  { name: "Brix Journey", logo: "/reels/logos/brixjourney.png" },
  { name: "Brix Café", logo: "/reels/logos/brixtable.png" },
  { name: "Slrp Ramen", logo: "/reels/logos/slrp.png" },
  { name: "Bordo Mavi", logo: "/reels/logos/bordomavi.png" },
];

const PROCESS = [
  {
    no: "01",
    step: "Plan",
    body: "We get to know your brand and your space, find the bits actually worth filming, then map a month of ideas before anyone picks up a camera.",
  },
  {
    no: "02",
    step: "Shoot",
    body: "One shoot day, on location. Reels, photos and talking-to-camera video, captured while you carry on with the day.",
  },
  {
    no: "03",
    step: "Post",
    body: "We edit, caption, schedule and publish. You approve everything before it goes live. No surprises on your feed.",
  },
  {
    no: "04",
    step: "Report",
    body: "Once a month: what we shot, what it reached, and what it did for the business, in plain numbers, not a dashboard you'll never open.",
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={
        "font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] " +
        (dark ? "text-[#ff7a3d]" : "text-[#ff5e00]")
      }
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <Home2Lenis>
      <div className="home3-root relative w-full overflow-x-clip bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
        {/* Global nav — transparent over the dark hero, dark glass on scroll */}
        <SandspireNavBar ctaHref="/contact" ctaLabel="Start a project" logoLoading="eager" />

        {/* Hero */}
        <Home3Hero />

        {/* STATEMENT — kinetic word-by-word reveal with inline reel chips */}
        <Home3Statement />

        {/* VIDEO SCROLL — cinematic reel backdrop with scrolling scenes */}
        <Home3VideoScroll />

        {/* WHAT WE DO — full-scroll cinematic services reveal (sphere + ring bloom) */}
        <Home3Services />

        {/* TRUST MARQUEE */}
        <section className="relative overflow-hidden border-y border-white/10 bg-[#0d0d0d] py-6 text-[#FAF3E8]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
          <div className="flex items-center gap-4 px-5">
            <span className="shrink-0 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF3E8]/45">
              On the feed for
            </span>
            <div className="home3-marquee-mask flex-1 overflow-hidden">
              <div className="home3-marquee flex w-max items-center gap-12">
                {[...TRUST, ...TRUST, ...TRUST].map((b, i) => (
                  <span key={`${b.name}-${i}`} className="flex items-center gap-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.logo}
                      alt={b.name}
                      className="h-7 w-auto max-w-[140px] object-contain opacity-80"
                    />
                    <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS (dark cinematic) */}
        <section className="relative overflow-hidden bg-[#0d0d0d] text-[#FAF3E8]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(50rem 40rem at 90% 0%, rgba(255,94,0,0.16), transparent 60%), radial-gradient(40rem 40rem at 0% 100%, rgba(194,145,63,0.12), transparent 55%)",
            }}
          />
          <div className="relative mx-auto max-w-[1220px] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="max-w-[40ch]">
              <ScrollReveal>
                <Eyebrow dark>How it works</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.02em]">
                  Plan. Shoot. Post. Report.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-6 font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[#FAF3E8]/65">
                  Four steps, one shoot day, zero guesswork. You always know what&apos;s
                  coming and you approve it before it&apos;s live.
                </p>
              </ScrollReveal>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <ScrollReveal key={p.no} delay={0.06 + i * 0.07} className="h-full">
                  <div className="flex h-full flex-col bg-[#0d0d0d] p-7">
                    <span className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,3rem)] font-medium leading-none text-[#ff5e00]">
                      {p.no}
                    </span>
                    <h3 className="mt-5 font-[family-name:var(--font-display)] text-[22px] font-bold">
                      {p.step}
                    </h3>
                    <p className="mt-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.6] text-[#FAF3E8]/60">
                      {p.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND WORLD — "Make them hungry" */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0a0604] py-28 text-[#FAF3E8]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60rem 50rem at 50% 50%, rgba(255,94,0,0.22), transparent 60%), linear-gradient(180deg, #0d0805, #0a0604)",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1220px] px-5 text-center sm:px-6 lg:px-8">
            <ScrollReveal>
              <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.24em] text-[#ff7a3d]">
                The whole idea, in three words
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="mx-auto mt-8 font-[family-name:var(--font-display)] text-[clamp(3.2rem,15vw,11rem)] font-bold leading-[0.92] tracking-[-0.03em]">
                Make them
                <br />
                <span className="italic text-[#ff5e00]">hungry.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className="mx-auto mt-10 max-w-[52ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.6] text-[#FAF3E8]/65">
                Hungry to try it. Hungry to book it. Hungry to tell a friend. Call
                it craving, call it demand. It&apos;s the only number that matters,
                and it&apos;s what every reel we make is built to create.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* FINAL CTA + FAQ */}
        <section id="contact-cta" className="relative border-t border-[#0d0d0d]/10 bg-[#faf3e8]">
          <div className="mx-auto max-w-[1220px] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
              {/* CTA */}
              <div>
                <ScrollReveal>
                  <Eyebrow>Start here</Eyebrow>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                  <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.0] tracking-[-0.02em]">
                    Show us your brand.
                    <br />
                    Let&apos;s talk about
                    <br />
                    what we&apos;d shoot.
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                  <p className="mt-7 max-w-[44ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.55] text-[#0d0d0d]/70">
                    No pitch deck, no pressure. Tell us what you do and where you
                    are. We&apos;ll come back with a plan and a quote.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/contact"
                      className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#ff5e00] px-8 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_16px_40px_-14px_rgba(255,94,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
                    >
                      Start a project
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="#faf3e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <Link
                      href="/work"
                      className="inline-flex h-[54px] items-center justify-center rounded-full border border-[#0d0d0d]/15 px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#0d0d0d] transition-colors duration-200 hover:border-[#ff5e00] hover:text-[#ff5e00]"
                    >
                      See the work
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* FAQ */}
              <div>
                <ScrollReveal delay={0.1}>
                  <p className="mb-5 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/45">
                    Before you ask
                  </p>
                  <Home3Faq />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER — premium global closing moment */}
        <SandspireFooter />

        {/* Page-scoped animation + reduced-motion handling */}
        <style>{`
          .home3-root .home3-fade-1,
          .home3-root .home3-fade-2,
          .home3-root .home3-fade-3,
          .home3-root .home3-fade-4 {
            opacity: 0;
            transform: translateY(18px);
            animation: home3-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .home3-root .home3-fade-1 { animation-delay: 0.08s; }
          .home3-root .home3-fade-2 { animation-delay: 0.2s; }
          .home3-root .home3-fade-3 { animation-delay: 0.34s; }
          .home3-root .home3-fade-4 { animation-delay: 0.46s; }
          @keyframes home3-rise { to { opacity: 1; transform: translateY(0); } }

          .home3-float { animation: home3-float 7s ease-in-out infinite; }
          @keyframes home3-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
          }

          .home3-scroll-dot { animation: home3-scroll 1.6s ease-in-out infinite; }
          @keyframes home3-scroll {
            0% { opacity: 0; transform: translateY(0); }
            30% { opacity: 1; }
            100% { opacity: 0; transform: translateY(10px); }
          }

          .home3-marquee { animation: home3-marquee 32s linear infinite; }
          @keyframes home3-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }

          .home3-reel-surface {
            background-size: 160% 160%;
            animation: home3-pan 14s ease-in-out infinite;
          }
          @keyframes home3-pan {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          .home3-reel-progress { animation: home3-progress 6s linear infinite; }
          @keyframes home3-progress {
            0% { transform: translateX(-30%); width: 18%; }
            50% { width: 60%; }
            100% { transform: translateX(420%); width: 18%; }
          }

          @media (prefers-reduced-motion: reduce) {
            .home3-root .home3-fade-1,
            .home3-root .home3-fade-2,
            .home3-root .home3-fade-3,
            .home3-root .home3-fade-4 {
              animation: none; opacity: 1; transform: none;
            }
            .home3-float,
            .home3-scroll-dot,
            .home3-marquee,
            .home3-reel-surface,
            .home3-reel-progress {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </Home2Lenis>
  );
}
