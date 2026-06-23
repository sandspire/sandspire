"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { EmberField } from "./EmberField";

const MARQUEE = [
  "Reels & short-form",
  "Photography",
  "Social media",
  "UGC & creators",
  "Video editing",
  "Web design",
  "Brand & strategy",
  "SEO",
  "AI automation",
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function ServicesHero() {
  const reduce = useReducedMotion() ?? false;

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0604] text-[#FAF3E8]">
      {/* WebGL ember field (with a CSS gradient underneath as a no-WebGL fallback) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 44rem at 72% 12%, rgba(255,94,0,0.18), transparent 60%), radial-gradient(40rem 40rem at 0% 100%, rgba(247,148,29,0.10), transparent 55%), #0a0604",
        }}
      />
      <EmberField className="absolute inset-0 -z-10 h-full w-full" />
      {/* Legibility scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,4,0.55) 0%, transparent 26%, transparent 58%, rgba(10,6,4,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center px-5 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-[1220px]">
          <motion.p
            {...rise(0.05)}
            className="flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ff7a3d]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
            UAE creative studio · what we do
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="mt-7 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,8.2vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.03em]"
          >
            Everything your brand needs to get{" "}
            <span className="italic text-[#ff5e00]">seen.</span>
          </motion.h1>

          <motion.p
            {...rise(0.22)}
            className="mt-8 max-w-[52ch] font-[family-name:var(--font-body)] text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.6] text-[#FAF3E8]/75"
          >
            Reels, photos and social to fill the feed. Websites, brand and AI to
            back it up. One studio, the whole job, handled.
          </motion.p>

          <motion.div
            {...rise(0.32)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact"
              className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#ff5e00] px-8 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#0a0604] shadow-[0_18px_44px_-14px_rgba(255,94,0,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
            >
              Start a project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#index"
              className="inline-flex h-[54px] items-center justify-center rounded-full border border-[#FAF3E8]/20 px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#FAF3E8] backdrop-blur-sm transition-colors duration-200 hover:border-[#ff5e00] hover:text-[#ff7a3d]"
            >
              See the services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Drifting service marquee */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 py-5">
        <div className="services-hero-marquee flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
          {[...MARQUEE, ...MARQUEE].map((label, i) => (
            <span key={`${label}-${i}`} className="flex items-center gap-8">
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.4vw,1.9rem)] font-medium text-[#FAF3E8]/70">
                {label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-[92px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-[family-name:var(--font-body)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#FAF3E8]/45">
          Scroll
        </span>
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-[#FAF3E8]/25 p-1.5">
          <span className="services-scroll-dot h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
        </span>
      </div>

      <style>{`
        .services-hero-marquee { animation: services-hero-marquee 34s linear infinite; }
        @keyframes services-hero-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .services-scroll-dot { animation: services-scroll 1.7s ease-in-out infinite; }
        @keyframes services-scroll {
          0% { opacity: 0; transform: translateY(0); }
          35% { opacity: 1; }
          100% { opacity: 0; transform: translateY(12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .services-hero-marquee, .services-scroll-dot { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
