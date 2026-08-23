export type TimelineTrack = "professional" | "development" | "direction";

/** How precise the underlying date information actually is. Anything that is
 *  not verified must never be rendered as a concrete month span. */
export type DatePrecision =
  | "verified-range"
  | "verified-year"
  | "phase"
  | "unspecified";

export type TimelineBranch = {
  label: string;
  slug: string;
  /** Only set when the date is verified. Never generated automatically. */
  period?: string;
  datePrecision: DatePrecision;
  /** Optional sub-section this branch belongs to inside the milestone */
  group?: string;
  kind?: "professional" | "academic";
  note?: string;
};

export type TimelineMilestone = {
  id: string;
  period?: string;
  datePrecision: DatePrecision;
  title: string;
  subtitle?: string;
  org?: string;
  track: TimelineTrack;
  stage?: string;
  summary: string;
  /** Three product / offer relevant evidence bullets shown collapsed. */
  overviewBullets?: string[];
  relevanceSignals?: string[];
  /** Ties into the inline evidence drawer content in experience.ts */
  roleId?: string;
  parallelNote?: string;
  branchesLabel?: string;
  branches?: TimelineBranch[];
  roles?: string[];
  now?: boolean;
};

export const overlapNote =
  "Professional and academic development overlapped in calendar time; some study periods were undertaken during leave of absence from the professional role.";

export const milestones: TimelineMilestone[] = [
  {
    id: "project-engineer",
    period: "2003–2013",
    datePrecision: "verified-range",
    title: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    track: "professional",
    roleId: "project-engineer",
    stage: "Customer Needs · Delivery Reality · Technical Responsibility",
    summary:
      "Customer-facing engineering delivering digital-platform and building-automation solutions from real customer needs through to operational handover.",
    overviewBullets: [
      "Worked directly with customers, end users and operations teams to understand needs, workflows and operational constraints, and translated them into implementation-ready requirements and system designs.",
      "Held end-to-end technical responsibility from solution design and programming through integration, commissioning, testing and operational handover.",
      "Contributed to solution architecture, integration patterns and platform quality through QA testing, defect identification and functionality validation.",
    ],
    relevanceSignals: [
      "Customer Needs",
      "Requirements",
      "End-to-End Delivery",
      "Solution Architecture",
      "Platform Quality",
    ],
  },
  {
    id: "national-expert",
    period: "2013–2020",
    datePrecision: "verified-range",
    title: "Support Engineer — Digital Platforms",
    subtitle: "National Technical Expert — Sweden",
    org: "Schneider Electric",
    track: "professional",
    roleId: "support-engineer",
    stage: "Customer Insight · Product Lifecycle · Release Readiness",
    summary:
      "National technical expert connecting real customer and field experience with platform quality, product lifecycle and release readiness.",
    overviewBullets: [
      "Converted recurring customer and field issues into structured product feedback, enhancement proposals and usability improvements, considering customer impact, market needs and business value.",
      "Worked close to the product lifecycle through QA testing, release validation, defect identification and deployment / release readiness, evaluating new and changed functionality from a real-world customer perspective.",
      "Combined national platform expertise, customer insight and technical feasibility to inform platform improvements, reliable adoption and product-related decisions.",
    ],
    relevanceSignals: [
      "Customer Insight",
      "Product Feedback",
      "Product Lifecycle",
      "Release Readiness",
      "Enhancement Proposals",
    ],
    branchesLabel: "Reusable capability from this role",
    branches: [
      {
        label: "Reusable HVAC monitoring & deviation management",
        slug: "hvac-monitoring",
        datePrecision: "unspecified",
        kind: "professional",
      },
    ],
  },
  {
    id: "senior-advisor",
    period: "2020–2025",
    datePrecision: "verified-range",
    title: "Senior Technical Advisor — Digital Platforms",
    org: "Schneider Electric",
    track: "professional",
    roleId: "senior-technical-advisor",
    stage: "Discovery · Product / Solution Options · Business Value",
    summary:
      "Customer-facing technical leadership at the intersection of discovery, architecture, project delivery and business value.",
    overviewBullets: [
      "Led customer-facing technical discovery and translated customer, operational and project needs into structured requirements, alternative architectures and scalable solution directions.",
      "Worked across customers, sales, engineering and management to evaluate product and solution options while balancing customer value, technical feasibility, lifecycle risk, cost and commercial value.",
      "Held end-to-end technical ownership and influenced prioritisation, product selection and architectural trade-offs to reduce technical and lifecycle risk and shape feasible, scalable outcomes.",
    ],
    relevanceSignals: [
      "Customer Discovery",
      "Requirements",
      "Product / Solution Options",
      "Technical-Commercial Trade-offs",
      "Lifecycle & Risk",
    ],
    parallelNote: overlapNote,
    branchesLabel: "Selected work during this role",
    branches: [
      {
        label: "Digital Realty ST06",
        slug: "digital-realty-st06",
        datePrecision: "unspecified",
        kind: "professional",
      },
      {
        label: "KTH Living Lab",
        slug: "kth-living-lab",
        datePrecision: "unspecified",
        kind: "professional",
      },
      {
        label: "S:t Eriks Eye Center of Excellence",
        slug: "st-eriks",
        datePrecision: "unspecified",
        kind: "professional",
      },
      {
        label: "AstraZeneca",
        slug: "astrazeneca",
        datePrecision: "unspecified",
        kind: "professional",
      },
    ],
  },
  {
    id: "bsc-development",
    period: "Completed before Aug 2025",
    datePrecision: "phase",
    title: "Computer Science / Intelligent Systems",
    subtitle: "BSc — Specialisation in Intelligent Systems",
    org: "Mälardalen University",
    track: "development",
    stage: "Applied AI · Human-Centred Design · Research",
    summary:
      "Bachelor of Science in Computer Science with a specialisation in Intelligent Systems, developed alongside professional employment with periods of leave of absence for studies.",
    parallelNote: overlapNote,
    branchesLabel: "Development work",
    branches: [
      {
        label: "PLANE(ra)T Resande",
        slug: "planet-resande",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        kind: "academic",
      },
      {
        label: "Hållbar Hälsa",
        slug: "hallbar-halsa",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        kind: "academic",
      },
      {
        label: "Seeing AI — heuristic UX & accessibility evaluation",
        slug: "seeing-ai",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        kind: "academic",
        note: "Individual assignment",
      },
      {
        label: "Talking Systems",
        slug: "talking-systems",
        period: "2025",
        datePrecision: "verified-year",
        group: "2025 · Applied AI",
        kind: "academic",
      },
      {
        label: "48-Hour Wind Power Forecasting",
        slug: "wind-power-forecasting",
        period: "2025",
        datePrecision: "verified-year",
        group: "2025 · Bachelor thesis",
        kind: "academic",
      },
    ],
  },
  {
    id: "postgraduate",
    period: "Aug 2025 – Jul 2026",
    datePrecision: "verified-range",
    title: "Advanced AI · Innovation · Product Development",
    org: "Linköping · Umeå · Skövde · Blekinge Institute of Technology",
    track: "development",
    stage: "Product Management · Strategy · Advanced AI",
    summary:
      "Postgraduate development across advanced AI, Innovation Management, Industrial Economics, Product Management, Product & Portfolio Strategy, Requirements, Strategy & Business Models, Agile development and Leadership.",
    branchesLabel: "Study tracks and product work",
    branches: [
      {
        label: "Talking SCADA — from innovation opportunity to product case",
        slug: "talking-scada",
        datePrecision: "phase",
        group: "Product & requirements development",
        kind: "academic",
      },
      {
        label: "Multi-Agent AI decision support for smart building platforms",
        slug: "multi-agent-ai",
        datePrecision: "phase",
        group: "Product & requirements development",
        kind: "academic",
      },
    ],
  },
  {
    id: "now",
    datePrecision: "unspecified",
    title: "Product & AI Direction",
    track: "direction",
    summary:
      "A logical convergence of industrial domain depth, customer understanding, product thinking and applied AI.",
    roles: ["AI Product Manager", "AI Product Owner", "Offer Manager"],
    now: true,
  },
];

/** First-phase postgraduate subjects, rendered inside the postgraduate node. */
export const postgraduatePhases = [
  {
    title: "First phase",
    entries: [
      {
        title: "Natural Language Processing",
        org: "Linköping University",
        topics: ["Transformers", "Domain Adaptation", "PEFT", "LoRA"],
        relevance:
          "Understanding how modern language models can be adapted to domain-specific problems and how technical feasibility and limitations affect product choices.",
      },
      {
        title: "Autonomous Systems & Perception",
        org: "Umeå University",
        topics: [
          "Multi-Sensor Fusion",
          "3D Perception",
          "LiDAR",
          "Prediction",
          "Planning",
          "Reinforcement Learning",
        ],
        relevance:
          "System-level AI thinking around uncertainty, data quality, real-time decisions and safety.",
      },
      {
        title: "Advanced-Level Studies in Innovation Management",
        org: "University of Skövde · Aug 2025 – Jan 2026",
        topics: [
          "Strategic Innovation",
          "Applied Innovation",
          "Implementation",
          "Innovation Leadership",
        ],
        relevance: "Origin of the Talking SCADA product concept.",
      },
    ],
  },
  {
    title: "Industrial Economics, Product & Requirements Management",
    entries: [
      {
        title: "Product & Portfolio",
        org: "Blekinge Institute of Technology · Aug 2025 – Jun 2026",
        topics: [
          "Product Management",
          "Product Strategy",
          "Portfolio Strategy",
          "New Product Development",
          "MVP",
        ],
      },
      {
        title: "Requirements & Delivery",
        org: "Blekinge Institute of Technology",
        topics: [
          "Product Requirements",
          "Requirements Engineering",
          "Prioritisation",
          "Agile Process & Project Management",
        ],
      },
      {
        title: "Business & Strategy",
        org: "Blekinge Institute of Technology",
        topics: [
          "Industrial Economics",
          "Strategy & Business Models",
          "Value Proposition",
          "Go-to-Market",
        ],
      },
      {
        title: "Leadership",
        org: "Blekinge Institute of Technology",
        topics: ["Leadership", "Stakeholder Alignment"],
      },
    ],
  },
];

/** Talking SCADA continuity chain, rendered under the postgraduate node. */
export const talkingScadaChain = [
  "Innovation Opportunity",
  "Product Concept",
  "Product Discovery",
  "Requirements",
  "MVP",
  "Product Strategy",
  "Business Model",
  "Go-to-Market",
];

/** Project-specific role / focus statements. Never a generic parent entry. */
export const projectRoleContext: Record<
  string,
  { label: "My role" | "My focus"; body: string }
> = {
  "digital-realty-st06": {
    label: "My role",
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: technical discovery, architecture direction and end-to-end technical ownership in a mission-critical data-centre environment.",
  },
  "kth-living-lab": {
    label: "My role",
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: platform subject-matter expertise supporting applied smart-building research and data-driven experimentation.",
  },
  "st-eriks": {
    label: "My role",
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: solution direction and technical ownership for a unified HMI and edge-based architecture in a healthcare environment.",
  },
  astrazeneca: {
    label: "My role",
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: developed a customer-specific technical standard and supported engineers in applying it consistently across project delivery.",
  },
  "hvac-monitoring": {
    label: "My role",
    body: "Support Engineer / National Technical Expert, Schneider Electric: turned recurring operational HVAC needs into reusable monitoring, deviation-detection, alarm, trend and visualisation functionality.",
  },
  "wind-power-forecasting": {
    label: "My focus",
    body: "Framed the forecasting work around decision support under uncertainty, developed and evaluated the modelling pipeline using real wind and weather data, and explored how probabilistic forecasts could support planning, optimisation and flexibility scenarios.",
  },
  "talking-systems": {
    label: "My focus",
    body: "Explored the operational problem through discovery with testbed stakeholders and helped shape, prototype and validate an AI-enabled troubleshooting assistant combining machine data, technical documentation and natural-language guidance.",
  },
  "talking-scada": {
    label: "My focus",
    body: "Took an innovation opportunity through product discovery, requirements, MVP definition, product strategy and business-model thinking for AI-enabled SCADA/BMS operations.",
  },
  "multi-agent-ai": {
    label: "My focus",
    body: "Explored agentic AI as a reusable smart-building platform capability, connecting operator needs, data availability, technical feasibility and operational value.",
  },
  "planet-resande": {
    label: "My focus",
    body: "Team project in Interaction Design — ideation, paper prototyping, user testing and Figma design of a sustainable travel decision-support concept.",
  },
  "hallbar-halsa": {
    label: "My focus",
    body: "Team project in Interaction Design — concept design of an adaptive wellbeing service with attention to behaviour change, privacy, consent and ethics.",
  },
  "seeing-ai": {
    label: "My focus",
    body: "Individual assignment — heuristic UX and accessibility evaluation of Microsoft Seeing AI, focusing on perceptibility, operability, simplicity, consistency and auditory feedback.",
  },
};
