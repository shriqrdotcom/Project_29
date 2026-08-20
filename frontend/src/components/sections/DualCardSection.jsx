import { motion } from "framer-motion";
import { Compass, Briefcase } from "lucide-react";

const PORTRAIT_IMG = "/images/meet-portrait.jpg";
const FLOWER_IMG = "/images/flower-art.jpg";

const EASE = [0.22, 1, 0.36, 1];

// Stagger container: left card enters slightly before the right card.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// Simple, smooth slide-up + fade entrance for each card.
const cardVariants = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const DualCardSection = () => {
  return (
    <section
      data-testid="dual-card-section"
      className="w-full bg-[#f5f4f2] px-6 pb-24 pt-8 sm:px-10 sm:pb-28"
    >
      <motion.div
        className="mx-auto grid max-w-[1220px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* ---------- Card 1: Meets new people (magenta, white text) ---------- */}
        <motion.div
          variants={cardVariants}
          data-testid="dc-card-1"
          className="relative min-h-[500px] overflow-hidden rounded-[2rem] md:min-h-[560px]"
        >
          {/* Magenta base color */}
          <div className="absolute inset-0 bg-[#c81e63]" />
          {/* Layered background image, tinted to the magenta brand tone */}
          <img
            src={PORTRAIT_IMG}
            alt="Meet new people"
            loading="lazy"
            draggable="false"
            className="absolute inset-0 h-full w-full select-none object-cover object-[center_18%] mix-blend-luminosity"
          />
          {/* Bottom gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Bottom-anchored content */}
          <div className="relative z-20 flex h-full flex-col justify-end p-8 sm:p-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-white">
              <Compass size={18} />
            </span>
            <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,2.7rem)] font-semibold leading-[1.05] text-white">
              Meets
              <br />
              new people
            </h3>
            <p className="mt-4 max-w-[360px] text-[14px] leading-relaxed text-white/80">
              Creators and enthusiasts to share, discover, and purchase unique
              artworks.
            </p>
            <div className="mt-7">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-neutral-900 transition-transform hover:scale-[1.04]"
              >
                Let&apos;s Meet
              </button>
            </div>
          </div>
        </motion.div>

        {/* ---------- Card 2: Archive of new arts (white, black text) ---------- */}
        <motion.div
          variants={cardVariants}
          data-testid="dc-card-2"
          className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-white md:min-h-[560px]"
        >
          {/* Layered flower graphic anchored to the top-right */}
          <img
            src={FLOWER_IMG}
            alt="Archive of new arts"
            loading="lazy"
            draggable="false"
            className="absolute inset-0 h-full w-full select-none object-cover object-[right_top]"
          />
          {/* Soft white wash on the lower-left to protect black text */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />

          {/* Bottom-anchored content */}
          <div className="relative z-20 flex h-full flex-col justify-end p-8 sm:p-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
              <Briefcase size={16} />
            </span>
            <h3 className="mt-6 font-display text-[clamp(2rem,3.4vw,2.7rem)] font-semibold leading-[1.05] text-neutral-900">
              Archive
              <br />
              of new arts
            </h3>
            <p className="mt-4 max-w-[360px] text-[14px] leading-relaxed text-neutral-600">
              Canvas Carousel is the platform where artists can ride the wave of
              creativity, showcasing their work to a broad audience.
            </p>
            <div className="mt-7">
              <button
                type="button"
                className="rounded-full bg-neutral-900 px-6 py-3 text-[13px] font-semibold text-white transition-transform hover:scale-[1.04]"
              >
                Archives
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
