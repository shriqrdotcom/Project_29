import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { CARDS } from "../../data/cards";

// 7-card list duplicated 5 times for a mathematically seamless, glitch-free infinite vertical loop
const LOOP_CARDS = [...CARDS, ...CARDS, ...CARDS, ...CARDS, ...CARDS];

const CardNode = ({ card, index, yProgress, slotHeight }) => {
  // Distance-based continuous scaling normalized to slotHeight: 1.00 baseline -> 1.35 enlarged active center
  const scale = useTransform(yProgress, (latestY) => {
    if (!slotHeight || slotHeight <= 0) return 1.0;

    // Content center line is at the midpoint of the full loop track
    const contentCenter = (LOOP_CARDS.length * slotHeight) / 2;
    // Card center position inside the track + current track offset yProgress
    const cardCenter = index * slotHeight + slotHeight / 2 + latestY;
    const distance = Math.abs(cardCenter - contentCenter);

    // Relative cosine distance activation curve (0.0 to 1.0 relative to slotHeight)
    const norm = Math.min(1, distance / slotHeight);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 1.0 + bell * 0.35; // 1.00 base -> 1.35 magnified at exact center
  });

  const opacity = useTransform(yProgress, (latestY) => {
    if (!slotHeight || slotHeight <= 0) return 0.75;

    const contentCenter = (LOOP_CARDS.length * slotHeight) / 2;
    const cardCenter = index * slotHeight + slotHeight / 2 + latestY;
    const distance = Math.abs(cardCenter - contentCenter);

    const norm = Math.min(1, distance / slotHeight);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 0.75 + bell * 0.25; // 0.75 standard -> 1.00 active center
  });

  const zIndex = useTransform(yProgress, (latestY) => {
    if (!slotHeight || slotHeight <= 0) return 1;

    const contentCenter = (LOOP_CARDS.length * slotHeight) / 2;
    const cardCenter = index * slotHeight + slotHeight / 2 + latestY;
    const distance = Math.abs(cardCenter - contentCenter);

    const norm = Math.min(1, distance / slotHeight);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return Math.round(1 + bell * 30); // 1 -> 31
  });

  // Preserve exact original landscape frame proportions (380px width : 170px height = 2.235:1 aspect ratio)
  const cardHeight = slotHeight ? slotHeight * 0.72 : 170;

  return (
    <div
      style={{ height: `${slotHeight}px` }}
      className="relative flex w-full shrink-0 items-center justify-center pointer-events-none px-2"
    >
      <motion.div
        style={{
          height: `${cardHeight}px`,
          aspectRatio: "380 / 170",
          scale,
          opacity,
          zIndex,
          transformOrigin: "center center",
        }}
        className="relative max-w-[92%] overflow-hidden rounded-[18px] sm:rounded-[22px] bg-[#e7e7ea] shadow-[0_16px_45px_-12px_rgba(0,0,0,0.3)] ring-1 ring-neutral-900/10 pointer-events-auto transition-shadow duration-300 hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.45)]"
      >
        <img
          src={card.image}
          alt={card.title}
          loading="eager"
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover object-center scale-[1.08]"
          style={{ transformOrigin: "center center" }}
        />
      </motion.div>
    </div>
  );
};

export const AutoScrollCarouselSection = () => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(800);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);

  // Dynamic slot height calculated so exactly 3.5 slots fit in container (showing 5 items total: 1 center, 2 full, 2 half bleeding)
  const slotHeight = useMemo(() => {
    return containerHeight / 3.5;
  }, [containerHeight]);

  const setHeight = useMemo(() => {
    return CARDS.length * slotHeight;
  }, [slotHeight]);

  const slotHeightRef = useRef(slotHeight);
  const setHeightRef = useRef(setHeight);
  useEffect(() => {
    slotHeightRef.current = slotHeight;
    setHeightRef.current = setHeight;
  }, [slotHeight, setHeight]);

  const yProgress = useMotionValue(-CARDS.length * (800 / 3.5)); // Initial offset

  // ResizeObserver to track container height dynamically across all device viewports
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setContainerHeight(entry.contentRect.height);
        }
      }
    });

    observer.observe(el);
    setContainerHeight(el.clientHeight || window.innerHeight || 800);

    return () => observer.disconnect();
  }, []);

  // Frame-rate independent vertical loop
  useAnimationFrame((_, delta) => {
    if (isPausedRef.current) return;

    const currentSetHeight = setHeightRef.current;
    const currentSlotHeight = slotHeightRef.current;
    if (!currentSetHeight || !currentSlotHeight) return;

    const safeDelta = Math.min(delta, 64);
    // Smooth scroll speed relative to slot height
    const speed = (0.25 * currentSlotHeight) / 1000; // 0.25 slots per second
    let currentY = yProgress.get() - safeDelta * speed;
    if (currentY <= -2 * currentSetHeight) {
      currentY += currentSetHeight; // Seamless modulo loop shift
    }
    yProgress.set(currentY);
  });

  const handleMouseEnter = () => {
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    setIsPaused(false);
  };

  return (
    <section
      ref={containerRef}
      data-testid="auto-scroll-section"
      className="relative flex h-screen min-h-[480px] max-h-[1080px] w-full overflow-hidden bg-[#e7e7ea] px-4 sm:px-10 md:px-16"
    >
      {/* Left Column: Static Center Screen Line & Indicator (w-1/2, min-w-0, z-20) */}
      <div className="relative flex w-1/2 min-w-0 flex-col justify-center pr-4 sm:pr-8 md:pr-12 z-20">
        <div className="relative flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-neutral-400">
              Center screen line
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] sm:text-[13px] font-semibold text-neutral-900">
                Active
              </span>
              {isPaused && (
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-medium text-amber-700 ring-1 ring-amber-500/20">
                  Paused on Hover
                </span>
              )}
              <span className="text-neutral-400">→</span>
            </div>
          </div>
          <div className="h-px flex-1 min-w-[20px] bg-gradient-to-r from-neutral-400/60 to-transparent" />
        </div>

        <div className="mt-6 sm:mt-8 max-w-md">
          <h3 className="font-display text-[clamp(1.4rem,3vw,2.8rem)] font-semibold leading-[1.15] text-neutral-900">
            Automated Showcase Gallery
          </h3>
          <p className="mt-2 sm:mt-3 text-[12px] sm:text-[14px] leading-relaxed text-neutral-500">
            Continuous 5-node vertical composition with hardware-accelerated cosine distance scaling.
            Active artwork highlights smoothly at the center axis line and pauses on cursor hover.
          </p>
        </div>
      </div>

      {/* Right Column: Auto-Moving Vertical Image Track (w-1/2, min-w-0, overflow-hidden, z-10) */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid="autoplay-zone"
        className="relative flex w-1/2 min-w-0 h-full items-center justify-center overflow-hidden z-10 cursor-pointer"
      >
        {/* Top & Bottom gradient fade masks for clean 5-node edge bleeding */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-16 sm:h-24 bg-gradient-to-b from-[#e7e7ea] via-[#e7e7ea]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 sm:h-24 bg-gradient-to-t from-[#e7e7ea] via-[#e7e7ea]/80 to-transparent" />

        {/* Center screen line overlay across the right track */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-px -translate-y-1/2 border-b border-dashed border-neutral-400/40" />

        {/* Infinite vertical scrolling loop */}
        <motion.div style={{ y: yProgress }} className="flex flex-col items-center">
          {LOOP_CARDS.map((card, i) => (
            <CardNode
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              yProgress={yProgress}
              slotHeight={slotHeight}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
