import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroNavigation } from "./HeroNavigation";
import { HeroHeadline } from "./HeroHeadline";
import { ArtworkCard } from "./ArtworkCard";
import { FloatingLabels } from "./FloatingLabels";
import { HeroSupportingContent } from "./HeroSupportingContent";
import { EcomContent } from "./EcomContent";
import { ArtistTags } from "./ArtistTags";
import { EcomControls } from "./EcomControls";
import { CARDS, CARD_MOTION, CARD_ECOM } from "../../data/cards";

const computeResponsive = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  if (w < 640) return { sx: 0.34, sy: 1.45, ex: 0.5, cardSize: 106 };
  if (w < 1024) return { sx: 0.6, sy: 1.05, ex: 0.72, cardSize: 138 };
  return { sx: 1, sy: 1, ex: 1, cardSize: 168 };
};

const GREEN_INDEX = 6;

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

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  // First hero (Screenshot 1 sequence) subtle scroll + fade-out during collapse.
  const headlineScale = useTransform(progress, [0, 0.24], [1, 1.04]);
  const headlineY = useTransform(progress, [0, 0.24], [0, -6]);
  const firstOpacity = useTransform(progress, [0.28, 0.4], [1, 0]);
  const firstY = useTransform(progress, [0.28, 0.4], [0, -46]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const barScaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={sceneRef}
      data-testid="hero-scene"
      className="relative"
      style={{ height: "720vh" }}
    >
      <div className="sticky top-0 h-screen w-full p-2.5 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-panel relative flex h-full w-full flex-col overflow-hidden rounded-[24px] sm:rounded-[30px]"
          style={{ "--card": `${rs.cardSize}px` }}
        >
          <HeroNavigation />

          <motion.div
            style={{ scaleX: barScaleX }}
            className="absolute left-0 top-0 z-[90] h-[3px] w-full origin-left bg-neutral-900/80"
          />

          {/* First hero content (collapses / fades out) */}
          <motion.div
            style={{ opacity: firstOpacity, y: firstY }}
            className="absolute inset-0 z-30"
          >
            <div className="absolute left-0 right-0 top-[15%] flex justify-center">
              <HeroHeadline scale={headlineScale} y={headlineY} />
            </div>
            <div className="absolute left-0 right-0 top-[70%]">
              <HeroSupportingContent progress={progress} />
            </div>
            <FloatingLabels progress={progress} />
          </motion.div>

          {/* E-Commerce content (assembles in) */}
          <EcomContent progress={progress} />
          <EcomControls progress={progress} />

          {/* Shared artwork stage — cards live across the entire timeline */}
          <div className="absolute inset-0 z-40">
            {CARDS.map((card, i) => (
              <ArtworkCard
                key={card.id}
                card={card}
                fan={CARD_MOTION[i]}
                ecom={CARD_ECOM[i]}
                progress={progress}
                sx={rs.sx}
                sy={rs.sy}
                ex={rs.ex}
                isGreen={i === GREEN_INDEX}
              />
            ))}
            <ArtistTags progress={progress} ex={rs.ex} />
          </div>

          {/* Scroll hint */}
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
