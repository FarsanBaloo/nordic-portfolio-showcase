# Plan: Gör universitetsnivån tydlig i hero evidence-punkter

## Varför
På hero:n nämner de tre studie-punkterna ingen institution — en rekryterare som skannar kan inte se om "Advanced studies in NLP…" och "Studies spanning Product Management…" är akrediterade universitetsstudier eller egna/online-studier. Att lägga in institution + ordet "university" gör nivån tydlig på en gång, utan att behöva klicka till /education.

## Förslag — tre punkter i `src/content/profile.ts` (heroProof)

### Punkt 3 — Applied AI & Computer Science (line 33)
Nu: "B.Sc. Computer Science (Intelligent Systems) with applied work in RAG, forecasting and agentic AI."
→ "B.Sc. in Computer Science (Intelligent Systems) at Mälardalen University, with applied work in RAG, forecasting and agentic AI."

### Punkt 4 — Postgraduate AI Studies (line 37)
Nu: "Advanced studies in Natural Language Processing, Predictive Data Analytics, Computer Vision and Autonomous Systems."
→ "Advanced university studies in Natural Language Processing, Predictive Data Analytics, Computer Vision and Autonomous Systems — across Umeå, Linköping and Mälardalen universities."

(Institutionerna bekräftade i education.ts: Linköping = NLP, Umeå = Autonomous Systems, Mälardalen = Predictive Data Analytics + Deep Learning/Computer Vision.)

### Punkt 5 — Postgraduate Industrial Economics & Management (line 41)
Nu: "Studies spanning Product Management, Product & Requirements Management, value-driven design, Strategy & Business Models, Innovation Management, Agile Process & Project Management, Product & Portfolio Strategy and Leadership."
→ "University specialisation at Blekinge Institute of Technology spanning Product Management, Product & Requirements Management, value-driven design, Strategy & Business Models, Innovation Management, Agile Process & Project Management, Product & Portfolio Strategy and Leadership."

## Ej i scope
- Education-sidan namnger redan alla institutioner — oförändrad.
- "Postgraduate"-termen bevaras (projektets egen benämning).
- Ingen redesign, ingen publicering; verifiera med build + Playwright desktop/mobil.
