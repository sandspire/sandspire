"use client";

import { cn } from "@/lib/utils";

/** Centerlines along which flow animation travels (React Flow–style marching dashes + dots). */
const FLOW_EDGES = [
  { id: "left", d: "M 23.869 47.641 V 67.316 L 33.159 77.083 L 73.669 77.083", duration: 2.2 },
  { id: "right", d: "M 216.291 47.641 V 67.316 L 207.001 77.083 L 166.491 77.083", duration: 2.2 },
  { id: "center", d: "M 120.055 47.641 V 77.085 L 120.055 93.906 L 119.961 113.764", duration: 1.8 },
  { id: "bus", d: "M 73.669 77.083 H 166.491", duration: 1.6 },
] as const;

type Props = {
  className?: string;
};

export function HomePageV2ServiceFlowDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 239 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[87px] w-auto opacity-95 sm:h-[102px] md:h-[117px] lg:h-[122px]", className)}
      aria-hidden
    >
      <image href="/images/Service%20Icon%20Group.svg" width="239" height="143" />

      {FLOW_EDGES.map((edge) => (
        <g key={edge.id}>
          <path
            d={edge.d}
            fill="none"
            stroke="rgba(255, 119, 0, 0.28)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={edge.d}
            fill="none"
            stroke="#FF7700"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 7"
            className="service-flow-edge"
          />
          <circle r="2.75" fill="#FF7700" className="motion-reduce:hidden">
            <animateMotion dur={`${edge.duration}s`} repeatCount="indefinite" path={edge.d} />
          </circle>
        </g>
      ))}
    </svg>
  );
}
