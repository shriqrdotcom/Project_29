import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, Quote, Sparkles, ArrowRight } from "lucide-react";
import { CARDS } from "../../data/cards";

// Reuse an existing painterly-face artwork for the wide image card (Box 2)
const ART_IMAGE = CARDS[4].image;

// Premium, no-bounce reveal. Each card enters after the previous one finishes,
// driven by an index-based delay so the order is strictly 1 -> 2 -> 3 -> 4.
const EASE = [0.22, 1, 0.36, 1];
const STEP = 0.62; // gap between each card's start (> duration => previous finishes first)

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.975 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * STEP, ease: EASE },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const NarrativeThreadSection = () => {
  const ref = useRef(null);
  // Deterministic trigger: fires once when 20% of the section scrolls into view.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const state = inView ? "show" : "hidden";

  return (
    <section
      ref={ref}
      data-testid="narrative-thread-section"
      className="relative w-full bg-white px-6 py-24 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[1120px]">
        {/* Heading area */}
        <motion.div
          className="mx-auto max-w-[860px] text-center"
          initial="hidden"
          animate={state}
          variants={headingVariants}
        >
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.32em] text-emerald-500">
            The Narrative Thread
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-tight text-neutral-900">
            Every piece of art tells
            <br className="hidden sm:block" /> a story.
          </h2>
        </motion.div>

        {/* Four-card bento composition */}
        <div className="mt-14 space-y-5">
          {/* Row 1: narrow dark portrait + wide image */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[36fr_62fr]">
            {/* Box 1 — Top Left: tall dark navy quote */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate={state}
              data-testid="nt-card-1"
              className="flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#0a1524] p-8 sm:p-9 md:h-[540px]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-sky-400/90">
                    Curator Note #084
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
                    <Volume2 size={16} />
                  </span>
                </div>
                <p className="mt-9 font-display text-[clamp(1.4rem,2vw,1.95rem)] font-semibold leading-[1.28] text-white">
                  &quot;Art isn&apos;t merely an asset on a ledger &mdash; it&apos;s an
                  intimate human transmission through time.&quot;
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-white">Elena Vasquez</p>
                  <p className="mt-0.5 text-[12px] leading-tight text-white/50">
                    Senior Curator, Madrid
                    <br />
                    Triennial
                  </p>
                </div>
                <div className="text-right font-mono text-[12px] leading-tight text-sky-400/90">
                  02:45
                  <br />
                  Audio
                </div>
              </div>
            </motion.div>

            {/* Box 2 — Top Right: wide full-bleed image */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate={state}
              data-testid="nt-card-2"
              className="relative min-h-[440px] overflow-hidden rounded-[28px] md:h-[540px]"
            >
              <img
                src={ART_IMAGE}
                alt="Archival edition artwork"
                loading="lazy"
                draggable="false"
                className="absolute inset-0 h-full w-full select-none object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-9">
                <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-emerald-300">
                  Physical Archival Edition
                </span>
                <p className="mt-2 max-w-[520px] font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-semibold leading-[1.18] text-white">
                  Hand-pulled serigraphs on 320gsm Hahnem&uuml;hle cotton rag.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Row 2: wide cream + compact orange */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[58fr_40fr]">
            {/* Box 3 — Bottom Left: wide cream quote */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              animate={state}
              data-testid="nt-card-3"
              className="flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#f7f4ec] p-8 sm:p-10 md:h-[440px]"
            >
              <div>
                <Quote size={44} className="fill-[#f2724b] text-[#f2724b]" />
                <p className="mt-6 max-w-[460px] font-display text-[clamp(1.3rem,1.9vw,1.75rem)] font-medium leading-[1.4] text-neutral-800">
                  When the artist controls both the exhibition medium and the
                  commercial protocol, pure creative autonomy replaces
                  algorithmic compromises.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-[12px] font-semibold text-white">
                  PR
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-neutral-900">
                    Pallet Ross Manifesto
                  </p>
                  <p className="text-[12px] text-neutral-500">Published Autumn 2026</p>
                </div>
              </div>
            </motion.div>

            {/* Box 4 — Bottom Right: compact orange CTA */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate={state}
              data-testid="nt-card-4"
              className="flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[28px] bg-[#f96a45] p-8 sm:p-10 md:h-[440px]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white">
                <Sparkles size={18} />
              </span>
              <div>
                <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/70">
                  Zero Friction Drops
                </span>
                <p className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.15rem)] font-semibold leading-[1.18] text-white">
                  Instant collector settlement with zero gas volatility.
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-white">
                  <span>Explore Drops</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
