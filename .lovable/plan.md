# Lift Nordic Technical Support Expert role with product-feedback & enhancement-proposal wording

## Goal
Make the current Nordic Technical Support Expert role explicitly carry PM-strengthening
language — "structured product feedback and enhancement proposals" for the Nordic region,
the digital platform (EcoStruxure Building Operation) and its edge IoT ecosystem. Today
that phrasing lives on the *prior* roles (Support Engineer / Senior Technical Advisor); the
Nordic role only says "structured feedback and escalation to R&D" and "defect & enhancement
prioritisation". Adding it to the current role ties it directly to PM/offer-management skills a
recruiter is looking for.

## Scope (text-only, no redesign, no new images, no invented results)
No layout/component changes. No publishing. Wording stays truthful to the role brief
(technical support, VIP ownership, defect/improvement prioritisation with R&D, mentoring).

## Changes

### 1. `src/content/experience.ts` — Nordic role (id `nordic-technical-support-expert`)
- Add/strengthen one bullet so the role explicitly turns recurring Nordic field cases into
  **structured product feedback and enhancement proposals** for EcoStruxure Building Operation
  and its edge-controller / edge IoT ecosystem, prioritised by customer impact, technical risk
  and Nordic business relevance.
- Update the `Product & offer relevance` detail group item from "Structured feedback and
  escalation to R&D" → "Structured product feedback & enhancement proposals" (scoped to Nordic
  region, digital platform and edge IoT ecosystem).
- Keep all other bullets/groups (technical support, VIP ownership, mentoring, platform context)
  intact.

### 2. `src/content/cv.ts` — Nordic role bullets (lines ~136–148)
- Add/strengthen one bullet with the same "structured product feedback and enhancement
  proposals for the Nordic region, the digital platform and its edge IoT ecosystem" framing,
  tied to R&D collaboration and Nordic prioritisation.

### 3. `src/content/timeline.ts` — Nordic node (id `nordic-technical-support-expert`)
- Strengthen one `overviewBullets` entry to mention structured product feedback / enhancement
  proposals scoped to the Nordic region and the platform + edge IoT ecosystem.
- Add "Product Feedback & Enhancement Proposals" (or similar) to `relevanceSignals` if space
  allows without losing existing signals.

### 4. `src/content/profile.ts` — evidence point (line ~28–29)
- The "Product feedback, prioritisation & lifecycle" evidence body already says the prior role
  produced feedback/enhancement proposals and "The current Nordic role extends this into
  regional oversight and prioritisation…". Refine the second sentence so the Nordic role also
  explicitly produces **structured product feedback and enhancement proposals for the Nordic
  region, the digital platform and its edge IoT ecosystem** — not only oversight/prioritisation.

## Not changing
- No claim of formal Product Manager / Offer Manager title for the Nordic role.
- No new job-seeking / "open to" signal.
- Journey narrative, projects, education, sitemap, routes — unchanged unless a build error
  forces it.

## Verification
- `rg -n "enhancement proposals|product feedback" src/` to confirm consistent usage.
- Build OK in `/tmp/observability/build-errors.log`.
- Playwright desktop + mobile on `/`, `/about`, `/projects`, `/education`, `/cv`, `/contact`
  → HTTP 200, one H1, no overflow, no console/page errors.
