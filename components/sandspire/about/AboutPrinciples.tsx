"use client";

import { motion } from "motion/react";

import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

/**
 * AboutPrinciples — "what we believe" as a large editorial list. Each row is a
 * belief + the reason behind it; on hover (desktop) the row warms to orange and
 * nudges right. The reason is always visible on mobile (no hover to rely on).
 */

const PRINCIPLES = [
  {
    no: "01",
    title: "Show the place, not the logo.",
    body: "People follow rooms and faces, not wordmarks. We film what's actually worth seeing.",
  },
  {
    no: "02",
    title: "One shoot day should last a month.",
    body: "We plan hard, so a single day on location becomes weeks of posts.",
  },
  {
    no: "03",
    title: "Numbers over vanity.",
    body: "Likes are nice. We care who walked in because of a reel.",
  },
  {
    no: "04",
    title: "You approve everything.",
    body: "Nothing goes live you haven't seen. No surprises on your feed.",
  },
  {
    no: "05",
    title: "Small studio, senior hands.",
    body: "You get the people who do the work, not an account manager passing notes.",
  },
];

export function AboutPrinciples() {
  return (
    <section className="relative bg-[#faf3e8] text-[#0d0d0d]">
      <div className="mx-auto max-w-[1220px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="max-w-[44ch]">
          <ScrollReveal>
            <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
              <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
              What we believe
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              Five rules we don&apos;t break.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-14 border-t border-[#0d0d0d]/12">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group border-b border-[#0d0d0d]/12"
            >
              <div className="relative grid gap-4 py-7 transition-[padding] duration-300 ease-out group-hover:md:pl-5 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-8 lg:py-9">
                {/* Orange marker that grows on hover (desktop) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[calc(100%-2.5rem)] w-[3px] -translate-y-1/2 origin-center scale-y-0 rounded-full bg-[#ff5e00] transition-transform duration-300 ease-out group-hover:scale-y-100 md:block"
                />
                <span className="font-[family-name:var(--font-display)] text-[14px] font-medium tabular-nums text-[#ff5e00]">
                  {p.no}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#ff5e00]">
                  {p.title}
                </h3>
                <p className="max-w-[42ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#0d0d0d]/65 md:text-[16px]">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
