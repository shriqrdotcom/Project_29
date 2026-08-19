// Data-driven card system. Replace `image` with any URL to swap artwork.
// Order is left -> right in the final fanned composition.
export const CARDS = [
  { id: 1, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/6402cc8dedc9c5d521e09af2f49b3187d05fe5284c9dc31274098fc8b3017ba1.jpeg", title: "Halftone Faces", tag: "Pop" },
  { id: 2, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/5c8f6b28427016229bd7a63a22670b3a88d2c510ec220dbe0715be07e842767a.jpeg", title: "Cobalt Zine", tag: "Street" },
  { id: 3, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/13e063eca78e951ff48fb10bd492f47afb2305cef5d9b55196cb63688d40b52c.jpeg", title: "Zippy Snaps", tag: "Retro" },
  { id: 4, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/d9151230fa9852703b5de64c726a35631501904490268cc15dc9e13c801a2e28.jpeg", title: "Reach", tag: "Surreal" },
  { id: 5, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/371c815b02b87f75c60ebc1d41dc916ffd0ccff528e258b57fa05c2f4374605c.jpeg", title: "Eye On Future", tag: "Editorial" },
  { id: 6, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/4608592a088d2486810b806fd4c27e0079842a67370a97c387c0b06dc3df08ec.jpeg", title: "Impasto No.7", tag: "Abstract" },
  { id: 7, image: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/1815ae0ec5d9a58a3db912c28e3311ae040a8f57292eed98d82e59c77c2ffce5.jpeg", title: "City Rhythms", tag: "Graffiti" },
];

// Per-card motion targets (desktop reference values). Position index aligns
// with CARDS. { x, y } are pixel offsets from centre at full scroll progress,
// r0 = start rotation (deg), r = end rotation, s = end scale, z = stacking order.
// The last card (green) starts on top & centred -> ends front-right, matching
// the reference screenshots.
export const CARD_MOTION = [
  { x: -378, y: 40, r0: 0, r: -12, s: 0.9, z: 1 },
  { x: -252, y: 14, r0: 0, r: -8, s: 0.94, z: 2 },
  { x: -128, y: 2, r0: 0, r: -4, s: 0.97, z: 3 },
  { x: 0, y: -6, r0: 0, r: -1, s: 1.0, z: 4 },
  { x: 128, y: 2, r0: 0, r: 4, s: 0.98, z: 5 },
  { x: 252, y: 14, r0: 0, r: 8, s: 0.95, z: 6 },
  { x: 378, y: 34, r0: 5, r: 12, s: 1.05, z: 7 },
];

// Small contextual pill/badge metadata that fades in during the scroll.
export const FLOATING_LABELS = [
  { id: "l1", text: "Original · 1 of 1", left: "17%", top: "24%", from: 14 },
  { id: "l2", text: "Verified artist", left: "72%", top: "18%", from: -12 },
  { id: "l3", text: "Ready to mint", left: "63%", top: "72%", from: 16 },
  { id: "l4", text: "Live auction", left: "22%", top: "68%", from: -10 },
];

// ---------------------------------------------------------------------------
// SECOND ANIMATION — E-Commerce showcase transition
// ---------------------------------------------------------------------------
// Scroll-timeline phase boundaries (fraction of the whole sticky scene).
export const PHASES = {
  fanOpen: 0.24, // first hero fan fully open
  hold: 0.3, // fan holds briefly
  collapse: 0.42, // cards collapse back to centre, non-green fade out
  greenHold: 0.55, // single green card holds (breathing point)
  ecomEnd: 0.72, // base arrival of the e-commerce card stack
};

// Final E-Commerce stack — a clean HORIZONTAL cascade with a subtle downward
// step (cards mostly upright, no rotation, natural ~55% overlap). First card
// sits higher; each following card moves right and slightly lower. z increases
// left -> right so the right-most card is frontmost. Aligned to CARDS by index.
export const CARD_ECOM = [
  { x: 116, y: 33, r: 0, s: 1, z: 3, d: 0.06 }, // 0 halftone faces  (slot 3)
  { x: 194, y: 41, r: 0, s: 1, z: 4, d: 0.09 }, // 1 cobalt zine    (slot 4)
  { x: 350, y: 65, r: 0, s: 1, z: 6, d: 0.15 }, // 2 zippy          (slot 6)
  { x: 38, y: 25, r: 0, s: 1, z: 2, d: 0.03 }, // 3 reach          (slot 2)
  { x: -40, y: -25, r: 0, s: 1, z: 1, d: 0.0 }, // 4 eye (higher)   (slot 1)
  { x: 272, y: 51, r: 0, s: 1, z: 5, d: 0.12 }, // 5 impasto        (slot 5)
  { x: 428, y: 80, r: 0, s: 1, z: 7, d: 0.0 }, // 6 green (front)  (slot 7)
];

// Vertical base offsets so the fan sits just under the first headline and the
// collapsed / green-hold card rests at lower-centre (matches reference 2).
export const STAGE_OFFSET = { fanBaseY: 34, collapseY: 40 };

// Floating artist name tags for the final E-Commerce composition.
// x/y are px offsets from stage centre; `appear` = [start, end] progress.
export const ARTIST_TAGS = [
  { id: "howard", handle: "@howard", variant: "red", x: 20, y: -140, appear: [0.8, 0.88] },
  { id: "robin", handle: "@robin", variant: "dark", x: 270, y: -80, appear: [0.86, 0.94] },
];

// ---------------------------------------------------------------------------
// THIRD ANIMATION — messy centre stack -> cascading diagonal staircase
// ---------------------------------------------------------------------------
// Handoff window: the previous (e-commerce) sequence scrolls up & out while
// this one is pulled up into the same pinned frame. Then the centre stack of
// portrait cards spreads into a top-left -> bottom-right diagonal.
export const P3_HANDOFF = [0.6, 0.72]; // (legacy) reserved
export const P3_START = 0.68; // Animation 2 begins its fan after the crossfade

const P3 = {
  allgood: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/06e9e2b1a02467b198c91b968c49c40cffd0f5fb855ff75bba408523da131c23.jpeg",
  staff: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/ba96e2d5d140e93aff8ab167770d90d164d0c5ed95e0abafb15d2026aff18fdb.jpeg",
  fleur: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/52426b9cd19b50e97cf668df03c92961981895682384ee185e532a52d7fd36dc.jpeg",
  knight: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/d6baceba8760b3ac48590c586d30173e043f0ff7569aa4687ad9f15368a8003b.jpeg",
  limmer: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/13a767cba5099127618b0b7413eb88d815b22d2ff9ae15679dabfe5e2cc61e5f.jpeg",
  fluffy: "https://static.prod-images.emergentagent.com/jobs/5b732ca7-c734-48e7-9203-468798ae1165/images/e69bb18d7146930955b268567ef2d2c04b6cc9c4137a4c0e5ecd4d1c45a0c6db.jpeg",
};

// Order = left -> right in the final diagonal. `rs` = messy start rotation
// (centre stack), `r` = tidy end rotation, x/y = end offset from centre (px).
// z: white info card floats above its neighbours; images layer left->right.
export const PHASE3_CARDS = [
  { id: "p0", type: "image", image: P3.allgood, title: "All Good Things", rs: -10, x: -450, y: -177, r: -8, z: 1 },
  { id: "p1", type: "info", rs: 6, x: -300, y: -113, r: -3, z: 7 },
  { id: "p2", type: "image", image: P3.staff, title: "Staff Only", rs: 9, x: -150, y: -49, r: -2, z: 2 },
  { id: "p3", type: "image", image: P3.fleur, title: "le Fleur", rs: -6, x: 0, y: 15, r: 0, z: 3 },
  { id: "p4", type: "image", image: P3.knight, title: "The Green Knight", rs: 5, x: 150, y: 79, r: 1, z: 4 },
  { id: "p5", type: "image", image: P3.limmer, title: "Limmer", rs: -9, x: 300, y: 143, r: 2, z: 5 },
  { id: "p6", type: "image", image: P3.fluffy, title: "Fluffy Worm", rs: -3, x: 450, y: 207, r: 4, z: 6 },
];

// Speech bubbles: alician/andrea belong to the centre-stack state (fade out on
// spread); johnson attaches to the knight card in the final composition.
export const P3_BUBBLES = [
  { id: "alician", handle: "@alician", variant: "dark", x: -235, y: -30, mode: "start" },
  { id: "andrea", handle: "@andrea", variant: "blue", x: 245, y: -35, mode: "start" },
  { id: "johnson", handle: "@Johnson", variant: "orange", x: 175, y: -30, mode: "end" },
];
