"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Home3VideoScroll — a cinematic "scrollytelling" interstitial.
 *
 * The reel video sits sticky at the bottom of the viewport while three tall
 * content columns scroll *over* it (the big `mt-[100vh]` / `pt-[150vh]` offsets
 * stagger them). A centered play button opens a modal that plays the same reel
 * with sound. Adapted from a Relume "Layout355" block, but self-contained — no
 * external UI library — and wired to a real Sandspire reel from /public/reels.
 */

type Scene = {
  heading: string;
  body: string;
};

const LEFT_SCENES: Scene[] = [
  {
    heading: "People decide before they show up",
    body: "Your feed is the first thing anyone checks. We make it the reason they come in, not the thing that talks them out of it.",
  },
  {
    heading: "Built for more than restaurants",
    body: "Cafés and kitchens, sure, but also gyms, clinics, salons, hotels and shops. Different places, same job: make people want to walk in.",
  },
];

const RIGHT_SCENES: Scene[] = [
  {
    heading: "Always on, never your problem",
    body: "We plan it, shoot it, post it and read the numbers, so the feed keeps moving whether or not anyone on your team remembers it exists.",
  },
];

/** Two encodes of the Sandspire showreel, optimized for their two jobs:
 *  - VIDEO_BG_SRC: muted, 720p, faststart loop for the sticky backdrop. It
 *    autoplays for every visitor, so it's kept small (~1.4 MB) and stripped of
 *    audio it would never play.
 *  - VIDEO_SRC: full 1080p + audio version, faststart. Only loads when someone
 *    clicks play (the modal mounts on demand), so it can stay high quality. */
const VIDEO_SRC = "/reels/sandspire-showreel.mp4";
const VIDEO_BG_SRC = "/reels/sandspire-showreel-bg.mp4";
const VIDEO_POSTER = "/reels/posters/sandspire-showreel.jpg";

function SceneBlock({ heading, body }: Scene) {
  return (
    <div className="flex flex-col justify-center py-8 md:h-screen md:py-0">
      <div className="w-full max-w-sm">
        <h3 className="mb-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-[#faf3e8] md:mb-6 md:text-5xl lg:text-6xl">
          {heading}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#faf3e8]/75 md:text-[17px]">
          {body}
        </p>
      </div>
    </div>
  );
}

export function Home3VideoScroll() {
  const [isOpen, setIsOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape, and lock body scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <section id="video-scroll" className="relative">
      <div className="px-[5%]">
        <div className="container relative z-10 mx-auto max-w-[1220px]">
          <div className="grid auto-cols-fr grid-cols-1 pb-8 md:grid-cols-[1fr_10rem_1fr] md:pb-0 lg:grid-cols-[1fr_12rem_1fr]">
            {/* Left column — first two scenes */}
            <div className="relative md:mt-[100vh]">
              {LEFT_SCENES.map((scene, i) => (
                <SceneBlock key={i} {...scene} />
              ))}
            </div>

            {/* Center — sticky play button */}
            <div className="static top-0 order-first flex h-[50vh] items-center justify-center md:sticky md:order-none md:h-screen">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Play showreel"
                className="absolute z-20 flex items-center justify-center text-[#faf3e8] transition-transform duration-300 hover:scale-110"
              >
                <span className="flex size-20 flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 512 512"
                    className="size-16 text-[#faf3e8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                    height="1em"
                    width="1em"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right column — final scene (starts lower) */}
            <div className="relative md:pt-[150vh]">
              {RIGHT_SCENES.map((scene, i) => (
                <SceneBlock key={i} {...scene} />
              ))}
            </div>
          </div>
        </div>
        <div className="mb-[-100vh]" />
      </div>

      {/* Sticky background reel */}
      <div className="sticky bottom-0 z-0 h-screen w-screen">
        <div className="absolute inset-0 z-10 bg-black/55" />
        <div className="sticky bottom-0 h-screen w-screen overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={VIDEO_POSTER}
            className="absolute -bottom-full -left-full -right-full -top-full m-auto size-full bg-cover object-cover [background-position:50%]"
          >
            <source src={VIDEO_BG_SRC} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Video modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close video"
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#faf3e8] transition-colors hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <video
            ref={modalVideoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}
    </section>
  );
}
