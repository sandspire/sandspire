"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Home3Services — a full-scroll "What We Do" reveal.
 *
 * A tall (500vh) scroll driver pins a viewport-height frame while you scroll.
 * As progress runs 0 → 1: the headline rises in, a sphere "blooms" outward
 * from the centre of the words (the container un-clips it), a dashed ring
 * fades + un-blurs behind the text, and three service cards slide up at the
 * corners. Rebuilt from a GSAP/Webflow reference using Framer Motion so it
 * stays consistent with the rest of the site (and adds no new dependency).
 *
 * Rewritten in Sandspire's voice + palette: deep near-black, cream text,
 * orange accent. On mobile / reduced-motion it degrades to a calm stacked
 * layout with everything visible.
 */

type Service = { no: string; title: string; body: string; place: string };

const SERVICES: Service[] = [
  {
    no: "01",
    title: "Reels & short-form",
    body: "Short, sharp video, shot and edited in-house. It's the format pulling the most reach right now, and the one most brands can't keep up with. We can.",
    // top-left
    place: "md:absolute md:left-0 md:top-[3vh] md:max-w-[280px]",
  },
  {
    no: "02",
    title: "Brand & product photography",
    body: "Photography that makes you look as good on a screen as you do in person. Interiors, product, food, people: whatever you sell, shot to sell it.",
    // top-right
    place: "md:absolute md:right-0 md:top-[12vh] md:max-w-[300px]",
  },
  {
    no: "03",
    title: "Social media, handled",
    body: "The whole feed off your plate: strategy, captions, scheduling, replies and a monthly read-out. You sign off; we run it.",
    // bottom-centre (left edge near centre, text runs right — matches reference)
    place: "md:absolute md:bottom-[2vh] md:left-[40%] md:max-w-[336px]",
  },
];

/* Detect desktop on the client so we only attach scroll-scrub motion there.
   Starts `false` (matching the server render) → flips after mount, so there's
   no hydration mismatch. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function ServiceCard({
  progress,
  start,
  animate,
  service,
}: {
  progress: MotionValue<number>;
  start: number;
  animate: boolean;
  service: Service;
}) {
  // Cards reveal between ~40% and ~70% of scroll, lightly staggered via `start`.
  const opacity = useTransform(progress, [start, start + 0.18], [0, 1]);
  const y = useTransform(progress, [start, start + 0.18], [28, 0]);

  return (
    <motion.div
      style={animate ? { opacity, y } : undefined}
      className={
        "flex w-full max-w-full flex-col gap-2.5 " + service.place
      }
    >
      <div className="flex items-start gap-3">
        <span className="mt-[3px] font-[family-name:var(--font-display)] text-[13px] font-medium tabular-nums text-[#ff5e00]">
          {service.no}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(18px,1.5vw,24px)] font-bold leading-[1.25] tracking-[-0.01em] text-[#FAF3E8]">
          {service.title}
        </h3>
      </div>
      <p className="font-[family-name:var(--font-body)] text-[14.5px] leading-[1.6] text-[#FAF3E8]/55">
        {service.body}
      </p>
    </motion.div>
  );
}

export function Home3Services() {
  const reduce = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const animate = isDesktop && !reduce;

  const driverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing ≈ the reference's "92% smoothing" / scrub:2 viscous feel.
  const p = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.001,
  });

  // Headline rises + fades in over the first 5%.
  const headOpacity = useTransform(p, [0, 0.05], [0, 1]);
  const headY = useTransform(p, [0, 0.05], [56, 0]);

  // Centre image: container width 0 → 20vw (curtain reveal); sphere settles with a
  // subtle tilt. The asset is a ball + orbit rings (rings drawn only on the TOP half,
  // fading out below). A big rotation would swing those rings to the bottom mid-scroll,
  // so we keep it gentle (-22 → 0) so the rings always read on top, like the reference.
  const imgWidth = useTransform(p, [0.1, 0.4], ["0vw", "20vw"]);
  const sphereRotate = useTransform(p, [0, 0.8], [-22, 0]);

  // The sphere asset's orbit rings are full ellipses, but the reference shows them
  // only across the TOP (the lower loops fade out). Fade the bottom of the sphere
  // with a vertical mask — the dark ball is unaffected (near-black on black), but
  // the light lower ring arcs disappear, giving the reference's half-ring look.
  const SPHERE_MASK =
    "linear-gradient(to bottom, #000 0%, #000 48%, rgba(0,0,0,0.15) 72%, transparent 84%)";

  // Ring: fades in (10→20%), un-blurs + settles from a zoomed bloom (10→45%).
  const ringOpacity = useTransform(p, [0.1, 0.2], [0, 1]);
  const ringScale = useTransform(p, [0.1, 0.45, 0.8], [1.55, 1.04, 1]);
  const ringBlurNum = useTransform(p, [0.2, 0.45], [12, 0]);
  const ringFilter = useTransform(ringBlurNum, (b) => `blur(${b}px)`);

  return (
    <section className="relative bg-[#0a0604] text-[#FAF3E8]">
      {/* warm orange glow tying the centre to the brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45rem 45rem at 50% 42%, rgba(255,94,0,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-8">
        {/* Scroll driver — tall on desktop to give the scrub room; normal on mobile */}
        <div
          ref={driverRef}
          className={animate ? "relative h-[500vh]" : "relative py-24 lg:py-28"}
        >
          {/* Sticky pinned frame */}
          <div
            className={
              animate
                ? "sticky top-[14vh] flex min-h-[80vh] items-center justify-center overflow-hidden"
                : "relative"
            }
          >
            <div className="relative flex w-full flex-col items-center justify-center md:min-h-[80vh]">
              {/* Dashed ring (behind the words). The source PNG has dark strokes,
                  so invert + brighten it to read on the dark background. */}
              <motion.div
                aria-hidden
                style={
                  animate
                    ? { opacity: ringOpacity, scale: ringScale, filter: ringFilter }
                    : undefined
                }
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 md:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/reels/ring.png"
                  alt=""
                  className="h-full w-full object-contain opacity-50 [filter:invert(1)_brightness(1.25)]"
                />
              </motion.div>

              {/* Headline row: What · [sphere] · We Do */}
              <motion.div
                style={animate ? { opacity: headOpacity, y: headY } : undefined}
                className="relative z-10 flex items-center justify-center gap-1.5 md:gap-3"
              >
                <span className="whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2rem,5.4vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#FAF3E8]">
                  What
                </span>

                <motion.div
                  className="flex w-[34vw] shrink-0 items-center justify-center overflow-hidden md:w-[20vw]"
                  style={
                    animate
                      ? { width: imgWidth, WebkitMaskImage: SPHERE_MASK, maskImage: SPHERE_MASK }
                      : { WebkitMaskImage: SPHERE_MASK, maskImage: SPHERE_MASK }
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    src="/reels/sphere.png"
                    alt=""
                    style={animate ? { rotate: sphereRotate } : undefined}
                    className="h-[34vw] w-[34vw] shrink-0 object-contain md:h-[20vw] md:w-[20vw]"
                  />
                </motion.div>

                <span className="whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(2rem,5.4vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#FAF3E8]">
                  We&nbsp;Do
                </span>
              </motion.div>

              {/* Service cards — corners on desktop, stacked column on mobile */}
              <div className="relative mt-14 flex w-full flex-col gap-9 md:absolute md:inset-0 md:mt-0">
                {SERVICES.map((service, i) => (
                  <ServiceCard
                    key={service.no}
                    service={service}
                    progress={p}
                    start={0.4 + i * 0.05}
                    animate={animate}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
