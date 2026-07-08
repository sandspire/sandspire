import type { Metadata } from "next";
import Link from "next/link";

import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { SandspireFooter } from "@/components/sandspire/SandspireFooter";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { ServicesHero } from "@/components/sandspire/services/ServicesHero";
import { ServicesStatement } from "@/components/sandspire/services/ServicesStatement";
import { ServiceIndex } from "@/components/sandspire/services/ServiceIndex";
import { ServicesSecondary } from "@/components/sandspire/services/ServicesSecondary";
import { ServicesProcess } from "@/components/sandspire/services/ServicesProcess";
import { ServicesFaq } from "@/components/sandspire/services/ServicesFaq";

export const metadata: Metadata = {
  title: "Services — Sandspire | Reels, photography, social, web & AI",
  description:
    "Everything your brand needs to get seen. Reels, photography, social management, UGC, web design, brand, SEO and AI automation, from one UAE creative studio. One team, one invoice.",
};

const WAYS = [
  {
    label: "One-off shoot",
    body: "A single day of content when you need a burst: a launch, a menu refresh, a campaign.",
  },
  {
    label: "Monthly content",
    body: "A steady stream of reels and photos every month, edited and ready to post.",
  },
  {
    label: "Full management",
    body: "Hand over the whole feed. We plan, shoot, post and report, end to end.",
  },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={
        "flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] " +
        (dark ? "text-[#ff7a3d]" : "text-[#ff5e00]")
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
      {children}
    </p>
  );
}

export default function ServicesPage() {
  return (
    <div className="services-root relative w-full overflow-x-clip bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
      {/* Global nav — transparent over the dark hero, dark glass on scroll */}
      <SandspireNavBar ctaHref="/contact" ctaLabel="Start a project" logoLoading="eager" />

      {/* Hero */}
      <ServicesHero />

      {/* THESIS — kinetic word reveal */}
      <ServicesStatement />

      {/* CONTENT STUDIO — interactive reveal index */}
      <ServiceIndex />

      {/* BUILD & AUTOMATION — secondary services */}
      <ServicesSecondary />

      {/* PROCESS — horizontally pinned scroll */}
      <ServicesProcess />

      {/* WAYS TO WORK */}
      <section className="relative bg-[#faf3e8] py-24 text-[#0d0d0d] lg:py-32">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-[44ch]">
            <ScrollReveal>
              <Eyebrow>Ways to work with us</Eyebrow>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.0] tracking-[-0.03em]">
                As much, or as little, as you need.
              </h2>
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[22px] border border-[#0d0d0d]/12 bg-[#0d0d0d]/10 sm:grid-cols-3">
            {WAYS.map((w, i) => (
              <ScrollReveal key={w.label} delay={0.06 + i * 0.07} className="h-full">
                <div className="flex h-full flex-col bg-[#faf3e8] p-8 transition-colors duration-300 hover:bg-white/70">
                  <span className="font-[family-name:var(--font-display)] text-[13px] font-medium tabular-nums text-[#ff5e00]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-[-0.01em]">
                    {w.label}
                  </h3>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[14.5px] leading-[1.6] text-[#0d0d0d]/65">
                    {w.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND MOMENT */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#0a0604] py-28 text-[#FAF3E8]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 50rem at 50% 50%, rgba(255,94,0,0.2), transparent 60%), linear-gradient(180deg, #0d0805, #0a0604)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1220px] px-5 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.24em] text-[#ff7a3d]">
              Why it all points the same way
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="mx-auto mt-8 font-[family-name:var(--font-display)] text-[clamp(3rem,13vw,9.5rem)] font-bold leading-[0.92] tracking-[-0.03em]">
              Get seen.
              <br />
              Get <span className="italic text-[#ff5e00]">visited.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="mx-auto mt-10 max-w-[54ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.6] text-[#FAF3E8]/65">
              Every reel, every page, every automation points at the same thing:
              more of the right people walking through your door. That&apos;s the
              only number we&apos;re chasing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA + FAQ */}
      <section id="contact-cta" className="relative border-t border-[#0d0d0d]/10 bg-[#faf3e8]">
        <div className="mx-auto max-w-[1220px] px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <ScrollReveal>
                <Eyebrow>Start here</Eyebrow>
              </ScrollReveal>
              <ScrollReveal delay={0.05}>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.0] tracking-[-0.02em]">
                  Tell us what
                  <br />
                  you&apos;re building.
                  <br />
                  We&apos;ll map the mix.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="mt-7 max-w-[44ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.55] text-[#0d0d0d]/70">
                  No pitch deck, no pressure. Tell us what you do and where you
                  are. We&apos;ll come back with a plan and a quote, just the
                  services you actually need.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

            <div>
              <ScrollReveal delay={0.1}>
                <p className="mb-5 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0d0d0d]/45">
                  Before you ask
                </p>
                <ServicesFaq />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — premium global closing moment */}
      <SandspireFooter
        headline={["Reels to AI —", "all handled."]}
        blurb="A UAE creative studio for the brands people actually follow. Reels, photos, social, websites and AI, from one team."
      />
    </div>
  );
}
