"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * AboutManifesto — the "why we exist" beat. A single sentence reveals word by
 * word (light cream-grey → warm ink), with the payoff clause landing in orange.
 * Same kinetic mechanic as /home-3's statement, but text-only for an editorial,
 * About-page feel. Plays once on scroll-in.
 */

type Token = { value: string; accent?: boolean };

const TOKENS: Token[] = [
  { value: "The" },
  { value: "best" },
  { value: "place" },
  { value: "in" },
  { value: "the" },
  { value: "neighbourhood" },
  { value: "shouldn't" },
  { value: "lose" },
  { value: "to" },
  { value: "the" },
  { value: "one" },
  { value: "with" },
  { value: "the" },
  { value: "better" },
  { value: "feed." },
  { value: "So", accent: true },
  { value: "we", accent: true },
  { value: "make", accent: true },
  { value: "sure", accent: true },
  { value: "it", accent: true },
  { value: "doesn't.", accent: true },
];

const INK = "#16110b";
const GHOST = "#cdc2aa";
const ACCENT = "#ff5e00";
const ACCENT_GHOST = "#f0c9a8";

export function AboutManifesto() {
  const reduce = useReducedMotion() ?? false;

  // Variants are built with `reduce` baked into the *timing* only. The `hidden`
  // values are reduce-independent, so the SSR snapshot (initial="hidden") is
  // identical on server and client → no hydration mismatch. whileInView always
  // resolves to "visible", so reduced-motion users see the finished line.
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: reduce ? 0 : 0.04 },
    },
  };
  const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative bg-[#faf3e8] px-6 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
      <motion.div
        className="mx-auto flex max-w-[60rem] flex-col"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.p
          variants={eyebrowVariants}
          className="mb-9 flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d0d0d]/45 sm:mb-12"
        >
          <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
          Why we exist
        </motion.p>

        <h2 className="flex flex-wrap gap-x-[0.28em] gap-y-[0.06em] font-[family-name:var(--font-display)] text-[clamp(1.85rem,5vw,3.9rem)] font-bold leading-[1.14] tracking-[-0.025em]">
          {TOKENS.map((token, i) => (
            <motion.span
              key={`${token.value}-${i}`}
              variants={{
                hidden: { opacity: 0.18, y: 12, color: token.accent ? ACCENT_GHOST : GHOST },
                visible: {
                  opacity: 1,
                  y: 0,
                  color: token.accent ? ACCENT : INK,
                  transition: { duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="inline-block will-change-[transform,opacity]"
            >
              {token.value}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
}
