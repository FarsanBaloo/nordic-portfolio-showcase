import {
  talkingSystemsTeam,
  talkingSystemsTestbed,
  talkingSystemsUi,
  talkingSystemsConcept,
  talkingSystemsDemo,
  talkingSystemsWorkshop,
  talkingSystemsStand,
  talkingSystemsMitcEvent,
  aiConnectedCity,
  thesisPresentation,
  planetWhiteboard,
  planetPaperPrototypes,
  planetWorkshop,
  hallbarHalsaDashboard,
  hallbarHalsaOnboarding,
  hallbarHalsaFlow,
} from "../assets/local-images";

export type ImageSlot = {
  caption: string;
  aspect: "16/9" | "4/3" | "3/4" | "9/16" | "1/1";
  note?: string;
  src?: string;
  alt?: string;
  /** Preferred thumbnail for timeline cards */
  lead?: boolean;
};


export type CaseSection = {
  heading: string;
  body?: string[];
  items?: string[];
  quote?: string;
};

export type ProjectCategory =
  | "Industry"
  | "AI & Product"
  | "UX & Interaction"
  | "Academic / Research"
  | "Innovation";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  org: string;
  meta: string;
  type: string;
  year?: string;
  priority: number;
  flagship: boolean;
  categories: ProjectCategory[];
  teaser: string;
  tags: string[];
  highlight?: string;
  sections: CaseSection[];
  flow?: { label: string; steps: string[] };
  metrics?: { label: string; value: string; note?: string }[];
  images?: { intro?: string; slots: ImageSlot[] };
  links?: { label: string; href: string }[];
  reflection?: string;
  contributionNote?: string;
};

export const projects: Project[] = [
  {
    slug: "talking-systems",
    title: "Talking Systems",
    subtitle: "When AI Starts Understanding Industrial Machines",
    org: "Mälardalen University · Mälardalen Industrial Technology Center (MITC)",
    meta: "2025",
    type: "Applied Industrial AI · Product Discovery",
    year: "2025",
    priority: 1,
    flagship: true,
    categories: ["AI & Product", "Academic / Research", "Innovation"],
    teaser:
      "A proof-of-concept AI assistant that explains industrial machine behaviour in natural language, validated with non-specialist users in a smart-factory testbed.",
    highlight:
      "What if industrial systems could explain themselves in natural language instead of cryptic error codes?",
    tags: [
      "Industrial AI",
      "Generative AI",
      "Product Discovery",
      "RAG",
      "LangChain",
      "OPC UA",
      "Siemens S7 PLC",
      "IT/OT Integration",
      "Edge",
      "Vector Search",
      "User Validation",
    ],
    sections: [
      {
        heading: "Opportunity",
        body: [
          "Industrial operators often depend on specialists to interpret alarms, error codes and technical documentation, resulting in delayed troubleshooting and unnecessary dependency on specialist support.",
        ],
      },
      {
        heading: "Discovery",
        quote: "The project started with the operational problem, not with the AI technology.",
        items: [
          "Interviewed system owners and testbed operators",
          "Studied incident and troubleshooting workflows",
          "Identified operational constraints and pain points",
          "Identified specialist dependency",
          "Identified that significant machine data existed but lacked contextual explanation",
          "Defined the AI-assistant concept around explainability and self-service",
        ],
      },
      {
        heading: "Solution",
        body: [
          "Designed and developed a proof-of-concept AI assistant combining industrial machine data with domain knowledge and technical documentation to provide natural-language guidance.",
          "Edge deployment kept industrial data on-site.",
        ],
        items: [
          "Retrieval-Augmented Generation",
          "LangChain",
          "OPC UA",
          "Siemens S7 PLC",
          "Vector search over technical documentation",
          "Live machine data",
          "Edge deployment",
        ],
      },
      {
        heading: "Capabilities",
        items: [
          "Root-cause explanations",
          "Step-by-step resolution",
          "Interactive maintenance guidance",
          "Natural-language alarm explanation",
          "Contextual technical information",
        ],
      },
      {
        heading: "Validation",
        body: [
          "Evaluated in the FESTO CP-Factory smart-factory testbed together with MITC partners.",
          "User testing demonstrated that non-specialist users could successfully work through incidents using the AI assistant without waiting for specialist support.",
        ],
      },
      {
        heading: "Potential business value",
        body: ["The concept demonstrated potential to:"],
        items: [
          "Reduce troubleshooting time",
          "Reduce downtime exposure",
          "Improve first-line support",
          "Make specialist knowledge accessible at the point of operation",
          "Improve support scalability",
        ],
      },
      {
        heading: "Product perspective",
        body: [
          "The architecture was not limited to one troubleshooting scenario. The same combination of operational data, domain knowledge and AI assistance could support multiple reusable product capabilities.",
        ],
        items: [
          "AI-powered technical support",
          "Maintenance decision support",
          "Field service",
          "Operational knowledge assistance",
          "Product selection",
          "Sales enablement",
        ],
      },
    ],
    flow: {
      label: "From problem to product opportunity",
      steps: [
        "Operational Problem",
        "Discovery",
        "AI Capability",
        "Validation",
        "Reusable Product Opportunities",
      ],
    },
    images: {
      slots: [
        {
          caption: "The project team at the smart-factory testbed, with the assistant running",
          aspect: "4/3",
          src: talkingSystemsTeam.url,
          alt: "Four people standing in front of a large display running the Talking Systems assistant at the testbed",
          lead: true,
        },
        {
          caption: "The assistant running on the testbed display at MITC",
          aspect: "16/9",
          src: talkingSystemsTestbed.url,
          alt: "Large screen showing the Talking Systems assistant answering a question about the production line",
        },
        {
          caption: "Assistant interface — alarm guide answer",
          aspect: "4/3",
          src: talkingSystemsUi.url,
          alt: "Assistant interface explaining an emergency-stop alarm in plain language",
        },
        {
          caption: "Concept framing — the scenario behind the assistant",
          aspect: "16/9",
          src: talkingSystemsConcept.url,
          alt: "Presentation slide framing the industrial troubleshooting scenario",
        },
        {
          caption: "Demonstration at the smart-factory testbed",
          aspect: "4/3",
          src: talkingSystemsDemo.url,
          alt: "Two people standing in front of the testbed screen during the demonstration",
        },
        {
          caption: "Project workshop with the partner organisations",
          aspect: "16/9",
          src: talkingSystemsWorkshop.url,
          alt: "A dozen participants seated around a long table during a Talking Systems project workshop",
        },
        {
          caption: "Showing the assistant at the project stand",
          aspect: "4/3",
          src: talkingSystemsStand.url,
          alt: "Three people at the project stand with the assistant running on a screen",
        },
        {
          caption: "The project presented at the MITC exhibition",
          aspect: "4/3",
          src: talkingSystemsMitcEvent.url,
          alt: "Exhibition floor at MITC with the project stand among other exhibitors",
        },
      ],
    },

  },
  {
    slug: "talking-scada",
    title: "Talking SCADA",
    subtitle: "From Innovation Concept to AI-Enabled Product Case",
    org: "University of Skövde · Blekinge Institute of Technology",
    meta: "Innovation in Practice → Product & Requirements Management",
    type: "AI / Innovation Product Concept",
    priority: 2,
    flagship: true,
    categories: ["AI & Product", "Innovation", "Academic / Research"],
    teaser:
      "An AI-enabled decision-support concept for SCADA/BMS environments, carried from initial innovation framing through discovery, requirements, MVP definition, product strategy and go-to-market.",
    highlight:
      "How can existing SCADA/BMS operational data and modern AI capabilities become a product that solves meaningful operator and facility-management problems while remaining technically feasible and commercially sustainable?",
    tags: [
      "AI Product Concept",
      "Innovation Management",
      "Product Discovery",
      "Requirements",
      "MVP",
      "Product Strategy",
      "Business Model",
      "Go-to-Market",
      "SCADA",
      "BMS",
    ],
    sections: [
      {
        heading: "Stage 1 — Initial innovation concept (University of Skövde)",
        body: [
          "Explored how AI and existing operational data from building systems could transform complex SCADA/BMS information into understandable insights and decision support for facility managers and operators.",
          "Building systems contain large amounts of alarms, trends, operational data and technical knowledge, but extracting useful insight can require significant specialist expertise.",
        ],
        items: [
          "Understandable operational data",
          "Facility-manager decision support",
          "Operator support and troubleshooting",
          "Reduced information fragmentation",
          "Use of existing platform data",
          "AI-enabled explanation",
          "Operational value",
        ],
      },
      {
        heading: "Stage 2 — Product development case (Blekinge Institute of Technology)",
        body: [
          "Talking SCADA was used as a recurring academic product case to apply New Product Development, Product Discovery, digital product strategy and Requirements Engineering to an AI-enabled decision-support concept for building automation and SCADA/BMS environments.",
        ],
        items: [
          "Opportunity identification",
          "Product discovery",
          "Product vision",
          "Value proposition",
          "Customer needs",
          "Requirements management",
          "Feature prioritisation",
          "MVP definition",
          "Product-development governance",
          "Portfolio considerations",
          "Business-model development",
          "Go-to-market planning",
        ],
      },
      {
        heading: "Product perspective",
        body: [
          "Connected customer needs and operational reality with technical feasibility, product strategy, requirements and sustainable business value.",
        ],
      },
    ],
    flow: {
      label: "Concept to market",
      steps: [
        "Innovation Opportunity",
        "Product Concept",
        "Discovery",
        "Requirements",
        "MVP",
        "Product Strategy",
        "Business Model",
        "Go-to-Market",
      ],
    },
    images: {
      slots: [
        {
          caption: "Concept illustration — buildings and energy systems answering in plain language",
          aspect: "16/9",
          src: aiConnectedCity.url,
          alt: "Illustration of a city skyline with wind turbines, linked by a network to a glowing AI brain and conversation bubbles",
          note: "Illustration, not a screenshot of the product.",
          lead: true,
        },
      ],
    },
    reflection:
      "The Innovation Management work established the opportunity and problem framing; the product-management specialisation turned it into a structured product case. Two stages of the same concept, not two separate projects.",
  },
  {
    slug: "wind-power-forecasting",
    title: "48-Hour Wind Power Forecasting for Smart Energy Planning",
    subtitle: "Uncertainty-Aware Forecasting Using Deep Learning",
    org: "Mälardalen University · Electrification Hub",
    meta: "2025",
    type: "Bachelor Thesis · Applied AI · Energy",
    year: "2025",
    priority: 3,
    flagship: true,
    categories: ["AI & Product", "Academic / Research"],
    teaser:
      "An uncertainty-aware wind power forecasting capability designed for risk-aware energy planning rather than prediction accuracy alone.",
    highlight:
      "Develop an uncertainty-aware forecasting capability designed for decision support, not just prediction.",
    tags: [
      "Forecasting",
      "Deep Learning",
      "Temporal Fusion Transformer",
      "Quantile Regression",
      "Energy",
      "Decision Support",
      "Time-Series",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "As renewable-energy penetration increases, reliable wind-power forecasting becomes increasingly important for energy planning, storage optimisation and demand-side flexibility.",
          "Traditional point forecasts provide limited information about uncertainty and risk.",
        ],
      },
      {
        heading: "Discovery & framing",
        items: [
          "Decision-making under uncertainty",
          "Risk-aware planning",
          "Digital energy",
          "Platform integration considerations",
          "Decision support rather than model accuracy alone",
        ],
      },
      {
        heading: "Data & method",
        items: [
          "Real wind and weather measurements from Sweden (SE1, SE3)",
          "Station selection near wind parks",
          "u/v wind-vector features",
          "Cyclical time features",
          "End-to-end ML pipeline with preprocessing and evaluation",
          "Temporal Fusion Transformer (TFT) with quantile regression",
        ],
      },
      {
        heading: "Product / platform relevance",
        body: [
          "By combining forecasts with uncertainty ranges rather than a single predicted value, planners can make decisions with a clearer understanding of risk.",
        ],
        items: [
          "Demand-side flexibility",
          "EV charging",
          "Smart-building load optimisation",
          "Industrial load shifting",
          "Storage optimisation",
          "Planning and load balancing",
          "Risk-aware decisions",
        ],
      },
    ],
    metrics: [
      { label: "1 hour", value: "7.7%", note: "MAPE" },
      { label: "24 hours", value: "12.5%", note: "MAPE" },
      { label: "36 hours", value: "17.5%", note: "MAPE" },
    ],
    reflection:
      "Uncertainty becomes useful decision-support information rather than simply prediction error.",
    images: {
      intro:
        "No illustrative or simulated result curves are used — only real material from the thesis work.",
      slots: [
        {
          caption: "Thesis presentation — future work",
          aspect: "16/9",
          src: thesisPresentation.url,
          alt: "Thesis presentation in a lecture hall with the future-work slide on screen",
        },
        { caption: "Prediction vs actual with uncertainty bands (SE1 / SE3)", aspect: "16/9" },
      ],
    },

    links: [
      {
        label: "Thesis record — DiVA",
        href: "https://mdu.diva-portal.org/smash/record.jsf?pid=diva2:1973683",
      },
    ],
  },
  {
    slug: "digital-realty-st06",
    title: "Digital Realty ST06",
    subtitle: "Data Centre IIoT Platform Integration",
    org: "Schneider Electric",
    meta: "Data Centre",
    type: "Professional Project",
    priority: 4,
    flagship: true,
    categories: ["Industry"],
    teaser:
      "Digital-platform integration of a wider data-centre IIoT environment into a unified operational platform in a mission-critical setting.",
    tags: [
      "Data Centre",
      "IIoT",
      "Digital Platform",
      "Mission Critical",
      "Integration",
      "Architecture",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Mission-critical data-centre environment requiring reliable integration of complex connected infrastructure.",
        ],
      },
      {
        heading: "Summary",
        body: [
          "Delivered digital-platform integration of the wider data-centre IIoT environment into a unified operational platform.",
        ],
      },
      {
        heading: "Contribution",
        items: [
          "Customer and operational requirements",
          "Technical discovery",
          "Solution architecture",
          "Integration strategy",
          "Technical ownership",
          "Platform capability assessment",
          "Technical coordination",
          "Validation and delivery",
          "Stakeholder alignment",
          "Lifecycle and reliability considerations",
        ],
      },
      {
        heading: "Product / business perspective",
        body: [
          "Required balancing customer needs, technical feasibility, integration complexity, operational continuity, lifecycle implications and long-term maintainability.",
        ],
      },
    ],
  },
  {
    slug: "kth-living-lab",
    title: "KTH Living Lab",
    subtitle: "Applied Smart-Building Innovation",
    org: "Schneider Electric",
    meta: "Project role: EcoStruxure Subject Matter Expert",
    type: "Applied Research Collaboration",
    priority: 5,
    flagship: true,
    categories: ["Industry", "Innovation", "Academic / Research"],
    teaser:
      "Connected applied smart-building research with real industrial-platform capabilities and constraints as EcoStruxure subject matter expert.",
    tags: [
      "Smart Buildings",
      "IoT",
      "Applied Research",
      "Energy Efficiency",
      "Platform Capability",
      "Feasibility",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "KTH Living Lab provided full-scale testbeds intended to increase the pace of innovation in the construction and real-estate sector.",
          "Multiple test environments were connected to Schneider Electric's EcoStruxure IoT / digital-building platform.",
        ],
      },
      {
        heading: "Contribution",
        items: [
          "Represented Schneider Electric in the collaboration",
          "Worked with KTH researchers and industry partners",
          "Acted as EcoStruxure platform subject matter expert",
          "Contributed building-automation and digital-platform expertise",
          "Explained what the platform could support and where its constraints were",
          "Assessed what was technically possible",
          "Helped translate research ideas into feasible platform solutions",
          "Contributed solution ideas for applied research",
          "Connected research requirements with platform capabilities, architecture and operational reality",
          "Contributed to exploration of smart buildings, energy efficiency, IoT, digital-building concepts and emerging technologies",
        ],
      },
      {
        heading: "Product / innovation perspective",
        body: [
          "The collaboration connected research opportunities with real industrial-platform capabilities and constraints, helping transform ideas into technically feasible applied solutions.",
        ],
      },
    ],
    flow: {
      label: "Research to feasible solution",
      steps: [
        "Research Opportunity",
        "Potential Value",
        "Platform Capability",
        "Constraints",
        "Feasible Applied Solution",
      ],
    },
    contributionNote:
      "Formal employment role during this period: Senior Technical Advisor — Digital Platforms. EcoStruxure Subject Matter Expert was the project role.",
    links: [
      { label: "KTH Live-In Lab", href: "https://www.liveinlab.kth.se/en/start-1.1064463" },
    ],
  },
  {
    slug: "multi-agent-ai",
    title: "Multi-Agent AI Decision Support for Smart Building Platforms",
    org: "Blekinge Institute of Technology",
    meta: "AI Platform / Product Concept",
    type: "AI Platform / Product Concept",
    priority: 6,
    flagship: false,
    categories: ["AI & Product", "Academic / Research"],
    teaser:
      "A planner-based multi-agent architecture exploring how agentic AI could become a reusable capability inside a smart-building and energy platform.",
    tags: [
      "Agentic AI",
      "Multi-Agent Systems",
      "GraphRAG",
      "Knowledge Graphs",
      "LangGraph",
      "Smart Buildings",
      "Decision Support",
    ],
    sections: [
      {
        heading: "Problem space",
        items: [
          "Limited system visibility",
          "Manual troubleshooting",
          "Fragmented operational knowledge",
          "Specialist dependency",
          "Difficulty connecting data and context",
        ],
      },
      {
        heading: "Work",
        items: [
          "Identified operator problems",
          "Translated needs into platform capabilities",
          "Considered data availability, technical feasibility and operational value",
          "Designed a planner-based multi-agent architecture",
          "Designed six specialised agents",
          "Data retrieval, tool use and grounded answer generation",
        ],
      },
      {
        heading: "Technology",
        items: [
          "LangGraph",
          "LangChain",
          "LangSmith",
          "OpenAI APIs",
          "Anthropic APIs",
          "GraphRAG",
          "Knowledge Graphs",
          "Time-series data",
          "Ontology-based context",
        ],
      },
      {
        heading: "Product perspective",
        body: [
          "Explored how agentic AI could become a reusable capability inside a smart-building / energy platform rather than merely a standalone chatbot.",
        ],
      },
    ],
    images: {
      slots: [
        {
          caption: "Concept illustration — cooperating agents reasoning over a connected building stock",
          aspect: "16/9",
          src: aiConnectedCity.url,
          alt: "Illustration of a city skyline with wind turbines, linked by a network to a glowing AI brain and conversation bubbles",
          note: "Illustration, not a screenshot of the product. Shared with Talking SCADA — the two concepts share a problem space.",
          lead: true,
        },
      ],
    },
    reflection:
      "Related to Talking SCADA in problem space, but a distinct concept with its own architecture and product framing.",
  },
  {
    slug: "st-eriks",
    title: "S:t Eriks Eye Center of Excellence",
    subtitle: "Mission-critical operating-theatre digital platform — discovery to delivery",
    org: "Schneider Electric",
    meta: "Healthcare",
    type: "Professional Project",
    priority: 7,
    flagship: false,
    categories: ["Industry", "UX & Interaction"],
    teaser:
      "Discovery with the customer inside an operating theatre, translated into a unified HMI that consolidated every room system on an edge architecture — proven in one theatre, then rolled out to the rest.",
    tags: [
      "Healthcare",
      "Customer Discovery",
      "Requirements",
      "UX & Interaction",
      "HMI",
      "Edge Architecture",
      "Integration",
      "Phased Rollout",
      "Mission Critical",
    ],
    highlight:
      "Translated operational needs into a solution that actually worked for the user in a critical healthcare environment.",
    sections: [
      {
        heading: "The job to be done",
        body: [
          "Surgeons, nurses and theatre staff needed one interface to control the room and follow procedures, instead of scattered subsystems and handovers between teams. The work began with discovery with the customer inside an actual operating theatre, observing the real workflow before anything was designed.",
        ],
      },
      {
        heading: "Discovery & iterative UX",
        body: [
          "Functionality and UX were adapted step by step based on customer need. The interface and the complex integration behind it were tailored around the real workflow — not the other way around — so the solution fit how the team actually worked during surgery.",
        ],
      },
      {
        heading: "What was integrated",
        items: [
          "Lighting control",
          "Blind / shade control",
          "HVAC",
          "CCTV control",
          "Door-lock interlocks in the operating theatre",
          "Nurse call",
          "Alarm systems",
          "Microscope-camera video routed to large screens",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "An edge server consolidated all technical subsystems into a single platform. The design was proven in one operating theatre — including door-lock interlocks — before being rolled out to the remaining theatres.",
        ],
      },
      {
        heading: "The interface",
        body: [
          "Outside the theatre, a wall-mounted touch panel let staff control cameras inside and outside, gave visitors outside a live view of the procedure from the microscope camera, and let everyone follow what was happening from the corridor.",
          "Inside the theatre, the full UX was visualised on a 42-inch TV screen and driven from a 24-inch panel PC, giving the surgical team one place to see and control the whole room.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Phased rollout from the pilot theatre to the remaining theatres, leaving the clinical team with a single operational interface they could trust in a mission-critical environment.",
        ],
      },
    ],
    flow: {
      label: "From discovery to rollout",
      steps: [
        "Operational need",
        "Discovery in theatre",
        "Tailored UX & integration",
        "Edge architecture",
        "Pilot theatre",
        "Rollout to remaining theatres",
      ],
    },
    contributionNote:
      "Customer-facing discovery, requirements, solution direction and end-to-end technical ownership as Senior Technical Advisor.",
    reflection:
      "Discovery with the user in their real environment is what turned a technical integration into a solution people could rely on.",
  },
  {
    slug: "hvac-monitoring",
    title: "Reusable HVAC Monitoring & Deviation-Management Capability",
    org: "Schneider Electric",
    meta: "Relevant period: Support Engineer",
    type: "Professional Platform / Product Capability",
    priority: 8,
    flagship: false,
    categories: ["Industry", "AI & Product"],
    teaser:
      "Recurring field needs turned into a reusable monitoring and deviation-management capability deployable across customer systems.",
    tags: [
      "HVAC",
      "Reusable Capability",
      "Product Improvement",
      "Monitoring",
      "Operational Data",
      "Energy",
    ],
    sections: [
      {
        heading: "Summary",
        body: [
          "Developed a reusable HVAC monitoring / deviation-management capability based on recurring operational needs across customer environments.",
        ],
      },
      {
        heading: "Functionality",
        items: [
          "Deviation detection",
          "Alarms",
          "Trend logging",
          "Visualisation",
          "Documentation",
          "Actionable operational insight",
        ],
      },
      {
        heading: "Purpose",
        body: [
          "Support troubleshooting, deviation management and energy optimisation while enabling more consistent deployment across customer systems.",
        ],
      },
      {
        heading: "Product perspective",
        body: [
          "Demonstrates the shift from repeatedly solving individual customer problems toward turning recurring field needs into reusable platform functionality.",
        ],
      },
    ],
  },
  {
    slug: "planet-resande",
    title: "PLANE(ra)T Resande",
    subtitle: "Sustainable Travel Decision-Support Concept",
    org: "Interaction Design · MDU",
    meta: "2024 · Team Project",
    type: "Team Project",
    year: "2024",
    priority: 9,
    flagship: false,
    categories: ["UX & Interaction", "Academic / Research"],
    teaser:
      "A decision-support concept helping users compare travel alternatives using emissions, cost, distance and time — from whiteboard ideation to a high-fidelity Figma prototype.",
    highlight:
      "How might a digital service make travel trade-offs easier to understand and support more conscious decisions?",
    tags: [
      "Interaction Design",
      "Double Diamond",
      "Paper Prototyping",
      "Figma",
      "User Testing",
      "Accessibility",
      "Sustainability",
    ],
    sections: [
      {
        heading: "Summary",
        body: [
          "Designed a decision-support concept helping users compare travel alternatives using emissions, cost, distance and time.",
        ],
      },
      {
        heading: "Process — Double Diamond",
        items: [
          "Explore: concept exploration, whiteboard ideation, interaction discussions, sketching",
          "Define: sustainable-travel concept, core functions, usability, accessibility",
          "Develop: sketches, design principles, Gestalt principles, paper prototyping with movable interactive elements, interface states",
          "Test: user interviews, paper-prototype testing, feedback, usability issues",
          "Iterate: revised prototype, high-fidelity Figma design, user testing, further redesign",
        ],
      },
      {
        heading: "Design principles",
        items: [
          "Simplicity",
          "Affordance",
          "Chunking",
          "Proximity",
          "Similarity",
          "Hierarchy",
          "Visibility",
          "Consistency",
          "Accessibility",
        ],
      },
      {
        heading: "Functionality",
        items: [
          "Origin and destination",
          "Departure / arrival time",
          "Travel alternatives",
          "Distance, travel time, cost and emissions",
          "Settings and statistics",
          "Text size and theme",
          "Audio assistance",
        ],
      },
      {
        heading: "Iteration example",
        body: [
          "User testing showed that some time-selection controls were not easy enough to discover. Their placement and visual hierarchy were changed.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Progressed from ideation and paper prototypes to a higher-fidelity Figma mobile prototype.",
        ],
      },
    ],
    flow: { label: "Design progression", steps: ["Ideation", "Paper Prototype", "User Testing", "Figma"] },
    contributionNote:
      "My contribution: to be added. This was a team project — individual contribution is described only where it can be stated accurately.",
    images: {
      intro: "Material from the ideation and prototyping work; Figma screens follow.",
      slots: [
        {
          caption: "1. Ideation — whiteboard sketch of the travel-alternatives concept",
          aspect: "4/3",
          src: planetWhiteboard.url,
          alt: "Whiteboard sketch of the travel app screens with a table of travel alternatives",
        },
        {
          caption: "2. Paper prototyping — booking and recommendation screens",
          aspect: "3/4",
          src: planetPaperPrototypes.url,
          alt: "Paper prototypes of the travel app laid out on a table",
        },
        {
          caption: "3. Design workshop with the project team",
          aspect: "4/3",
          src: planetWorkshop.url,
          alt: "Project team working together during the design workshop",
          lead: true,
        },
        { caption: "4. Figma — home / destination", aspect: "9/16" },
        { caption: "4. Figma — travel options", aspect: "9/16" },
        { caption: "4. Figma — selected option", aspect: "9/16" },
        { caption: "4. Figma — statistics", aspect: "9/16" },
      ],
    },

  },
  {
    slug: "hallbar-halsa",
    title: "Hållbar Hälsa",
    subtitle: "Sustainable Health — Adaptive Wellbeing Service Concept",
    org: "Interaction Design · MDU",
    meta: "Team Project",
    type: "Team Project",
    priority: 10,
    flagship: false,
    categories: ["UX & Interaction", "Academic / Research"],
    teaser:
      "An adaptive wellbeing service concept combining mobile interaction, activity-watch data and camera-supported input to support everyday behaviour change.",
    tags: [
      "Interaction Design",
      "Behaviour Change",
      "Connected Devices",
      "Privacy",
      "Consent",
      "Figma",
      "Responsible Design",
    ],
    sections: [
      {
        heading: "Summary",
        body: [
          "Designed an adaptive wellbeing service combining mobile interaction, activity-watch data and camera-supported input to support everyday behaviour change.",
        ],
      },
      {
        heading: "Concept considered",
        items: [
          "Physical activity",
          "Sedentary behaviour",
          "Energy intake",
          "Energy expenditure",
          "Water consumption",
        ],
      },
      {
        heading: "Service included",
        items: [
          "Contextual reminders",
          "Smartwatch notifications",
          "Statistics and progress",
          "Behavioural feedback",
          "Nudges",
        ],
      },
      {
        heading: "Responsible design",
        items: [
          "Privacy and personal data",
          "Consent and transparency",
          "Data sharing and connected devices",
          "Account deletion",
          "Behavioural influence and ethics",
        ],
      },
      {
        heading: "Prototype included",
        items: [
          "Onboarding",
          "Data-handling information and consent",
          "Profile",
          "Smartwatch connection and device discovery",
          "Data sharing",
          "Account deletion",
          "Audio assistance",
        ],
      },
      {
        heading: "Product learnings",
        body: [
          "Behaviour-change products need concrete, measurable and understandable goals.",
          "Goal ownership should be clear: user-defined, system-recommended or collaborative.",
          "Users need explicit feedback when goals are achieved.",
          "Responsible design should consider wider inclusion questions in addition to privacy and ethics.",
        ],
      },
    ],
    flow: {
      label: "Product loop",
      steps: ["Set Goal", "Monitor", "Interpret", "Feedback", "Reflect", "Adapt Behaviour"],
    },
    contributionNote:
      "My contribution: to be added. This was a team project, and the concept is an adaptive wellbeing service concept — not a production AI model.",
    images: {
      slots: [
        {
          caption: "Mobile dashboard + smartwatch notification",
          aspect: "9/16",
          src: hallbarHalsaDashboard.url,
          alt: "Hållbar Hälsa mobile dashboard with activity graph and a smartwatch nudge to move",
        },
        {
          caption: "Onboarding / consent / data handling",
          aspect: "9/16",
          src: hallbarHalsaOnboarding.url,
          alt: "Hållbar Hälsa onboarding screen with welcome text, data handling information and consent",
          lead: true,
        },
        {
          caption:
            "Figma interaction flow — profile, connected watch, device search, privacy, data sharing, deletion confirmation",
          aspect: "4/3",
          src: hallbarHalsaFlow.url,
          alt: "Figma prototype flow showing profile settings, device discovery and deletion confirmation screens",
        },
      ],
    },

  },
  {
    slug: "seeing-ai",
    title: "Seeing AI — Heuristic UX & Accessibility Evaluation",
    org: "Interaction Design · MDU",
    meta: "Individual Assignment",
    type: "Individual Assignment",
    priority: 11,
    flagship: false,
    categories: ["UX & Interaction", "Academic / Research"],
    teaser:
      "An independent accessibility and heuristic evaluation of Microsoft's Seeing AI iOS application, with concrete design recommendations and a validation plan.",
    tags: [
      "Accessibility",
      "Heuristic Evaluation",
      "Nielsen Heuristics",
      "Inclusive Design",
      "Individual Work",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Independently evaluated Microsoft's Seeing AI iOS application from an accessibility and human-centred design perspective.",
        ],
      },
      {
        heading: "Evaluation areas",
        items: [
          "Accessibility",
          "Perceptibility",
          "Operability",
          "Simplicity",
          "Forgiveness",
          "Affordance",
          "Consistency",
          "Visibility of system status",
          "Error prevention",
          "Help and documentation",
          "Nielsen heuristics",
        ],
      },
      {
        heading: "Strengths identified",
        items: [
          "Simple interface",
          "High contrast",
          "Multimodal feedback — audio, text and vibration",
          "Clear accessibility focus",
        ],
      },
      {
        heading: "Recommendations",
        items: [
          "Larger interaction targets — increase size and spacing for some controls",
          "Consistent auditory feedback — spoken confirmation of user selections and system states",
          "Spoken help — spoken assistance in addition to text-only help",
        ],
      },
      {
        heading: "Validation thinking",
        items: [
          "Original vs modified design",
          "Error rates",
          "Task completion",
          "Navigation",
          "User feedback",
          "Quantitative and qualitative methods",
        ],
      },
      {
        heading: "Research ethics",
        items: [
          "Informed consent",
          "Anonymity",
          "Secure handling of study data",
          "Right to withdraw",
        ],
      },
    ],
    images: {
      intro:
        "Product screenshots: Microsoft Seeing AI — used as part of an academic heuristic evaluation. Seeing AI is a Microsoft product and was not designed by me.",
      slots: [
        { caption: "Main camera interface", aspect: "9/16" },
        { caption: "Environmental / object description", aspect: "9/16" },
        { caption: "Help screen", aspect: "9/16" },
      ],
    },
  },
  {
    slug: "astrazeneca",
    title: "AstraZeneca",
    subtitle: "Pharmaceutical Digital Platform Environment",
    org: "Schneider Electric",
    meta: "Pharmaceutical",
    type: "Professional Project",
    priority: 12,
    flagship: false,
    categories: ["Industry"],
    teaser:
      "Digital-platform integration and delivery in a complex pharmaceutical environment with high reliability and lifecycle demands.",
    tags: ["Pharmaceutical", "Digital Platform", "Integration", "Reliability", "Lifecycle"],
    sections: [
      {
        heading: "Summary",
        body: [
          "Contributed to digital-platform integration and delivery in a complex pharmaceutical environment where reliability, integration quality, lifecycle considerations and operational requirements were important.",
        ],
      },
      {
        heading: "Note",
        body: [
          "Kept deliberately high-level — no confidential customer detail is published.",
        ],
      },
    ],
  },
];

export const projectFilters = [
  "All",
  "Industry",
  "AI & Product",
  "UX & Interaction",
  "Academic / Research",
  "Innovation",
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
