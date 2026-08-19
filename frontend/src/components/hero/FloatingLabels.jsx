import { motion, useTransform } from "framer-motion";
import { FLOATING_LABELS } from "../../data/cards";

const Label = ({ label, progress }) => {
  const opacity = useTransform(progress, [0.42, 0.68], [0, 1]);
  const y = useTransform(progress, [0.42, 0.72], [label.from, 0]);
  const scale = useTransform(progress, [0.42, 0.72], [0.95, 1]);

  return (
    <motion.div
      data-testid={`floating-label-${label.id}`}
      style={{ opacity, y, scale, left: label.left, top: label.top }}
      className="absolute z-[60] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-neutral-700 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md"
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
      {label.text}
    </motion.div>
  );
};

export const FloatingLabels = ({ progress }) => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block">
      {FLOATING_LABELS.map((label) => (
        <Label key={label.id} label={label} progress={progress} />
      ))}
    </div>
  );
};
