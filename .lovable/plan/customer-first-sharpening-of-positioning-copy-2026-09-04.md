# Customer-first sharpening of positioning copy

## Assessment

The current copy leads with *where* you have been (systems, SCADA, 25 years) rather than *what you do for customers*. For AI Product Manager / Product Owner roles, recruiters scan for problem discovery, jobs-to-be-done, stakeholder pains and value delivered — the industrial background should be the proof, not the headline subject.

On the "too industrial?" question: the risk is real but manageable. The fix is not to remove industry — it is your differentiator — but to frame it as **complex, real-world B2B environments** (where software meets physical operations, regulation and real users). That reads as relevant to any product org building for demanding real-world use, not only industrial companies. Target roles stay as they are; the *language* broadens.

## Copy principles applied

1. **Customer and problem first** — every paragraph opens with the customer/problem, not the technology.
2. **Jobs-to-be-done vocabulary** — explicit use of: who has the problem, what job they are trying to get done, for whom value is created ("what / who / for whom").
3. **Stakeholder pains, both directions** — show you work with external customer pains *and* internal stakeholder pains (engineering, R&D, QA, business) across all roles.
4. **Industry as evidence** — "25 years in complex real-world systems" as proof of customer proximity, not as identity.

## Changes (all in `src/content/profile.ts`, plus meta strings)

- **`heroPrimary` / `heroSupporting`** — rewritten customer-first: starts with finding the right problem for real users (who / what job / for whom), then the industrial background as the reason you can do it credibly.
- **`heroProof`** — three points re-ordered: (1) customer discovery and JTBD across 25 years of real operations, (2) AI products tested with real users, (3) formal AI + product management education. Education moves last; customer proof leads.
- **`positioning`** — broadened: "Turning real customer pains in complex B2B environments into AI-enabled products that hold up in production."
- **`journeyIntro` + `journeyNarrative`** — re-threaded so every career stage is told through the customer lens: project engineer = learning the customer's real job; platform expert = recurring customer pains fed back into the product; advisor = balancing external customer pains against internal stakeholder pains (engineering, QA, business); studies = deliberate move to product. The "who / what / for whom" questions become the recurring motif.
- **`productPhilosophy`** — sharpened around jobs-to-be-done: a product succeeds when it does the job the customer actually has, for the people who actually use it.
- **`whatIBring`** — the five cards reworded so customer/stakeholder focus leads each one (e.g. "Customer & Business Perspective" opens with discovery and pains, not delivery).
- **`careerLens`** — item lists tuned to include discovery, stakeholder pains, JTBD language.
- **Meta descriptions** on `/` and `/journey` updated to match (customer-first phrasing, "complex real-world environments" instead of only "industrial").

## What does not change

- Structure, layout, timeline, images, projects, CV page — untouched.
- Target roles list — unchanged (AI PM / AI PO / Offer Manager).
- No new pages, no backend.
