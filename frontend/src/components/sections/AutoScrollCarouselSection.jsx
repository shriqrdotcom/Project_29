import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { CARDS } from "../../data/cards";

// 7-card list duplicated 5 times for a mathematically seamless, glitch-free infinite vertical loop
const LOOP_CARDS = [...CARDS, ...CARDS, ...CARDS, ...CARDS, ...CARDS];

const SLOT_HEIGHT = 206; // 170px base + 36px gap = 206px slot height
const SET_HEIGHT = CARDS.length * SLOT_HEIGHT; // 7 * 206 = 1442px single set height

const CardNode = ({ card, index, yProgress, containerHeight }) => {
  // Continuous distance-based scaling interpolation from 1.00 (baseline) -> 1.10 (center peak)
  const scale = useTransform(yProgress, (latestY) => {
    if (!containerHeight) return 1.0;
    // Calculate card's current center relative to container top
    const cardCenter = index * SLOT_HEIGHT + SLOT_HEIGHT / 2 + latestY;
    const containerCenter = containerHeight / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    // Cosine bell curve activation zone centered at the screen line (200px radius)
    const norm = Math.min(1, distance / 200);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 1.0 + bell * 0.10; // Baseline 1.00 -> Slightly larger 1.10 at center!
  });

  const opacity = useTransform(yProgress, (latestY) => {
    if (!containerHeight) return 0.85;
    const cardCenter = index * SLOT_HEIGHT + SLOT_HEIGHT / 2 + latestY;
    const containerCenter = containerHeight / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    const norm = Math.min(1, distance / 220);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 0.85 + bell * 0.15; // 0.85 baseline -> 1.00 active center
  });

  const zIndex = useTransform(yProgress, (latestY) => {
    if (!containerHeight) return 1;
    const cardCenter = index * SLOT_HEIGHT + SLOT_HEIGHT / 2 + latestY;
    const containerCenter = containerHeight / 2;
    const distance = Math.abs(cardCenter - containerCenter);
    const norm = Math.min(1, distance / 200);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return Math.round(1 + bell * 20); // 1 -> 21
  });

  return (
    <div className="relative flex h-[170px] w-[320px] sm:w-[380px] shrink-0 items-center justify-center pointer-events-none">
      <motion.div
        style={{
          scale,
          opacity,
          zIndex,
          transformOrigin: "center center",
        }}
        className="relative h-full w-full overflow-hidden rounded-[22px] bg-white shadow-[0_16px_45px_-12px_rgba(0,0,0,0.3)] ring-1 ring-neutral-900/10 pointer-events-auto"
      >
        <img
          src={card.image}
          alt={card.title}
          loading="eager"
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover"
        />
      </motion.div>
    </div>
  );
};

export const AutoScrollCarouselSection = () => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(800);
  const yProgress = useMotionValue(-SET_HEIGHT); // Start in middle set zone

  // Endlessly smooth, glitch-free frame-rate independent vertical loop
  useAnimationFrame((_, delta) => {
    const speed = 0.055; // pixels per millisecond
    let currentY = yProgress.get() - delta * speed;
    if (currentY <= -2 * SET_HEIGHT) {
      currentY += SET_HEIGHT; // Seamless modulo shift (Set 3 -> Set 2 with 0px visual shift)
    }
    yProgress.set(currentY);
  });

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section
      ref={containerRef}
      data-testid="auto-scroll-section"
      className="relative flex h-screen w-full overflow-hidden bg-[#e7e7ea] px-6 sm:px-16"
    >
      {/* Left Column: Static Center Screen Line & Indicator (w-1/2) */}
      <div className="relative flex w-1/2 flex-col justify-center pr-8">
        <div className="relative flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-400">
              Center screen line
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-neutral-900">
                Active
              </span>
              <span className="text-neutral-400">→</span>
            </div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-neutral-400/60 to-transparent" />
        </div>

        <div className="mt-8 max-w-md">
          <h3 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold leading-[1.1] text-neutral-900">
            Automated Showcase Gallery
          </h3>
          <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">
            Continuous 5-node vertical composition with hardware-accelerated cosine distance scaling.
            Active artwork highlights smoothly at the center axis line.
          </p>
        </div>
      </div>

      {/* Right Column: Auto-Moving Vertical Image Track (w-1/2) */}
      <div className="relative flex w-1/2 h-full items-center justify-center overflow-y-hidden overflow-x-visible">
        {/* Top & Bottom gradient fade masks for clean 5-node edge bleeding */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#e7e7ea] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#e7e7ea] to-transparent" />

        {/* Center screen line overlay across the right track */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-px -translate-y-1/2 border-b border-dashed border-neutral-400/30" />

        {/* Infinite vertical scrolling loop */}
        <motion.div style={{ y: yProgress }} className="flex flex-col items-center gap-10">
          {LOOP_CARDS.map((card, i) => (
            <CardNode
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              yProgress={yProgress}
              containerHeight={containerHeight}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
