export type TimelineBranch = {
  label: string;
  slug?: string;
  note?: string;
  /** Month span within the parent milestone period, e.g. "Aug–Oct 2022" */
  span?: string;
  /** Optional sub-section this branch belongs to inside the milestone */
  group?: string;
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
    id: "national-expert",
    period: "2013–2020",
    title: "Support Engineer / National Technical Expert",
    detail:
      "National technical expert for Sweden — complex platform environments, QA, release validation, escalation ownership and deployment readiness.",
    track: "professional",
    side: "right",
    branches: [{ label: "AstraZeneca platform environment", slug: "astrazeneca", span: "Mar–Nov 2018" }],
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
      { label: "Digital Realty ST06", slug: "digital-realty-st06", span: "Aug–Dec 2021" },
      { label: "KTH Living Lab", slug: "kth-living-lab", span: "Feb–Sep 2022" },
      { label: "S:t Eriks Eye Center", slug: "st-eriks", span: "Jan–Jun 2023" },
    ],
  },
  {
    id: "bsc-development",
    period: "2023–2025",
    title: "Computer Science / Intelligent Systems",
    detail:
      "BSc in Computer Science with a specialisation in Intelligent Systems, Mälardalen University — an applied AI foundation built alongside the senior technical advisor role. The programme moved from Interaction Design development, through the Seeing AI assignment and the Talking Systems AI projects, and concluded with the bachelor thesis.",
    track: "development",
    side: "right",
    branches: [
      {
        label: "PLANE(ra)T Resande",
        slug: "planet-resande",
        span: "Sep–Nov 2023",
        group: "Interaction Design · Development",
      },
      {
        label: "Hållbar Hälsa",
        slug: "hallbar-halsa",
        span: "Nov–Dec 2023",
        group: "Interaction Design · Development",
      },
      {
        label: "Seeing AI — UX evaluation",
        slug: "seeing-ai",
        span: "Jan–Mar 2024",
        group: "Seeing AI assignment",
      },
      {
        label: "Talking Systems",
        slug: "talking-systems",
        span: "Sep 2024 – Jan 2025",
        group: "Talking Systems · Applied AI",
      },
      {
        label: "Thesis — Wind Power Forecasting",
        slug: "wind-power-forecasting",
        note: "Done last",
        span: "Mar–Jun 2025",
        group: "Bachelor thesis",
      },
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
      { label: "Talking SCADA", slug: "talking-scada", span: "Aug 2025 – Jan 2026" },
      { label: "Multi-Agent AI decision support", slug: "multi-agent-ai", span: "Jan–Jun 2026" },
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
