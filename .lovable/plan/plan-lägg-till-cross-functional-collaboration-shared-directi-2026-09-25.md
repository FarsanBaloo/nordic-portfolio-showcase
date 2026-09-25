# Plan: Lägg till cross-functional collaboration / shared direction i emphasis-stycket

## Analys — saknas det?
Emphasis-stycket (line 148) är idag starkt individuellt färgat — "I start with…", "I understand…", "I listen…". Det beskriver hur du tänker som PM, men **inte hur du får tvärdisciplinära team att gå samma väg**. Det är en legitim PM-egenskap som en rekryterare letar efter (alignment, shared direction, cross-functional collaboration), och den saknas idag.

Risk: stycket växer (redan ~115 ord, 4 meningar). Du har tidigare varit tydlig med att inte vilja ha det för långt. Lösningen är **en kort, konkret mening** — inte en buzzword-lista.

## Förslag — nytt stycke (lägger till en collaborations-mening)
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — and let the right solution follow from there. I understand both sides: the people who run complex buildings and mission-critical environments, and the teams who build, deliver and support them. I have hands-on experience with applied AI — RAG, forecasting, agentic systems — and I know what it can realistically support and where human judgement must stay central. I bring cross-functional teams — engineering, R&D, sales and support — around a shared direction, so we move forward as one team rather than in fragments. I listen before defining, validate before committing, make trade-offs visible, and weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."

### Varför meningen fungerar
- "cross-functional teams — engineering, R&D, sales and support" → konkret, inte generiskt "stakeholders".
- "around a shared direction" → shared direction-explicit.
- "move forward as one team rather than in fragments" → collaboration/alignment, undviker buzzwords.
- Ligger naturligt före den avslutande viability-meningen.

Längd: ~140 ord, 5 meningar. På den längre sidan, men täcker nu fyra ben: domän + AI(gränser) + collaboration + affär/strategi.

## Alternativ (kortare — om du hellre håller ~120 ord)
Väv in som en klausul i stängningsmeningen i stället för egen mening:
> "…I listen before defining, validate before committing, align cross-functional teams around a shared direction, make trade-offs visible, and weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."
(Då blir stängningsmeningen en lista av fem — mer packad men kortare totalt.)

## Tekniska detaljer
- En fil: `src/content/profile.ts`, line 148
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
