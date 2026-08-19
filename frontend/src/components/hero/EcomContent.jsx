import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Heading words with per-word reveal order & colour. Progressive focus-in:
// opacity 0->1, blur 10px->0, slight rise. Final state is fully crisp.
const WORDS = [
  { t: "Showcase,", c: "dark", line: 0 },
  { t: "Sell,", c: "dark", line: 0 },
  { t: "&", c: "red", line: 1 },
  { t: "acquire", c: "red", line: 1 },
  { t: "arts", c: "red", line: 1 },
  { t: "to", c: "red", line: 1 },
  { t: "our", c: "dark", line: 2 },
  { t: "marketplace.", c: "dark", line: 2 },
];

const Word = ({ word, index, progress }) => {
  const s0 = 0.52 + index * 0.02;
  const s1 = s0 + 0.08;
  const opacity = useTransform(progress, [s0, s1], [0, 1]);
  const yv = useTransform(progress, [s0, s1], [10, 0]);
  const blur = useTransform(progress, [s0, s1], [10, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.span
      style={{ opacity, y: yv, filter }}
      className={`mr-[0.22em] inline-block ${
        word.c === "red" ? "text-[#b23a2e]" : "text-neutral-900"
      }`}
    >
      {word.t}
    </motion.span>
  );
};

export const EcomContent = ({ progress }) => {
  const labelOpacity = useTransform(progress, [0.5, 0.56], [0, 1]);
  const labelY = useTransform(progress, [0.5, 0.56], [10, 0]);

  const paraOpacity = useTransform(progress, [0.7, 0.8], [0, 1]);
  const paraY = useTransform(progress, [0.7, 0.8], [14, 0]);

  const ctaOpacity = useTransform(progress, [0.78, 0.88], [0, 1]);
  const ctaY = useTransform(progress, [0.78, 0.88], [16, 0]);

  return (
    <div
      data-testid="ecom-content"
      className="pointer-events-none absolute left-[5%] top-[15%] z-40 max-w-[42rem] sm:left-[6%]"
    >
      <motion.span
        style={{ opacity: labelOpacity, y: labelY }}
        data-testid="ecom-label"
        className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500"
      >
        E-Commerce
      </motion.span>

      <h2
        data-testid="ecom-heading"
        className="font-display mt-3 font-semibold leading-[1.02] tracking-[-0.02em] text-[clamp(2.2rem,5.4vw,4.4rem)]"
      >
        <span className="block">
          {WORDS.filter((w) => w.line === 0).map((w, i) => (
            <Word key={w.t} word={w} index={i} progress={progress} />
          ))}
        </span>
        <span className="block">
          {WORDS.filter((w) => w.line === 1).map((w, i) => (
            <Word key={w.t} word={w} index={i + 2} progress={progress} />
          ))}
        </span>
        <span className="block">
          {WORDS.filter((w) => w.line === 2).map((w, i) => (
            <Word key={w.t} word={w} index={i + 6} progress={progress} />
          ))}
        </span>
      </h2>

      <motion.p
        style={{ opacity: paraOpacity, y: paraY }}
        data-testid="ecom-paragraph"
        className="mt-6 max-w-[22rem] text-[13.5px] leading-relaxed text-neutral-500"
      >
        Dynamic community where artists and buyers seamlessly merge. ArtFusion
        brings together creators and enthusiasts to share creativity.
      </motion.p>

      <motion.div
        style={{ opacity: ctaOpacity, y: ctaY }}
        className="pointer-events-auto mt-7 flex items-center gap-5"
      >
        <button
          data-testid="ecom-cta-primary"
          className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[13.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
        >
          Join for $9.99/m
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
        <button
          data-testid="ecom-cta-secondary"
          className="text-[13.5px] font-medium text-neutral-500 underline-offset-4 transition-colors duration-300 hover:text-neutral-900 hover:underline"
        >
          Read more
        </button>
      </motion.div>
    </div>
  );
};
