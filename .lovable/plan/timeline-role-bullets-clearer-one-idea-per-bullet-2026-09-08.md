# Timeline role bullets: clearer, one idea per bullet

## Goal

Split the compound bullets in the two Schneider Electric timeline role cards
(Senior Technical Advisor, Support Engineer) into shorter, single-idea bullets.
Same facts, same order of seniority — just easier to scan. Nothing else changes:
no redesign, no new facts, no changes to summaries, signals, projects, layout or
other roles.

## Current problem

Each role has 3 bullets, but several bullets cram 2–3 different accomplishments
into one long sentence:

- Senior Technical Advisor, bullet 3 mixes mission-critical delivery + KTH
  Living Lab + informal leadership/mentoring in one sentence.
- Support Engineer, bullet 3 mixes prioritisation + root-cause analysis + R&D
  quality testing + release validation in one sentence.

## Proposed new bullets

### Senior Technical Advisor — Digital Platforms (2020–2025) — 5 bullets

1. Led customer-facing technical discovery — translated customer, operational
   and project needs into structured requirements, alternative architectures
   and product / solution options.
2. Held end-to-end technical ownership — influenced prioritisation, product
   selection and architectural trade-offs, balancing customer value, technical
   feasibility, lifecycle risk, cost and commercial value.
3. Delivered mission-critical platform integrations across data-centre,
   pharmaceutical and healthcare environments — including consolidation into a
   unified HMI and edge-based architecture.
4. Contributed domain expertise at KTH Living Lab as Schneider's contact and
   EcoStruxure subject matter expert.
5. Provided informal technical leadership and mentoring across teams and
   disciplines — leading through influence rather than formal authority.

(All content comes from the existing bullets; only split and shortened.
Bullet 4 stays short because the full KTH story sits in the project card
directly below the role.)

### Support Engineer — Digital Platforms / National Technical Expert (2013–2020) — 4 bullets

1. Owned the development of a reusable HVAC deviation-management capability —
   detection, alarms, logging and visualisation — turning operational data into
   actionable insight and enabling consistent deployment across customer systems.
2. Turned recurring customer issues and real-world usage into structured
   product feedback and enhancement proposals, justified on customer impact,
   business value and market needs — working with Product Owners, Global
   Product Support and R&D.
3. Prioritised critical issues by operational impact, urgency and technical
   risk, and performed root-cause analysis separating implementation problems
   from product defects.
4. Collaborated with R&D as quality tester for the building-automation
   platform — supporting release validation, deployment readiness and
   controlled rollout.

## Why not more bullets

The full, detailed bullet lists already live in the Experience/CV content.
Timeline cards should stay scannable: 4–5 short bullets per role is the right
ceiling — beyond that the cards get taller than the project cards beside them
and the timeline loses its rhythm.

## Changes

- `src/content/timeline.ts` only: replace `overviewBullets` arrays for
  `senior-advisor` and `support-engineer`. No component, style, layout or
  other-content edits.

## Verification

- `npx tsgo --noEmit`
- Build passes (`build OK` in build log)
- Preview: both role cards show the new bullets, no text overflow, mobile
  stacking intact
