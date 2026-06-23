"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * ServicesProcess — a horizontally-pinned scroll rail.
 *
 * A tall scroll driver pins a screen-height frame; as you scroll *down*, the row
 * of process steps slides *sideways*. Built on motion's useScroll/useSpring, with
 * the slide distance measured from the real track width so it always lands on the
 * last card. On mobile / reduced motion it becomes a plain vertical list.
 */

type Step = { no: string; title: string; body: string };

const STEPS: Step[] = [
  {
    no: "01",
    title: "Brief",
    body: "You tell us the brand, the goal and the vibe. We listen more than we pitch, then come back with a plan and a quote.",
  },
  {
    no: "02",
    title: "Plan",
    body: "A month of ideas, mapped before anyone picks up a camera. You see exactly what we'll shoot and why.",
  },
  {
    no: "03",
    title: "Shoot",
    body: "One day on location. Reels, photos and talking-to-camera video, captured while you carry on with the day.",
  },
  {
    no: "04",
    title: "Publish",
    body: "We edit, caption, schedule and post. You approve every frame before it goes live. No surprises on your feed.",
  },
  {
    no: "05",
    title: "Report",
    body: "Once a month: what we shot, what it reached and what it did for the business. In plain numbers, not a dashboard.",
  },
];

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

export function ServicesProcess() {
  const reduce = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const animate = isDesktop && !reduce;

  const driverRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: driverRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.0005 });
  const x = useTransform(p, (v) => -(v * maxRef.current));

  // Measure how far the track can travel (its overflow past the viewport).
  useEffect(() => {
    const measure = () => {
      const tr = trackRef.current;
      if (!tr) return;
      maxRef.current = Math.max(0, tr.scrollWidth - tr.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [animate]);

  return (
    <section className="relative bg-[#0d0d0d] text-[#FAF3E8]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(48rem 40rem at 100% 0%, rgba(255,94,0,0.14), transparent 60%), radial-gradient(40rem 40rem at 0% 100%, rgba(194,145,63,0.10), transparent 55%)",
        }}
      />

      <div ref={driverRef} className={animate ? "relative h-[420vh]" : "relative"}>
        <div
          className={
            animate
              ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
              : "py-24 lg:py-28"
          }
        >
          {/* Header */}
          <div className="mx-auto w-full max-w-[1220px] px-5 sm:px-6 lg:px-8">
            <p className="flex items-center gap-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ff7a3d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
              How a project runs
            </p>
            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.0] tracking-[-0.03em]">
                Five steps. One shoot day.
              </h2>
              {animate ? (
                <div className="hidden w-[220px] md:block">
                  <div className="h-px w-full overflow-hidden bg-white/15">
                    <motion.div
                      style={{ scaleX: p }}
                      className="h-full w-full origin-left bg-[#ff5e00]"
                    />
                  </div>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-[12px] text-[#FAF3E8]/45">
                    Scroll to walk through it
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          {/* Track */}
          {animate ? (
            <div className="mt-14 overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-6 px-5 sm:px-6 lg:px-8"
              >
                {STEPS.map((s) => (
                  <StepCard key={s.no} step={s} />
                ))}
                <div aria-hidden className="w-[20vw] shrink-0" />
              </motion.div>
            </div>
          ) : (
            <div className="mx-auto mt-12 grid w-full max-w-[1220px] gap-4 px-5 sm:px-6 sm:grid-cols-2 lg:px-8">
              {STEPS.map((s) => (
                <StepCard key={s.no} step={s} stacked />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, stacked = false }: { step: Step; stacked?: boolean }) {
  return (
    <article
      className={
        "flex flex-col rounded-[24px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10 " +
        (stacked ? "" : "w-[80vw] max-w-[460px] shrink-0 md:h-[clamp(340px,48vh,440px)]")
      }
    >
      <span className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none text-[#ff5e00]">
        {step.no}
      </span>
      <h3 className="mt-auto pt-8 font-[family-name:var(--font-display)] text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.01em]">
        {step.title}
      </h3>
      <p className="mt-4 max-w-[40ch] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#FAF3E8]/60">
        {step.body}
      </p>
    </article>
  );
}
