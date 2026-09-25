# Plan: Remove the "Industrial Economics and Management" course card

## Problem

A standalone card titled **"Industrial Economics and Management"** (Blekinge Institute of Technology) appears as if it were a separate course, with signals "Business Value", "Technology / Business Perspective", "Sustainable Value" and application items "Connected technology choices with business value and sustainable value creation." / "Used Talking SCADA to consider value for building users alongside the organisation's ability to deliver and sustain the proposed service."

Industrial Economics and Management is the **name of the specialisation**, not a course you took. The card is inaccurate and should be removed. The same subject is also rendered as a group card inside the BTH entry on the /education page.

## What changes

Two card removals, plus cleanup of the now-unused application items. No other content, no redesign.

### 1. Timeline — `src/content/timeline.ts` (lines 447–456)

Delete the entire course object:

```text
{
  kind: "course",
  title: "Industrial Economics and Management",
  university: "Blekinge Institute of Technology",
  variant: "compact",
  topics: [],
  signals: ["Business Value", "Technology / Business Perspective", "Sustainable Value"],
  applicationItems: courseApplications.industrialEconomics,
  group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
},
```

The remaining BTH course cards (Strategy and Business Models, Product Management, Product and Requirements Management, Agile Process and Project Management, Leadership) stay unchanged.

### 2. Education page — `src/content/education.ts` (lines 94–99)

Delete the "Industrial Economics and Management" group from the BTH entry's `groups` array:

```text
{
  title: "Industrial Economics and Management",
  items: ["Business value", "Technology and business perspective", "Sustainable value"],
  applicationItems: courseApplications.industrialEconomics,
},
```

The other five groups in the BTH entry stay unchanged.

**The specialisation itself stays correctly lifted** — it is not a course, so it should not appear as a course card. It remains visible through:

- `formalTitle`: "Advanced-Level Specialization in Industrial Economics, Product & Requirements Management"
- `subtitle`: "Product · Requirements · Strategy · Leadership"
- `phase`: "Phase 2 · Product · Industrial Economics · Requirements · Delivery"
- `body2`: names "Industrial Economics and Management" as one of the specialisation's covered areas, alongside Strategy and Business Models, Product Management, Product and Requirements Management, Agile Process and Project Management, and Leadership.

These describe the specialisation as a whole and are unchanged.

### 3. Cleanup — `src/content/course-applications.ts` (lines 42–45)

Remove the now-unused `industrialEconomics` array, since no remaining card references it after steps 1 and 2.

## What stays unchanged

- `profile.ts` mentions of the specialisation "Industrial Economics and Management at Blekinge Institute of Technology" (About and Journey) — these describe the specialisation you pursued, not a course.
- `education.ts` `body2` listing the specialisation's covered areas.
- `projects.ts` reference to "specialisation in Industrial Economics and Management at Blekinge Institute of Technology".
- The timeline group label "Phase 2 · Product · Industrial Economics · Requirements · Delivery" on the remaining BTH course cards.
- All other cards, groups, courses and content.

## Verification

1. Build OK (`/tmp/observability/build-errors.log`)
2. Playwright desktop 1280×1800 + mobile 390×844 on `/` and `/education` — no "Industrial Economics and Management" course card renders, no overflow, no console errors
3. Confirm the BTH entry's other five group cards still render on /education
4. Confirm the remaining BTH course cards still render on the timeline
