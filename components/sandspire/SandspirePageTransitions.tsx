"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

function isModifiedClick(event: MouseEvent) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

/**
 * Black cross-fade when the browser has no View Transitions API (e.g. Firefox).
 * Chrome/Safari use native VT via `next-view-transitions` Link clicks.
 */
function PageTransitionFallback() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const navigating = useRef(false);

  useEffect(() => {
    if (supportsViewTransitions() || reduceMotion) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || navigating.current) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && !url.hash) return;
      if (isModifiedClick(event)) return;

      event.preventDefault();
      navigating.current = true;
      setVisible(true);

      window.setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        navigating.current = false;
      }, 300);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, reduceMotion, router]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), 420);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (supportsViewTransitions() || reduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-transition-fallback"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9998] bg-[#0d0d0d]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : null}
    </AnimatePresence>
  );
}

export function SandspirePageTransitions({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      {children}
      <PageTransitionFallback />
    </ViewTransitions>
  );
}
