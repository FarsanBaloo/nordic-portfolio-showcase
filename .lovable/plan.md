# Plan: Polished metallic / steel chip icons

## Goal
Make the project type chips shine like polished silver/steel (chrome) instead
of the flat-ish current treatment. The icons should read as small metal gems —
reflective, dimensional, with a bright specular streak. AI keeps its aurora
color identity but with a chrome-like metallic sheen; the neutral chips become
true silver/steel chrome.

## What changes (frontend only)
File: `src/components/ProjectCard.tsx`

1. **Chrome/metallic icon gradients** — replace the simple 2-stop gradients
   with a multi-stop metallic gradient that mimics polished steel: dark edge
   → bright mid sheen → soft highlight → dark edge. This gives the
   "silver/steel" reflective look.

2. **Specular streak** — a brighter, narrower white highlight band running
   diagonally across each icon, plus a soft top-left gloss dot, so the icons
   read as shiny metal, not flat fills.

3. **AI chip** — keep the aurora green→violet→magenta hues but layer the
   chrome sheen on top (metallic aurora), so it still glows and stands out
   while feeling polished/premium. The aurora bloom behind the pill stays.

4. **Neutral chips (IIoT / Open Innovation / UX)** — pure silver/steel chrome
   gradient, bright specular streak, subtle edge. No color — just metal. A
   faint outer rim light so they read against dark and light cards.

5. **Pill surface** — give the chip pill itself a subtle glassy sheen
   (very light top-to-bottom gradient, thin top highlight line) so the whole
   badge reads as a polished insert, not a flat label. AI pill keeps its
   translucent aurora tint; neutral pills get a faint silver tint.

6. **Size** — keep the slightly larger size (18px icon, taller pill) so the
   metallic detail is visible.

7. **Accessibility** — unchanged: `title`/`aria-label` per chip,
   `aria-hidden` icons, crisp high-contrast label text in both themes.

## Out of scope
- No data, route, or other-component changes.
- Still one pill per card, top-right.

## Verify
- `npx tsgo --noEmit` clean + build OK.
- Screenshot `/projects` at larger zoom on the chip to confirm the metallic
  shine, silver/steel neutral chips, and glowing aurora AI chip are visible
  and readable in dark mode.
