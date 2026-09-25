# Storytelling i Talking Systems och Talking SCADA

## Bedömning

### Talking Systems — oförändrad, storytelling helt intakt
Talking Systems rördes **inte** under trimningen (889 ord före, 889 efter). Berättelsen är intakt: discovery-frågan ("inte *hur använder vi en LLM?* utan *hur minskar vi beroendet av specialister?*"), valideringen i smart-factory-testbädden, produktper-spektivet som breddar konceptet, flödesdiagrammet och alla åtta bilderna. Inget att göra här.

### Talking SCADA — storytelling delvis förlorad
Trimningen skar från ~2 987 till ~1 919 ord (≈36 %). Kärnstruktur, JTBD-citat, 40 %-staten, 22 krav, MVP-omfång och reflektionen överlevde. Men det som togs bort var just **berättande vävnad** — resonemanget kring *hur jag tänkte* och *varför det ledde till nästa steg*. Nu läses sektionerna mer som en produkt spec än en case-study.

**Konkret vad som försvann:**

1. **Overview** — "building on my industrial domain grounding and applied AI studies" och "I connected these to examine how user needs, technical choices, delivery and a viable offer could fit together" klipptes till en platt leveranslista.
2. **Concept** — "In everyday terms: a way for the building to explain itself. Instead of reading trend curves and alarm lists…" togs bort — den bro som gjorde tekniken begriplig.
3. **NPD-sektionen** — fem detaljerade resonemangs-punkter (opportunity, concept generation, evaluation, product definition, development planning) pressades till tre platta bullets. "Jag undersökte originality, usefulness and producibility" → "usefulness and producibility".
4. **Business model** — en hel paragraf om hur Business Model Canvas kopplar samman segment, value proposition, channels och cost drivers → två meningar.
5. **Assets & Make/Buy/Share** — resonemang om codification, knowledge-sharing och klassificering (commodities/qualifiers/differentiators) → en enda mening.
6. **Elicitation** — "One documented observation was that investigations required combining multiple views… This informed requirements for graph context" → en komprimerad rad.
7. **"How the case evolved"** — narrativet om hur konceptet vandrade genom kurserna och vad varje kurs lade till → kortare, mer mekanisk.

## Förslag: selektivt återställa storytelling i Talking SCADA

Målet är att带回 berättande vävnad **utan** att återgå till den gamla längden. Planen lägger tillbaka resonemang på de tre ställen där förlusten är störst, och behåller den trimmade kärnen överallt annars. Målet är ~2 250 ord (mittemellan före och nu) — kortare än originalet men med storytellingen åter.

### Vad som återställs (i `src/content/projects.ts`, sektion `talking-scada`)

1. **Overview, andra body-raden** — lägg tillbaka en mening om att detta bygger på domänkunskap och tillämpad AI, och att syftet var att koppla samman användarbehov, teknikval, leverans och ett genomförbart erbjudande. (~25 ord)

2. **Concept, "What the concept is"** — lägg tillbaka "In everyday terms"-bron: att personen ansvarig ställer en fråga och får ett vardagsspråkssvar om var energi slösas, trolig orsak och vad man ska undersöka — istället för att läsa trendkurvor och larmlistor. (~20 ord)

3. **NPD-sektionen** — återställ resonemanget i de tre punkterna så de förklarar *varför*, inte bara *vad*: opportunity (market pull + technology push + underused data → PIC med bakgrund och riktning), concept evaluation (originality, usefulness, producibility + Go/No-Go-kriterier), development planning (parallellt produkt-/marknads-/finansarbete med iterativ feedback). (~40 ord)

4. **Business model & value assessment** — lägg tillbaka en mening om hur Business Model Canvas kopplar samman segment, value proposition, channels, partners, kostnader och intäkter, och att erbjudandet kombinerar beslutsstöd med integration, onboarding och löpande service. (~30 ord)

5. **Elicitation** — återställ "One documented observation was that investigations required combining multiple views and inferring system relationships — which shaped requirements for graph context and referenced explanations." (~20 ord)

### Vad som **inte** återställs
- Assets/Make/Buy/Share-förklaringen om codification och commodities/qualifiers/differentiators — för tekniktung för att rättfärdiga längden på en rekryterarsida.
- "Further product validation"-sektionens spekulation om speculative-sale testing — inte kärnstory.
- Upprepade "These are intended gains / proposed approaches within the academic case"-disclaimers.

### Verifiering
- Build OK via observability-loggarna.
- `/projects/talking-systems` och `/projects/talking-scada` svarar 200.
- Ingen overflow på desktop eller mobil.
- Inga nya bilder, inga påhittade resultat, ingen publicering.
