# Plan: Finjustera hero-början (intro + evidence-punkt 2)

## Bedömning: är början bra?
Ja — strukturen är stark för en PM/OM-rekryterare:
- Öppningsrad "I start with the customer problem, not the solution." är en tydlig PM-princip.
- Subtitle "Nordic Technical Support Expert · Developing toward Product & Offer Management" är ärlig och visar riktning.
- Intro etablerar B2B-djup + värdessnitt (needs/technology/delivery/business value) + aktuell roll som brygga till PM/OM.
- Fyra evidence-punkter täcker discovery, lifecycle, AI, management — bra täckning.
- Progression Industrial Systems→Digital Platforms→Product→ är tydlig.

Två konkreta problem finns, båda i själva texten (inte strukturen):

## Problem 1 — Repetition i evidence-punkt 2 (tydligast)
Nuvarande (line 29):
> "Turned recurring customer and field issues into **structured product feedback and enhancement proposals** with Product Owners and R&D. The current Nordic role continues this for the Nordic region — turning **recurring field** cases into **structured product feedback and enhancement proposals** for EcoStruxure Building Operation and its edge IoT ecosystem, prioritised with R&D by customer impact, technical risk and business relevance."

"structured product feedback and enhancement proposals" upprepas två gånger, liksom "recurring" och "field". Det svagar punkten.

### Förslag — omformulerad (en gång):
> "Turned recurring customer and field issues into structured product feedback and enhancement proposals with Product Owners and R&D. The current Nordic role continues this across the Nordic region — routing EcoStruxure Building Operation and edge IoT ecosystem cases back to R&D, prioritised by customer impact, technical risk and business relevance."

Alla PM-/domännyckelord bevarade; upprepningen bort.

## Problem 2 — Possessiv inkonsistens (mindre)
Intro (line 19) säger "the customer problem"; emphasis-stycket (line 148) säger "the customer's problem". Ena platsen bör använda samma form. Förslag: ändra intro till "the customer's problem" (matchar emphasis som godkändes tidigare).

## Frivillig läsbarhetspolish (intro)
"My 20+ years at Schneider Electric span complex B2B environments where customer and user needs, technology, delivery and business value meet." → em-dash före "where" för paus:
> "My 20+ years at Schneider Electric span complex B2B environments — where customer and user needs, technology, delivery and business value meet."

Valfritt — påverkar inte innebörden.

## Tekniska detaljer
- En fil: `src/content/profile.ts`
- Edits: line 19 (possessiv + em-dash), line 29 (evidence-punkt 2 omformulerad)
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil
