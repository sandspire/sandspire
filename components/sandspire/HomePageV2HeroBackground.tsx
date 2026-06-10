"use client";

import GradientBlinds from "@/components/GradientBlinds";

/** Bright orange stripes behind the phone stack; bleeds to the right viewport edge. */
export function HomePageV2WorkVideoBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute -z-10 overflow-hidden top-[7.5rem] bottom-0 left-[30%] right-[calc(50%-50vw+1.5rem)] sm:left-[32%] lg:left-[34%] lg:right-[calc(50%-50vw+2rem)] ${className}`}
      aria-hidden
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, #000 30%, #000 100%), radial-gradient(ellipse 95% 72% at 72% 50%, #000 0%, #000 48%, transparent 88%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, #000 30%, #000 100%), radial-gradient(ellipse 95% 72% at 72% 50%, #000 0%, #000 48%, transparent 88%)",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <div className="absolute inset-0 scale-y-[-1]">
        <GradientBlinds
          className="absolute inset-0"
          dpr={undefined}
          gradientColors={["#FF6B1A", "#FF9F1C", "#FFD23F"]}
          angle={0}
          noise={0.1}
          blindCount={18}
          blindMinWidth={52}
          mouseDampening={0.45}
          mirrorGradient={false}
          spotlightRadius={0.62}
          spotlightSoftness={0.82}
          spotlightOpacity={0.62}
          distortAmount={0}
          shineDirection="left"
          restingPosition={[0.68, 0.48]}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,176,64,0.18)_0%,rgba(255,120,32,0.08)_45%,rgba(13,13,13,0.22)_100%)]" />
    </div>
  );
}
