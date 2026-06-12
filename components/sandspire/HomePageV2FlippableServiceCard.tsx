"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type HomePageV2FlippableServiceCardProps = {
  title: string;
  description: string;
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
}: HomePageV2FlippableServiceCardProps) {
  const [flipped, setFlipped] = useState(false);
  const panelId = useId();

  return (
    <article className="relative min-h-[200px] font-body [perspective:1200px] lg:min-h-[229px]">
      <div
        className={cn(
          "relative h-full min-h-[inherit] transition-transform duration-500 ease-out motion-reduce:transition-none [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[27px] border-2 border-[#414040] bg-[#0d0d0d] p-5 [backface-visibility:hidden]">
          <h3 className="max-w-[170px] font-body text-[18px] font-medium leading-[1.35] text-[#faf3e8] not-italic lg:text-[19px]">
            {title}
          </h3>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-expanded={flipped}
            aria-controls={panelId}
            aria-label={`More about ${title}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-full bg-white text-[#0d0d0d] transition-opacity hover:opacity-90"
          >
            <PlusIcon />
          </button>
        </div>

        <div
          id={panelId}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-[27px] border-2 border-[#414040] bg-[#141414] p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <p className="max-w-[200px] font-body text-[14px] font-normal leading-[1.45] text-white lg:text-[15px]">
            {description}
          </p>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            aria-label={`Close details for ${title}`}
            className="mt-auto inline-flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-full bg-white text-[#0d0d0d] transition-opacity hover:opacity-90"
          >
            <PlusIcon className="rotate-45" />
          </button>
        </div>
      </div>
    </article>
  );
}
