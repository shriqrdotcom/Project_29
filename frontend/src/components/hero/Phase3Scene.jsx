import { motion, useTransform } from "framer-motion";
import { Aperture, LayoutGrid, Bell, Palette, Tag } from "lucide-react";
import { PHASE3_CARDS, P3_BUBBLES, P3_START } from "../../data/cards";
import { Phase3Card } from "./Phase3Card";

const bubbleBg = {
  dark: "bg-neutral-900",
  blue: "bg-blue-600",
  orange: "bg-amber-500",
};

const Bubble = ({ bubble, p3, mult }) => {
  const startOpacity = useTransform(p3, [0, 0.18], [1, 0]);
  const endOpacity = useTransform(p3, [0.62, 0.82], [0, 1]);
  const endY = useTransform(p3, [0.62, 0.82], [10, 0]);
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
          <span
            className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 ${bubbleBg[bubble.variant]}`}
          />
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
  const p3 = useTransform(progress, [P3_START, 0.94], [0, 1]);
  const mult = rs.p3s;

  const bgOpacity = useTransform(p3, [0, 0.22], [1, 0]);
  const iconsY = useTransform(p3, [0, 0.45], [140, -318]);

  return (
    <div
      className="absolute inset-0"
      style={{ "--p3card": `${rs.p3card}px` }}
      data-testid="phase3-scene"
    >
      {/* Background editorial headline (sits behind the stack, fades on spread) */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center"
      >
        <p className="font-display mx-auto max-w-4xl text-[clamp(1.7rem,4.2vw,3.1rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          <span className="text-neutral-900">
            Whether you're an artist looking to sell your work
          </span>{" "}
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

      {/* Card stack -> diagonal */}
      <div className="absolute inset-0 z-30">
        {PHASE3_CARDS.map((card) => (
          <Phase3Card key={card.id} card={card} p3={p3} mult={mult} />
        ))}
        {P3_BUBBLES.map((bubble) => (
          <Bubble key={bubble.id} bubble={bubble} p3={p3} mult={mult} />
        ))}
      </div>

      {/* Three floating control icons (drift from centre up toward the nav) */}
      <motion.div
        style={{ y: iconsY }}
        className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center gap-3"
        data-testid="p3-icon-controls"
      >
        <IconBtn>
          <Aperture size={17} strokeWidth={1.75} />
        </IconBtn>
        <IconBtn>
          <LayoutGrid size={17} strokeWidth={1.75} />
        </IconBtn>
        <IconBtn>
          <Bell size={17} strokeWidth={1.75} />
        </IconBtn>
      </motion.div>
    </div>
  );
};
