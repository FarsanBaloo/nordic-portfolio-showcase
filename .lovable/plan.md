# Återställ "Now · Direction"-nod + trimma Nordic-kortet

## Bakgrund
Den tidigare "Now"-noden (`id: "now"`, `now: true`) renderades som ett centrerat "Now · Direction"-kort högstast i tidslinjen (newest-first) med syntes-text och målroll-chip: AI Product Manager, Product Manager, Product Owner, Offer Manager. Den ersattes av Nordic Technical Support Expert-kortet (Okt 2026–Present). Användaren vill ha båda: Nordic-kortet kvar som konkret roll, **och** Now-noden återställd som riktningssyntes. Samtidigt ska Nordic-kortet trimmas: ta bort den minst PM-relevanta punkten (support-punkten) så kortet lyfter produkt/offer-snår snarare än support-tekniker.

## Ändring (endast `src/content/timeline.ts`)
Lägg tillbaka Now-milestone:n som **sista element** i `milestones`-arrayen (efter Nordic-posten), så den renderas högstast vid newest-first-ordning.

```ts
{
  id: "now",
  railMarker: { label: "NOW", kind: "major", verified: true },
  datePrecision: "unspecified",
  title: "Product & AI Direction",
  track: "direction",
  summary:
    "Bringing together 20+ years of customer and industrial-platform experience with product discovery, requirements, prioritisation, strategy, lifecycle judgement and applied AI — working across customer, engineering and business perspectives to shape useful, feasible and scalable products.",
  roles: ["AI Product Manager", "Product Manager", "Product Owner", "Offer Manager"],
  now: true,
},
```

- Inga andra fält ändras. Text och roller återställs ordagrant från den tidigare versionen.
- `track: "direction"` är en giltig `TimelineTrack`; NowRow-komponenten (`entry.now`) renderar kortet centrerat över båda spåren med "Now · Direction"-etikett och professional-accent.
- Nordic-kortet (Okt 2026–Present) ligger kvar som näst överst, men trimmas (se nedan).

## Trim av Nordic-kortet (`src/content/timeline.ts`, id `nordic-technical-support-expert`)
Ta bort den första overviewBullets-punkten — den låter mest som support-tekniker och minst som PM/offer:

> ~~Deliver technical support and solve complex BMS and EcoStruxure issues for technicians, EcoXpert partners and Level 2 advanced support engineers across the Nordic region.~~

De tre kvarvarande punkterna (VIP-kunder, structured product feedback & enhancement proposals, mentoring Level 2) bär PM/offer/lifecycle-signalen. `relevanceSignals` behålls oförändrad — de är redan produkt-/prioriterings-/lifecycle-inriktade.

## Ärlighet

## Ärlighet
Now-kortet är riktning/syntes, inte en formell titel. Det är konsekvent med hero ("Developing toward Product & Offer Management") och emphasis-stycket. "Direction"-kvalifiern i etiketten gör att målrollerna läses som riktning, inte som nuvarande titel.

## Verifiering
- Build OK.
- Playwright desktop + mobil på `/`: Now-kortet syns högstast, Nordic-kort under, ingen overflow, inga konsolfel.
- Inget publiceras.
