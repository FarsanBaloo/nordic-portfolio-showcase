# Plan: Refine Blekinge course cards (Leadership + Product Management + Requirements)

Scope: application-bullet text only (the descriptive bullets under each course group in the Education page and the CV). No redesign, no new images, no publishing. All edits land in `src/content/course-applications.ts` (and `src/content/education.ts` topic chips only if noted).

## Task 1 — Leadership card (`Leadership in High-Technology and Knowledge-Intensive Organizations`)

The current 3 application bullets describe shared direction, Talking SCADA perspectives and understandable decisions. Rewrite them to reflect what the course actually involved: studying leadership styles, interviewing and analysing a real leader in a technology-intensive context (a data-centre leader), and producing a personal leadership development plan with self-reflection.

Proposed new `courseApplications.leadership` (3 bullets):

1. "Studied leadership styles and how they fit technology- and knowledge-intensive organisations, then interviewed a practising leader and analysed their style in real context — in my case the person leading and accountable for a data centre."
2. "Connected the analysis to cross-functional direction: how a leader aligns engineering, operations and business stakeholders around shared priorities, communication and trade-offs."
3. "Built a personal leadership development plan with structured self-reflection — mapping my own strengths and growth areas against the leadership behaviours that fit technical, knowledge-intensive environments."

Topic chips stay as-is: `Stakeholder alignment`, `Communication`, `Cross-functional perspective`.

## Task 2 — Product Management card

Add explicit coverage of **product strategy**, **product vision** and **Product definition & business model** to the Product Management application bullets.

- Add a new bullet (Product strategy & vision):

  "Product strategy & vision: shaped a product vision and product strategy for Talking SCADA — connecting market need, technical opportunity, objectives and boundaries, and positioning the offer against where value is created and captured."

- Move the **Product definition & business model** bullet from the Requirements card into Product Management, lightly expanded to fit the product framing:

  "Product definition & business model: connected the vision, user needs, functional and quality scope, UX and service model through a Business Model Canvas — linking product definition to how the offer creates and captures value."

The existing Product Management bullets (Opportunity & direction, Concept generation & evaluation, Product definition & development planning, Commercialisation & market testing, Launch & lifecycle) are kept.

## Task 3 — Requirements card (`Product and Requirements Management for Digital Environments`)

Remove the **Product definition & business model** bullet (moved to Product Management in Task 2). The remaining 4 bullets stay: System requirements & traceability, System & workflow specification, Value-driven prioritisation, Assets & sourcing.

## Decision point for you

Two possible overlaps to confirm during review:
- "Product strategy & vision" vs the existing "Opportunity & direction" bullet (which already mentions a Product Innovation Charter connecting market need, objectives and boundaries).
- "Product definition & business model" vs the existing "Product definition & development planning" (PRD) bullet — two bullets starting with "Product definition".

If you'd prefer, I can instead merge strategy/vision into the existing "Opportunity & direction" bullet and keep bullet headers distinct. Flag your preference; otherwise I'll apply the three tasks above as written.

## Verification

Build check + Playwright on `/education` (desktop + mobile) to confirm cards render, no overflow, no console errors.
