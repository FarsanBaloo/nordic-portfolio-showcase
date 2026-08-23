# Education — universities, formal titles and phase structure

Make universities and formal study titles the visible backbone of the academic story, on both the Journey timeline and the Education page. No invented dates: only the periods already stored (Aug 2025 – Jul 2026 overall, Skövde Aug 2025 – Jan 2026, BTH Aug 2025 – Jun 2026, LiU Aug 2025 – Jan 2026, UmU Jan 2026 – Jun 2026).

## 1. Academic card hierarchy

Every academic card renders in this order:

```text
PHASE / PERIOD
UNIVERSITY NAME
Formal programme / study title
short description
focus areas
related project / case
```

Typography: university 13–14px IBM Plex Sans, weight 500, ~#B6C1C9; formal title 17–19px Sora, weight 600, #F5F7F9; description 15–16px IBM Plex Sans, #D2DAE1. University names are clearly readable but stay secondary to the title. No logos, no hotlinked images.

## 2. Postgraduate structure (Journey timeline)

Parent card stays "Aug 2025 – Jul 2026 · Advanced AI · Innovation · Product Development", presented as a coordinated development period across several universities, not one programme.

Children regroup into three groups:

- **Phase 1 — Aug 2025 – Jan 2026 · Advanced AI Foundation**
  - Linköping University — "Advanced-Level Studies in Artificial Intelligence: Natural Language Processing". Description as specified (transformers, domain adaptation, sentiment classification, PyTorch, PEFT/LoRA). Focus: Transformers · Domain Adaptation · PEFT / LoRA. Product relevance line about evaluating model adaptation, limitations and feasibility.
  - Umeå University — "Advanced-Level Studies in Artificial Intelligence: Autonomous Systems & Perception". Two-paragraph description as specified. Focus: Multi-Sensor Fusion · 3D Perception · Prediction · Planning · Reinforcement Learning. Product relevance about uncertainty, data quality, sensor limits, real-time decisions and safety.
- **Bridge — Aug 2025 – Jan 2026 · Innovation Management**
  - University of Skövde — "Advanced-Level Studies in Innovation Management", shown as a bridge from Phase 1 into Phase 2 (kept in its verified period, not moved into Phase 2). Description: strategic innovation, applied innovation processes, implementation, innovation leadership.
  - Talking SCADA — Concept Origin text, followed by the small vertical chain: Advanced AI → Innovation Opportunity → Talking SCADA initial concept → Product / Requirements development.
- **Phase 2 — Jan 2026 – Jun 2026 · Product · Industrial Economics · Requirements**
  - Phase intro: how customer needs and technology opportunities become viable products, requirements, business models and sustainable value.
  - Blekinge Institute of Technology shown **once** as parent, with the full title "Advanced-Level Specialization in Industrial Economics, Product & Requirements Management" and the full programme summary. The four capability blocks (Product & Portfolio, Requirements & Delivery, Business & Strategy, Leadership) sit beneath it without repeating the university name on each.
  - Capability blocks carry the visible lists from the brief plus expanded detail shown in the expanded/evidence layer.

Talking SCADA stays a single continuous product case card linking Skövde concept origin to the BTH product/requirements case, with the full progression chain (Product Discovery → Requirements → Prioritisation → MVP → Product Strategy → Business Model → Go-to-Market).

## 3. BSc parent

Timeline heading may stay "Computer Science / Intelligent Systems", but directly underneath it shows:

- Mälardalen University
- "Degree of Bachelor of Science in Computer Science with Specialization in Intelligent Systems"
- secondary descriptor "B.Sc. in Computer Science · Applied Artificial Intelligence"

## 4. Education page

`/education` mirrors the same hierarchy: BSc parent with full degree title, then Phase 1 / Bridge / Phase 2 headings, university-led cards with formal titles, focus tags, product relevance and the Talking SCADA case shown once per context.

## Technical notes

- `src/content/timeline.ts`: extend the child model with an optional `university`, `formalTitle`, `relevance` and `chain` field; regroup postgraduate children into "Phase 1 · Advanced AI Foundation", "Bridge · Innovation Management", "Phase 2 · Product, Industrial Economics & Requirements"; add a BTH programme parent child so the four capability blocks no longer repeat the university; add university/formal-title fields to the BSc milestone.
- `src/components/Timeline.tsx`: update the course/topics child renderer to the university → formal title → description → focus → relevance hierarchy, render group headings as phase markers, render the small arrow chain for Talking SCADA, and add the BSc formal-title line to the milestone header.
- `src/content/education.ts` and `src/routes/education.tsx`: same restructure for the standalone page.
- `src/styles.css`: only if a new text token is needed for the university line (~#B6C1C9).
- Verify at ~390px, ~900px and ~1440px.
