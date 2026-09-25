# Återställ storytelling i projektcasen — utan att blåsa upp dem

## Mål
Ge de projekt som trimmats till nyckelordslistor tillbaka en kort berättarbåge: utmaning → vad jag gjorde → vändpunkt/insikt. 2–3 meningar per sektion, inte längre texter totalt.

## Vad som ändras (endast `src/content/projects.ts`)

### 1. Digital Realty ST06
- "Context": en mening om vad som stod på spel i en mission-critical datacentermiljö (driftkontinuitet, komplex IIoT-miljö).
- "Summary": berätta kort hur integrationen gick till (enhetlig plattform, stegvis).
- "Contribution": behåll listan men korta den (10 → 6 punkter) och lägg en inledande mening som sätter scenen.

### 2. Wind Power Forecasting
- "Context": utöka med varför osäkerhet är det verkliga problemet för energiplanerare (beslut under osäkerhet, inte prognosprecision).
- "Discovery & framing": gör om punktlistan till 1–2 meningar om hur frågeställningen formades.
- "Product / platform relevance": behåll, ev. en mening om vad insikten blev.

### 3. HVAC Monitoring
- "Summary": berätta storyn — samma behov återkom hos kund efter kund, och i stället för att lösa det en gång till byggdes en återanvändbar produkt.
- "Product perspective": korta den andra meningen (upprepar första).

### 4. KTH Live-In Lab
- "Context": en mening om vad som gör öppen innovation i riktiga bostäder unikt.
- Övrigt behålls.

## Vad som INTE ändras
- S:t Eriks, Talking SCADA, Talking Systems, PLANE(ra)T, Hållbar Hälsa, Seeing AI — storytelling redan intakt.
- Ingen redesign, inga nya sektioner, inga nya bilder, inga påhittade resultat.
- Tidslinjekorten (timelineSummary) rörs inte — de är redan bra.

## Verifiering
- Build OK, projektsidorna svarar 200, ingen overflow på desktop/mobil.
