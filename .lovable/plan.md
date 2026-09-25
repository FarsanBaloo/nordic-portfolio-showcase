# Plan: Condense the Journey narrative

## Problem

The Journey section on the homepage currently has **847 words** across 10 paragraphs plus intro, lead, overlap and emphasis. A recruiter scanning the homepage sees a wall of text before reaching the timeline. The `aboutParagraphs` on /about cover the same story in 306 words / 5 paragraphs — the Journey is nearly 3x longer for the same narrative.

## Goal

Halve the Journey narrative to ~5 paragraphs (~350 words in paragraphs, ~500 total) so a recruiter quickly understands: who you are, your unique domain breadth, your drive, and how it connects to your target roles (AI Product Manager, Product Manager, Product Owner, Offer Manager). Preserve the customer-first thread, domain knowledge visibility, study motivation, Talking SCADA as connecting case, and the Nordic role after studies.

## What changes

Only `journeyNarrative.paragraphs` and `journeyNarrative.emphasis` in `src/content/profile.ts`. No other file, no redesign, no structural change.

## Condensation map (10 paragraphs → 5)

| New | Source paras | Content | Target words |
|-----|-------------|---------|-------------|
| 1 | 1+2 | Project Engineer origin + national expert widening — customer-facing start, requirements to commissioning, the lesson; then platform faults, workarounds, adapting support | ~75 |
| 2 | 3+4+5 | Product feedback + Senior Technical Advisor — enhancement proposals, HVAC product; discovery, solution proposals, trade-offs, informal technical lead | ~80 |
| 3 | 6+7 | Studies + motivation — curiosity and societal drive; B.Sc. Intelligent Systems; BTH Industrial Economics and Management connecting technical understanding with product strategy and business models | ~65 |
| 4 | 8 (tightened) | Talking SCADA — shorter SCADA explanation, multi-agent concept, plain-language energy waste, connecting customer and business value | ~65 |
| 5 | 9+10 | Nordic role after studies + direction — after postgraduate studies stepped into Nordic role; EcoStruxure Building Operation, R&D prioritisation, mentoring; developing toward Product & Offer Management | ~65 |

**emphasis**: tightened from 90 → ~55 words, keeping the "I start with the customer's problem" punchline and the cross-discipline collaboration point, removing repetition with `productPhilosophy`.

**Kept unchanged**: `lead`, `overlap`, `journeyIntro`, `careerLens`, `productPhilosophy`, `heroProof`, `aboutParagraphs`, `whatIBring`, `howIWork` — all untouched.

## What to preserve in each merged paragraph

- **Domain keywords** visible to a scanner: BMS/HVAC, SCADA, IoT/IIoT, energy, mission-critical, EcoStruxure Building Operation, edge controllers, EcoXpert
- **Target-role signals**: customer discovery, product feedback, prioritisation, requirements, product strategy, business models, lifecycle, R&D collaboration, mentoring
- **Drive/motivation**: curiosity, societal challenges, customer-first, human judgement central
- **Chronology**: Project Engineer → national expert → Senior TA → studies → Talking SCADA → Nordic role after studies
- **No measurable results claimed** (intended gains, not outcomes)
- **Formal job titles unchanged** (Project Engineer, Support Engineer/national expert, Senior Technical Advisor, Nordic Technical Support Expert)

## Verification

1. Build OK
2. Playwright desktop 1280×1800 + mobile 390×844 on `/` — one H1, no overflow, no console errors
3. Verify paragraph order: studies before Talking SCADA before Nordic role
4. Verify domain keywords still present in rendered text
5. Verify `emphasis` still reads naturally as the closing punchline
