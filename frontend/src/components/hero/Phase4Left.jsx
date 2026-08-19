import { motion, useTransform } from "framer-motion";
import { PenTool, Feather, Layers, Wand2, Aperture, Flag, Asterisk } from "lucide-react";
import { P3T } from "../../data/cards";

// Scattered tool-icon cluster (each pops in scale 0 -> 1, staggered).
const ICONS = [
  { I: Feather, left: "58px", top: "0px" },
  { I: PenTool, left: "0px", top: "62px" },
  { I: Aperture, left: "72px", top: "56px" },
  { I: Asterisk, left: "150px", top: "56px" },
  { I: Flag, left: "224px", top: "34px" },
  { I: Layers, left: "96px", top: "122px" },
  { I: Wand2, left: "168px", top: "128px" },
];

const IconPop = ({ Icon, left, top, progress, delay }) => {
  const s = 0.88 + delay;
  const scale = useTransform(progress, [s, s + 0.05], [0, 1]);
  const opacity = useTransform(progress, [s, s + 0.05], [0, 1]);
  return (
    <motion.span
      style={{ scale, opacity, left, top }}
      className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900"
    >
      <Icon size={19} strokeWidth={1.6} />
    </motion.span>
  );
};

// A tiny word-by-word reveal for the new heading.
const Word = ({ children, progress, i, muted }) => {
  const s = 0.86 + i * 0.015;
  const opacity = useTransform(progress, [s, s + 0.05], [0, 1]);
  const y = useTransform(progress, [s, s + 0.05], [12, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.24em] inline-block ${muted ? "text-neutral-400" : "text-neutral-900"}`}
    >
      {children}
    </motion.span>
  );
};

export const Phase4Left = ({ progress }) => {
  const { left } = P3T;
  const subOpacity = useTransform(progress, [0.92, 0.99], [0, 1]);
  const subY = useTransform(progress, [0.92, 0.99], [12, 0]);
  const pillOpacity = useTransform(progress, [0.84, 0.9], [0, 1]);

  return (
    <div className="pointer-events-none absolute left-[6%] top-[20%] z-40 max-w-[26rem]">
      <motion.span
        style={{ opacity: pillOpacity }}
        className="mb-6 flex h-8 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/80 text-neutral-500 backdrop-blur"
      >
        <Aperture size={15} strokeWidth={1.75} />
      </motion.span>

      <h2 className="font-display text-[clamp(2rem,3.6vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        <span className="block">
          <Word progress={progress} i={0}>Our</Word>
          <Word progress={progress} i={1} muted>vision</Word>
        </span>
        <span className="block">
          <Word progress={progress} i={2} muted>for</Word>
          <Word progress={progress} i={3}>any</Word>
          <Word progress={progress} i={4}>art</Word>
          <Word progress={progress} i={5}>technology.</Word>
        </span>
      </h2>

      <motion.p
        style={{ opacity: subOpacity, y: subY }}
        className="mt-5 max-w-[24rem] text-[13.5px] leading-relaxed text-neutral-500"
      >
        Every piece of art tells a story. Echoes of Expression allows artists to
        showcase their personal journeys through their work.
      </motion.p>

      {/* tool icon cluster */}
      <div className="relative mt-12 h-[190px] w-[290px]">
        {ICONS.map((ic, idx) => (
          <IconPop
            key={idx}
            Icon={ic.I}
            left={ic.left}
            top={ic.top}
            progress={progress}
            delay={idx * 0.012}
          />
        ))}
      </div>
    </div>
  );
};
