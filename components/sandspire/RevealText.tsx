"use client";

"use client";

import SplitText, { type SplitTextProps } from "@/components/SplitText";
import type { RefObject } from "react";

type RevealVariant = "headline" | "paragraph" | "eyebrow" | "tagline";

const PRESETS: Record<
  RevealVariant,
  Pick<
    SplitTextProps,
    "splitType" | "delay" | "duration" | "ease" | "from" | "to" | "threshold" | "rootMargin"
  >
> = {
  headline: {
    splitType: "chars",
    delay: 32,
    duration: 0.55,
    ease: "power3.out",
    from: { opacity: 0, y: 28 },
    to: { opacity: 1, y: 0 },
    threshold: 0.12,
    rootMargin: "-48px",
  },
  paragraph: {
    splitType: "words",
    delay: 50,
    duration: 0.62,
    ease: "power3.out",
    from: { opacity: 0, y: 16 },
    to: { opacity: 1, y: 0 },
    threshold: 0.1,
    rootMargin: "-64px",
  },
  eyebrow: {
    splitType: "words",
    delay: 65,
    duration: 0.48,
    ease: "power2.out",
    from: { opacity: 0, y: 12 },
    to: { opacity: 1, y: 0 },
    threshold: 0.15,
    rootMargin: "-32px",
  },
  tagline: {
    splitType: "lines",
    delay: 80,
    duration: 0.55,
    ease: "power3.out",
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    threshold: 0.12,
    rootMargin: "-48px",
  },
};

export type RevealTextProps = {
  text: string;
  className?: string;
  tag?: SplitTextProps["tag"];
  variant?: RevealVariant;
  textAlign?: SplitTextProps["textAlign"];
  /** Override scroll trigger margin (e.g. `"0px"` for above-the-fold hero copy). */
  rootMargin?: string;
  threshold?: number;
  scrollTriggerRef?: RefObject<HTMLElement | null>;
  scrollTriggerStart?: string;
};

export function RevealText({
  text,
  className = "",
  tag = "p",
  variant = "paragraph",
  textAlign = "left",
  rootMargin,
  threshold,
  scrollTriggerRef,
  scrollTriggerStart,
}: RevealTextProps) {
  const preset = PRESETS[variant];

  return (
    <SplitText
      text={text}
      className={className}
      tag={tag}
      textAlign={textAlign}
      splitType={preset.splitType}
      delay={preset.delay}
      duration={preset.duration}
      ease={preset.ease}
      from={preset.from}
      to={preset.to}
      threshold={threshold ?? preset.threshold}
      rootMargin={rootMargin ?? preset.rootMargin}
      scrollTriggerRef={scrollTriggerRef}
      scrollTriggerStart={scrollTriggerStart}
    />
  );
}
