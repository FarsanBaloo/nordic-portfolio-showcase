# Portfolio rework — accuracy, product positioning, calmer editorial timeline

Reworking the existing site (no rebuild): same React/TypeScript stack, routing, Nordic dark aurora identity, Sora + IBM Plex typography.

## 1. Facts first
- Move AstraZeneca from Support Engineer to Senior Technical Advisor, no invented 2018 date.
- Remove all invented month spans (Digital Realty, KTH, S:t Eriks, Seeing AI, Talking Systems, Multi-Agent AI, PLANE(ra)T, Hållbar Hälsa).
- Keep only verified precision: PLANE(ra)T 2024, Talking Systems 2025, Thesis 2025, BSc "Completed before Aug 2025", postgraduate Aug 2025–Jul 2026, BTH Aug 2025–Jun 2026, Skövde Aug 2025–Jan 2026.
- Professional projects with no confirmed date group under "Selected work during this role".
- Add the overlap statement: professional and academic development ran in parallel, with periods of leave of absence — no invented leave dates.

## 2. Journey becomes the main story
- New editorial intro: eyebrow, heading, centered portrait (150–180px desktop / 120–145px mobile), name, descriptor, then the narrative paragraphs moved out of About.
- Career lens: four compact groups (Customer & Business, Product & Lifecycle, Technology & Delivery, AI & Human-Centred Design) — chips, not big cards.
- Product Philosophy moves from About into Journey, understated.

## 3. Timeline rebuild
- One shared chronology, two tracks: Professional Experience (teal) left, Education · Product · AI Development (violet) right, single spine between them; mobile collapses to one left rail with PROFESSIONAL / DEVELOPMENT labels.
- Remove the interpolated floating year bubble. Keep background rail, animated active rail, small travelling light dot with no label.
- Replace the custom rAF scroll engine with Motion (`useScroll` + `useSpring` + `useTransform`) and IntersectionObserver for milestone states. No scroll-jacking.
- Each role card collapsed: title, employer/period, stage line, one-line summary, three product/offer-relevant evidence bullets, relevance chips.
- "Explore role evidence" expands inline (accordion, `aria-expanded`/`aria-controls`) with the grouped evidence sections from the brief, including the Offer & Product decision flow under Senior Technical Advisor.
- Projects become compact branches inheriting a softer parent-track colour, grouped under their role or study period.

## 4. Project evidence sheet
- Replace the centered modal with a right-side sheet (`ProjectEvidenceSheet.tsx`) reusing the existing case-study body: near-full-screen on mobile, ~30% backdrop instead of 80%, solid readable panel background, 44×44 close button with `aria-label="Close case study"`, Esc close, focus trap and restore.
- Remove the "press Esc or click outside" helper text.
- Per-project "My role" (professional) / "My focus" (academic) written specifically — no generic parent entry.

## 5. Content updates
- Rewrite role, project, education and postgraduate content to the supplied wording: Project Engineer, Support Engineer/National Technical Expert (+ reusable HVAC capability branch), Senior Technical Advisor, BSc track, Interaction Design 2024 (PLANE(ra)T, Hållbar Hälsa, Seeing AI with Microsoft attribution), Talking Systems, Wind Power thesis (verified MAPE table only), postgraduate parent node with NLP / Autonomous Systems / Skövde / BTH groups, Talking SCADA continuity chain, Multi-Agent AI, NOW node.
- Home: remove the duplicated Experience section, keep hero + capabilities + selected projects + contact.
- About: short Profile Summary (three bullets), target roles, four capability groups, languages — no portrait, no repeated narrative.

## 6. Visual and system polish
- Hero portrait crop to scale ~1.05–1.10, reduced teal glow.
- New text tokens (`--night-foreground/body/muted/subtle`) plus `--professional-accent` and `--development-accent`; body text uses `night-body`, not muted grey.
- Aurora: stronger in hero, fading through Journey, calm behind reading areas; metadata letter-spacing down to 0.10–0.12em; content width capped at 1200–1280px.
- Mobile hero gets a soft dark readability veil (gradient, not a card).
- Accessibility: semantic HTML, keyboard nav, visible focus, useful alt text, ~44px touch targets, and `prefers-reduced-motion` disabling aurora movement and slide-ins.

## Technical notes
- Add the `motion` package for scroll animation; refactor `src/content/timeline.ts` to the `TimelineTrack` / `DatePrecision` / `TimelineMilestone` model so unverified dates cannot render as spans.
- Files touched: `src/content/{timeline,projects,experience,education,profile,capabilities}.ts`, `src/components/{Timeline,ProjectModal→ProjectEvidenceSheet,site}.tsx`, `src/routes/{index,journey,about,projects*}.tsx`, `src/styles.css`.

## Open point
The brief references supplied images for PLANE(ra)T, Hållbar Hälsa, Seeing AI and the thesis graph. Only images already in the project will be used; any missing ones are replaced with typographic/SVG process diagrams until you upload them — nothing fabricated.
