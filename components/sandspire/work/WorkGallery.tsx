"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WorkFeature } from "./WorkFeature";
import { WorkProjectCard } from "./WorkProjectCard";
import { ReelLightbox } from "./ReelLightbox";
import {
  WORK_FILTERS,
  WORK_PROJECTS,
  countForFilter,
  type WorkFilter,
  type WorkProject,
} from "./workProjects";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Gentle per-column vertical offset (desktop only) for editorial rhythm. */
const COLUMN_OFFSET = ["lg:mt-0", "lg:mt-14", "lg:mt-7"];

export function WorkGallery() {
  const reduce = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<WorkFilter>("All");
  const [active, setActive] = useState<WorkProject | null>(null);

  const visible =
    filter === "All"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((p) => p.disciplines.includes(filter));

  const lead = visible[0];
  const rest = visible.slice(1);

  /* ---- Cursor-following "Watch" preview (desktop, pointer:fine, motion on) ---- */
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const sx = useSpring(cursorX, { stiffness: 600, damping: 38, mass: 0.5 });
  const sy = useSpring(cursorY, { stiffness: 600, damping: 38, mass: 0.5 });
  const [hover, setHover] = useState<WorkProject | null>(null);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, cursorX, cursorY]);

  return (
    <section className="relative bg-[#faf3e8] py-20 text-[#0d0d0d] sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-10">
        {/* Section head */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[34ch]">
            <ScrollReveal>
              <p className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ff5e00]">
                <span className="size-1.5 rounded-full bg-[#ff5e00]" />
                The archive
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Press play on the work.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <p className="max-w-[40ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#0d0d0d]/60">
              Seven brands. One studio. Every reel planned, shot and edited
              in-house — then posted while they got on with the day.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          {WORK_FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-[family-name:var(--font-body)] text-[13px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff5e00]",
                  isActive ? "text-[#faf3e8]" : "text-[#0d0d0d]/55 hover:text-[#0d0d0d]",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#0d0d0d]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
                <span
                  className={cn(
                    "relative z-10 tabular-nums text-[11px]",
                    isActive ? "text-[#faf3e8]/55" : "text-[#0d0d0d]/35",
                  )}
                >
                  {countForFilter(f)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 h-px w-full origin-left bg-[#0d0d0d]/10" />

        {/* Feature + grid, cross-faded on filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12 lg:mt-16"
          >
            {lead ? (
              <>
                <WorkFeature project={lead} onOpen={setActive} onPreview={setHover} />

                {rest.length > 0 && (
                  <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {rest.map((p, i) => (
                      <WorkProjectCard
                        key={p.id}
                        project={p}
                        index={i}
                        number={String(i + 2).padStart(2, "0")}
                        offsetClass={COLUMN_OFFSET[i % 3]}
                        onOpen={setActive}
                        onPreview={setHover}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)] font-bold tracking-[-0.02em]">
                  Nothing filed under that — yet.
                </p>
                <button
                  type="button"
                  onClick={() => setFilter("All")}
                  className="mt-5 font-[family-name:var(--font-body)] text-[14px] font-semibold text-[#ff5e00] underline-offset-4 hover:underline"
                >
                  See all work
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cursor-following preview pill (desktop, motion on) */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[110] hidden lg:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#ff5e00] px-4 py-2.5 font-[family-name:var(--font-body)] text-[12.5px] font-semibold text-[#faf3e8] shadow-[0_18px_40px_-12px_rgba(255,94,0,0.8)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
                  <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
                </svg>
                Watch {hover.name}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <ReelLightbox project={active} onClose={() => setActive(null)} />
    </section>
  );
}
