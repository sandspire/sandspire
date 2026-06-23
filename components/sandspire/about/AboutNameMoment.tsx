"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import SandField from "./SandField";

/**
 * AboutNameMoment — the emotional centre of the page: the meaning of the name,
 * over the live sand field. Giant headline reveals word by word; "spire." lands
 * in orange italic (echoing /home-3's "hungry." treatment).
 */

const LINE_ONE = ["From", "sand,"];
const LINE_TWO = ["a"];

export function AboutNameMoment() {
  const reduce = useReducedMotion() ?? false;

  // Reduce baked into timing only; `hidden` values are reduce-independent so SSR
  // and first client render agree. whileInView always resolves to "visible".
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.05 } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const sectionRef = useRef<HTMLElement>(null);
  // Only mount the second WebGL canvas when this section nears the viewport, so
  // the page never runs two shaders at once (kinder to phones and low-end GPUs).
  const [showField, setShowField] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowField(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-[#0a0604] py-28 text-[#FAF3E8]"
    >
      {showField ? (
        <SandField className="absolute inset-0 -z-20 h-full w-full" intensity={0.9} />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(60rem 44rem at 50% 40%, rgba(255,94,0,0.16), transparent 60%), #0a0604",
          }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 50rem at 50% 50%, rgba(255,94,0,0.10), transparent 62%), linear-gradient(180deg, rgba(10,6,4,0.55), rgba(10,6,4,0.78))",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 text-center sm:px-8 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.24em] text-[#ff7a3d]"
        >
          The name
        </motion.p>

        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto mt-8 font-[family-name:var(--font-display)] text-[clamp(2.8rem,11vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block">
            {LINE_ONE.map((w, i) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}
                {i < LINE_ONE.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {LINE_TWO.map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}&nbsp;
              </motion.span>
            ))}
            <motion.span variants={word} className="inline-block italic text-[#ff5e00]">
              spire.
            </motion.span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-[54ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.6] text-[#FAF3E8]/72"
        >
          Sandspire is what happens when small things stack up with intent. One
          reel, then another. A feed people follow. A room that&apos;s full because
          of it. Grains of sand, and a spire that stands.
        </motion.p>
      </div>
    </section>
  );
}
