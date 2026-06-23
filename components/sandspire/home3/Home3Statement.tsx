"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/* ------------------------------------------------------------------ */
/* A kinetic statement headline: the sentence reveals word-by-word,    */
/* light-grey → near-black, while real client reels "pop" inline at    */
/* three points in the line. Same mechanic as the reference video,     */
/* rewritten in Sandspire's voice. Swap the copy/images in TOKENS.     */
/* ------------------------------------------------------------------ */

type Token =
  | { kind: "word"; value: string }
  | { kind: "image"; src: string; alt: string };

const TOKENS: Token[] = [
  { kind: "word", value: "We" },
  { kind: "word", value: "turn" },
  { kind: "word", value: "one" },
  { kind: "word", value: "shoot" },
  { kind: "word", value: "day" },
  { kind: "image", src: "/reels/posters/3fils.jpg", alt: "3 Fils reel" },
  { kind: "word", value: "into" },
  { kind: "word", value: "a" },
  { kind: "word", value: "month" },
  { kind: "word", value: "of" },
  { kind: "word", value: "reels" },
  { kind: "image", src: "/reels/posters/slrp.jpg", alt: "Slrp Ramen reel" },
  { kind: "word", value: "that" },
  { kind: "word", value: "get" },
  { kind: "word", value: "people" },
  { kind: "word", value: "off" },
  { kind: "word", value: "the" },
  { kind: "word", value: "app" },
  { kind: "image", src: "/reels/posters/brixjourney.jpg", alt: "Brix Journey reel" },
  { kind: "word", value: "and" },
  { kind: "word", value: "through" },
  { kind: "word", value: "the" },
  { kind: "word", value: "door." },
];

/* Warm ink + a muted cream-grey "ghost" so unrevealed words sit quietly
   on the page's cream before each one snaps to full contrast. */
const INK = "#16110b";
const GHOST = "#cdc2aa";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0.18, y: 12, color: GHOST },
  visible: {
    opacity: 1,
    y: 0,
    color: INK,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Spring gives the chips a little overshoot as they land. */
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.35, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 360, damping: 17, mass: 0.7 },
  },
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Home3Statement() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative bg-[#faf3e8] px-5 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <motion.div
        className="mx-auto flex max-w-[64rem] flex-col items-center text-center"
        variants={container}
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={reduce ? undefined : eyebrowVariants}
          className="mb-8 flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d0d0d]/45 sm:mb-10"
        >
          <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
          What one shoot day buys
        </motion.p>

        {/* Kinetic statement */}
        <h2 className="flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.12em] font-[family-name:var(--font-display)] text-[clamp(2rem,5.6vw,4.6rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#16110b]">
          {TOKENS.map((token, i) =>
            token.kind === "word" ? (
              <motion.span
                key={`w-${i}`}
                variants={wordVariants}
                className="inline-block will-change-[transform,opacity]"
              >
                {token.value}
              </motion.span>
            ) : (
              <motion.span
                key={`i-${i}`}
                variants={imageVariants}
                className="inline-flex h-[0.92em] w-[1.08em] shrink-0 items-center overflow-hidden rounded-[0.26em] align-middle shadow-[0_6px_18px_-6px_rgba(22,17,11,0.45)] ring-1 ring-black/5 will-change-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={token.src}
                  alt={token.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.span>
            ),
          )}
        </h2>
      </motion.div>
    </section>
  );
}
