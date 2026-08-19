import { motion, useTransform } from "framer-motion";

// A single artwork card. Each card interpolates its own x / y / rotate / scale
// against the shared (smoothed) scroll progress. Movement is delayed until
// ~12% progress so the opening feels calm (Stage A), then eases out.
export const ArtworkCard = ({ card, cfg, progress, sx, sy }) => {
  const x = useTransform(progress, [0, 0.12, 1], [0, 0, cfg.x * sx]);
  const y = useTransform(progress, [0, 0.12, 1], [0, 0, cfg.y * sy]);
  const rotate = useTransform(progress, [0, 0.12, 1], [cfg.r0, cfg.r0, cfg.r]);
  const scale = useTransform(progress, [0, 1], [1, cfg.s]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: cfg.z }}
    >
      <motion.div
        data-testid={`artwork-card-${card.id}`}
        style={{ x, y, rotate, scale }}
        whileHover={{ scale: cfg.s * 1.05 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="artwork-card pointer-events-auto relative overflow-hidden rounded-[18px] bg-white"
      >
        <img
          src={card.image}
          alt={card.title}
          loading="eager"
          decoding="async"
          draggable="false"
          className="w-full h-full object-cover select-none"
        />
      </motion.div>
    </div>
  );
};
