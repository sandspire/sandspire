"use client";

import BorderGlow, { type BorderGlowProps } from "@/components/BorderGlow";

export const SANDSPIRE_GLOW_COLORS = ["#FF5E00", "#F7941D", "#FAF3E8"];

type SandspireBorderGlowProps = Omit<
  BorderGlowProps,
  "colors" | "glowColor" | "edgeSensitivity" | "glowRadius" | "glowIntensity" | "coneSpread"
> &
  Partial<
    Pick<
      BorderGlowProps,
      "colors" | "glowColor" | "edgeSensitivity" | "glowRadius" | "glowIntensity" | "coneSpread"
    >
  >;

/** Sandspire-branded edge glow wrapper (React Bits BorderGlow). */
export function SandspireBorderGlow({
  colors = SANDSPIRE_GLOW_COLORS,
  glowColor = "24 100 65",
  edgeSensitivity = 27,
  glowRadius = 26,
  glowIntensity = 0.6,
  coneSpread = 11,
  innerClassName = "border-glow-fill",
  subtle = true,
  ...props
}: SandspireBorderGlowProps) {
  return (
    <BorderGlow
      colors={colors}
      glowColor={glowColor}
      edgeSensitivity={edgeSensitivity}
      glowRadius={glowRadius}
      glowIntensity={glowIntensity}
      coneSpread={coneSpread}
      innerClassName={innerClassName}
      subtle={subtle}
      {...props}
    />
  );
}
