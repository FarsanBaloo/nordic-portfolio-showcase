# Plan: Strengthen landing page and Journey copy

Goal: make the landing page and Journey read as a coherent, well-crafted
narrative that lifts Rickard as an AI Product Manager — sharper, more human,
less list-like — using the existing content structure and components. No new
layout or components, only copy and how it is presented.

## 1. Landing page (`src/content/profile.ts`)

- **Hero (`heroPrimary` / `heroSupporting`)** — rewrite so it reads as one
  confident voice instead of two stacked paragraphs of claims. Keep the
  customer/JTBD opening, then one bridge sentence (engineering ↔ business,
  IoT/IIoT depth), then one closing line on AI products built and validated
  with real users. Cut repetition of "real" and "25 years" (currently stated
  multiple times across hero + proof).
- **`heroProof`** — tighten to three short, parallel bullets (customer depth /
  AI shipped and validated / education), each one line, no overlap with hero
  wording.
- **`positioning` / `descriptor`** — align with the CV: lead with
  AI Product Manager, keep industrial platforms and IoT/IIoT as evidence,
  not as the headline.
- **About paragraphs** — trim from 5 long paragraphs to 4 tighter ones;
  merge the "today I am interested in…" closer into a forward-looking
  statement rather than a wish list.

## 2. Journey page copy (`journeyIntro`, `journeyNarrative`, `careerLens`)

- **`journeyNarrative.lead` + 4 paragraphs** — rewrite as a true story arc
  with one clear beat per career stage (Project Engineer → national expert →
  Senior Technical Advisor → the deliberate study choice), each paragraph
  answering: what changed for the customer, and what I learned that I still
  use. Remove repeated phrases ("who has the problem / job to be done" appears
  in nearly every paragraph — keep it once, in the lead or emphasis).
- **`journeyIntro`** — shorten to one strong opening + one line, not two
  dense paragraphs.
- **`emphasis`** — make it the single memorable takeaway sentence.
- **`careerLens`** — keep, but align item wording with the CV terms
  (discovery, JTBD, requirements, prioritisation, feasibility, validation).

## 3. Timeline stage labels & summaries (`src/content/timeline.ts`)

- Update each milestone's `stage` and `summary` so the timeline itself tells
  the same story as the narrative: customer focus first, then what the role
  produced. Shorten `summary` lines to one sentence each; the detail already
  lives in the evidence bullets.

## 4. Consistency & metadata

- Update `src/routes/index.tsx` and `src/routes/journey.tsx` meta descriptions
  to match the new copy.
- Verify build passes and visually check the hero, Journey narrative and a
  timeline section in the preview.

## Technical notes

- Files touched: `src/content/profile.ts`, `src/content/timeline.ts`,
  `src/routes/index.tsx`, `src/routes/journey.tsx` (metadata only).
- No component, layout or data-structure changes; no new dependencies.
- All dates, employers, universities and facts stay exactly as they are —
  only wording changes.
