export type TimelineBranch = {
  label: string;
  slug?: string;
  note?: string;
};

export type TimelineMilestone = {
  id: string;
  period: string;
  title: string;
  detail: string;
  track: "professional" | "development";
  side: "left" | "right";
  branches?: TimelineBranch[];
  roles?: string[];
  now?: boolean;
};

export const milestones: TimelineMilestone[] = [
  {
    id: "project-engineer",
    period: "2003–2013",
    title: "Project Engineer",
    detail:
      "Customer-facing engineering and technical delivery at Schneider Electric — requirements, system design, programming, integration, commissioning and operational handover.",
    track: "professional",
    side: "left",
  },
  {
    id: "bsc-start",
    period: "Parallel track",
    title: "Computer Science / Intelligent Systems",
    detail:
      "BSc in Computer Science with a specialisation in Intelligent Systems, Mälardalen University — an applied AI foundation built alongside full-time engineering work.",
    track: "development",
    side: "right",
  },
  {
    id: "national-expert",
    period: "2013–2020",
    title: "Support Engineer / National Technical Expert",
    detail:
      "National technical expert for Sweden — complex platform environments, QA, release validation, escalation ownership and deployment readiness.",
    track: "professional",
    side: "right",
    branches: [{ label: "AstraZeneca platform environment", slug: "astrazeneca" }],
  },
  {
    id: "senior-advisor",
    period: "2020–2025",
    title: "Senior Technical Advisor",
    detail:
      "Technical discovery, requirements, alternative architectures and technical/commercial trade-offs — end-to-end technical ownership tied to business value.",
    track: "professional",
    side: "left",
    branches: [
      { label: "Digital Realty ST06", slug: "digital-realty-st06" },
      { label: "KTH Living Lab", slug: "kth-living-lab" },
      { label: "S:t Eriks Eye Center", slug: "st-eriks" },
    ],
  },
  {
    id: "applied-ai",
    period: "2023–2025",
    title: "Interaction Design · Applied AI · Thesis",
    detail:
      "Human-centred design, prototyping and accessibility, then applied industrial AI at MITC and a bachelor thesis on uncertainty-aware 48-hour wind power forecasting.",
    track: "development",
    side: "right",
    branches: [
      { label: "Talking Systems", slug: "talking-systems" },
      { label: "Wind Power Forecasting", slug: "wind-power-forecasting" },
      { label: "Seeing AI — UX evaluation", slug: "seeing-ai" },
    ],
  },
  {
    id: "postgraduate",
    period: "Aug 2025 – Jul 2026",
    title: "Advanced AI · Innovation · Product Management",
    detail:
      "Postgraduate development across advanced AI, Innovation Management, Industrial Economics, Product Management, Requirements, Strategy and Leadership.",
    track: "development",
    side: "left",
    branches: [
      { label: "Talking SCADA", slug: "talking-scada" },
      { label: "Multi-Agent AI decision support", slug: "multi-agent-ai" },
    ],
  },
  {
    id: "now",
    period: "Now",
    title: "Product & AI Direction",
    detail:
      "Focused on AI-enabled product roles where industrial domain depth, customer understanding and product thinking meet.",
    track: "professional",
    side: "right",
    roles: ["AI Product Manager", "AI Product Owner", "Offer Manager"],
    now: true,
  },
];
