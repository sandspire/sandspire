"use client";

import { useCallback, useEffect, useState } from "react";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { ScrollZoomIn } from "@/components/sandspire/ScrollZoomIn";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

type HomePageV2ShowreelProps = {
  viewAllHref?: string;
  title?: string;
  videoPath?: string;
  posterPath?: string;
  ctaLabel?: string;
};

export function HomePageV2Showreel({
  viewAllHref = siteContentDefaults.homepageV2.showreelCtaHref,
  title = siteContentDefaults.homepageV2.showreelTitle,
  videoPath = siteContentDefaults.homepageV2.showreelVideoPath,
  posterPath = siteContentDefaults.homepageV2.showreelPosterPath,
  ctaLabel = siteContentDefaults.homepageV2.showreelCtaLabel,
}: HomePageV2ShowreelProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <ScrollReveal className="text-center">
        <h2 className="home2-section-title font-display text-[clamp(2.25rem,5vw,3.45rem)] font-normal leading-tight text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.55)]">
          {title}
        </h2>
      </ScrollReveal>
      <ScrollReveal className="mt-10" delay={0.06}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open showreel in full view"
          className="group relative mx-auto block w-full max-w-[1000px] cursor-zoom-in overflow-hidden rounded-[36px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow] hover:border-white/20 hover:shadow-[0_24px_56px_rgba(0,0,0,0.55)] lg:rounded-[51px]"
        >
          <ScrollZoomIn className="aspect-video w-full">
            <DeferredVideo
              className="size-full object-cover"
              src={videoPath}
              poster={posterPath}
              autoPlay
              muted
              loop
              playsInline
              loadStrategy="visible"
            />
          </ScrollZoomIn>
          <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </button>
      </ScrollReveal>
      <ScrollReveal className="mt-10 flex justify-center" delay={0.1}>
        <a
          href={viewAllHref}
          className="inline-flex h-11 min-w-[144px] items-center justify-center rounded-full border border-[#faf3e8] px-6 text-[13px] font-semibold text-[#faf3e8] transition-colors hover:bg-[#faf3e8] hover:text-[#0d0d0d]"
        >
          {ctaLabel}
        </a>
      </ScrollReveal>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel full view"
          onClick={close}
        >
          <div
            className="relative w-full max-w-[min(1200px,96vw)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close showreel"
              className="absolute -top-10 right-0 text-sm font-medium text-white/80 transition-colors hover:text-white sm:-top-12"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.65)] lg:rounded-3xl">
              <video
                className="aspect-video w-full bg-black object-contain"
                src={videoPath}
                poster={posterPath}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
