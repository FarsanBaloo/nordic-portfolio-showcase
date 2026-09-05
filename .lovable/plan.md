# Plan — Re-position the S:t Eriks Eye Center of Excellence project

## Goal
Rewrite the S:t Eriks project so it reads as a strong AI Product Manager / Product Owner case study, not a technical integration list. All copy stays in English. Only this one project is touched; no layout or styling changes.

## What the project should communicate (AI PM framing)
The story to land: **discovery in a real operating theatre → translating operational needs into a solution that actually worked for users in a critical environment → stepwise UX iteration with the customer → one unified interface consolidating many technical systems on an edge architecture → phased rollout from one theatre to the rest.**

## Files to edit (two edits)

### 1. `src/content/projects.ts` — the `st-eriks` entry (≈ lines 635–685)
Rewrite the project object in place, keeping its `slug`, `org`, `type`, `priority`, `flagship` and `meta` unchanged. New/updated fields:

- **subtitle** → "Mission-critical operating-theatre digital platform — discovery to delivery"
- **teaser** → discovery-first one-liner emphasising customer discovery in the theatre and a unified HMI on edge architecture.
- **tags** → keep relevant existing tags, add: `Customer Discovery`, `Requirements`, `UX & Interaction`, `Edge Architecture`, `Phased Rollout`. (AI PM / Product vocabulary, not an industrial controls list.)
- **highlight** (new) → a one-sentence pull-quote: "Translated operational needs into a solution that actually worked for the user in a critical healthcare environment."
- **sections** rewritten to read as a PM case study:
  1. *The job to be done* — surgeons, nurses and theatre staff needed one interface to control the room and follow procedures, instead of scattered subsystems and handovers. Discovery was done **with the customer inside an operating theatre**, observing the real workflow before anything was designed.
  2. *Discovery & iterative UX* — functionality and UX were adapted step by step based on customer need, with a tailored interface and complex integration built around their real workflow.
  3. *What was integrated* — bullet list: lighting, blind/shade control, HVAC, CCTV control, door-lock interlocks in the operating theatre, nurse call, alarms, and routing of microscope-camera video to large screens.
  4. *Architecture* — an edge server consolidated all technical subsystems into one platform; the design was proven in one operating theatre (including door-lock interlocks) before rollout to the remaining theatres.
  5. *The interface* — describe the multi-surface UX factually: outside the theatre, a wall-mounted touch panel controlled cameras inside and outside, gave outside visitors a live view of the procedure from the microscope camera, and let staff follow everything from the corridor; inside, the full UX was visualised on a 42" TV and driven from a 24" panel PC.
  6. *Outcome* — phased rollout from the pilot theatre to the remaining theatres; a single operational interface the clinical team could trust in a mission-critical environment.
- **flow** (new) — `["Operational need", "Discovery in theatre", "Tailored UX & integration", "Edge architecture", "Pilot theatre", "Rollout to remaining theatres"]` with a `label` like "From discovery to rollout".
- **metrics** (new, only if values are honest) — avoid invented numbers. Use qualitative outcome metrics only, e.g. "Subsystems unified" → "8+", "Rollout" → "Pilot → remaining theatres", "Environment" → "Mission-critical healthcare". If this risks reading as filler, omit metrics entirely.
- **contributionNote** (new) — short note: "Customer-facing discovery, requirements, solution direction and end-to-end technical ownership as Senior Technical Advisor."
- **reflection** (new) — one sentence on the PM lesson: discovery with the user in their real environment is what turned a technical integration into a solution people could rely on.

Do **not** invent KPIs, customer quotes, or numbers not given by the user.

### 2. `src/content/timeline.ts` — `projectRoleContext["st-eriks"]` (≈ lines 609–612)
Expand the `body` from the current one line to two sentences so the timeline's "My role" panel matches the new framing: customer-facing discovery in the operating theatre, stepwise tailored UX, and end-to-end technical ownership of a unified HMI on an edge architecture in a mission-critical healthcare environment.

## What stays unchanged
- Dates/period (`2020–2021`, `verified-range`), employer, role title, all other projects, the timeline layout, and all styling/components.
- No new images are added (none were supplied for this project); the existing `images` field is left as-is / omitted.

## Verification
- Run a build/typecheck after the edits.
- Confirm `/` and `/journey` return 200 and the S:t Eriks evidence sheet reads as an AI PM case study.
