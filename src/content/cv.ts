/** Résumé content — single source for the /cv page (screen + print). */

export const cvHeader = {
  name: "Rickard Sörlin",
  title:
    "AI Product Manager | Industrial Digital Platforms (SCADA / HVAC / IoT / Energy / AI)",
  tagline:
    "Bridging business, industrial operations, technology, and AI to turn real-world challenges into scalable digital platform products.",
};

export const strengths = [
  "20+ years across industrial digital platforms, connected systems, SCADA and mission-critical real-time environments, combining deep domain expertise with hands-on applied AI experience.",
  "Nordic responsibility for strategic customers, complex technical support and prioritisation of platform defects and improvements with R&D.",
  "Identifies user needs, operational pain points and business challenges, translating them into technically feasible digital and AI-enabled solutions.",
  "Contributes to requirements definition, prioritisation, feasibility assessment, stakeholder alignment and solution direction across industrial digital platforms.",
  "Makes complex technology, constraints and trade-offs understandable and actionable across business, product, engineering, operations and customer stakeholders.",
  "Provides technical leadership and mentoring across solution design, system integration, platform scalability, maintainability and delivery quality.",
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
  "AI Product Manager by professional direction and Nordic Technical Support Expert by current role, with 20+ years of experience across BMS/HVAC, IoT/IIoT, energy and mission-critical real-time environments. SCADA software monitors and controls technical systems, measurements and alarms; this industrial foundation is combined with hands-on applied AI and product management capabilities to conduct discovery, validate high-value user problems and shape feasible, scalable solutions.",
  "Brings end-to-end technical ownership and cross-functional experience across Product Owners, engineering, R&D and business stakeholders. The current Nordic role adds strategic-customer ownership and responsibility for assessing and prioritising regional defects and improvement needs by customer impact, technical risk and business relevance. Postgraduate studies in AI, product management, strategy and industrial economics reinforce this practical experience.",
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
    period: "Oct 2026 – Present",
    summary:
      "Nordic responsibility for complex technical support, strategic customer ownership and structured prioritisation of defects and improvements for EcoStruxure Building Operation and its ecosystem of edge controllers for building control and energy efficiency.",
    bullets: [
      "Deliver technical support and solve complex BMS and EcoStruxure issues for technicians, EcoXpert partners and Level 2 advanced support engineers across the Nordic region.",
      "Take ownership of the largest and most strategic VIP customers, adapting communication and technical guidance to each customer's operational context.",
      "Turn recurring Nordic field cases into structured product feedback and enhancement proposals for EcoStruxure Building Operation and its edge IoT ecosystem, prioritising defects and improvements with R&D by customer impact, technical risk, urgency and relevance to priority Nordic business.",
      "Manage and escalate cases requiring deeper technical expertise or cross-functional collaboration, with clear documentation of cases and solutions.",
      "Contribute Nordic market and customer insight to platform-quality and lifecycle discussions for EcoStruxure Building Operation and its edge-controller ecosystem.",
      "Mentor Technical Support colleagues through knowledge sharing and guidance to strengthen overall team capability.",
    ],
  },
  {
    role: "Senior Technical Advisor — Digital Platforms",
    org: "Schneider Electric",
    period: "2020 – 2025",
    summary:
      "Connected customer and operational needs with digital platform capabilities, technical feasibility, delivery reality, and business value across SCADA, HVAC, IoT, building automation, energy, and mission-critical environments.",
    bullets: [
      "Drove technical discovery and solution definition for complex digital platform initiatives, evaluating customer needs, operational constraints, platform capabilities, integration options, feasibility, and business value.",
      "Developed and presented technical solution proposals for complex healthcare, pharmaceutical and other mission-critical environments to internal management, sales and customer stakeholders, translating operational requirements and technical constraints into clear solution options and trade-offs.",
      "Worked cross-functionally with engineering, sales, management, customers and external stakeholders to align requirements, technical feasibility, delivery constraints and solution direction.",
      "Held end-to-end technical ownership for complex digital platform solutions, driving technical decisions from problem definition and requirements through solution direction, integration, validation, and delivery.",
      "Influenced technical prioritisation, solution direction, product selection, and architectural trade-offs by balancing customer value, technical feasibility, integration risk, scalability, reliability, and operational constraints.",
      "Reduced delivery and lifecycle risk by identifying integration constraints, technical dependencies, and long-term consequences early and validating proposed solutions with stakeholders.",
      "Delivered mission-critical digital platform integrations across data-centre, pharmaceutical, and healthcare environments, including consolidating multiple systems into a unified HMI and edge-based architecture.",
      "Translated operational workflows into user-facing digital control concepts, integrating HVAC, lighting, video and other building systems into coherent web-based interfaces.",
      "Represented Schneider Electric in KTH Live-In Lab, contributing domain expertise and technical input on digital-platform capabilities for building energy efficiency.",
      "Mentored technical teams in platform capabilities, system integration, solution design, and technical constraints, improving consistency, scalability, maintainability, and delivery quality.",
    ],
  },
  {
    role: "Support Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2013 – 2020",
    summary:
      "National technical expert for Sweden working across customer environments, field engineers, Product Owners, Global Product Support, R&D and market teams, supporting Schneider Electric's digital building and industrial platforms across SCADA, automation, energy and connected system environments.",
    bullets: [
      "Prioritised and coordinated critical technical issues based on operational impact, urgency, customer need and technical risk, working across field engineers, Advanced Solution Support, system architects, Global Product Support, R&D and market teams.",
      "Performed root-cause analysis of complex customer and project issues, distinguishing implementation problems from potential product defects and escalating verified defects to Global Product Support and R&D.",
      "Translated recurring issues and real-world usage patterns into structured product feedback and usability-improvement input for platform development.",
      "Submitted and justified enhancement proposals based on customer impact, business value and market needs, contributing to continuous platform improvement and roadmap-relevant input.",
      "Owned the development of a reusable HVAC deviation-management capability for the market organisation, combining deviation detection, alarms, logging, and visualisation to turn operational data into actionable insights, support troubleshooting and energy optimisation, and enable consistent deployment across customer systems.",
      "Supported platform lifecycle and adoption readiness through release validation, defect identification, deployment readiness and controlled rollout risk assessments with engineering and product stakeholders.",
      "Co-developed digital support tools and troubleshooting workflows with the market organisation and engineering teams, supporting engineer productivity, knowledge sharing and platform adoption.",
      "Collaborated with R&D as a quality tester for Schneider Electric's building-automation platform, identifying defects, validating functionality and contributing product-improvement feedback.",
    ],
  },
  {
    role: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2003 – 2013",
    summary:
      "Delivered and implemented digital-platform and connected-system solutions in close collaboration with customers and operational teams across building automation, energy and industrial environments.",
    bullets: [
      "Managed smaller customer projects and technical work packages while supporting project managers and delivery teams on larger, more complex installations.",
      "Held technical ownership for large-scale building-automation and integrated-control projects, from system design, configuration and programming through integration, testing, commissioning, documentation and operational handover.",
      "Worked with property managers, operations technicians, facility teams, project managers and end users to gather and translate operational needs into implementation-ready configurations and system designs.",
      "Collaborated with R&D as a quality tester for Schneider Electric's IoT building-automation platform, identifying defects, validating functionality and supporting platform improvement.",
      "Participated in a local technology network to strengthen engineering capability, knowledge sharing and adoption of new platform functionality.",
      "Mentored technical teams on platform capabilities, integration patterns and scalable solution design, improving consistency, maintainability and alignment between architecture, delivery and operational needs.",
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
