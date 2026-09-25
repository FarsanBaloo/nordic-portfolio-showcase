import { advancedAiFoundationIntro, courseApplications, talkingScadaCourseCaseSummary } from "./course-applications";

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
  applicationItems: courseApplications.bachelorCoursework,

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
      id: "bth",
      phase: "Phase 2 · Product · Industrial Economics · Requirements · Delivery",
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
        period: "Aug 2025 – May 2026",
        body: talkingScadaCourseCaseSummary,
      },
      topics: [],
      relevance: [],

      groups: [
        {
          title: "Strategy and Business Models in Technology-Intensive Businesses",
          items: [
            "Product strategy",
            "Value proposition",
            "Business model development",
            "Market relevance",
            "Go-to-market planning",
          ],
          applicationItems: courseApplications.strategyBusinessModels,
        },
        {
          title: "Product Management",
          items: [
            "New Product Development (NPD)",
            "Product Requirements Document (PRD)",
            "Product vision & strategy",
            "Product discovery",
            "MVP definition",
            "Product Life Cycle",
          ],
          applicationItems: courseApplications.productManagement,
        },
        {
          title: "Product and Requirements Management for Digital Environments",
          items: [
            "System Requirements Document (SRD)",
            "Requirements traceability",
            "Cost-Value-Risk",
            "Requirements prioritisation",
            "Technical feasibility",
          ],
          applicationItems: courseApplications.requirementsManagement,
        },
        {
          title: "Agile Process and Project Management",
          items: [
            "Agile process",
            "Scrum",
            "MVP planning",
            "Development planning",
            "Prioritisation / delivery thinking",
          ],
          applicationItems: courseApplications.agile,
        },
        {
          title: "Leadership in High-Technology and Knowledge-Intensive Organizations",
          items: ["Stakeholder alignment", "Communication", "Cross-functional perspective"],
          applicationItems: courseApplications.leadership,
        },
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
        "Domain experience & applied AI",
        "Innovation in Practice — initial concept",
        "Product & requirements development",
        "Business & commercialisation planning",
      ],

      projectCase: {
        title: "Talking SCADA — concept origin in Innovation in Practice",
        period: "Aug 2025 – Jan 2026",
        items: courseApplications.innovation,
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
      id: "liu",
      phase: "Phase 1 · Advanced AI Foundation",
      institution: "Linköping University",
      formalTitle:
        "Advanced-Level Studies in Artificial Intelligence: Natural Language Processing",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Natural Language Processing",

      period: "Aug 2025 – Jan 2026",
      groupIntro: advancedAiFoundationIntro,
      applicationItems: courseApplications.nlp,
      topics: [
        "Natural Language Processing",
        "Transformer architectures",
        "Domain adaptation",
        "Sentiment classification",
        "PyTorch",
        "Parameter-Efficient Fine-Tuning (PEFT)",
        "Low-Rank Adaptation (LoRA)",
      ],
      relevance: [],
    },
    {
      id: "umu",
      phase: "Phase 1 · Advanced AI Foundation",
      institution: "Umeå University",
      formalTitle:
        "Advanced-Level Studies in Artificial Intelligence: Autonomous Systems & Perception",
      title: "Advanced-Level Studies in Artificial Intelligence",
      subtitle: "Autonomous Systems & Perception",
      period: "Jan 2026 – Jun 2026",
      applicationItems: courseApplications.autonomousSystems,

      topics: [
        "Multi-sensor fusion",
        "3D perception",
        "Object detection",
        "Path planning",
        "Reinforcement learning",
      ],
      relevance: [],
    },
    {
      id: "mdu-pda",
      phase: "Phase 1 · Advanced AI Foundation",
      institution: "Mälardalen University",
      formalTitle: "Predictive Data Analytics",
      title: "Predictive Data Analytics",
      subtitle: "Second cycle · completed November 2025",
      period: "Completed Nov 2025",
      applicationItems: courseApplications.predictiveAnalytics,
      topics: ["Predictive analytics", "Machine learning", "Prediction", "Decision support"],
      relevance: [],
    },
    {
      id: "mdu-dlii",
      phase: "Phase 1 · Advanced AI Foundation",
      institution: "Mälardalen University",
      formalTitle: "Deep Learning for Industrial Imaging",
      title: "Deep Learning for Industrial Imaging",
      subtitle: "Second cycle · completed December 2025",
      period: "Completed Dec 2025",
      applicationItems: courseApplications.industrialImaging,
      topics: ["Deep learning", "Computer vision", "Industrial imaging", "Industrial AI"],
      relevance: [],
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
