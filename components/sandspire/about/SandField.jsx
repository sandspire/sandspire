"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * SandField — a featherweight WebGL backdrop for the /about page.
 *
 * "Sandspire" made literal: a slow, domain-warped fbm noise field that drifts
 * like wind over warm sand, lit with the brand ember-orange and pooled toward a
 * cursor-following glow. Built on `ogl` (already a dependency, ~5KB) instead of
 * Three.js so it stays inside the Cloudflare Worker size budget.
 *
 * Discipline (same as the /home-3 canvas):
 *  - Pauses the render loop when scrolled off-screen (IntersectionObserver).
 *  - Honours prefers-reduced-motion (paints one still frame, then stops).
 *  - Caps DPR at 2 and degrades to a CSS gradient if WebGL is unavailable.
 *
 * Props:
 *  - className: sizing/positioning for the container (it fills it).
 *  - intensity: 0..1 multiplier on the ember brightness (default 1).
 */
export default function SandField({ className = "", intensity = 1 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    let gl;
    let canvas;
    try {
      renderer = new Renderer({
        dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2),
        alpha: false,
        antialias: false,
      });
      gl = renderer.gl;
      canvas = gl.canvas;
    } catch {
      // WebGL unavailable — the container's CSS background remains as fallback.
      return;
    }

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

    const fragment = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec3  iResolution;
uniform float iTime;
uniform vec2  iMouse;     // normalized 0..1, y up
uniform float uIntensity;

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
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = vUv;
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 p = uv;
  p.x *= aspect;

  float t = iTime * 0.045;

  // Domain-warped fbm — sand drifting in a slow wind.
  vec2 q = vec2(fbm(p * 2.2 + vec2(0.0, t)),
                fbm(p * 2.2 + vec2(5.2, -t * 1.2)));
  vec2 r = vec2(fbm(p * 2.2 + 2.4 * q + vec2(1.7, 9.2) - t * 0.6),
                fbm(p * 2.2 + 2.4 * q + vec2(8.3, 2.8) + t * 0.4));
  float f = fbm(p * 2.2 + 2.6 * r);
  f = clamp(f * 1.15, 0.0, 1.0);

  // Brand palette
  vec3 cDark   = vec3(0.027, 0.020, 0.014); // #070504 base
  vec3 cEmber  = vec3(0.22, 0.06, 0.005);   // deep ember
  vec3 cOrange = vec3(1.0, 0.37, 0.0);      // #ff5e00
  vec3 cGold   = vec3(0.97, 0.58, 0.11);    // #f7941d

  vec3 col = mix(cDark, cEmber, smoothstep(0.15, 0.70, f));
  col = mix(col, cOrange, smoothstep(0.62, 0.97, f) * 0.85 * uIntensity);
  col += cGold * pow(clamp(r.x, 0.0, 1.0), 3.0) * smoothstep(0.55, 1.0, f) * 0.5 * uIntensity;

  // Cursor warmth — ember pools toward the pointer.
  float md = length((uv - iMouse) * vec2(aspect, 1.0));
  col += cOrange * 0.30 * uIntensity * smoothstep(0.55, 0.0, md) * (0.5 + 0.5 * f);

  // Radial vignette keeps the edges quiet and atmospheric.
  vec2 vc = uv - 0.5;
  vc.x *= aspect;
  float vig = smoothstep(1.10, 0.25, length(vc));
  col *= mix(0.42, 1.0, vig);

  // Fine grain to kill banding.
  col += (hash(gl_FragCoord.xy + iTime) - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`;

    const uniforms = {
      iResolution: { value: [1, 1, 1] },
      iTime: { value: 0 },
      iMouse: { value: [0.5, 0.5] },
      uIntensity: { value: intensity },
    };

    const program = new Program(gl, { vertex, fragment, uniforms });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const mouseTarget = [0.5, 0.5];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width || 1, rect.height || 1);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseTarget[0] = (e.clientX - rect.left) / (rect.width || 1);
      mouseTarget[1] = 1 - (e.clientY - rect.top) / (rect.height || 1);
    };
    // Track across the whole window so the glow keeps following past the hero.
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Pause when off-screen.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(container);

    let raf = 0;
    const renderOnce = (timeMs) => {
      uniforms.iTime.value = timeMs * 0.001;
      const cur = uniforms.iMouse.value;
      cur[0] += (mouseTarget[0] - cur[0]) * 0.06;
      cur[1] += (mouseTarget[1] - cur[1]) * 0.06;
      try {
        renderer.render({ scene: mesh });
      } catch {
        /* swallow transient context errors */
      }
    };

    if (reduce) {
      // One still frame, no loop.
      renderOnce(1200);
    } else {
      const loop = (timeMs) => {
        raf = requestAnimationFrame(loop);
        if (!onScreen) return;
        renderOnce(timeMs);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      if (canvas && canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      const callIfFn = (obj, key) => {
        if (obj && typeof obj[key] === "function") obj[key].call(obj);
      };
      callIfFn(program, "remove");
      callIfFn(geometry, "remove");
      callIfFn(mesh, "remove");
      callIfFn(renderer, "destroy");
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{
        // CSS fallback if WebGL never paints.
        background:
          "radial-gradient(60rem 44rem at 50% 18%, rgba(255,94,0,0.18), transparent 60%), #070504",
      }}
    />
  );
}
