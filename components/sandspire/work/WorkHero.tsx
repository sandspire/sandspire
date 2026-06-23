"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Masked line reveal — each line sits in an overflow-hidden track and rises in. */
const lineParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};
const lineChild: Variants = {
  hidden: { y: "120%" },
  visible: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};

const META = [
  { k: "Seven", v: "flagship brands" },
  { k: "In-house", v: "shot, cut, posted" },
  { k: "Dubai", v: "United Arab Emirates" },
];

/**
 * WorkHero — a spacious, cinematic opening for the portfolio. Near-black desert
 * base with a warm brand glow + grain, a masked headline reveal, and a gentle
 * scroll parallax that lifts the whole block as you leave. Text-led on purpose:
 * the reels carry the colour further down the page.
 */
export function WorkHero() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const textFade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#080604] pb-16 pt-36 text-[#FAF3E8] sm:pb-20 lg:pb-24 lg:pt-40"
    >
      {/* Warm desert glow */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(58rem 42rem at 22% -8%, rgba(255,94,0,0.18), transparent 58%), radial-gradient(44rem 40rem at 100% 108%, rgba(247,148,29,0.12), transparent 55%), #080604",
          }}
        />
      </motion.div>

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        style={{ y: textY, opacity: textFade }}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10"
      >
        {/* Eyebrow with a quiet "recording" pulse */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#ff7a3d]"
        >
          <span className="relative flex size-1.5">
            <span className="work-rec absolute inline-flex size-full rounded-full bg-[#ff5e00]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#ff5e00]" />
          </span>
          Selected work · 2025—2026
        </motion.p>

        {/* Masked headline */}
        <motion.h1
          variants={reduce ? undefined : lineParent}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          className="mt-7 font-[family-name:var(--font-display)] text-[clamp(2.9rem,9.4vw,7.6rem)] font-bold leading-[0.94] tracking-[-0.035em] [text-wrap:balance]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={reduce ? undefined : lineChild} className="block">
              Reels that earn
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={reduce ? undefined : lineChild} className="block">
              the <span className="italic text-[#ff5e00]">walk-in.</span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="mt-9 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.55, ease: EASE }}
            className="max-w-[48ch] font-[family-name:var(--font-body)] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-[#FAF3E8]/70"
          >
            A working archive of the reels, photos and feeds we make for UAE
            restaurants, cafés and the rooms people line up for. Not a deck —
            the actual work. Press play on any of it.
          </motion.p>

          {/* Meta strip */}
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.68, ease: EASE }}
            className="flex shrink-0 gap-8 sm:gap-10"
          >
            {META.map((m) => (
              <div key={m.k} className="border-l border-white/15 pl-4">
                <dt className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,1.6vw,1.4rem)] font-bold tracking-[-0.01em] text-[#FAF3E8]">
                  {m.k}
                </dt>
                <dd className="mt-1 font-[family-name:var(--font-body)] text-[11.5px] uppercase tracking-[0.14em] text-[#FAF3E8]/45">
                  {m.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1, ease: EASE }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FAF3E8]/40">
          Scroll
        </span>
        <span className="relative flex h-9 w-[18px] justify-center overflow-hidden rounded-full border border-white/25">
          <span className="work-scroll-dot mt-1.5 h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
        </span>
      </motion.div>
    </section>
  );
}
