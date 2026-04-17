"use client";

import { useMemo, useState } from "react";

export function FaqAccordion({
  items,
}: {
  items: Array<{
    question: string;
    answer?: string;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const normalizedItems = useMemo(() => items, [items]);

  return (
    <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2 lg:gap-4">
      {normalizedItems.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[38px] border border-white/20 bg-white/[0.004]"
          >
            <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
              aria-expanded={isOpen}
            >
              <span
                aria-hidden
                className={[
                  "inline-flex h-4 w-4 items-center justify-center rounded-full text-[#D4D4D4]/60",
                  "transition-transform duration-200",
                  isOpen ? "rotate-45" : "rotate-0",
                ].join(" ")}
              >
                +
              </span>
              <span className="font-[family-name:var(--font-body)] text-[14px] font-medium leading-[1.2] text-[#E6DDD0]">
                {item.question}
              </span>
            </button>

            <div
              className={[
                "px-9 pb-4 transition-[max-height,opacity] duration-200",
                isOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              {isOpen ? (
                <p className="text-[14px] leading-[1.4] text-[#9C9C9C]">{item.answer ?? ""}</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

