# unoneo — Scroll-Driven Hero Scene

## Original Problem Statement
Recreate an exact scroll-driven, premium editorial hero for a SaaS marketing site: one centered square card on load that, driven purely by scroll progress, smoothly opens into 7 fanned artwork cards (Screenshot 1 -> Screenshot 2), reversing perfectly on scroll-up. Sticky scene, framer-motion useScroll/useTransform, spring smoothing, floating labels, description + CTA, fully responsive, no autoplay/carousel/video.

## User Choices
- Brand: **unoneo**
- Cards: colorful editorial/artwork images (AI-generated poster art)
- Scope: interactive hero scene only
- Backend: none (frontend-only static marketing page)
- Theme: light only

## Architecture
- Frontend only. React 19 + CRA + Tailwind + shadcn base tokens.
- Motion: framer-motion 11 (`useScroll`, `useSpring`, `useTransform`), Lenis for momentum scroll.
- No backend / DB used.

## Structure
- `src/App.js` — page shell, Lenis init, `HeroScrollScene`, slow editorial `MarqueeFooter`.
- `src/hooks/useLenis.js` — smooth momentum scrolling.
- `src/data/cards.js` — data-driven `CARDS` (swap `image` URLs), `CARD_MOTION` (per-card x/y/rotate/scale/z targets), `FLOATING_LABELS`.
- `src/components/hero/`
  - `HeroScrollScene.jsx` — 340vh sticky scene; scroll progress -> spring; responsive multipliers; progress bar; scroll hint.
  - `HeroNavigation.jsx` — brand + nav links + profile/theme icon buttons (stable).
  - `HeroHeadline.jsx` — masked line-by-line on-load reveal + subtle scroll scale/shift.
  - `ArtworkCard.jsx` — per-card interpolation (movement delayed to ~12% for calm opening).
  - `FloatingLabels.jsx` — pills fade/scale in at ~42–72% progress.
  - `HeroSupportingContent.jsx` — description + primary CTA + secondary link at ~55–90%.

## Implemented (2026-08-19)
- Scroll-driven stack -> fan animation, 7 cards, organic rotations/offsets, overlaps, soft depth.
- Reverse-on-scroll-up (single motion system, no separate reverse).
- On-load headline mask reveal; premium light rounded panel with subtle ambient/shadow.
- Progressive labels, description, CTA; scroll progress bar; scroll hint; editorial marquee footer.
- Responsive multipliers (desktop/tablet/mobile) + overflow-clipped panel (no horizontal scroll).
- Verified via screenshots: initial state matches Screenshot 1; full-scroll matches Screenshot 2.

## Implemented — Part 2: E-Commerce showcase transition (2026-08-19)
Extended the SAME sticky scene (now 720vh) into one continuous scroll timeline (no new route, no white flash, header stable):
- Phases (master spring progress): fan open (0–0.24) → hold → collapse to centre + first-hero heading/labels/supporting fade out (0.30–0.42) → single green card holds (breathing point) → E-Commerce assembles (0.50–1.0).
- Green card persists across the whole timeline as the connective focal element; the other 6 cards fade out during collapse and re-enter, staggered, into the final stack.
- `EcomContent.jsx`: "E-COMMERCE" label + progressive word-by-word blur/opacity heading ("Showcase, Sell, & acquire arts to our marketplace." with red accent line) + supporting paragraph + "Join for $9.99/m" / "Read more" CTAs.
- `ArtistTags.jsx`: @howard (red) + @robin (dark) speech-bubble tags attached to the composition, fade-up staggered.
- `EcomControls.jsx`: minimal right-side up/down controls fading in near the end.
- `data/cards.js`: `CARD_ECOM` diagonal lower-right stack config, `PHASES`, `STAGE_OFFSET`, `ARTIST_TAGS`.
- `ArtworkCard.jsx`: rewritten to drive fan→collapse→hold→e-commerce via one master-progress track (transform+opacity only).
- Verified via screenshots: keyframes match provided images 1–4; reverse is intrinsic (single motion system).

## Implemented — Part 3: centre-stack -> diagonal cascade (2026-08-19)
Added a THIRD scroll phase inside the SAME pinned panel (section now 1150vh, single navbar, no gap/duplication):
- Seamless handoff (`SWAP` = 0.60): an INSTANT CUT in place — Animation 1 (e-commerce) is hidden (opacity + pointer-events) and Animation 2 (portrait centre stack) is revealed at the exact same marker; no unpin, no scroll-up, no translate.
- Existing sequence remapped onto `p1` = progress[0,0.60] so nothing was retuned.
- `Phase3Scene.jsx`: background editorial headline (green accent words + icon chips), @alician/@andrea start bubbles + @Johnson end bubble, three drifting control icons.
- `Phase3Card.jsx` + `PHASE3_CARDS`: 6 generated portrait posters (All Good Things, Staff, le Fleur, Green Knight, Limmer, Fluffy Worm) + a white "Where Art Meets Market" info card, animating from a messy centre stack (`rs` rotations) into a top-left→bottom-right diagonal (`p3` = progress[0.72,0.94], holds to end).
- Verified via screenshots: State 1 (centre stack), State 3 (diagonal) and the handoff all match references; single persistent nav, continuous light background.

## Implemented — Part 4: diagonal -> 2x3 folder grid (2026-08-19)
Continued the same pinned timeline (section now 1500vh). After the diagonal fan holds, the SAME 6 image cards morph (position + size + rotation, via animated width/height) into a 2x3 grid on the right; the white "Where Art Meets Market" info card fades out.
- `Phase4Folder.jsx`: white folder panel fades/scales in behind the grid with a "Business" row + "Create" pill; a dark "Personal" tab slides down (translateY) into place above the top card row (in front of card tops).
- `Phase4Left.jsx`: crossfades in "Our vision for any art technology." (word reveal) + subtext + a staggered scatter of circular tool icons (pen, layers, wand, etc.) + eye pill.
- `Phase3Card.jsx`: unified master-progress transforms driving fan -> hold -> grid (x/y/rotate + width/height + radius).
- Timing in `P3T`; verified via screenshots against reference states 1–5.

## Backlog
