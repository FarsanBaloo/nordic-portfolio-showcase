# Skärpt startsida + omskriven Journey

Min rekommendation: **behåll två sidor, men gör startsidan berättande och kortare**, och låt Journey vara den fördjupade historien.

Anledning: startsidan är det första en rekryterare ser och de flesta stannar under en minut. Den ska svara på "vem är du, vad kan du göra för oss, vad är beviset" — snabbt. Journey är för den som blev nyfiken och vill följa hela resan. Om startsidan blev hela tidslinjen skulle det viktigaste (positioneringen) drunkna i scroll, och du skulle tappa en tydlig ingång att länka till i ansökningar.

Startsidan behåller en kort smakbit av tidslinjen med länk vidare — men kortare än idag.

## Positionering

Du presenteras som **AI Product Manager först**, med 25 års industriell erfarenhet som beviset bakom — inte som huvudrubrik. Det är den roll du söker, och din industriella bakgrund blir din särskiljande fördel snarare än din identitet.

Undertexten byts från "Digital Platforms · Product · Applied AI" till något i stil med:
"AI Product Manager — industriella plattformar, SCADA och tillämpad AI".

## Ton

Berättande och personlig, i första person. Kortare meningar än CV:t. CV-språket ("cross-functional", "feasibility assessment") flyttas till CV-sidan där det hör hemma; startsidan får mänskligt språk som ändå säger samma sak.

## Startsidan — ny textstruktur

1. Namn + roll (AI Product Manager) + tillgänglighet
2. Ett kort stycke, 2–3 meningar: vem du är och vad du gör möjligt
3. Ett kort stycke: vad som driver dig — den röda tråden mellan verkstadsgolv och AI
4. Tre korta bevispunkter i stället för dagens långa CV-stycke (t.ex. 25 år i verkliga industrisystem / examen och postgraduate inom AI och produktledning / byggda AI-lösningar som testats med riktiga användare)
5. Progressionsraden och målroller behålls, något omskrivna
6. Knappar oförändrade (Journey, projekt, CV, LinkedIn)
7. Kort tidslinjesmakbit, tydligt märkt som en förhandsvisning, med "Läs hela resan"

## Journey — omskriven

Inledningen skrivs om från tredjepersons-CV-ton till berättande första person, med AI-produkt-vinkeln som mål snarare än slutstation. Struktur:

- En stark ingångsmening om vad resan handlar om
- Tre korta stycken: nära kunderna → nationell plattformsexpert → teknisk rådgivare där kund, teknik och affär möts
- Ett stycke om det medvetna steget in i AI och produktledning
- Avslutning som knyter ihop till AI Product Manager-rollen

Karriärlinsen (fyra rutor) och produktfilosofin behålls men får kortare, mer talspråklig text.

## Teknisk omfattning

Ändringar sker i innehållsfilerna och de två sidorna:

- `src/content/profile.ts` — `descriptor`, `heroPrimary`, `heroSupporting`, ny `heroProof`-lista, `progression`, `journeyIntro`, `journeyNarrative`, `careerLens`, `productPhilosophy`
- `src/routes/index.tsx` — rendera bevispunkterna, korta ned journey-avsnittet, uppdatera rubriker
- `src/routes/journey.tsx` — anpassa rubriker till den nya texten
- Titel/metabeskrivning på båda sidorna uppdateras till AI Product Manager-positioneringen

Ingen ändring av tidslinjens funktion, bilder, projekt eller CV-sidan.
