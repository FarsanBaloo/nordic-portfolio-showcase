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
  /** Open this role's evidence on load instead of behind the toggle. One
   *  milestone at most: the panel is a single open-at-a-time control, so a
   *  second one here would silently lose to whichever is read last. */
  roleEvidenceOpenByDefault?: boolean;
  childrenLabel?: string;
  children?: TimelineChild[];
  roles?: string[];
  now?: boolean;
  /** Render the rail node and this milestone's blocks, but not its own summary
   *  card. For a milestone whose children already state period, universities
   *  and subjects on their own cards, that card only repeats them. */
  hideOwnCard?: boolean;
  /** A milestone from the OTHER track that ran alongside this one, rendered in
   *  the empty opposite column of this row instead of in its own place in the
   *  sequence. Only for a real calendar overlap — it is a claim that the two
   *  were happening at the same time, and the layout states it more strongly
   *  than any sentence would. */
  parallelMilestoneId?: string;
  /** The stretch of a parallel milestone that came BEFORE the one it is drawn
   *  beside. Newest-first means down is earlier, so it renders at the FOOT of
   *  the parallel column — which is where those years actually belong. */
  preStudyNote?: { label: string; body: string };
  /** Render this milestone's own card INSIDE its child column, directly after
   *  the group with this title, instead of above the column. For a milestone
   *  whose children straddle it in time: the 2025 work belongs above a card
   *  anchored at 2023, and no grid row can put a card between two of its own
   *  groups. */
  cardAfterGroup?: string;
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
  body: "The Senior Technical Advisor role began in 2020 and ran full-time for three years before the Computer Science studies started in 2023; from then the two overlapped in calendar time, with some study periods undertaken during leave of absence.",
  /** Rendered directly UNDER the row with this id — reading newest-first, that
   *  is the position before the milestone it explains. Pointed at the degree
   *  while the degree came first; now that the role does, it names the role,
   *  so the band still lands between the two rather than below both. */
  beforeMilestoneId: "senior-advisor",
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
      "Ten years face to face with the people who run the systems — turning their needs into working platforms and standing beside them at go-live.",
    overviewBullets: [
      "Gathered operational needs from property managers, operations technicians, facility teams, project managers and end users, and turned them into implementation-ready system designs and configurations.",
      "Managed smaller customer projects and technical work packages, and held technical ownership of large-scale building-automation and integrated-control projects from design and programming through integration, testing, commissioning and operational handover.",
      "Acted as quality tester with R&D on the IoT building-automation platform, and mentored engineers on platform capabilities, integration patterns and scalable, maintainable solution design.",
    ],
    relevanceSignals: [
      "Customer Needs",
      "Requirements",
      "Project & Work-Package Ownership",
      "End-to-End Delivery",
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
      "National expert carrying the customer's recurring pains into product feedback, lifecycle decisions and release readiness.",
    overviewBullets: [
      "Owned the development of a reusable HVAC deviation-management capability for the market organisation — detection, alarms, logging and visualisation — turning operational data into actionable insight and enabling consistent deployment across customer systems.",
      "Turned recurring customer issues and real-world usage into structured product feedback and enhancement proposals justified on customer impact, business value and market needs, working with Product Owners, Global Product Support and R&D.",
      "Prioritised critical issues by operational impact, urgency and technical risk, performed root-cause analysis separating implementation problems from product defects, and supported release validation, deployment readiness and controlled rollout.",
    ],
    relevanceSignals: [
      "Capability Ownership",
      "Customer Insight",
      "Product Feedback",
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
    id: "bsc-development",
    // Anchored where it began. It stood beside the advisor role for a while,
    // which is true — but two cards of equal weight on one row read as two
    // equal claims, and at that point in the scroll the professional role is
    // the one a reader is following. The overlap is still stated, once, on the
    // bridge band above this card and on the role's own foot note.
    railMarker: { label: "2023", kind: "major", verified: true },
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
    cardAfterGroup: "2025 · Applied AI",
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
        // One card for the coursework, courses first. Interaction Design is a
        // course like the other five and was standing in a box of its own; the
        // group label had to widen with it, because design is neither AI nor
        // software engineering.
        kind: "topics",
        title:
          "Artificial Intelligence 1 & 2 · Advanced Machine Learning · Deep Learning · Software Engineering for AI · Interaction Design",
        university: "Mälardalen University",
        variant: "compact",
        topics: [],
        signals: [
          "AI Methods",
          "Machine Learning",
          "Deep Learning",
          "AI Lifecycle",
          "User Research",
          "Figma Prototyping",
          "Usability Validation",
        ],
        body: "AI methods and reasoning, modelling and evaluation, neural networks and model training, and the engineering practice of building and maintaining AI systems.",
        body2: "Human-centred design worked end to end: user research and ideation, wireframes developed into high-fidelity prototypes in Figma, and evaluation of finished products through heuristic and accessibility review with usability validation against real users.",
        group: "Selected AI, software engineering and design coursework",
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
      "Where customer, technology and business meet — leading discovery and the trade-offs behind feasible, scalable solutions.",
    overviewBullets: [
      "Led customer-facing technical discovery and translated customer, operational and project needs into structured requirements, alternative architectures and product / solution options.",
      "Held end-to-end technical ownership and influenced prioritisation, product selection and architectural trade-offs, balancing customer value, technical feasibility, lifecycle risk, cost and commercial value.",
      "Delivered mission-critical platform integrations across data-centre, pharmaceutical and healthcare environments — including consolidation into a unified HMI and edge-based architecture — and contributed domain expertise in KTH Living Lab.",
    ],
    relevanceSignals: [
      "Customer Discovery",
      "Requirements",
      "Product / Solution Options",
      "Technical-Commercial Trade-offs",
      "Mission-Critical Delivery",
    ],

    // Full-time for three years before the degree began. Without this the two
    // cards standing side by side read as parallel from 2020.
    preStudyNote: {
      label: "2020–2023 · before the degree studies",
      body: "Three years full-time in this role before the Computer Science studies began in 2023; from 2023 the degree ran alongside it, with periods of leave of absence.",
    },
    childrenLabel: "Selected work during this role",
    children: [
      // Newest first, by the year each ended — the same axis the whole page
      // reads on. They render two-up, so the pair on each row is a step back
      // in time from the pair above it.
      { kind: "project", slug: "kth-living-lab", period: "2020–2023", datePrecision: "verified-range" },
      { kind: "project", slug: "astrazeneca", period: "2020–2023", datePrecision: "verified-range" },
      { kind: "project", slug: "digital-realty-st06", period: "2021–2022", datePrecision: "verified-range" },
      { kind: "project", slug: "st-eriks", period: "2020–2021", datePrecision: "verified-range" },
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
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: led customer-facing discovery inside an operating theatre and translated the real workflow into a tailored, unified HMI on an edge architecture. End-to-end technical ownership — requirements, solution direction and integration of lighting, HVAC, CCTV, door-lock interlocks and microscope-video routing — proven in one theatre and then rolled out to the rest in a mission-critical healthcare environment.",
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
