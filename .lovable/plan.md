# Plan: Dimensional 3D project type chips

## Goal
Replace the flat line-icon type chips on the project cards with larger,
dimensional 3D-style icons that clearly stand out — tied to the Scandinavian
aurora theme. The AI chip glows with aurora light; the neutral chips (IIoT,
Open Innovation, UX) stay polished but subordinate.

## What changes (frontend only)
File: `src/components/ProjectCard.tsx`

1. **Larger chips** — increase chip padding/icon size so the 3D detail is
   visible (icon ~18px, pill a touch taller). Still one small pill per card,
   top-right.

2. **3D / glassy icons** — replace flat lucide outlines with gradient-filled
   SVG icons that read as dimensional objects:
   - Filled body with a multi-stop aurora or neutral gradient
   - Soft inner specular highlight (top-left light)
   - Subtle drop shadow for depth
   - Thin light edge stroke

3. **AI chip (premium)** — sparkle icon filled with an aurora gradient
   (green → violet → magenta) plus a soft colored bloom behind the whole
   pill; a gentle glow at rest. Uses the `--primary` aurora family so it
   stays on-theme and works in light/dark.

4. **Neutral chips (IIoT / Open Innovation / UX)** — same 3D treatment but
   muted (slate/zinc gradient, faint glass sheen, no glow). Subordinate to
   AI so AI projects still pop.

5. **Keep the existing type logic** — chip label/icon derived from
   `project.categories` (AI & Product → AI; Innovation → Open Innovation;
   Industry → IIoT; UX & Interaction → UX). No data changes.

6. **Accessibility** — `title`/`aria-label` per chip, `aria-hidden` on the
   decorative icon, label text remains crisp and high-contrast in both
   themes.

## Out of scope
- No changes to project data, route logic, or other components.
- The `flagship` field stays on the data type (unused in the card) — no
  data migration.

## Verify
- `npx tsgo --noEmit` clean
- Build OK
- Screenshot `/projects` to confirm chips are larger, dimensional, AI glows,
  and readable in dark mode.
