# Plan: Optimera och korta journey paragraf 1

## Analys av nuvarande stycke (~155 ord)

Stycket packar två roller (Project Engineer + Support Engineer/nationell expert) och har tre problem:

1. **Redundans.** "understanding the job to be done" + "what they were really trying to get done" säger samma sak. "job to be done" nämns även i emphasis-stycket och journeyIntro — upprepning.
2. **Två "I turned X into Y"-meningar i rad** (HVAC-satsen och Product Owners-satsen). Båda strukturen + båda rör "recurring field issues" → känns tung.
3. **Fyllnadsfras.** "the constraints facing the teams building and supporting the platform" är underförstådd och kan strykas. "That is where I learned the lesson everything else builds on:" kan smälta in i föregående mening.

### Måste bevaras (domän- och PM/OM-signaler)
- Project Engineer, discovery, job to be done
- requirements, solution design, delivery of digital solutions for building operation and energy optimisation
- "a product is only as good as the day-to-day reality of the people who depend on it"
- national technical expert, digital building platform, edge controllers, recurring faults, workarounds
- HVAC deviation capability, operational data, actionable insight, product lifecycle, release validation, deployment readiness
- structured product feedback, enhancement proposals, Product Owners, R&D, prioritised critical defects, validated releases

## Förslag — kortad version (~125 ord)

> "I began as a Project Engineer, working alongside customers on discovery — understanding the job to be done and what would break if we got it wrong. From requirements and solution design through to delivery of digital solutions for building operation and energy optimisation, I stood next to the customer when it went live — learning the lesson everything else builds on: a product is only as good as the day-to-day reality of the people who depend on it. Later, as Sweden's national technical expert for a digital building platform and its ecosystem of edge controllers, I saw the faults that kept coming back and the workarounds customers relied on. Owning a reusable capability for detecting and visualising HVAC deviations, I turned operational data into actionable insight, working close to product lifecycle, release validation and deployment readiness. With Product Owners and R&D I turned recurring field issues into structured product feedback and enhancement proposals, prioritised critical defects and validated releases."

Ändringar: stryker "what they were really trying to get done" (redundant), smälter in lektion-meningen i leverans-meningen, stryker "the constraints facing the teams building and supporting the platform", kortar "Working with Product Owners and R&D, I turned those recurring field issues" → "With Product Owners and R&D I turned recurring field issues". All domän- och PM/OM-vokabulär bevarad.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, `journeyNarrative.paragraphs[0]`
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
