"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/* ------------------------------------------------------------------ */
/* The contact promise, revealed word-by-word: one message in, a real  */
/* plan back. Same kinetic mechanic as /home-3's statement, new copy.   */
/* ------------------------------------------------------------------ */

type Token =
  | { kind: "word"; value: string }
  | { kind: "image"; src: string; alt: string };

const TOKENS: Token[] = [
  { kind: "word", value: "You" },
  { kind: "word", value: "send" },
  { kind: "word", value: "one" },
  { kind: "word", value: "message." },
  { kind: "image", src: "/reels/posters/slrp.jpg", alt: "Slrp Ramen reel" },
  { kind: "word", value: "We" },
  { kind: "word", value: "reply" },
  { kind: "word", value: "within" },
  { kind: "word", value: "a" },
  { kind: "word", value: "day," },
  { kind: "image", src: "/reels/posters/3fils.jpg", alt: "3 Fils reel" },
  { kind: "word", value: "with" },
  { kind: "word", value: "a" },
  { kind: "word", value: "plan," },
  { kind: "word", value: "a" },
  { kind: "word", value: "quote," },
  { kind: "word", value: "and" },
  { kind: "word", value: "a" },
  { kind: "word", value: "month" },
  { kind: "word", value: "of" },
  { kind: "word", value: "ideas" },
  { kind: "image", src: "/reels/posters/brixjourney.jpg", alt: "Brix Journey reel" },
  { kind: "word", value: "worth" },
  { kind: "word", value: "filming." },
];

const INK = "#16110b";
const GHOST = "#cdc2aa";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
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

export function ContactStatement() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative bg-[#faf3e8] px-5 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <motion.div
        className="mx-auto flex max-w-[64rem] flex-col items-center text-center"
        variants={container}
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={reduce ? undefined : eyebrowVariants}
          className="mb-8 flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d0d0d]/45 sm:mb-10"
        >
          <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
          What happens after you hit send
        </motion.p>

        <h2 className="flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.12em] font-[family-name:var(--font-display)] text-[clamp(1.9rem,5.4vw,4.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#16110b]">
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
