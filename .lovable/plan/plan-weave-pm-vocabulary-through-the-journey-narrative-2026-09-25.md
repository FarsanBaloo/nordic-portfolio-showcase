# Plan: Weave PM vocabulary through the Journey narrative

## Goal

Strengthen product-management vocabulary — discovery, validation, prioritisation, requirements, trade-offs, value — naturally through all five Journey paragraphs and the emphasis, so a recruiter reads a consistent PM/Offer-Manager thread from origin to current role. No redesign, no new claims about measurable results or formal titles.

## Current state of the five paragraphs (`src/content/profile.ts` lines 138–142 + emphasis 146–147)

Paragraphs 2, 3 and 5 **already carry strong PM vocabulary**: para 2 has *"product feedback", "prioritised", "validated releases", "discovery", "solution proposals", "trade-offs", "customer value", "feasibility", "problem definition"*; para 3 has *"product management, requirements, value-driven design, innovation, leadership, product and offer management"*; para 5 has *"prioritising", "customer insight", "lifecycle decisions", "Product and Offer Management"*. They are kept as-is.

The gaps are in **paragraph 1 (origin)**, **paragraph 4 (Talking SCADA)**, and the **emphasis** — where discovery/validation language is implied but not named.

## Proposed changes

### Paragraph 1 (line 138) — name discovery at the origin

Add *"on discovery"* so the thread is visible from the first sentence; keep everything else.

> "I began as a Project Engineer, working alongside customers **on discovery** — understanding what they were really trying to get done, and what would break if we got it wrong. From requirements and solution design through to delivery of digital solutions for building operation and energy optimisation, I stood next to the customer when it went live. That is where I learned the lesson everything else builds on: a product is only as good as the day-to-day reality of the people who depend on it. Later, as Sweden's national technical expert for a digital building platform and its ecosystem of edge controllers, I saw the faults that kept coming back, the workarounds customers relied on, and the constraints facing the teams building and supporting the platform."

### Paragraph 4 (line 141) — "investigate" over "look at"

Light touch: *"what to look at next"* → *"what to investigate next"*, which reads as discovery/validation language without changing meaning.

> "Talking SCADA became the case where these perspectives met. SCADA systems monitor and steer ventilation, heating, cooling, measurements and alarms in large buildings — rich in data, but hard to interpret. The case explored letting the building explain, in plain language, where energy is being wasted, what is likely causing it and **what to investigate next** — connecting customer and business value while keeping human judgement central."

### Emphasis (line 147) — add "validate"

> "That is what I bring to product management and offer strategy: I start with the customer's problem, and I understand both sides of the table — the people who live with the result and the teams who have to build, deliver and support it. I listen before defining, **validate before committing**, make trade-offs visible, and work across disciplines to create a direction people can understand and contribute to."

### Paragraphs 2, 3, 5 — unchanged

They already read with consistent PM vocabulary (see Current state above).

## Scope

- Only `journeyNarrative.paragraphs[0]`, `paragraphs[3]` (Talking SCADA), and `emphasis` in `src/content/profile.ts`.
- No `aboutParagraphs`, no other files, no redesign.

## Verification

1. Build OK (`/tmp/observability/build-errors.log`)
2. Playwright desktop 1280×1800 + mobile 390×844 on `/` — one H1, no overflow, no console errors; "on discovery" visible in paragraph 1, "validate before committing" visible in emphasis.
