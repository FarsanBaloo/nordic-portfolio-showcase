# Journey / Timeline refinement

Refinement only — no rebuild, no content rewrite, no changes to Hero, About, Contact or unrelated pages.

## 1. Scroll performance first

- `AuroraBackdrop`: replace the scroll listener + `setState` fade with Motion `useScroll` / `useTransform`, bound to a `motion.svg` opacity. No React state per scroll frame.
- `ScrollProgress`: same — drive the hairline height with `scrollYProgress` via `scaleY` on a motion element instead of scroll → rAF → `setState`.
- Native scrolling stays. No Lenis, no wheel/touch overrides.
- `night-card` in `src/styles.css`: remove `backdrop-filter: blur(2px)`, raise surface to `rgb(11 17 23 / 0.92)`, keep border `rgb(160 185 198 / 0.18)`.

## 2. Focus motion tuning

- Spring: stiffness ~110, damping ~29, mass ~0.35, no bounce.
- Opacity range raised so text never drops below ~0.90: `0.90 → 0.96 → 1 → 0.98 → 0.93`.
- Parent scale: `0.992 → 1.0 → 1.021 → 1.002 → 0.995`, active `y ≈ -3px`.
- Child cards get a separate, gentler variant: max scale ~1.011, no `y` lift.
- `useFocusMotion` only calls `setActive` when the boolean actually flips (`useMotionValueEvent` + ref compare).
- No raw `translateZ`; depth comes from scale, y, surface, border and shadow.

## 3. Active card depth

Active state = slightly brighter surface + stronger accent border + soft neutral depth shadow + very restrained accent glow (teal for professional, violet for development). No neon.

## 4. Rail, nodes and year markers

- Remove the travelling green dot; keep the progressively illuminated rail with a soft local brightening near the active node.
- Three node levels: major ~18px idle / ~21px active; phase ~11px / ~15px; minor ~7px.
- Add an explicit `railMarker { label, kind, verified }` field in `src/content/timeline.ts` for verified points only (2003, 2013, 2020, 2025, 2026, NOW, AUG 2025, JAN 2026). No year interpolation or string parsing anywhere.
- Year labels next to major/phase nodes: IBM Plex Mono, 12.5–13px, weight 500, `#A5B1BA` idle, near-white/accent when active. No badge.

## 5. Width and responsiveness

- Homepage: move `Timeline` out of the `max-w-6xl` wrapper into its own wide wrapper (`min(94vw, 1520px)`), keeping the intro text constrained.
- `/journey`: timeline area `min(94vw, 1480px)` with fluid padding.
- Two-lane relational layout only while each lane can hold ~420px; below that collapse to a single rail (parent → children), no reserved empty column.
- Compact course grids switch from `min-[1600px]:grid-cols-2` to auto-fit `repeat(auto-fit, minmax(290px, 1fr))`, so column count follows real container width. Cards never render below ~285px.

## 6. Phase 2 layout

- Desktop keeps: BTH parent on top, then Courses (left) | rail (center) | Talking SCADA (right).
- Talking SCADA sticky at `top: 110px`, scoped to the Phase 2 section only, ~480–560px usable width, desktop only.
- SCADA card stays compact: stages grouped into a condensed list rather than seven large pills; full detail stays in the evidence sheet.

## 7. Typography

- Compact course cards: title 17.5px Sora 600 / 1.32 `#F4F7F9`; university 14px `#B4C0C8`; date/level 12.5px mono `#929FAA`; body 15.5–16px / 1.6 `#D3DBE2`; tags 12.5px `#CDD6DD`; SCADA connection 14.5px `#B8C3CB`.
- Parent cards keep current sizes (title 24–26px, summary 16.5–17px, bullets 15.5–16px, meta 12.5–13px). Font size never changes on active.
- Existing colour tokens unchanged.

## 8. Data QA

- Ume\u00e5 "Autonomous Systems & Perception" stays in Phase 1; the Phase 1 group label is widened to `Aug 2025 – Jun 2026`.
- The BSc label "Completed before Aug 2025" is left unchanged for now and flagged — send me the verified wording and I'll update it in one line.

## 9. Verification

Render `/journey` and `/` at 1920, 1600, 1440, 1280, 1100, 1024, 768 and 430 with screenshots; check lane widths, rail alignment, year-label collisions, SCADA parallelism, no horizontal overflow, and that no scroll-frame React state remains.
