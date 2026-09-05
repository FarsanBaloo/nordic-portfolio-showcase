# Timeline vs CV: what is missing

I compared every experience point in the new CV with what the timeline cards show and what the deeper role panels contain. Overall the coverage is good — the timeline is deliberately three short points per role, and it should stay that way. Three real gaps stand out.

## 1. Senior Technical Advisor — informal technical leadership is invisible in the timeline

The deeper panel describes it in detail, but the timeline card (summary, three points, tags) says nothing about leadership or mentoring. This is one of your strongest product-manager signals: setting direction and aligning people without formal authority.

Change: fold "informal technical leadership and mentoring" into the third timeline point and add a "Technical Leadership" tag. No new fourth bullet.

## 2. Support Engineer — the product-quality side is thin on the card

The CV credits you as quality tester with R&D for the building-automation platform and with co-developing support tools and troubleshooting workflows. The timeline card mentions release readiness but never the R&D quality work.

Change: extend the third timeline point so it names the R&D quality-testing collaboration alongside release validation and rollout. Also add the missing R&D quality-tester point to the deeper Support Engineer panel, where the CV has it but the panel does not.

## 3. Project Engineer — fine as is

All six CV points are present in the deeper panel, and the three timeline points cover needs, ownership/delivery and quality/mentoring. Only the local technology network is left out, which belongs in the deeper panel (it already is) and not on the card.

## Recommendation

Keep the timeline at three points per role. Adding more turns the cards into a second CV and weakens the scroll story. The two edits above close the only substantive gaps.

## Technical notes

- `src/content/timeline.ts`: update `overviewBullets[2]` and `relevanceSignals` for `senior-advisor`; update `overviewBullets[2]` for `national-expert`.
- `src/content/experience.ts`: add the R&D quality-tester bullet to the `support-engineer` role bullets.
- No layout or component changes.
