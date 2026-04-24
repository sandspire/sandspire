import Link from "next/link";

import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

export function CaseStudies() {
  const cases = [
    {
      title: "3 Fils",
      slug: "3-fils" as const,
      description: "Award-winning Asian restaurant with a loyal following and a menu built for sharing.",
      imageSrc: "/images/projects/3fils/3fils_img.png",
    },
    {
      title: "Brix Journey",
      slug: "brix-journey" as const,
      description: "A premium dining journey and digital booking flow for guests who expect polish at every step.",
      imageSrc: "/images/projects/brixjourney/brixjourney_img.png",
    },
    {
      title: "Slrp",
      slug: "slrp" as const,
      description:
        "High-energy ramen and rolls inspired by Tokyo street culture, built for busy malls, bold flavors, and fast-moving crowds.",
      imageSrc: "/images/projects/slrp/slrp_img.png",
    },
  ];

  return (
    <section
      id="work"
      className="relative z-10 w-full scroll-mt-8 rounded-t-[32px] bg-white px-5 py-12 text-[#0d0d0d] sm:rounded-t-[48px] sm:px-6 sm:py-14 lg:rounded-t-[70px] lg:px-10 lg:py-20 xl:px-[72px]"
    >
      <div className="mx-auto flex w-full max-w-[1016px] flex-col items-center gap-14 lg:gap-[4.5rem]">
        <ScrollReveal className="w-full">
          <h2 className="text-center font-[family-name:var(--font-body)] text-[clamp(1.65rem,3.4vw,2.45rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#0d0d0d]">
            Crafting legacy for teams that scale
          </h2>
        </ScrollReveal>

        <div className="flex w-full flex-col gap-10 lg:gap-[4.5rem]">
          {cases.map((c, idx) => (
            <ScrollReveal key={c.title} className="w-full" delay={0.06 + idx * 0.1}>
              <Link
                href={`/work/${c.slug}`}
                className="group/case block rounded-2xl text-inherit no-underline outline-offset-2 transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0d0d0d]/30"
              >
              <article className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
              <div className="w-full">
                <div className="overflow-hidden rounded-[20px] border border-black/15 bg-black/20 p-1 shadow-[0_5px_14px_rgba(0,0,0,0.14)] transition-[transform,box-shadow] duration-300 ease-out group-hover/case:-translate-y-0.5 group-hover/case:shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  <div className="overflow-hidden rounded-[17px] bg-[#d7cec0]">
                    <img
                      src={c.imageSrc}
                      alt={`${c.title} preview`}
                      className="aspect-[3/2] w-full object-cover transition-[transform,filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover/case:scale-[1.03] group-hover/case:brightness-105 lg:min-h-[320px]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="flex min-h-[200px] flex-col justify-center lg:min-h-[320px]">
                <h3 className="font-[family-name:var(--font-body)] text-[clamp(1.5rem,3.2vw,2.2rem)] font-light leading-tight tracking-[-0.02em] text-[#0d0d0d]">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[400px] text-[16px] font-normal leading-[1.55] text-[#8a837b]">
                  {c.description}
                </p>

                <span
                  className="pointer-events-none mt-5 inline-flex h-9 w-fit items-center gap-2 rounded-full bg-[#242424] pl-1 pr-4 text-[11px] font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out group-hover/case:-translate-y-px group-hover/case:bg-[#2e2e2e] group-hover/case:shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                >
                  <span className="inline-flex h-7 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform duration-200 ease-out group-hover/case:translate-x-0.5">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                      <path d="M5 10h10M10 5l5 5-5 5" stroke="currentColor" strokeWidth="2.4" />
                    </svg>
                  </span>
                  View project
                </span>
              </div>
            </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
