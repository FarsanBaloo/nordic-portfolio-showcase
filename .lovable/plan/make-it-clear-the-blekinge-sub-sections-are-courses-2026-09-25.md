# Make it clear the Blekinge sub-sections are courses

## Current state (verified)
On `/education`, the Blekinge Institute of Technology card is rendered as **one** `<article>` with:
- Eyebrow: "Aug 2025 – Jun 2026"
- Institution: "Blekinge Institute of Technology"
- Formal title: "Advanced-Level Specialisation in Industrial Economics, Product & Requirements Management"
- A `groups` array of five sub-sections, each shown as an `<h4>` heading + tag list + bullets:
  1. Strategy and Business Models in Technology-Intensive Businesses
  2. Product Management
  3. Product and Requirements Management for Digital Environments
  4. Agile Process and Project Management
  5. Leadership in High-Technology and Knowledge-Intensive Organizations

**Problem (confirmed by screenshot):** nothing on the card says these five headings are individual university courses. The card reads as one specialization broken into themes. The word "Course" only appears in the "Course project — Talking SCADA" callout box. A recruiter scanning the page cannot tell whether "Product Management" is a course, a topic, or a skill area.

## Change (small, no redesign)
Make each of the five sub-sections read unambiguously as a course.

- In `src/routes/education.tsx`, where `entry.groups` is rendered, add a small "Course" label/eyebrow above each group title (same mono uppercase style already used for eyebrows), so each block reads:
  ```
  COURSE
  Strategy and Business Models in Technology-Intensive Businesses
  ```
- Keep the existing group title, tag list and bullets unchanged.
- No changes to `education.ts` content, no new data, no redesign, no text rewriting.

## Why this works
- The five headings already look like course titles; a one-word "Course" label removes the ambiguity without rewording anything.
- Stays within the existing visual language (mono uppercase eyebrows already used on the page).

## Out of scope
- No changes to other cards (Linköping, Umeå, Mälardalen, Skövde) — those already show a formalTitle that reads as a single course/study.
- No content edits, no CV/sync, no publishing.
