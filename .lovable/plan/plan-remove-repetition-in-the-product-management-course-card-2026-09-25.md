# Plan: Remove repetition in the Product Management course card

Scope: `src/content/course-applications.ts` only (the `productManagement` array, lines 14–20). No redesign, no chip changes, no other cards touched. The card is already strong and reads as a coherent NPD lifecycle — this is a targeted de-duplication, not a rewrite.

## Analysis — the three repetitions

1. **Bullet 1 ↔ Bullet 2 near-verbatim tail.**
   - Bullet 1: "...a Product Innovation Charter (PIC) to **connect market need, technical opportunity, objectives and boundaries**."
   - Bullet 2: "...product strategy for Talking SCADA — **connecting market need, technical opportunity, objectives and boundaries**, and positioning the offer..."
   Same phrase, same words, same position. A reader feels bullet 2 restating bullet 1.

2. **"creates and captures value" echo.**
   - Bullet 2: "...where **value is created and captured**."
   - Bullet 4: "...how the offer **creates and captures value**."

3. **Two bullets start "Product definition &".**
   - Bullet 4: "Product definition & business model"
   - Bullet 5: "Product definition & development planning"
   Distinct content, but the shared prefix reads as repetition.

## Proposed edits (only `productManagement` array)

**Bullet 1 — Opportunity & direction (PIC).** Keep the NPD + PIC framing; replace the duplicated tail with a distinct purpose so it no longer restates bullet 2.

> Opportunity & direction: applied New Product Development (NPD) thinking and outlined a Product Innovation Charter (PIC) — framing market need, technical opportunity and the boundaries for what to build next.

**Bullet 2 — Product strategy & vision.** Remove the near-identical "connecting market need, technical opportunity, objectives and boundaries"; reframe around vision + positioning; break the value echo by not using "creates and captures value" here (keep that phrasing only in bullet 4, the business-model bullet, where it belongs).

> Product strategy & vision: shaped a product vision and product strategy for Talking SCADA — turning the opportunity into a direction the team can build toward, and positioning the offer so its value is clear to customers and the business.

**Bullet 4 — Product definition & business model (unchanged lead-in).** Keep "creates and captures value" here (the Business Model Canvas bullet is its natural home). No text change needed beyond it being the sole occurrence.

**Bullet 5 — rename lead-in from "Product definition & development planning" to "Development planning & PRD".** Removes the double "Product definition &" prefix while keeping the PRD focus. Body unchanged.

> Development planning & PRD: produced a product protocol and Product Requirements Document (PRD) covering target users, the whole offer, scenarios, MVP scope, success measures and acceptance criteria. Considered product, marketing and financial work in parallel.

Bullets 3, 6, 7 — unchanged.

## Net effect
- No more near-verbatim phrase shared between bullets 1 and 2.
- "creates and captures value" appears once (bullet 4).
- Only one bullet starts "Product definition &"; the other becomes "Development planning & PRD".
- Chip list untouched. No other cards touched.

## Verify
- Build OK, then Playwright on `/education` (desktop + mobile): confirm the seven bullets render, no overflow, no console errors.
