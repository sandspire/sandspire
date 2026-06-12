"use client";

import GradientBlinds from "@/components/GradientBlinds";
import { cn } from "@/lib/utils";

type GradientBackdropProps = {
  className?: string;
  /** Work = masked stripe behind phones (darker). Footer = full bleed, much brighter. */
  variant?: "work" | "footer";
};

/** Orange GradientBlinds backdrop — shared by Our Work and the home-2 footer reveal. */
export function HomePageV2GradientBackdrop({
  className = "",
  variant = "work",
}: GradientBackdropProps) {
  const isFooter = variant === "footer";

  return (
    <div
      className={cn(
        "pointer-events-none absolute -z-10 overflow-hidden",
        isFooter
          ? "inset-0"
          : "inset-y-0 top-0 left-[30%] right-[calc(50%-50vw+1.5rem)] sm:left-[32%] lg:left-[34%] lg:right-[calc(50%-50vw+2rem)]",
        className,
      )}
      aria-hidden
      style={
        isFooter
          ? undefined
          : {
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, #000 30%, #000 100%), radial-gradient(ellipse 95% 72% at 72% 50%, #000 0%, #000 48%, transparent 88%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, #000 30%, #000 100%), radial-gradient(ellipse 95% 72% at 72% 50%, #000 0%, #000 48%, transparent 88%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }
      }
    >
      <div className="absolute inset-0 scale-y-[-1]">
        <GradientBlinds
          className="absolute inset-0"
          dpr={undefined}
          gradientColors={["#FF6B1A", "#FF9F1C", "#FFD23F"]}
          angle={0}
          noise={0.1}
          blindCount={isFooter ? 22 : 18}
          blindMinWidth={isFooter ? 48 : 52}
          mouseDampening={0.45}
          mirrorGradient={false}
          spotlightRadius={isFooter ? 0.78 : 0.62}
          spotlightSoftness={isFooter ? 0.72 : 0.82}
          spotlightOpacity={isFooter ? 0.88 : 0.38}
          distortAmount={0}
          shineDirection="left"
          restingPosition={isFooter ? [0.55, 0.5] : [0.68, 0.48]}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0",
          isFooter
            ? "bg-[linear-gradient(180deg,rgba(255,120,32,0.08)_0%,rgba(0,0,0,0.18)_55%,rgba(5,5,5,0.35)_100%)]"
            : "bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.72)_50%,rgba(5,5,5,0.94)_100%)]",
        )}
      />
    </div>
  );
}

/** Bright orange stripes behind the phone stack; bleeds to the right viewport edge. */
export function HomePageV2WorkVideoBackground({ className = "" }: { className?: string }) {
  return <HomePageV2GradientBackdrop variant="work" className={className} />;
}
