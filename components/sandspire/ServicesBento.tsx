import Image from "next/image";
import type { ReactNode } from "react";
import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { HomePageV2ServiceFlowDiagram } from "@/components/sandspire/HomePageV2ServiceFlowDiagram";
import { SandspireBorderGlow } from "@/components/sandspire/SandspireBorderGlow";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WebDesignPortfolioCascade } from "@/components/sandspire/WebDesignPortfolioCascade";
import type { ServiceCardContent } from "@/lib/siteContentDefaults";
import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { cn } from "@/lib/utils";

const socialBentoGradientBg = "/images/bento/social-media-gradient-bg.png";

const bentoMobileInner =
  "relative h-[120px] overflow-hidden rounded-[inherit]";

function BentoGlow({
  children,
  backgroundColor,
  borderRadius = 14,
  className,
}: {
  children: ReactNode;
  backgroundColor: string;
  borderRadius?: number;
  className?: string;
}) {
  return (
    <SandspireBorderGlow
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      className={cn("h-full min-h-0", className)}
      fillOpacity={0.4}
    >
      {children}
    </SandspireBorderGlow>
  );
}

function webDesignImageRows(images: string[]) {
  if (images.length >= 9) {
    return [images.slice(0, 3), images.slice(3, 6), images.slice(6, 9)];
  }
  if (images.length >= 6) {
    return [images.slice(0, 2), images.slice(2, 4), images.slice(4, 6)];
  }
  const rows = [
    images.slice(0, 2),
    images.slice(2, 4),
    images.slice(4, 6),
  ].filter((row) => row.length > 0);
  return rows.length ? rows : [[], [], []];
}

type ServicesBentoProps = {
  eyebrow?: string;
  title?: string;
  serviceCards?: ServiceCardContent[];
  analyticsVideoPath?: string;
  analyticsVideoPosterPath?: string;
  /** Web Design card preview images (Sanity CDN). */
  webDesignImages?: string[];
  serviceFlowDiagramImagePath?: string;
};

function findCard(cards: ServiceCardContent[], title: string) {
  return cards.find((c) => c.title === title || c.title.replace("\n", " ") === title.replace("\n", " "));
}

export function ServicesBento({
  eyebrow = siteContentDefaults.homepage.servicesEyebrow,
  title = siteContentDefaults.homepage.servicesTitle,
  serviceCards = siteContentDefaults.homepage.serviceCards,
  analyticsVideoPath = siteContentDefaults.homepage.analyticsVideoPath,
  analyticsVideoPosterPath = siteContentDefaults.homepage.analyticsVideoPosterPath,
  webDesignImages: webDesignImagesProp,
  serviceFlowDiagramImagePath = siteContentDefaults.homepage.serviceFlowDiagramImagePath,
}: ServicesBentoProps) {
  const analyticsCard = serviceCards[0];
  const aiCard = findCard(serviceCards, "AI Automation");
  const webCard = findCard(serviceCards, "Web Design");
  const socialCard = findCard(serviceCards, "Social Media Marketing");
  const analyticsTitleLines = (analyticsCard?.title ?? "See real results\nyou can measure").split("\n");
  const webDesignImages = webDesignImagesProp?.length ? webDesignImagesProp : [];
  const diagramSrc = serviceFlowDiagramImagePath?.trim() || "/images/Service%20Icon%20Group.svg";

  return (
    <section
      id="services"
      className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-12"
    >
      <ScrollReveal className="mx-auto w-full max-w-[1180px]">
        <p className="text-xs font-normal uppercase tracking-[0.14px] text-[#ff5e00]">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-body)] not-italic text-[30px] font-light leading-[1.05] tracking-[-0.02em] text-[#faf3e8] lg:text-[32px]">
          {title}
        </h2>

        {/* Mobile — compact 3-column bento (matches /home-2 density) */}
        <div className="services-bento-mobile mt-8 grid grid-cols-3 gap-x-2 gap-y-1.5 min-[554px]:hidden sm:gap-x-2.5">
          <MobileAnalyticsCard
            className="col-span-2"
            titleLines={analyticsTitleLines}
            analyticsVideoPath={analyticsVideoPath}
            analyticsVideoPosterPath={analyticsVideoPosterPath}
          />
          <MobileDiagramCard diagramSrc={diagramSrc} />

          <MobileWebDesignCard
            className="col-span-2"
            title={webCard?.title ?? "Web Design"}
            priceLine={webCard?.priceLine ?? "From AED 5,000"}
            imageRows={webDesignImageRows(webDesignImages)}
          />
          <MobileSocialCard
            title={socialCard?.title ?? "Social Media Marketing"}
            priceLine={socialCard?.priceLine ?? "From AED 5,000"}
          />

          <MobileServiceTile
            title={aiCard?.title ?? "AI Automation"}
            priceLine={aiCard?.priceLine ?? "From AED 10,000"}
          />
          <MobileServiceTile
            title={webCard?.title ?? "Web Design"}
            priceLine={webCard?.priceLine ?? "From AED 5,000"}
          />
          <MobileServiceTile
            title={socialCard?.title ?? "Social Media Marketing"}
            priceLine={socialCard?.priceLine ?? "From AED 5,000"}
          />
        </div>

        <div className="mt-8 hidden max-md:pt-2 min-[554px]:grid gap-4 lg:grid-cols-[minmax(0,760px)_minmax(252px,380px)] lg:items-stretch lg:gap-4 xl:mt-10 2xl:gap-5">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 self-stretch xl:h-full">
            <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 md:items-stretch">
              <ServiceMediaCard
                className="h-full min-h-[360px] md:min-h-[400px]"
                priceLine=""
                title=""
                accent="from-[#A31F11]/80 to-[#FF5E00]/80"
                titleClassName="max-w-[260px] max-md:mb-4 font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[24px]"
                contentClassName="pb-[calc(1.5rem-18px)]"
                titleNode={
                  <>
                    {analyticsTitleLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < analyticsTitleLines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </>
                }
              >
                <div className="pointer-events-none absolute inset-x-0 bottom-[-28px] top-[28%] overflow-hidden md:top-[30%]">
                  <div className="absolute bottom-[20px] left-1/2 h-[268px] w-[min(640px,calc(100%-1.25rem))] max-w-full -translate-x-1/2 overflow-hidden rounded-t-[26px] rounded-b-[14px] shadow-[0_3px_3px_rgba(0,0,0,0.25)] md:bottom-[26px] md:h-[248px] md:w-[min(620px,calc(100%-2.5rem))]">
                    <div
                      className="absolute inset-x-3 top-3 h-[calc(100%-18px)] rounded-[18px] bg-black/10 md:inset-x-4"
                      aria-hidden
                    />
                    <DeferredVideo
                      className="absolute bottom-0 left-1/2 h-[520px] w-full min-w-full max-w-none -translate-x-1/2 object-cover object-bottom"
                      src={analyticsVideoPath}
                      poster={analyticsVideoPosterPath}
                      autoPlay
                      muted
                      loop
                      playsInline
                      loadStrategy="visible"
                    />
                  </div>
                </div>
              </ServiceMediaCard>

              <ServiceInfoCard
                className="h-full min-h-[320px] md:min-h-[380px]"
                title={aiCard?.title ?? "AI Automation"}
                priceLine={aiCard?.priceLine ?? "Starting from AED 10,000"}
              >
                <Image
                  src={diagramSrc}
                  alt=""
                  width={246}
                  height={210}
                  className="relative z-[1] mx-auto mt-3 h-[180px] w-auto rounded-[12px] object-contain opacity-95 md:mt-4 md:h-[210px]"
                  loading="lazy"
                />
              </ServiceInfoCard>
            </div>

            <SandspireBorderGlow
              borderRadius={24}
              backgroundColor="#141414"
              className="flex min-h-[400px] flex-1 flex-col md:min-h-[460px]"
              fillOpacity={0.35}
            >
              <div
                className="relative flex h-full min-h-[inherit] flex-1 flex-col overflow-hidden rounded-[inherit]"
                style={{
                  backgroundImage:
                    "linear-gradient(158deg, rgba(255,252,252,0.05) 2.12%, rgba(16,16,16,0.26) 97.84%)",
                }}
              >
              {/* Full-bleed website cascade — fills the whole card, no empty spots */}
              <WebDesignPortfolioCascade
                images={webDesignImages}
                className="absolute inset-0 pt-[120px]"
                rows={3}
                maxPerRow={3}
              />
              {/* Scrim for title legibility over the imagery */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black/70 via-black/35 to-transparent" />
              <div className="relative z-[2] p-5 pt-8 md:pt-9">
                <p className="font-[family-name:var(--font-body)] text-[12px] font-normal text-white/90 md:text-[13px]">
                  {webCard?.priceLine ?? "Starting from AED 5,000"}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[24px]">
                  {webCard?.title ?? "Web Design"}
                </h3>
              </div>
              </div>
            </SandspireBorderGlow>
          </div>

          <ServiceMediaCard
            className="h-full min-h-[480px] w-full xl:min-h-[720px]"
            backgroundImageSrc={socialBentoGradientBg}
            title={socialCard?.title ?? "Social Media Marketing"}
            priceLine={socialCard?.priceLine ?? "Starting from AED 5,000"}
            titleClassName="font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.15] tracking-[-0.02em] text-white md:text-[24px]"
            footerBleed
          >
            <div className="relative z-[1] flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden pb-0 pt-2">
              <DeferredVideo
                className="relative z-[1] mx-auto h-[min(360px,42vh)] w-[min(100%,100%)] max-w-[min(400px,92vw)] shrink-0 rounded-[20px] object-cover object-bottom shadow-[0_3px_12px_rgba(0,0,0,0.44)] sm:max-w-[min(420px,90%)] md:h-[560px] md:max-w-none md:w-[280px]"
                src={analyticsVideoPath}
                poster={analyticsVideoPosterPath}
                autoPlay
                muted
                loop
                playsInline
                loadStrategy="visible"
              />
            </div>
          </ServiceMediaCard>
        </div>
      </ScrollReveal>
    </section>
  );
}

function MobileServiceTile({
  title,
  priceLine,
  className,
}: {
  title: string;
  priceLine?: string;
  className?: string;
}) {
  return (
    <BentoGlow backgroundColor="#141414" className={className}>
      <article
        className={cn(
          bentoMobileInner,
          "flex flex-col justify-between bg-[#141414] p-[11px]",
        )}
        style={{
          backgroundImage:
            "linear-gradient(140deg, rgba(255,252,252,0.05) 2.12%, rgba(16,16,16,0.26) 97.84%)",
        }}
      >
      <h3 className="font-[family-name:var(--font-body)] text-[11px] font-medium leading-[1.45] text-[#faf3e8] sm:text-[12px]">
        {title.replace("\n", " ")}
      </h3>
      {priceLine ? (
        <p className="font-[family-name:var(--font-body)] text-[10px] font-normal text-white/70 sm:text-[11px]">
          {priceLine}
        </p>
      ) : null}
      </article>
    </BentoGlow>
  );
}

function MobileAnalyticsCard({
  titleLines,
  analyticsVideoPath,
  analyticsVideoPosterPath,
  className,
}: {
  titleLines: string[];
  analyticsVideoPath: string;
  analyticsVideoPosterPath: string;
  className?: string;
}) {
  return (
    <BentoGlow backgroundColor="#141414" className={className}>
      <article className={cn(bentoMobileInner, "bg-[#141414]")}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute bottom-0 left-1/2 aspect-square w-[72%] -translate-x-1/2 translate-y-[58%] rounded-full bg-gradient-to-t from-[#e63b12] via-[#ff7a18] to-[#ffd23f]" />
      </div>
      <div className="absolute inset-x-0 top-2 z-10 px-[11px]">
        <h3 className="font-[family-name:var(--font-body)] text-[11px] font-medium leading-[1.35] text-white sm:text-[12px]">
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h3>
      </div>
      <div className="absolute inset-x-0 top-8 bottom-0 z-10 flex items-end justify-end pb-0 pr-0">
        <DeferredVideo
          className="h-[109px] w-[101px] -translate-x-[30px] rounded-t-[14px] rounded-b-none object-cover object-top shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
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
    </BentoGlow>
  );
}

function MobileDiagramCard({
  diagramSrc,
  className,
}: {
  diagramSrc: string;
  className?: string;
}) {
  return (
    <BentoGlow backgroundColor="#0b1013" className={className}>
      <article className={cn(bentoMobileInner, "flex items-center justify-center bg-[#0b1013] px-[5px]")}>
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-lighten"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255,119,0,0.35), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 80%, rgba(78,120,255,0.2), transparent 55%)",
        }}
      />
      <HomePageV2ServiceFlowDiagram diagramSrc={diagramSrc} className="relative z-10 h-[60px] sm:h-[64px]" />
      </article>
    </BentoGlow>
  );
}

function MobileWebDesignCard({
  title,
  priceLine,
  imageRows,
  className,
}: {
  title: string;
  priceLine?: string;
  imageRows: string[][];
  className?: string;
}) {
  return (
    <BentoGlow backgroundColor="#e07725" className={className}>
      <article className={cn(bentoMobileInner, "bg-[#e07725]")}>
      <WebDesignPortfolioCascade
        imageRows={imageRows}
        className="absolute inset-x-0 bottom-0 top-[32px]"
        rows={3}
        maxPerRow={3}
        variant="compact"
        fitMobileBento
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-black/75 to-transparent" />
      <div className="relative z-[2] p-[11px]">
        {priceLine ? (
          <p className="font-[family-name:var(--font-body)] text-[10px] font-normal text-white/90 sm:text-[11px]">
            {priceLine}
          </p>
        ) : null}
        <h3 className="mt-0.5 font-[family-name:var(--font-body)] text-[11px] font-medium leading-[1.35] text-white sm:text-[12px]">
          {title}
        </h3>
      </div>
      </article>
    </BentoGlow>
  );
}

function MobileSocialCard({
  title,
  priceLine,
  className,
}: {
  title: string;
  priceLine?: string;
  className?: string;
}) {
  return (
    <BentoGlow backgroundColor="#0d0d0d" className={className}>
      <article className={cn(bentoMobileInner, "flex flex-col bg-[#0d0d0d] p-[11px]")}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute bottom-[-42%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#e63b12] via-[#ff7a18] to-[#ffd23f]" />
      </div>
      <div className="relative z-10">
        <h3 className="font-[family-name:var(--font-body)] text-[11px] font-medium leading-[1.35] text-white sm:text-[12px]">
          {title.replace("\n", " ")}
        </h3>
      </div>
      {priceLine ? (
        <p className="relative z-10 mt-auto font-[family-name:var(--font-body)] text-[10px] font-normal text-white/90 sm:text-[11px]">
          {priceLine}
        </p>
      ) : null}
      </article>
    </BentoGlow>
  );
}

function ServiceMediaCard(props: {
  className?: string;
  title: string;
  priceLine: string;
  accent?: string;
  titleNode?: ReactNode;
  titleClassName?: string;
  glassPanel?: boolean;
  /** Brighter glass + warm radial glow across the full card (Figma 153:1948). */
  vibrantFullBleed?: boolean;
  /** Full-card background image (e.g. social bento gradient). */
  backgroundImageSrc?: string;
  /** Net −10px bottom padding vs default `p-6` (14px bottom). */
  contentClassName?: string;
  /** Use flex column so footer children can `mt-auto` to the card bottom. */
  footerBleed?: boolean;
  children?: React.ReactNode;
}) {
  const {
    className = "",
    title,
    priceLine,
    accent = "from-[#141414]/80 to-[#232323]/75",
    titleNode,
    titleClassName = "font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[24px]",
    glassPanel,
    vibrantFullBleed,
    backgroundImageSrc,
    contentClassName = "",
    footerBleed,
    children,
  } = props;

  return (
    <SandspireBorderGlow
      borderRadius={24}
      backgroundColor="#141414"
      className={cn("h-full", className)}
      fillOpacity={0.35}
    >
      <div className="relative h-full min-h-[inherit] overflow-hidden rounded-[inherit]">
      {backgroundImageSrc ? (
        <Image
          src={backgroundImageSrc}
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 1024px) 100vw, 380px"
        />
      ) : (
        <>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      {vibrantFullBleed ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(122deg, rgba(255,252,252,0.12) 2.12%, rgba(255,120,70,0.14) 42%, rgba(16,16,16,0.18) 97.84%)",
            }}
          />
          <div
            className="pointer-events-none absolute -left-[28%] -top-[20%] h-[125%] w-[135%] bg-[radial-gradient(ellipse_58%_56%_at_42%_92%,rgba(255,100,45,0.72)_0%,rgba(195,45,22,0.48)_38%,transparent_72%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-[22%] -top-[8%] h-[95%] w-[110%] bg-[radial-gradient(ellipse_52%_48%_at_78%_32%,rgba(255,180,90,0.5)_0%,rgba(255,94,0,0.22)_45%,transparent_68%)]"
            aria-hidden
          />
        </>
      ) : null}
      {glassPanel ? (
        <div
          className="absolute inset-0 opacity-95"
          style={{
            backgroundImage: vibrantFullBleed
              ? "linear-gradient(145deg, rgba(255,252,252,0.1) 0%, rgba(40,12,6,0.12) 55%, rgba(10,6,6,0.2) 100%)"
              : "linear-gradient(122deg, rgba(255,252,252,0.05) 2.12%, rgba(16,16,16,0.08) 97.84%)",
          }}
        />
      ) : null}
      <div
        className={`absolute inset-0 ${glassPanel ? (vibrantFullBleed ? "bg-black/5" : "bg-black/10") : "bg-black/20"}`}
      />
        </>
      )}
      <div
        className={`relative flex h-full min-h-0 flex-col p-5 pt-8 md:pt-9 ${footerBleed ? "min-h-[inherit] pb-0" : ""} ${contentClassName}`}
      >
        {priceLine ? (
          <p className="font-[family-name:var(--font-body)] text-[12px] font-normal text-white/90 md:text-[13px]">
            {priceLine}
          </p>
        ) : null}
        {titleNode ? (
          <h3 className={`mt-1 ${titleClassName}`}>{titleNode}</h3>
        ) : title ? (
          <h3 className={`mt-1 ${titleClassName}`}>{title}</h3>
        ) : null}
        {children}
      </div>
      </div>
    </SandspireBorderGlow>
  );
}

function ServiceInfoCard(props: {
  className?: string;
  title: string;
  priceLine: string;
  children?: React.ReactNode;
}) {
  const { className = "", title, priceLine, children } = props;

  return (
    <SandspireBorderGlow
      borderRadius={24}
      backgroundColor="#141414"
      className={cn("h-full", className)}
      fillOpacity={0.35}
    >
      <div className="relative h-full min-h-[inherit] overflow-hidden rounded-[inherit] bg-transparent">
      <div className="relative flex h-full flex-col p-5 pt-8 md:pt-9">
        {priceLine ? (
          <p className="font-[family-name:var(--font-body)] text-[12px] font-normal text-white/90 md:text-[13px]">
            {priceLine}
          </p>
        ) : null}
        {title ? (
          <h3 className="mt-1 font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[24px]">
            {title}
          </h3>
        ) : null}
        <div className="mt-3 flex min-h-0 max-md:mt-4 flex-1 flex-col items-center justify-center pb-2 md:mt-4 md:pb-3">
          {children}
        </div>
      </div>
      </div>
    </SandspireBorderGlow>
  );
}
