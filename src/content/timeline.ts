import { examenPhoto } from "../assets/local-images";

export type TimelineTrack = "professional" | "development" | "direction";

/** How precise the underlying date information actually is. Anything that is
 *  not verified must never be rendered as a concrete month span. */
export type DatePrecision =
  | "verified-range"
  | "verified-year"
  | "phase"
  | "unspecified";

/** A child item rendered on the opposite side of its parent milestone. */
export type TimelineChild =
  | {
      kind: "project";
      slug: string;
      /** Only set when the date is verified. Never generated automatically. */
      period?: string;
      datePrecision: DatePrecision;
      group?: string;
      note?: string;
      /** Marks a project that spans more than one study phase. */
      continuityLabel?: string;
      continuityChain?: string[];
      /** Renders the project as a continuous, parallel case track. */
      caseTrack?: boolean;
      /** Short relationship notes tying studies to the case. */
      caseNotes?: string[];
    }
  | {
      kind: "course";
      title: string;
      /** University name, rendered above the formal study title. */
      university?: string;
      /** Full formal programme / study title. */
      formalTitle?: string;
      org?: string;
      /** Academic level, only when verified (e.g. "Second cycle"). */
      level?: string;
      topics: string[];
      /** Short capability signals shown on compact course cards. */
      signals?: string[];
      /** Compact cards omit long descriptions. */
      variant?: "compact";
      body?: string;
      body2?: string;
      relevance?: string;
      /** How this course contributed to the Talking SCADA product case. */
      scadaLink?: string;
      /** Small vertical progression chain rendered under the card. */
      chain?: string[];
      group?: string;
    }
  | {
      kind: "topics";
      title: string;
      university?: string;
      formalTitle?: string;
      org?: string;
      level?: string;
      topics: string[];
      signals?: string[];
      variant?: "compact";
      body?: string;
      body2?: string;
      relevance?: string;
      scadaLink?: string;
      chain?: string[];
      group?: string;
    };

/** Explicit, verified label rendered next to a node on the central rail.
 *  Never derived from period strings or scroll position. */
export type RailMarker = {
  label: string;
  kind: "major" | "phase" | "minor";
  verified: true;
};

export type TimelineMilestone = {
  id: string;
  period?: string;
  datePrecision: DatePrecision;
  /** Only present when the chronology point is verified. */
  railMarker?: RailMarker;
  title: string;
  subtitle?: string;
  org?: string;
  /** University name for academic milestones. */
  university?: string;
  /** Full formal degree / programme title. */
  formalTitle?: string;
  /** Secondary descriptor shown under the formal title. */
  degreeDescriptor?: string;
  /** Optional documentary photo shown inside the milestone card. */
  image?: { src: string; alt: string; caption: string };


  track: TimelineTrack;
  stage?: string;
  summary: string;
  /** Three product / offer relevant evidence bullets shown collapsed. */
  overviewBullets?: string[];
  relevanceSignals?: string[];
  /** Ties into the inline evidence drawer content in experience.ts */
  roleId?: string;
  childrenLabel?: string;
  children?: TimelineChild[];
  roles?: string[];
  now?: boolean;
  /** Render the rail node and this milestone's blocks, but not its own summary
   *  card. For a milestone whose children already state period, universities
   *  and subjects on their own cards, that card only repeats them. */
  hideOwnCard?: boolean;
};

/** Shown once, at the boundary between the two phases of the postgraduate
 *  period. They are one progression — a technical foundation and then the
 *  move from technology to product — not two separate identities that
 *  happen to share a page. It needs no milestone anchor: the phases live
 *  inside one milestone, so the boundary is a place in the layout. */
export const studyProgression = {
  label: "From technology to product",
  body: "Combining a technical foundation in applied AI with product management and industrial economics, to work at the intersection of technology, business and users.",
};

/** Shown once, as a centered bridge between the two tracks. */
export const parallelBridge = {
  label: "Parallel professional & academic development",
  body: "Professional and academic development overlapped in calendar time; some study periods were undertaken during leave of absence from the professional role.",
  /** Rendered immediately before this milestone id. */
  beforeMilestoneId: "bsc-development",
};

export const milestones: TimelineMilestone[] = [
  {
    id: "project-engineer",
    railMarker: { label: "2003", kind: "major", verified: true },
    period: "2003–2013",
    datePrecision: "verified-range",
    title: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    track: "professional",
    roleId: "project-engineer",
    stage: "Customer Needs · Requirements · Delivery Reality",
    summary:
      "Customer-facing engineering and digital-platform delivery, translating real customer and operational needs into workable system designs and taking technical responsibility through implementation and operational handover.",
    overviewBullets: [
      "Worked directly with customers, end users and operations teams to understand needs, workflows and operational constraints, translating them into implementation-ready requirements and system designs.",
      "Held end-to-end technical responsibility from solution design and programming through integration, commissioning, testing and operational handover, building strong judgement around feasibility, usability, reliability and maintainability.",
      "Used delivery experience and QA findings to improve platform quality, integration patterns and maintainable solution design.",
    ],
    relevanceSignals: [
      "Customer Needs",
      "Requirements",
      "End-to-End Delivery",
      "Technical Feasibility",
      "Platform Quality",
    ],
  },
  {
    id: "national-expert",
    railMarker: { label: "2013", kind: "major", verified: true },
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
      "Translated recurring customer and field issues into structured product feedback, enhancement proposals and usability improvements, considering customer impact, market needs and business value.",
      "Worked close to the product lifecycle through QA testing, release validation, defect identification and deployment / release readiness, evaluating new and changed functionality from a real-world customer perspective.",
      "Connected national platform expertise and customer insight with technical feasibility to support product quality, adoption readiness and roadmap-relevant improvement decisions.",
    ],
    relevanceSignals: [
      "Customer Insight",
      "Product Feedback",
      "Product Lifecycle",
      "Release Readiness",
      "Enhancement Proposals",
    ],
    childrenLabel: "Selected product / platform capability",
    children: [
      {
        kind: "project",
        slug: "hvac-monitoring",
        datePrecision: "unspecified",
      },
    ],
  },
  {
    id: "senior-advisor",
    railMarker: { label: "2020", kind: "major", verified: true },
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
      "Held end-to-end technical ownership and influenced prioritisation, product selection and architectural trade-offs to reduce delivery and lifecycle risk and shape feasible, scalable outcomes.",
    ],
    relevanceSignals: [
      "Customer Discovery",
      "Requirements",
      "Product / Solution Options",
      "Technical-Commercial Trade-offs",
      "Lifecycle & Risk",
    ],
    childrenLabel: "Selected work during this role",
    children: [
      { kind: "project", slug: "kth-living-lab", datePrecision: "unspecified" },
      { kind: "project", slug: "digital-realty-st06", datePrecision: "unspecified" },
      { kind: "project", slug: "st-eriks", datePrecision: "unspecified" },
      { kind: "project", slug: "astrazeneca", datePrecision: "unspecified" },
    ],
  },
  {
    id: "bsc-development",
    railMarker: { label: "2025", kind: "major", verified: true },
    period: "2023–2025",
    datePrecision: "verified-range",
    title: "Computer Science / Intelligent Systems",
    university: "Mälardalen University",
    formalTitle:
      "Degree of Bachelor of Science in Computer Science with Specialization in Intelligent Systems",
    degreeDescriptor: "B.Sc. in Computer Science · Applied Artificial Intelligence",
    image: {
      src: examenPhoto.url,
      alt: "Rickard Sörlin with thesis colleagues and examiners at Mälardalen University",
      caption: "Degree project completed — Mälardalen University",
    },


    track: "development",
    stage: "Applied AI · Human-Centred Design · Research",
    summary:
      "Bachelor of Science in Computer Science with a specialisation in Intelligent Systems, developed alongside professional employment with periods of leave of absence for studies.",
    childrenLabel: "Development work",
    children: [
      {
        kind: "project",
        slug: "wind-power-forecasting",
        period: "2025",
        datePrecision: "verified-year",
        group: "2025 · Bachelor thesis",
      },
      {
        kind: "project",
        slug: "talking-systems",
        period: "2025",
        datePrecision: "verified-year",
        group: "2025 · Applied AI",
      },
      {
        kind: "project",
        slug: "seeing-ai",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        note: "Individual assignment",
      },
      {
        kind: "project",
        slug: "hallbar-halsa",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        note: "Team project",
      },
      {
        kind: "project",
        slug: "planet-resande",
        period: "2024",
        datePrecision: "verified-year",
        group: "2024 · Interaction Design",
        note: "Team project",
      },
      {
        kind: "course",
        title: "Software Engineering for AI",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: ["AI System Development", "Technical Feasibility", "AI Lifecycle"],
        group: "Selected AI & software engineering coursework",
      },
      {
        kind: "course",
        title: "Deep Learning",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: ["Neural Networks", "Model Training", "Applied Deep Learning"],
        group: "Selected AI & software engineering coursework",
      },
      {
        kind: "course",
        title: "Advanced Machine Learning",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: ["Machine Learning", "Modelling", "Evaluation"],
        group: "Selected AI & software engineering coursework",
      },
      {
        kind: "course",
        title: "Artificial Intelligence 2",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: ["Advanced AI Methods", "Reasoning", "Applied AI"],
        group: "Selected AI & software engineering coursework",
      },
      {
        kind: "course",
        title: "Artificial Intelligence 1",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: ["AI Methods", "Problem Solving", "Intelligent Systems"],
        group: "Selected AI & software engineering coursework",
      },
    ],
  },
  {
    id: "postgraduate",
    railMarker: { label: "AUG 2025", kind: "phase", verified: true },
    hideOwnCard: true,
    period: "Aug 2025 – Jul 2026",
    datePrecision: "verified-range",
    title: "Advanced AI · Innovation · Product Development",
    org: "Linköping · Umeå · Skövde · Blekinge Institute of Technology",
    track: "development",
    stage: "Product Management · Strategy · Advanced AI",
    summary:
      "A coordinated postgraduate development period across several universities, covering advanced artificial intelligence, Innovation Management, Industrial Economics, Product Management, Product & Requirements Management, Strategy & Business Models, Agile Process & Project Management and Leadership.",
    childrenLabel: "Universities, formal studies and product work",
    children: [
      {
        kind: "topics",
        title: "Industrial Economics, Product & Requirements Management",
        university: "Blekinge Institute of Technology",
        formalTitle:
          "Advanced-Level Specialization in Industrial Economics, Product & Requirements Management",
        org: "Aug 2025 – Jun 2026",
        topics: [],
        body: "Building on the technical AI and innovation foundation, this specialisation focuses on how customer needs and technology opportunities become viable products, requirements, business models and sustainable value.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Product Management",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "New Product Development",
          "Opportunity Identification",
          "Product Discovery",
          "Product Vision",
          "Feature Prioritisation",
          "MVP Definition",
        ],
        scadaLink:
          "Talking SCADA: opportunity identification, product discovery, concept development, product vision, value proposition, feature prioritisation and MVP definition.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Product and Requirements Management for Digital Environments",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "Product Requirements Document",
          "System-Level Requirements",
          "Functional & Non-Functional Requirements",
          "Explainability",
          "Reliability",
          "Requirements Prioritisation",
          "Technical Feasibility",
        ],
        scadaLink:
          "Talking SCADA: PRD, system-level, functional and non-functional requirements including explainability and reliability, requirements prioritisation and technical feasibility.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Strategy and Business Models in Technology-Intensive Businesses",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "Product Strategy",
          "Value Proposition",
          "Business Model Development",
          "Market Relevance",
          "Go-to-Market Planning",
        ],
        scadaLink:
          "Talking SCADA: product strategy, value proposition, business model development, market relevance and go-to-market planning.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Leadership in High-Technology and Knowledge-Intensive Organizations",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: ["Stakeholder Alignment", "Communication", "Cross-Functional Perspective"],
        scadaLink:
          "Talking SCADA: stakeholder alignment, communication and a cross-functional perspective on the concept.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Agile Process and Project Management",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "Iterative Concept Refinement",
          "MVP Planning",
          "Product Development Governance",
          "Development Planning",
          "Prioritisation / Delivery Thinking",
        ],
        scadaLink:
          "Talking SCADA: iterative concept refinement, MVP planning, development planning and product development governance.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Industrial Economics and Management",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: ["Business Value", "Technology / Business Perspective", "Sustainable Value"],
        scadaLink:
          "Talking SCADA: framed the concept in terms of business value and sustainable value from a combined technology and business perspective.",
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Innovation Management",
        university: "University of Skövde",
        formalTitle: "Advanced-Level Studies in Innovation Management",
        org: "Aug 2025 – Jan 2026",
        topics: ["Strategic Innovation", "Applied Innovation", "Implementation"],
        body: "Focused on strategic innovation, applied innovation processes, implementation and innovation leadership. Studied in parallel with the advanced AI foundation, forming the innovation and product bridge developed further at Blekinge Institute of Technology.",
        body2:
          "Talking SCADA — Concept Origin: developed the initial concept for Talking SCADA, exploring how AI and existing operational data from building systems could transform complex system information into understandable insights and decision support for facility managers and operators. The work established the innovation opportunity and concept foundation that was later developed further through Product Management and Requirements work.",
        chain: [
          "Advanced AI",
          "Innovation Opportunity",
          "Talking SCADA — Initial Concept",
          "Product / Requirements Development",
        ],
        group:
          "Phase 2 · Aug 2025 – Jun 2026 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Natural Language Processing",
        university: "Linköping University",
        formalTitle:
          "Advanced-Level Studies in Artificial Intelligence: Natural Language Processing",
        org: "Aug 2025 – Jan 2026",
        topics: [
          "Natural Language Processing",
          "Transformers",
          "Domain Adaptation",
          "PEFT / LoRA",
          "Generative AI / Language Models",
        ],
        body: "Advanced-level studies covering Natural Language Processing, transformer architectures, domain adaptation, sentiment classification and PyTorch-based model implementation, with emphasis on adapting transformer models to domain-specific tasks using Parameter-Efficient Fine-Tuning (PEFT) and Low-Rank Adaptation (LoRA).",
        relevance:
          "Strengthened the ability to evaluate how modern language models can be adapted to domain-specific problems and how model capabilities, limitations and technical feasibility affect product decisions.",
        group: "Phase 1 · Aug 2025 – Jun 2026 · Advanced AI Foundation",
      },
      {
        kind: "course",
        title: "Autonomous Systems & Perception",
        university: "Umeå University",
        formalTitle:
          "Advanced-Level Studies in Artificial Intelligence: Autonomous Systems & Perception",
        org: "Jan 2026 – Jun 2026",
        topics: [
          "Multi-Sensor Fusion",
          "3D Perception",
          "LiDAR",
          "Prediction",
          "Planning",
          "Reinforcement Learning",
        ],
        body: "Advanced-level studies in autonomous systems and machine perception, covering multi-sensor fusion, 3D perception, Bird's-Eye View representations, LiDAR point-cloud processing, object detection, trajectory and motion forecasting, path planning and reinforcement learning for adaptive control.",
        body2:
          "Explored how perception, prediction, planning and control are integrated to enable data-driven intelligent systems to interpret dynamic environments and support real-time decision-making.",
        relevance:
          "Built system-level understanding of AI around uncertainty, data quality, sensor limitations, real-time decisions and safety.",
        group: "Phase 1 · Aug 2025 – Jun 2026 · Advanced AI Foundation",
      },
      {
        kind: "course",
        title: "Predictive Data Analytics",
        university: "Mälardalen University",
        formalTitle: "Predictive Data Analytics",
        org: "Completed Nov 2025",
        level: "Second cycle",
        variant: "compact",
        topics: [],
        signals: ["Predictive Analytics", "Machine Learning", "Prediction", "Decision Support"],
        group: "Phase 1 · Aug 2025 – Jun 2026 · Advanced AI Foundation",
      },
      {
        kind: "course",
        title: "Deep Learning for Industrial Imaging",
        university: "Mälardalen University",
        formalTitle: "Deep Learning for Industrial Imaging",
        org: "Completed Dec 2025",
        level: "Second cycle",
        variant: "compact",
        topics: [],
        signals: ["Deep Learning", "Computer Vision", "Industrial Imaging", "Industrial AI"],
        group: "Phase 1 · Aug 2025 – Jun 2026 · Advanced AI Foundation",
      },
      {
        kind: "project",
        slug: "talking-scada",
        datePrecision: "phase",
        group: "Continuous product case",
        caseTrack: true,
        note: "Academic Project — Product Management & AI Concept Development · Blekinge Institute of Technology · Aug 2025 – May 2026",
        continuityLabel: "From innovation concept to AI-enabled product case",
        caseNotes: [
          "Phase 1 AI studies strengthened the technical understanding behind the language-based interaction and AI feasibility considerations in Talking SCADA.",
          "Innovation Management (University of Skövde) contributed the innovation opportunity, problem framing and initial product concept.",
          "The Blekinge courses contributed product discovery, requirements, strategy, business model, agile delivery thinking and stakeholder communication.",
        ],
        continuityChain: [
          "Innovation Opportunity",
          "Initial Concept",
          "AI / Language Interaction Feasibility",
          "Product Discovery",
          "Product Vision",
          "Value Proposition",
          "Stakeholder Analysis",
          "PRD & Requirements",
          "Prioritisation",
          "Conceptual MVP",
          "Validation Approach",
          "Product Strategy",
          "Business Model",
          "Market Relevance",
          "Go-to-Market",
          "Technical Feasibility",
          "Adoption Considerations",
        ],
      },
      {
        kind: "project",
        slug: "multi-agent-ai",
        datePrecision: "phase",
        group: "AI platform / product concept",
      },
    ],

  },
  {
    id: "now",
    railMarker: { label: "NOW", kind: "major", verified: true },
    datePrecision: "unspecified",
    title: "Product & AI Direction",
    track: "direction",
    summary:
      "Bringing together industrial domain expertise, customer understanding, digital-platform experience, technical-commercial judgement, Product Management capabilities and applied AI.",
    roles: ["AI Product Manager", "AI Product Owner", "Offer Manager"],
    now: true,
  },
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
