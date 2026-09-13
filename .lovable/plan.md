# Avgränsad innehållsuppdatering: story, kurser och Talking SCADA

## 1. Personlig story

- Ersätt endast de tre nuvarande studie-/konceptstyckena i `From control cabinets to AI products` med de tre angivna styckena ordagrant.
- Bevara storyns inledning, rollhistorik, det separata stycket om när AI är lämpligt och avslutningen som börjar `That is what I bring…`.
- Kontrollera att exakt en version av de tre nya styckena visas på startsidan; `/journey` fortsätter vara en omdirigering till samma sida.

## 2. Tolv utbildningsblock och två sammanfattningar

- Matcha och uppdatera exakt de tolv angivna blocken i startsidans tidslinje och Education: Innovation Management, de sex angivna Blekinge-kurserna, NLP, Autonomous Systems & Perception, Predictive Data Analytics, Deep Learning for Industrial Imaging samt den samlade B.Sc.-kursgruppen.
- Visa måltexterna som vanliga semantiska punktlistor: fyra punkter för Product Management och kravkursen, två eller tre för övriga block. Ersätt befintlig förklaringstext i stället för att lägga till en andra version.
- Byt innovationsblockets mellanrubrik till `Talking SCADA — concept origin in Innovation in Practice` utan att ändra utbildningsgruppens formella namn.
- Ersätt Blekinges befintliga kurscase-sammanfattning och lägg den gemensamma introduktionen under den befintliga fasrubriken `Advanced AI Foundation` i båda vyerna, utan ett nytt kort.
- Behåll formella titlar, lärosäten, individuella kursdatum, fasordning, ämnesgrupper och befintliga relevanta taggar. Uppdatera endast de specificerade taggarna: `System Requirements Document (SRD)`, `Requirements Traceability`, `Cost-Value-Risk`, `New Product Development (NPD)` och `Product Requirements Document (PRD)`, utan dubbletter.
- Den befintliga skillnaden mellan vyernas breda fasetiketter bevaras i stället för att gissa nya datum; de verifierade individuella kursdatumen ändras inte och avvikelsen redovisas efter kontrollen.

## 3. Talking SCADA

- Behåll samma projektpost, namn, bild, alt-text, länkmål, fotnot, kategorier och befintliga webbadresser.
- Sätt etikett, underrubrik, metadata och separat kortsammanfattning till de angivna ordagranna texterna.
- Ersätt hela nuvarande projektbeskrivningen med exakt åtta huvudavsnitt i angiven ordning. Lägg alla angivna underrubriker under rätt huvudavsnitt och ta bort de ersatta äldre avsnitten så inget dubbleras.
- Placera det enda visuella sexstegsflödet under `Concept & proposed user journey`, med de nya etiketterna i befintlig grafisk stil. Visa inte samma steg som en separat textlista.
- Placera `Methods & domains` under huvudavsnitt 7 som en enda metodlista. Eventuella befintliga projektlänkar placeras vid `Evidence & validation approach`; inga nya offentliga dokumentlänkar skapas.
- Bevara den akademiska inramningen och alla angivna faktagränser: genomfört kursarbete skiljs från föreslagen MVP, pilot, marknad, affärsmodell, multi-agent-riktning och fortsatt validering.

## Teknisk anpassning

- Samla den nya kursbeskrivande texten i en gemensam innehållskälla som både tidslinjen och Education använder, samtidigt som respektive vys befintliga formella struktur och taggar bevaras.
- Lägg endast till valfria, återanvändbara fält för punktlistor och fasintroduktion där nuvarande modeller saknar stöd. Rendera dem med befintliga text- och listkomponenter.
- Den befintliga projektmodellen stödjer redan underrubriker, avsnittsplacerat flöde, metodtaggar och länkar; använd detta stöd utan en bred ombyggnad och utan påverkan på andra projekt.

## Kontroll

- Kontrollera diffen så att endast de tre story-styckena, tolv utbildningsblock, två sammanfattningar, specificerade taggar, Talking SCADA och nödvändigt lokalt presentationsstöd har ändrats.
- Bekräfta exakt tre nya story-stycken; exakt tolv matchade utbildningsblock med rätt antal punkter; samt exakt åtta Talking SCADA-huvudavsnitt, ett flöde och en metodlista.
- Bekräfta att gamla förklaringstexter och projektavsnitt inte finns kvar dubbelt, och att alla angivna engelska texter är ordagranna.
- Kontrollera typning och aktuell förhandsvisning på desktop och mobil för startsidan, Education, projektlistan, Talking SCADA-sidan och tidslinjens öppna case. Verifiera läsbarhet, länkar samt frånvaro av klippning, överlappning och sidledsskrollning.
- Publicera inte.