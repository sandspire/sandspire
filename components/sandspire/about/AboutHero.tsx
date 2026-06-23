"use client";

import { motion, useReducedMotion } from "motion/react";

import SandField from "./SandField";

/**
 * AboutHero — full-height near-black stage with the WebGL sand-field behind a
 * bottom-anchored statement. Mirrors the /home-3 hero's composition (eyebrow +
 * big headline left, one-line description right) so /about reads as a sibling.
 */
export function AboutHero() {
  const reduce = useReducedMotion() ?? false;
  // Keep initial/animate static (identical on server + client → no hydration
  // mismatch) and gate ONLY the transition timing. animate is always present, so
  // reduced-motion users still resolve to the visible state (instantly).
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#070504] pb-16 pt-28 text-[#FAF3E8] lg:pb-20">
      {/* WebGL sand field */}
      <SandField className="absolute inset-0 -z-20 h-full w-full" />

      {/* Contrast wash: keeps the type readable over the live shader */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,5,4,0.55) 0%, rgba(7,5,4,0.15) 32%, rgba(7,5,4,0.35) 64%, rgba(7,5,4,0.92) 100%)",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top eyebrow */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10">
        <motion.p
          {...rise(0.15)}
          className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff7a3d]"
        >
          <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
          About Sandspire · Dubai, UAE
        </motion.p>
      </div>

      {/* Spacer pushes the statement to the lower third */}
      <div className="flex-1" />

      {/* Bottom statement */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-7 px-6 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <motion.h1
          {...rise(0.28)}
          className="max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.96] tracking-[-0.03em]"
        >
          The studio
          <br />
          behind the feed.
        </motion.h1>

        <motion.p
          {...rise(0.42)}
          className="max-w-[40ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#FAF3E8]/75 md:max-w-[32ch] md:text-right"
        >
          Sandspire is a small content studio in Dubai. We make the reels, photos
          and social for the brands people check before they show up, and we make
          them look like the real thing.
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduce ? { duration: 0 } : { delay: 1, duration: 0.8 }}
        className="relative z-10 mx-auto mt-12 flex w-full max-w-[1280px] items-center gap-3 px-6 sm:px-8 lg:px-10"
      >
        <span className="font-[family-name:var(--font-body)] text-[10.5px] font-semibold uppercase tracking-[0.24em] text-[#FAF3E8]/45">
          Scroll
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-[#FAF3E8]/15">
          <span className="about-scroll-bead absolute left-0 top-0 h-3 w-px bg-[#ff5e00]" />
        </span>
      </motion.div>

      <style>{`
        .about-scroll-bead { animation: about-bead 1.8s ease-in-out infinite; }
        @keyframes about-bead {
          0% { transform: translateY(-12px); opacity: 0; }
          35% { opacity: 1; }
          100% { transform: translateY(36px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scroll-bead { animation: none; }
        }
      `}</style>
    </section>
  );
}
