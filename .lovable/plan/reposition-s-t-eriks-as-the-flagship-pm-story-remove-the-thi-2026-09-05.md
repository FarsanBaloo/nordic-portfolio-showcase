# Reposition S:t Eriks as the flagship PM story; remove the thin AstraZeneca card

## My honest take (the short answer)

**Yes on both.**

S:t Eriks is your strongest AI Product Manager evidence — and yes, *because* of the discovery part. You did discovery with the customer *inside an actual operating theatre*, observed the real workflow, then tailored the UX and integration step by step around it, proved it in one theatre and rolled it out to the rest in a mission-critical healthcare setting. That is the full PM loop — discovery → user-driven requirements → iterative UX → phased delivery → stakeholder trust in a regulated, high-stakes environment — on a shipped product, not a proof-of-concept. Almost nothing else on your projects page has that combination of real customer discovery, shipped mission-critical delivery, and a clear product outcome.

By contrast the AstraZeneca card adds almost nothing: it's deliberately high-level ("no confidential customer detail is published"), has no images, no metrics, no discovery, no outcome — just a one-line "integration and delivery in a pharma environment." Next to S:t Eriks, Digital Realty and KTH Living Lab, it reads as filler and slightly weakens the page by making the stronger cards share space with a placeholder. Removing it tightens the narrative.

## What I noticed in the current state

- `S:t Eriks` is `flagship: false` and `priority: 7` — it sits below five flagship projects and after Multi-Agent AI, even though it's the most concrete PM story you have. For a recruiter skimming the Projects page, it's buried.
- `AstraZeneca` is `priority: 12` (last), `flagship: false`, two vague sections, no images, no metrics.
- `AstraZeneca` is also referenced in `src/content/timeline.ts` (line 327 as a child project of the Senior Technical Advisor role, and line 613 as a role-meta block). Removing the project cleanly means removing both references so nothing links to a missing slug.

## The plan

### 1. Elevate S:t Eriks to flagship and raise its priority
In `src/content/projects.ts`, change the S:t Eriks entry:
- `priority: 7` → `priority: 3` (so it appears with the other flagship stories, right behind the AI flagships)
- `flagship: false` → `flagship: true`

This puts it among Talking Systems (1), Talking SCADA (2) and Wind Power Forecasting — i.e. the AI flagships plus your strongest shipped-PM story, instead of after KTH Living Lab and Multi-Agent AI.

### 2. Remove the AstraZeneca project card
In `src/content/projects.ts`, delete the whole `astrazeneca` object (lines ~1132–1159).

### 3. Remove AstraZeneca references from the timeline
In `src/content/timeline.ts`:
- Delete the child entry `{ kind: "project", slug: "astrazeneca", period: "2020–2023", datePrecision: "verified-range" }` (line 327).
- Delete the `astrazeneca: { ... }` role-meta block (lines 613–616).

The Senior Technical Advisor role card keeps KTH Living Lab, Digital Realty ST06 and S:t Eriks as its selected work — all three are strong, mission-critical/regulated stories, so the role still has solid breadth without AstraZeneca.

### 4. Leave the S:t Eriks content as-is
The case-study text and images already tell the PM discovery story well (job-to-be-done, discovery & iterative UX, what was integrated, architecture, the interface, outcome). No rewrite needed — only its prominence changes.

## What this does for your positioning
The Projects page now leads with your AI flagships (Talking Systems, Talking SCADA, Wind Power Forecasting) and immediately follows with S:t Eriks as a shipped, mission-critical PM story built on real customer discovery. The thin placeholder is gone, so every card on the page carries real evidence.

## Verify
- `npx tsgo --noEmit` passes (no dangling `astrazeneca` slug references).
- `/projects` and `/journey` load with HTTP 200.
- Production build succeeds.

## Note
If you'd rather keep a regulated-industry breadth signal without the vague placeholder, tell me and I'll slim AstraZeneca to a single honest line under the Senior Technical Advisor role instead of removing it. But my recommendation is to remove it.
