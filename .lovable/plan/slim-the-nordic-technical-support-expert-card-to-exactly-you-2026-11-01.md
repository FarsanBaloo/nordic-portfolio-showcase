# Slim the Nordic Technical Support Expert card to exactly your text

## Problem
The card currently repeats itself. Below your intro it shows three short bullets, four chips, then your five responsibilities, and then extra blocks: "Role mandate" (restates the intro), "Platform context", a flow diagram, a progression sentence and a tag list. That makes the same points show up two or three times.

## What the card will show (top to bottom, word for word)
1. Nordic Technical Support Expert — Building Management Systems
2. Schneider Electric | Oct 2026–Present
3. Customer Insight · Product Quality · Technical Leadership
4. The intro sentence ("Nordic responsibility for complex technical escalations…")
5. The five responsibilities, each with its bold heading and your full text:
   - Voice of Customer & Product Insights
   - Product Improvement & Cross-Functional Collaboration
   - Strategic Customer Engagement
   - Quality Investigations & Solution Validation
   - Nordic Technical Leadership & Knowledge Sharing (both sentences)

Everything stays inside one card, always visible, with no "Read more".

## Removed from this card only
- The three short bullets above the responsibilities
- The four chips
- Role mandate, Platform context, the flow diagram, the progression sentence and the tag list

Other role cards, the "Now" card, Journey, Education and projects stay as they are.

## CV
The CV already lists the Nordic role. Its bullets get synced to the same five points (shortened to one line each to fit the PDF), and the PDF is regenerated.

## Technical details
- `src/content/timeline.ts`: remove `overviewBullets` and `relevanceSignals` for `nordic-technical-support-expert`.
- `src/content/experience.ts`: keep `summary` and `detailGroups`; remove `notes`, `flow`, `progression`, `tags` (or keep the data but hide them via an always-open "compact" mode in `Timeline.tsx` if other pages use them).
- `src/components/Timeline.tsx`: for always-open roles, render only the detail groups inside the card.
- Check `/` on desktop and mobile, then `/cv`. No publishing.
