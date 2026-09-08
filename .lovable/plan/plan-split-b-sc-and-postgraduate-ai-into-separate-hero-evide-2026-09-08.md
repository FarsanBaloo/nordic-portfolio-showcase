# Plan: Split B.Sc. and postgraduate AI into separate hero evidence bullets

## Scope
Single-file copy change to `src/content/profile.ts` — the `heroProof` array used by the homepage hero evidence list. No other files or pages are touched.

## Current state (3 bullets)
1. AI built and validated: RAG, forecasting and agentic assistants developed through degree and postgraduate work, tested with real users and real data.
2. B.Sc. in Computer Science (Intelligent Systems) plus advanced postgraduate AI — Natural Language Processing, Computer Vision and Autonomous Systems
3. Postgraduate specialisation in Industrial Economics & Management — product & requirements management, strategy, business models and leadership.

## Change
Split bullet 2 into two separate bullets and add "Predictive Data Analytics" to the postgraduate AI list. Result is 4 bullets:

1. AI built and validated: RAG, forecasting and agentic assistants developed through degree and postgraduate work, tested with real users and real data.
2. B.Sc. in Computer Science (Intelligent Systems).
3. Advanced postgraduate AI — Natural Language Processing, Computer Vision, Predictive Data Analytics and Autonomous Systems.
4. Postgraduate specialisation in Industrial Economics & Management — product & requirements management, strategy, business models and leadership.

This keeps the three evidence categories (AI capability, formal CS/AI foundation, product/business) intact while making the B.Sc. and the advanced postgraduate AI studies each their own bullet, and adds Predictive Data Analytics as a recognised postgraduate AI course.

## What is NOT changed
- Hero structure, layout, styling, portrait, typography, navigation
- The customer-first intro, Product & AI Direction box, availability pill, progression chips, CTAs
- All other homepage sections and other pages

## Verification
- `npx tsgo --noEmit`
- `bun run build`
- `/` returns 200
- Browser check: 4 bullets render, B.Sc. and postgraduate AI are separate, Predictive Data Analytics appears
