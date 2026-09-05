# Team spirit + lyssna/anpassa — invävt naturligt i texterna

Mål: team player-tänket ("lösa och leverera tillsammans", värdesätta olika perspektiv) och supportårens förmåga att lyssna in och anpassa efter varje persons behov ska lysa igenom naturligt i löpande text — inte som buzzword-listor.

## Ändringar

### 1. `src/content/profile.ts`
- **`productPhilosophy`** — lägg till en mening om att produkter byggs tillsammans: att olika perspektiv (kund, teknik, affär, olika människor) gör lösningen bättre, och att man levererar som team.
- **`whatIBring`** — nytt sjätte kort, t.ex. **"Team Spirit & People"**: driven av att lösa och leverera tillsammans, omfamnar olika perspektiv och bakgrunder, och vana att lyssna in och anpassa stöd efter varje persons behov (från supportåren). Befintliga kort lämnas i övrigt orörda.
- **`aboutParagraphs`** — i stycket om support-rollen: väv in att åren som nationell expert tränade förmågan att lyssna in, möta människor där de är och anpassa vägledning efter person och situation.
- **`journeyNarrative.paragraphs`** — i support-stycket (stycke 2): en kort naturlig fras om att lyssna in varje persons situation och anpassa stödet därefter; i avslutande `emphasis`: nämna att lösningar levereras tillsammans med teamet.

### 2. `src/content/experience.ts`
- **Support Engineer `summary`** — komplettera med att rollen byggde på att lyssna in och anpassa stöd efter varje kunds och kollegas behov.
- **Support Engineer `bullets`** — en ny punkt om nära samarbete med fälttekniker och kunder: lyssnade in deras situation, anpassade vägledning och verktyg efter person och behov — löste problem tillsammans.
- **Senior Technical Advisor** — redan starkt på informal leadership; förstärk en punkt med "embracing different perspectives across disciplines" i stället för ny rubrik.
- **Project Engineer** — kort naturlig touch i befintlig punkt om samarbete med projektledare och team.

### 3. `src/content/timeline.ts`
- **Support Engineer-milstolpens summary** — lägg till en fras om lyssnande, anpassning efter person och att lösa problem tillsammans med fältteam.
- **Senior-milstolpen** — liten förstärkning om samarbete över discipliner (behåll tre punkter; integrera i befintlig punkt, ingen ny).

## Principer
- Allt på engelska, invävt i befintliga meningar — inga separata "values"-sektioner.
- Äkta och specifikt (anknutet till support, fältteam, mentoring) — inte generiska floskler.
- Verifiering: `npx tsgo --noEmit`, `bun run build`, skärmdumpar av `/about` och `/journey`.
