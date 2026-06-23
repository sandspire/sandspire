"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Can I take one service, or is it all bundled?",
    a: "Take what you need. Most brands start with reels or photography, then add social management or a website later. Nothing's bundled unless you want it to be.",
  },
  {
    q: "Do you only do social, or websites and AI too?",
    a: "All of it. Content is the lead, but the same studio builds the website, sorts the brand and wires up the AI. One team, one invoice, no hand-offs.",
  },
  {
    q: "Do you work outside food and hospitality?",
    a: "Yes. Food is where we cut our teeth, but the same approach works for gyms, salons, clinics, hotels and shops: any brand where people check the feed before they decide to walk in.",
  },
  {
    q: "How fast can you turn things around?",
    a: "Footage within the first couple of weeks, a consistent feed inside the first month, and a website live in 4–6 weeks. You'll get real dates up front, not vague promises.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No lock-in. You approve everything before it goes live, and you can pause or stop between shoot cycles. We'd rather keep you because the work's good.",
  },
  {
    q: "What does it cost?",
    a: "Reels start around AED 1,500 each, photography from AED 2,500, websites from AED 12k, and full social management runs AED 5–15k a month. Tell us the mix you want and we'll quote it exactly.",
  },
];

export function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#0d0d0d]/12 bg-white/50">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-[#0d0d0d]/10 last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#ff5e00]/[0.03] sm:px-7"
            >
              <span className="font-[family-name:var(--font-body)] text-[15px] font-semibold tracking-[-0.01em] text-[#0d0d0d] sm:text-[17px]">
                {f.q}
              </span>
              <span
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0d0d0d]/15 transition-transform duration-300 " +
                  (isOpen ? "rotate-45 border-[#ff5e00] bg-[#ff5e00] text-[#FAF3E8]" : "text-[#0d0d0d]")
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 font-[family-name:var(--font-body)] text-[14.5px] leading-[1.6] text-[#0d0d0d]/68 sm:px-7 sm:text-[15px]">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
