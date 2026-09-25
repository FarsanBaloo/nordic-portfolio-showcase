# Plan: Ärlighetsskärpning av collaboration-meningen i emphasis-stycket

## Analys — granskad mot `src/content/experience.ts`

Samarbetsmeningen (line 148) är innehållsligt förankrad i din erfarenhet, inte påhittad:
- **engineering / R&D / sales / support** — alla fyra funktioner finns i dina roller (tekniskt ägandeskap & mentorskap; QA + R&D + enhancement proposals; solution proposals till sales; Level 2-mentorskap & fälttekniker).
- **"shared direction"** — bokstavlig från Senior Technical Advisor-noten: *"aligning internal management, sales and customer stakeholders around a shared direction"*.
- **"as one team"** — bokstavlig från Project Engineer-bulleten: *"succeeding together as one delivery team"*.

Ett ärlighetsproblem: verbet **"bring"** ("I bring cross-functional teams… around a shared direction") antyder formellt samlande/ledning. Din erfarenhet är **informell teknisk ledning genom inflytande** — *"through influence, mentorship and trusted authority rather than formal line management"*. Det ärliga verbet är **"align"**, som också är det ord din egen erfarenhet använder.

## Ändring (en rad, line 148)

**Nuvarande:**
> "I bring cross-functional teams — engineering, R&D, sales and support — around a shared direction, so we move forward as one team rather than in fragments."

**Nytt:**
> "I align cross-functional teams — engineering, R&D, sales and support — around a shared direction, so we move forward as one team rather than in fragments."

En enda ordändring: `bring` → `align`. Innehåll, funktioner och "one team"/"shared direction" bevaras oförändrat — de är förankrade.

## Resten av stycket — ärlighetsgranskad, ingen ändring
- "I start with the customer's problem, not the solution" — förankrat (customer-facing discovery, problem definition).
- "I understand both sides… the teams who build, deliver and support them" — förankrat.
- "hands-on experience with applied AI — RAG, forecasting, agentic systems" — ärligt (byggdes i studierna); dämpas korrekt av *"I know what it can realistically support and where human judgement must stay central"* — visar medvetenhet om gränser, inte överkrav.
- "I listen before defining, validate before committing" — förankrat (discovery, release validation).
- "make trade-offs visible" — förankrat (*"making options and trade-offs explicit"*).
- "weigh customer value, commercial value and business-model fit alongside feasibility" — förankrat (Business & commercial context: customer value, commercial value, cost, feasibility, lifecycle risk).
- "so a direction is not only desirable to build, but viable to offer and sustain" — förankrat (*"viable to sell, build and support"*).

## Tekniska detaljer
- En fil: `src/content/profile.ts`, line 148 (endast `bring` → `align`)
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
