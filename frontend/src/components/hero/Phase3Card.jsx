import { motion, useTransform } from "framer-motion";
import { Disc3 } from "lucide-react";

// White "Where Art Meets Market" info card (built as UI, not an image).
const InfoCard = () => (
  <div className="flex h-full w-full flex-col justify-between rounded-[20px] bg-white p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)]">
    <div className="flex items-start justify-between">
      <div>
        <p className="font-display text-[17px] font-semibold leading-tight text-neutral-900">
          Where Art
          <br />
          Meets Market
        </p>
        <p className="mt-2 text-[10px] font-medium text-neutral-400">
          — APY 4.60%
        </p>
      </div>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
        <Disc3 size={15} strokeWidth={1.75} />
      </span>
    </div>
    <p className="text-[11.5px] leading-relaxed text-neutral-500">
      Allowing artists to showcase their work and buyers to find unique,
      inspiring pieces.
    </p>
  </div>
);

// A single portrait card animating from the centre stack to its diagonal slot.
export const Phase3Card = ({ card, p3, mult }) => {
  const isWhite = card.type === "info";

  const x = useTransform(p3, [0, 1], [0, card.x * mult]);
  const y = useTransform(p3, [0, 1], [-30, card.y * mult]);
  const rotate = useTransform(p3, [0, 1], [card.rs, card.r]);
  const whiteOpacity = useTransform(p3, [0.12, 0.32], [0, 1]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: card.z }}
    >
      <motion.div
        data-testid={`phase3-card-${card.id}`}
        style={{ x, y, rotate, opacity: isWhite ? whiteOpacity : 1 }}
        className={isWhite ? "p3-info-card" : "p3-card overflow-hidden rounded-[18px] bg-white"}
      >
        {isWhite ? (
          <InfoCard />
        ) : (
          <img
            src={card.image}
            alt={card.title}
            loading="eager"
            decoding="async"
            draggable="false"
            className="h-full w-full select-none object-cover"
          />
        )}
      </motion.div>
    </div>
  );
};
