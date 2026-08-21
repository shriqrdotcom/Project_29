import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { HeroNavigation } from "./HeroNavigation";
import { HeroHeadline } from "./HeroHeadline";
import { ArtworkCard } from "./ArtworkCard";
import { FloatingLabels } from "./FloatingLabels";
import { HeroSupportingContent } from "./HeroSupportingContent";
import { EcomContent } from "./EcomContent";
import { ArtistTags } from "./ArtistTags";
import { EcomControls } from "./EcomControls";
import { Phase3Scene } from "./Phase3Scene";
import { CARDS, CARD_MOTION, CARD_ECOM } from "../../data/cards";

const computeResponsive = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  if (w < 640) return { sx: 0.34, sy: 1.45, ex: 0.5, cardSize: 140, p3s: 0.42, p3card: 108, vh };
  if (w < 1024) return { sx: 0.6, sy: 1.05, ex: 0.72, cardSize: 180, p3s: 0.7, p3card: 138, vh };
  return { sx: 1, sy: 1, ex: 1, cardSize: 224, p3s: 1, p3card: 166, vh };
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

  // ── Opening intro (auto-play, NOT scroll-driven) ─────────────────────────
  // On page load the opening fan (Image 1 → 2 → 3) plays automatically over
  // ~2.1s. The master progress is `max(intro, scroll)`:
  //   • `intro` is a timed motion value that ramps 0 → INTRO_END (fully-open
  //     hero = Reference Image 3) and then stays there.
  //   • `scrollYProgress` drives everything once the user scrolls past the
  //     intro point.
  // Using max() keeps the ORIGINAL scroll timeline completely untouched (no
  // compression / retuning), never replays the fan, and is immune to tiny
  // phantom scrolls on load — the hero simply holds in its open state until the
  // user actually scrolls beyond it.
  const INTRO_END = 0.12; // progress at the fully-open hero (Reference Image 3)

  const intro = useMotionValue(0);
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  useEffect(() => {
    // Always begin the intro from the very top (Image 1) on every load/refresh.
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
    // Let the entrance play first (Images 1→4): headline word-by-word reveal +
    // the green card flying up from below + nav fade-in. After ~1.4s the single
    // centred card has settled, so THEN we open the fan (Image 5 → full 7-card
    // fan) by ramping the intro value to INTRO_END over ~2.0s.
    //
    // NOTE: framer-motion's imperative animate() does not tick reliably when
    // started after its frameloop has gone idle (during the initial hold). We
    // instead drive `intro` with a timer-based tween (setInterval) so its
    // `change` listener always fires. Scheduling via setTimeout + clearing the
    // timers on unmount keeps this StrictMode-safe.
    const RAMP_MS = 2000;
    // Premium ease: fast initial movement + smooth deceleration + clean settle.
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    let tweenId;
    const startId = setTimeout(() => {
      const t0 = performance.now();
      tweenId = setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / RAMP_MS);
        intro.set(INTRO_END * easeOut(p));
        if (p >= 1) clearInterval(tweenId);
      }, 16);
    }, 1400);
    return () => {
      clearTimeout(startId);
      if (tweenId) clearInterval(tweenId);
    };
  }, [intro]);

  // rawProgress = max(intro, scroll): the intro opens the fan, then normal
  // scrolling (unchanged mapping) takes over seamlessly once it exceeds INTRO_END.
  useMotionValueEvent(intro, "change", (v) => {
    rawProgress.set(Math.max(v, scrollYProgress.get()));
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    rawProgress.set(Math.max(v, intro.get()));
  });

  // Existing sequence (hero fan -> collapse -> e-commerce) now plays across the
  // first 60% of the scene, driven by a remapped progress so nothing retunes.
  const p1 = useTransform(progress, [0, 0.55], [0, 1]);

  const headlineScale = useTransform(p1, [0, 0.24], [1, 1.04]);
  const headlineY = useTransform(p1, [0, 0.24], [0, -6]);
  const firstOpacity = 1;
  const firstY = useTransform(p1, [0.24, 0.46], [0, -1100]);

  // Smooth crossfade between Animation 1 and Animation 2 (no hard cut, no
  // scroll-up). Old gently fades + scales out; new fades in centered, then fans.
  const oldOpacity = useTransform(progress, [0.55, 0.61], [1, 0]);
  const oldScale = useTransform(progress, [0.55, 0.61], [1, 0.97]);
  const oldPE = useTransform(progress, [0.6, 0.61], ["auto", "none"]);
  const newOpacity = useTransform(progress, [0.56, 0.62], [0, 1]);
  const newScale = useTransform(progress, [0.56, 0.62], [0.98, 1]);
  const newPE = useTransform(progress, [0.56, 0.57], ["none", "auto"]);

  const hintOpacity = useTransform(progress, [0, INTRO_END], [1, 0]);
  const barScaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={sceneRef}
      data-testid="hero-scene"
      className="relative"
      style={{ height: "1500vh" }}
    >
      <div className="sticky top-0 h-screen w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-panel relative flex h-full w-full flex-col overflow-hidden"
          style={{ "--card": `${rs.cardSize}px` }}
        >
          {/* Persistent navigation (single, never duplicated) */}
          <HeroNavigation />

          <motion.div
            style={{ scaleX: barScaleX }}
            className="absolute left-0 top-0 z-[90] h-[3px] w-full origin-left bg-neutral-900/80"
          />

          {/* ===== LAYER 1: Background Text Flow & Sections (z-30) ===== */}
          <motion.div style={{ opacity: oldOpacity, scale: oldScale, pointerEvents: oldPE }} className="absolute inset-0 z-30">
            {/* Hero text & buttons scroll UPWARDS out of view without fading */}
            <motion.div style={{ opacity: firstOpacity, y: firstY }} className="absolute inset-0 pointer-events-auto">
              <div className="absolute left-0 right-0 top-[13%] flex justify-center">
                <HeroHeadline scale={headlineScale} y={headlineY} />
              </div>
              <div className="absolute left-0 right-0 top-[71%]">
                <HeroSupportingContent progress={p1} />
              </div>
            </motion.div>

            {/* E-Commerce section text & buttons (fades in cleanly after Hero text scrolls out) */}
            <EcomContent progress={p1} />
            <EcomControls progress={p1} />
          </motion.div>

          {/* ===== LAYER 2: Foreground Pinned Image Animation (z-50, pointer-events: none) ===== */}
          <motion.div style={{ opacity: oldOpacity, scale: oldScale }} className="absolute inset-0 z-50 pointer-events-none">
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

          {/* ===== Animation 2 group (smoothly fades in, centered stack -> fan) ===== */}
          <motion.div style={{ opacity: newOpacity, scale: newScale, pointerEvents: newPE }} className="absolute inset-0 z-20">
            <Phase3Scene progress={progress} rs={rs} />
          </motion.div>

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
