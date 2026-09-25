import { examenPhoto } from "../assets/local-images";
import { advancedAiFoundationIntro, courseApplications } from "./course-applications";

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
      applicationHeading?: string;
      applicationItems?: string[];
      groupIntro?: string;
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
      applicationHeading?: string;
      applicationItems?: string[];
      groupIntro?: string;
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
  /** A quieter card treatment for supporting development milestones. */
  presentation?: "secondary";
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
  body: "The Senior Technical Advisor role began in 2020. From 2023, Computer Science and AI studies developed alongside the professional role, adding formal AI, software and human-centred design capabilities to extensive industrial experience.",
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
      "Ten years face to face with the people who run the systems — turning their needs into working solutions and standing beside them at go-live.",
    overviewBullets: [
      "Gathered needs from property managers, technicians, facility teams and end users, and turned them into implementation-ready designs.",
      "Held technical ownership of large building-automation projects — from design through integration, testing and handover — and managed smaller projects end to end.",
      "Quality-tested the IoT building-automation platform with R&D and mentored engineers in scalable, maintainable solution design.",
    ],
    relevanceSignals: [
      "Customer Needs",
      "Requirements",
      "Project Ownership",
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
      "National expert turning customers' recurring pains into product feedback, lifecycle decisions and release readiness.",
    overviewBullets: [
      "Owned a reusable HVAC deviation-management capability — detection, alarms, logging and visualisation — turning operational data into actionable insight across customer systems.",
      "Turned recurring customer issues into structured product feedback and enhancement proposals with Product Owners, Global Product Support and R&D — justified by customer impact and business value.",
      "Prioritised critical issues by impact and risk, separated implementation problems from product defects, and supported release validation and controlled rollout.",
    ],
    relevanceSignals: [
      "Capability Ownership",
      "Customer Insight",
      "Product Feedback",
      "Prioritisation",
      "Release Readiness",
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
    title: "B.Sc. Computer Science — Intelligent Systems",
    university: "Mälardalen University",
    formalTitle:
      "Degree of Bachelor of Science in Computer Science with Specialization in Intelligent Systems",
    degreeDescriptor: "AI / Computer Science focus",
    image: {
      src: examenPhoto.url,
      alt: "Rickard Sörlin with thesis colleagues and examiners at Mälardalen University",
      caption: "Degree project completed — Mälardalen University",
    },


    track: "development",
    stage: "Applied AI · Human-Centred Design · Research",
    summary:
      "Formal capability in artificial intelligence, software engineering and human-centred design, built on extensive industrial experience.",
    presentation: "secondary",
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
        applicationItems: courseApplications.bachelorCoursework,
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
      "Led customer-facing discovery — turned operational needs into requirements, alternative architectures and solution options, presented to management, sales and customers.",
      "Held end-to-end technical ownership of mission-critical data-centre, pharmaceutical and healthcare deliveries — weighing customer value, feasibility, lifecycle risk, cost and commercial value.",
      "Represented Schneider Electric at KTH Live-In Lab as EcoStruxure Building Operation expert, and led across teams through influence and mentoring rather than formal authority.",
    ],
    relevanceSignals: [
      "Customer Discovery",
      "Solution Options",
      "Technical-Commercial Trade-offs",
      "Mission-Critical Delivery",
      "Stakeholder Alignment",
    ],
    

    childrenLabel: "Selected work during this role",
    children: [
      // Newest first, by the year each ended — the same axis the whole page
      // reads on. They render two-up, so the pair on each row is a step back
      // in time from the pair above it.
      { kind: "project", slug: "kth-living-lab", period: "2020–2023", datePrecision: "verified-range" },
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
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Product Management",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "New Product Development (NPD)",
          "Product Requirements Document (PRD)",
          "Commercialisation Planning",
          "Product Life Cycle",
          "Opportunity Identification",
          "Product Discovery",
          "Product Vision",
          "Feature Prioritisation",
          "MVP Definition",
        ],
        applicationItems: courseApplications.productManagement,
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Product and Requirements Management for Digital Environments",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: [
          "System Requirements Document (SRD)",
          "Requirements Traceability",
          "Cost-Value-Risk",
          "System-Level Requirements",
          "Functional & Non-Functional Requirements",
          "Explainability",
          "Reliability",
          "Requirements Prioritisation",
          "Technical Feasibility",
        ],
        applicationItems: courseApplications.requirementsManagement,
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
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
        applicationItems: courseApplications.strategyBusinessModels,
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Leadership in High-Technology and Knowledge-Intensive Organizations",
        university: "Blekinge Institute of Technology",
        variant: "compact",
        topics: [],
        signals: ["Stakeholder Alignment", "Communication", "Cross-Functional Perspective"],
        applicationItems: courseApplications.leadership,
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
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
        applicationItems: courseApplications.agile,
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
      },
      {
        kind: "course",
        title: "Innovation Management",
        university: "University of Skövde",
        formalTitle: "Advanced-Level Studies in Innovation Management",
        org: "Aug 2025 – Jan 2026",
        topics: ["Strategic Innovation", "Applied Innovation", "Implementation"],
        body: "Focused on strategic innovation, applied innovation processes, implementation and innovation leadership. Studied in parallel with the advanced AI foundation, forming the innovation and product bridge developed further at Blekinge Institute of Technology.",
        applicationHeading: "Talking SCADA — concept origin in Innovation in Practice",
        applicationItems: courseApplications.innovation,
        chain: [
          "Domain experience & applied AI",
          "Innovation in Practice — initial concept",
          "Product & requirements development",
          "Business & commercialisation planning",
        ],
        group: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
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
        applicationItems: courseApplications.nlp,
        groupIntro: advancedAiFoundationIntro,
        group: "Phase 1 · Advanced AI Foundation",
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
        applicationItems: courseApplications.autonomousSystems,
        group: "Phase 1 · Advanced AI Foundation",
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
        applicationItems: courseApplications.predictiveAnalytics,
        group: "Phase 1 · Advanced AI Foundation",
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
        applicationItems: courseApplications.industrialImaging,
        group: "Phase 1 · Advanced AI Foundation",
      },
      {
        kind: "project",
        slug: "talking-scada",
        datePrecision: "phase",
        group: "Continuous product case",
        caseTrack: true,
      },
    ],
  },
  {
    id: "nordic-technical-support-expert",
    railMarker: { label: "2026", kind: "major", verified: true },
    period: "2026–Present",
    datePrecision: "verified-range",
    title: "Nordic Technical Support Expert",
    subtitle: "Building Management Systems",
    org: "Schneider Electric",
    track: "professional",
    roleId: "nordic-technical-support-expert",
    stage: "Nordic Customer Insight · Platform Quality · Prioritisation",
    summary:
      "Nordic responsibility connecting complex customer and partner needs with platform quality, R&D collaboration and prioritisation for EcoStruxure Building Operation and its edge-controller ecosystem.",
    overviewBullets: [
      "Own the largest, most strategic VIP customers — technical depth, clear communication and an understanding of their operations.",
      "Turn recurring Nordic field cases into structured product feedback and enhancement proposals for EcoStruxure Building Operation and its edge IoT ecosystem — prioritised with R&D by customer impact, technical risk and business relevance.",
      "Mentor Level 2 advanced support engineers across the Nordic region through guidance, knowledge sharing and escalation.",
    ],
    relevanceSignals: [
      "Nordic Market Insight",
      "Product Feedback & Enhancement Proposals",
      "Prioritisation with R&D",
      "Strategic Customers",
      "Mentoring",
    ],
  },
  {
    id: "now",
    railMarker: { label: "NOW", kind: "major", verified: true },
    datePrecision: "unspecified",
    title: "Product & AI Direction",
    track: "direction",
    summary:
      "20+ years of customer and platform experience, combined with product discovery, strategy and applied AI — to shape products that are useful, feasible and viable.",
    roles: ["AI Product Manager", "Product Manager", "Product Owner", "Offer Manager"],
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
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: Schneider's contact at KTH Live-In Lab and EcoStruxure Building Operation subject matter expert — supporting KTH researchers with technical questions and engineering for their research on sustainable buildings and energy efficiency.",
  },
  "st-eriks": {
    label: "My role",
    body: "Senior Technical Advisor — Digital Platforms, Schneider Electric: led customer-facing discovery inside an operating theatre and translated the real workflow into a tailored, unified HMI on an edge architecture. End-to-end technical ownership — requirements, solution direction and integration of lighting, HVAC, CCTV, door-lock interlocks and microscope-video routing — proven in one theatre and then rolled out to the rest in a mission-critical healthcare environment.",
  },
  "hvac-monitoring": {
    label: "My role",
    body: "Support Engineer / National Technical Expert, Schneider Electric: owned development of a reusable HVAC monitoring and deviation-management digital product, sold to customers through the market organisation.",
  },
  "wind-power-forecasting": {
    label: "My focus",
    body: "Co-authored the thesis with Fredrik Karlsson within an interdisciplinary Mälardalen University and Electrification Hub initiative. Developed and evaluated the wind-power forecasting pipeline for SE1 and SE3, with a focus on decision support under uncertainty.",
  },
  "talking-systems": {
    label: "My focus",
    body: "Drove the project from the operational problem, not the technology: led discovery with system owners and testbed operators, identified specialist dependency as the core pain point, defined the AI-assistant concept around explainability and self-service, and validated it with non-specialist users in a smart-factory testbed.",
  },
  "talking-scada": {
    label: "My focus",
    body: "Took an innovation opportunity — letting a building explain its hidden energy waste in plain language — through product discovery, requirements, MVP definition, product strategy and business-model thinking for AI-enabled SCADA/BMS operations.",
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
