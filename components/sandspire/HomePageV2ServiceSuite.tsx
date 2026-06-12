import Image from "next/image";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { HomePageV2FlippableServiceCard } from "@/components/sandspire/HomePageV2FlippableServiceCard";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WebDesignPortfolioCascade } from "@/components/sandspire/WebDesignPortfolioCascade";
import type { ServiceCardContent } from "@/lib/siteContentDefaults";
import { siteContentDefaults } from "@/lib/siteContentDefaults";

const brandStrategyImages = [
  "/images/bento/Frame%201618872692-1.svg",
  "/images/bento/Frame%201618872694-1.svg",
  "/images/bento/Frame%201618872695-1.svg",
  "/images/bento/Frame%201618872693-1.svg",
  "/images/bento/Frame%201618872692.svg",
  "/images/bento/Frame%201618872694.svg",
  "/images/bento/Frame%201618872695.svg",
  "/images/bento/Frame%201618872693.svg",
];

const bentoMediaClass =
  "relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] bg-transparent lg:min-h-[229px]";

const bentoPhotoClass = `${bentoMediaClass} p-3 lg:p-3.5`;

type HomePageV2ServiceSuiteProps = {
  title?: string;
  serviceCards?: ServiceCardContent[];
  analyticsVideoPath?: string;
  analyticsVideoPosterPath?: string;
  bentoCocktailImagePath?: string;
  bentoFoodImagePath?: string;
};

function BentoPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <article className={bentoPhotoClass}>
      <div className="relative size-full min-h-[176px] overflow-hidden rounded-[18px] lg:min-h-[205px]">
        <Image src={src} alt={alt} fill className="object-cover object-center" sizes="220px" />
      </div>
    </article>
  );
}

function FlippableCard({ card }: { card: ServiceCardContent }) {
  return (
    <HomePageV2FlippableServiceCard
      title={card.title}
      description={card.flipDescription ?? card.description ?? ""}
    />
  );
}

export function HomePageV2ServiceSuite({
  title = siteContentDefaults.homepageV2.servicesTitle,
  serviceCards = siteContentDefaults.homepageV2.serviceCards,
  analyticsVideoPath = siteContentDefaults.homepageV2.analyticsVideoPath,
  analyticsVideoPosterPath = siteContentDefaults.homepageV2.analyticsVideoPosterPath,
  bentoCocktailImagePath = siteContentDefaults.homepageV2.bentoCocktailImagePath,
  bentoFoodImagePath = siteContentDefaults.homepageV2.bentoFoodImagePath,
}: HomePageV2ServiceSuiteProps) {
  const [card1, card2, card3, card4, card5] = serviceCards;

  return (
    <section id="services" className="relative px-6 py-16 lg:px-8 lg:py-24">
      <ScrollReveal className="mx-auto max-w-[938px] text-center">
        <h2 className="home2-section-title font-display text-[clamp(2.25rem,5vw,3.45rem)] font-normal leading-tight text-white not-italic [text-shadow:0_4px_4px_rgba(0,0,0,0.55)]">
          {title}
        </h2>
      </ScrollReveal>

      <div className="service-suite-bento mx-auto mt-10 grid w-full max-w-[938px] gap-3 font-body lg:gap-4">
        <ScrollReveal className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4" delay={0.04}>
          <article className={`${bentoMediaClass} bg-[#141414]`}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute bottom-0 left-1/2 aspect-square w-[140%] -translate-x-1/2 translate-y-[50%] rounded-full bg-gradient-to-t from-[#e63b12] via-[#ff7a18] to-[#ffd23f]" />
            </div>
            <div className="absolute inset-x-0 top-5 bottom-0 z-10">
              <DeferredVideo
                className="absolute bottom-0 left-1/2 h-[185px] w-[min(58%,200px)] -translate-x-1/2 rounded-t-[14px] rounded-b-none object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,0.35)] lg:h-[203px] lg:w-[min(58%,220px)] lg:rounded-t-[16px]"
                src={analyticsVideoPath}
                poster={analyticsVideoPosterPath}
                autoPlay
                muted
                loop
                playsInline
                loadStrategy="visible"
              />
            </div>
          </article>
          {card1 ? <FlippableCard card={card1} /> : null}
          <BentoPhoto src={bentoCocktailImagePath} alt="" />
        </ScrollReveal>

        <ScrollReveal className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4" delay={0.08}>
          <article className={cnArticleCenter(bentoMediaClass)}>
            <Image
              src="/images/Service%20Icon%20Group.svg"
              alt=""
              width={190}
              height={114}
              className="h-[87px] w-auto opacity-95 sm:h-[102px] md:h-[117px] lg:h-[122px]"
            />
          </article>
          {card2 ? <FlippableCard card={card2} /> : null}
          <BentoPhoto src={bentoFoodImagePath} alt="" />
          {card3 ? <FlippableCard card={card3} /> : null}
        </ScrollReveal>

        <ScrollReveal className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-4" delay={0.12}>
          {card4 ? <FlippableCard card={card4} /> : null}
          <article className={`${bentoMediaClass} bg-[#e07725]`}>
            <WebDesignPortfolioCascade
              images={brandStrategyImages}
              className="absolute inset-0"
              rows={3}
              maxPerRow={4}
              variant="compact"
            />
          </article>
          {card5 ? <FlippableCard card={card5} /> : null}
        </ScrollReveal>
      </div>
    </section>
  );
}

function cnArticleCenter(className: string) {
  return `${className} flex items-center justify-center`;
}
