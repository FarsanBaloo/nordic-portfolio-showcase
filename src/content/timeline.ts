export type TimelineEntry = {
  period: string;
  title: string;
  detail: string;
  track: "professional" | "development";
  order: number;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2003–2013",
    title: "Customer-Facing Engineering & Technical Delivery",
    detail:
      "Project Engineer at Schneider Electric — requirements, system design, programming, integration, commissioning and operational handover.",
    track: "professional",
    order: 1,
  },
  {
    period: "2013–2020",
    title: "Customer-Facing Platform Expertise & Product Lifecycle",
    detail:
      "National technical expert for Sweden — complex platform environments, QA, release validation and deployment readiness.",
    track: "professional",
    order: 3,
  },
  {
    period: "2020–2025",
    title: "Discovery · Architecture · Technical Ownership · Business Value",
    detail:
      "Senior Technical Advisor — technical discovery, requirements, alternative architectures and technical/commercial trade-offs.",
    track: "professional",
    order: 5,
  },
  {
    period: "Before 2025",
    title: "Computer Science / Intelligent Systems",
    detail:
      "BSc in Computer Science with a specialisation in Intelligent Systems, Mälardalen University — applied AI focus.",
    track: "development",
    order: 2,
  },
  {
    period: "2024",
    title: "Interaction Design",
    detail:
      "Human-centred design, prototyping, user testing, accessibility and heuristic evaluation.",
    track: "development",
    order: 4,
  },
  {
    period: "2025",
    title: "Industrial AI + Wind Power Thesis",
    detail:
      "Talking Systems at MITC and a bachelor thesis on uncertainty-aware 48-hour wind power forecasting.",
    track: "development",
    order: 6,
  },
  {
    period: "Aug 2025 – Jul 2026",
    title: "Advanced AI · Innovation · Product Management",
    detail:
      "Postgraduate development across advanced AI, Innovation Management, Industrial Economics, Product Management, Requirements, Strategy and Leadership.",
    track: "development",
    order: 7,
  },
  {
    period: "Now",
    title: "Product & AI Direction",
    detail:
      "Focused on AI-enabled product roles where industrial domain depth, customer understanding and product thinking meet.",
    track: "development",
    order: 8,
  },
];
