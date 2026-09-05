export type DetailGroup = {
  title: string;
  items: string[];
};

export type Role = {
  id: string;
  title: string;
  company: string;
  period: string;
  subtitle?: string;
  stage: string;
  summary: string;
  bullets: string[];
  detailGroups: DetailGroup[];
  notes?: { label: string; body: string }[];
  flow?: string[];
  progression: string;
  tags: string[];
};

export const roles: Role[] = [
  {
    id: "project-engineer",
    title: "Project Engineer — Digital Platforms",
    company: "Schneider Electric",
    period: "2003–2013",
    stage: "Customer-Facing Engineering, Technical Responsibility & Delivery",
    summary:
      "Customer-facing Project Engineer delivering digital-platform, building-automation and connected-system solutions from customer and operational requirements through system design, implementation, integration, commissioning, testing and operational handover.",
    bullets: [
      "Worked with property managers, operations technicians, facility teams, project managers and end users to gather and translate operational needs into implementation-ready configurations and system designs.",
      "Managed smaller customer projects and technical work packages while supporting project managers and delivery teams on larger, more complex installations.",
      "Held technical ownership for large-scale building-automation and integrated-control projects, from system design, configuration and programming through integration, testing, commissioning, documentation and operational handover.",
      "Collaborated with R&D as a quality tester for the IoT building-automation platform, identifying defects, validating functionality and supporting platform improvement.",
      "Participated in a local technology network to strengthen engineering capability, knowledge sharing and adoption of new platform functionality.",
      "Mentored technical teams on platform capabilities, integration patterns and scalable solution design, improving consistency, maintainability and alignment between architecture, delivery and operational needs.",
    ],

    detailGroups: [
      {
        title: "Delivery scope",
        items: [
          "Project management of smaller projects",
          "Customer, user and operational requirements",
          "System design and configuration",
          "Programming and commissioning",
          "Integration and testing",
          "Documentation and operational handover",
          "Reliability, usability and maintainability",
        ],
      },
      {
        title: "Environments",
        items: [
          "Building automation",
          "BMS/HVAC",
          "Digital platforms",
          "Connected systems",
          "Energy environments",
          "Industrial environments",
        ],
      },
      {
        title: "Stakeholders",
        items: [
          "Property managers",
          "Operations technicians",
          "Facility teams",
          "Project managers",
          "End users",
          "Customer stakeholders",
        ],
      },
      {
        title: "Technical network & mentoring",
        items: [
          "Participated in local technology network",
          "Supported adoption of new platform functionality",
          "Knowledge sharing and technical mentoring",
          "Platform capabilities and integration patterns",
          "Scalable solution design and maintainability",
          "Alignment between architecture, delivery and operational needs",
        ],
      },
    ],
    notes: [
      {
        label: "Platform quality context",
        body: "Collaborated with R&D as a quality tester for EcoStruxureWare Building Operation / platform functionality, identifying defects, validating functionality and supporting platform improvement. This was collaboration in a QA / validation context, not an R&D role.",
      },
    ],
    progression:
      "Built a strong customer-facing foundation combining technical responsibility, implementation reality and direct understanding of how users, operational teams and connected systems interact.",
    tags: [
      "Customer Facing",
      "Project & Work-Package Management",
      "System Design",
      "Technical Ownership",
      "Solution Architecture",
      "Integration",
      "Building Automation",
      "SCADA",
      "BMS/HVAC",
      "Commissioning",
      "QA",
      "Mentoring",
      "Operational Handover",
    ],

  },
  {
    id: "support-engineer",
    title: "Support Engineer — Digital Platforms",
    company: "Schneider Electric",
    period: "2013–2020",
    subtitle: "National Technical Expert — Sweden",
    stage:
      "Customer-Facing Platform Expertise, Product Lifecycle & Release Readiness",
    summary:
      "Customer-facing national technical expert supporting complex platform environments while working close to real-world product usage, platform lifecycle, product quality, release validation and deployment readiness.",
    bullets: [
      "Owned the development of a reusable HVAC deviation-management capability for the market organisation, combining deviation detection, alarms, logging and visualisation to turn operational data into actionable insights and enable consistent deployment across customer systems.",
      "Prioritised and coordinated critical technical issues based on operational impact, urgency, customer need and technical risk, working across field engineers, Advanced Solution Support, system architects, Global Product Support, R&D and market teams.",
      "Performed root-cause analysis of complex customer and project issues, distinguishing implementation problems from potential product defects and escalating verified defects to Global Product Support and R&D.",
      "Translated recurring issues and real-world usage patterns into structured product feedback and usability-improvement input, and submitted enhancement proposals justified on customer impact, business value and market needs.",
      "Supported platform lifecycle and adoption readiness through release validation, defect identification, deployment readiness and controlled rollout risk assessments with engineering and product stakeholders.",
      "Co-developed digital support tools and troubleshooting workflows with the market organisation and engineering teams, supporting engineer productivity, knowledge sharing and platform adoption.",
    ],

    detailGroups: [
      {
        title: "Customer-facing work",
        items: [
          "Customer environments",
          "Field engineers and service teams",
          "Market organisation",
          "Complex troubleshooting",
          "System usage and user workflows",
          "Operational constraints and failure patterns",
          "Uptime and operational continuity",
        ],
      },
      {
        title: "Product & platform improvement",
        items: [
          "Recurring-problem analysis",
          "Structured product feedback",
          "Enhancement proposals",
          "Usability-improvement input",
          "Customer impact and market needs",
          "Business-value justification",
          "Roadmap-relevant input",
        ],
      },
      {
        title: "Lifecycle & release work",
        items: [
          "Product lifecycle",
          "QA testing and defect identification",
          "Release validation",
          "Deployment and release readiness",
          "Controlled rollout risk",
          "New / changed functionality validation",
          "Architectural consistency, feasibility and usability",
        ],
      },
      {
        title: "Capability ownership & support tooling",
        items: [
          "Owned a reusable HVAC deviation-management capability",
          "Deviation detection, alarms, logging and visualisation",
          "Consistent deployment across customer systems",
          "Co-developed digital support tools",
          "Troubleshooting workflows",
          "Engineer productivity and knowledge sharing",
          "Platform adoption",
        ],
      },
    ],
    notes: [
      {
        label: "Capability ownership",
        body: "Owned the development of a reusable HVAC deviation-management capability for the market organisation, turning operational data into actionable insights that supported troubleshooting and energy optimisation and could be deployed consistently across customer systems.",
      },
      {
        label: "Issue prioritisation & root cause",
        body: "Prioritised and coordinated critical technical issues by operational impact, urgency, customer need and technical risk, and performed root-cause analysis that separated implementation problems from potential product defects before escalating verified defects to Global Product Support and R&D.",
      },
      {
        label: "Collaboration context",
        body: "Findings from QA, defects, enhancement proposals and release-validation work were communicated through the appropriate product-development channels. Collaborated with R&D in a platform-quality / QA-testing context, and with Product Owners and development teams when validating feasibility, usability improvements and architectural consistency.",
      },
    ],
    flow: [
      "Customer Environment",
      "Real Product Usage",
      "QA / Validation",
      "Release Readiness",
      "Lifecycle / Improvement",
    ],
    progression:
      "This period connected two sides of the product: how the platform behaved in real customer environments and how functionality needed to be tested, validated and prepared for reliable deployment.",
    tags: [
      "Capability Ownership",
      "Customer Facing",
      "National Technical Expert",
      "Root-Cause Analysis",
      "Product Lifecycle",
      "QA Testing",
      "Release Validation",
      "Release Readiness",
      "Enhancement Proposals",
      "Usability",
      "Platform Quality",
    ],

  },
  {
    id: "senior-technical-advisor",
    title: "Senior Technical Advisor — Digital Platforms",
    company: "Schneider Electric",
    period: "2020–2025",
    stage: "Customer-Facing Technical Leadership, Architecture & Business Value",
    summary:
      "Connected customer and operational needs with digital-platform capabilities, technical feasibility, delivery reality and business value across SCADA, HVAC, IoT, building automation, energy and mission-critical environments.",
    bullets: [
      "Led customer-facing technical discovery and solution definition for complex digital-platform initiatives.",
      "Translated customer, operational and project needs into structured technical requirements, alternative architectures and scalable solution designs.",
      "Held end-to-end technical ownership from problem definition and requirements through architecture, integration, validation and delivery.",
      "Provided informal technical leadership — guiding engineering teams, peers and stakeholders toward sound technical direction through influence, mentorship and trusted authority rather than formal line management.",
      "Worked across customers, sales, engineering and management to evaluate product and solution options while balancing lifecycle risk, technical feasibility, cost and commercial value.",
      "Influenced technical prioritisation, solution direction, product selection and architectural trade-offs by balancing customer value, integration risk, scalability, reliability and operational constraints.",
    ],
    detailGroups: [
      {
        title: "Customer & discovery",
        items: [
          "Customer and operational needs",
          "Technical discovery and solution definition",
          "Problem definition",
          "Customer-facing workshops and dialogue",
          "Operational constraints",
          "Platform capabilities and integration options",
          "Technical feasibility and business value",
        ],
      },
      {
        title: "Architecture & technical ownership",
        items: [
          "Structured technical requirements",
          "Scalable solution designs",
          "Alternative architectures",
          "Solution architecture and integration",
          "Validation and delivery",
          "End-to-end technical ownership",
          "Technical dependencies and architecture trade-offs",
          "Integration constraints and long-term consequences",
        ],
      },
      {
        title: "Business & commercial context",
        items: [
          "Worked with customers, sales, engineering and management",
          "Evaluated product and solution options",
          "Considered cost and commercial value",
          "Considered technical feasibility and lifecycle risk",
          "Considered reliability, scalability and delivery reality",
          "Considered long-term maintainability",
        ],
      },
      {
        title: "Mission-critical delivery",
        items: [
          "Data-centre environments",
          "Pharmaceutical environments",
          "Healthcare environments",
          "Unified HMI",
          "Edge-based architecture",
          "Complex platform integration",
        ],
      },
      {
        title: "Informal technical leadership",
        items: [
          "Guided engineering teams and peers through influence, not authority",
          "Set technical direction across roles and teams without formal line management",
          "Trusted technical authority and sounding board for architects and developers",
          "Aligned stakeholders around feasible, scalable architecture decisions",
          "Championed consistency, scalability and maintainability across solutions",
          "Mentored on platform capabilities, system integration and solution design",
        ],
      },
    ],
    notes: [
      {
        label: "Stakeholder reach",
        body: "Worked close to customers, sales, project delivery and business stakeholders to shape technically feasible and commercially sound solutions.",
      },
      {
        label: "Evaluating alternatives",
        body: "Evaluated alternative architectures and product / solution options while balancing lifecycle risk, technical feasibility, cost and commercial value.",
      },
      {
        label: "Informal technical leadership",
        body: "Acted as the de-facto technical authority across teams and disciplines — shaping architecture and direction through trusted expertise, mentorship and influence rather than a formal management mandate.",
      },
      {
        label: "Risk reduction",
        body: "Identified integration constraints, technical dependencies and long-term consequences early in order to reduce delivery risk, lifecycle risk and avoid unnecessary cost.",
      },
    ],
    flow: [
      "Customer Need",
      "Product / Solution Options",
      "Technical Feasibility",
      "Risk & Lifecycle",
      "Cost / Commercial Value",
      "Deliverable Solution",
    ],
    progression:
      "By this stage the work sat at the intersection of customer needs, project delivery, architecture and business — using technical ownership to reduce risk, manage cost and help shape solutions that were feasible, scalable and commercially sensible.",
    tags: [
      "Customer Discovery",
      "Requirements",
      "End-to-End Technical Ownership",
      "Solution Architecture",
      "Product / Solution Selection",
      "Architectural Trade-offs",
      "Lifecycle Risk",
      "Cost",
      "Commercial Value",
      "Stakeholder Alignment",
    ],
  },
];

export const offerRelevance = {
  title: "Offer & Product Relevance",
  body: "The role required connecting customer needs, technical feasibility and business considerations when evaluating platform, product and solution alternatives.",
  items: [
    "Customer value",
    "Product / solution selection",
    "Technical feasibility",
    "Lifecycle considerations",
    "Cost",
    "Commercial value",
    "Technical risk",
    "Delivery risk",
    "Scalability",
    "Reliability",
    "Prioritisation",
    "Stakeholder alignment",
  ],
};
