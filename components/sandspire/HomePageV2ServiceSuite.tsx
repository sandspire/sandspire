import Image from "next/image";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { HomePageV2FlippableServiceCard } from "@/components/sandspire/HomePageV2FlippableServiceCard";
import { HomePageV2ServiceFlowDiagram } from "@/components/sandspire/HomePageV2ServiceFlowDiagram";
import { RevealText } from "@/components/sandspire/RevealText";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WebDesignPortfolioCascade } from "@/components/sandspire/WebDesignPortfolioCascade";
import { cn } from "@/lib/utils";
import type { ServiceCardContent } from "@/lib/siteContentDefaults";
import { homepageV2ImageFallbacks, siteContentDefaults } from "@/lib/siteContentDefaults";

const brandStrategyImageRowsDefault = [
  ["/images/bento/top-1.webp", "/images/bento/top-2.webp"],
  ["/images/bento/middle-1.webp", "/images/bento/middle-2.webp", "/images/bento/middle-3.webp"],
  ["/images/bento/bottom-1.webp", "/images/bento/bottom-2.webp"],
];

function brandStrategyRowsFromFlat(paths: string[]) {
  if (paths.length < 7) return brandStrategyImageRowsDefault;
  return [paths.slice(0, 2), paths.slice(2, 5), paths.slice(5, 7)];
}

const bentoDesktopClass =
  "relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] bg-transparent lg:min-h-[229px]";

const bentoMobileClass =
  "relative h-[120px] overflow-hidden rounded-[14px] border border-[#414040]";

type HomePageV2ServiceSuiteProps = {
  title?: string;
  serviceCards?: ServiceCardContent[];
  analyticsVideoPath?: string;
  analyticsVideoPosterPath?: string;
  bentoCocktailImagePath?: string;
  bentoFoodImagePath?: string;
  brandStrategyImagePaths?: string[];
  serviceFlowDiagramImagePath?: string;
};

function BentoPhoto({
  src,
  alt,
  compact = false,
  className,
}: {
  src: string;
  alt: string;
  compact?: boolean;
  className?: string;
}) {
  const shell = compact ? bentoMobileClass : bentoDesktopClass;

  if (!src) {
    return <article className={cn(shell, className)} aria-hidden />;
  }

  return (
    <article className={cn(shell, "relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={compact ? "120px" : "(min-width: 1024px) 300px, 50vw"}
      />
    </article>
  );
}

function FlippableCard({
  card,
  compact = false,
  className,
}: {
  card: ServiceCardContent;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <HomePageV2FlippableServiceCard
        title={card.title}
        description={card.flipDescription ?? card.description ?? ""}
        compact={compact}
      />
    </div>
  );
}

function AnalyticsBentoCard({
  analyticsVideoPath,
  analyticsVideoPosterPath,
  compact = false,
  className,
}: {
  analyticsVideoPath: string;
  analyticsVideoPosterPath: string;
  compact?: boolean;
  className?: string;
}) {
  const shell = compact ? bentoMobileClass : bentoDesktopClass;

  return (
    <article className={cn(shell, "bg-[#141414]", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className={cn(
            "absolute bottom-0 left-1/2 aspect-square -translate-x-1/2 translate-y-[50%] rounded-full bg-gradient-to-t from-[#e63b12] via-[#ff7a18] to-[#ffd23f]",
            compact ? "w-[116%]" : "w-[105%]",
          )}
        />
      </div>
      <div className={cn("absolute inset-x-0 z-10", compact ? "top-2 bottom-0" : "top-5 bottom-0")}>
        <DeferredVideo
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-[14px] rounded-b-none object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
            compact
              ? "h-[95px] w-[88px]"
              : "h-[185px] w-[min(58%,200px)] lg:h-[203px] lg:w-[min(58%,220px)] lg:rounded-t-[16px]",
          )}
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
  );
}

function DiagramBentoCard({
  compact = false,
  className,
  diagramSrc,
}: {
  compact?: boolean;
  className?: string;
  diagramSrc?: string;
}) {
  const shell = compact ? bentoMobileClass : bentoDesktopClass;

  return (
    <article
      className={cn(
        shell,
        "flex items-center justify-center",
        compact ? "bg-[#0b1013] px-[5px]" : "px-[5px]",
        className,
      )}
    >
      {compact ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-lighten"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,119,0,0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(78,120,255,0.2), transparent 55%)",
          }}
        />
      ) : null}
      <HomePageV2ServiceFlowDiagram
        diagramSrc={diagramSrc}
        className={cn(
          "relative z-10",
          compact ? "h-[60px] sm:h-[64px]" : undefined,
        )}
      />
    </article>
  );
}

function BrandStrategyBentoCard({
  compact = false,
  className,
  imageRows = brandStrategyImageRowsDefault,
}: {
  compact?: boolean;
  className?: string;
  imageRows?: string[][];
}) {
  const shell = compact ? bentoMobileClass : bentoDesktopClass;

  return (
    <article className={cn(shell.replace("bg-transparent", ""), "bg-[#e07725]", className)}>
      <WebDesignPortfolioCascade
        imageRows={imageRows}
        className="absolute inset-0"
        rows={3}
        maxPerRow={4}
        variant="compact"
      />
    </article>
  );
}

export function HomePageV2ServiceSuite({
  title = siteContentDefaults.homepageV2.servicesTitle,
  serviceCards = siteContentDefaults.homepageV2.serviceCards,
  analyticsVideoPath = siteContentDefaults.homepageV2.analyticsVideoPath,
  analyticsVideoPosterPath = siteContentDefaults.homepageV2.analyticsVideoPosterPath,
  bentoCocktailImagePath = siteContentDefaults.homepageV2.bentoCocktailImagePath,
  bentoFoodImagePath = siteContentDefaults.homepageV2.bentoFoodImagePath,
  brandStrategyImagePaths = siteContentDefaults.homepageV2.brandStrategyImagePaths,
  serviceFlowDiagramImagePath = siteContentDefaults.homepageV2.serviceFlowDiagramImagePath,
}: HomePageV2ServiceSuiteProps) {
  const [card1, card2, card3, card4, card5] = serviceCards;
  const cocktailSrc =
    bentoCocktailImagePath?.trim() || homepageV2ImageFallbacks.bentoCocktail;
  const foodSrc = bentoFoodImagePath?.trim() || homepageV2ImageFallbacks.bentoFood;
  const brandStrategyRows = brandStrategyRowsFromFlat(brandStrategyImagePaths);
  const diagramSrc = serviceFlowDiagramImagePath?.trim() || "/images/Service%20Icon%20Group.svg";

  return (
    <section id="services" className="relative py-16 min-[554px]:px-6 lg:px-8 lg:py-24">
      <div className="px-6 min-[554px]:px-0">
        <div className="mx-auto max-w-[938px] text-center">
          <RevealText
            tag="h2"
            variant="headline"
            text={title}
            textAlign="center"
            className="home2-section-title font-display text-[clamp(2.25rem,5vw,3.45rem)] font-normal leading-tight text-white not-italic [text-shadow:0_4px_4px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>

      {/* Mobile — Figma iPhone layout: 3-column bento below 554px only */}
      <ScrollReveal
        className="service-suite-bento mt-[30px] grid w-full grid-cols-3 gap-x-2 gap-y-1.5 px-3 font-body min-[554px]:hidden sm:gap-x-2.5 sm:px-4"
        delay={0.04}
      >
        <AnalyticsBentoCard
          compact
          className="col-span-2"
          analyticsVideoPath={analyticsVideoPath}
          analyticsVideoPosterPath={analyticsVideoPosterPath}
        />
        {card1 ? <FlippableCard card={card1} compact /> : null}

        <DiagramBentoCard compact diagramSrc={diagramSrc} />
        {card2 ? <FlippableCard card={card2} compact /> : null}
        <BentoPhoto src={foodSrc} alt="" compact />

        {card4 ? <FlippableCard card={card4} compact /> : null}
        <BrandStrategyBentoCard compact className="col-span-2" imageRows={brandStrategyRows} />

        <BentoPhoto src={cocktailSrc} alt="" compact />
        {card3 ? <FlippableCard card={card3} compact /> : null}
        {card5 ? <FlippableCard card={card5} compact /> : null}
      </ScrollReveal>

      {/* Desktop — multi-row bento from 554px up */}
      <div className="service-suite-bento mx-auto mt-10 hidden w-full max-w-[938px] gap-3 font-body min-[554px]:grid lg:gap-4">
        <ScrollReveal
          className="grid gap-3 min-[554px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4"
          delay={0.04}
        >
          <AnalyticsBentoCard
            analyticsVideoPath={analyticsVideoPath}
            analyticsVideoPosterPath={analyticsVideoPosterPath}
          />
          {card1 ? <FlippableCard card={card1} /> : null}
          <BentoPhoto src={cocktailSrc} alt="" />
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-3 min-[554px]:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          delay={0.08}
        >
          <DiagramBentoCard diagramSrc={diagramSrc} />
          {card2 ? <FlippableCard card={card2} /> : null}
          <BentoPhoto src={foodSrc} alt="" />
          {card3 ? <FlippableCard card={card3} /> : null}
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-3 min-[554px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-4"
          delay={0.12}
        >
          {card4 ? <FlippableCard card={card4} /> : null}
          <BrandStrategyBentoCard imageRows={brandStrategyRows} />
          {card5 ? <FlippableCard card={card5} /> : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
