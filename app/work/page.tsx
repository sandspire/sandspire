import type { Metadata } from "next";
import Link from "next/link";

import { SandspireNavBar } from "@/components/sandspire/SandspireNavBar";
import { SandspireFooter } from "@/components/sandspire/SandspireFooter";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { Magnetic } from "@/components/sandspire/Magnetic";
import { WorkHero } from "@/components/sandspire/work/WorkHero";
import { WorkGallery } from "@/components/sandspire/work/WorkGallery";

export const metadata: Metadata = {
  title: "Work — Sandspire | Reels & social for UAE brands",
  description:
    "A working archive of the reels, photos and feeds Sandspire makes for UAE restaurants, cafés and the rooms people line up for. Press play on the work.",
};

/** The things one shoot day buys — a quiet capability marquee. */
const CAPABILITIES = [
  "Reels & short-form",
  "Brand & product photography",
  "Social media, handled",
  "UGC & creator content",
  "Editing, captions & hooks",
  "Scheduling & publishing",
  "Monthly reporting",
];

export default function WorkPage() {
  return (
    <div className="work-root relative w-full overflow-x-clip bg-[#faf3e8] text-[#0d0d0d] selection:bg-[#ff5e00] selection:text-[#faf3e8]">
      {/* Global nav — transparent over the dark hero, dark glass on scroll */}
      <SandspireNavBar ctaHref="/contact" ctaLabel="Start a project" logoLoading="eager" />

      {/* HERO — cinematic masked-reveal opening */}
      <WorkHero />

      {/* CAPABILITY MARQUEE — texture + a quiet list of what we shoot */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#0d0d0d] py-6 text-[#FAF3E8]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0d0d0d] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0d0d0d] to-transparent" />
        <div className="flex items-center gap-4 px-5">
          <span className="shrink-0 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAF3E8]/45">
            What one shoot day buys
          </span>
          <div className="work-marquee-mask flex-1 overflow-hidden">
            <div className="work-marquee flex w-max items-center gap-10">
              {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
                <span key={`${c}-${i}`} className="flex items-center gap-10">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2vw,1.5rem)] font-medium tracking-[-0.01em] text-[#FAF3E8]/80">
                    {c}
                  </span>
                  <span className="size-1.5 shrink-0 rounded-full bg-[#ff5e00]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE ARCHIVE — filters, featured lead, staggered reel gallery */}
      <WorkGallery />

      {/* CLOSING BRAND MOMENT + CTA */}
      <section className="relative flex min-h-[82vh] items-center overflow-hidden bg-[#0a0604] py-28 text-[#FAF3E8]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 50rem at 50% 46%, rgba(255,94,0,0.22), transparent 60%), linear-gradient(180deg, #0d0805, #0a0604)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 text-center sm:px-8 lg:px-10">
          <ScrollReveal>
            <p className="flex items-center justify-center gap-2.5 font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.24em] text-[#ff7a3d]">
              <span className="size-1.5 rounded-full bg-[#ff5e00]" />
              Your place, next
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="mx-auto mt-8 font-[family-name:var(--font-display)] text-[clamp(2.6rem,9vw,7rem)] font-bold leading-[0.94] tracking-[-0.03em] [text-wrap:balance]">
              Let&apos;s make you
              <br />
              <span className="italic text-[#ff5e00]">impossible to scroll past.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="mx-auto mt-9 max-w-[52ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,2vw,1.3rem)] leading-[1.6] text-[#FAF3E8]/65">
              Tell us what you do and where you are. We&apos;ll come back with a
              plan, a shoot date and a quote — just the work you actually need.
              No pitch deck, no pressure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic strength={0.4}>
                <Link
                  href="/contact"
                  className="inline-flex h-[56px] items-center justify-center gap-2 rounded-full bg-[#ff5e00] px-9 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_18px_44px_-14px_rgba(255,94,0,0.8)] transition-colors duration-200 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
                >
                  Start a project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#faf3e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <Link
                href="/services"
                className="inline-flex h-[56px] items-center justify-center rounded-full border border-white/20 px-8 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#FAF3E8] transition-colors duration-200 hover:border-[#ff7a3d] hover:text-[#ff7a3d]"
              >
                What we do
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER — same global closing moment as /home-3 */}
      <SandspireFooter />

      {/* Page-scoped animation + reduced-motion handling */}
      <style>{`
        .work-root .work-rec {
          animation: work-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes work-ping {
          0% { transform: scale(1); opacity: 0.7; }
          80%, 100% { transform: scale(2.6); opacity: 0; }
        }

        .work-root .work-scroll-dot {
          animation: work-scroll 1.7s ease-in-out infinite;
        }
        @keyframes work-scroll {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateY(11px); }
        }

        .work-root .work-marquee {
          animation: work-marquee 34s linear infinite;
        }
        @keyframes work-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .work-root .work-rec,
          .work-root .work-scroll-dot,
          .work-root .work-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
