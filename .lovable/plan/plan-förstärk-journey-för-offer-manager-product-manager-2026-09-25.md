# Plan: Förstärk Journey för Offer Manager & Product Manager

## Bedömning — vad journey gör bra idag

Journey-berättelsen har en stark röd tråd: kundproblem först → leveransnära teknik → discovery & lösningsformning → studier (AI + industriell ekonomi/management) → Talking SCADA → Nordic-roll → riktning mot Product & Offer Management. Den lyfter tydligt:

- Kundcentrerat "job to be done"-tänk och problem-först-princip
- Discovery, solution proposals, trade-offs (feasibility/lifecycle/cost/commercial)
- "Viable to sell, build and support" — stark Offer Manager-signal
- AI-studier och Industriell ekonomi/management med strategy & business models
- Nordic-rolens marknadsinsikt och R&D-prioritering

## Luckor mot experience och målrollerna (Offer Manager / Product Manager)

1. **Support Engineer-rollens produkt- och lifecycle-kunskap är nästan osynlig.** I experience finns: product lifecycle, release validation, capability ownership (HVAC deviation-management), usability-improvement input, structured product feedback och enhancement proposals. Journey nämner bara "structured product feedback... prioritised critical defects and validated releases" i en halv mening. För PM/OM är lifecycle, release readiness och capability ownership viktiga — de bör synas.

2. **KTH Live-In Lab / open innovation saknas helt i journey.** Det är en stark signal för PM/OM: samarbete med forskare, open innovation-plattform, EcoStruxure-kunskap. Erfarenheten finns i Senior Technical Advisor-rollen men nämns inte i journey.

3. **Nordic-rollen nämner inte "structured product feedback and enhancement proposals" explicit.** Erfarenhetsfilen och CV:t använder den exakta formuleringen; journey säger bara "prioritising Nordic defects and improvements with R&D." Att nämna structured product feedback & enhancement proposals explicit stärker PM-signalkonsistensen.

4. **Offer Manager-vinkel (commercial value, business models, offer/solution selection) är underrepresenterad.** Senior Technical Advisor-stycket har "viable to sell, build and support" men det är den enda explicita OM-signalen i berättelsen. Emphasis-stycket nämner "offer strategy" men utan att koppla till commercial value / business models / go-to-market.

5. **Konsistens: About-rad 72 säger fortfarande "I now support technicians and EcoXpert partners"** — journey tog bort det. Mindre, men värt att synka för enhetlig vinkel.

## Föreslagna ändringar (avgränsade, ingen redesign)

### A. Project Engineer + Support Engineer-stycket (paragraf 1)
Bevara kärnan men lägg kort till Support Engineer-ernas produkt-lifecycle- och capability-ägande, så hela det kundnära produktarvet syns:
- Lägg till: "Owning a reusable capability for detecting and visualising HVAC deviations, I turned operational data into actionable insight — and worked close to product lifecycle, release validation and deployment readiness."

### B. Senior Technical Advisor-stycket (paragraf 2)
Bevara allt. Lägg kort till open innovation / KTH-samarbetet som en mening, så det inte bara finns i experience:
- "I also represented Schneider Electric at KTH Live-In Lab — an open innovation platform — as its EcoStruxure Building Operation contact, supporting researchers with platform expertise for sustainable buildings."

### C. Nordic-stycket (paragraf 6)
Lägg explicit till "structured product feedback and enhancement proposals" så det matchar erfarenhet och CV:
- "...prioritising Nordic defects and improvements with R&D — turning recurring field cases into structured product feedback and enhancement proposals for EcoStruxure Building Operation and its edge controllers."

### D. Emphasis-stycket (paragraf sista)
Lägg en kort Offer Manager-koppling i slutet så commercial value och business models blir explicita:
- Lägg till: "I weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."

### E. Konsistens: About-rad 72
Synka About så den inte säger "support technicians and EcoXpert partners" när journey beskriver mentoring Level 2 — lägg till Level 2 advanced support engineers i About-paragraphen för enhetlig vinkel.

## Tekniska detaljer

- Enda fil som ändras för journey: `src/content/profile.ts` (`journeyNarrative.paragraphs` + ev. `aboutParagraphs`)
- Inga nya bilder, ingen strukturändring, ingen publicering
- Verifiera med build + Playwright desktop/mobil efter implementering

## Öppet för beslut
- Vill du att jag också lägger en explicit "offer/solution selection"-mening i Senior Technical Advisor-stycket, eller räcker "viable to sell, build and support" + ny emphasis-mening?
- Ska About-synket (E) ingå eller ligger det utanför frågan om journey?
