import { motion, useTransform } from "framer-motion";
import { PHASES, STAGE_OFFSET } from "../../data/cards";

// A single artwork card driven by the master scroll progress across the whole
// two-part sequence:
//   fan open -> hold -> collapse to centre -> (green holds) -> e-commerce stack
// Non-green cards fade out during the collapse and fade back in, staggered,
// as they are "placed" into the final e-commerce composition. The green card
// persists throughout as the connective focal element.
export const ArtworkCard = ({ card, fan, ecom, progress, sx, sy, ex, isGreen }) => {
  const { fanOpen, hold, collapse, greenHold } = PHASES;
  const { fanBaseY, collapseY } = STAGE_OFFSET;

  const end = isGreen ? 0.85 : 0.6 + ecom.d;
  const stops = [0, fanOpen, hold, collapse, greenHold, end];

  const fanX = fan.x * sx;
  const fanY = fan.y * sy + fanBaseY;
  const ecomX = ecom.x * ex;
  const ecomY = ecom.y * ex;

  const x = useTransform(progress, stops, [0, fanX, fanX, 0, 0, ecomX]);
  const y = useTransform(progress, stops, [fanBaseY, fanY, fanY, collapseY, collapseY, ecomY]);
  const rotate = useTransform(progress, stops, [fan.r0, fan.r, fan.r, 0, 0, ecom.r]);
  const scale = useTransform(
    progress,
    stops,
    [1, fan.s, fan.s, isGreen ? 1 : 0.9, isGreen ? 1 : 0.9, ecom.s],
  );

  // Green stays fully visible; others fade during collapse, re-enter staggered.
  const opacity = useTransform(
    progress,
    [0, 0.36, 0.42, 0.55 + ecom.d, 0.63 + ecom.d],
    [1, 1, 0, 0, 1],
  );

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: ecom.z }}
    >
      <motion.div
        data-testid={`artwork-card-${card.id}`}
        style={{ x, y, rotate, scale, opacity: isGreen ? 1 : opacity }}
        whileHover={{ scale: ecom.s * 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="artwork-card pointer-events-auto relative overflow-hidden rounded-[18px] bg-white"
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
