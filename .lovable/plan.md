# Plan: Make the technology-to-product-strategy pivot explicit

## Problem

In the Journey narrative (paragraph 3) and in `aboutParagraphs`, the BTH specialisation in Industrial Economics and Management is described as something done "to connect that technical understanding with product strategy and viable business models" — but it doesn't explicitly frame this as a **deliberate shift from technology toward product, strategy and business**, combining 20+ years of domain experience toward the target roles (AI Product Manager, Product Manager, Product Owner, Offer Manager). A recruiter reading the Journey doesn't see the pivot as a conscious career move.

## What changes

Two text edits in `src/content/profile.ts` — no other files, no redesign.

### 1. Journey paragraph 3 (line 140)

**Current:**
> Curiosity about what AI could realistically make possible — and a drive to connect that with real societal challenges — is what brought me back to study. In 2023, I began a B.Sc. in Computer Science with a specialisation in Intelligent Systems at Mälardalen University, then continued with advanced AI studies. I pursued a specialisation in Industrial Economics and Management at Blekinge Institute of Technology to connect that technical understanding with product strategy and viable business models.

**Proposed:**
> Curiosity about what AI could realistically make possible — and a drive to connect that with real societal challenges — is what brought me back to study. In 2023, I began a B.Sc. in Computer Science with a specialisation in Intelligent Systems at Mälardalen University, then continued with advanced AI studies. To shift from technology toward product, strategy and business, I pursued a specialisation in Industrial Economics and Management at Blekinge Institute of Technology — combining 20+ years of domain experience with product management, requirements, value-driven design, innovation and leadership to move toward product and offer management.

Key additions: "To shift from technology toward product, strategy and business" makes the pivot explicit. "combining 20+ years of domain experience" ties it to the career. "to move toward product and offer management" names the goal.

### 2. aboutParagraphs line 73

**Current last sentence:**
> My motivation was to connect societal challenges and user needs with technology, product decisions and viable business models.

**Proposed:**
> My motivation was to shift from technology toward product, strategy and business — connecting societal challenges and user needs with product decisions, viable business models and 20+ years of domain experience to move toward product and offer management.

## What stays unchanged

- `lead`, `overlap`, `emphasis`, `journeyIntro`
- All other Journey paragraphs (1, 2, 4, 5)
- `heroProof`, `summary`, `whatIBring`, `howIWork`, `careerLens`
- No measurable results claimed; formal job titles unchanged; no redesign

## Verification

1. Build OK
2. Playwright desktop + mobile on `/` — one H1, no overflow, no console errors
3. Verify "shift from technology toward product" appears in rendered text
4. Verify paragraph order unchanged
