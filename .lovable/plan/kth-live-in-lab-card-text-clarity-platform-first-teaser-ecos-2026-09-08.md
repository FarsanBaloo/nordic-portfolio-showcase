# KTH Live-In Lab — card text clarity (platform-first teaser + EcoStruxure explained)

## Problem

The teaser shown on the timeline card and projects-page card has two issues:
1. It crams the role and the platform description into one dense sentence, leading with the role. The case study that opens from the card reads more clearly.
2. It name-drops "EcoStruxure" without explaining it — nobody knows that brand name. The case study's Context section explains it well, but the card never does.

The user wants the card-level text improved — platform-first, with EcoStruxure explained — without touching the case study sections.

## Scope

Only the card-facing text for the `kth-living-lab` entry in `src/content/projects.ts`:
- `subtitle`
- `teaser`

Do NOT change: the case study sections (Context, Contribution, Product/innovation perspective), flow, contributionNote, images, links, tags, type, org, meta, title, slug, categories, or any other project. Do NOT change the timeline role-context body in `src/content/timeline.ts`. Do NOT touch visual/layout/components.

## Changes

### subtitle (current)
> Open innovation platform for smart buildings and energy

Keep as is — already platform-first and clear.

### teaser (current)
> Acted as Schneider Electric's contact and EcoStruxure subject matter expert at KTH Live-In Lab — an open innovation platform where industry partners, KTH researchers and other universities collaborate on sustainable buildings and energy efficiency.

Rewrite to platform-first and explain EcoStruxure in plain terms:

> KTH Live-In Lab is an open innovation platform where industry partners, KTH researchers and universities collaborate on sustainable buildings and energy through full-scale residential testbeds. Acted as Schneider Electric's contact and subject matter expert for EcoStruxure — Schneider Electric's building-management software that connects a building's technical systems (HVAC, lighting, energy, sensors) into one place — supporting researchers with technical questions and engineering.

This leads with what the platform is, explains EcoStruxure in one clause so it lands without the case study, then states the role.

## Verification

- `npx tsgo --noEmit`
- `bun run build`
- Confirm `/projects` and `/projects/kth-living-lab` return 200
- Confirm the teaser reads platform-first and explains EcoStruxure on the timeline card and projects-page card
