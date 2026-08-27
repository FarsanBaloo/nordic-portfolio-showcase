/** Résumé content — single source for the /cv page (screen + print). */

export const cvHeader = {
  name: "Rickard Sörlin",
  title:
    "AI Product Manager — Industrial Digital Platforms (SCADA / HVAC / IoT / Energy / AI)",
  tagline:
    "Bridging business, industrial operations, technology, and AI to turn real-world challenges into scalable digital platform products.",
};

export const strengths = [
  "25+ years in digital platforms, connected systems, SCADA environments and real-time, data-driven solutions, combining deep industrial domain expertise with applied AI understanding.",
  "Strong customer and value focus, identifying user needs, operational pains and business challenges, and translating them into feasible digital platforms and AI-enabled solutions in complex, mission-critical environments.",
  "Experienced in product-adjacent work: requirements definition, prioritisation discussions, feasibility assessment, stakeholder alignment and solution direction across industrial and digital platform environments.",
  "Strong communicator across business, product, engineering, operations and customer stakeholders, making complex technology, constraints and trade-offs understandable and actionable.",
  "Informal leader and mentor, strengthening solution design, system integration thinking, platform capabilities, scalability, maintainability and delivery quality.",
];

export const coreSkills = [
  {
    title: "Product & Strategy",
    items: [
      "Product Management",
      "Product Strategy",
      "B2B Enterprise Platforms",
      "Requirements Engineering & Prioritisation",
      "Stakeholder Alignment",
      "Product Lifecycle Thinking",
      "Business Model Design",
    ],
  },
  {
    title: "Discovery & UX",
    items: [
      "Product Discovery",
      "Wireframing",
      "Figma Prototyping",
      "Usability Evaluation",
    ],
  },
  {
    title: "AI & Data",
    items: [
      "AI Limitations & Trade-offs",
      "Time-Series Forecasting",
      "Data-Driven Decision Support",
      "GenAI / LLMs, RAG & Graph RAG",
      "Predictive Analytics",
      "Applied Machine Learning",
      "Deep Learning",
    ],
  },
  {
    title: "Platforms & Domain",
    items: [
      "Industrial Digital Platforms (SCADA / BMS / EMS)",
      "Connected Systems (PLC / IoT / IIoT)",
      "Industrial Communication Protocols",
      "Real-Time Monitoring & Control Systems",
      "Building Automation & Energy Systems",
    ],
  },
  {
    title: "AI Frameworks & Tools",
    items: [
      "Python",
      "PyTorch",
      "Scikit-learn",
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
      "Knowledge Graphs",
      "Vector Databases",
      "Retrieval",
    ],
  },
];

export const cvSummary = [
  "Product-oriented B2B industrial digital platform professional with 25+ years of experience across BMS/HVAC, SCADA, IoT/IIoT, energy systems, connected systems and complex real-time environments. Combines deep operational domain expertise with applied AI and product management capabilities to identify high-value user problems, translate operational needs into requirements and product opportunities, and shape technically feasible, scalable solutions.",
  "Experienced in bridging field reality, customer needs, operational data, platform capabilities, engineering constraints and AI/data teams, providing requirements, prioritisation input and technical-commercial trade-off insight. Recent postgraduate studies in AI, product management, requirements, strategy and innovation complement extensive real-world experience working across customers, operations, engineering, Product Owners, R&D and business stakeholders.",
];

export const cvProjects = [
  {
    title: "Multi-Agent AI Decision Support for Smart Building Platforms",
    org: "Blekinge Institute of Technology (BTH)",
    slug: "multi-agent-decision-support",
    body: "Designed a multi-agent AI decision support concept for smart building and energy systems, translating real operator needs into platform capabilities for troubleshooting, root-cause analysis and energy optimisation.",
    bullets: [
      "Identified user problems around limited system visibility, manual troubleshooting and fragmented operational knowledge.",
      "Designed a planner-based multi-agent architecture with six specialised agents for data retrieval, tool use and grounded answer generation.",
      "Connected user needs, data availability, technical feasibility and operational value into a scalable AI-enabled platform concept.",
    ],
    tech: "LangGraph, LangChain, LangSmith, OpenAI/Anthropic APIs, GraphRAG, knowledge graphs, time-series data, ontology-based context.",
  },
  {
    title: "AI-Powered Troubleshooting Assistant",
    org: "Mälardalen Industrial Technology Center (MITC)",
    slug: "talking-systems",
    body: "Explored how an AI-enabled assistant could reduce downtime in industrial environments by translating machine signals, alarms and documentation into actionable insights.",
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
      "Delivered probabilistic forecasts supporting planning, optimisation and flexibility scenarios.",
      "Demonstrated how uncertainty-aware forecasts enable improved planning, load balancing and energy optimisation.",
    ],
    tech: "Temporal Fusion Transformer with probabilistic forecasting.",
  },
];

export const cvExperience = [
  {
    role: "Senior Technical Advisor — Digital Platforms",
    org: "Schneider Electric",
    period: "2020 – 2025",
    summary:
      "Connected customer and operational needs with digital platform capabilities, technical feasibility, delivery reality and business value across SCADA, HVAC, IoT, building automation, energy and mission-critical environments.",
    bullets: [
      "Drove technical discovery and solution definition for complex digital platform initiatives, evaluating customer needs, operational constraints, platform capabilities, integration options, feasibility and business value.",
      "Worked across customers, sales, engineering and management to shape modernisation solutions for mission-critical facilities, translating customer needs into alternative architectures and product options while balancing lifecycle risk, technical feasibility, cost and commercial value.",
      "Translated customer, operational and project needs into structured technical requirements and scalable solution designs.",
      "Held end-to-end technical ownership for complex digital platform solutions, driving technical decisions from problem definition and requirements through solution direction, integration, validation and delivery.",
      "Influenced technical prioritisation, solution direction, product selection and architectural trade-offs by balancing customer value, technical feasibility, integration risk, scalability, reliability and operational constraints.",
      "Reduced delivery and lifecycle risk by identifying integration constraints, technical dependencies and long-term consequences early and validating proposed solutions with stakeholders.",
      "Delivered mission-critical digital platform integrations across data-centre, pharmaceutical and healthcare environments, including consolidating multiple systems into a unified HMI and edge-based architecture.",
      "Represented Schneider Electric in KTH Living Lab, contributing domain expertise and technical input on digital-platform capabilities for building energy efficiency.",
      "Mentored technical teams in platform capabilities, system integration, solution design and technical constraints, improving consistency, scalability, maintainability and delivery quality.",
    ],
  },
  {
    role: "Support Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2013 – 2020",
    summary:
      "National technical expert for Sweden working across customer environments, field engineers, Product Owners, Global Product Support, R&D and market teams, supporting Schneider Electric's digital building and industrial platforms across SCADA, automation, energy and connected system environments.",
    bullets: [
      "Translated recurring issues and real-world usage patterns into structured product feedback, enhancement proposals and usability improvement input for EcoStruxure Building Operation platform development.",
      "Acted as a key interface between customer operations, field engineers, market organisation, product development and internal stakeholders, supporting feedback loops that improved platform usability, adoption and market fit.",
      "Submitted and justified enhancement proposals based on customer impact, business value and market needs, contributing to continuous platform improvement and roadmap-relevant input.",
      "Owned the development of a reusable HVAC deviation-management capability for the market organisation, combining deviation detection, alarms, logging and visualisation to turn operational data into actionable insights.",
      "Supported platform lifecycle and adoption readiness through release validation, defect identification, deployment readiness and controlled rollout risk assessments with engineering and product stakeholders.",
      "Co-developed digital support tools and troubleshooting workflows with market organisation and engineering teams to improve engineer productivity, knowledge sharing and platform adoption.",
      "Collaborated with R&D as quality tester for EcoStruxure Building Operation, identifying defects, validating functionality and supporting platform improvement.",
      "Collaborated with Product Owners and development teams to validate feasibility, usability improvements and architectural consistency across digital platform and connected system environments.",
      "Built deep understanding of user workflows, system usage, operational constraints and recurring failure patterns across customer environments, informing platform improvements and product decisions.",
      "Supported field engineers, service teams and customers in resolving complex issues across real-time monitoring, SCADA and connected system environments, helping protect uptime and operational continuity.",
    ],
  },
  {
    role: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2003 – 2013",
    summary:
      "Delivered and implemented digital platform and connected system solutions in close collaboration with customers and operational teams, building a foundation in how industrial systems and digital platforms create value in real-world usage.",
    bullets: [
      "Project management of smaller projects.",
      "Gathered and translated user and operational needs into implementation-ready configurations and system designs, supporting reliability, usability and long-term maintainability.",
      "Built practical understanding of user workflows, operational constraints and integration challenges across real-time building automation and industrial environments.",
      "Programmed, commissioned and integrated digital platform and automation solutions with project teams and customer stakeholders in real-world operational environments.",
      "Owned end-to-end implementation of building automation solutions, including configuration, commissioning, documentation, testing and operational handover.",
      "Delivered connected system solutions in collaboration with property managers, operations technicians, facility teams, project managers and end users in building automation, energy and industrial environments.",
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
