# Plan: Bredda emphasis-stycket så det inte låser till enbart byggnader

## Analys

Nuvarande emphasis (line 148) säger *"the people who run complex buildings and mission-critical environments"*. Det är ärligt, men **låser syntesen till byggnader** — när din paraplypositionering är "AI Product Management & Offer Strategy — Digital Platforms" och din erfarenhet spänner building automation, BMS/HVAC, SCADA, IoT/IIoT, digitala plattformar, connected systems, energi och mission-critical. En rekryterare kan tolka dig som "byggnadsgubbe" i stället för digitala plattformar + AI + IoT.

Lösning: bredda domän-frasen till **"complex digital platforms and connected systems"** — täcker byggnader, IoT/edge, mission-critical och energi (allt är digitala plattformar/connected systems), utan att tappa domänförankringen. AI benämns redan i sin egen mening (RAG, forecasting, agentic).

## Två ändringar (en rad, line 148)

**Nuvarande:**
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — and let the right solution follow from there. I understand both sides: the people who run complex buildings and mission-critical environments, and the teams who build, deliver and support them. …"

**Nytt:**
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution. I understand both sides: the people who run complex digital platforms and connected systems, and the teams who build, deliver and support them. …"

1. **Bredda:** `complex buildings and mission-critical environments` → `complex digital platforms and connected systems` — täcker plattformar + IoT, inte enbart byggnader.
2. **Trimma:** mening 1 klipps efter "not the solution" — "and let the right solution follow from there" är en retorisk omskrivning av samma idé.

Resten oförändrad: AI-meningen, collaboration-meningen (nyss `bring`→`align`), och stängningsmeningens "viable to offer and sustain" — alla förankrade och tighta.

## Resultat
Hela stycket signalerar nu: domän = **digitala plattformar + connected systems/IoT**, AI = egen mening, collaboration + affär/strategi bevarat. Bredare, inte byggnads-låst, ~132 ord.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, line 148
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
