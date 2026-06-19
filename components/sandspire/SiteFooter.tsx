import Link from "next/link";

import { BRAND_LOGO_SRC } from "@/lib/brandAssets";
import { HomePageV2GradientBackdrop } from "@/components/sandspire/HomePageV2HeroBackground";
import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { ScrollReveal } from "@/components/sandspire/ScrollReveal";
import { StickyScrollShell } from "@/components/ui/sticky-scroll-shell";
import { cn } from "@/lib/utils";

const footerLinkClass =
  "inline-block text-[12px] font-normal text-[#BEB7B7] transition-all duration-200 ease-out hover:translate-x-1 hover:text-[#FAF3E8]";

const footerLinkClassHome2 =
  "inline-block text-[12px] font-normal text-[#faf3e8]/75 transition-all duration-200 ease-out hover:translate-x-1 hover:text-[#faf3e8]";

const FOOTER_STICKY_HEIGHT = "h-[480px]";
const FOOTER_STICKY_OFFSET = "top-[calc(100dvh-480px)]";

const footerMenu = (homeHref: string, navLinks: { label: string; href: string }[]) => [
  { label: "Home", href: homeHref },
  ...navLinks,
];

export type SiteFooterProps = {
  variant?: "default" | "home2";
  homeHref?: string;
  /** Pin footer while scrolling through its reveal track (home-2). */
  sticky?: boolean;
  navLinks?: { label: string; href: string }[];
  taglineLine1?: string;
  taglineLine2?: string;
  blurb?: string;
  copyright?: string;
  socialLinks?: { label: string; href: string }[];
  logoSrc?: string;
};

function FooterContent({
  isHome2,
  menu,
  socialLinks,
  taglineLine1,
  taglineLine2,
  blurb,
  copyright,
  logoSrc = BRAND_LOGO_SRC,
}: {
  isHome2: boolean;
  menu: ReturnType<typeof footerMenu>;
  socialLinks: { label: string; href: string }[];
  taglineLine1: string;
  taglineLine2: string;
  blurb: string;
  copyright: string;
  logoSrc?: string;
}) {
  const linkClass = isHome2 ? footerLinkClassHome2 : footerLinkClass;

  return (
    <ScrollReveal className="mx-auto w-full max-w-[1180px]">
      <div className="mx-auto flex w-full max-w-[940px] flex-col justify-between gap-10 lg:h-[210px] lg:flex-row lg:gap-[320px]">
        <div className="w-full max-w-[380px] space-y-4">
          <img
            src={logoSrc}
            alt="Sandspire"
            className={cn("h-10 w-auto", isHome2 && "mix-blend-screen opacity-95")}
            loading="lazy"
            decoding="async"
          />
          <p
            className={cn(
              "font-body text-[28px] font-light leading-[1.05]",
              isHome2 ? "text-[#faf3e8]" : "text-[#FAF3E8]",
            )}
          >
            {taglineLine1}
            <br />
            {taglineLine2}
          </p>
          <p
            className={cn(
              "max-w-[380px] text-[15px] font-normal leading-[1.4]",
              isHome2 ? "text-[#faf3e8]/90" : "text-[#FAF3E8]",
            )}
          >
            {blurb}
          </p>
          <p className={cn("text-[12px]", isHome2 ? "text-[#faf3e8]/65" : "text-[#BEB7B7]")}>
            {copyright}
          </p>
        </div>

        <div className="flex w-full max-w-[280px] flex-col gap-10 sm:max-w-none sm:flex-row sm:gap-12 lg:max-w-[320px]">
          <div className="min-w-0 sm:min-w-[100px]">
            <p className={cn("text-[18px] font-light", isHome2 ? "text-[#ff5e00]" : "text-[#F7941D]")}>
              Menu
            </p>
            <ul className="mt-1 space-y-1.5">
              {menu.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 sm:min-w-[100px]">
            <p className={cn("text-[18px] font-light", isHome2 ? "text-[#ff5e00]" : "text-[#F7941D]")}>
              Social
            </p>
            <ul className="mt-1 space-y-1.5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function SiteFooter({
  variant = "default",
  homeHref = "/",
  sticky = false,
  navLinks = siteContentDefaults.nav.links,
  taglineLine1 = siteContentDefaults.footer.taglineLine1,
  taglineLine2 = siteContentDefaults.footer.taglineLine2,
  blurb = siteContentDefaults.footer.blurb,
  copyright = siteContentDefaults.footer.copyright,
  socialLinks = siteContentDefaults.footer.socialLinks,
  logoSrc = BRAND_LOGO_SRC,
}: SiteFooterProps) {
  const isHome2 = variant === "home2";
  const useSticky = sticky || isHome2;
  const menu = footerMenu(homeHref, navLinks);

  const inner = (
    <div
      className={cn(
        "relative flex size-full flex-col justify-center overflow-hidden px-6 py-[80px] lg:px-0",
        isHome2 ? "bg-[#0d0d0d] font-body text-[#faf3e8]" : "bg-[#0D0D0D] text-[#FAF3E8]",
      )}
    >
      {isHome2 ? <HomePageV2GradientBackdrop variant="footer" /> : null}
      <div className="relative z-10">
        <FooterContent
          isHome2={isHome2}
          menu={menu}
          socialLinks={socialLinks}
          taglineLine1={taglineLine1}
          taglineLine2={taglineLine2}
          blurb={blurb}
          copyright={copyright}
          logoSrc={logoSrc}
        />
      </div>
    </div>
  );

  return (
    <footer id="footer" className="w-full">
      {useSticky ? (
        <StickyScrollShell
          heightClass={FOOTER_STICKY_HEIGHT}
          pin="bottom"
          stickyBottomClass={FOOTER_STICKY_OFFSET}
        >
          {inner}
        </StickyScrollShell>
      ) : (
        <div className={cn("relative w-full overflow-hidden px-6 py-[80px] lg:px-0", isHome2 ? "bg-[#0d0d0d] font-body text-[#faf3e8]" : "bg-[#0D0D0D] text-[#FAF3E8]")}>
          {isHome2 ? <HomePageV2GradientBackdrop variant="footer" /> : null}
          <div className="relative z-10">
            <FooterContent
          isHome2={isHome2}
          menu={menu}
          socialLinks={socialLinks}
          taglineLine1={taglineLine1}
          taglineLine2={taglineLine2}
          blurb={blurb}
          copyright={copyright}
          logoSrc={logoSrc}
        />
          </div>
        </div>
      )}
    </footer>
  );
}
