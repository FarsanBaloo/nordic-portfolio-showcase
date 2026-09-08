# Advisor projects back under the role card, plus an overlap note

## Goal

Return to the earlier layout: the three projects from the Senior Technical Advisor role (KTH Live-In Lab, Digital Realty ST06, S:t Eriks) render directly under the role card on the left. Study work stays on the opposite side, so the timeline keeps one clear rule: work on one side, studies on the other.

To answer the "did he really work five years straight as an advisor?" question, the role card gets a short, factual overlap line instead of moving cards around.

## What changes

### 1. `src/components/Timeline.tsx`

- Remove the `oppositeSide` branch added in the previous change: `childrenUnderCard` goes back to `(!!parallel || (!!entry.roleId && !!entry.children?.length))`.
- Remove the opposite-side column swap in the row-5 child slot (`childOnLeft` logic and the wrapping IIFE), restoring the plain `isDev`-based placement.
- Remove the extra `preStudyNote` render under `RoleEvidence`; the note again renders only inside the under-card block, where it lived before.

### 2. `src/content/timeline.ts`

- Remove `childrenOppositeSide: true` from the `senior-advisor` milestone and delete the now-unused `childrenOppositeSide?: boolean` field from the `TimelineMilestone` type.
- Update the existing `preStudyNote` on `senior-advisor` so it states the overlap plainly: full-time in the role through the pre-study years, with the later part of the period running alongside degree studies. Wording stays factual — no new employers, dates or claims beyond what the CV already supports.

## Verification

- `npx tsgo --noEmit` and the build pass.
- Screenshots at ~1440px: role card left, its three projects stacked under it on the left, study track on the right, overlap note visible under the role card.
- Screenshots at ~900px and ~390px: single stacked column, no overflow.
