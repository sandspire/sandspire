"use client";

import { useEffect, useRef } from "react";

/**
 * Sand-to-spire particle field.
 *
 * A lightweight 2D-canvas motif tied to the name "Sandspire": warm grains drift
 * upward and get pulled toward a few vertical "spire" columns, so loose sand
 * keeps resolving into structure. Pure canvas — no WebGL — so it renders on every
 * device, and it degrades to a single static frame under prefers-reduced-motion.
 *
 * Performance guards:
 *  - particle count scales with width (capped low on mobile)
 *  - the RAF loop pauses whenever the canvas scrolls off-screen
 *  - device-pixel-ratio clamped to 2
 */
export function SandSpireCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spires: number[] = [];
    type Grain = {
      x: number;
      y: number;
      vy: number;
      drift: number;
      phase: number;
      size: number;
      hue: number;
      alpha: number;
      pull: number;
    };
    let grains: Grain[] = [];

    const palette = [
      [255, 94, 0], // orange
      [247, 148, 29], // secondary
      [194, 145, 63], // brass
      [255, 122, 61], // light orange
    ];

    function makeGrain(seedY?: number): Grain {
      const spireBias = Math.random() < 0.55;
      const targetSpire = spires.length
        ? spires[(Math.random() * spires.length) | 0]
        : width / 2;
      const x = spireBias
        ? targetSpire + (Math.random() - 0.5) * width * 0.18
        : Math.random() * width;
      const c = palette[(Math.random() * palette.length) | 0];
      return {
        x,
        y: seedY ?? height + Math.random() * height,
        vy: 0.15 + Math.random() * 0.55,
        drift: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() < 0.12 ? 1.8 + Math.random() * 1.4 : 0.6 + Math.random() * 1.0,
        hue: c[0] * 65536 + c[1] * 256 + c[2],
        alpha: 0.18 + Math.random() * 0.5,
        pull: spireBias ? 0.004 + Math.random() * 0.01 : 0,
      };
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Three spire columns, weighted toward the right where the hero art sits.
      spires = [width * 0.32, width * 0.62, width * 0.84];

      const target = Math.min(
        Math.round((width * height) / 7000),
        width < 640 ? 90 : 220,
      );
      grains = Array.from({ length: target }, () => makeGrain());
    }

    function drawFrame(animate: boolean) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      for (const g of grains) {
        if (animate) {
          g.phase += 0.01;
          g.y -= g.vy;
          g.x += g.drift + Math.sin(g.phase) * 0.3;
          // Pull toward the nearest spire column → sand assembling into structure.
          if (g.pull) {
            let nearest = spires[0];
            let best = Infinity;
            for (const s of spires) {
              const d = Math.abs(s - g.x);
              if (d < best) {
                best = d;
                nearest = s;
              }
            }
            g.x += (nearest - g.x) * g.pull;
          }
          if (g.y < -8) {
            Object.assign(g, makeGrain(height + 8));
          }
        }
        const r = (g.hue >> 16) & 255;
        const gr = (g.hue >> 8) & 255;
        const b = g.hue & 255;
        // Grains brighten as they climb (denser, more "solid" near the top).
        const climb = 1 - g.y / height;
        const a = Math.min(0.9, g.alpha * (0.55 + climb * 0.75));
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${r},${gr},${b},${a})`;
        ctx!.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    let raf = 0;
    let running = false;

    function loop() {
      drawFrame(true);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    drawFrame(false); // static first paint (also the reduced-motion frame)

    const ro = new ResizeObserver(() => {
      resize();
      drawFrame(false);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
    />
  );
}
