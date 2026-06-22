"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const panelSpring = { type: "spring" as const, stiffness: 150, damping: 22 };

type FaqItem = {
  question: string;
  answer?: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

/**
 * FAQ accordion with Animate UI–style spring expand/collapse.
 * @see https://animate-ui.com/docs/components/base/accordion
 */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const accordionRef = React.useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
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
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div
      ref={accordionRef}
      className={cn("grid w-full max-w-[1017px] grid-cols-1 gap-5", className)}
    >
      {items.map((item, idx) => {
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
              <motion.span
                aria-hidden
                className="inline-flex h-[19px] w-[19px] shrink-0 items-center justify-center text-[15px] font-light leading-none text-[#e6ddd0] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={panelSpring}
              >
                +
              </motion.span>
              <span className="font-[family-name:var(--font-body)] text-[15px] font-light leading-snug tracking-[-0.02em] text-[#e6ddd0]">
                {item.question}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  initial={
                    reduceMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0, y: 12 }
                  }
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { height: 0, opacity: 0 }
                      : { height: 0, opacity: 0, y: 12 }
                  }
                  transition={reduceMotion ? { duration: 0.15 } : panelSpring}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 pt-0">
                    <p className="border-t border-white/10 pt-4 text-[14px] leading-relaxed text-[#9c9c9c]">
                      {item.answer ?? ""}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
