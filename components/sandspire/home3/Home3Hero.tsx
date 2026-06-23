"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";

import { ReelStoryCard, type ReelStory } from "./ReelStoryCard";

/* ------------------------------------------------------------------ */
/* Real client reels (one per venue). Swap files in /public/reels/ to  */
/* change the feed — keep the same filenames or update the paths here. */
/* ------------------------------------------------------------------ */
const STORIES: ReelStory[] = [
  { name: "Kanji", handle: "@eatkanji", logo: "/reels/logos/kanji.png", src: "/reels/kanji.mp4", poster: "/reels/posters/kanji.jpg" },
  { name: "Brix Table", handle: "@brixtable", logo: "/reels/logos/brixtable.png", src: "/reels/brixtable.mp4", poster: "/reels/posters/brixtable.jpg" },
  { name: "3 Fils", handle: "@3fils", logo: "/reels/logos/3fils.png", src: "/reels/3fils.mp4", poster: "/reels/posters/3fils.jpg" },
  { name: "Slrp Ramen", handle: "@slrpramen", logo: "/reels/logos/slrp.png", src: "/reels/slrp.mp4", poster: "/reels/posters/slrp.jpg" },
  { name: "Brix Journey", handle: "@brixjourney", logo: "/reels/logos/brixjourney.png", src: "/reels/brixjourney.mp4", poster: "/reels/posters/brixjourney.jpg" },
  { name: "Konbini", handle: "@konbini", logo: "/reels/logos/konbini.png", src: "/reels/konbini.mp4", poster: "/reels/posters/konbini.jpg" },
  { name: "Bordo Mavi", handle: "@bordomavi", logo: "/reels/logos/bordomavi.png", src: "/reels/bordomavi.mp4", poster: "/reels/posters/bordomavi.jpg" },
];

/** The reel featured by the story overlay on first load (3 Fils — the flagship). */
const DEFAULT_ACTIVE = 2;
/** Render two copies so the feed can loop seamlessly. */
const LOOP = [...STORIES, ...STORIES];
/** Ambient drift speed, px/second. Deliberately slow. */
const DRIFT = 22;

/**
 * Cinematic, interaction-driven hero adapted from the Elevate Social reference:
 * a self-scrolling marquee of real client reels that fans out on load and then
 * drifts slowly, with an Instagram-story overlay that "jumps" to whichever reel
 * you hover (and the feed pauses while you look). The product is literally on
 * screen, and alive, the instant the page loads.
 */
export function Home3Hero() {
  const reduce = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(DEFAULT_ACTIVE);
  const [inView, setInView] = useState(true);
  const [intro, setIntro] = useState(reduce); // reduced motion → skip straight to "in"
  const [dragging, setDragging] = useState(false);
  const [driftOn, setDriftOn] = useState(false);
  const [overReels, setOverReels] = useState(false); // hover pauses the drift

  /* The track's x — driven by both the ambient drift and the user's drag. */
  const x = useMotionValue(0);
  /* Width of one full set of reels = the seamless loop period. */
  const periodRef = useRef(0);

  /* Measure the loop period (distance from a card to its duplicate). */
  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      const first = tr.children[0] as HTMLElement | undefined;
      const dup = tr.children[STORIES.length] as HTMLElement | undefined;
      if (first && dup) periodRef.current = dup.offsetLeft - first.offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Ambient marquee: advance x slowly, then wrap into (-period, 0] so the loop
     is seamless. Pauses while dragging, hovering, off-screen, or reduced-motion. */
  useAnimationFrame((_t, delta) => {
    const period = periodRef.current;
    if (period <= 0) return;
    if (dragging) return; // let the drag own x; we re-wrap once it ends
    let v = x.get();
    if (driftOn && !reduce && !overReels && inView) {
      v -= (DRIFT * delta) / 1000;
    }
    if (v <= -period) v += period;
    else if (v > 0) v -= period;
    x.set(v);
  });

  /* As the feed drifts, hand the story overlay to whichever reel is nearest the
     viewport centre — so the "live story" rides the front-and-centre reel. Hover
     and drag take over instead. Throttled (the centred card changes slowly). */
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (overReels || dragging || !inView) return;
      const tr = trackRef.current;
      if (!tr) return;
      const mid = window.innerWidth / 2;
      let best = -1;
      let bestDist = Infinity;
      for (let i = 0; i < tr.children.length; i++) {
        const r = (tr.children[i] as HTMLElement).getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      if (best >= 0) setActive((prev) => (prev === best ? prev : best));
    }, 150);
    return () => clearInterval(id);
  }, [reduce, overReels, dragging, inView]);

  /* Gate playback to when the hero is on screen. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Kick the intro on mount, then let the feed start drifting once the cards
     have finished dealing in. (Reduced motion → reveal, but never auto-move.) */
  useEffect(() => {
    if (reduce) {
      setIntro(true);
      return;
    }
    const a = setTimeout(() => setIntro(true), 80);
    const b = setTimeout(() => setDriftOn(true), 1150);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduce]);

  /* ---- Custom cursor (desktop, pointer:fine, motion on) ---- */
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const sx = useSpring(cursorX, { stiffness: 700, damping: 40, mass: 0.4 });
  const sy = useSpring(cursorY, { stiffness: 700, damping: 40, mass: 0.4 });
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setCursorOn(true);
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, cursorX, cursorY]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#080604] pb-32 pt-24 text-[#FAF3E8] sm:pb-28 lg:pb-24 lg:pt-0"
    >
      {/* Near-black base with a whisper of brand warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 40rem at 50% -10%, rgba(255,94,0,0.16), transparent 60%), radial-gradient(40rem 40rem at 100% 110%, rgba(247,148,29,0.10), transparent 55%), #080604",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* CAROUSEL — a self-drifting marquee of reels, vertically centered */}
      <div className="relative flex flex-1 items-center">
        <div
          ref={viewportRef}
          className="flex w-full overflow-hidden"
          style={{ cursor: overReels && cursorOn ? "none" : undefined }}
        >
          <motion.div
            ref={trackRef}
            className="flex w-max shrink-0 items-center gap-4 px-4 sm:gap-5"
            drag="x"
            dragConstraints={false}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerEnter={() => setOverReels(true)}
            onPointerLeave={() => setOverReels(false)}
            style={{ x, cursor: dragging ? "grabbing" : "grab" }}
          >
            {LOOP.map((story, i) => {
              const slot = i % STORIES.length; // stagger identically across both sets
              return (
                <motion.div
                  key={`${story.src}-${i}`}
                  initial={false}
                  animate={
                    intro
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 28, scale: 0.92 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: reduce ? 0 : 0.1 + slot * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ReelStoryCard
                    story={story}
                    index={i}
                    isActive={active === i}
                    inView={inView}
                    reduceMotion={reduce}
                    onActivate={() => setActive(i)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* BOTTOM BAR — headline left, description right (stacks on mobile) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 px-6 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <p className="mb-3 font-[family-name:var(--font-body)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]">
            UAE content studio · reels, photos, social
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.8vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            If it&apos;s worth visiting,
            <br />
            it&apos;s worth filming.
          </h1>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[42ch] text-center font-[family-name:var(--font-body)] text-[14.5px] leading-[1.55] text-[#FAF3E8]/75 md:max-w-[34ch] md:text-right"
        >
          Reels, photos and a feed worth following. For restaurants, gyms,
          salons and everyone in between. We shoot, edit and post it every week,
          so showing up online stops eating your time.
        </motion.p>
      </div>

      {/* Custom cursor */}
      {cursorOn ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
          style={{ x: sx, y: sy }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-[#FAF3E8] text-[#080604]"
            animate={{
              width: overReels ? 64 : 12,
              height: overReels ? 64 : 12,
              marginLeft: overReels ? -32 : -6,
              marginTop: overReels ? -32 : -6,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <motion.span
              className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.1em]"
              animate={{ opacity: overReels ? 1 : 0 }}
              transition={{ duration: 0.15 }}
            >
              {dragging ? "↤↦" : "Drag"}
            </motion.span>
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}
