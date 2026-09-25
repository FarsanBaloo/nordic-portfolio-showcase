# Plan: Väv in AI-hands-on + möjligheter/begränsningar i emphasis-stycket

## Analys — kommer de tre benen med idag?
Stycket (line 148) täcker idag:
- **Domänkunskap:** delvis — "people who run complex buildings and mission-critical environments" förankrar, men inte konkret (BMS/HVAC, SCADA, energi, edge controllers).
- **AI hands-on + möjligheter/begränsningar:** **saknas helt** — inget ord om AI, RAG, forecasting, agentic AI, eller vad AI realistiskt kan/inte kan. Detta är det tydligaste gapet och det du flaggar för.
- **Affär-/produktstrategi:** finns — "customer value, commercial value and business-model fit alongside feasibility … viable to offer and sustain."

Slutsats: domän och strategi finns, men AI-hands-on med förståelse för möjligheter OCH begränsningar saknas. Det är det benet som ska läggas till utan att stycket blir för långt.

## Förslag — nytt stycke (lägger till en AI-mening)
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — and let the right solution follow from there. I understand both sides: the people who run complex buildings and mission-critical environments, and the teams who build, deliver and support them. I have hands-on experience with applied AI — RAG, forecasting, agentic systems — and I know what it can realistically support and where human judgement must stay central. I listen before defining, validate before committing, make trade-offs visible, and weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."

### Varför den nya meningen fungerar
- "hands-on experience with applied AI — RAG, forecasting, agentic systems" → konkret AI-hands-on (matchar B.Sc. + evidence-punkt).
- "what it can realistically support" → möjligheter.
- "where human judgement must stay central" → begränsningar + PM-värde (human-in-the-loop), kopplar till Talking SCADA-temat.
- Tre ben nu tydliga: domän + AI(med gränser) + affär/strategi.

Längd: ~115 ord (fyra meningar). Något längre än tidigare ~90, men täcker det tredje benet du efterfrågar.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, `journeyNarrative.paragraphs` sista stycket (line 148)
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
