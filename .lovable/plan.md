# Make the three evidence points read natural and lift, not repetitive

## Assessment
- **Point 1 (Applied AI & Computer Science)** — strong, concrete. Keep unchanged.
- **Point 2 (Advanced Postgraduate AI Studies)** — label says "Advanced Postgraduate" and body starts "Advanced postgraduate studies"; both words repeat label→body, so the line doubles back. Fix by keeping "Advanced" in the body only.
- **Point 3 (Postgraduate Industrial Economics & Management)** — the body is a bare comma list of module names with no lead-in, so it reads like a syllabus dump. Keep every module name verbatim, but add a short lead-in so it flows as one line.

## Target text (verbatim module names preserved)

1. Applied AI & Computer Science — B.Sc. Computer Science (Intelligent Systems) with applied work in RAG, forecasting and agentic AI.  *(unchanged)*

2. Postgraduate AI Studies — Advanced studies in Natural Language Processing, Predictive Data Analytics, Computer Vision and Autonomous Systems.

3. Postgraduate Industrial Economics & Management — Studies spanning Product Management, Product & Requirements Management, value-driven design, Strategy & Business Models, Innovation Management, Agile Process & Project Management, Product & Portfolio Strategy and Leadership.

## Edits
- `src/content/profile.ts`, heroProof[2]: label `"Advanced Postgraduate AI Studies"` → `"Postgraduate AI Studies"`; body `"Advanced postgraduate studies in Natural Language Processing, Predictive Data Analytics, Computer Vision and Autonomous Systems."` → `"Advanced studies in Natural Language Processing, Predictive Data Analytics, Computer Vision and Autonomous Systems."`
- `src/content/profile.ts`, heroProof[4]: body prepend `"Studies spanning "` before the existing verbatim module list. Label unchanged.

## Verification
- `npx tsgo --noEmit`
- Build log shows `build OK`
- Playwright on localhost:8080 (desktop 1280px + mobile 390px) — homepage shows the three points with no repeated word label→body and no overflow.

## Not touched
- Story/About text, Talking SCADA, courses, no redesign, no new dependencies, no publishing.
