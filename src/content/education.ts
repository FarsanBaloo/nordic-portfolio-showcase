export type CourseGroup = { title: string; items: string[] };

export const bachelor = {
  title: "Bachelor of Science in Computer Science",
  formalTitle:
    "Degree of Bachelor of Science in Computer Science with Specialization in Intelligent Systems",
  descriptor: "B.Sc. in Computer Science · Applied Artificial Intelligence",
  specialisation: "Specialisation in Intelligent Systems",
  institution: "Mälardalen University",
  summary:
    "Built formal Computer Science and Applied AI capabilities on top of extensive professional experience in industrial digital platforms and connected systems.",
  note: "The degree was completed before the postgraduate development period beginning in August 2025.",

  coursework: [
    {
      title: "AI & Data",
      items: [
        "Probability & Statistics",
        "Machine Learning",
        "Advanced Machine Learning",
        "Deep Learning",
        "Artificial Intelligence 1 & 2",
        "Natural Language Processing",
        "Reinforcement Learning",
        "Generative AI",
        "Predictive Analytics",
        "Data Science",
      ],
    },
    {
      title: "Software & Data",
      items: [
        "Software Engineering",
        "Software Engineering for AI",
        "SQL",
        "Cloud Platforms",
      ],
    },
    {
      title: "Product / Human-Centred Development",
      items: [
        "Interaction Design",
        "Agile development",
        "User stories",
        "Backlog structuring",
        "UML",
        "Requirements prioritisation",
      ],
    },
    {
      title: "Responsible Technology",
      items: ["AI Ethics"],
    },
  ] satisfies CourseGroup[],
};

export const postgraduate = {
  period: "August 2025 – July 2026",
  title: "Advanced AI, Innovation & Product Development",
  intro:
    "A coordinated postgraduate development period across several universities, covering advanced artificial intelligence, Innovation Management, Industrial Economics, Product Management, Product & Requirements Management, Strategy & Business Models, Agile Process & Project Management and Leadership.",

  first: [
    "Natural Language Processing",
    "Autonomous Systems & Perception",
    "Innovation in Practice",
  ],
  entries: [
    {
      id: "liu",
      phase: "Phase 1 · Aug 2025 – Jan 2026 · Advanced AI Foundation",
      institution: "Linköping University",
      formalTitle:
        "Advanced-Level Studies in Artificial Intelligence: Natural Language Processing",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Natural Language Processing",

      period: "Aug 2025 – Jan 2026",
      body: "Advanced-level studies covering Natural Language Processing, transformer architectures, domain adaptation, sentiment classification and PyTorch-based model implementation, with emphasis on adapting transformer models to domain-specific tasks using Parameter-Efficient Fine-Tuning (PEFT) and Low-Rank Adaptation (LoRA).",
      topics: [
        "Natural Language Processing",
        "Transformer architectures",
        "Domain adaptation",
        "Sentiment classification",
        "PyTorch",
        "Parameter-Efficient Fine-Tuning (PEFT)",
        "Low-Rank Adaptation (LoRA)",
      ],
      relevance: [
        "Technical feasibility",
        "Domain-specific AI",
        "Understanding model limitations",
        "Collaboration with AI engineering teams",
      ],
    },
    {
      id: "umu",
      phase: "Phase 1 · Aug 2025 – Jan 2026 · Advanced AI Foundation",
      institution: "Umeå University",
      formalTitle:
        "Advanced-Level Studies in Artificial Intelligence: Autonomous Systems & Perception",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Autonomous Systems & Perception",
      period: "Jan 2026 – Jun 2026",
      body: "Advanced-level studies in autonomous systems and machine perception, covering multi-sensor fusion, 3D perception, Bird's-Eye View representations, LiDAR point-cloud processing, object detection, trajectory and motion forecasting, path planning and reinforcement learning for adaptive control.",
      body2:
        "Explored how perception, prediction, planning and control are integrated to enable data-driven intelligent systems to interpret dynamic environments and support real-time decision-making.",

      topics: [
        "Multi-sensor fusion",
        "3D perception",
        "Bird's-Eye View representations",
        "LiDAR and point-cloud processing",
        "Object detection",
        "Trajectory and motion forecasting",
        "Path planning",
        "Reinforcement learning",
        "Adaptive control",
      ],
      relevance: [
        "Data quality",
        "Uncertainty",
        "Sensor constraints",
        "Real-time decisions",
        "Safety",
        "Model/system interaction",
      ],
    },
    {
      id: "his",
      phase: "Bridge · Aug 2025 – Jan 2026 · Innovation Management",
      institution: "University of Skövde",
      formalTitle: "Advanced-Level Studies in Innovation Management",
      title: "Advanced-Level Studies in Innovation Management",
      subtitle: "Innovation in Practice",
      period: "Aug 2025 – Jan 2026",
      body: "Focused on strategic innovation, applied innovation processes, implementation and innovation leadership.",
      body2:
        "Studied in parallel with the advanced AI foundation, this formed the innovation and product bridge developed further at Blekinge Institute of Technology.",
      chain: [
        "Advanced AI",
        "Innovation Opportunity",
        "Talking SCADA — Initial Concept",
        "Product / Requirements Development",
      ],

      projectCase: {
        title: "Course project — Talking SCADA (concept origin)",
        period: "Aug 2025 – Jan 2026",
        body: "Developed the initial concept for Talking SCADA, exploring how AI and existing operational data from building systems could turn complex system information into understandable insights and decision support for facility managers and operators. The work established the innovation opportunity and concept foundation later developed further through product management and requirements work.",
      },
      topics: [
        "Strategic innovation",
        "Applied innovation processes",
        "Implementation",
        "Innovation leadership",
      ],
      relevance: [],
    },
    {
      id: "bth",
      phase: "Phase 2 · Jan 2026 – Jun 2026 · Product · Industrial Economics · Requirements",
      institution: "Blekinge Institute of Technology",
      formalTitle:
        "Advanced-Level Specialization in Industrial Economics, Product & Requirements Management",
      title:
        "Advanced-Level Specialisation in Industrial Economics, Product & Requirements Management",
      subtitle: "Product · Requirements · Strategy · Leadership",
      period: "Aug 2025 – Jun 2026",
      body: "Building on the technical AI and innovation foundation, this phase focused on how customer needs and technology opportunities become viable products, requirements, business models and sustainable value.",
      body2:
        "Advanced-level specialization covering Industrial Economics and Management, Strategy and Business Models in Technology-Intensive Businesses, Product Management, Product and Requirements Management for Digital Environments, Agile Process and Project Management, and Leadership in High-Technology and Knowledge-Intensive Organizations.",

      projectCase: {
        title: "Course project — Talking SCADA (product & requirements case)",
        period: "Aug 2025 – Jun 2026",
        body: "Used Talking SCADA as a recurring academic product case to apply New Product Development, product discovery, digital product strategy and requirements engineering to an AI-enabled decision-support concept for building automation and SCADA/BMS environments. Applied methods across opportunity identification, product vision and value proposition, structured requirements management, feature prioritisation, MVP definition, product development governance, portfolio considerations, business model development and go-to-market planning — connecting customer needs and technical feasibility with sustainable business value.",
      },
      topics: [],
      relevance: [],

      groups: [
        {
          title: "Industrial Economics and Management",
          items: ["Business value", "Technology and business perspective", "Sustainable value"],
        },
        {
          title: "Strategy and Business Models in Technology-Intensive Businesses",
          items: [
            "Product strategy",
            "Value proposition",
            "Business model development",
            "Market relevance",
            "Go-to-market planning",
          ],
        },
        {
          title: "Product Management",
          items: [
            "New Product Development",
            "Opportunity identification",
            "Product discovery",
            "Product vision",
            "Feature prioritisation",
            "MVP definition",
          ],
        },
        {
          title: "Product and Requirements Management for Digital Environments",
          items: [
            "Product Requirements Document",
            "System-level requirements",
            "Functional and non-functional requirements",
            "Explainability and reliability",
            "Requirements prioritisation",
            "Technical feasibility",
          ],
        },
        {
          title: "Agile Process and Project Management",
          items: [
            "Iterative concept refinement",
            "MVP planning",
            "Development planning",
            "Product development governance",
          ],
        },
        {
          title: "Leadership in High-Technology and Knowledge-Intensive Organizations",
          items: ["Stakeholder alignment", "Communication", "Cross-functional perspective"],
        },
      ],
    },
  ],
  otherStudies: [
    {
      title: "Predictive Data Analytics",
      tags: ["Predictive Analytics", "Machine Learning", "Decision Support"],
    },
    {
      title: "Deep Learning for Industrial Imaging",
      tags: ["Deep Learning", "Computer Vision", "Industrial AI"],
    },
  ],
  otherStudiesNote:
    "Wider institutions involved in the postgraduate AI specialisation include Umeå University, Linköping University and Mälardalen University.",
};

export const certifications = [
  { institution: "University of Oxford", title: "AI Governance & Responsible AI" },
  { institution: "Stanford University Online", title: "Machine Learning Specialization" },
  { institution: "DeepLearning.AI", title: "Deep Learning Specialization" },
];

export const earlierFoundation = {
  title: "Earlier technical foundation",
  items: [
    {
      title: "IoT & Automation",
      institution: "Sjödals Gymnasium",
    },
    {
      title: "Robotic and Process Automation",
      institution: "PLC · Robotics · Process Automation",
    },
  ],
};
