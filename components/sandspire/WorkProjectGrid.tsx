"use client";

import Link from "next/link";
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
};

export function WorkProjectGrid({ projects }: Props) {
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
          <h1 className="text-center font-[family-name:var(--font-display)] text-[34px] font-light leading-[1.05] text-[#FAF3E8] sm:text-[40px] md:text-[44px]">
            Selected Work
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] px-1 text-center text-[16px] leading-[1.4] text-[#919191] sm:mt-4 sm:text-[17px] md:text-[18px]">
            A curated set of brand, web, and campaign projects crafted for teams
            that care about details.
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="mx-auto w-full max-w-full rounded-2xl border border-white/10 bg-white/[0.07] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-full sm:p-1.5">
            <div
              className="-mx-0.5 flex min-h-[48px] items-center justify-start gap-1.5 overflow-x-auto overflow-y-hidden scroll-smooth px-0.5 py-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible sm:px-0 md:gap-3 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategoryInUrl(cat)}
                  className={[
                    "shrink-0 snap-start rounded-full px-4 py-2.5 text-[12px] font-medium leading-none transition-all duration-200 ease-out min-[480px]:py-2",
                    "hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7941D]/70",
                    category === cat
                      ? "bg-white/20 text-[#FAF3E8] shadow-sm"
                      : "text-[#B5B5B5] hover:bg-white/10 hover:text-[#FAF3E8]",
                  ].join(" ")}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md px-2 text-center text-[15px] leading-relaxed text-[#8A847B]">
          Nothing in <span className="text-[#FAF3E8]">{category}</span> yet. Try another
          filter.
        </p>
      ) : null}

      <section className="mx-auto mt-10 grid w-full max-w-[995px] gap-8 gap-y-10 px-0 sm:mt-12 sm:gap-x-[47px] sm:gap-y-[52px] md:mt-14 md:grid-cols-2">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group block h-full rounded-[14px] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7941D] active:translate-y-0 active:duration-150"
          >
            <article className="flex h-full min-h-0 flex-col rounded-[14px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-[border-color,background-color] duration-300 sm:p-[18px] group-hover:border-white/22 group-hover:bg-white/[0.09]">
              <div className="overflow-hidden rounded-[12px] bg-black/30">
                {project.imageSrc ? (
                  <img
                    src={project.imageSrc}
                    alt={`${project.title} project preview`}
                    className="h-auto w-full object-cover transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.04] group-hover:brightness-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[4/3] w-full bg-white/5" />
                )}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h2 className="font-[family-name:var(--font-display)] text-[26px] font-light leading-[1.02] text-[#FAF3E8] sm:text-[30px] md:text-[34px]">
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
      </section>
    </>
  );
}
