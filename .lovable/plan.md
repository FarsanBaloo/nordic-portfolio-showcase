# Make the journey timeline cards feel more alive

## Goal
Each timeline box should react more strongly — growing when hovered with the mouse, and growing / lifting more noticeably as it becomes the active row while scrolling down. Today the scroll scale peaks at only ~1.02 and most cards have no hover response, so the timeline reads as static.

## Current state (verified)
- `src/components/Timeline.tsx` `useFocusMotion` drives a scroll-linked scale on each row's outer `motion.div`. Peaks are subtle: parent `1.021`, child `1.011`, opacity dips only to `0.9/0.93`.
- `MilestoneCard` (`<article class="night-card …">`) gains a border-color + box-shadow glow when `active`, but no scale and no hover transition.
- `StudyChildCard` has no hover effect at all. `ProjectChildCard` only lightens background + image opacity on hover.
- `night-card` utility (`src/styles.css` ~L149) is a flat bg/border/color with no transition.

## Plan

### 1. Stronger scroll-driven "active row" growth (`useFocusMotion`)
- Raise the parent scale curve so the focused row clearly stands out and off-focus rows recede:
  - parent: `~0.97 → 1.0 → 1.045 → 1.0 → 0.975` (peak ~1.045 at focus, was 1.021)
  - child: `~0.985 → 1.0 → 1.022 → 1.0 → 0.988`
- Increase the focus lift `y` slightly (e.g. parent `-6px` at focus) so the active card floats.
- Keep the active-state React threshold unchanged so glow/label still fire in the same band.

### 2. Hover lift + scale on every card (inner element, so it composes with the outer scroll scale)
Apply on the inner card element (not the outer motion.div), using CSS transitions so it doesn't fight the motion-value transform:
- `MilestoneCard` `<article>`: on hover, `scale(1.02)` + `translateY(-3px)` + brighter border + stronger shadow. Add `transition: transform .35s, border-color .35s, box-shadow .35s`.
- `StudyChildCard` `<div>`: same hover lift/scale + subtle border brighten.
- `ProjectChildCard` `<button>`: add `scale(1.02)` + `translateY(-3px)` to its existing hover, keep image opacity lift.
- Keep tap target sizing/`min-h-[44px]` buttons intact.

### 3. Add transitions to `night-card`
Add `transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease` so all night-card surfaces animate smoothly (hover growth applies to the relevant cards; other night-card surfaces just get a border/shadow transition with no transform change).

### 4. Reduced motion
- `useReducedMotion` already short-circuits `useFocusMotion` (scale=1, opacity=1, y=0). Extend the guard so hover transforms are also disabled (skip `scale`/`translateY` on hover when reduced) — cards still brighten border/shadow on hover for feedback.

### 5. Polish (subtle, not neon)
- On hover, brighten the card border toward the track accent (`color-mix(in oklab, ${accent} 55%, transparent)`) and add a soft accent-tinted shadow. This matches the existing active-state glow, not a new color language.
- z-index: raise hovered card above neighbours so the scaled card isn't clipped by the next row (`relative z-10` on hover via `hover:z-10`).

## Files changed
- `src/components/Timeline.tsx` — `useFocusMotion` curves, hover styles on `MilestoneCard`/`StudyChildCard`/`ProjectChildCard`, reduced-motion guard.
- `src/styles.css` — `night-card` transition.

## Verification
- `npx tsgo --noEmit` passes.
- Production build passes.
- Playwright screenshots of `/journey`: capture a row at rest, then a hovered card, then scroll to make a row active — confirm visible growth/lift without layout shift or clipping. Confirm reduced-motion shows no transform.
