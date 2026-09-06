# Journey blir startsidan

Din berättelse är det starkaste du har, och idag ligger den ett klick bort. Vi flyttar upp den till startsidan och tar med de bästa delarna av dagens startsida dit — resten finns redan som egna sidor.

## Vad startsidan blir

Ny ordning på `/`:

1. **Kort presentationsdel** (från dagens startsida): namn, roll, ort, tillgänglighetsraden, den korta positioneringstexten, bryggmeningen, de tre–fyra bevispunkterna, progressionsraden, målroller och knappraden (Projects, CV, LinkedIn, GitHub). Porträttet ligger kvar bredvid.
2. **Berättelsen** (från Journey): rubriken "From control cabinets to AI products", ingressen, de fyra styckena och den avslutande meningen.
3. **Karriärlinsen** — de fyra rutorna.
4. **Product philosophy** — samma inramade hero-kort som idag.
5. **Tidslinjen** i full bredd, inte som förhandsvisning.
6. **En kort avslutning**: länk till alla projekt och kontaktuppgifter.

## Vad som tas bort från startsidan

Dessa har redan egna sidor och gör startsidan lång och rörig:

- Capabilities-rutorna (finns på About)
- Projektrutnätet med sex kort (ersätts av en länkrad till Projects)
- Education-avsnittet (finns på Education)
- About-avsnittet med "How I work" (finns på About)
- Det stora Contact-avsnittet (finns på Contact; ersätts av en kort avslutning)
- Journey-förhandsvisningen med kort tidslinje (nu är det själva sidan)

## Vad som händer med /journey

Adressen finns kvar och skickar vidare till startsidan, så gamla länkar och delningar fortsätter fungera. Menyn får inte längre en separat "Journey"-post — startsidan är journey. Knappen "Explore my journey" försvinner eftersom man redan är där.

Portättet: startsidan använder Journeys porträttbild i berättelsedelen och behåller det runda porträttet i presentationsdelen — jag ser till att bara en av dem visas så det inte blir dubbelt.

## Teknisk omfattning

- `src/routes/index.tsx` — byggs om enligt ordningen ovan; återanvänder `journeyNarrative`, `careerLens`, `productPhilosophy`, `JourneyPortrait` och `Timeline`.
- `src/routes/journey.tsx` — blir en permanent omdirigering till `/`.
- `src/components/site.tsx` — ta bort Journey ur navigationen.
- Titel och beskrivning på `/` uppdateras så de matchar berättelsen; JSON-LD behålls.
- `public/sitemap.xml` — ta bort `/journey`.
- Inga ändringar i tidslinjens innehåll, projekt, bilder eller övriga sidor.
