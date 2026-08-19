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

## Backlog
- P2: dark-mode toggle wiring (icon present, currently static).
- P2: real SaaS card assets swap (drop URLs into `data/cards.js`).
- P2: dedicated true-mobile visual QA (tooling forced 1920 viewport).
