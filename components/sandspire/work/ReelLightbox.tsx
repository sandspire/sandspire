"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { WorkProject } from "./workProjects";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen reel player. The vertical reel plays with sound (the click that
 * opens it is the user gesture browsers want), framed in Instagram-story chrome
 * with a deep-link to the brand's full case study. Esc / backdrop / button all
 * close it, body scroll is locked while open, and reduced-motion skips the
 * scale-in. Mirrors the modal in Home3VideoScroll so it feels native to /home-3.
 */
export function ReelLightbox({
  project,
  onClose,
}: {
  project: WorkProject | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion() ?? false;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="reel-lightbox"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080604]/92 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} reel`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          {/* Ambient brand glow behind the reel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40rem 40rem at 50% 50%, rgba(255,94,0,0.14), transparent 60%)",
            }}
          />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reel"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#FAF3E8] backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <motion.div
            className="relative flex max-h-[92vh] w-full max-w-[404px] flex-col"
            initial={reduce ? false : { opacity: 0, scale: 0.92, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.42, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — avatar + handle */}
            <div className="mb-3 flex items-center gap-2.5">
              <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-[#141210] p-[5px] ring-1 ring-white/20">
                <img src={project.logo} alt="" className="size-full object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block font-[family-name:var(--font-display)] text-[15px] font-semibold text-[#FAF3E8]">
                  {project.name}
                </span>
                <span className="block font-[family-name:var(--font-body)] text-[12px] text-[#FAF3E8]/55">
                  {project.handle}
                </span>
              </span>
            </div>

            {/* The reel */}
            <video
              ref={videoRef}
              src={project.reel}
              poster={project.poster}
              controls
              autoPlay
              loop
              playsInline
              className="min-h-0 w-full flex-1 rounded-[22px] bg-black object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
            />

            {/* Footer — category + case-study deep link */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="font-[family-name:var(--font-body)] text-[11.5px] font-semibold uppercase tracking-[0.18em] text-[#FAF3E8]/45">
                {project.category} · {project.year}
              </span>
              <Link
                href={`/work/${project.slug}`}
                className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] text-[13px] font-semibold text-[#ff7a3d] transition-colors hover:text-[#ff5e00]"
              >
                Full case study
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
