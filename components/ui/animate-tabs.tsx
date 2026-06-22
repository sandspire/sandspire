"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";

import { cn } from "@/lib/utils";

type TabsContextType = {
  activeValue: string;
  handleValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

type TabsProps = React.ComponentProps<"div"> & {
  value: string;
  onValueChange?: (value: string) => void;
};

/** Animate UI–style tabs with sliding panels. @see https://animate-ui.com/docs/components/animate/tabs */
export function Tabs({ value, onValueChange, className, children, ...props }: TabsProps) {
  const handleValueChange = React.useCallback(
    (next: string) => {
      onValueChange?.(next);
    },
    [onValueChange],
  );

  return (
    <TabsContext.Provider value={{ activeValue: value, handleValueChange }}>
      <div data-slot="tabs" className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentProps<"div">;

export function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsTrigger({
  value,
  className,
  children,
}: TabsTriggerProps) {
  const { activeValue, handleValueChange } = useTabs();
  const isActive = activeValue === value;

  return (
    <motion.button
      type="button"
      role="tab"
      data-slot="tabs-trigger"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => handleValueChange(value)}
      className={cn("relative", className)}
      whileTap={{ scale: 0.98 }}
    >
      {isActive ? (
        <motion.span
          layoutId="sandspire-tabs-highlight"
          className="absolute inset-0 rounded-full bg-white/20 shadow-sm ring-1 ring-white/10"
          transition={{ type: "spring", stiffness: 300, damping: 32, bounce: 0 }}
        />
      ) : null}
      <span className="relative z-[1]">{children}</span>
    </motion.button>
  );
}

const tabsContentsTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 32,
  bounce: 0,
  restDelta: 0.01,
};

type TabsContentsProps = {
  className?: string;
  children: React.ReactNode;
  transition?: Transition;
};

export function TabsContents({
  children,
  className,
  transition = tabsContentsTransition,
}: TabsContentsProps) {
  const { activeValue } = useTabs();
  const reduceMotion = useReducedMotion();
  const childrenArray = React.Children.toArray(children);
  const activeIndex = childrenArray.findIndex(
    (child): child is React.ReactElement<{ value: string }> =>
      React.isValidElement(child) &&
      typeof child.props === "object" &&
      child.props !== null &&
      "value" in child.props &&
      child.props.value === activeValue,
  );

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [height, setHeight] = React.useState(0);

  const measure = React.useCallback((index: number) => {
    const pane = itemRefs.current[index];
    if (!pane) return 0;
    return Math.ceil(pane.getBoundingClientRect().height);
  }, []);

  React.useLayoutEffect(() => {
    if (activeIndex < 0) return;

    const update = () => setHeight(measure(activeIndex));
    update();

    const pane = itemRefs.current[activeIndex];
    if (!pane) return;

    const ro = new ResizeObserver(update);
    ro.observe(pane);
    return () => ro.disconnect();
  }, [activeIndex, childrenArray.length, measure]);

  if (reduceMotion) {
    const activeChild = childrenArray[activeIndex] ?? null;
    return (
      <div data-slot="tabs-contents" className={className}>
        {activeChild}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      data-slot="tabs-contents"
      className={cn("overflow-hidden", className)}
      animate={{ height: height || "auto" }}
      transition={transition}
    >
      <motion.div
        className="flex w-full"
        animate={{ x: `${activeIndex * -100}%` }}
        transition={transition}
      >
        {childrenArray.map((child, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="w-full shrink-0"
          >
            {child}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

type TabsContentProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsContent({ value, className, children }: TabsContentProps) {
  const { activeValue } = useTabs();
  const isActive = activeValue === value;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="tabpanel"
      data-slot="tabs-content"
      inert={!isActive}
      aria-hidden={!isActive}
      className={cn("outline-none", className)}
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : { filter: isActive ? "blur(0px)" : "blur(4px)", opacity: isActive ? 1 : 0.65 }
      }
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}
