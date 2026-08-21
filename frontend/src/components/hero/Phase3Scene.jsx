import { motion, useTransform } from "framer-motion";
import { Aperture, LayoutGrid, Bell, Palette, Tag } from "lucide-react";
import { PHASE3_CARDS, P3_BUBBLES, P3T } from "../../data/cards";
import { Phase3Card } from "./Phase3Card";
import { Phase4Folder } from "./Phase4Folder";
import { Phase4Left } from "./Phase4Left";

const bubbleBg = {
  dark: "bg-neutral-900",
  blue: "bg-blue-600",
  orange: "bg-amber-500",
};

const Bubble = ({ bubble, progress, mult }) => {
  const { fanStart, fanEnd, hold } = P3T;
  const startOpacity = useTransform(progress, [fanStart, fanStart + 0.05], [1, 0]);
  const endOpacity = useTransform(progress, [fanEnd - 0.06, fanEnd, hold, hold + 0.04], [0, 1, 1, 0]);
  const endY = useTransform(progress, [fanEnd - 0.06, fanEnd], [10, 0]);
  const isEnd = bubble.mode === "end";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        style={{
          x: bubble.x * mult,
          translateY: bubble.y * mult,
          opacity: isEnd ? endOpacity : startOpacity,
          y: isEnd ? endY : 0,
        }}
        data-testid={`p3-bubble-${bubble.id}`}
        className="relative"
      >
        <div
          className={`relative rounded-[13px] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)] ${bubbleBg[bubble.variant]}`}
        >
          {bubble.handle}
          <span className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 ${bubbleBg[bubble.variant]}`} />
        </div>
      </motion.div>
    </div>
  );
};

const IconBtn = ({ children }) => (
  <button className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-900">
    {children}
  </button>
);

export const Phase3Scene = ({ progress, rs }) => {
  const { fanStart, fanEnd, hold } = P3T;
  const mult = rs.p3s;
  const dims = {
    pw: rs.p3card,
    ph: Math.round(rs.p3card * 1.34),
    gw: Math.round(148 * mult),
    gh: Math.round(178 * mult),
  };

  const bgOpacity = useTransform(progress, [fanStart, fanStart + 0.07], [1, 0]);
  const iconsY = useTransform(progress, [fanStart - 0.02, fanStart + 0.12], [140, -318]);
  const iconsOpacity = useTransform(progress, [fanEnd, hold], [1, 0]);

  return (
    <div className="absolute inset-0" data-testid="phase3-scene">
      {/* Background editorial headline (fades out when the fan begins) */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center"
      >
        <p className="font-display mx-auto max-w-4xl text-[clamp(1.7rem,4.2vw,3.1rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          <span className="text-neutral-900">Whether you're an artist looking to sell your work</span>{" "}
          <span className="text-neutral-900">/ or buyer seeking </span>
          <span className="text-emerald-500">unique</span>{" "}
          <span className="text-neutral-900">pieces </span>
          <span className="mx-1 inline-flex h-8 w-8 translate-y-1.5 items-center justify-center rounded-full bg-neutral-900 text-white">
            <Palette size={15} />
          </span>{" "}
          <span className="text-neutral-400">connects you to world of </span>
          <span className="text-emerald-500">creativity</span>{" "}
          <span className="mx-1 inline-flex h-8 w-8 translate-y-1.5 items-center justify-center rounded-full bg-amber-500 text-white">
            <Tag size={15} />
          </span>{" "}
          <span className="text-neutral-400">commerce.</span>
        </p>
      </motion.div>

      {/* Folder panel (behind cards) + Personal tab (in front of card tops) */}
      <Phase4Folder progress={progress} mult={mult} />

      {/* Card stack -> diagonal -> 2x3 grid */}
      <div className="absolute inset-0 z-30">
        {PHASE3_CARDS.map((card) => (
          <Phase3Card key={card.id} card={card} progress={progress} mult={mult} dims={dims} />
        ))}
        {P3_BUBBLES.map((bubble) => (
          <Bubble key={bubble.id} bubble={bubble} progress={progress} mult={mult} />
        ))}
      </div>

      {/* Three floating control icons (centre-stack state, fade before the grid) */}
      <motion.div
        style={{ y: iconsY, opacity: iconsOpacity }}
        className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center gap-3"
        data-testid="p3-icon-controls"
      >
        <IconBtn><Aperture size={17} strokeWidth={1.75} /></IconBtn>
        <IconBtn><LayoutGrid size={17} strokeWidth={1.75} /></IconBtn>
        <IconBtn><Bell size={17} strokeWidth={1.75} /></IconBtn>
      </motion.div>

      {/* Left-side new heading, subtext & tool-icon cluster */}
      <Phase4Left progress={progress} />
    </div>
  );
};
