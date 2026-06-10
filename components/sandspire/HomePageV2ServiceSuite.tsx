import Image from "next/image";

import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { WebDesignPortfolioCascade } from "@/components/sandspire/WebDesignPortfolioCascade";

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

function PlusButton() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[#faf3e8]">
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function TextServiceCard({ title }: { title: string }) {
  return (
    <article className="relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-[27px] border-2 border-[#414040] p-5 lg:min-h-[229px]">
      <h3 className="max-w-[170px] font-[family-name:var(--font-body)] text-[18px] font-medium leading-[1.35] text-[#faf3e8] lg:text-[19px]">
        {title}
      </h3>
      <PlusButton />
    </article>
  );
}

export function HomePageV2ServiceSuite() {
  return (
    <section id="services" className="relative px-6 py-16 lg:px-8 lg:py-24">
      <ScrollReveal className="mx-auto max-w-[1100px] text-center">
        <h2 className="font-[family-name:var(--font-serif-section)] text-[clamp(2.25rem,5vw,3.45rem)] font-normal italic leading-tight text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.55)]">
          Service Suite
        </h2>
      </ScrollReveal>

      <div className="mx-auto mt-10 grid max-w-[1156px] gap-3 lg:gap-4">
        <ScrollReveal className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-4" delay={0.04}>
          <article className="relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] lg:min-h-[229px]">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[20%] overflow-hidden">
              <DeferredVideo
                className="absolute bottom-0 left-1/2 h-[280px] w-[min(100%,320px)] -translate-x-1/2 object-cover object-bottom"
                src="/videos/InstagramViewsAnalytics.mp4"
                poster="/images/bento/InstagramViewsAnalyticsFallback1.png"
                autoPlay
                muted
                loop
                playsInline
                loadStrategy="visible"
              />
            </div>
          </article>
          <TextServiceCard title="Post-Production & Video Editing" />
          <article className="relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] lg:min-h-[229px]">
            <Image
              src="/images/bento/InstagramViewsAnalyticsFallback2.png"
              alt=""
              fill
              className="object-cover"
              sizes="220px"
            />
          </article>
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4"
          delay={0.08}
        >
          <article className="relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] lg:min-h-[229px]">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute left-[70%] top-[58%] h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
                  backgroundSize: "12px 12px",
                  maskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, transparent 68%)",
                }}
              />
            </div>
            <Image
              src="/images/Service%20Icon%20Group.svg"
              alt=""
              width={190}
              height={114}
              className="absolute left-1/2 top-1/2 z-[1] h-[100px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-95 lg:h-[114px]"
            />
          </article>
          <TextServiceCard title="AI-Infused Production" />
          <article className="relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] lg:min-h-[229px]">
            <Image
              src="/images/projects/slrp/slrpBento1.png"
              alt=""
              fill
              className="object-cover"
              sizes="220px"
            />
          </article>
          <TextServiceCard title="Brand Experiences" />
        </ScrollReveal>

        <ScrollReveal
          className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-4"
          delay={0.12}
        >
          <TextServiceCard title="Social Media Management" />
          <article className="relative min-h-[200px] overflow-hidden rounded-[27px] border-2 border-[#414040] bg-[#e07725] lg:min-h-[229px]">
            <WebDesignPortfolioCascade
              images={brandStrategyImages}
              className="absolute inset-0"
              rows={3}
              maxPerRow={3}
            />
          </article>
          <TextServiceCard title="UGC Content & SEO" />
        </ScrollReveal>
      </div>
    </section>
  );
}
