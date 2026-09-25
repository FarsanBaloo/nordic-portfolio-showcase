# Plan: En liten ärlig trimning av emphasis-stycket

## Analys

Emphasis-stycket (line 148) är ~140 ord, 5 meningar — på den längre sidan men inte överdrivet för en avslutande sytesis på Journey-sidan.

**Behåll — inte fyllnad:**
- "the people who run complex buildings and mission-critical environments" — din domän-ankare. Utan den läses stycket som en generisk PM. Det skiljer dig; klipp inte.
- AI-meningen, collaboration-meningen (nyss skärpt `bring`→`align`), och stängningsmeningens "viable to offer and sustain" — alla förankrade i erfarenhet, tighta.

**Det enda riktiga överflödet:**
Mening 1: *"I start with the customer's problem, not the solution — and let the right solution follow from there."*
Andra halvan är en retorisk omskrivning av den första — samma idé sägs två gånger. Renaste klippet utan att tapa distinktion (~8 ord).

## Ändring (en rad, line 148)

**Nuvarande mening 1:**
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — and let the right solution follow from there."

**Nytt:**
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution."

Resten av stycket oförändrat. Resultat: ~132 ord, skarpare öppning utan att tapa domän, AI, collaboration eller affärs-angel.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, line 148
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
