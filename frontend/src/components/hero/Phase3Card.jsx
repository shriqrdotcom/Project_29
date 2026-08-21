import { motion, useTransform } from "framer-motion";
import { Disc3 } from "lucide-react";
import { P3T } from "../../data/cards";

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
        <p className="mt-2 text-[10px] font-medium text-neutral-400">— APY 4.60%</p>
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

// A portrait card that: (1) fans from the centre stack to the diagonal, then
// (2) morphs — position, size & rotation — into its 2x3 folder-grid slot.
export const Phase3Card = ({ card, progress, mult, dims }) => {
  const { fanStart, fanEnd, hold, gridEnd } = P3T;
  const isWhite = card.type === "info";
  const g = card.g;

  const stops = [fanStart, fanEnd, hold, gridEnd];
  const gx = g ? g.x * mult : card.x * mult;
  const gy = g ? g.y * mult : card.y * mult;

  const x = useTransform(progress, stops, [0, card.x * mult, card.x * mult, gx]);
  const y = useTransform(progress, stops, [-30, card.y * mult, card.y * mult, gy]);
  const rotate = useTransform(progress, stops, [card.rs, card.r, card.r, g ? 0 : card.r]);
  const width = useTransform(progress, [hold, gridEnd], [dims.pw, g ? dims.gw : dims.pw]);
  const height = useTransform(progress, [hold, gridEnd], [dims.ph, g ? dims.gh : dims.ph]);
  const radius = useTransform(progress, [hold, gridEnd], [18, 16]);

  // Info card fades in during the fan, then fades out as the grid forms.
  const whiteOpacity = useTransform(progress, [0.66, 0.74, hold, hold + 0.05], [0, 1, 1, 0]);
  const infoW = dims.pw * 1.55;
  const infoH = dims.ph * 0.9;

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: card.z }}>
      <motion.div
        data-testid={`phase3-card-${card.id}`}
        style={{
          x,
          y,
          rotate,
          width: isWhite ? infoW : width,
          height: isWhite ? infoH : height,
          borderRadius: radius,
          opacity: isWhite ? whiteOpacity : 1,
        }}
        className={isWhite ? "p3-info-shell" : "p3-card overflow-hidden bg-white"}
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
