# Plan: Analysera och förfinna journey emphasis-stycket

## Bedömning av nuvarande emphasis-stycke

Nuvarande text (~118 ord, fyra meningar):
> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — prioritise what people are really trying to get done, and let the right solution follow from there. I understand both sides of the table — the people who live with the result and the teams who have to build, deliver and support it. I listen before defining, validate before committing, make trade-offs visible, and work across disciplines to turn a real customer problem into a direction people can build and contribute to. I weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."

### Starkt
- Tydlig problem-först-princip — knyter till din "I start with the customer problem, not the solution"-positionering
- "both sides of the table" visar dubbel perspektiv (kund + leveransteam)
- Offer Manager-vinkeln (commercial value, business-model fit, viable to offer and sustain) är explicit
- validate before committing, trade-offs visible — konkreta PM-beteenden

### Svaghet — lyfter inte din unika domän
Stycket är principnivå och läses som generiskt för "vilken PM som helst". Det nämner inte det som gör dig unik: industriella plattformar, byggnadssystem, mission-critical, SCADA, edge controllers. Narrativet ovanför har domänen, men emphasis-stycket avslutar utan att förankra i den — så en rekryterare som skummar sista stycket ser PM-principer men inte din profil.

### Längd
~118 ord i fyra meningar är i övre lagret för ett emphasis-stycke. S3 och S4 överlappar kring trade-offs och riktning; de kan slås ihop utan att tappa kraft.

## Förslag — förfinad, kortare, domänförankrad

Slå ihop S3 och S4, byt det generiska "people who live with the result" mot en domänreferens, och stryk det överflödiga "prioritise what people are really trying to get done" (står redan i S1):

> "That is what I bring to product management and offer strategy: I start with the customer's problem, not the solution — and let the right solution follow from there. I understand both sides: the people who run complex buildings and mission-critical environments, and the teams who build, deliver and support them. I listen before defining, validate before committing, make trade-offs visible, and weigh customer value, commercial value and business-model fit alongside feasibility — so a direction is not only desirable to build, but viable to offer and sustain."

~90 ord, tre meningar. Förankring i domänen ("complex buildings and mission-critical environments"), bevarar problem-först + OM-vinkel, kortare och mer distinkt.

## Tekniska detaljer
- En fil: `src/content/profile.ts`, fält `journeyNarrative.emphasis`
- Ingen redesign, ingen ny bild, ingen publicering
- Verifiera med build + Playwright desktop/mobil
