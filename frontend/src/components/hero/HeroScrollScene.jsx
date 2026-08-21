import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { HeroNavigation } from "./HeroNavigation";
import { HeroHeadline } from "./HeroHeadline";
import { ArtworkCard } from "./ArtworkCard";
import { FloatingLabels } from "./FloatingLabels";
import { HeroSupportingContent } from "./HeroSupportingContent";
import { ArtistTags } from "./ArtistTags";
import { CARDS, CARD_MOTION, CARD_ECOM } from "../../data/cards";

// ─── Responsive breakpoint helper ───────────────────────────────────────────
const computeResponsive = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  if (w < 640) return { sx: 0.34, sy: 1.45, ex: 0.5, cardSize: 140, p3s: 0.42, p3card: 108, vh };
  if (w < 1024) return { sx: 0.6, sy: 1.05, ex: 0.72, cardSize: 180, p3s: 0.7, p3card: 138, vh };
  return { sx: 1, sy: 1, ex: 1, cardSize: 224, p3s: 1, p3card: 166, vh };
};

const GREEN_INDEX = 6;

// ─── Auto-play timing ────────────────────────────────────────────────────────
// Total duration of the full 0→1 progress sweep, in seconds.
// State 1 (single card)   : progress 0.00 → 0.18  (~0.25 s)
// State 2 (fan opens)     : progress 0.18 → 0.48  (~0.42 s)
// State 3 (final layout)  : progress 0.48 → 1.00  (~0.73 s)
// Total                   : ~1.40 s
const TOTAL_DURATION = 1.4;

// Custom cubic-bezier that feels very fast at the start and silk-smooth at end.
// Matches the requested high-end feel without frame-drops.
const EASE = [0.2, 0.8, 0.2, 1.0];

export const HeroScrollScene = () => {
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

  // ── Master progress: time-based, auto-plays on mount ──────────────────────
  // This is the exact same 0-1 progress value the child components already
  // consume. We simply drive it with time instead of scroll.
  const progress = useMotionValue(0);

  useEffect(() => {
    // Small initial delay (50 ms) so React has finished painting before we
    // start the animation — prevents any single dropped frame on load.
    const controls = animate(progress, 1, {
      duration: TOTAL_DURATION,
      ease: EASE,
      delay: 0.05,
    });

    // Cleanup: stop animation if component unmounts mid-play
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Derived transforms (same math as the scroll version) ──────────────────
  // Remap to the internal p1 sub-range used by the "hero fan" sequence.
  const p1 = useTransform(progress, [0, 0.55], [0, 1]);

  const headlineScale = useTransform(p1, [0, 0.24], [1, 1.04]);
  const headlineY     = useTransform(p1, [0, 0.24], [0, -6]);
  const firstY        = useTransform(p1, [0.24, 0.46], [0, -1100]);

  // Crossfade: "old" hero layer fades out, "new" layer (Phase 3 / e-commerce
  // continuation) fades in — same timing as the scroll-based version.
  const oldOpacity = useTransform(progress, [0.55, 0.61], [1, 0]);
  const oldScale   = useTransform(progress, [0.55, 0.61], [1, 0.97]);
  const oldPE      = useTransform(progress, [0.60, 0.61], ["auto", "none"]);
  const newOpacity = useTransform(progress, [0.56, 0.62], [0, 1]);
  const newScale   = useTransform(progress, [0.56, 0.62], [0.98, 1]);
  const newPE      = useTransform(progress, [0.56, 0.57], ["none", "auto"]);

  // Progress bar driven by the same master value (cosmetic feedback)
  const barScaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    // Plain full-screen section — no sticky scroll scaffolding needed
    <section
      data-testid="hero-scene"
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hero-panel relative flex h-full w-full flex-col overflow-hidden"
        style={{ "--card": `${rs.cardSize}px` }}
      >
        {/* Persistent navigation */}
        <HeroNavigation />

        {/* Thin progress bar: visible during the animation, fades out at end */}
        <motion.div
          style={{ scaleX: barScaleX }}
          className="absolute left-0 top-0 z-[90] h-[3px] w-full origin-left bg-neutral-900/80"
        />

        {/* ═══ LAYER 1: Hero text + cards (fades out after crossfade) ══════ */}
        <motion.div
          style={{ opacity: oldOpacity, scale: oldScale, pointerEvents: oldPE }}
          className="absolute inset-0 z-30"
        >
          {/* Headline + supporting text scroll upward and out */}
          <motion.div
            style={{ opacity: 1, y: firstY }}
            className="absolute inset-0 pointer-events-auto"
          >
            <div className="absolute left-0 right-0 top-[13%] flex justify-center">
              <HeroHeadline scale={headlineScale} y={headlineY} />
            </div>
            <div className="absolute left-0 right-0 top-[71%]">
              <HeroSupportingContent progress={p1} />
            </div>
          </motion.div>
        </motion.div>

        {/* ═══ LAYER 2: Artwork cards + floating labels (top visual layer) ═ */}
        <motion.div
          style={{ opacity: oldOpacity, scale: oldScale }}
          className="absolute inset-0 z-50 pointer-events-none"
        >
          <FloatingLabels progress={p1} />
          {CARDS.map((card, i) => (
            <ArtworkCard
              key={card.id}
              card={card}
              fan={CARD_MOTION[i]}
              ecom={CARD_ECOM[i]}
              progress={p1}
              sx={rs.sx}
              sy={rs.sy}
              ex={rs.ex}
              isGreen={i === GREEN_INDEX}
            />
          ))}
          <ArtistTags progress={p1} ex={rs.ex} />
        </motion.div>

        {/* ═══ LAYER 3: Final fanned composition (fades in at ~60 % progress) */}
        <motion.div
          style={{ opacity: newOpacity, scale: newScale, pointerEvents: newPE }}
          className="absolute inset-0 z-20"
        >
          {/*
            Phase3Scene is intentionally omitted here so we don't pull in the
            heavy portrait-stack sequence that was part of the old scroll flow.
            The "new" layer in the auto-play version is the e-commerce / final
            fanned state that the ArtworkCards arrive at when p1 → 1.
            If Phase3Scene is needed in future, re-import and pass `progress`.
          */}
        </motion.div>
      </motion.div>
    </section>
  );
};
