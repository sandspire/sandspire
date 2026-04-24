import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WebDesignPortfolioCascade } from "@/components/sandspire/WebDesignPortfolioCascade";

const AI_DOT_MATRIX = "/images/bento/ai-automation-dot-matrix.png";

export function ServicesBento() {
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

  return (
    <section
      id="services"
      className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-12"
    >
      <ScrollReveal className="mx-auto w-full max-w-[1180px]">
        <p className="text-xs font-normal uppercase tracking-[0.14px] text-[var(--accent)]">
          Agency Services
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[30px] font-light leading-[1.05] tracking-[-0.02em] text-[var(--foreground)] lg:text-[32px]">
          What we do
        </h2>

        <div className="mt-8 max-md:pt-2 grid gap-4 lg:grid-cols-1 lg:items-stretch xl:mt-10 xl:grid-cols-[minmax(0,760px)_minmax(252px,380px)] xl:gap-4 2xl:gap-5">
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
                    See real results
                    <br />
                    you can measure
                  </>
                }
              >
                <div className="pointer-events-none absolute inset-x-0 bottom-[-28px] top-[28%] overflow-hidden md:top-[30%]">
                  <div className="absolute bottom-[20px] left-1/2 h-[268px] w-[min(640px,calc(100%-1.25rem))] max-w-full -translate-x-1/2 overflow-hidden rounded-t-[26px] rounded-b-[14px] shadow-[0_3px_3px_rgba(0,0,0,0.25)] md:bottom-[26px] md:h-[248px] md:w-[min(620px,calc(100%-2.5rem))]">
                    <div
                      className="absolute inset-x-3 top-3 h-[calc(100%-18px)] rounded-[18px] bg-black/10 md:inset-x-4"
                      aria-hidden
                    />
                    <video
                      className="absolute bottom-0 left-1/2 h-[520px] w-full min-w-full max-w-none -translate-x-1/2 object-cover object-bottom"
                      src="/videos/InstagramViewsAnalytics.mp4"
                      poster="/images/InstagramViewsAnalyticsFallback2.png"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                </div>
              </ServiceMediaCard>

              <ServiceInfoCard
                className="h-full min-h-[320px] md:min-h-[380px]"
                title="AI Automation"
                priceLine="Starting from AED 10,000"
                patternImage={AI_DOT_MATRIX}
              >
                <img
                  src="/images/Service%20Icon%20Group.svg"
                  alt=""
                  className="relative z-[1] mx-auto mt-3 h-[180px] w-auto rounded-[12px] object-contain opacity-95 md:mt-4 md:h-[210px]"
                  loading="lazy"
                />
              </ServiceInfoCard>
            </div>

            <div
              className="relative flex min-h-[400px] flex-1 flex-col overflow-hidden rounded-[24px] border border-[#818181]/75 shadow-[0_3px_3px_rgba(0,0,0,0.25) md:min-h-[460px]"
              style={{
                backgroundImage:
                  "linear-gradient(158deg, rgba(255,252,252,0.05) 2.12%, rgba(16,16,16,0.26) 97.84%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_48%)]" />
              <div className="relative flex min-h-0 flex-1 flex-col gap-6 p-5 pt-8 max-md:gap-7 md:flex-row md:gap-0 md:pt-9">
                <div className="shrink-0 max-md:mb-1 md:max-w-[180px] md:pr-3">
                  <p className="font-[family-name:var(--font-body)] text-[12px] font-normal text-white/90 md:text-[13px]">
                    Starting from AED 5,000
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.1] tracking-[-0.02em] text-white md:text-[24px]">
                    Web Design
                  </h3>
                </div>
                <div className="relative min-h-[200px] w-full min-w-0 flex-1 self-stretch overflow-hidden max-md:-mx-5 max-md:mt-1 max-md:min-h-[220px] md:min-h-0">
                  <WebDesignPortfolioCascade
                    images={brandStrategyImages}
                    className="absolute inset-0 min-h-[220px] md:min-h-0"
                    rows={3}
                    maxPerRow={2}
                  />
                </div>
              </div>
            </div>
          </div>

          <ServiceMediaCard
            className="h-full min-h-[480px] w-full xl:min-h-[720px]"
            title="Social Media Marketing"
            priceLine="Starting from AED 5,000"
            accent="from-[#1c0c08]/25 via-[#2a100a]/35 to-[#140505]/50"
            titleClassName="font-[family-name:var(--font-body)] text-[22px] font-light leading-[1.15] tracking-[-0.02em] text-white md:text-[24px]"
            glassPanel
            vibrantFullBleed
            footerBleed
          >
            <div className="relative z-[1] flex w-full min-h-0 flex-1 flex-col items-center justify-center overflow-hidden pb-0 pt-2">
              <div
                className="pointer-events-none absolute -left-[22%] bottom-[-18%] h-[78%] w-[162%] opacity-55 md:bottom-[-12%]"
                aria-hidden
              >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,94,0,0.45)_0%,transparent_68%)] blur-[2px]" />
              </div>
              <div
                className="pointer-events-none absolute -left-[18%] bottom-[-8%] h-[72%] w-[155%] opacity-40 md:opacity-45"
                aria-hidden
              >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_40%_60%,rgba(163,31,17,0.5)_0%,transparent_65%)]" />
              </div>
              <video
                className="relative z-[1] mx-auto h-[min(360px,42vh)] w-[min(100%,100%)] max-w-[min(400px,92vw)] shrink-0 rounded-[20px] object-cover object-bottom shadow-[0_3px_12px_rgba(0,0,0,0.44)] sm:max-w-[min(420px,90%)] md:h-[560px] md:max-w-none md:w-[280px]"
                src="/videos/InstagramViewsAnalytics.mp4"
                poster="/images/InstagramViewsAnalyticsFallback2.png"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </ServiceMediaCard>
        </div>
      </ScrollReveal>
    </section>
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
    contentClassName = "",
    footerBleed,
    children,
  } = props;

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-[#818181]/75 shadow-[0_3px_3px_rgba(0,0,0,0.25)] ${className}`}
    >
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
  );
}

function ServiceInfoCard(props: {
  className?: string;
  title: string;
  priceLine: string;
  patternImage?: string;
  children?: React.ReactNode;
}) {
  const { className = "", title, priceLine, patternImage, children } = props;

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-[#818181]/75 shadow-[0_3px_3px_rgba(0,0,0,0.25)] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(140deg, rgba(255,252,252,0.05) 2.12%, rgba(16,16,16,0.26) 97.84%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_48%)]" />
      {patternImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute"
            style={{
              left: "69%",
              top: "62%",
              width: "300%",
              height: "155%",
              transform: "translate(-50%, -50%) scaleY(-1) rotate(180deg)",
            }}
          >
            <img
              src={patternImage}
              alt=""
              className="h-full w-full object-cover opacity-90 mix-blend-lighten"
            />
          </div>
        </div>
      ) : null}
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
  );
}
