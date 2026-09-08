# KTH Live-In Lab — card text clarity (platform-first teaser)

## Problem

The teaser shown on the timeline card and projects-page card crams the role and the platform description into one dense sentence, leading with the role. It reads less clearly than the case study that opens from the card. The user wants the card-level text improved — platform-first — without touching the case study sections.

## Scope

Only the card-facing text for the `kth-living-lab` entry in `src/content/projects.ts`:
- `subtitle`
- `teaser`

Do NOT change: the case study sections (Context, Contribution, Product/innovation perspective), flow, contributionNote, images, links, tags, type, org, meta, title, slug, categories, or any other project. Do NOT change the timeline role-context body in `src/content/timeline.ts`. Do NOT touch visual/layout/components.

## Changes

### subtitle (current)
> Open innovation platform for smart buildings and energy

Keep as is — it is already platform-first and clear.

### teaser (current)
> Acted as Schneider Electric's contact and EcoStruxure subject matter expert at KTH Live-In Lab — an open innovation platform where industry partners, KTH researchers and other universities collaborate on sustainable buildings and energy efficiency.

Rewrite to platform-first, two short sentences:

> KTH Live-In Lab is an open innovation platform where industry partners, KTH researchers and other universities collaborate on sustainable buildings and energy through full-scale residential testbeds. Acted as Schneider Electric's contact and EcoStruxure subject matter expert, supporting researchers with technical questions and engineering for their research.

This leads with what the platform is, then states the role concisely. It stays under ~160 characters for SEO meta description use and reads clearly on the card.

## Verification

- `npx tsgo --noEmit`
- `bun run build`
- Confirm `/projects` and `/projects/kth-living-lab` return 200
- Confirm the teaser reads platform-first on the timeline card and projects-page card
