import Image from "next/image";
import { Link } from "next-view-transitions";

import { RevealText } from "@/components/sandspire/RevealText";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import type { FeaturedCase } from "@/lib/siteContentDefaults";
import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { workProjectTransitionName } from "@/lib/viewTransitionNames";

type CaseStudiesProps = {
  title?: string;
  cases?: FeaturedCase[];
};

export function CaseStudies({
  title = siteContentDefaults.homepage.caseStudiesTitle,
  cases = siteContentDefaults.homepage.featuredCases,
}: CaseStudiesProps) {
  return (
    <section
      id="work"
      className="relative z-10 w-full scroll-mt-8 rounded-t-[32px] bg-white px-5 py-12 text-[#0d0d0d] sm:rounded-t-[48px] sm:px-6 sm:py-14 lg:rounded-t-[70px] lg:px-10 lg:py-20 xl:px-[72px]"
    >
      <div className="mx-auto flex w-full max-w-[1016px] flex-col items-center gap-14 lg:gap-[4.5rem]">
        <div className="w-full">
          <RevealText
            tag="h2"
            variant="headline"
            text={title}
            textAlign="center"
            className="w-full text-center font-[family-name:var(--font-display)] text-[clamp(1.65rem,3.4vw,2.45rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#0d0d0d]"
          />
        </div>

        <div className="flex w-full flex-col gap-10 lg:gap-[4.5rem]">
          {cases.map((c, idx) => (
            <ScrollReveal key={c.title} className="w-full" delay={0.06 + idx * 0.1}>
              <Link
                href={`/work/${c.slug}`}
                className="block rounded-2xl text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0d0d0d]/30"
              >
                <article className="grid items-center gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
                  <div className="w-full">
                    <div
                      className="overflow-hidden rounded-[20px] border border-black/15 bg-black/20 p-1 shadow-[0_5px_14px_rgba(0,0,0,0.14)]"
                      style={{ viewTransitionName: workProjectTransitionName(c.slug) }}
                    >
                      <div className="relative aspect-[3/2] overflow-hidden rounded-[17px] bg-[#d7cec0] lg:min-h-[320px]">
                        <Image
                          src={c.imagePath}
                          alt={`${c.title} preview`}
                          fill
                          sizes="(min-width: 1024px) 580px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3 px-1 lg:px-0">
                    <RevealText
                      tag="h3"
                      variant="headline"
                      text={c.title}
                      className="font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#0d0d0d]"
                    />
                    <RevealText
                      tag="p"
                      variant="paragraph"
                      text={c.description}
                      className="max-w-[420px] text-[15px] font-normal leading-[1.55] text-[#0d0d0d]/75 lg:text-[16px]"
                    />
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
