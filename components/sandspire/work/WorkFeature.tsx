"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import type { WorkProject } from "./workProjects";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The page's cinematic lead: whichever project sits first in the active filter.
 * Bigger type, more air, and a reel that autoplays (muted) while it's on screen
 * with a soft scroll parallax + hover scale — a case-study cover, not a card.
 */
export function WorkFeature({
  project,
  onOpen,
  onPreview,
}: {
  project: WorkProject;
  onOpen: (p: WorkProject) => void;
  onPreview?: (p: WorkProject | null) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [44, -44]);

  // Play the feature reel only while it's actually in view.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const p = v.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [project.id]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.78fr] lg:gap-16"
    >
      {/* Copy */}
      <div className="order-2 lg:order-1">
        <div className="flex items-center gap-5">
          <span className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none text-[#ff5e00]">
            01
          </span>
          <span className="h-px flex-1 origin-left bg-[#0d0d0d]/15" />
          <span className="font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0d0d0d]/40">
            Featured
          </span>
        </div>

        <p className="mt-9 flex items-center gap-2 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
          <span className="size-1.5 rounded-full bg-[#ff5e00]" />
          {project.category}
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.03em]">
          {project.name}
        </h3>
        <p className="mt-3 font-[family-name:var(--font-body)] text-[15px] text-[#0d0d0d]/55">
          {project.place} · {project.year}
        </p>
        <p className="mt-7 max-w-[46ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6] text-[#0d0d0d]/70">
          {project.blurb}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="group inline-flex h-[54px] items-center justify-center gap-2.5 rounded-full bg-[#ff5e00] px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_16px_40px_-14px_rgba(255,94,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
            Watch the reel
          </button>
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex h-[54px] items-center justify-center rounded-full border border-[#0d0d0d]/15 px-7 font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#0d0d0d] transition-colors duration-200 hover:border-[#ff5e00] hover:text-[#ff5e00]"
          >
            Full case study
          </Link>
        </div>
      </div>

      {/* Media */}
      <div className="order-1 lg:order-2">
        <button
          type="button"
          onClick={() => onOpen(project)}
          onMouseEnter={() => onPreview?.(project)}
          onMouseLeave={() => onPreview?.(null)}
          aria-label={`Watch the ${project.name} reel`}
          className="group relative mx-auto block w-full max-w-[360px] outline-none"
        >
          {/* warm glow behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 45%, rgba(255,94,0,0.32), transparent 70%)",
            }}
          />
          <motion.div
            style={{ y: mediaY }}
            className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-[#160a06] ring-1 ring-black/10 shadow-[0_50px_120px_-40px_rgba(13,13,13,0.7)]"
          >
            <video
              ref={videoRef}
              src={project.reel}
              poster={project.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="size-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.55) 100%)",
              }}
            />
            {/* story-style header */}
            <div className="absolute inset-x-0 top-0 flex items-center gap-2.5 p-4">
              <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-[#141210] p-[5px] ring-2 ring-white/80">
                <img src={project.logo} alt="" className="size-full object-contain" />
              </span>
              <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold text-white">
                {project.handle}
              </span>
            </div>
            {/* hover play badge */}
            <span className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#ff5e00] group-hover:text-[#faf3e8]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5" aria-hidden>
                <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
