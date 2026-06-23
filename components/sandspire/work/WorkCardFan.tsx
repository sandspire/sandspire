"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";
import {
  WORK_FILTERS,
  WORK_PROJECTS,
  countForFilter,
  type WorkFilter,
} from "./workProjects";

/**
 * "The archive" — the project posters dealt out as an interactive fan of
 * cards (21st.dev "card-fan-carousel"). Hovering splays the deck; clicking a
 * card opens that brand's /work/[slug] case study. The category filters
 * re-deal the fan with only the matching projects.
 */
export function WorkCardFan() {
  const [filter, setFilter] = useState<WorkFilter>("All");

  const cards = useMemo<CardItem[]>(() => {
    const list =
      filter === "All"
        ? WORK_PROJECTS
        : WORK_PROJECTS.filter((p) => p.disciplines.includes(filter));
    return list.map((p) => ({
      imgUrl: p.poster,
      alt: `${p.name} — ${p.place}`,
      linkUrl: `/work/${p.slug}`,
    }));
  }, [filter]);

  return (
    <section className="relative bg-[#faf3e8] py-20 text-[#0d0d0d] sm:py-24 lg:py-28">
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
              Seven brands, dealt like a deck. Hover to fan them out, then tap a
              card to open the full case study.
            </p>
          </ScrollReveal>
        </div>

        {/* Filters — re-deal the fan with the matching projects */}
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
                    layoutId="work-fan-filter-pill"
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
      </div>

      {/* The fan. key={filter} re-mounts it so the deal-in animation replays
          whenever the active filter changes. */}
      <div className="mt-6 lg:mt-10">
        <SocialCards key={filter} cards={cards} />
      </div>
    </section>
  );
}
