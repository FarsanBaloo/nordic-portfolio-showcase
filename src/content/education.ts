export type CourseGroup = { title: string; items: string[] };

export const bachelor = {
  title: "Bachelor of Science in Computer Science",
  specialisation: "Specialisation in Intelligent Systems",
  institution: "Mälardalen University — MDU",
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
    "After completing the BSc, I undertook an intensive postgraduate development period from August 2025 to July 2026 covering advanced AI, Innovation Management, Industrial Economics, Product Management, Product & Portfolio Strategy, Requirements, Strategy & Business Models, Agile development and Leadership.",
  first: [
    "Natural Language Processing",
    "Autonomous Systems & Perception",
    "Innovation in Practice",
  ],
  entries: [
    {
      id: "liu",
      institution: "Linköping University",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Natural Language Processing",
      period: "2025 – 2026",
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
      institution: "Umeå University",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Autonomous Systems & Perception",
      period: "2025 – 2026",
      body: "Advanced-level studies in autonomous systems and machine perception, covering multi-sensor fusion, 3D perception, Bird's-Eye View representations, LiDAR point-cloud processing, object detection, trajectory and motion forecasting, path planning and reinforcement learning for adaptive control. Explored how perception, prediction, planning and control are integrated to enable data-driven autonomous systems to interpret dynamic environments and support real-time decision-making.",
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
      institution: "University of Skövde",
      title: "Advanced-Level Studies in Innovation Management",
      subtitle: "Innovation in Practice",
      period: "Aug 2025 – Jan 2026",
      body: "Focused on strategic innovation, applied innovation processes, implementation and innovation leadership.",
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
      institution: "Blekinge Institute of Technology",
      title:
        "Advanced-Level Specialisation in Industrial Economics, Product & Requirements Management",
      subtitle: "Product · Requirements · Strategy · Leadership",
      period: "Aug 2025 – Jun 2026",
      body: "Advanced-level specialisation covering Industrial Economics and Management, Strategy and Business Models in Technology-Intensive Businesses, Product Management, Product and Requirements Management for Digital Environments, Agile Process and Project Management, and Leadership in High-Technology and Knowledge-Intensive Organisations.",
      projectCase: {
        title: "Course project — Talking SCADA (product & requirements case)",
        period: "Aug 2025 – Jun 2026",
        body: "Used Talking SCADA as a recurring academic product case to apply New Product Development, product discovery, digital product strategy and requirements engineering to an AI-enabled decision-support concept for building automation and SCADA/BMS environments. Applied methods across opportunity identification, product vision and value proposition, structured requirements management, feature prioritisation, MVP definition, product development governance, portfolio considerations, business model development and go-to-market planning — connecting customer needs and technical feasibility with sustainable business value.",
      },
      topics: [],
      relevance: [],

      groups: [
        {
          title: "Product & Portfolio",
          items: [
            "Product Management",
            "New Product Development",
            "Product Strategy",
            "Portfolio Strategy",
            "Product Lifecycle",
            "Opportunity identification",
            "Product vision",
            "Value proposition",
            "Feature prioritisation",
            "MVP",
          ],
        },
        {
          title: "Requirements & Delivery",
          items: [
            "Product Requirement Management",
            "Requirements engineering",
            "Customer needs",
            "Prioritisation",
            "Product definition",
            "Agile",
            "Project/process management",
            "Governance",
          ],
        },
        {
          title: "Strategy & Business",
          items: [
            "Industrial Economics",
            "Strategy",
            "Business Models",
            "Technology-Intensive Businesses",
            "Sustainable Business Value",
            "Go-to-Market",
          ],
        },
        {
          title: "Leadership",
          items: [
            "Leadership",
            "Stakeholder alignment",
            "Communication",
            "High-technology organisations",
            "Knowledge-intensive organisations",
          ],
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
