# Make the Nordic card use the same bullets as the other role cards

## Problem
Your other role cards show their points as a plain bullet list (small coloured dot, normal text). The Nordic card instead shows five small, all-caps green headings, each with its own sub-bullets. That makes it look different.

## Change
- The Nordic card gets the same bullet list as the other cards, in the same place, right under the intro sentence.
- There will be five bullets, one per responsibility. Each starts with its heading in bold, followed by your full text, for example:
  - **Voice of Customer & Product Insights** — Translate recurring field issues, customer and partner feedback, and operational needs into structured product insights, quality requirements and enhancement proposals.
- When a responsibility has two sentences (Product Improvement, Nordic Technical Leadership), both stay in the same bullet.
- The all-caps headings and the inner section with the thin line are removed from this card.
- The card stays always open, with no "Read more". Title, dates, focus areas and intro don't change, and neither do your other cards.

## Technical details
- `src/content/timeline.ts`: give the Nordic entry `overviewBullets` (5 strings), remove `roleEvidenceOpenByDefault`, and add a flag (e.g. `hideRoleEvidence: true`) so no Read more button or panel is drawn.
- `src/components/Timeline.tsx`: support a bold lead-in in a bullet (split on " — " or use an `{ lead, text }` shape), and skip the Read more and panel when `hideRoleEvidence` is set.
- Check `/` on desktop and mobile.
