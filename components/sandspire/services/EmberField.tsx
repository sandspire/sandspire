"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * EmberField — a bespoke WebGL backdrop for the /services hero.
 *
 * A near-black field of slow, rising "embers" rendered with fractal noise, tinted
 * in the Sandspire orange, with a soft glow that tracks the pointer. Written from
 * scratch as a single full-screen fragment shader. Uses `ogl` (already a project
 * dependency) so it adds *no* new bundle weight — this is how we get a genuinely
 * GPU-driven hero without pulling in Three.js (which would blow the Cloudflare
 * Worker size budget, the same reason /home-3 avoids it).
 *
 * Self-managing: caps DPR for perf, damps the pointer, pauses its render loop when
 * scrolled off-screen or when the tab is hidden, and renders a single calm frame
 * (no animation) under prefers-reduced-motion.
 */
export function EmberField({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 1.75),
        alpha: false,
        antialias: false,
      });
    } catch {
      // WebGL unavailable — the parent's CSS gradient fallback shows instead.
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision mediump float;

      uniform vec3  iResolution;
      uniform float iTime;
      uniform vec2  iMouse;      // normalised 0..1, y up
      uniform float iMouseGlow;  // 0..1 strength

      varying vec2 vUv;

      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++){
          v += a * noise(p);
          p *= 2.02;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = vUv;
        float aspect = iResolution.x / max(iResolution.y, 1.0);
        vec2 p = vec2(uv.x * aspect, uv.y);

        float t = iTime * 0.06;

        // Two layers of fbm drifting upward at different speeds = smouldering haze.
        float n1 = fbm(p * 2.6 + vec2(0.0, -t * 2.2));
        float n2 = fbm(p * 5.2 + vec2(t * 0.6, -t * 3.6) + n1 * 1.2);

        // Embers concentrate toward the lower half and thin out as they rise.
        float rise = 1.0 - smoothstep(-0.1, 1.05, uv.y);
        float heat = pow(n2, 2.4) * rise;
        float sparks = pow(n1, 3.5) * (0.5 + 0.5 * rise);

        // Palette: near-black base -> deep ember -> warm amber.
        vec3 base  = vec3(0.039, 0.024, 0.016); // #0a0604
        vec3 ember = vec3(1.0,   0.37,  0.0);    // #ff5e00
        vec3 amber = vec3(0.97,  0.58,  0.11);   // #f7941d

        vec3 col = base;
        col += ember * heat  * 0.55;
        col += amber * sparks * 0.18;

        // Pointer glow.
        vec2 m = vec2(iMouse.x * aspect, iMouse.y);
        float d = distance(p, m);
        float spot = exp(-d * d * 3.2);
        col += ember * spot * 0.30 * iMouseGlow;

        // Soft top fade + vignette so headline copy stays legible.
        col *= mix(0.45, 1.0, smoothstep(1.15, 0.15, length(uv - 0.5)));
        col *= mix(0.55, 1.0, smoothstep(1.0, 0.25, uv.y));

        // Fine grain.
        col += (hash(uv * iResolution.xy + iTime) - 0.5) * 0.035;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const uniforms = {
      iResolution: { value: [1, 1, 1] as [number, number, number] },
      iTime: { value: 0 },
      iMouse: { value: [0.7, 0.55] as [number, number] },
      iMouseGlow: { value: 0 },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const mouseTarget: [number, number] = [0.7, 0.55];
    let glowTarget = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        1,
      ];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseTarget[0] = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouseTarget[1] = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
      glowTarget = 1;
    };
    const onLeave = () => {
      glowTarget = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave);

    // Pause when off-screen or tab hidden.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(container);

    let raf = 0;
    const renderOnce = (timeSec: number) => {
      uniforms.iTime.value = timeSec;
      // Damp pointer + glow toward their targets.
      const m = uniforms.iMouse.value;
      m[0] += (mouseTarget[0] - m[0]) * 0.08;
      m[1] += (mouseTarget[1] - m[1]) * 0.08;
      uniforms.iMouseGlow.value += (glowTarget - uniforms.iMouseGlow.value) * 0.06;
      renderer.render({ scene: mesh });
    };

    if (reduce) {
      // One calm frame, no loop.
      renderOnce(8.0);
    } else {
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        if (!onScreen || document.hidden) return;
        renderOnce(t * 0.001);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      if (canvas.parentElement === container) container.removeChild(canvas);
      const loseCtx = gl.getExtension("WEBGL_lose_context");
      if (loseCtx) loseCtx.loseContext();
    };
  }, []);

  return <div ref={containerRef} aria-hidden className={className} />;
}

export default EmberField;
