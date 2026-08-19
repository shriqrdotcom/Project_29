import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSupportingContent = ({ progress }) => {
  const opacity = useTransform(progress, [0.55, 0.9], [0, 1]);
  const y = useTransform(progress, [0.55, 0.9], [18, 0]);

  return (
    <motion.div
      data-testid="hero-supporting"
      style={{ opacity, y }}
      className="relative z-40 mx-auto max-w-xl px-6 text-center will-change-transform"
    >
      <p className="text-[13.5px] sm:text-sm leading-relaxed text-neutral-500">
        unoneo gives independent artists a gallery-grade home to mint, showcase
        and sell one-of-a-kind pieces — while collectors discover work they
        can truly own.
      </p>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          data-testid="cta-primary-btn"
          className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[13.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
        >
          Start for $9/mo
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
        <button
          data-testid="cta-secondary-link"
          className="text-[13.5px] font-medium text-neutral-500 underline-offset-4 transition-colors duration-300 hover:text-neutral-900 hover:underline"
        >
          See how it works
        </button>
      </div>
    </motion.div>
  );
};
