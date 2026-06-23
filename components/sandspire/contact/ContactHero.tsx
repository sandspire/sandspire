"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import { ContactAurora } from "./ContactAurora";

/* The hero headline, revealed one word at a time behind a clip mask. */
const HEAD_LINE_1 = ["Say", "the"];
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const wordRise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease } },
};

/* A playful, on-brand list of ways to reach the studio — drifts along the base. */
const CHANNELS = [
  "WhatsApp",
  "Email",
  "A phone call",
  "A DM",
  "An old-fashioned hello",
  "Carrier pigeon (we'll allow it)",
];

export function ContactHero({ whatsappHref }: { whatsappHref: string }) {
  const reduce = useReducedMotion() ?? false;

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0604] text-[#FAF3E8]">
      {/* CSS gradient fallback (shows if WebGL is unavailable) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55rem 42rem at 50% 78%, rgba(255,94,0,0.20), transparent 60%), radial-gradient(38rem 38rem at 0% 0%, rgba(247,148,29,0.08), transparent 55%), #0a0604",
        }}
      />
      <ContactAurora className="absolute inset-0 -z-10 h-full w-full" />
      {/* Legibility scrim — darkens the top where the nav + headline sit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,6,4,0.72) 0%, rgba(10,6,4,0.25) 24%, transparent 50%, rgba(10,6,4,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center px-5 pt-28 pb-20 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto w-full max-w-[1220px]">
          {/* Availability pill */}
          <motion.div {...fade(0.05)} className="flex">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#FAF3E8]/15 bg-[#FAF3E8]/[0.04] px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="contact-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e00] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5e00]" />
              </span>
              <span className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FAF3E8]/80">
                Booking new projects · Dubai, UAE
              </span>
            </span>
          </motion.div>

          {/* Kinetic headline */}
          <h1 className="mt-8 font-[family-name:var(--font-display)] text-[clamp(3.2rem,12vw,9rem)] font-bold leading-[0.9] tracking-[-0.035em]">
            <motion.span
              className="flex flex-wrap gap-x-[0.22em]"
              variants={reduce ? undefined : container}
              initial={reduce ? false : "hidden"}
              animate="visible"
            >
              {HEAD_LINE_1.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
                  <motion.span variants={reduce ? undefined : wordRise} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={reduce ? undefined : wordRise}
                  className="inline-block italic text-[#ff5e00]"
                >
                  word.
                </motion.span>
              </span>
            </motion.span>
          </h1>

          {/* Subhead */}
          <motion.p
            {...fade(0.55)}
            className="mt-8 max-w-[54ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.6] text-[#FAF3E8]/75"
          >
            Tell us what you do and where you are. We&apos;ll come back with a plan, a
            quote, and a month of ideas worth filming. No pitch deck, no pressure,
            no 14-step funnel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade(0.68)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#start"
              className="group inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-[#ff5e00] px-8 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#0a0604] shadow-[0_18px_44px_-14px_rgba(255,94,0,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
            >
              Start a project
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full border border-[#FAF3E8]/20 px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#FAF3E8] backdrop-blur-sm transition-colors duration-200 hover:border-[#ff5e00] hover:text-[#ff7a3d]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23zm-4.5 4.46c-.21 0-.55.08-.84.39s-1.1 1.08-1.1 2.63 1.13 3.05 1.29 3.26c.16.21 2.21 3.38 5.44 4.61.76.29 1.35.46 1.81.59.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37s-1.88-.93-2.17-1.03c-.29-.11-.5-.16-.71.16s-.82 1.03-1 1.24c-.18.21-.37.24-.69.08s-1.34-.49-2.55-1.57c-.94-.84-1.58-1.88-1.76-2.2s-.02-.49.14-.65c.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53s.05-.4-.03-.56c-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54l-.61-.01z" />
              </svg>
              Message on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>

      {/* Drifting channel marquee */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 py-5">
        <div className="contact-hero-marquee flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
          {[...CHANNELS, ...CHANNELS].map((label, i) => (
            <span key={`${label}-${i}`} className="flex items-center gap-8">
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.05rem,2.2vw,1.7rem)] font-medium text-[#FAF3E8]/65">
                {label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-[96px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-[family-name:var(--font-body)] text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#FAF3E8]/45">
          Scroll
        </span>
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-[#FAF3E8]/25 p-1.5">
          <span className="contact-scroll-dot h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
        </span>
      </div>

      <style>{`
        .contact-hero-marquee { animation: contact-hero-marquee 36s linear infinite; }
        @keyframes contact-hero-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .contact-scroll-dot { animation: contact-scroll 1.7s ease-in-out infinite; }
        @keyframes contact-scroll {
          0% { opacity: 0; transform: translateY(0); }
          35% { opacity: 1; }
          100% { opacity: 0; transform: translateY(12px); }
        }
        .contact-ping { animation: contact-ping 1.9s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes contact-ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-hero-marquee, .contact-scroll-dot, .contact-ping { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
