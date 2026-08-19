import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroNavigation } from "./HeroNavigation";
import { HeroHeadline } from "./HeroHeadline";
import { ArtworkCard } from "./ArtworkCard";
import { FloatingLabels } from "./FloatingLabels";
import { HeroSupportingContent } from "./HeroSupportingContent";
import { CARDS, CARD_MOTION } from "../../data/cards";

const computeResponsive = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  if (w < 640) return { sx: 0.34, sy: 1.45, cardSize: 106 };
  if (w < 1024) return { sx: 0.6, sy: 1.05, cardSize: 142 };
  return { sx: 1, sy: 1, cardSize: 172 };
};

export const HeroScrollScene = () => {
  const sceneRef = useRef(null);
  const [rs, setRs] = useState(computeResponsive);

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setRs(computeResponsive()), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothing -> no jitter, gentle acceleration & settle, no overshoot.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const headlineScale = useTransform(progress, [0, 1], [1, 1.05]);
  const headlineY = useTransform(progress, [0, 1], [0, -8]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const barScaleX = useTransform(progress, [0, 1], [0, 1]);

  const stageHeight = Math.round(rs.cardSize * 1.7);

  return (
    <section
      ref={sceneRef}
      data-testid="hero-scene"
      className="relative"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen w-full p-2.5 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-panel relative flex h-full w-full flex-col overflow-hidden rounded-[24px] sm:rounded-[30px]"
        >
          <HeroNavigation />

          {/* scroll progress bar */}
          <motion.div
            style={{ scaleX: barScaleX }}
            className="absolute left-0 top-0 z-[70] h-[3px] w-full origin-left bg-neutral-900/80"
          />

          <div className="relative flex flex-1 flex-col items-center justify-center gap-6 sm:gap-9 px-4 pb-14">
            <HeroHeadline scale={headlineScale} y={headlineY} />

            <div
              className="relative w-full"
              style={{ height: stageHeight, "--card": `${rs.cardSize}px` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.75,
                }}
                className="absolute inset-0"
              >
                {CARDS.map((card, i) => (
                  <ArtworkCard
                    key={card.id}
                    card={card}
                    cfg={CARD_MOTION[i]}
                    progress={progress}
                    sx={rs.sx}
                    sy={rs.sy}
                  />
                ))}
              </motion.div>

              <FloatingLabels progress={progress} />
            </div>

            <HeroSupportingContent progress={progress} />
          </div>

          {/* scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-[65] flex -translate-x-1/2 flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">
              Scroll to open
            </span>
            <span className="scroll-line relative h-8 w-px overflow-hidden bg-neutral-200" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
