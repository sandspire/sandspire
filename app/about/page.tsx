import type { Metadata } from "next";
import Image from "next/image";
import { SandspireHeaderFromCms } from "@/components/sandspire/SandspireHeaderFromCms";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteFooterFromCms } from "@/components/sandspire/SiteFooterFromCms";
import { getAboutPageContent, getHomepageV2Content } from "@/sanity/lib/queries/siteContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function AboutPage() {
  const [content, homepageV2] = await Promise.all([
    getAboutPageContent(),
    getHomepageV2Content(),
  ]);
  const heroImage = homepageV2.heroImagePath;

  return (
    <div className="site-jakarta min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SandspireHeaderFromCms />

      <main>
        <section className="mx-auto max-w-[1180px] px-6 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20">
          <ScrollReveal>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/5 sm:aspect-[5/4] lg:aspect-[4/5]">
                {heroImage ? (
                  <Image
                    src={heroImage}
                    alt="Sandspire studio"
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                )}
              </div>

              <div>
                <h1 className="max-w-[720px] font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#faf3e8]">
                  {content.headline}
                </h1>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal delay={0.08}>
              <section>
                <h2 className="font-[family-name:var(--font-display)] text-[24px] font-semibold leading-[1.12] tracking-[-0.02em] lg:text-[28px]">
                  {content.section1Title}
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[1.6] tracking-[0] text-[#c9c2b8] lg:text-[17px]">
                  {content.section1Body}
                </p>
              </section>
            </ScrollReveal>
            <ScrollReveal delay={0.14}>
              <section>
                <h2 className="font-[family-name:var(--font-display)] text-[24px] font-semibold leading-[1.12] tracking-[-0.02em] lg:text-[28px]">
                  {content.section2Title}
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[1.6] tracking-[0] text-[#c9c2b8] lg:text-[17px]">
                  {content.section2Body}
                </p>
              </section>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-16 lg:mt-20" delay={0.06}>
            <p className="text-[15px] font-normal leading-[1.5] tracking-[0] text-[#919191]">
              {content.ctaPrefix}{" "}
              <a
                href={content.ctaLinkHref}
                className="text-[#ff5e00] underline decoration-solid underline-offset-4 transition-colors hover:text-[#ff7a2e]"
              >
                {content.ctaLinkLabel}
              </a>
              .
            </p>
          </ScrollReveal>
        </section>
      </main>

      <SiteFooterFromCms />
    </div>
  );
}
