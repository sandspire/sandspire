import { cn } from "@/lib/utils";

/**
 * A 9:16 "reel" card. Until real client footage is supplied, the video surface
 * is a slow-panning brand-gradient loop with a play affordance — so the page
 * reads as a video-first studio without faking any specific footage or numbers.
 */
export type ReelCardProps = {
  /** Brand / venue name */
  name: string;
  /** @handle or short descriptor under the name */
  handle?: string;
  /** Small category chip, top-left */
  category?: string;
  /** Result line, e.g. a view count. Pass a real value when available. */
  metric?: string;
  /** When true the metric renders as a clearly-unfilled placeholder. */
  metricPlaceholder?: boolean;
  /** 0-3, selects the gradient tint */
  tint?: number;
  className?: string;
  style?: React.CSSProperties;
};

const TINTS = [
  "radial-gradient(120% 90% at 30% 15%, #ff7a3d 0%, #ff5e00 32%, #a31f11 72%, #2a0c06 100%)",
  "radial-gradient(120% 90% at 70% 20%, #f7941d 0%, #c2913f 38%, #6e3a12 78%, #221206 100%)",
  "radial-gradient(120% 100% at 40% 80%, #ff5e00 0%, #a31f11 45%, #3a1208 80%, #190805 100%)",
  "radial-gradient(120% 90% at 60% 10%, #ffb066 0%, #f7941d 30%, #a31f11 70%, #1c0a05 100%)",
];

export function ReelCard({
  name,
  handle,
  category,
  metric,
  metricPlaceholder = false,
  tint = 0,
  className,
  style,
}: ReelCardProps) {
  return (
    <figure
      className={cn(
        "group relative aspect-[9/16] w-full overflow-hidden rounded-[22px] border border-white/10 bg-[#160a06] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
      style={style}
    >
      {/* Panning gradient "footage" */}
      <div
        aria-hidden
        className="home3-reel-surface absolute inset-0 scale-110"
        style={{ backgroundImage: TINTS[tint % TINTS.length] }}
      />
      {/* Film grain + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 55%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* Top row: category + duration */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
        {category ? (
          <span className="rounded-full bg-black/30 px-2.5 py-1 font-[family-name:var(--font-body)] text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
            {category}
          </span>
        ) : (
          <span />
        )}
        <span className="rounded-full bg-black/30 px-2 py-1 font-[family-name:var(--font-body)] text-[10px] font-medium tabular-nums text-white/80 backdrop-blur-sm">
          0:14
        </span>
      </div>

      {/* Play glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/12 backdrop-blur-md transition-transform duration-500 ease-out group-hover:scale-110">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
            <path d="M3 2.5 17 11 3 19.5V2.5Z" fill="#FAF3E8" />
          </svg>
        </span>
      </div>

      {/* Bottom caption */}
      <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
        <p className="font-[family-name:var(--font-display)] text-[18px] font-medium leading-tight text-[#FAF3E8]">
          {name}
        </p>
        {handle ? (
          <p className="mt-0.5 font-[family-name:var(--font-body)] text-[11px] font-medium text-white/65">
            {handle}
          </p>
        ) : null}
        {metric ? (
          metricPlaceholder ? (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/40 px-2.5 py-1 font-[family-name:var(--font-body)] text-[11px] font-semibold text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e00]" />
              {metric}
            </span>
          ) : (
            <span className="mt-2 inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] text-[12px] font-semibold text-[#FAF3E8]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                  stroke="#FAF3E8"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="12" r="2.6" fill="#FAF3E8" />
              </svg>
              {metric}
            </span>
          )
        ) : null}
        {/* Progress bar */}
        <span className="mt-3 block h-[3px] w-full overflow-hidden rounded-full bg-white/20">
          <span className="home3-reel-progress block h-full w-1/3 rounded-full bg-[#FAF3E8]" />
        </span>
      </figcaption>
    </figure>
  );
}
