import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { CARDS } from "../../data/cards";

// Duplicate 7-card list 3 times for a seamless, 100% infinite vertical loop
const LOOP_CARDS = [...CARDS, ...CARDS, ...CARDS];

const SLOT_HEIGHT = 216; // 180px base + 36px gap = 216px slot height
const TOTAL_LOOP_HEIGHT = CARDS.length * SLOT_HEIGHT; // 7 * 216 = 1512px

const CardNode = ({ card, index, yProgress, containerHeight }) => {
  // Continuous mathematical interpolation based on pixel distance to 50vh center line
  const scale = useTransform(yProgress, (latestY) => {
    if (!containerHeight) return 0.80;
    // Calculate card's current center relative to container top
    const cardCenter = index * SLOT_HEIGHT + SLOT_HEIGHT / 2 + latestY;
    const containerCenter = containerHeight / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    // Continuous cosine bell curve interpolation (0.80 base -> 1.30 peak active center)
    const norm = Math.min(1, distance / 200);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 0.80 + bell * 0.50; // ultra-smooth pixel-by-pixel range from 0.80 -> 1.30!
  });

  const opacity = useTransform(yProgress, (latestY) => {
    if (!containerHeight) return 0.65;
    const cardCenter = index * SLOT_HEIGHT + SLOT_HEIGHT / 2 + latestY;
    const containerCenter = containerHeight / 2;
    const distance = Math.abs(cardCenter - containerCenter);

    const norm = Math.min(1, distance / 240);
    const bell = 0.5 * (1 + Math.cos(Math.PI * norm));
    return 0.6 + bell * 0.4; // smooth pixel-by-pixel range from 0.6 -> 1.0
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
    <div className="relative flex h-[180px] w-[340px] sm:w-[420px] shrink-0 items-center justify-center pointer-events-none">
      <motion.div
        style={{
          scale,
          opacity,
          zIndex,
          transformOrigin: "center center",
        }}
        className="relative h-full w-full overflow-hidden rounded-[24px] bg-white shadow-[0_22px_55px_-15px_rgba(0,0,0,0.35)] ring-1 ring-neutral-900/10 pointer-events-auto"
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
  const yProgress = useMotionValue(0);

  // Endlessly smooth, frame-rate independent vertical loop
  useAnimationFrame((_, delta) => {
    const speed = 0.055; // pixels per millisecond
    const currentY = yProgress.get();
    let nextY = currentY - delta * speed;
    if (nextY <= -TOTAL_LOOP_HEIGHT) {
      nextY += TOTAL_LOOP_HEIGHT;
    }
    yProgress.set(nextY);
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
