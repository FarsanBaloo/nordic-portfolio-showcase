# Avgränsad Talking SCADA- och kurssamordning

## 1. Separera tre avsiktliga detaljnivåer

- Behåll den redan kortade sammanfattningen på `/projects` oförändrad.
- Lägg till ett valfritt, strukturerat tidslinjeinnehåll för Talking SCADA i den befintliga projektposten, så att tidslinjen inte längre återanvänder den fullständiga projektsidan.
- Rendera hela måltexten i del A öppet i det befintliga stora tidslinjekortet: etikett, namn, underrubrik, metadata, introduktion, sex angivna mellanrubriker, sex bidragspunkter, produktbeslut, validering, progression och en intern länk till `/projects/talking-scada`.
- Ta bort den gamla My focus-rutan, den fullständiga åttaavsnittstexten, metodlistan och äldre progression från just tidslinjekortet. Behåll bild, placering, visuell stil och naturlig höjd på dator och mobil.

## 2. Uppdatera den fullständiga projektsidan

- Ersätt endast Talking SCADAs åtta innehållsavsnitt med måltexten i del C, ordagrant och i angiven ordning.
- Bevara projektnamn, etikett, underrubrik, organisationer, datumgränsen augusti 2025–maj 2026, bild, alt-text, kategorier, befintliga länkmål, URL och den korta `/projects`-texten.
- Visa exakt ett visuellt sexstegsflöde under `Concept & proposed user journey`, utan duplicerad textlista eller dubblerad flödesrubrik.
- Placera befintliga underlagslänkar vid `Evidence & validation approach` och behåll exakt en `Methods & domains`-lista under avsnitt 7.
- Säkerställ att analyser och planer beskrivs som genomförda akademiska leveranser, medan piloter, tester, beslutspunkter, lansering, affärsantaganden och multi-agent-arkitektur förblir förslag eller fortsatt validering.

## 3. Samordna två kursbeskrivningar

- Ersätt den gemensamma punktlistan för `Product Management` med exakt de fem angivna punkterna. Samma källa används på startsidan och Education.
- Ersätt den gemensamma punktlistan för `Product and Requirements Management for Digital Environments` med exakt de fem angivna punkterna. PRD och SRD hålls som separata leveranser.
- Lägg till taggarna `Commercialisation Planning` och `Product Life Cycle` på Product Management utan dubbletter.
- Behåll SRD, Requirements Traceability, Explainability, Reliability och övriga relevanta kravkurstaggar; återinför inte PRD där.
- Ersätt endast BTH-sammanfattningen under `Course project — Talking SCADA (product & requirements case)` med den angivna texten och behåll rubrik och datum.

## 4. Ta bort angivna upprepningar och rätta placering

- Ta bort endast det äldre NLP-stycket ovanför de nya NLP-punkterna på startsidan.
- Ta bort endast de två äldre B.Sc.-beskrivningsstyckena på startsidan; behåll de tre nya punkterna, kursnamnen, taggarna och examensuppgifterna.
- Flytta AI-introduktionen på Education från NLP-kortet till gruppnivå direkt under `Phase 1 · Advanced AI Foundation`, så den visas en gång före första kurskortet. Behåll startsidans redan korrekta gruppplacering.
- Samordna de två övergripande fasrubrikerna i båda vyerna till exakt:
  - `Phase 2 · Product · Industrial Economics · Requirements · Delivery`
  - `Phase 1 · Advanced AI Foundation`
- Behåll alla underliggande kurs-, program- och examensdatum oförändrade.

## 5. About

- Ersätt endast About-sidans inledande profilrad med: `Bridging user needs, technology and business through industrial platform experience, applied AI and product management.`
- Bevara resterande About-innehåll och startsidans hero och personliga story.

## Teknisk anpassning

- Utöka projektmodellen endast med ett valfritt återanvändbart fält för tidslinjens separata innehåll.
- Använd befintliga text-, punktliste- och länkstilar; ingen ny kortdesign, accordion eller generell ombyggnad.
- Låt det befintliga projektobjektet fortsätta vara gemensam källa för metadata, bild, länk och full projektsida, medan teaser, tidslinjeinnehåll och fulltext hålls avsiktligt separata.
- Begränsa ändringar till Talking SCADA, de två kurserna, BTH-sammanfattningen, angivna dubbletter, AI-introduktionens placering, fasrubrikerna, About-raden och nödvändigt lokalt renderingsstöd.

## Kontroll

- Bekräfta i diffen att hero, story, roller, övriga kurser/projekt, CV, SEO, formella utbildningsuppgifter och `/projects`-sammanfattningen är oförändrade.
- Bekräfta tidslinjen: hela del A synlig, exakt sex bidragspunkter, en fungerande intern full-case-länk och ingen kvarvarande lång projektsidetext.
- Bekräfta utbildningen: exakt fem måltextpunkter per berörd kurs i båda vyerna, rätt taggar, en BTH-sammanfattning och en AI-gruppintroduktion per vy.
- Bekräfta projektsidan: exakt åtta huvudavsnitt, ett visuellt flöde med en rubrik, en metodlista och bevarade befintliga länkar.
- Kör typkontroll och kontrollera aktuell förhandsvisning på desktop och mobil för startsidan, Education, `/projects`, Talking SCADA och About, inklusive läsbarhet, länkar, överlappning och horisontell scroll.
- Publicera inte.
