import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { HomePageV2WorkVideoBackground } from "@/components/sandspire/HomePageV2HeroBackground";
import { HomePageV2ServiceSuite } from "@/components/sandspire/HomePageV2ServiceSuite";
import { HomePageV2Showreel } from "@/components/sandspire/HomePageV2Showreel";
import { HomePageV2WorkScroll } from "@/components/sandspire/HomePageV2WorkScroll";
import { LogoMarquee } from "@/components/sandspire/LogoMarquee";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteFooter } from "@/components/sandspire/SiteFooter";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";
import type { ClientLogo, HomepageV2Content } from "@/lib/siteContentDefaults";
import { homepageV2ImageFallbacks, siteContentDefaults } from "@/lib/siteContentDefaults";
import type { SiteSettingsContent } from "@/sanity/lib/queries/siteContent";

function OutlineButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 min-w-[144px] items-center justify-center rounded-full border border-[#faf3e8] px-6 text-[13px] font-semibold text-[#faf3e8] transition-colors hover:bg-[#faf3e8] hover:text-[#0d0d0d] ${className}`}
    >
      {children}
    </Link>
  );
}

type HomePageV2Props = {
  content?: HomepageV2Content;
  site?: SiteSettingsContent;
  logos?: ClientLogo[];
};

export function HomePageV2({
  content = siteContentDefaults.homepageV2,
  site,
  logos,
}: HomePageV2Props) {
  const nav = site?.nav ?? siteContentDefaults.nav;
  const contact = site?.contact ?? siteContentDefaults.contact;
  const footer = site?.footer ?? siteContentDefaults.footer;
  const heroImageSrc =
    content.heroImagePath?.trim() || homepageV2ImageFallbacks.hero;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SiteNavBar
        className="sticky top-0 z-50 h-[54px] border-b border-white/[0.06] bg-[#141414]/85 px-5 backdrop-blur-[10px] lg:px-7"
        ctaHref={nav.ctaHref}
        ctaLabel={nav.ctaLabel}
        links={nav.links}
        logoHref="/home-2"
        logoLoading="eager"
      />

      <header className="relative -mt-[54px] overflow-hidden pt-[54px]">
        <div className="relative isolate flex h-[100dvh] flex-col overflow-hidden rounded-b-[32px] bg-[#0d0d0d] opacity-[0.98] lg:rounded-b-[48px]">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-b-[32px] lg:rounded-b-[48px]">
            <div className="absolute inset-0 overflow-hidden rounded-b-[32px] lg:rounded-b-[48px]">
              <div className="absolute inset-0 scale-[1.18]">
                {heroImageSrc ? (
                  <Image
                    src={heroImageSrc}
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center brightness-[1.12] saturate-[1.05]"
                  />
                ) : null}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-b-[32px] bg-gradient-to-b from-black/40 via-black/22 to-black/48 lg:rounded-b-[48px]" />

            <div className="relative z-10 flex h-full flex-col justify-center px-6 font-body home2-hero lg:px-8">
              <ScrollReveal className="mx-auto w-full max-w-[554px] text-center">
                <h1 className="font-body text-[clamp(2.5rem,6.5vw,4.7rem)] font-light leading-[0.95] tracking-[-0.05em] text-white">
                  {content.heroHeadline}
                </h1>
                <p className="mt-6 text-[18px] font-normal leading-[1.4] text-[#faf3e8] sm:text-[20px]">
                  {content.heroSubheadline}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <OutlineButton href={content.heroPrimaryCtaHref}>
                    {content.heroPrimaryCtaLabel}
                  </OutlineButton>
                  <Link
                    href={content.heroSecondaryCtaHref}
                    className="text-[13px] font-semibold text-white underline decoration-solid underline-offset-4 hover:text-[#faf3e8]"
                  >
                    {content.heroSecondaryCtaLabel}
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <LogoMarquee variant="hero" className="shrink-0 rounded-t-[28px] rounded-b-[32px] lg:rounded-t-[36px] lg:rounded-b-[48px]" logos={logos} />
        </div>
      </header>

      <main>
        <section id="work" className="relative overflow-visible scroll-mt-8 px-6 pt-16 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
          <HomePageV2WorkVideoBackground />
          <div className="relative z-[1] mx-auto w-full max-w-[935px] overflow-visible">
            <div className="work-scroll-stage relative overflow-visible">
              <div className="relative z-20 flex flex-col items-center gap-[5px] px-2 pb-4 pt-1 text-center">
                <h2 className="home2-section-title font-display text-[clamp(2.5rem,5vw,3.4375rem)] font-normal leading-[1.44] text-white [text-shadow:0_4.35px_4.35px_rgba(0,0,0,0.79)]">
                  {content.workTitle}
                </h2>
                <p className="max-w-[373px] font-body text-[18px] font-medium tracking-[-0.06em] text-[#faf3e8] sm:text-[20px] sm:leading-[1.36]">
                  {content.workSubtitle}
                </p>
              </div>

              <HomePageV2WorkScroll items={content.workScrollItems} />
            </div>

            <div className="flex justify-center px-2 pb-2 pt-6">
              <OutlineButton href={content.workViewAllHref}>{content.workViewAllLabel}</OutlineButton>
            </div>
          </div>
        </section>

        <HomePageV2ServiceSuite
          title={content.servicesTitle}
          serviceCards={content.serviceCards}
          analyticsVideoPath={content.analyticsVideoPath}
          analyticsVideoPosterPath={content.analyticsVideoPosterPath}
          bentoCocktailImagePath={content.bentoCocktailImagePath}
          bentoFoodImagePath={content.bentoFoodImagePath}
        />

        <section className="px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[1000px]">
            <HomePageV2Showreel
              viewAllHref={content.showreelCtaHref}
              title={content.showreelTitle}
              videoPath={content.showreelVideoPath}
              posterPath={content.showreelPosterPath}
              ctaLabel={content.showreelCtaLabel}
            />
          </div>
        </section>

        <ContactFAQ
          className="rounded-t-[48px] bg-[#0d0d0d] lg:rounded-t-[70px]"
          variant="home2"
          faqItems={contact.faqHome2}
          contactMoreQuestionsHref="/home-2#contact"
          headline={contact.headline}
          intro={contact.intro}
          phone={site?.phone ?? siteContentDefaults.site.phone}
          socialLinks={footer.socialLinks}
        />
        <SiteFooter
          variant="home2"
          homeHref="/home-2"
          navLinks={nav.links}
          taglineLine1={footer.taglineLine1}
          taglineLine2={footer.taglineLine2}
          blurb={footer.blurb}
          copyright={footer.copyright}
          socialLinks={footer.socialLinks}
        />
      </main>
    </div>
  );
}
