/** Résumé content — single source for the /cv page (screen + print). */

export const cvHeader = {
  name: "Rickard Sörlin",
  title:
    "AI Product Manager | Industrial Digital Platforms (SCADA / HVAC / IoT / Energy / AI)",
  tagline:
    "Bridging business, industrial operations, technology, and AI to turn real-world challenges into scalable digital platform products.",
};

export const strengths = [
  "20+ years across industrial digital platforms, connected systems, SCADA and mission-critical environments, combined with hands-on applied AI.",
  "Starts from the customer's problem: discovery, requirements, prioritisation and feasibility before committing to a solution.",
  "Turns recurring field issues into structured product feedback and enhancement proposals with Product Owners and R&D.",
  "Makes technology, constraints and trade-offs understandable across business, engineering, R&D, sales and customers.",
];

export const coreSkills = [
  {
    title: "Product & Strategy",
    items: [
      "Product management & strategy",
      "Requirements engineering & prioritisation",
      "Product lifecycle thinking",
      "Stakeholder alignment & cross-functional collaboration",
      "Technical-commercial trade-off analysis",
      "B2B enterprise platforms & business models",
    ],
  },
  {
    title: "Product Discovery & UX",
    items: [
      "Product discovery & problem validation",
      "User interviews & workflow analysis",
      "Wireframing & Figma prototyping",
      "Usability evaluation",
    ],
  },
  {
    title: "AI & Data",
    items: [
      "Generative AI, LLMs, RAG & GraphRAG",
      "Agentic AI & multi-agent systems",
      "Time-series forecasting & predictive analytics",
      "Deep learning & computer vision",
      "Data-driven decision support",
      "AI governance, limitations & trade-offs",
    ],
  },
  {
    title: "Platforms & Domain",
    items: [
      "Industrial digital platforms (SCADA, BMS, EMS)",
      "Building automation, HVAC & energy systems",
      "Connected systems (PLC, IoT, IIoT)",
      "Real-time monitoring, control & industrial communication protocols",
    ],
  },
  {
    title: "AI Frameworks & Tools",
    items: [
      "Python",
      "PyTorch",
      "scikit-learn",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "RAGAS",
    ],
  },
  {
    title: "Data & Retrieval",
    items: [
      "SQL",
      "NoSQL",
      "GraphDB",
      "Knowledge graphs",
      "Vector databases",
      "Information retrieval",
    ],
  },
];

export const cvSummary = [
  "AI Product Manager by professional direction and Nordic Technical Support Expert by current role, with 20+ years across BMS/HVAC, IoT/IIoT, energy and mission-critical environments. Combines industrial domain depth with applied AI and product management to validate real user problems and shape feasible, viable solutions.",
  "Experienced in end-to-end technical ownership and cross-functional work with Product Owners, R&D, engineering and sales. Postgraduate studies in AI, product management, strategy and business models reinforce this practice.",
];

export const cvProjects = [
  {
    title: "Talking SCADA — Academic Product Case",
    org: "University of Skövde → Blekinge Institute of Technology · Aug 2025 – May 2026",
    slug: "talking-scada",
    body: "Explored how AI could let a building explain hidden energy waste, likely causes and useful next investigation steps in plain language while keeping operational decisions with people.",
    bullets: [
      "Framed the user problem, intended users and Jobs to Be Done for building operators, facility managers and energy teams.",
      "Developed the concept from discovery through product definition, a bounded read-only MVP, PRD and SRD, requirements traceability and Cost-Value-Risk prioritisation.",
      "Connected customer and business value through Software Value Map, Business Model Canvas, packaging, sourcing and staged commercialisation planning.",
      "Defined the next validation step with representative users and real building data; intended energy, cost and emissions gains remain unmeasured.",
    ],
    tech: "Conceptual multi-agent decision support using operational time-series data, building-system relationships and domain context; a design direction to compare with simpler support.",
  },
  {
    title: "AI-Powered Troubleshooting Assistant",
    org: "Mälardalens Industrial Technology Center (MITC)",
    slug: "talking-systems",
    body: "Explored how an AI-enabled assistant could reduce downtime in industrial environments by translating machine signals, alarms, and documentation into actionable insights.",
    bullets: [
      "Conducted discovery interviews with operators and testbed teams to understand workflows and identify key pain points.",
      "Defined and validated the core problem: dependency on specialist knowledge during incidents.",
      "Designed and prototyped an AI assistant providing root-cause insights and step-by-step guidance.",
      "Evaluated usability and user value through real-world testing with industrial partners.",
      "Demonstrated how AI-supported decision guidance enabled faster incident resolution and reduced reliance on specialists.",
    ],
    tech: "RAG-based architecture, OPC UA integration, industrial control systems.",
  },
  {
    title: "Uncertainty-Aware 48-hour Wind Power Forecasting",
    org: "Thesis — Mälardalen University & Electrification Hub",
    slug: "wind-power-forecasting",
    body: "Explored how AI-driven forecasting supports decision-making under uncertainty in energy systems.",
    bullets: [
      "Identified decision-making under uncertainty as a key challenge for energy planning and operations.",
      "Developed a data-driven forecasting solution using real-world wind and weather data.",
      "Delivered probabilistic forecasts supporting planning, optimisation, and flexibility scenarios.",
      "Demonstrated how uncertainty-aware forecasts enable improved planning, load balancing, and energy optimisation.",
    ],
    tech: "Temporal Fusion Transformer with probabilistic forecasting.",
  },
];

export const cvExperience = [
  {
    role: "Nordic Technical Support Expert — Building Management Systems",
    org: "Schneider Electric",
    period: "2026 – Present",
    summary:
      "Nordic responsibility for strategic customers and prioritisation of defects and improvements with R&D for EcoStruxure Building Operation and its edge-controller ecosystem.",
    bullets: [
      "Own the largest and most strategic VIP customers across the Nordic region.",
      "Turn recurring Nordic field cases into structured product feedback and enhancement proposals for EcoStruxure Building Operation and its edge IoT ecosystem, prioritised with R&D by customer impact, technical risk and business relevance.",
      "Support and mentor Level 2 advanced support engineers across the Nordic region through escalation, technical guidance and knowledge sharing.",
    ],
  },
  {
    role: "Senior Technical Advisor — Digital Platforms",
    org: "Schneider Electric",
    period: "2020 – 2025",
    summary:
      "Led customer and technical discovery for complex digital platform solutions across healthcare, pharmaceutical, data-centre and other mission-critical environments.",
    bullets: [
      "Developed and presented technical solution proposals to internal management, sales and customer stakeholders, weighing customer value, feasibility, lifecycle risk and cost.",
      "Held end-to-end technical ownership from problem definition and requirements through integration, validation and delivery.",
      "Aligned engineering, sales and customers around a shared solution direction; represented Schneider Electric at KTH Live-In Lab and mentored technical teams.",
    ],
  },
  {
    role: "Support Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2013 – 2020",
    summary:
      "Sweden's national technical expert for a digital building platform and its ecosystem of edge controllers, working with Product Owners, Global Product Support and R&D.",
    bullets: [
      "Turned recurring field issues into structured product feedback and enhancement proposals, prioritised critical defects and validated releases with R&D.",
      "Owned a reusable HVAC deviation-management capability that turned operational data into actionable insight for troubleshooting and energy optimisation.",
      "Supported product lifecycle through release validation, deployment readiness and rollout risk assessment.",
    ],
  },
  {
    role: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2003 – 2013",
    summary:
      "Delivered digital solutions for building operation and energy optimisation in close collaboration with customers and operational teams.",
    bullets: [
      "Worked with customers on discovery and requirements, translating operational needs into solution design.",
      "Held technical ownership from solution design through delivery and operational handover.",
      "Collaborated with R&D as a quality tester and mentored teams on platform capabilities.",
    ],
  },
];

export const cvEducation = [
  {
    title: "Postgraduate Studies in Product Management, Strategy & Industrial Economics",
    institution: "Blekinge Institute of Technology",
    period: "2025 – 2026",
    detail:
      "Courses: Product Management & Portfolio Strategy, Strategy & Business Models, Leadership, Product Requirement Management, Agile Process & Project Management.",
  },
  {
    title: "Postgraduate Studies in Innovation Management (Advanced level)",
    institution: "University of Skövde",
    period: "2025 – 2026",
    detail: "Courses: Innovation in Practise.",
  },
  {
    title: "Postgraduate Specialisation in Artificial Intelligence (Advanced level)",
    institution: "Umeå University, Linköping University, Mälardalen University",
    period: "",
    detail:
      "Courses: Predictive Data Analytics, Natural Language Processing, Deep Learning for Industrial Imaging, Autonomous Systems.",
  },
  {
    title: "Bachelor of Science in Computer Science — Specialisation in Intelligent Systems",
    institution: "Mälardalen University (MDU), Sweden",
    period: "2023 – 2025",
    detail:
      "Courses: Interaction Design, Deep Learning, Machine Learning (Advanced), Ethics, Artificial Intelligence 1 & 2, Statistics, Software Engineering for AI (agile development, user stories, backlog structuring, UML, requirements prioritisation).",
  },
  {
    title: "IoT and Automation, Upper Secondary School",
    institution: "Sjödals Gymnasium, Sweden",
    period: "",
    detail: "",
  },
];

export const cvCertifications = [
  { title: "AI Governance & Responsible AI", institution: "University of Oxford" },
  { title: "Machine Learning Specialization", institution: "Stanford University Online" },
  { title: "Deep Learning Specialization", institution: "DeepLearning.AI" },
];
