"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "motion/react";

import { Magnetic } from "@/components/sandspire/Magnetic";
import { BRAND_LOGO_SRC } from "@/lib/brandAssets";
import { siteContentDefaults } from "@/lib/siteContentDefaults";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type NavLink = { label: string; href: string };

export type SandspireNavBarProps = {
  links?: NavLink[];
  ctaLabel?: string | null;
  ctaHref?: string;
  socialLinks?: NavLink[];
  logoSrc?: string;
  logoHref?: string;
  logoLoading?: "eager" | "lazy";
  /** Override the contact/location lines shown inside the mobile menu. */
  location?: string;
};

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop link with a masked "text roll" hover + active underline     */
/* ------------------------------------------------------------------ */

function DesktopLink({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className="group relative inline-block py-1.5 text-[12px] font-medium uppercase tracking-[0.16em] outline-none focus-visible:text-[#FAF3E8]"
    >
      <span className="relative block overflow-hidden">
        <span
          className={cn(
            "block transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full motion-reduce:transition-none",
            active ? "text-[#FAF3E8]" : "text-[#FAF3E8]/70",
          )}
        >
          {link.label}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full text-[#ff7a3d] transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 motion-reduce:transition-none"
        >
          {link.label}
        </span>
      </span>
      {/* Active state — a settled orange underline */}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#ff5e00] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile menu motion variants                                         */
/* ------------------------------------------------------------------ */

const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE, when: "beforeChildren", staggerChildren: 0.055, delayChildren: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE, when: "afterChildren", staggerChildren: 0.03, staggerDirection: -1 } },
};

const rowMask: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: EASE } },
  exit: { y: "115%", transition: { duration: 0.4, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.25, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

export function SandspireNavBar({
  links = siteContentDefaults.nav.links,
  ctaLabel = siteContentDefaults.nav.ctaLabel,
  ctaHref = siteContentDefaults.nav.ctaHref,
  socialLinks = siteContentDefaults.footer.socialLinks,
  logoSrc = BRAND_LOGO_SRC,
  logoHref = "/",
  logoLoading = "lazy",
  location = "Dubai · United Arab Emirates",
}: SandspireNavBarProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();

  // Glass-on-scroll + cinematic auto-hide (hide on the way down, reveal on the
  // way up). The menu always forces the bar visible so the close control stays.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const goingDown = y > lastY.current;
    setHidden(!menuOpen && y > 260 && goingDown);
    lastY.current = y;
  });

  const isActive = (href: string) => {
    const base = href.split("#")[0] || "/";
    return pathname === base;
  };

  // While the mobile menu is open: lock body scroll, trap focus inside the
  // panel, close on Escape or on a grow to desktop, and restore focus to the
  // toggle on close — the full modal-dialog contract.
  useEffect(() => {
    if (!menuOpen) return;
    const toggle = toggleRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      menuRef.current
        ? Array.from(
            menuRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
          )
        : [];

    // Move focus into the menu once it has mounted.
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -28, opacity: 0 }}
        animate={{ y: hidden ? "-115%" : 0, opacity: 1 }}
        transition={{ y: { duration: 0.55, ease: EASE }, opacity: { duration: 0.7, ease: EASE } }}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0",
          menuOpen ? "z-[90]" : "z-[70]",
        )}
      >
        {/* Dark glass that fades in once you leave the hero (and clears while the
            full-screen menu is open so the bar blends into the overlay). */}
        <motion.div
          aria-hidden
          className="absolute inset-0 border-b border-white/[0.07] bg-[#0b0907]/72 backdrop-blur-xl"
          initial={false}
          animate={{ opacity: scrolled && !menuOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        />

        <div className="relative mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[64px] sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href={logoHref}
            aria-label="Sandspire — home"
            onClick={() => setMenuOpen(false)}
            className="pointer-events-auto shrink-0 rounded-sm outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5e00]"
          >
            <img
              src={logoSrc}
              alt="Sandspire"
              className="h-[26px] w-auto sm:h-7"
              loading={logoLoading}
              decoding="async"
              fetchPriority={logoLoading === "eager" ? "high" : "auto"}
            />
          </Link>

          {/* Desktop nav — optically centred */}
          <nav
            aria-label="Primary"
            className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex"
          >
            {links.map((link) => (
              <DesktopLink key={link.label} link={link} active={isActive(link.href)} />
            ))}
          </nav>

          {/* Right cluster */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {ctaLabel ? (
              <Magnetic className="hidden md:block">
                <Link
                  href={ctaHref}
                  className="group relative inline-flex h-10 items-center gap-2 rounded-full bg-[#ff5e00] pl-5 pr-4 text-[12px] font-semibold uppercase tracking-[0.07em] text-[#faf3e8] shadow-[0_12px_34px_-12px_rgba(255,94,0,0.85)] transition-colors duration-200 hover:bg-[#ff6f1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00]"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            ) : null}

            {/* Hamburger / close */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="ss-mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-[#FAF3E8] outline-none transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5e00] md:hidden"
            >
              <span className="flex h-3 w-[26px] flex-col justify-between">
                <motion.span
                  className="block h-[1.6px] w-full origin-center rounded-full bg-current"
                  animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="block h-[1.6px] w-full origin-center rounded-full bg-current"
                  animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll-progress hairline — quiet at the top, fills as you read */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-[#ff5e00] to-[#ff7a3d]"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      {/* ---------------------------------------------------------------- */}
      {/* Full-screen mobile menu                                          */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            id="ss-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-[#0a0604] text-[#FAF3E8] md:hidden"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Ambient brand atmosphere */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(42rem 32rem at 80% -8%, rgba(255,94,0,0.20), transparent 60%), radial-gradient(34rem 30rem at -10% 110%, rgba(247,148,29,0.12), transparent 55%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Links */}
            <nav aria-label="Mobile" className="relative z-10 mt-[64px] flex flex-col px-5 pt-6 sm:px-6">
              {links.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <div key={link.label} className="overflow-hidden border-b border-white/10">
                    <motion.div variants={rowMask}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-4 py-5 outline-none"
                      >
                        <span className="font-[family-name:var(--font-body)] text-[12px] font-semibold tabular-nums text-[#ff7a3d]/80">
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-[family-name:var(--font-display)] text-[clamp(2.1rem,11vw,3rem)] font-bold leading-none tracking-[-0.02em] transition-colors duration-200",
                            active ? "text-[#ff5e00]" : "text-[#FAF3E8] group-hover:text-[#ff7a3d]",
                          )}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight className="ml-auto -translate-x-2 text-[#FAF3E8]/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[#ff7a3d] group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Foot of the menu — action, socials, where to find us */}
            <div className="relative z-10 mt-auto px-5 pb-10 pt-12 sm:px-6">
              {ctaLabel ? (
                <motion.div variants={fadeUp}>
                  <Link
                    href={ctaHref}
                    onClick={() => setMenuOpen(false)}
                    className="group flex h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#ff5e00] font-[family-name:var(--font-body)] text-[15px] font-semibold text-[#faf3e8] shadow-[0_18px_44px_-16px_rgba(255,94,0,0.85)] transition-colors duration-200 hover:bg-[#ff6f1a]"
                  >
                    {ctaLabel}
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              ) : null}

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-body)] text-[13px]"
              >
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#FAF3E8]/70 underline-offset-4 transition-colors duration-200 hover:text-[#ff7a3d] hover:underline"
                  >
                    {s.label}
                  </Link>
                ))}
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-6 font-[family-name:var(--font-body)] text-[12px] uppercase tracking-[0.16em] text-[#FAF3E8]/40"
              >
                {location}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
