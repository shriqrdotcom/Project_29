import { motion } from "framer-motion";

// Signature on-load moment: masked line-by-line reveal.
const line1 = [
  { t: "A", c: "dark" },
  { t: "place", c: "dark" },
  { t: "to", c: "dark" },
  { t: "display", c: "dark" },
  { t: "your", c: "muted" },
];
const line2 = [{ t: "masterpiece.", c: "dark" }];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.35 },
  },
};

const wordMask = {
  hidden: { y: "112%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const Word = ({ t, c }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
    <motion.span
      variants={wordMask}
      className={`inline-block ${c === "muted" ? "text-neutral-400" : "text-neutral-900"}`}
    >
      {t}
    </motion.span>
  </span>
);

export const HeroHeadline = ({ scale, y }) => {
  return (
    <motion.div
      data-testid="hero-headline"
      style={{ scale, y }}
      className="relative z-40 px-6 text-center will-change-transform"
    >
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display font-semibold tracking-[-0.03em] leading-[0.98] text-[clamp(2.6rem,7.2vw,5.6rem)]"
      >
        <span className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
          {line1.map((w, i) => (
            <Word key={i} {...w} />
          ))}
        </span>
        <span className="flex justify-center">
          {line2.map((w, i) => (
            <Word key={i} {...w} />
          ))}
        </span>
      </motion.h1>
    </motion.div>
  );
};
