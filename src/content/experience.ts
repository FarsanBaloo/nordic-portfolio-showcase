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
      "Customer-facing Project Engineer where understanding the customer's operational reality came before designing the solution — delivering digital-platform, building-automation and connected-system solutions from requirements through system design, implementation, integration, commissioning, testing and operational handover.",
    bullets: [
      "Worked with customers on discovery and requirements, translating operational needs into solution design.",
      "Held technical ownership from solution design through delivery and operational handover.",
      "Collaborated with R&D as a quality tester and mentored teams on platform capabilities.",
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
        body: "Collaborated with R&D as a quality tester for EcoStruxure Building Operation platform functionality, identifying defects, validating functionality and supporting platform improvement. This was collaboration in a QA / validation context, not an R&D role.",
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
      "Customer-facing national technical expert supporting complex platform environments while working close to real-world product usage, platform lifecycle, product quality, release validation and deployment readiness — built on listening in and adapting the support to each customer's and colleague's needs.",
    bullets: [
      "Turned recurring field issues into structured product feedback and enhancement proposals, prioritised critical defects and validated releases with R&D.",
      "Owned a reusable HVAC deviation-management capability that turned operational data into actionable insight for troubleshooting and energy optimisation.",
      "Supported product lifecycle through release validation, deployment readiness and rollout risk assessment.",
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
      "Connected customer and operational needs with digital-platform capabilities, technical feasibility, delivery reality and business value across SCADA, HVAC, IoT, building automation, energy and mission-critical environments — making options and trade-offs explicit so customers, delivery teams and stakeholders could decide on a shared direction.",
    bullets: [
      "Developed and presented technical solution proposals to internal management, sales and customer stakeholders, weighing customer value, feasibility, lifecycle risk and cost.",
      "Held end-to-end technical ownership from problem definition and requirements through integration, validation and delivery.",
      "Aligned engineering, sales and customers around a shared solution direction; represented Schneider Electric at KTH Live-In Lab and mentored technical teams.",
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
        title: "Solution development & stakeholder presentation",
        items: [
          "Solution proposals for healthcare, pharmaceutical and mission-critical environments",
          "Technical presentations to management, sales and customer stakeholders",
          "Requirements translation into solution options and trade-offs",
          "Cross-functional alignment across engineering, sales, management, customers and external stakeholders",
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
        label: "Research & innovation collaboration",
        body: "Represented Schneider Electric at KTH Live-In Lab as its contact and an EcoStruxure Building Operation subject matter expert, supporting researchers with platform expertise and engineering input for sustainable buildings and energy efficiency.",
      },
      {
        label: "Risk reduction",
        body: "Identified integration constraints, technical dependencies and long-term consequences early in order to reduce delivery risk, lifecycle risk and avoid unnecessary cost.",
      },
      {
        label: "Solution development & presentation",
        body: "Developed and presented technical solution proposals for complex customer environments — translating operational requirements and technical constraints into clear options and trade-offs, and aligning internal management, sales and customer stakeholders around a shared direction.",
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
      "Mission-Critical Delivery",
      "Lifecycle Risk",
      "Cost",
      "Commercial Value",
      "Stakeholder Alignment",
      "Mentoring",
    ],

  },
  {
    id: "nordic-technical-support-expert",
    title: "Nordic Technical Support Expert",
    company: "Schneider Electric",
    period: "2026–Present",
    subtitle: "Building Management Systems",
    stage: "Nordic Customer Insight, Platform Quality & Prioritisation",
    summary:
      "Nordic responsibility for complex technical support, strategic customer ownership and structured prioritisation of defects and improvements for EcoStruxure Building Operation and its ecosystem of edge controllers for building control and energy efficiency.",
    bullets: [
      "Own the largest and most strategic VIP customers across the Nordic region.",
      "Turn recurring Nordic field cases into structured product feedback and enhancement proposals for EcoStruxure Building Operation and its edge IoT ecosystem, prioritised with R&D by customer impact, technical risk and business relevance.",
      "Support and mentor Level 2 advanced support engineers across the Nordic region through escalation, technical guidance and knowledge sharing.",
    ],
    detailGroups: [
      {
        title: "Nordic technical support",
        items: [
          "Complex BMS troubleshooting",
          "Technicians and EcoXpert partners",
          "Case ownership and escalation",
          "Efficient resolution and communication",
          "Nordic collaboration",
        ],
      },
      {
        title: "Strategic customer ownership",
        items: [
          "Largest and most strategic VIP customers",
          "Customer needs and operational context",
          "Clear, situation-adapted communication",
          "Response time and problem resolution",
          "Customer satisfaction",
        ],
      },
      {
        title: "Product & offer relevance",
        items: [
          "Nordic market and customer insight",
          "Defect and improvement prioritisation",
          "Customer and business impact",
          "Technical risk and urgency",
          "Structured product feedback & enhancement proposals",
          "Priority Nordic business needs",
        ],
      },
      {
        title: "Platform & ecosystem",
        items: [
          "EcoStruxure Building Operation",
          "Edge controllers and connected field systems",
          "Building control and monitoring",
          "HVAC and energy efficiency",
          "Platform quality and lifecycle",
        ],
      },
      {
        title: "Mentoring & capability building",
        items: [
          "Level 2 advanced support engineers",
          "Knowledge sharing",
          "Case and solution documentation",
          "Shared support capability",
          "Colleague development",
        ],
      },
    ],
    notes: [
      {
        label: "Product and offer connection",
        body: "The role provides a Nordic view of recurring customer needs, product defects, improvement opportunities and business priorities. It contributes structured input to R&D and platform decisions without implying formal product ownership.",
      },
      {
        label: "Platform context",
        body: "EcoStruxure Building Operation is Schneider Electric's digital platform for controlling, monitoring and improving the energy efficiency of buildings, connected to an ecosystem of edge controllers and field systems.",
      },
    ],
    flow: [
      "Nordic Customer & Partner Need",
      "Technical Investigation",
      "Impact & Risk Assessment",
      "Defect / Improvement Priority",
      "R&D Collaboration",
      "Resolution & Shared Learning",
    ],
    progression:
      "This role extends customer-facing technical depth into Nordic market insight, strategic-account responsibility and evidence-based prioritisation — strengthening the bridge toward future Product and Offer Management responsibility.",
    tags: [
      "Nordic Market Insight",
      "Strategic Customer Ownership",
      "Defect & Enhancement Prioritisation",
      "R&D Collaboration",
      "Platform Lifecycle",
      "EcoStruxure Building Operation",
      "Edge Controllers",
      "BMS/HVAC",
      "Energy Efficiency",
      "Mentoring",
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
