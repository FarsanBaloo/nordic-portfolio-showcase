# Plan: Bind ihop "varför jag studerade vidare" i Journey

## What changes
One targeted edit to a single paragraph in `src/content/profile.ts` (line 141) — the "shift from technology toward product, strategy and business" paragraph inside `journeyNarrative.paragraphs`.

## Current text (line 141)
> To shift from technology toward product, strategy and business, I pursued a specialisation in Industrial Economics and Management at Blekinge Institute of Technology — combining 20+ years of domain experience with product management, requirements, value-driven design, innovation and leadership to move toward product and offer management.

## Problem
The paragraph states *what* (pursued the specialisation) but not *why*. The reader doesn't feel the motivation: that the whole career has been about creating products and services in different ways, and that the goal now is to move closer to the customer, shape solutions from real problems, and create customer and business value using the full range of domain knowledge.

## Proposed text (line 141)
> To shift from technology toward product, strategy and business, I pursued a specialisation in Industrial Economics and Management at Blekinge Institute of Technology. My whole career has been about creating products and services in different ways — now I wanted to move closer to the customer, shape solutions from real problems, and create customer and business value with the full range of my domain knowledge. Combining 20+ years of that experience with product management, requirements, value-driven design, innovation and leadership moved me toward product and offer management.

## Why this works
- Opens with the *why* (whole career creating products/services; now closer to customer, solution-first, value creation) before the *what* (specialisation + skills).
- Keeps "Industrial Economics and Management" and "Blekinge Institute of Technology" named, so the specialisation stays correctly lifted.
- Keeps the existing PM-vocabulary: product management, requirements, value-driven design, innovation, leadership, product and offer management.
- Adds the customer/problem-first thread that matches the emphasis paragraph and the user's PM positioning.
- Stays one paragraph, ~70 words — modest growth from ~45, still compact.

## Scope guardrails
- Edit only line 141 of `src/content/profile.ts`.
- No other paragraphs, no lead/overlap/emphasis, no About/CV/timeline, no redesign.
- Preserve: lead, overlap, journeyIntro, careerLens, productPhilosophy, heroProof, aboutParagraphs, whatIBring, howIWork.
- Do not claim a formal PM title; this is direction/motivation, not an attained role.
- No publishing.

## Verify
- Build OK.
- Playwright on `/` desktop 1280×1800 and mobile 390×844: one H1, no overflow, no console/page errors, paragraph present and in correct chronological position (after studies, before Talking SCADA).
