"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type MarqueeImage = string | { src: string };

export const ThreeDMarquee = ({
  images,
  className,
  compact = false,
}: {
  images: MarqueeImage[];
  className?: string;
  compact?: boolean;
}) => {
  const imageSources = images.map((image) => (typeof image === "string" ? image : image.src));

  if (compact) {
    const compactImages = imageSources.slice(0, 9);
    const rows = [compactImages.slice(0, 3), compactImages.slice(3, 7), compactImages.slice(7, 9)];
    const rowOffsets = [320, 360, 300];

    return (
      <div
        className={cn(
          "relative mx-auto block h-[235px] overflow-hidden rounded-2xl bg-[#0f0f0f]",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 px-2 py-2.5">
          <div className="grid h-full grid-rows-3 gap-2">
            {rows.map((rowImages, rowIndex) => {
              const duplicated = rowImages.concat(rowImages, rowImages);
              return (
                <div key={`row-${rowIndex}`} className="relative overflow-hidden rounded-[10px]">
                  <motion.div
                    className="flex w-max gap-2"
                    animate={{
                      x:
                        rowIndex % 2 === 0
                          ? [0, -rowOffsets[rowIndex], 0]
                          : [-rowOffsets[rowIndex], 0, -rowOffsets[rowIndex]],
                    }}
                    transition={{
                      duration: 14 + rowIndex * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {duplicated.map((image, tileIndex) => {
                      return (
                        <div
                          key={`${rowIndex}-${tileIndex}-${image}`}
                          className="h-[72px] w-[128px] shrink-0 overflow-hidden rounded-[10px]"
                        >
                          <img
                            src={image}
                            alt={`Brand strategy row ${rowIndex + 1} tile ${tileIndex + 1}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const chunkSize = Math.ceil(imageSources.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return imageSources.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          className={cn(
            "size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100",
            compact && "size-[960px] scale-90 sm:scale-95 lg:scale-100",
          )}
        >
          <div
            style={{
              transform: compact
                ? "rotateX(52deg) rotateY(0deg) rotateZ(-38deg)"
                : "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className={cn(
              "relative right-[50%] top-96 grid size-full origin-top-left grid-cols-4 gap-8 transform-3d",
              compact && "right-[32%] top-[280px] gap-5",
            )}
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
