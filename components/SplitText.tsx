"use client";

import {
  useRef,
  useEffect,
  useState,
  type CSSProperties,
  type ElementType,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type SplitTarget = Element | Element[] | NodeListOf<Element>;

type SplitTextInstance = {
  revert: () => void;
  chars?: Element[];
  words?: Element[];
  lines?: Element[];
};

declare global {
  interface HTMLElement {
    _rbsplitInstance?: SplitTextInstance | null;
  }
}

export type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars" | string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  tag?: ElementType;
  onLetterAnimationComplete?: () => void;
  /** When set, animation waits for this element (e.g. sticky footer scroll track). */
  scrollTriggerRef?: RefObject<HTMLElement | null>;
  scrollTriggerStart?: string;
};

const BLOCK_TAGS = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "div", "li"]);

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
  scrollTriggerRef,
  scrollTriggerStart,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [externalTriggerReady, setExternalTriggerReady] = useState(!scrollTriggerRef);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!scrollTriggerRef) {
      setExternalTriggerReady(true);
      return;
    }

    const syncTrigger = () => {
      if (scrollTriggerRef.current) {
        setExternalTriggerReady(true);
      }
    };

    syncTrigger();
    const frame = requestAnimationFrame(syncTrigger);
    return () => cancelAnimationFrame(frame);
  }, [scrollTriggerRef]);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || !externalTriggerReady || reduceMotion) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const triggerEl = scrollTriggerRef?.current ?? el;
      if (!triggerEl) return;

      const start =
        scrollTriggerStart ??
        (() => {
          const startPct = (1 - threshold) * 100;
          const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
          const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
          const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
          const sign =
            marginValue === 0
              ? ""
              : marginValue < 0
                ? `-=${Math.abs(marginValue)}${marginUnit}`
                : `+=${marginValue}${marginUnit}`;
          return `top ${startPct}%${sign}`;
        })();

      let targets: SplitTarget | undefined;

      const assignTargets = (self: SplitTextInstance) => {
        if (splitType.includes("chars") && self.chars?.length) targets = self.chars;
        if (!targets && splitType.includes("words") && self.words?.length) targets = self.words;
        if (!targets && splitType.includes("lines") && self.lines?.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self: SplitTextInstance) => {
          assignTargets(self);
          if (!targets) return undefined;

          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: triggerEl,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: scrollTriggerRef ? 0 : 0.4,
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: "transform, opacity",
              force3D: true,
            },
          );
        },
      });

      el._rbsplitInstance = splitInstance as unknown as SplitTextInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el || st.trigger === scrollTriggerRef?.current) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        externalTriggerReady,
        reduceMotion,
        scrollTriggerRef,
        scrollTriggerStart,
      ],
      scope: ref,
    },
  );

  const Tag = tag;
  const tagName = typeof tag === "string" ? tag : "p";
  const style: CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: BLOCK_TAGS.has(tagName) ? "block" : "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: reduceMotion ? undefined : "transform, opacity",
  };

  if (reduceMotion) {
    return (
      <Tag className={className} style={{ textAlign }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`.trim()}>
      {text}
    </Tag>
  );
}
