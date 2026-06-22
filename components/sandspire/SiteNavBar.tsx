"use client";

import { Link } from "next-view-transitions";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { MobileFullPageNav } from "@/components/sandspire/MobileFullPageNav";
import { sandspireNavLinks } from "@/components/sandspire/sandspireNav";
import { SandspireBorderGlow } from "@/components/sandspire/SandspireBorderGlow";
import { BRAND_LOGO_SRC } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative text-[12px] font-normal capitalize tracking-[0.12px] text-white/90 transition-colors duration-200 after:pointer-events-none after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-white after:transition-[width] after:duration-300 after:ease-out hover:text-white hover:after:w-full";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function MenuToggleIcon({ open }: { open: boolean }) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.32;

  return (
    <span className="relative block h-[14px] w-[22px]" aria-hidden>
      <motion.span
        className="absolute inset-x-0 top-0 h-[1.75px] origin-center rounded-full bg-current"
        animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
        transition={{ duration, ease }}
      />
      <motion.span
        className="absolute inset-x-0 top-[6px] h-[1.75px] origin-center rounded-full bg-current"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.35 : 1 }}
        transition={{ duration: 0.22, ease }}
      />
      <motion.span
        className="absolute inset-x-0 top-[12px] h-[1.75px] origin-center rounded-full bg-current"
        animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
        transition={{ duration, ease }}
      />
    </span>
  );
}

export type SiteNavBarProps = {
  /** Classes on the root `<header>` (height, background, padding). */
  className: string;
  ctaHref?: string;
  ctaLabel?: string | null;
  logoLoading?: "eager" | "lazy";
  logoHref?: string;
  logoSrc?: string;
  links?: { label: string; href: string }[];
};

/**
 * Sticky top bar: logo, desktop nav, CTA + menu toggle on small screens, full-page mobile menu.
 * Used on the homepage hero and on inner pages via `SandspireHeader`.
 */
export function SiteNavBar({
  className,
  ctaHref = "/contact",
  ctaLabel = "Get in touch",
  logoLoading = "lazy",
  logoHref = "/",
  logoSrc = BRAND_LOGO_SRC,
  links = sandspireNavLinks,
}: SiteNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <header
        className={cn(
          className,
          menuOpen && "z-[10000] border-b border-white/[0.06] bg-[#0d0d0d]/95 backdrop-blur-md",
        )}
      >
        <div className="relative mx-auto flex h-full w-full max-w-[1220px] items-center justify-between gap-3">
          <Link
            href={logoHref}
            aria-label="Go to homepage"
            className="relative z-[1] shrink-0 transition-opacity duration-200 hover:opacity-80 active:opacity-70"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={logoSrc}
              alt="Sandspire"
              className="h-7 w-auto"
              loading={logoLoading}
              decoding="async"
              fetchPriority={logoLoading === "eager" ? "high" : "auto"}
            />
          </Link>

          <nav
            className="hidden items-center justify-center gap-[38px] md:flex"
            aria-label="Main"
          >
            {links.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-[1] flex min-w-0 items-center justify-end gap-2">
            {ctaLabel ? (
              <SandspireBorderGlow
                inline
                borderRadius={9999}
                backgroundColor="var(--background)"
                glowRadius={18}
                fillOpacity={0.3}
                className={cn("shrink", menuOpen && "hidden md:inline-flex")}
              >
                <Link
                  href={ctaHref}
                  className="inline-flex h-9 min-w-0 items-center px-3 text-[12px] font-medium text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf3e8]/60 sm:px-5"
                  onClick={() => setMenuOpen(false)}
                >
                  {ctaLabel}
                </Link>
              </SandspireBorderGlow>
            ) : null}

            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-full px-2.5 text-white/90 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf3e8]/50 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-mobile-main-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative block h-[10px] w-[34px] overflow-hidden font-mono text-[10px] uppercase leading-[10px] tracking-[0.22em]">
                <motion.span
                  className="flex flex-col"
                  animate={{ y: menuOpen ? "-50%" : "0%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.38, ease }}
                >
                  <span>Menu</span>
                  <span>Close</span>
                </motion.span>
              </span>
              <MenuToggleIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      <MobileFullPageNav
        open={menuOpen}
        links={links}
        ctaHref={ctaHref}
        ctaLabel={ctaLabel ?? "Get in touch"}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
