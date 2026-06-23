"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/**
 * ServiceIndex — the /services centerpiece.
 *
 * A large editorial list of the content services. On a real pointer (desktop),
 * hovering a row floats that service's actual client reel toward the cursor with
 * a damped spring, the row lights up, and the rest dim back — the classic
 * "image-reveal index" interaction, wired to live video. On touch / reduced
 * motion it degrades to a calm list with an inline thumbnail per service.
 */

type Item = {
  no: string;
  title: string;
  desc: string;
  src: string;
  poster: string;
};

const ITEMS: Item[] = [
  {
    no: "01",
    title: "Reels & short-form",
    desc: "Short, sharp vertical video, shot and cut in-house. The format pulling the most reach right now, and the one most brands can't keep up with.",
    src: "/reels/konbini.mp4",
    poster: "/reels/posters/konbini.jpg",
  },
  {
    no: "02",
    title: "Brand & product photography",
    desc: "Product, food, interiors and people, shot to look as good on a screen as they do in the room.",
    src: "/reels/bordomavi.mp4",
    poster: "/reels/posters/bordomavi.jpg",
  },
  {
    no: "03",
    title: "Social media management",
    desc: "The whole feed planned, posted, captioned and replied to. You sign off; we run it.",
    src: "/reels/slrp.mp4",
    poster: "/reels/posters/slrp.jpg",
  },
  {
    no: "04",
    title: "UGC & creator content",
    desc: "Real faces talking to camera, filmed to look native to the feed rather than like an ad. We cast, brief and direct it.",
    src: "/reels/kanji.mp4",
    poster: "/reels/posters/kanji.jpg",
  },
  {
    no: "05",
    title: "Video editing",
    desc: "Your raw footage, cut into reels people actually finish, with captions, pace and sound that land.",
    src: "/reels/brixjourney.mp4",
    poster: "/reels/posters/brixjourney.jpg",
  },
];

export function ServiceIndex() {
  const reduce = useReducedMotion() ?? false;
  const [canHover, setCanHover] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Floating preview position (follows the cursor, damped).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 28, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 240, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches && window.innerWidth >= 768);
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (!canHover || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const interactive = canHover && !reduce;

  return (
    <section
      id="index"
      className="relative scroll-mt-20 overflow-hidden bg-[#0a0604] py-24 text-[#FAF3E8] lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46rem 44rem at 88% 8%, rgba(255,94,0,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
              What we make · on the feed
            </p>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              The content studio
            </h2>
          </div>
          <p className="max-w-[40ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#FAF3E8]/60">
            The reels, photos and posts that get you found, and keep people coming
            back. {interactive ? "Hover a service to see it move." : "Five things we do, every week."}
          </p>
        </div>

        {/* The list */}
        <div
          ref={wrapRef}
          className="relative"
          onPointerMove={onMove}
          onMouseLeave={() => setActive(null)}
        >
          <ul>
            {ITEMS.map((item, i) => {
              const dim = interactive && active !== null && active !== i;
              return (
                <li key={item.no}>
                  <Link
                    href="/contact"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-7 transition-opacity duration-300 sm:gap-7 sm:py-9"
                    style={{ opacity: dim ? 0.32 : 1 }}
                  >
                    <span className="font-[family-name:var(--font-display)] text-[13px] font-medium tabular-nums text-[#ff5e00] sm:text-[15px]">
                      {item.no}
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] font-[family-name:var(--font-body)] text-[13.5px] leading-[1.55] text-[#FAF3E8]/55 sm:text-[14.5px]">
                        {item.desc}
                      </p>
                    </div>

                    {/* Inline thumbnail (touch / no-hover only) */}
                    {!interactive ? (
                      <span className="ml-2 hidden h-16 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10 [@media(min-width:420px)]:block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.poster}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </span>
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#FAF3E8] transition-colors duration-300 group-hover:border-[#ff5e00] group-hover:bg-[#ff5e00] group-hover:text-[#0a0604]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Floating reel preview (desktop, real pointer) */}
          {interactive ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-20"
              style={{ x: sx, y: sy }}
            >
              <motion.div
                animate={{
                  opacity: active !== null ? 1 : 0,
                  scale: active !== null ? 1 : 0.82,
                  rotate: active !== null ? -5 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/15"
                style={{ width: "clamp(180px, 15vw, 248px)" }}
              >
                <div className="relative aspect-[9/16] w-full bg-[#161009]">
                  {active !== null ? (
                    <video
                      key={active}
                      src={ITEMS[active].src}
                      poster={ITEMS[active].poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 font-[family-name:var(--font-body)] text-[11px] font-semibold tracking-[0.02em] text-[#FAF3E8] backdrop-blur-sm">
                    {active !== null ? ITEMS[active].title : ""}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
