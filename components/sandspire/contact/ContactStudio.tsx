"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { ContactForm } from "@/components/sandspire/ContactForm";

type SocialLink = { label: string; href: string };

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function WhatsappGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23zm-4.5 4.46c-.21 0-.55.08-.84.39s-1.1 1.08-1.1 2.63 1.13 3.05 1.29 3.26c.16.21 2.21 3.38 5.44 4.61.76.29 1.35.46 1.81.59.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37s-1.88-.93-2.17-1.03c-.29-.11-.5-.16-.71.16s-.82 1.03-1 1.24c-.18.21-.37.24-.69.08s-1.34-.49-2.55-1.57c-.94-.84-1.58-1.88-1.76-2.2s-.02-.49.14-.65c.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53s.05-.4-.03-.56c-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54l-.61-.01z" />
    </svg>
  );
}
function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function ArrowGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactStudio({
  headline,
  intro,
  phone,
  whatsappHref,
  socialLinks,
}: {
  headline: string;
  intro: string;
  phone: string;
  whatsappHref: string;
  socialLinks: SocialLink[];
}) {
  const reduce = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);

  const instagram = socialLinks.find((s) => s.label.toLowerCase().includes("instagram"));

  const channels: Channel[] = [
    {
      label: "WhatsApp",
      value: phone,
      href: whatsappHref,
      icon: <WhatsappGlyph />,
    },
    {
      label: "Call the studio",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      icon: <PhoneGlyph />,
    },
    ...(instagram
      ? [
          {
            label: "DM on Instagram",
            value: "Slide into the DMs",
            href: instagram.href,
            icon: <InstagramGlyph />,
          } as Channel,
        ]
      : []),
  ];

  // Pointer-tracked glow behind the form card (no re-renders; mutate CSS vars).
  function onCardMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  // Low amount + a forgiving bottom margin so a reveal fires as soon as a sliver
  // of the block enters view — the content can never get stuck at opacity:0.
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section
      id="start"
      className="relative overflow-hidden rounded-t-[40px] bg-[#0d0d0d] text-[#FAF3E8] sm:rounded-t-[56px] lg:rounded-t-[70px]"
    >
      {/* Ambient orange glow up top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(46rem 34rem at 88% -6%, rgba(255,94,0,0.16), transparent 60%), radial-gradient(38rem 32rem at 4% 108%, rgba(247,148,29,0.10), transparent 58%)",
        }}
      />

      <div className="relative mx-auto max-w-[1220px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* LEFT — invitation + direct channels */}
          <div>
            <motion.p
              {...rise(0)}
              className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[12.5px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]"
            >
              <span className="h-1 w-1 rounded-full bg-[#ff5e00]" />
              Start a project
            </motion.p>

            <motion.h2
              {...rise(0.06)}
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.1rem,4.6vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.02em]"
            >
              {headline}
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className="mt-6 max-w-[44ch] font-[family-name:var(--font-body)] text-[16px] leading-[1.65] text-[#FAF3E8]/65"
            >
              {intro}
            </motion.p>

            {/* Direct channels */}
            <motion.div {...rise(0.18)} className="mt-10 flex flex-col gap-3">
              {channels.map((c) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff5e00]/12 text-[#ff7a3d] transition-colors duration-200 group-hover:bg-[#ff5e00] group-hover:text-[#0a0604]">
                      {c.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF3E8]/45">
                        {c.label}
                      </span>
                      <span className="truncate font-[family-name:var(--font-body)] text-[15.5px] font-medium text-[#FAF3E8]">
                        {c.value}
                      </span>
                    </span>
                    <span className="ml-auto text-[#FAF3E8]/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff7a3d]">
                      <ArrowGlyph />
                    </span>
                  </>
                );
                const cls =
                  "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff5e00]/40 hover:bg-white/[0.05]";
                const isHttp = c.href.startsWith("http");
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={isHttp ? "_blank" : undefined}
                    rel={isHttp ? "noopener noreferrer" : undefined}
                    className={cls}
                  >
                    {inner}
                  </a>
                );
              })}
            </motion.div>

            {/* Response promise */}
            <motion.div
              {...rise(0.24)}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-[family-name:var(--font-body)] text-[13px] text-[#FAF3E8]/55"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                Replies within 1 business day
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
                Dubai · GST (UTC+4)
              </span>
            </motion.div>
          </div>

          {/* RIGHT — the form card */}
          <motion.div
            {...rise(0.1)}
            ref={cardRef}
            onPointerMove={onCardMove}
            className="contact-card relative rounded-[26px] p-[1.5px]"
          >
            {/* Pointer-tracked glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[26px] opacity-70"
              style={{
                background:
                  "radial-gradient(16rem 16rem at var(--mx, 80%) var(--my, 0%), rgba(255,94,0,0.18), transparent 60%)",
              }}
            />
            <div className="relative h-full rounded-[25px] border border-white/10 bg-[#121212]/90 px-5 pb-7 pt-6 backdrop-blur-sm sm:px-7 sm:pb-8 sm:pt-7">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold tracking-[-0.01em] text-[#FAF3E8]">
                  Send a message
                </h3>
                <span className="font-[family-name:var(--font-body)] text-[11px] font-medium text-[#FAF3E8]/40">
                  Takes about a minute
                </span>
              </div>
              <ContactForm className="font-body" hideFormNote flatSubmit />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 26px;
          padding: 1.5px;
          background: linear-gradient(140deg, rgba(255,94,0,0.55), rgba(247,148,29,0.18) 38%, rgba(255,255,255,0.06) 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
