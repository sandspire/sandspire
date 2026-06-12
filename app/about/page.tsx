import type { Metadata } from "next";
import { SandspireHeaderFromCms } from "@/components/sandspire/SandspireHeaderFromCms";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { getAboutPageContent } from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function AboutPage() {
  const content = await getAboutPageContent();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SandspireHeaderFromCms />

      <main className="mx-auto max-w-[1180px] px-6 pb-24 pt-14 lg:px-8 lg:pb-32 lg:pt-20">
        <ScrollReveal>
          <p className="text-xs font-normal uppercase tracking-[0.14px] text-[var(--accent)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[720px] font-display text-[clamp(2rem,4.5vw,2.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-[640px] text-[17px] font-normal leading-[1.55] text-[var(--foreground)]/85 lg:text-[18px]">
            {content.intro}
          </p>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal delay={0.08}>
            <section>
              <h2 className="font-display text-[28px] font-light leading-[1.08] tracking-[-0.02em] lg:text-[30px]">
                {content.section1Title}
              </h2>
              <p className="mt-4 text-[16px] font-normal leading-[1.55] text-[var(--foreground)]/80">
                {content.section1Body}
              </p>
            </section>
          </ScrollReveal>
          <ScrollReveal delay={0.14}>
            <section>
              <h2 className="font-display text-[28px] font-light leading-[1.08] tracking-[-0.02em] lg:text-[30px]">
                {content.section2Title}
              </h2>
              <p className="mt-4 text-[16px] font-normal leading-[1.55] text-[var(--foreground)]/80">
                {content.section2Body}
              </p>
            </section>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-20 lg:mt-24" delay={0.06}>
          <p className="text-[15px] font-normal leading-[1.5] text-[var(--muted)]">
            {content.ctaPrefix}{" "}
            <a
              href={content.ctaLinkHref}
              className="text-[var(--accent)] underline decoration-solid underline-offset-4"
            >
              {content.ctaLinkLabel}
            </a>
            .
          </p>
        </ScrollReveal>
      </main>

      <SiteFooterFromCms />
    </div>
  );
}
