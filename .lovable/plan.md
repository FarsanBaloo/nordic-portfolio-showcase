# Content refinement: product-management story, with Talking SCADA rebuilt

No redesign. Same layout, navigation, typography, colours, page structure, employers, titles, dates and technical facts. All changes are text content plus a few small presentational blocks reusing the existing design system.

## 1. Home page

- Keep "From control cabinets to AI products" and the four-stage progression as-is.
- Replace the closing emphasis paragraph with the supplied closing text, keeping the final sentence about solutions being shaped together word for word.
- Replace the four capability-lens cards with: Customer & Business (Customer Discovery, Jobs to Be Done, Problem Validation, Business Value); Product & Strategy (Product Vision, Requirements / PRD, Prioritisation, Product Strategy); Lifecycle & Collaboration (Product Feedback, Roadmap Input, Release Readiness, Stakeholder Alignment); Technology & Human-Centred AI (Technical Feasibility, Architecture, Applied AI, User Validation). "Roadmap Input", never ownership.
- Replace the product philosophy text with the supplied version (used on both Home and About, which share the same source).
- Add the supplied "Product & AI direction" sentence as one short line in the existing hero/bridge area, replacing the current bridge line rather than adding length.

## 2. Talking SCADA — the main change

Rebuilt as a product case that leads with the problem, not the technology. Subtitle becomes "Academic AI Product Concept". Exploratory language throughout ("explores", "could", "concept", "product question"). No claim of a deployed or commercial system, no employer link.

New order on the case page:

1. Pitch: "Today, buildings generate data. Tomorrow, buildings should explain themselves." shown as the prominent highlight line, with the one-sentence explanation directly under it.
2. Why — buildings, energy share, interconnected systems, and the key line "The problem is not always a lack of data. The problem is understanding what the data means."
3. Whom — operators, facility managers, energy managers, technical teams, with varying depth of HVAC/BMS expertise and scarce specialist diagnostic knowledge.
4. Pain — "I can see that something changed, but I do not know why", with the supplied supporting sentence. No invented investigation times.
5. Job to be done — the supplied JTBD sentence in a callout.
6. Product question — "What if the building could explain why it is consuming more energy now than at the same time last year?" as its own standalone element.
7. What — the explanation and decision-support layer; movement from what changed → why did it change → where should I investigate.
8. Gain — the six intended gains, framed as "The concept aims to support". No savings, ROI or metrics.
9. Value proposition — "From building data to building understanding." Data → context → understanding → better investigation.
10. Product vision — buildings that explain behaviour; not replacing domain experts; AI explains evidence and relationships rather than returning an unexplained answer.
11. Why AI — framed as a feasibility question after the problem, with the supplied AI question.
12. Product management work — the existing Skövde/BTH material kept, presented as the structured progression from opportunity through discovery, vision, value proposition, feasibility, definition, PRD, prioritisation, MVP, validation thinking, strategy, business model, market relevance, go-to-market and adoption.
13. Product leadership perspective — the supplied compact paragraph.
14. Product relevance — the supplied two statements ("not another dashboard or chatbot").
15. Visual story sequence, using the existing flow-steps element: Energy deviation → What changed? → Cross-system context → Why did it change? → Evidence-based explanation → Where should I investigate?
16. Academic context note at the bottom: "Academic AI product case based on general industry and domain knowledge. It does not disclose confidential customer or employer information."

Tags updated to product-first wording (Product Vision, Jobs to Be Done, Problem Validation, PRD, MVP, Product Strategy, Business Model, Go-to-Market, SCADA, BMS, Applied AI). The existing concept illustration and its "illustration, not a screenshot" note stay.

## 3. Talking Systems

Keep all technical evidence (RAG, OPC UA, Siemens S7, edge/local LLM, testbed validation). Reorder so the case opens with the dependency-on-specialists problem and the discovery question "How can we reduce dependency on specialists when something goes wrong?", followed by the product hypothesis, then the technical work. Add a compact "What this demonstrates" list with the five supplied points.

## 4. Roles (timeline and experience text only — titles, employers and dates unchanged)

- Senior Technical Advisor: use the supplied summary sentences; ensure tags include Customer Discovery, Requirements, Product / Solution Options, Technical-Commercial Trade-offs, Stakeholder Alignment, Technical Leadership.
- Support Engineer / National Technical Expert: use the supplied introductory description; tags Customer Insight, Product Feedback, Prioritisation, Product Lifecycle, Release Readiness, Cross-Functional Collaboration. No roadmap ownership.
- Project Engineer: use the supplied introductory sentence; the role stays technical and delivery-focused.

## 5. Other projects — one short "product relevance" line each, no restructuring

- S:t Eriks: add the discovery-to-rollout sequence as a flow element and the supplied product-relevance paragraph. Still not labelled a Product Manager project.
- HVAC deviation-management: keep the word "capability"; add the supplied product-relevance line.
- Multi-Agent AI: surface the supplied product question and product-relevance line; no new buzzwords.
- Wind power forecasting: add the supplied product-relevance line only; all figures untouched.
- KTH Live-in Lab: add the supplied collaboration-relevance line.
- Digital Realty ST06: add the supplied leadership-relevance line.
- UX projects (PLANE(ra)T, Hållbar Hälsa, Seeing AI): unchanged.

## 6. About page

- Rename "Team Spirit & People" to "Collaboration & Influence" with the supplied text.
- Product capability card updated to the supplied list (including Requirements / PRD, Roadmap Input, Release & Adoption Readiness). Nothing about roadmap/P&L/pricing/OKR ownership or market sizing.
- Add a compact "How I work" section after "What I bring": five numbered principles with the supplied wording, using the existing card grid. No bars, ratings or percentages.

## 7. Projects page

Keep the existing intro thread. Keep the professional vs academic distinction clear; academic cases carry their academic framing in the subtitle so the distinction reads at a glance.

## Technical notes

Content lives in `src/content/projects.ts`, `profile.ts`, `experience.ts`, `timeline.ts`, `capabilities.ts`, with rendering in `src/routes/index.tsx`, `about.tsx` and `projects.$slug.tsx`. Talking SCADA needs a few optional presentational fields on the project type (a prominent pitch line, a value tagline and a closing note) rendered with the existing `Callout`, `FlowSteps`, `Eyebrow` and tag components — no new visual language, no new dependencies. Verification: typecheck, build, and a check of Home, About, Projects, Talking SCADA and Talking Systems at desktop and mobile widths.
