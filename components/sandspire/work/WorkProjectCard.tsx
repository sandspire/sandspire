"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import type { WorkProject } from "./workProjects";

const EASE = [0.22, 1, 0.36, 1] as const;

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

/**
 * A 9:16 reel card. Holds its poster, then cross-fades to the muted, looping
 * reel while hovered/focused (only one plays at a time — preload="none" keeps
 * the page light). Click opens the full-screen player; a quiet ↗ deep-links to
 * the case study. On touch there's no hover preview — a tap opens the reel.
 */
export function WorkProjectCard({
  project,
  number,
  index,
  offsetClass,
  onOpen,
  onPreview,
}: {
  project: WorkProject;
  number: string;
  index: number;
  offsetClass?: string;
  onOpen: (p: WorkProject) => void;
  onPreview?: (p: WorkProject | null) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    onPreview?.(project);
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  const stop = () => {
    onPreview?.(null);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.05, ease: EASE }}
      className={cn("group/card", offsetClass)}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        aria-label={`Watch the ${project.name} reel`}
        className="relative block w-full overflow-hidden rounded-[20px] bg-[#160a06] text-left outline-none ring-1 ring-[#0d0d0d]/10 transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_40px_90px_-40px_rgba(13,13,13,0.55)] focus-visible:ring-2 focus-visible:ring-[#ff5e00]"
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden">
          <img
            src={project.poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-[1.07]"
          />
          <video
            ref={videoRef}
            src={project.reel}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="none"
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          />

          {/* Legibility gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, transparent 26%, transparent 46%, rgba(0,0,0,0.78) 100%)",
            }}
          />

          {/* Top row — number + year */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <span className="font-[family-name:var(--font-display)] text-[13px] font-semibold tabular-nums tracking-[0.04em] text-[#FAF3E8]/80">
              {number}
            </span>
            <span className="rounded-full bg-black/30 px-2.5 py-1 font-[family-name:var(--font-body)] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#FAF3E8]/85 backdrop-blur-sm">
              {project.year}
            </span>
          </div>

          {/* Center play affordance */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="flex size-16 scale-75 items-center justify-center rounded-full bg-[#ff5e00] text-[#FAF3E8] opacity-0 shadow-[0_18px_40px_-12px_rgba(255,94,0,0.8)] transition-all duration-400 ease-out group-hover/card:scale-100 group-hover/card:opacity-100">
              <PlayGlyph className="ml-0.5 size-6" />
            </span>
          </div>

          {/* Bottom caption */}
          <figcaption className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-[family-name:var(--font-body)] text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#ff9a5e]">
              {project.category}
            </p>
            <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[22px] font-bold leading-tight tracking-[-0.01em] text-[#FAF3E8] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
              {project.name}
            </h3>
            <p className="mt-0.5 font-[family-name:var(--font-body)] text-[12.5px] text-[#FAF3E8]/65">
              {project.place}
            </p>
          </figcaption>
        </div>
      </button>

      {/* Editorial blurb + case-study link below the card */}
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <p className="max-w-[34ch] font-[family-name:var(--font-body)] text-[13.5px] leading-[1.55] text-[#0d0d0d]/60">
          {project.blurb}
        </p>
        <Link
          href={`/work/${project.slug}`}
          aria-label={`${project.name} case study`}
          className="group/link mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[#0d0d0d]/15 text-[#0d0d0d] transition-colors duration-300 hover:border-[#ff5e00] hover:bg-[#ff5e00] hover:text-[#faf3e8]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.figure>
  );
}
