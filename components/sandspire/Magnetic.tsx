"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How hard the element is pulled toward the cursor (0–1, edge fraction). */
  strength?: number;
};

/**
 * Magnetic hover wrapper.
 *
 * The child drifts toward the cursor while it's over the element, then springs
 * back to centre on leave — the quiet "pull" you feel on premium buttons. It's
 * a mouse-only flourish: touch pointers and reduced-motion users get a plain
 * static element, so it never fights a tap or causes nausea.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: relX * strength, y: relY * strength });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
