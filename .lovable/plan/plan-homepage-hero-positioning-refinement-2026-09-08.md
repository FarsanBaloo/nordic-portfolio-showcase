# Plan: Homepage Hero Positioning Refinement

## Goal

Rebalance the homepage hero so a recruiter scanning the first screen reads a **senior industrial digital-solutions professional who deliberately added formal Product Management and applied AI** — not "technical person who recently studied AI."

This is a focused copy + bullet-structure change to the hero only. No redesign, no Journey rewrite, no layout/typography/navigation changes.

## Scope (files touched)

- `src/content/profile.ts` — hero text fields only
- `src/routes/index.tsx` — hero render: remove one paragraph, adjust bullet rendering for bold labels

No other files change. Journey content, capability grid, projects, roles/dates, CTAs, portrait, background, navigation, and typography all stay as-is.

## Change 1 — Remove the generic product-opening paragraph

In `src/routes/index.tsx`, delete the `<p>` block that renders `{profile.heroPrimary}` (the "Every good product starts the same way…" paragraph).

In `src/content/profile.ts`, remove the `heroPrimary` field (it is used only here). Leave `heroSupporting` untouched (it is not rendered in the hero).

No replacement philosophy statement is added — the Journey below already carries the customer/problem-first philosophy.

## Change 2 — Replace the positioning statement

In `src/content/profile.ts`, replace the `bridge` value with:

> "25 years in customer-facing industrial digital environments — from requirements, system integration and delivery to platform feedback, solution direction and stakeholder alignment. Today I combine that experience with Product Management and applied AI to shape useful, feasible and scalable products."

Keep the existing visual treatment (the single bordered `bg-aurora-teal/5` box) and its position in the hero. No new/overlapping positioning boxes.

## Change 3 — Replace the four evidence bullets

Change `heroProof` from an array of strings to an array of four `{ label, body }` objects, in this order:

1. **Digital solutions & stakeholder alignment**
   "Shaped, presented and delivered complex building-automation solutions across healthcare, pharmaceutical and other mission-critical environments, working across engineering, sales, management and customer stakeholders to align operational needs, feasibility and trade-offs."

2. **Product & lifecycle experience**
   "Turned recurring customer and field issues into structured product feedback and enhancement proposals with Product Owners and R&D, contributing to prioritisation, release readiness and deployment."

3. **Applied AI**
   "Built and validated RAG, forecasting and agentic AI solutions through degree and postgraduate work, including testing with real users and real data."

4. **Product, AI & business foundation**
   "B.Sc. Computer Science (Intelligent Systems) plus postgraduate studies in advanced AI, Product Management, requirements, strategy, business models and Industrial Economics & Management."

In `src/routes/index.tsx`, update the bullet `<ul>` rendering so each item shows the **label in bold** followed by the body, keeping the existing compact list treatment (small dot, `text-[15px]`, `space-y-2.5`, `max-w-3xl`). The label renders as `<span className="font-semibold text-night-foreground">` inline before the body text so a recruiter can scan the four proof areas without reading every word.

## Change 4 — Progression chip: "AI" → "Applied AI"

In `src/content/profile.ts`, change the last item of `progression` from `"AI"` to `"Applied AI"`.

Final progression: Industrial Systems → Digital Platforms → Product → Applied AI.

## Guardrails (verified, not changed)

- Name, title, location, and availability pill remain.
- No new Target / Focus Roles box.
- No claim of developing the underlying commercial platform products — wording stays "shaped, presented and delivered solutions."
- No formal Product Manager ownership, roadmap ownership, or commercial launch ownership implied in the Product & lifecycle point.
- Three CTA buttons remain unchanged: View selected projects, Download CV (PDF), Connect on LinkedIn.
- Journey section (including the Senior Technical Advisor paragraph and the "From 2023, during the same period…" study paragraph) is not rewritten.
- No redesign, no other sections touched.

## Verification

- `npx tsgo --noEmit` passes.
- Build log reports `build OK`.
- `/` returns 200.
- Browser check: hero shows name/title/availability, no "Every good product starts…" paragraph, one positioning box with new text, four bold-labeled evidence bullets in the specified order, final progression chip reads "Applied AI", three CTA buttons present, Journey section unchanged, no console errors.
