/** Résumé content — single source for the /cv page (screen + print). */

export const cvHeader = {
  name: "Rickard Sörlin",
  title: "Product Owner — AI & Industrial Digital Platforms (SCADA / BMS / IoT / Energy)",
  tagline:
    "Bridging industrial operations, product, engineering and AI to shape scalable platform capabilities for mission-critical environments.",
};

export const strengths = [
  "25+ years in energy, industrial automation, SCADA and digital platforms (IoT/IIoT), bridging deep domain expertise with applied AI.",
  "Product- and value-driven, translating business goals into AI and digital initiatives with clear operational impact.",
  "Trusted advisor in technical strategy, stakeholder alignment and operational adoption in real-world environments.",
  "Strong communicator, making complex technology actionable for business, operations and engineering stakeholders.",
  "Informal technical leader and mentor, strengthening architectural thinking and solution quality.",
];

export const coreSkills = [
  {
    title: "Product & Strategy",
    items: [
      "Product Management",
      "Product Strategy",
      "Product Lifecycle Management",
      "Requirements Engineering",
      "Requirements Prioritization",
      "Stakeholder Management",
      "Business Model Design",
    ],
  },
  {
    title: "Domain & Platforms",
    items: [
      "Industrial Digital Platforms (IT/OT)",
      "AI-enabled Digital Platforms",
      "Industrial IoT / IIoT Architectures",
      "SCADA, BMS, EMS & Industrial Automation",
      "Edge Computing",
      "IT/OT Integration",
      "Mission-Critical Systems",
    ],
  },
  {
    title: "AI & Data",
    items: [
      "GenAI / LLMs & RAG",
      "Predictive Analytics",
      "Time-Series Forecasting",
      "Machine Learning",
      "Computer Vision",
    ],
  },
];

export const cvSummary = [
  "Product-oriented professional with 25+ years of experience working with industrial digital platforms, including SCADA, BMS, IIoT and energy systems, in complex, high-availability, mission-critical environments. I combine deep domain expertise with applied AI and a strong understanding of how industrial systems create value in real-world operations.",
  "I work cross-functionally across customer operations, engineering, project leadership, Product Owners, market and business stakeholders, translating operational needs and real-world usage into structured requirements, feature improvements and solution directions.",
  "My experience includes requirements clarification, influencing prioritisation decisions, release validation and stakeholder alignment in high-availability and mission-critical environments. I focus on identifying high-impact problems such as inefficiency and system complexity, framing trade-offs, and ensuring solutions are technically feasible, scalable and aligned with operational constraints.",
  "With a strong foundation in AI and data systems, combined with hands-on project experience, I define AI-enabled solutions that are practical, scalable and aligned with operational needs and constraints.",
  "Building on this experience, I have strengthened my capabilities in product management and requirements management through postgraduate studies in Product Management, Strategy & Industrial Economics, with a focus on stakeholder alignment and driving product and platform initiatives in complex environments.",
];

export const cvProjects = [
  {
    title: "Uncertainty-Aware 48-hour Wind Power Forecasting",
    org: "Thesis — Mälardalen University & Electrification Hub",
    slug: "wind-power-forecasting",
    body: "Developed an AI-based decision-support capability for energy planners and grid operators, providing 48-hour wind power forecasts with quantified uncertainty to support risk-informed operational planning in Sweden's SE1/SE3 regions.",
    bullets: [
      "Achieved 82.5% accuracy at a 36-hour forecast horizon, enabling more confident operational planning under uncertainty.",
      "Enabled risk-aware decision-making by providing probabilistic forecasts and prediction intervals.",
      "Supports energy storage optimisation, demand-side flexibility and cost-efficient grid operations.",
      "Improves predictability of renewable generation for smart grids, EV charging infrastructure and industrial energy systems.",
    ],
  },
  {
    title: "Talking Systems — making industrial machines talk",
    org: "Mälardalen Industrial Technology Center (MITC)",
    slug: "talking-systems",
    body: "Developed and validated an AI-enabled troubleshooting capability supporting industrial operators and maintenance teams in resolving complex system issues independently, reducing dependency on specialist support and minimising unplanned downtime.",
    bullets: [
      "Validated with operators in the MITC industrial testbed (industry collaboration platform with partners such as Volvo and Alfa Laval).",
      "Enabled real-time operational decision support through integration with industrial control systems for alarm analysis and actionable guidance.",
      "Designed for edge deployment ensuring data privacy, robustness and 24/7 availability in mission-critical environments.",
      "Scalable across technical support, field service and customer self-service contexts, with roadmap potential for voice interaction, predictive maintenance and anomaly detection.",
    ],
  },
];

export const cvExperience = [
  {
    role: "Senior Technical Advisor — Digital Platforms",
    org: "Schneider Electric",
    period: "2020 – 2025",
    summary:
      "Acted as a bridge between customer operations, business, engineering, delivery and product stakeholders across SCADA, HVAC, IoT/IIoT, building automation, energy and mission-critical environments, translating real-world needs into structured requirements and prioritisation input while shaping feasible, scalable digital platform solutions.",
    bullets: [
      "Drove technical discovery and solution definition for complex industrial digital platform initiatives, evaluating customer needs, operational constraints, platform capabilities, integration options, feasibility and business value.",
      "Translated customer, operational and project needs into structured technical requirements and scalable solution designs.",
      "Worked across customers, sales, engineering and management to shape modernisation solutions for mission-critical facilities, balancing lifecycle risk, technical feasibility, cost and commercial value.",
      "Held end-to-end technical ownership for complex industrial digital platform solutions, from problem definition and requirements through solution direction and integration.",
      "Influenced technical prioritisation, solution direction, product selection and architectural trade-offs.",
      "Reduced delivery and lifecycle risk by identifying integration constraints, technical dependencies and long-term consequences early.",
      "Delivered mission-critical digital platform integrations across data-centre, pharmaceutical and healthcare environments, including multi-system consolidation into a unified HMI and edge-based architecture.",
      "Represented Schneider Electric in KTH Living Lab, contributing domain expertise on digital-platform capabilities, building energy efficiency and real-world deployment feasibility.",
      "Mentored technical teams in platform capabilities, system integration, solution design and operational constraints as an informal technical leader.",
    ],
  },
  {
    role: "Technical Support Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2013 – 2020",
    summary:
      "National technical expert for Sweden working across customer environments, field engineers, Product Owners, Global Product Support, R&D and market teams across SCADA, building automation, energy and connected industrial platform environments.",
    bullets: [
      "Owned structured defect escalation and root-cause analysis for recurring platform issues, helping Product Owners and development teams understand operational impact, business relevance and technical priority.",
      "Acted as a key interface between customer operations, field engineers, Product Owners, Global Product Support, R&D and market teams.",
      "Translated recurring field issues and operational patterns into structured product feedback and enhancement proposals, influencing prioritisation.",
      "Owned the development of a reusable HVAC deviation-management capability for the market organisation — detection logic, alarms, trend logging, visualisation and documentation.",
      "Collaborated with R&D as quality tester for EcoStruxure Building Operation, identifying defects and validating functionality.",
      "Supported product release and deployment readiness through validation, impact assessment, rollout risk evaluation and prioritisation input.",
      "Built deep understanding of industrial user workflows, system behaviour, operational constraints, alarm patterns and recurring failure modes.",
    ],
  },
  {
    role: "Project Engineer — Digital Platforms",
    org: "Schneider Electric",
    period: "2003 – 2013",
    summary:
      "Delivered building automation, energy, industrial digital platform and connected-system solutions in close collaboration with customers and operational teams.",
    bullets: [
      "Gathered and translated user and operational needs into implementation-ready automation and system designs.",
      "Managed smaller projects and coordinated implementation with customers, project teams, operations technicians and end users.",
      "Programmed, commissioned, tested and integrated automation and digital platform solutions using industrial communication and integration technologies.",
      "Held end-to-end implementation responsibility including configuration, integration, testing, documentation, commissioning and operational handover.",
      "Built hands-on expertise in SCADA/BMS workflows, system integration, industrial data flows and mission-critical environments.",
    ],
  },
];

export const cvEducation = [
  {
    title: "Postgraduate Studies in Product Management, Strategy & Industrial Economics",
    institution: "Blekinge Institute of Technology",
    period: "2025 – 2026",
    detail:
      "Courses: Product and Requirements Management for Digital Environments, Product Management & Portfolio Strategy, Strategy & Business Models, Leadership, Agile Process & Project Management.",
  },
  {
    title: "Postgraduate Studies in Product Strategy & Innovation Management",
    institution: "University of Skövde",
    period: "2025 – 2026",
    detail: "Focus: strategic innovation, implementation, innovation leadership.",
  },
  {
    title: "Specialization in Artificial Intelligence (postgraduate coursework)",
    institution: "Umeå University, Linköping University, Mälardalen University",
    period: "",
    detail:
      "Courses: Predictive Data Analytics, Natural Language Processing, Deep Learning for Industrial Imaging, Autonomous Systems.",
  },
  {
    title: "BSc in Computer Science — specialisation in Intelligent Systems",
    institution: "Mälardalen University (MDU), Sweden",
    period: "2023 – 2025",
    detail:
      "Courses: Software Engineering for AI (agile development, user stories, backlog structuring, UML, requirements prioritisation), Interaction Design, Deep Learning, Machine Learning (Advanced), Ethics, Artificial Intelligence 1 & 2, Statistics.",
  },
  {
    title: "Robotics and Automation, Upper Secondary School",
    institution: "Sjödals Gymnasium, Sweden",
    period: "",
    detail: "",
  },
];

export const cvCertifications = [
  { title: "AI Governance", institution: "University of Oxford" },
  { title: "Machine Learning Specialization", institution: "Stanford University Online" },
  { title: "Deep Learning Specialization", institution: "DeepLearning.AI" },
];
