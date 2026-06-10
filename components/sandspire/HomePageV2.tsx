import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ContactFAQ } from "@/components/sandspire/ContactFAQ";
import { DeferredVideo } from "@/components/sandspire/DeferredVideo";
import { HomePageV2WorkVideoBackground } from "@/components/sandspire/HomePageV2HeroBackground";
import { HomePageV2ServiceSuite } from "@/components/sandspire/HomePageV2ServiceSuite";
import { HomePageV2WorkScroll } from "@/components/sandspire/HomePageV2WorkScroll";
import { LogoMarquee } from "@/components/sandspire/LogoMarquee";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { SiteFooter } from "@/components/sandspire/SiteFooter";
import { SiteNavBar } from "@/components/sandspire/SiteNavBar";
import { COMING_SOON_HREF } from "@/lib/comingSoon";

const homeV2NavLinks = [
  { label: "Services", href: "/home-2#services" },
  { label: "Pricing", href: COMING_SOON_HREF },
  { label: "Work", href: "/home-2#work" },
  { label: "Use Cases", href: COMING_SOON_HREF },
];

const homeV2FaqItems = [
  {
    question: "How long does a project take?",
    answer:
      "Most projects land in the 4–8 week range after kickoff, depending on scope, feedback speed, and asset readiness.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We collaborate across time zones with async updates and scheduled reviews so progress stays visible.",
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. Larger engagements can be split into milestone payments as deliverables are approved.",
  },
  {
    question: "Where are you based?",
    answer:
      "Sandspire is based in the UAE and works with regional and international teams — remote-first when it helps the schedule.",
  },
];

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

export function HomePageV2() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#faf3e8]">
      <SiteNavBar
        className="sticky top-0 z-50 h-[54px] border-b border-white/[0.06] bg-[#141414]/85 px-5 backdrop-blur-[10px] lg:px-7"
        ctaHref="/contact"
        logoHref="/home-2"
        logoLoading="eager"
        links={homeV2NavLinks}
      />

      <header className="relative -mt-[54px] overflow-hidden pt-[54px]">
        <div className="relative isolate min-h-[min(100vh,873px)] overflow-visible rounded-b-[56px] opacity-[0.98] lg:rounded-b-[100px]">
          <div className="absolute inset-0 overflow-hidden rounded-b-[56px] lg:rounded-b-[100px]">
            <div className="absolute inset-0 scale-[1.18]">
              <Image
                src="/images/HeroImage.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-b-[56px] bg-gradient-to-b from-black/55 via-black/35 to-black/65 lg:rounded-b-[100px]" />

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-54px)] w-full max-w-[1220px] flex-col justify-between px-6 pb-0 pt-10 lg:px-8 lg:pt-14">
            <ScrollReveal className="mx-auto w-full max-w-[554px] text-center">
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,4.7rem)] font-light leading-[0.95] tracking-[-0.05em] text-white">
                AI-native creative studio
              </h1>
              <p className="mt-6 font-[family-name:var(--font-body)] text-[18px] font-normal leading-[1.4] text-[#faf3e8] sm:text-[20px]">
                We create brands, experiences, and workflows that work without friction.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <OutlineButton href="/home-2#contact">Get Started</OutlineButton>
                <Link
                  href="/about"
                  className="text-[13px] font-semibold text-white underline decoration-solid underline-offset-4 hover:text-[#faf3e8]"
                >
                  About Us
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal className="mt-auto w-full" y={14} delay={0.06}>
              <div className="relative -mx-6 overflow-hidden rounded-t-[40px] lg:-mx-8">
                <LogoMarquee variant="hero" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <main>
        <section id="work" className="relative overflow-visible scroll-mt-8 px-6 pt-10 pb-14 lg:px-8 lg:pt-12 lg:pb-16">
          <div className="relative z-[1] mx-auto w-full max-w-[935px] overflow-visible">
            {/* Title stays pinned only while cards stack; releases when this block scrolls out. */}
            <div className="work-scroll-stage relative overflow-visible">
              <HomePageV2WorkVideoBackground />
              <div className="sticky top-[54px] z-20 flex flex-col items-center gap-[5px] px-2 pb-4 pt-1 text-center">
                <h2 className="font-[family-name:var(--font-serif-section)] text-[clamp(2.5rem,5vw,3.4375rem)] font-normal italic leading-[1.44] text-white [text-shadow:0_4.35px_4.35px_rgba(0,0,0,0.79)]">
                  Our Work
                </h2>
                <p className="max-w-[373px] font-[family-name:var(--font-body)] text-[18px] font-medium tracking-[-0.06em] text-[#faf3e8] sm:text-[20px] sm:leading-[1.36]">
                  Selected works spanning our full range
                </p>
              </div>

              <HomePageV2WorkScroll />
            </div>

            <div className="flex justify-center px-2 pb-2 pt-6">
              <OutlineButton href="/work">View All Work</OutlineButton>
            </div>
          </div>
        </section>

        <HomePageV2ServiceSuite />

        <section className="px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-[938px]">
            <ScrollReveal className="text-center">
              <h2 className="font-[family-name:var(--font-serif-section)] text-[clamp(2.25rem,5vw,3.45rem)] font-normal italic leading-tight text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.55)]">
                Our 360° Showreel
              </h2>
            </ScrollReveal>
            <ScrollReveal className="mt-10" delay={0.06}>
              <div className="overflow-hidden rounded-[36px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:rounded-[51px]">
                <DeferredVideo
                  className="aspect-video w-full object-cover"
                  src="/videos/HeroVideo-2%20(1).mp4"
                  poster="/images/hero/HeroVideoFallback.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  loadStrategy="visible"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className="mt-10 flex justify-center" delay={0.1}>
              <OutlineButton href="/home-2#services">View All Services</OutlineButton>
            </ScrollReveal>
          </div>
        </section>

        <ContactFAQ
          className="rounded-t-[48px] bg-[#0d0d0d] lg:rounded-t-[70px]"
          variant="home2"
          faqItems={homeV2FaqItems}
          contactMoreQuestionsHref="/home-2#contact"
        />
        <SiteFooter />
      </main>
    </div>
  );
}
