# Journey timeline refinement — relationships, width, focus, readability

Refining the existing site only. React/TypeScript, Nordic aurora identity, Sora + IBM Plex, the Journey intro, portrait, right-side project evidence sheet and verified content all stay.

## 1. Parent → opposite child layout

One central spine with a three-column desktop grid (`minmax(360px,1fr) / 72px / minmax(360px,1fr)`), timeline capped at ~1280px and centered.

- Professional roles on the LEFT, their related work on the RIGHT, aligned to the same row.
- Education/development milestones on the RIGHT, their courses and projects on the LEFT.
- Short 1px horizontal connectors with a small endpoint node link each child to the rail, tinted with the parent's accent (teal `#62DCC4` / violet `#A99BFF`).
- Parent cards ~420–480px, child cards ~320–400px.
- Below ~1150px: single left rail, parent then indented children, parent-accent connectors. Mobile evidence drawer single-column, sheet near full-screen.

## 2. Content restructure

- Senior Technical Advisor keeps its three bullets; Digital Realty, KTH Living Lab, S:t Eriks and AstraZeneca move to the opposite side under "Selected work during this role" — no invented dates.
- Support Engineer gets the reusable HVAC capability opposite it under "Selected product / platform capability".
- Project Engineer collapsed view switches to the three customer/requirements/delivery bullets; tool and commissioning detail moves into the expanded layer.
- BSc parent stays lean on the right; PLANE(ra)T, Hållbar Hälsa, Seeing AI, Talking Systems and the wind thesis move to the left under "Development work", grouped 2024 · Interaction Design / 2025 · Applied AI / 2025 · Bachelor thesis with verified years only.
- Postgraduate parent card is flattened to period, institutions and a short summary. The course groups (NLP, Autonomous Systems, Innovation in Practice, and the four BTH product/requirements groups) move to the left side as compact cards.
- Talking SCADA becomes one card labelled "Continuous product case" with a connector spanning the Skövde and BTH study phases — not duplicated. Multi-Agent AI becomes its own left-side card.
- The overlap note appears once, as a centered bridge annotation between the tracks where academic development begins; removed from the Senior and BSc cards.
- NOW becomes a centered convergence node on the spine (~360–440px) with combined teal/violet treatment.

## 3. Expanded role evidence

The drawer spans both content columns (`grid-column: 1 / -1`), max-width ~1080px, centered, 3–4 information columns on wide screens. Opens with height 0 → auto, opacity and 8px translateY over ~0.4s, no bounce; opening one role closes the previous one. Button text toggles "Explore role evidence ↓" / "Hide role evidence ↑". Evidence content itself never scales.

## 4. Scroll-driven focus

Motion `useScroll` + `useSpring` + `useTransform` (stiffness 130, damping 30, mass 0.25), native scrolling, focus zone 35–58% of viewport height.

- Parent cards interpolate scale 0.98 → 1.02 → 0.99 and opacity 0.68 → 1 → 0.84, transforms/opacity only.
- Node scales ~1.3 and glows when active; only NOW breathes slowly.
- Children of the active parent fade in with a 60–90ms stagger, translateX 12–18px from the rail side, scale 0.985 → 1.
- Rail: dark background, soft illuminated section around the current position with a small trailing light dot, teal early, violet later, converging at NOW. No floating year bubble, no interpolated years.
- Aurora eases from 0.16 → 0.24 → 0.16 behind the active group; a subtle local dark gradient sits behind card columns for legibility.
- `prefers-reduced-motion`: no scale/translate interpolation, static border/text/node emphasis only; mobile caps scale at ~1.01.

## 5. Typography and surfaces

New text tokens: headings `#F7F9FB`, body `#D3DBE2`, bullets `#CDD6DD`, secondary `#A5B1BA`, metadata `#8D9AA5`, decorative `#6C7984`.

Sizes: intro body 17px/1.7, role summary 16.5–17px, bullets 15.5–16px, role title 24–26px, org 13.5–14px, stage 12–12.5px mono, project title 17–18px, project body 14.5–15px. Uppercase tracking down to 0.08–0.11em. Card surface `rgba(11,17,23,0.88)`, border `rgba(160,185,198,0.18)`, active borders teal 0.40 / violet 0.36.

Project sheet: `max-width: min(50vw, 780px)`, full height, internal scroll, backdrop `rgba(0,0,0,0.24)`, no heavy blur, 16px/1.65 body.

## 6. Accuracy

No invented dates, metrics, ROI or historical Product/Offer titles; no R&D-engineer implication; academic years only where verified; professional projects stay under "Selected work during this role". Home keeps no duplicated experience block; About stays a concise profile, target roles, capabilities, languages.

## Technical notes

Files touched: `src/components/Timeline.tsx` (split into rail, milestone row, connector, evidence drawer, focus hook), `src/components/ProjectEvidenceSheet.tsx`, `src/content/timeline.ts` (child side/anchor metadata, postgraduate children as branches, Talking SCADA continuity), `src/content/experience.ts`, `src/routes/journey.tsx` (intro copy), `src/styles.css` (text tokens, tracking, card surfaces, aurora intensity). Verified at ~390px, ~900px, ~1280px and ~1600px.
