# Plan: Lift Journey paragraph 1 word choice toward PM / Offer Manager

## Problem

Journey paragraph 1 (`src/content/profile.ts` line 138) opens with hands-on-technician language — *"programming, integration and commissioning"*, *"system design"*, *"when it went live"* — that frames the origin as a technician rather than as someone delivering digital solutions with business value. For the target roles (AI Product Manager, Product Manager, Product Owner, Offer Manager) the word choices should signal delivery ownership and building/energy value, not hands-on commissioning.

The origin lesson itself is strong and stays: *"a product is only as good as the day-to-day reality of the people who depend on it."* Only the technical-sounding work description around it changes.

## What changes (single edit, line 138)

Replace journeyNarrative `paragraphs[0]` with a version that keeps the narrative arc and lesson but reframes the work toward delivery of digital solutions for building operation and energy optimisation.

Proposed replacement text:

> "I began as a Project Engineer, working alongside customers — understanding what they were really trying to get done, and what would break if we got it wrong. From requirements and solution design through to delivery of digital solutions for building operation and energy optimisation, I stood next to the customer when it went live. That is where I learned the lesson everything else builds on: a product is only as good as the day-to-day reality of the people who depend on it. Later, as Sweden's national technical expert for a digital building platform and its ecosystem of edge controllers, I saw the faults that kept coming back, the workarounds customers relied on, and the constraints facing the teams building and supporting the platform."

Word-choice changes only:
- *"system design"* → *"solution design"* (PM/Offer framing)
- *"programming, integration and commissioning"* → *"delivery of digital solutions for building operation and energy optimisation"* (lifts from hands-on programming to solution-delivery framing aligned with EcoStruxure Building Operation and his target roles)
- *"edge devices"* → *"edge controllers"* (consistent with the EcoStruxure edge-controller terminology already used elsewhere on the site)

Unchanged: opening sentence, the *"stood next to the customer when it went live"* line, the origin lesson, the national-technical-expert sentence (a real credential worth keeping), and the faults/workarounds/constraints closing.

## Scope

- Only `journeyNarrative.paragraphs[0]` in `src/content/profile.ts` (line 138).
- No other paragraphs, no `aboutParagraphs`, no redesign, no new claims about measurable results or formal titles.

## Consistency note (not in scope unless you ask)

`aboutParagraphs[1]` (line 70) uses the same *"programming, integration, commissioning"* phrasing. If you want the same PM/Offer lift applied there for consistency, say so and I'll add it to the plan; otherwise it stays as-is.

## Verification

1. Build OK (`/tmp/observability/build-errors.log`)
2. Playwright desktop 1280×1800 + mobile 390×844 on `/` — one H1, no overflow, no console errors, "building operation and energy optimisation" visible, "programming, integration and commissioning" gone.
