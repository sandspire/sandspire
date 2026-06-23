"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: Array<{
    question: string;
    answer?: string;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const normalizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        accordionRef.current &&
        event.target instanceof Node &&
        !accordionRef.current.contains(event.target)
      ) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={accordionRef}
      className="grid w-full max-w-[1017px] grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-[22px] md:gap-y-5"
    >
      {normalizedItems.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[56px] border border-[rgba(98,97,97,0.2)] bg-transparent"
          >
            <button
              type="button"
              className="flex min-h-[75px] w-full items-center gap-10 px-8 py-7 text-left transition-colors duration-200 ease-out hover:bg-white/[0.04] sm:gap-11"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
            >
              <span
                aria-hidden
                className={[
                  "inline-flex h-[19px] w-[19px] shrink-0 items-center justify-center text-[15px] font-light leading-none text-[#e6ddd0] shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
                  "transition-transform duration-200",
                  isOpen ? "rotate-45" : "rotate-0",
                ].join(" ")}
              >
                +
              </span>
              <span className="font-[family-name:var(--font-body)] text-[15px] font-light leading-snug tracking-[-0.02em] text-[#e6ddd0]">
                {item.question}
              </span>
            </button>

            <div
              className={[
                "transition-[max-height,opacity,padding] duration-200",
                isOpen ? "max-h-52 opacity-100 px-8 pb-6 pt-0" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              {isOpen ? (
                <p className="border-t border-white/10 pt-4 text-[14px] leading-relaxed text-[#9c9c9c]">
                  {item.answer ?? ""}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
