"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

/**
 * AboutStats — the studio's operating model in a few honest numbers (no vanity
 * metrics, per BRAND-VOICE). Each figure counts up once when it scrolls in.
 */

type Stat = {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
};

const STATS: Stat[] = [
  { to: 5, label: "flagship brands", sub: "people already follow: 3 Fils, Brix, Slrp, Bordo Mavi, Kanji." },
  { to: 1, label: "shoot day", sub: "on location turns into a full month of reels and photos." },
  { to: 9, label: "crafts in-house", sub: "web, brand, social, UGC, SEO, photo, video, and AI." },
  { to: 100, suffix: "%", label: "you sign off", sub: "nothing goes live on your feed before you've seen it." },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion() ?? false;
  // Always start at 0 so SSR and first client render agree (no hydration
  // mismatch). The effect resolves the final value — instantly when reduced.
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion still resolves the final value, just instantly (t jumps to 1).
    if (!reduce && !inView) return;
    let raf = 0;
    let start = 0;
    const duration = reduce ? 0 : 1500;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutCubic(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export function AboutStats() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] text-[#FAF3E8]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(46rem 38rem at 8% 0%, rgba(255,94,0,0.14), transparent 60%), radial-gradient(40rem 40rem at 100% 100%, rgba(194,145,63,0.10), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-[1220px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="max-w-[44ch]">
          <ScrollReveal>
            <p className="font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]">
              How we&apos;re built
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              A whole studio, in a few honest numbers.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col bg-[#0d0d0d] p-7"
            >
              <span className="font-[family-name:var(--font-display)] text-[clamp(3rem,5vw,4.2rem)] font-bold leading-none tracking-[-0.03em] text-[#ff5e00]">
                <Counter to={s.to} suffix={s.suffix} prefix={s.prefix} />
              </span>
              <span className="mt-4 font-[family-name:var(--font-display)] text-[17px] font-bold tracking-[-0.01em] text-[#FAF3E8]">
                {s.label}
              </span>
              <span className="mt-2 font-[family-name:var(--font-body)] text-[13.5px] leading-[1.55] text-[#FAF3E8]/55">
                {s.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
