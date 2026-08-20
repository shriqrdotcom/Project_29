import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CARDS } from "../../data/cards";

const EASE = [0.22, 1, 0.36, 1];

// Staggered blur-reveal: elements start offset on X, transparent and out-of-focus,
// then slide in, fade in, and sharpen. `custom` index drives the left-to-right cascade.
const reveal = {
  hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
  show: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.15, ease: EASE },
  }),
};

const CARD_ITEMS = [
  { type: "dots", label: "Artnesia Gap" },
  { type: "rainbow", label: "Immortalise Works" },
  { type: "image", label: "Creativity Class", image: CARDS[6].image },
  { type: "image", label: "Celebrates Party", image: CARDS[0].image },
];

const CardVisual = ({ item }) => {
  if (item.type === "dots") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0e0e0e]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1.4px, transparent 1.6px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "12px 12px",
          }}
        />
      </div>
    );
  }
  if (item.type === "rainbow") {
    return (
      <div
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(125% 125% at 14% 100%, #ef4444 0%, #f97316 13%, #eab308 25%, #22c55e 39%, #0ea5e9 54%, #6366f1 69%, #a855f7 83%, #1c1830 100%)",
        }}
      />
    );
  }
  return (
    <img
      src={item.image}
      alt={item.label}
      loading="lazy"
      draggable="false"
      className="h-full w-full select-none object-cover object-center"
    />
  );
};

export const MarketplaceSection = () => {
  const ref = useRef(null);
  // REPLAY FIX: once:false re-triggers the staggered blur-reveal EVERY time the
  // section re-enters the viewport (was once:true, which only played on first load).
  const inView = useInView(ref, { once: false, amount: 0.2 });
  const state = inView ? "show" : "hidden";

  return (
    <section
      ref={ref}
      data-testid="marketplace-section"
      className="relative w-full overflow-hidden bg-[#f5f4f2] px-6 py-24 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[1220px]">
        {/* Top row: heading (left) + View All (right) */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <motion.p
              custom={0}
              variants={reveal}
              initial="hidden"
              animate={state}
              data-testid="mp-eyebrow"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-900"
            >
              Get More <span className="text-fuchsia-500">Closer</span>
            </motion.p>
            <motion.h2
              custom={1}
              variants={reveal}
              initial="hidden"
              animate={state}
              data-testid="mp-heading"
              className="mt-4 font-display text-[clamp(2.6rem,6.5vw,5rem)] font-bold leading-[0.98] tracking-tight text-neutral-900"
            >
              Marketplace
              <br />
              for Creativity
            </motion.h2>
          </div>

          <motion.button
            type="button"
            custom={1}
            variants={reveal}
            initial="hidden"
            animate={state}
            data-testid="mp-viewall"
            className="shrink-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-7 py-3 text-[13px] font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-[1.03] sm:mt-4"
          >
            View All
          </motion.button>
        </div>

        {/* Content row: left column (subtext + arrows) | right column (cards + progress) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[260px_1fr]">
          {/* Left column */}
          <div className="flex flex-col justify-between gap-10">
            <motion.p
              custom={2}
              variants={reveal}
              initial="hidden"
              animate={state}
              data-testid="mp-subtext"
              className="max-w-[260px] text-[14px] leading-relaxed text-neutral-600"
            >
              In the realm of Artnesia, creativity knows no bounds, eternal
              marketplace celebrates the timeless nature of art.
            </motion.p>

            <motion.div
              custom={6}
              variants={reveal}
              initial="hidden"
              animate={state}
              data-testid="mp-arrows"
              className="flex items-center gap-3"
            >
              <button
                type="button"
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>

          {/* Right column: horizontal card carousel + progress line */}
          <div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {CARD_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={2 + i}
                  variants={reveal}
                  initial="hidden"
                  animate={state}
                  data-testid={`mp-card-${i + 1}`}
                >
                  <div className="aspect-square w-full cursor-pointer overflow-hidden rounded-[20px] shadow-sm transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.05] hover:shadow-2xl">
                    <CardVisual item={item} />
                  </div>
                  <p className="mt-3 text-[14px] font-semibold text-neutral-900">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Progress line */}
            <motion.div
              custom={6}
              variants={reveal}
              initial="hidden"
              animate={state}
              data-testid="mp-progress"
              className="mt-8 h-[3px] w-full rounded-full bg-neutral-200"
            >
              <div className="h-full w-1/4 rounded-full bg-neutral-900" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
