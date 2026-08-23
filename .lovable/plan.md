# Education / advanced development update in the Journey timeline

Scope is limited to the two academic milestones on `/journey` (BSc and the postgraduate period) plus the matching content on `/education`. Professional roles, hero, About, contact, navigation, evidence sheet, aurora and the motion system stay exactly as they are.

## 1. BSc — Mälardalen University

Keep the parent card and its side placement. Add compact course cards in a new first group, above Interaction Design:

**SELECTED AI & SOFTWARE ENGINEERING COURSEWORK**
- Artificial Intelligence 1 — AI Methods · Problem Solving · Intelligent Systems
- Artificial Intelligence 2 — Advanced AI Methods · Reasoning · Applied AI
- Advanced Machine Learning — Machine Learning · Modelling · Evaluation
- Deep Learning — Neural Networks · Model Training · Applied Deep Learning
- Software Engineering for AI — AI System Development · Technical Feasibility · AI Lifecycle

Each card shows the eyebrow `COURSE`, the formal course title, `Mälardalen University`, and 2–4 relevance signals. No dates, no academic level, no long descriptions.

Existing groups stay untouched and separate, in this order after the coursework group: **INTERACTION DESIGN** (PLANE(ra)T, Hållbar Hälsa, Seeing AI), **APPLIED AI** (Talking Systems), **BACHELOR THESIS** (48-Hour Wind Power Forecasting).

## 2. Phase 1 — four advanced AI areas

Group heading stays `PHASE 1 · AUG 2025 – JAN 2026 · ADVANCED AI FOUNDATION`, parent side unchanged, course cards on the opposite side as today.

- Linköping University — Advanced-Level Studies in Artificial Intelligence: Natural Language Processing. Signals: NLP, Transformers, Domain Adaptation, PEFT / LoRA, Generative AI / Language Models.
- Umeå University — Advanced-Level Studies in Artificial Intelligence: Autonomous Systems & Perception. Signals: Multi-Sensor Fusion, 3D Perception, LiDAR, Prediction, Planning, Reinforcement Learning.
- Mälardalen University — Predictive Data Analytics · Second cycle · Completed Nov 2025. Signals: Predictive Analytics, Machine Learning, Prediction, Decision Support.
- Mälardalen University — Deep Learning for Industrial Imaging · Second cycle · Completed Dec 2025. Signals: Deep Learning, Computer Vision, Industrial Imaging, Industrial AI.

The two Mälardalen courses move out of the "other studies" list on `/education` into Phase 1. Deep Learning (BSc) and Deep Learning for Industrial Imaging stay separate cards.

A short Phase 1 capability strip beneath the heading conveys the four themes: Language AI · Predictive AI · Perception & Intelligent Systems · Industrial Deep Learning.

## 3. Bridge — University of Skövde

Unchanged period and content: `BRIDGE · AUG 2025 – JAN 2026 · INNOVATION MANAGEMENT`, Advanced-Level Studies in Innovation Management, keeping the Talking SCADA concept-origin link (Innovation Opportunity → Problem Framing → Initial Product Concept).

## 4. Phase 2 — BTH

Heading: `PHASE 2 · JAN 2026 – JUN 2026 · PRODUCT · INDUSTRIAL ECONOMICS · REQUIREMENTS · DELIVERY`, described as a capability phase; the BTH parent card keeps its own verified span Aug 2025 – Jun 2026.

Parent card: Blekinge Institute of Technology — Advanced-Level Specialization in Industrial Economics, Product & Requirements Management, with a short framing paragraph only.

The invented blocks (Product & Portfolio, Requirements & Delivery, Business & Strategy, Leadership, Portfolio Strategy) are removed and replaced by six individual course cards using the real names:

1. Industrial Economics and Management
2. Strategy and Business Models in Technology-Intensive Businesses
3. Product Management
4. Product and Requirements Management for Digital Environments
5. Agile Process and Project Management
6. Leadership in High-Technology and Knowledge-Intensive Organizations

Each carries its own concise Talking SCADA contribution line, per the connections given (product discovery/vision/MVP; PRD and requirements incl. explainability and reliability; business value and sustainable value; product strategy, business model, market relevance, go-to-market; iterative refinement, MVP planning, governance; stakeholder alignment and communication — no people-management claim).

## 5. Talking SCADA as one continuous parallel case

A single case track, never duplicated, placed alongside the Phase 1 → Bridge → Phase 2 courses rather than after them:

```text
CONTINUOUS PRODUCT CASE
Talking SCADA — From Innovation Concept to AI-Enabled Product Case
Academic Project — Product Management & AI Concept Development
Blekinge Institute of Technology · Aug 2025 – May 2026
```

Vertical stage progression: Innovation Opportunity → Initial Concept → AI / Language Interaction Feasibility → Product Discovery → Product Vision → Value Proposition → Stakeholder Analysis → PRD & Requirements → Prioritisation → Conceptual MVP → Validation Approach → Product Strategy → Business Model → Market Relevance → Go-to-Market → Technical Feasibility → Adoption Considerations.

A Phase 1 link line states that the AI studies strengthened the technical understanding behind the language-based interaction and AI feasibility considerations — no claim of implemented PEFT/LoRA or a fine-tuned production model.

## 6. Desktop layout for the study block

On wide screens (≥1280px) the academic child column splits into two sub-columns: formal course cards on the inner side, the Talking SCADA case track on the outer side, sticky so it stays visible while the courses scroll past, with the existing hairline connectors linking course cards to the shared track. Below 1280px it degrades to the current single stacked column with Talking SCADA after the Phase 2 courses. No change to the central spine or the professional tracks.

## Technical notes

- `src/content/timeline.ts`: add optional `level`, `signals` and `variant: "compact"` fields on the course child type; add the five BSc course children in a new group; add two Mälardalen second-cycle courses to Phase 1; replace the four invented Phase 2 blocks with six real BTH course children each with a `scadaLink`; extend the Talking SCADA child with the full stage chain and formal context.
- `src/components/Timeline.tsx`: add a compact variant to `StudyChildCard`; render `signals`, `level` and `scadaLink`; in `ChildColumn`, when a milestone has a continuous case child, render the two-sub-column sticky layout at `xl` and keep today's stacked flow below it. Existing focus/scale motion and `ChildShell` are reused unchanged.
- `src/content/education.ts` / `src/routes/education.tsx`: mirror the same groups, course names and Talking SCADA structure; drop `otherStudies` in favour of the Phase 1 cards.
- Verify at ~390px, ~900px, ~1440px and ~1680px.
