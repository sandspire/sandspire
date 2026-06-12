"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type HomePageV2FlippableServiceCardProps = {
  title: string;
  description: string;
  /** Tighter card for the home-2 mobile bento grid (Figma iPhone layout). */
  compact?: boolean;
};

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn("h-4 w-4", className)} fill="none" aria-hidden>
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function HomePageV2FlippableServiceCard({
  title,
  description,
  compact = false,
}: HomePageV2FlippableServiceCardProps) {
  const [flipped, setFlipped] = useState(false);
  const panelId = useId();

  const shellClass = compact
    ? "relative h-[120px] min-h-0 font-body [perspective:1200px]"
    : "relative min-h-[200px] font-body [perspective:1200px] lg:min-h-[229px]";

  const faceClass = compact
    ? "absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[14px] border border-[#414040] bg-[#0d0d0d] p-[11px] [backface-visibility:hidden]"
    : "absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[27px] border-2 border-[#414040] bg-[#0d0d0d] p-5 [backface-visibility:hidden]";

  const titleClass = compact
    ? "max-w-full font-body text-[11px] font-medium leading-[1.6] text-[#faf3e8] not-italic sm:text-[12px]"
    : "max-w-[170px] font-body text-[18px] font-medium leading-[1.35] text-[#faf3e8] not-italic lg:text-[19px]";

  const descriptionClass = compact
    ? "max-w-full font-body text-[10px] font-normal leading-[1.45] text-white sm:text-[11px]"
    : "max-w-[200px] font-body text-[14px] font-normal leading-[1.45] text-white lg:text-[15px]";

  const buttonClass = compact
    ? "inline-flex h-[17px] w-[17px] shrink-0 items-center justify-center self-end rounded-full bg-white text-[#0d0d0d] transition-opacity hover:opacity-90"
    : "inline-flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-full bg-white text-[#0d0d0d] transition-opacity hover:opacity-90";

  return (
    <article className={shellClass}>
      <div
        className={cn(
          "relative h-full min-h-[inherit] transition-transform duration-500 ease-out motion-reduce:transition-none [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div className={faceClass}>
          <h3 className={titleClass}>{title}</h3>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-expanded={flipped}
            aria-controls={panelId}
            aria-label={`More about ${title}`}
            className={buttonClass}
          >
            <PlusIcon className={compact ? "h-2.5 w-2.5" : undefined} />
          </button>
        </div>

        <div
          id={panelId}
          className={cn(faceClass, "bg-[#141414] [transform:rotateY(180deg)]")}
        >
          <p className={descriptionClass}>{description}</p>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            aria-label={`Close details for ${title}`}
            className={cn(buttonClass, "mt-auto")}
          >
            <PlusIcon className={cn("rotate-45", compact && "h-2.5 w-2.5")} />
          </button>
        </div>
      </div>
    </article>
  );
}
