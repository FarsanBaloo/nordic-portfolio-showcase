# Move Senior Technical Advisor projects to the opposite (right) side of the timeline

## Goal

The three projects done during the Senior Technical Advisor role — KTH Live-In Lab, Digital Realty ST06, and S:t Eriks — currently render **under** the role card on the **left** side. Move them to the **right** side, directly opposite the role card, so the reader's eye travels across the rail from the role to its evidence. This makes the timeline easier to follow for this row.

Nothing else changes: design, content, other milestones, navigation, and the professional/academic distinction all stay as they are.

## What changes

### 1. `src/content/timeline.ts`

- Add an optional `childrenOppositeSide?: boolean` field to the `TimelineMilestone` type.
- Set `childrenOppositeSide: true` on the `senior-advisor` milestone only.

### 2. `src/components/Timeline.tsx` — `MilestoneRow`

Today, any milestone with a `roleId` and children forces `childrenUnderCard = true`, which renders children in the **same** column, directly under the parent card. For the Senior Technical Advisor, this means the three project cards sit under the role card on the left, and the right column is empty.

When `entry.childrenOppositeSide` is true:

- **Override `childrenUnderCard` to `false`** for this milestone, so children render in the standard row-5 child slot instead of under the card.
- **Switch the child column to the opposite side**: for a professional milestone (not dev), place children in `col-start-3` (right) with `pl-10` and `side="right"`, so the hairline connectors point from the rail toward the right. For a development milestone, it would be `col-start-1` (left) with `pr-10` and `side="left"` — but only the Senior Technical Advisor uses this flag, so in practice it is always right-side placement.
- **Keep `preStudyNote` under the parent card** on the left. Currently `preStudyNote` only renders inside the `childrenUnderCard` block. When children move to the opposite side, render `preStudyNote` directly under the `RoleEvidence` panel (still in the left column, inside the parent card's wrapper) so the 2020–2023 "before the degree studies" note stays next to the role it describes.
- The evidence panel (`RoleEvidence`) stays under the parent card on the left, exactly as today. Because children are now in a separate column, opening the panel no longer pushes them down — the original gap problem that `childrenUnderCard` solved does not apply here.

### 3. No content changes

No text, dates, employers, project data, or role descriptions change. Only the placement of the three project child cards moves from under-card-left to opposite-right.

## Files touched

- `src/content/timeline.ts` — add field, set flag on `senior-advisor`
- `src/components/Timeline.tsx` — `MilestoneRow` reads the flag, overrides `childrenUnderCard`, adjusts column/side/placement, and renders `preStudyNote` under the parent card

## Verification

- `npx tsgo --noEmit` passes
- Build passes
- Playwright screenshots at ~1440px: Senior Technical Advisor card on the left, three projects on the right with connectors across the rail, no overlap
- Playwright screenshots at ~900px and ~390px: single-column stacked layout unchanged
