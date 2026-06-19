"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { WorkIndexCard } from "@/sanity/lib/queries/workIndex";

const PILL_CATEGORIES = new Set([
  "Branding",
  "Web Development",
  "Social Media",
  "AI Automation",
]);

const pillGlowByLabel: Record<string, string> = {
  Branding: "#FE4F18",
  "Social Media": "#FE4F18",
  "Web Development": "#FFBE00",
  "AI Automation": "#F4F4F4",
};

function getPillStyle(label: string) {
  const glow = pillGlowByLabel[label] ?? "#F4F4F4";
  return {
    borderColor: "rgba(255,255,255,0.28)",
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.12), 0 0 10px ${glow}1F`,
  };
}

const pillGlideSpring = { type: "spring" as const, stiffness: 380, damping: 32 };

function norm(s: string) {
  return s.trim().toLowerCase();
}

function projectMatchesCategory(project: WorkIndexCard, category: string) {
  if (category === "All") return true;
  const c = norm(category);
  return project.tags.some((t) => norm(t) === c);
}

type Props = {
  projects: WorkIndexCard[];
  headline?: string;
  subheadline?: string;
  emptyFilterMessage?: string;
};

export function WorkProjectGrid({
  projects,
  headline = "Selected Work",
  subheadline = "A curated set of brand, web, and campaign projects crafted for teams that care about details.",
  emptyFilterMessage = "Nothing in this category yet. Try another filter.",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => {
    const fromTags = new Set(
      projects.flatMap((p) => p.tags.filter(Boolean)),
    );
    const orderedPills = [
      "All",
      "Branding",
      "Web Development",
      "Social Media",
      "AI Automation",
    ].filter((c) => c === "All" || fromTags.has(c));
    const extra = [...fromTags].filter((t) => !PILL_CATEGORIES.has(t));
    extra.sort();
    return [...orderedPills, ...extra];
  }, [projects]);

  const categoryParam = searchParams.get("category");
  const category = useMemo(() => {
    if (categoryParam == null || categoryParam === "") {
      return "All";
    }
    const decoded = decodeURIComponent(categoryParam);
    return categories.find((c) => norm(c) === norm(decoded)) ?? "All";
  }, [categoryParam, categories]);

  const setCategoryInUrl = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === "All") {
        params.delete("category");
      } else {
        params.set("category", cat);
      }
      const q = params.toString();
      router.push(q ? `/work?${q}` : "/work", { scroll: false });
    },
    [router, searchParams],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => projectMatchesCategory(p, category));
  }, [projects, category]);

  return (
    <>
      <section className="mx-auto w-full max-w-[995px] px-0 sm:px-0">
        <div className="w-full">
          <h1 className="text-center font-[family-name:var(--font-body)] text-[30px] font-semibold leading-[1.05] text-[#FAF3E8] sm:text-[36px] md:text-[40px]">
            {headline}
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] px-1 text-center text-[16px] leading-[1.4] text-[#919191] sm:mt-4 sm:text-[17px] md:text-[18px]">
            {subheadline}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="mx-auto w-full max-w-full rounded-2xl border border-white/10 bg-white/[0.07] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-full sm:p-1.5">
            <div
              className="relative -mx-0.5 flex min-h-[48px] items-center justify-start gap-1.5 overflow-x-auto overflow-y-hidden scroll-smooth px-0.5 py-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible sm:px-0 md:gap-3 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter by category"
            >
              {categories.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCategoryInUrl(cat)}
                    className={[
                      "relative shrink-0 snap-start rounded-full px-4 py-2.5 text-[12px] font-medium leading-none transition-colors duration-200 ease-out min-[480px]:py-2",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7941D]/70",
                      isActive ? "text-[#FAF3E8]" : "text-[#B5B5B5] hover:text-[#FAF3E8]",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="work-category-pill"
                        className="absolute inset-0 rounded-full bg-white/20 shadow-sm ring-1 ring-white/10"
                        transition={pillGlideSpring}
                      />
                    ) : null}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-2 text-center text-[15px] leading-relaxed text-[#8A847B]">
          {emptyFilterMessage}
        </p>
      ) : null}

      <motion.section
        key={category}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.38, ease: [0.33, 1, 0.68, 1] }}
        className="work-project-grid mx-auto mt-10 grid w-full max-w-[995px] gap-8 gap-y-10 px-0 sm:mt-12 sm:gap-x-[47px] sm:gap-y-[52px] md:mt-14 md:grid-cols-2"
      >
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block h-full rounded-[14px] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7941D] active:translate-y-0 active:duration-150"
          >
            <article className="flex h-full min-h-0 flex-col rounded-[14px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-[border-color,background-color] duration-300 sm:p-[18px] group-hover:border-white/22 group-hover:bg-white/[0.09]">
              <div className="overflow-hidden rounded-[12px] bg-black/30">
                {project.imageSrc ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={project.imageSrc}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(min-width: 768px) 470px, 100vw"
                      className="object-cover transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.04] group-hover:brightness-110"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full bg-white/5" />
                )}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h2 className="font-body text-[20px] font-medium leading-[1.08] text-[#FAF3E8] not-italic sm:text-[22px] md:text-[24px]">
                  {project.title}
                </h2>
                <p className="max-w-full text-left text-[13px] leading-[1.4] text-[#8A847B] sm:max-w-[250px] sm:text-right sm:text-[14px] sm:leading-[1.35]">
                  {project.description}
                </p>
              </div>

              <div className="mt-3 h-px w-full bg-white/15 sm:mt-4" />

              <div className="mt-3 flex flex-col items-stretch justify-between gap-3 sm:mt-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.slug}-${tag}`}
                      className="rounded-full border bg-white/[0.06] px-2.5 py-1.5 text-[10.5px] font-medium text-[#F4ECE0] backdrop-blur-[8px] sm:px-3 sm:text-[11px]"
                      style={getPillStyle(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-[12px] font-medium text-[#A9A095] underline underline-offset-4 group-hover:text-[#FAF3E8] sm:shrink-0 sm:text-left">
                  View Project
                </span>
              </div>
            </article>
          </Link>
        ))}
      </motion.section>
    </>
  );
}
