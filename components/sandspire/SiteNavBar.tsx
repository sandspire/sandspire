"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { sandspireNavLinks } from "@/components/sandspire/sandspireNav";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative text-[12px] font-normal capitalize tracking-[0.12px] text-white/90 transition-colors duration-200 after:pointer-events-none after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-white after:transition-[width] after:duration-300 after:ease-out hover:text-white hover:after:w-full";

const mobileLinkClass =
  "block w-full border-b border-white/[0.08] py-4 pl-1 pr-1 text-left text-[15px] font-normal capitalize tracking-[0.02em] text-white/92 transition-colors duration-200 last:border-b-0 hover:text-white first:pt-1";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** Refined stroke icon: 3 even lines, round caps (reads lighter than solid bars). */
function MenuStrokeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </svg>
  );
}

function CloseStrokeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export type SiteNavBarProps = {
  /** Classes on the root `<header>` (height, background, padding). */
  className: string;
  ctaHref?: string;
  logoLoading?: "eager" | "lazy";
};

/**
 * Sticky top bar: logo, desktop nav, CTA + menu toggle on small screens, slide-down mobile links.
 * Used on the homepage hero and on inner pages via `SandspireHeader`.
 */
export function SiteNavBar({
  className,
  ctaHref = "/contact",
  logoLoading = "lazy",
}: SiteNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const duration = reduceMotion ? 0 : 0.32;
  const transition = { duration, ease } as const;

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const update = () => {
      if (headerRef.current) {
        setPanelTop(headerRef.current.getBoundingClientRect().bottom);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn("relative", className, menuOpen && "z-[100]")}
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1220px] items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="shrink-0 transition-opacity duration-200 hover:opacity-80 active:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logos/sandspire.svg"
            alt="Sandspire"
            className="h-7 w-auto"
            loading={logoLoading}
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-[38px] md:flex"
          aria-label="Main"
        >
          {sandspireNavLinks.map((link) => (
            <Link key={link.label} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-2">
          <Link
            href={ctaHref}
            className="inline-flex h-9 min-w-0 shrink items-center rounded-full bg-[var(--background)] px-3 text-[12px] font-medium text-[var(--foreground)] shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf3e8]/60 sm:px-5"
            onClick={() => setMenuOpen(false)}
          >
            Get in touch
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 ring-1 ring-white/15 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf3e8]/50 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-mobile-main-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((o) => {
                if (!o && headerRef.current) {
                  setPanelTop(headerRef.current.getBoundingClientRect().bottom);
                }
                return !o;
              });
            }}
          >
            {menuOpen ? <CloseStrokeIcon className="shrink-0" /> : <MenuStrokeIcon className="shrink-0" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              key="nav-backdrop"
              type="button"
              className="fixed left-0 right-0 z-[90] bg-black/55 backdrop-blur-[2px] md:hidden"
              style={{ top: panelTop }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className="pointer-events-none fixed left-0 right-0 z-[100] md:hidden"
              style={{ top: panelTop }}
            >
              <motion.nav
                id="site-mobile-main-nav"
                key="nav-sheet"
                className="pointer-events-auto mx-3 max-h-[min(72vh,calc(100dvh-5.5rem))] overflow-y-auto rounded-3xl border border-white/12 bg-[#0a0a0a]/[0.97] px-3 py-2 shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0a0a]/90"
                aria-label="Mobile main"
                initial={reduceMotion ? false : { opacity: 0, y: -14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
                transition={transition}
              >
                <div className="px-1 pb-1 pt-2 sm:px-2 sm:pb-2 sm:pt-3">
                  {sandspireNavLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={mobileLinkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
