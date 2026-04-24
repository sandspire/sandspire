import Link from "next/link";

import { sandspireNavLinks } from "@/components/sandspire/sandspireNav";
import { COMING_SOON_HREF } from "@/lib/comingSoon";

import { ScrollReveal } from "@/components/sandspire/ScrollReveal";

const footerLinkClass =
  "inline-block text-[12px] font-normal text-[#BEB7B7] transition-all duration-200 ease-out hover:translate-x-1 hover:text-[#FAF3E8]";

const footerMenu = [
  { label: "Home", href: "/" },
  ...sandspireNavLinks,
];

export function SiteFooter() {
  const socialLinks = [
    { label: "LinkedIn", href: COMING_SOON_HREF },
    { label: "Instagram", href: COMING_SOON_HREF },
    { label: "Twitter", href: COMING_SOON_HREF },
  ];

  return (
    <footer id="footer" className="w-full bg-[#0D0D0D] px-6 py-[80px] text-[#FAF3E8] lg:px-0">
      <ScrollReveal className="mx-auto w-full max-w-[1180px]">
        <div className="mx-auto flex w-full max-w-[940px] flex-col justify-between gap-10 lg:h-[210px] lg:flex-row lg:gap-[320px]">
          <div className="w-full max-w-[380px] space-y-4">
            <img
              src="/logos/sandspire.svg"
              alt="Sandspire"
              className="h-10 w-auto"
              loading="lazy"
            />
            <p className="font-[family-name:var(--font-display)] text-[28px] font-light leading-[1.05] text-[#FAF3E8]">
              Great design should
              <br />
              feel invisible.
            </p>
            <p className="max-w-[380px] text-[15px] font-normal leading-[1.4] text-[#FAF3E8]">
              We are a creative agency supporting businesses from branding, all the way to automation.
            </p>
            <p className="text-[12px] text-[#BEB7B7]">© Copyright Sandspire | Design by Jabrni</p>
          </div>

          <div className="flex w-full max-w-[280px] flex-col gap-10 sm:max-w-none sm:flex-row sm:gap-12 lg:max-w-[320px]">
            <div className="min-w-0 sm:min-w-[100px]">
              <p className="text-[18px] font-light text-[#F7941D]">Menu</p>
              <ul className="mt-1 space-y-1.5">
                {footerMenu.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={footerLinkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 sm:min-w-[100px]">
              <p className="text-[18px] font-light text-[#F7941D]">Social</p>
              <ul className="mt-1 space-y-1.5">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={footerLinkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
