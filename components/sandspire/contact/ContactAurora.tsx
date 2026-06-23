"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * ContactAurora — a bespoke WebGL backdrop for the /contact hero.
 *
 * The visual idea is "the spire": warm, domain-warped light curtains drift upward
 * on a near-black field and gather into a single soft column of light in the
 * centre, like a signal rising. A pointer-tracking bloom lets the visitor "stir"
 * the light. It is deliberately different from the /services EmberField (which is
 * a low, smouldering ember haze) so the two pages don't feel like the same effect.
 *
 * Rendered as one full-screen fragment shader via `ogl` (already a project
 * dependency) so it adds NO new bundle weight — the same reason /home-3 and
 * /services avoid Three.js (Cloudflare Worker size budget).
 *
 * Self-managing: caps DPR, damps the pointer, pauses its render loop when scrolled
 * off-screen or when the tab is hidden, and paints a single calm frame (no loop)
 * under prefers-reduced-motion.
 */
export function ContactAurora({ className = "" }: { className?: string }) {
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

      uniform vec2  iResolution;
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
          p *= 2.03;
          a *= 0.5;
        }
        return v;
      }

      void main(){
        vec2 uv = vUv;
        float aspect = iResolution.x / max(iResolution.y, 1.0);
        // Centre x so the "spire" sits in the middle and reads symmetrically.
        vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);

        float t = iTime * 0.05;

        // Domain-warped fbm = flowing aurora curtains that rise as time passes.
        vec2 q = vec2(
          fbm(p * 1.6 + vec2(0.0,  t)),
          fbm(p * 1.6 + vec2(5.2, -t))
        );
        vec2 r = vec2(
          fbm(p * 2.2 + q * 1.5 + vec2(1.7,  t * 1.3)),
          fbm(p * 2.2 + q * 1.5 + vec2(8.3, -t * 0.9))
        );
        float f = fbm(p * 2.4 + r * 1.6);
        float curtain = pow(f, 1.8);

        // The spire: a soft vertical column of light at x = 0 that flickers as it rises.
        float column = exp(-pow(p.x * 2.3, 2.0));
        float flicker = 0.55 + 0.55 * fbm(vec2(p.x * 3.0, uv.y * 3.2 - t * 5.0));
        float spire = column * flicker * smoothstep(-0.15, 0.95, uv.y);

        // More energy lower-centre, thinning toward the top.
        float field = curtain * mix(0.22, 1.0, 1.0 - uv.y);

        // Palette: near-black base -> ember orange -> warm amber tips.
        vec3 base  = vec3(0.035, 0.022, 0.014); // ~#0a0604
        vec3 ember = vec3(1.0,   0.37,  0.0);    // #ff5e00
        vec3 amber = vec3(0.97,  0.58,  0.11);   // #f7941d

        vec3 col = base;
        col += ember * field          * 0.50;
        col += ember * spire          * 0.65;
        col += amber * pow(curtain, 3.0) * 0.22;

        // Pointer bloom — stirs the light where the cursor is.
        vec2 m = vec2((iMouse.x - 0.5) * aspect, iMouse.y);
        float d = distance(p, m);
        col += ember * exp(-d * d * 3.0) * 0.32 * iMouseGlow;

        // Vignette + top fade so headline copy stays legible over the brightness.
        col *= mix(0.40, 1.0, smoothstep(1.2, 0.2, length(uv - 0.5)));
        col *= mix(0.48, 1.0, smoothstep(1.0, 0.32, uv.y));

        // Fine grain to kill banding on the dark gradients.
        col += (hash(uv * iResolution.xy + iTime) - 0.5) * 0.03;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const uniforms = {
      iResolution: { value: [1, 1] as [number, number] },
      iTime: { value: 0 },
      iMouse: { value: [0.5, 0.42] as [number, number] },
      iMouseGlow: { value: 0 },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const mouseTarget: [number, number] = [0.5, 0.42];
    let glowTarget = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
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
      const m = uniforms.iMouse.value;
      m[0] += (mouseTarget[0] - m[0]) * 0.07;
      m[1] += (mouseTarget[1] - m[1]) * 0.07;
      uniforms.iMouseGlow.value += (glowTarget - uniforms.iMouseGlow.value) * 0.05;
      renderer.render({ scene: mesh });
    };

    if (reduce) {
      renderOnce(6.0);
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

export default ContactAurora;
