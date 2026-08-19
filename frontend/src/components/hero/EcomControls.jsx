import { motion, useTransform } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

// Minimal vertical up/down controls on the right, fading in near the end.
export const EcomControls = ({ progress }) => {
  const opacity = useTransform(progress, [0.88, 0.96], [0, 1]);
  const x = useTransform(progress, [0.88, 0.96], [10, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      data-testid="ecom-controls"
      className="absolute right-[3%] top-1/2 z-[70] flex -translate-y-1/2 flex-col gap-2"
    >
      <button
        data-testid="ecom-control-up"
        aria-label="Previous"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-600 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-900"
      >
        <ChevronUp size={16} strokeWidth={1.75} />
      </button>
      <button
        data-testid="ecom-control-down"
        aria-label="Next"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-600 backdrop-blur transition-all duration-300 hover:translate-y-0.5 hover:text-neutral-900"
      >
        <ChevronDown size={16} strokeWidth={1.75} />
      </button>
    </motion.div>
  );
};
