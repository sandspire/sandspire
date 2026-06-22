"use client";

import { Link } from "next-view-transitions";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { SandspireBorderGlow } from "@/components/sandspire/SandspireBorderGlow";

const easeCurtain = [0.76, 0, 0.24, 1] as [number, number, number, number];
const easeLink = [0.22, 1, 0.36, 1] as [number, number, number, number];

const clipClosed = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const clipOpen = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.28 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeLink },
  },
};

type MobileFullPageNavProps = {
  open: boolean;
  links: { label: string; href: string }[];
  ctaHref: string;
  ctaLabel: string;
  onClose: () => void;
};

export function MobileFullPageNav({
  open,
  links,
  ctaHref,
  ctaLabel,
  onClose,
}: MobileFullPageNavProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  const curtainDuration = reduceMotion ? 0 : 0.72;
  const linkMotion = reduceMotion ? false : undefined;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-full-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[9990] md:hidden"
          initial={reduceMotion ? false : { clipPath: clipClosed }}
          animate={{ clipPath: clipOpen }}
          exit={reduceMotion ? undefined : { clipPath: clipClosed }}
          transition={{ duration: curtainDuration, ease: easeCurtain }}
          style={{ willChange: "clip-path" }}
        >
          <div className="relative flex h-full flex-col overflow-y-auto bg-[#0d0d0d] px-6 pb-10 pt-[calc(54px+2.5rem)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[min(42vh,320px)] bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,rgba(255,94,0,0.22),transparent_68%)]"
            />

            <motion.nav
              id="site-mobile-main-nav"
              aria-label="Mobile main"
              className="relative z-10 flex flex-1 flex-col justify-center"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link, index) => (
                  <motion.li key={link.label} variants={linkVariants} custom={index}>
                    <Link
                      href={link.href}
                      className="group flex items-baseline gap-4 py-2"
                      onClick={onClose}
                    >
                      <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-[#ff5e00]/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-[clamp(2.35rem,10.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.04em] text-[#faf3e8]/88 transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-white">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <motion.div
              className="relative z-10 mt-auto pt-10"
              initial={linkMotion === false ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={linkMotion === false ? undefined : { opacity: 0, y: 16 }}
              transition={{ delay: reduceMotion ? 0 : 0.55, duration: 0.5, ease: easeLink }}
            >
              <SandspireBorderGlow
                inline
                borderRadius={9999}
                backgroundColor="#0d0d0d"
                glowRadius={22}
                fillOpacity={0.35}
              >
                <Link
                  href={ctaHref}
                  className="inline-flex h-12 w-full items-center justify-center px-8 text-[14px] font-semibold text-[#faf3e8]"
                  onClick={onClose}
                >
                  {ctaLabel}
                </Link>
              </SandspireBorderGlow>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
