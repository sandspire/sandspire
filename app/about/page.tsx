import type { Metadata } from "next";
import Link from "next/link";

import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { SandspireFooter } from "@/components/sandspire/SandspireFooter";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { AboutHero } from "@/components/sandspire/about/AboutHero";
import { AboutManifesto } from "@/components/sandspire/about/AboutManifesto";
import { AboutStats } from "@/components/sandspire/about/AboutStats";
import { AboutPrinciples } from "@/components/sandspire/about/AboutPrinciples";
import { AboutShowcase } from "@/components/sandspire/about/AboutShowcase";
import { AboutNameMoment } from "@/components/sandspire/about/AboutNameMoment";

export const metadata: Metadata = {
  title: "About Sandspire: the studio behind the feed",
  description:
    "Sandspire is a small content studio in Dubai. We make the reels, photos and social for the brands people check before they show up, plus the website, brand and AI behind them.",
};

export default function AboutPage() {
  return (
    <div className="about-root relative w-full overflow-x-clip bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
      {/* Global nav — transparent over the dark hero, dark glass on scroll */}
      <SandspireNavBar ctaHref="/contact" ctaLabel="Start a project" logoLoading="eager" />

      {/* Hero */}
      <AboutHero />

      {/* WHY — kinetic manifesto */}
      <AboutManifesto />

      {/* HOW WE'RE BUILT — count-up stats */}
      <AboutStats />

      {/* WHAT WE BELIEVE — interactive principles */}
      <AboutPrinciples />

      {/* THE WORK — live reels + capabilities marquee */}
      <AboutShowcase />

      {/* THE NAME — brand moment over the live sand field */}
      <AboutNameMoment />

      {/* FINAL CTA */}
      <section id="contact-cta" className="relative border-t border-[#0d0d0d]/10 bg-[#faf3e8]">
        <div className="mx-auto max-w-[1220px] px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <ScrollReveal>
                <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
                  <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
                  Work with us
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
                  Let&apos;s make your feed
                  <br />
                  worth the visit.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-7 max-w-[46ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.55] text-[#0d0d0d]/70">
                  Tell us what you do and where you are. We&apos;ll come back with a
                  plan and a quote. No pitch deck, no pressure.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.12}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-[#ff5e00] px-8 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_16px_40px_-14px_rgba(255,94,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
                >
                  Start a project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#faf3e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/work"
                  className="inline-flex h-[54px] items-center justify-center rounded-full border border-[#0d0d0d]/15 px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#0d0d0d] transition-colors duration-200 hover:border-[#ff5e00] hover:text-[#ff5e00]"
                >
                  See the work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FOOTER — premium global closing moment */}
      <SandspireFooter />
    </div>
  );
}
