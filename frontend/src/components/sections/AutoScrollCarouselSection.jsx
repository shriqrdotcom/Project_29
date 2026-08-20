import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CARDS } from "../../data/cards";

// Duplicate 7-card list for seamless infinite vertical scrolling loop
const LOOP_CARDS = [...CARDS, ...CARDS, ...CARDS];

const CardItem = ({ card, index, containerRef }) => {
  const itemRef = useRef(null);
  const [scale, setScale] = useState(0.85);
  const [opacity, setOpacity] = useState(0.7);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let animId;
    const checkPosition = () => {
      if (itemRef.current && containerRef.current) {
        const itemRect = itemRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const itemCenter = itemRect.top + itemRect.height / 2;
        const containerCenter = containerRect.top + containerRect.height / 2;

        // Distance from center line of viewport section
        const distance = Math.abs(itemCenter - containerCenter);

        // 1 Big (Center) vs 2 Small (Middle) vs 2 Half (Edges)
        if (distance < 110) {
          const factor = 1 - distance / 110;
          setScale(0.85 + factor * 0.4); // 0.85 -> 1.25
          setOpacity(0.7 + factor * 0.3); // 0.7 -> 1.0
          setIsActive(true);
        } else {
          const maxDist = containerRect.height / 2;
          const factor = Math.min(1, (distance - 110) / (maxDist - 110));
          setScale(Math.max(0.75, 0.85 - factor * 0.1));
          setOpacity(Math.max(0.4, 0.7 - factor * 0.25));
          setIsActive(false);
        }
      }
      animId = requestAnimationFrame(checkPosition);
    };

    animId = requestAnimationFrame(checkPosition);
    return () => cancelAnimationFrame(animId);
  }, [containerRef]);

  return (
    <div
      ref={itemRef}
      className="flex h-[21vh] min-h-[160px] max-h-[220px] w-[300px] sm:w-[380px] shrink-0 items-center justify-center transition-all duration-150 ease-out"
      style={{
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[22px] bg-white transition-all duration-300 ${
          isActive
            ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-2 ring-neutral-900/10"
            : "shadow-md"
        }`}
      >
        <img
          src={card.image}
          alt={card.title}
          loading="eager"
          decoding="async"
          draggable="false"
          className="h-full w-full select-none object-cover"
        />
      </div>
    </div>
  );
};

export const AutoScrollCarouselSection = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      data-testid="auto-scroll-section"
      className="relative flex h-screen w-full overflow-hidden bg-[#e7e7ea] px-6 sm:px-16"
    >
      {/* Left Column: Center Screen Line & Indicator (w-1/2) */}
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
            Continuous 7-card vertical sequence with distance-based scaling.
            Active artwork highlights automatically at the center axis line.
          </p>
        </div>
      </div>

      {/* Right Column: Auto-Moving Vertical Image Track (w-1/2) */}
      <div className="relative flex w-1/2 h-full items-center justify-center overflow-hidden">
        {/* Top & Bottom gradient fade masks for clean edge bleeding */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#e7e7ea] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#e7e7ea] to-transparent" />

        {/* Center screen line overlay across the right track */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-px -translate-y-1/2 border-b border-dashed border-neutral-400/30" />

        {/* Infinite vertical scrolling loop */}
        <motion.div
          animate={{ y: ["0%", "-33.333%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col items-center gap-6 py-4"
        >
          {LOOP_CARDS.map((card, i) => (
            <CardItem
              key={`${card.id}-${i}`}
              card={card}
              index={i}
              containerRef={containerRef}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
