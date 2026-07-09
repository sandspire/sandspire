"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Magnetic } from "@/components/sandspire/Magnetic";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { BRAND_LOGO_SRC } from "@/lib/brandAssets";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

type FooterLinkItem = { label: string; href: string };

export type SandspireFooterProps = {
  navLinks?: FooterLinkItem[];
  /** Accepted for API compatibility; the footer no longer renders a Follow column. */
  socialLinks?: FooterLinkItem[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Two-line brand statement that opens the footer. */
  headline?: [string, string];
  /** Short paragraph under the logo. */
  blurb?: string;
  location?: string;
  credit?: string;
  logoSrc?: string;
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section label: a small orange dot + tracked, upper-case eyebrow. */
function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff7a3d]">
      <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
      {children}
    </p>
  );
}

/** Wayfinding link with a growing rule + masked colour roll on hover. */
function RollLink({ label, href }: FooterLinkItem) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 py-1.5 outline-none focus-visible:text-[#FAF3E8]"
    >
      <span className="h-px w-4 origin-left bg-[#ff5e00]/0 transition-all duration-300 ease-out group-hover:w-7 group-hover:bg-[#ff5e00]" />
      <span className="relative block overflow-hidden">
        <span className="block font-[family-name:var(--font-body)] text-[15px] text-[#FAF3E8]/70 transition-transform duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full motion-reduce:transition-none">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full font-[family-name:var(--font-body)] text-[15px] text-[#FAF3E8] transition-transform duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 motion-reduce:transition-none"
        >
          {label}
        </span>
      </span>
    </Link>
  );
}

/** Live Dubai (GST) clock — renders a placeholder until mounted to stay SSR-safe. */
function DubaiClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Dubai",
          }).format(new Date()),
        );
      } catch {
        setTime(null);
      }
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" aria-label={time ? `Local time in Dubai ${time}` : undefined}>
      {time ?? "––:––"} GST
    </span>
  );
}

export function SandspireFooter({
  navLinks = siteContentDefaults.nav.links,
  ctaLabel = "Start a project",
  ctaHref = "/contact",
  secondaryLabel = "See the work",
  secondaryHref = "/work",
  headline = ["Reels, photos and a feed", "worth following."],
  blurb = "A UAE content studio for the brands people actually follow. One shoot day becomes a month of reels, photos and a feed that turns scrolls into walk-ins.",
  location = "Dubai · United Arab Emirates",
  credit = "© Sandspire · Design by Jabrni",
  logoSrc = BRAND_LOGO_SRC,
}: SandspireFooterProps) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  // Wordmark parallax — drifts up gently as the footer enters the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -16]);

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0a0604] text-[#FAF3E8]"
    >
      {/* Atmosphere: warm desert-night glow + grain + a horizon hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58rem 40rem at 82% -12%, rgba(255,94,0,0.15), transparent 60%), radial-gradient(40rem 38rem at -6% 112%, rgba(194,145,63,0.10), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        {/* CTA / brand statement */}
        <ScrollReveal className="flex flex-col gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
          <div className="max-w-[20ch]">
            <ColHeader>The last word</ColHeader>
            <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.95rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              {headline[0]}
              <br />
              <span className="text-[#FAF3E8]/55">{headline[1]}</span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Magnetic>
              <Link
                href={ctaHref}
                className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-[#ff5e00] px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_16px_40px_-14px_rgba(255,94,0,0.75)] transition-colors duration-200 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
              >
                {ctaLabel}
                <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link
              href={secondaryHref}
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#FAF3E8]/55 transition-colors duration-200 hover:text-[#FAF3E8]"
            >
              {secondaryLabel}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Wayfinding */}
        <ScrollReveal
          delay={0.05}
          className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-12 lg:gap-8"
        >
          {/* Brand mark + blurb */}
          <div className="col-span-2 lg:col-span-4">
            <img src={logoSrc} alt="Sandspire" className="h-7 w-auto" loading="lazy" decoding="async" />
            <p className="mt-5 max-w-[34ch] font-[family-name:var(--font-body)] text-[14.5px] leading-[1.6] text-[#FAF3E8]/55">
              {blurb}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <ColHeader>Explore</ColHeader>
            <ul className="mt-4 flex flex-col items-start">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <RollLink {...l} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <div className="col-span-2 lg:col-span-3">
            <ColHeader>Studio</ColHeader>
            <p className="mt-4 font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[#FAF3E8]/70">
              {location}
            </p>
            <p className="mt-3 font-[family-name:var(--font-body)] text-[12.5px] uppercase tracking-[0.14em] text-[#FAF3E8]/45">
              <DubaiClock />
            </p>
          </div>
        </ScrollReveal>

        {/* Meta */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-body)] text-[12.5px] text-[#FAF3E8]/45">
            © {year} Sandspire · <span className="text-[#ff7a3d]/80">Make them hungry.</span>
          </p>
          <p className="font-[family-name:var(--font-body)] text-[12.5px] text-[#FAF3E8]/40">{credit}</p>
        </div>
      </div>

      {/* Giant wordmark — the closing flourish, bleeding off the bottom edge */}
      <div className="relative z-0 mt-2 select-none">
        {/* faint vertical "spire" of light behind the mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 h-[78%] w-px -translate-x-1/2 bg-gradient-to-t from-[#ff5e00]/35 to-transparent"
        />
        <motion.span
          aria-hidden
          style={{
            y: wordY,
            backgroundImage:
              "linear-gradient(180deg, #FAF3E8 22%, rgba(250,243,232,0.06) 94%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          className="block whitespace-nowrap pb-[0.06em] text-center font-[family-name:var(--font-display)] text-[clamp(4rem,19vw,15.5rem)] font-bold leading-[0.82] tracking-[-0.04em]"
        >
          Sandspire
        </motion.span>
      </div>
    </footer>
  );
}
