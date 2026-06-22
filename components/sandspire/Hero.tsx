import { LogoMarquee } from "@/components/sandspire/LogoMarquee";
import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { RevealText } from "@/components/sandspire/RevealText";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";
import type { ClientLogo } from "@/lib/siteContentDefaults";
import { siteContentDefaults } from "@/lib/siteContentDefaults";
import type { HomepageContent } from "@/sanity/lib/queries/siteContent";

function defaultHomepageContent(): HomepageContent {
  const d = siteContentDefaults.homepage;
  return {
    ...d,
    heroServices: [...d.heroServices],
    featuredCases: [...d.featuredCases],
    serviceCards: [...d.serviceCards],
    webDesignImages: [...d.webDesignImages],
    serviceFlowDiagramImagePath: d.serviceFlowDiagramImagePath,
  };
}

type HeroProps = {
  content?: HomepageContent;
  navLinks?: { label: string; href: string }[];
  ctaHref?: string;
  ctaLabel?: string;
  logos?: ClientLogo[];
  logoSrc?: string;
};

export function Hero({
  content = defaultHomepageContent(),
  navLinks = siteContentDefaults.nav.links,
  ctaHref = siteContentDefaults.nav.ctaHref,
  ctaLabel = siteContentDefaults.nav.ctaLabel,
  logos,
  logoSrc,
}: HeroProps) {
  const bodyTitleLines = content.heroBodyTitle.split("\n");

  return (
    <>
      <SiteNavBar
        className="sticky top-0 z-50 h-[50px] bg-gradient-to-b from-[#141414]/65 to-[#0d0d0d]/55 px-5 backdrop-blur-[6px] lg:px-7"
        ctaHref={ctaHref}
        ctaLabel={ctaLabel}
        links={navLinks}
        logoSrc={logoSrc}
        logoLoading="eager"
      />
      <header className="relative bg-black">
      <div className="relative w-full overflow-hidden">
        <div className="relative isolate -mt-[50px] min-h-[100dvh] overflow-hidden rounded-b-[42px] pt-[50px] [transform:translateZ(0)] lg:h-[93vh] lg:min-h-[680px]">
          <div className="absolute inset-0 z-0">
            <DeferredVideo
              className="block h-full w-full rounded-b-[42px] object-cover"
              src={content.heroVideoPath}
              poster={content.heroVideoPosterPath}
              autoPlay
              muted
              loop
              playsInline
              loadStrategy="eager"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-[1] h-full w-full bg-gradient-to-b from-black/72 via-black/48 to-black/20" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-50px)] max-w-[1220px] flex-col justify-end px-4 pb-10 sm:px-6 sm:pb-12 lg:h-full lg:min-h-0 lg:px-6 lg:pb-16">
            <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-[5rem]">
              <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:gap-5">
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <RevealText
                    tag="p"
                    variant="eyebrow"
                    text={content.heroEyebrow}
                    rootMargin="0px"
                    className="font-[family-name:var(--font-body)] text-[clamp(1rem,2vw,1.65rem)] font-medium leading-[1.15] text-white"
                  />
                  <RevealText
                    tag="h1"
                    variant="headline"
                    text={content.heroHeadline}
                    rootMargin="0px"
                    className="mt-1 font-[family-name:var(--font-body)] not-italic text-[clamp(2.35rem,9vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white"
                  />
                </div>

                <div className="flex w-full min-w-0 max-w-[498px] flex-col gap-4 pt-1 lg:pt-2.5">
                  <div className="font-[family-name:var(--font-body)] text-[clamp(1rem,1.85vw,1.6rem)] font-semibold leading-[1.2] text-white">
                    {bodyTitleLines.map((line, i) => (
                      <RevealText
                        key={line}
                        tag="p"
                        variant="paragraph"
                        text={line}
                        rootMargin="0px"
                        className={i === 0 ? "mb-0" : undefined}
                      />
                    ))}
                  </div>
                  <RevealText
                    tag="p"
                    variant="paragraph"
                    text={content.heroBodyText}
                    rootMargin="0px"
                    className="font-[family-name:var(--font-body)] text-[14px] font-normal leading-[1.7] text-white/95 md:text-[15px]"
                  />
                </div>
              </div>

              <ScrollReveal className="w-full" y={20} delay={0.12}>
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 text-white sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:flex lg:flex-wrap lg:items-start lg:justify-between">
                  {content.heroServices.map(({ num, label }) => (
                    <div key={label} className="flex min-w-0 flex-col gap-1.5 sm:min-w-[140px]">
                      <p className="font-[family-name:var(--font-body)] text-sm font-semibold leading-tight">
                        {num}
                      </p>
                      <p className="font-[family-name:var(--font-body)] text-sm font-normal leading-snug">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-[2] rounded-b-[42px] ring-1 ring-white/15" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16 rounded-b-[42px] bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <ScrollReveal className="mt-[28px] w-full" y={18} delay={0.08}>
          <LogoMarquee logos={logos} />
        </ScrollReveal>
      </div>
    </header>
    </>
  );
}
