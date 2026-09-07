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
  kthLivingLab,
  stEriksHmi,
  stEriksRoomOverview,
  stEriksVideoRouting,
  stEriksStatusPanel,
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
      "Discovery-led proof-of-concept AI assistant that explains industrial machine behaviour in natural language — validated with non-specialist users who resolved real incidents without waiting for specialist support.",
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
    metrics: [
      {
        label: "Validation",
        value: "Smart-factory testbed",
        note: "FESTO CP-Factory at MITC, together with project partners",
      },
      {
        label: "User outcome",
        value: "Self-service incidents",
        note: "Non-specialist users resolved incidents without waiting for specialist support",
      },
      {
        label: "Architecture",
        value: "Edge + RAG",
        note: "Industrial data stays on-site; domain knowledge retrieved over technical documentation",
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
    subtitle: "Academic AI Product Concept",
    org: "University of Skövde · Blekinge Institute of Technology",
    meta: "Innovation in Practice → Product & Requirements Management",
    type: "AI / Innovation Product Concept",
    priority: 2,
    flagship: true,
    categories: ["AI & Product", "Innovation", "Academic / Research"],
    teaser:
      "A product concept exploring how AI could help buildings explain why their energy behaviour changed — carried from problem framing through discovery, requirements, MVP definition, product strategy and go-to-market.",
    pitch: {
      vision: "Today, buildings generate data. Tomorrow, buildings should explain themselves.",
      explainer:
        "Talking SCADA explores how AI could help turn complex building data into understandable explanations of energy deviations — helping users move from what changed? to why did it change? and where should I investigate?",
    },
    highlight:
      "What if the building could explain why it is consuming more energy now than at the same time last year?",
    tags: [
      "Product Vision",
      "Product Discovery",
      "Jobs to Be Done",
      "Problem Validation",
      "Requirements / PRD",
      "Prioritisation",
      "MVP",
      "Product Strategy",
      "Business Model",
      "Go-to-Market",
      "Applied AI",
      "SCADA",
      "BMS",
    ],
    sections: [
      {
        heading: "Why",
        body: [
          "Buildings account for a significant share of global energy use, and a modern building is not one system but many: heating, ventilation, cooling, HVAC controls, sensors, schedules, setpoints, energy management and other connected systems that all influence each other.",
          "An energy deviation seen at building level may therefore have its cause somewhere else entirely — in a changed schedule or setpoint, an incorrect configuration, a faulty sensor, control sequences interacting unexpectedly, equipment running when it should not, or heating and cooling quietly working against each other.",
          "The problem is not always a lack of data. The problem is understanding what the data means.",
        ],
      },
      {
        heading: "Whom",
        body: [
          "Building operators, facility managers, energy managers and technical teams responsible for understanding and improving building performance.",
          "These users have very different levels of HVAC/BMS depth, and deep diagnostic expertise is scarce — complex cross-system investigation often depends on a small number of specialists.",
        ],
      },
      {
        heading: "Pain",
        quote: "I can see that something changed, but I do not know why.",
        body: [
          "Users may be able to see that energy consumption has changed without being able to quickly identify why. Investigation can require navigating trends, alarms, schedules, configurations and relationships across multiple systems, together with specialist HVAC/BMS knowledge.",
        ],
        items: [
          "Investigation effort and complexity",
          "Relationships that cross several systems",
          "Large amounts of operational data",
          "Difficulty identifying root causes",
          "Dependency on scarce specialist domain knowledge",
        ],
      },
      {
        heading: "Job to be done",
        quote:
          "When my building uses more energy than expected, help me understand what changed, why it changed and where I should investigate, so I do not have to manually analyse every interacting system before I can act.",
      },
      {
        heading: "What the concept is",
        body: [
          "Talking SCADA explores an AI-enabled explanation and decision-support layer for building platforms that could combine operational data, historical behaviour, system relationships and domain context to help explain likely causes of energy deviations.",
          "The intent is to move the user from what changed? to why did it change? and then toward where should I investigate next? — decision support and context rather than autonomous control. Human judgement stays part of the decision.",
        ],
      },
      {
        heading: "Gain",
        body: ["The concept aims to support:"],
        items: [
          "Faster investigation of energy deviations",
          "Reduced dependency on scarce specialist knowledge",
          "More understandable building behaviour",
          "More actionable operational data",
          "Better-informed energy decisions",
          "Earlier identification of abnormal or inefficient behaviour",
        ],
      },
      {
        heading: "Product vision",
        body: [
          "Talking SCADA explores a future where building platforms do more than display values, alarms and trends. They help users understand the behaviour behind them.",
          "The goal is not to replace domain experts, but to make domain knowledge and system context more accessible and help more users investigate complex building behaviour.",
          "AI should support the user by explaining evidence and relationships, not simply returning an unexplained answer.",
        ],
      },
      {
        heading: "Why AI?",
        body: [
          "AI was not the starting point. It became relevant only once the problem was understood: large amounts of operational information, historical behaviour, relationships between systems, contextual interpretation, domain knowledge and explanation all have to come together before a user can act.",
          "That turned into a feasibility question rather than an assumption: can AI help make specialist building-domain reasoning more accessible to more users while keeping explanations grounded in actual building data and system context?",
        ],
      },
      {
        heading: "Product work — Stage 1, initial concept (University of Skövde)",
        body: [
          "Innovation work that established the opportunity and problem framing: how existing operational data from building systems could become understandable insight and decision support for facility managers and operators.",
        ],
        items: [
          "Opportunity identification",
          "Problem framing and validation",
          "Understandable operational data",
          "Facility-manager decision support",
          "Operator support and troubleshooting",
          "Use of existing platform data",
          "Operational value",
        ],
      },
      {
        heading: "Product work — Stage 2, product case (Blekinge Institute of Technology)",
        body: [
          "Talking SCADA was then used as a recurring academic product case to apply New Product Development, Product Discovery, digital product strategy and Requirements Engineering to the concept.",
        ],
        items: [
          "Product discovery",
          "Product vision",
          "Value proposition",
          "Customer needs and jobs to be done",
          "AI and technical feasibility",
          "Product definition",
          "Requirements management / PRD",
          "Feature prioritisation",
          "MVP definition",
          "Validation thinking",
          "Product-development governance",
          "Product strategy and portfolio considerations",
          "Business-model development",
          "Market relevance",
          "Go-to-market and adoption considerations",
        ],
      },
      {
        heading: "Product leadership perspective",
        body: [
          "The case also explores the less visible side of product work: bringing user, business and technical perspectives into the same decision process, making assumptions and trade-offs explicit, defining what the product should and should not do, and creating a direction that different stakeholders can understand and evaluate.",
        ],
      },
      {
        heading: "Product relevance",
        body: [
          "Talking SCADA is not primarily about creating another dashboard or chatbot. The core product opportunity is to help users move from seeing a deviation to understanding the likely reasons behind it.",
          "The concept explores whether AI can help make complex building-domain reasoning more accessible while keeping explanations grounded in operational data, system context and human judgement.",
        ],
      },
    ],
    valueTagline: "From building data to building understanding.",
    flow: {
      label: "The user's path through a deviation",
      steps: [
        "Energy deviation",
        "What changed?",
        "Cross-system context",
        "Why did it change?",
        "Evidence-based explanation",
        "Where should I investigate?",
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
    footnote:
      "Academic AI product case based on general industry and domain knowledge. It does not disclose confidential customer or employer information.",
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
    images: {
      slots: [
        {
          caption: "KTH Live-in Lab — full-scale testbed building for smart-building and energy research",
          aspect: "16/9",
          src: kthLivingLab.url,
          alt: "Low-angle view of the KTH Live-in Lab concrete building with a ground-floor glass storefront",
          lead: true,
        },
      ],
    },
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
    priority: 3,
    flagship: true,
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
    images: {
      slots: [
        {
          caption: "Operating-theatre touch-panel HMI — scenario lighting, group selection and RGB control on the unified edge platform",
          aspect: "16/9",
          src: stEriksHmi.url,
          alt: "Schneider Electric touch-panel interface showing an electrical-alarm status bar, a digital clock, and columns for lighting scenarios, light-group selection and RGB color sliders",
          lead: true,
        },
        {
          caption: "Room overview page — theatre mode, temperature, humidity, differential pressure, power supply and nurse-call status at a glance",
          aspect: "16/9",
          src: stEriksRoomOverview.url,
          alt: "Wall-mounted touch panel showing the operating-theatre overview: cleaning mode active, 20.9°C, 53% relative humidity, 10 Pa overpressure, and power-supply and call-system status",
        },
        {
          caption: "Video routing — selecting microscope, lamp-camera or external HDMI sources for the built-in 42-inch screen and the arm-mounted 50-inch screen",
          aspect: "16/9",
          src: stEriksVideoRouting.url,
          alt: "Touch-panel screen for image functions: monitor selection for the 42-inch and 50-inch screens and input selection between microscope, lamp camera and external HDMI sources",
        },
        {
          caption: "Corridor status panel — the simplified outside-theatre view showing current theatre mode and camera feeds for staff and visitors",
          aspect: "16/9",
          src: stEriksStatusPanel.url,
          alt: "Simplified corridor panel showing the operating theatre's current mode with buttons for operating theatre, preparation room, lamp camera and microscope views",
        },
      ],
    },
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
