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
  afterItemsBody?: string[];
  quote?: string;
  subSections?: CaseSubsection[];
  links?: { label: string; href: string }[];
};

export type CaseSubsection = {
  heading: string;
  body?: string[];
  items?: string[];
  afterItemsBody?: string[];
  quote?: string;
  flow?: { label: string; steps: string[] };
  tags?: string[];
  links?: { label: string; href: string }[];
};

export type ProjectCategory =
  | "Industry"
  | "AI & Product"
  | "UX & Interaction"
  | "Academic / Research"
  | "Innovation";

export type TimelineCaseContent = {
  meta?: string;
  intro: string;
  sections: CaseSection[];
  ctaLabel: string;
};

/** Short, structured timeline-card content for ordinary project children. */
export type TimelineSummary = {
  context: string;
  items: { label: string; body: string }[];
};

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
  timelineContent?: TimelineCaseContent;
  timelineSummary?: TimelineSummary;
  tags: string[];
  highlight?: string;
  /** Prominent product pitch shown above everything else in the hero. */
  pitch?: { vision: string; explainer: string };
  /** Short value transformation line shown with the flow sequence. */
  valueTagline?: string;
  /** Small context note shown at the end of the case. */
  footnote?: string;
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
      "Discovery-led proof-of-concept AI assistant that explains industrial machine behaviour in natural language, evaluated with non-specialist users in a smart-factory testbed.",
    timelineSummary: {
      context:
        "Applied industrial AI project at Mälardalen Industrial Technology Center (MITC), a collaboration environment between Mälardalen University and industry.",
      items: [
        { label: "Problem", body: "Operators depend on specialists to interpret alarms, error codes and technical documentation, which delays troubleshooting." },
        { label: "My contribution", body: "Led discovery with system owners and testbed operators, framed the concept around explainability and self-service, and built the proof of concept using retrieval-augmented generation over live machine data and documentation, deployed at the edge." },
        { label: "Evaluation", body: "Non-specialist users worked through real incident scenarios in a smart-factory testbed, indicating that understandable explanations reduced the need to escalate to specialists." },
      ],
    },
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
        heading: "The problem",
        body: [
          "Industrial operators often depend on specialists to interpret alarms, error codes and technical documentation, resulting in delayed troubleshooting and unnecessary dependency on specialist support.",
          "The discovery question was therefore not how can we use an LLM? but how can we reduce dependency on specialists when something goes wrong?",
        ],
      },
      {
        heading: "Discovery",
        quote:
          "Product hypothesis: could AI translate industrial system context and specialist knowledge into understandable and actionable guidance?",
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
      {
        heading: "What this demonstrates",
        items: [
          "Problem-first AI discovery",
          "Translating specialist knowledge for non-specialist users",
          "Rapid validation with real users",
          "Communication and usability as part of technical feasibility",
          "Judging AI by whether it improves the user's job rather than model sophistication alone",
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
    subtitle: "Letting buildings explain their hidden energy waste in plain language",
    org: "University of Skövde · Blekinge Institute of Technology",
    meta: "AUG 2025 – MAY 2026",
    type: "Academic Product Case",
    priority: 2,
    flagship: true,
    categories: ["AI & Product", "Innovation", "Academic / Research"],
    teaser:
      "Academic product case exploring how AI could help SCADA systems — software that monitors and controls a building's ventilation, heating, cooling, measurements and alarms — explain hidden energy waste, likely causes and next investigation steps in plain language. I developed the concept from user need to MVP scope, requirements, prioritisation, positioning and business model; it is not a launched product.",
    tags: [
      "Product Discovery",
      "Requirements / PRD",
      "Prioritisation",
      "Product Strategy",
      "Applied AI",
      "Product Vision",
      "Jobs to Be Done",
      "Conceptual MVP",
      "Validation Planning",
      "Business Model",
      "Go-to-Market",
      "Multi-agent AI",
      "SCADA",
      "BMS",
    ],
    timelineContent: {
      meta: "ACADEMIC PRODUCT CASE · SKÖVDE → BTH · AUG 2025 – MAY 2026",
      intro: "SCADA systems monitor ventilation, heating, cooling, measurements and alarms in large buildings. Talking SCADA explores how they could explain in plain language where energy is wasted, why, and what to investigate next. I developed this academic concept from problem framing to requirements, prioritisation and commercialisation planning; it is not a launched product.",
      sections: [
        {
          heading: "Why",
          body: [
            "Buildings use around 40% of the EU's energy. Hidden waste — wrong schedules, faulty sensors, heating and cooling working against each other — often goes unnoticed. Talking SCADA lets the building explain it, while the person responsible still decides.",
          ],
          links: [
            {
              label: "Source: European Commission — energy use in buildings",
              href: "https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficient-buildings/energy-performance-buildings-directive_en",
            },
          ],
        },
        {
          heading: "Who it is for — users & customers",
          body: ["Users: building operators, facility, energy and maintenance teams. Customers: property owners, facility-management companies, multi-site enterprises and municipalities."],
        },
        {
          heading: "Pain",
          body: ["Users see energy use change without knowing why. Finding out means combining trends, alarms and settings across many views — often relying on scarce specialists."],
        },
        {
          heading: "Proposed job to be done",
          quote: "When my building uses more energy than expected, help me understand what changed, why, and where to investigate — so I can act without manually analysing every system.",
        },
        {
          heading: "What the concept is",
          body: ["A layer on top of existing control systems that answers questions in everyday language. Underneath, multi-agent AI decision support combines time-series data, system relationships and domain context — and shows the evidence so users can judge before acting."],
        },
        {
          heading: "Intended gains",
          items: [
            "Lower energy costs and emissions through earlier detection of hidden waste.",
            "Specialist knowledge made accessible — less dependence on individual experts.",
            "Clear, evidence-linked explanations and faster, better-informed decisions.",
            "Support for energy-performance goals and reporting.",
          ],
        },
        {
          heading: "My contribution",
          items: [
            "NPD & product definition: Product Innovation Charter, concept evaluation with Go/No-Go criteria, product protocol and PRD with MVP scope and acceptance criteria.",
            "Discovery & requirements: System Requirements Document linking user needs to goals, boundaries, data, integration and workflows.",
            "Value & prioritisation: ranked 22 requirements with Software Value Map and Cost-Value-Risk.",
            "Business & offer strategy: Business Model Canvas and business plan — segments, value proposition, SaaS packaging, partner channels, revenue and cost.",
            "Commercialisation & lifecycle: Make/Buy/Share, pilot tests, staged rollout and feedback loops.",
          ],
        },
        {
          heading: "Key product decisions",
          body: ["MVP bounded to one SCADA integration and selected HVAC subsystems, read-only. Explanations and anomaly detection carry the core value; explainability builds trust. The offer includes integration, onboarding and support."],
        },
        {
          heading: "Evidence & next validation step",
          body: ["Coursework produced requirements, design artefacts and plans. Next: test a narrow workflow against existing tools and simpler AI — measuring investigation time, explanation quality, operating cost and willingness to pay. Energy and cost benefits remain to be measured."],
        },
        {
          heading: "Origin & progression",
          body: ["Started in Innovation in Practice (University of Skövde), refined through Product Management, Requirements Management and Strategy & Business Models at Blekinge Institute of Technology, Aug 2025 – May 2026."],
        },
      ],
      ctaLabel: "Read the full case study",
    },
    sections: [
      {
        heading: "Overview & my contribution",
        body: [
          "Talking SCADA began in Innovation in Practice at the University of Skövde as a proposal for an AI-enabled service to help people understand hidden energy problems in buildings. I then refined the same academic concept through product, requirements and business coursework at Blekinge Institute of Technology, building on my industrial domain grounding and applied AI studies. The case explores multi-agent decision support centred on human judgement; it is not a launched product.",
          "Across the coursework, I produced an innovation report, productification and commercialisation plans, a product protocol, a Product Requirements Document (PRD), a System Requirements Document (SRD) and a business plan. Further reports examined digital-product value and asset/sourcing strategy. I connected these to examine how user needs, technical choices, delivery and a viable offer could fit together.",
        ],
      },
      {
        heading: "Problem & users",
        subSections: [
          { heading: "Why", body: [
            "Buildings use around 40% of the energy consumed in the EU, so improving their energy performance matters for operating costs, energy security and climate impact.",
            "A modern building combines heating, ventilation, cooling, controls, sensors, schedules and energy management, and these systems influence one another. An energy deviation may arise from an altered schedule or setpoint, an incorrect configuration, a faulty sensor, equipment running unnecessarily or conflicting control sequences. Heating and cooling may even work against each other.",
            "The challenge is often understanding what the data means and where to investigate.",
          ], links: [
            {
              label: "Source: European Commission — energy performance of buildings",
              href: "https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficient-buildings/energy-performance-buildings-directive_en",
            },
          ] },
          { heading: "Who it is for — users & customers", body: ["Intended users include building operators, facility managers, energy managers and technical service teams with different levels of HVAC/BMS expertise. Potential customer segments include commercial property owners, facility-management organisations, enterprises managing multiple buildings, and public-sector organisations such as municipalities. The stakeholder analysis also considered system integrators, development teams and product/business stakeholders."] },
          { heading: "Pain", body: ["Investigations can require navigating trends, alarms, configurations and relationships across several systems. Users must combine information from different views and interpret relationships that may not be directly visible."] },
          { heading: "Proposed job to be done", quote: "When my building uses more energy than expected, help me understand what changed, why it changed and where I should investigate, so I do not have to manually analyse every interacting system before I can act." },
        ],
      },
      {
        heading: "Concept & proposed user journey",
        subSections: [
          { heading: "What the concept is", body: [
            "In everyday terms: a way for the building to explain itself. Instead of reading trend curves and alarm lists, the person responsible asks a question and gets a plain-language answer about where energy is being wasted, what is likely causing it and what to look at next.",
            "The concept explores an explanation and decision-support layer for SCADA/BMS platforms. The proposed design combines historical time-series data with a semantic representation of building systems and their relationships. User scenarios address energy increases and underperforming HVAC systems.",
            "The intended interaction lets users ask a question, review possible causes and inspect references to the underlying sensors, alarms and system relationships before deciding what to do next. Direct control of physical building systems is outside the defined scope.",
          ] },
          { heading: "Proposed user journey", flow: { label: "", steps: ["Energy deviation", "What changed?", "Cross-system context", "Possible causes", "Supporting evidence", "Where should I investigate?"] } },
        ],
      },
      {
        heading: "Product decisions & MVP scope",
        subSections: [
          { heading: "NPD opportunity, concept evaluation & product definition", body: ["I developed a productification plan applying New Product Development (NPD) thinking to Talking SCADA:"], items: [
            "Opportunity identification: examined market pull, technology push and underused operational data, and outlined a Product Innovation Charter (PIC) covering background, focus, objectives and guidelines.",
            "Concept generation: proposed lead-user involvement and cross-functional expertise to clarify what useful explanations and an appropriate service could look like.",
            "Concept evaluation: examined originality, usefulness and producibility, and outlined technical and commercial screening criteria to support Go/No-Go decisions before committing further resources.",
            "Product definition: produced a product protocol covering target market, use context, positioning, the whole offer, delivery requirements, financial and regulatory considerations, strategic fit and risks; a separate PRD specifies scenarios, requirements, MVP scope and acceptance criteria.",
            "Development planning: considered parallel product, marketing and financial work, with iterative feedback, a clear team mandate and the capabilities needed for implementation.",
          ], afterItemsBody: ["These are completed analyses and proposed development approaches within the academic case."] },
          { heading: "System definition & requirements traceability", body: ["In the System Requirements Document (SRD), I separated domain, functional, data, quality, platform and regulatory requirements and defined the system boundary. I linked documented stakeholder and elicitation findings to goals and requirement IDs, making the reasoning behind requirements traceable. The proposed layer remains read-only, with operational decisions left to people."] },
          { heading: "Prioritisation example", body: [
            "I ranked 22 requirements and used Cost-Value-Risk analysis to examine critical requirements and their dependencies. Explanation generation and abnormal-behaviour detection ranked highest because they carry core product value and substantial technical uncertainty. Data access and system context were identified as enabling requirements.",
            "Explainability and usability were prioritised early for trust and adoption. The analysis also treated security and system boundaries as conditions that must be addressed from the start.",
          ] },
          { heading: "MVP definition", body: ["In the PRD, I defined an initial scope of integration with one SCADA system, diagnostics for selected HVAC subsystems, and a web-based conversational interface explaining energy anomalies. This gives the initial product evaluation a bounded operating context."] },
          { heading: "Success measures & acceptance criteria", body: ["I identified intended success measures around investigation time, energy waste and operational insight. The PRD includes acceptance criteria for natural-language queries, explanations of probable causes, response time and analysis of system relationships. The SRD sets separate quality targets for availability, usability, security, explainability, reliability and maintainability. These define what the product should achieve; none of them have been measured yet."] },
          { heading: "Why AI and a multi-agent approach?", body: ["AI is explored for making operational information and specialist domain context easier to interpret. The multi-agent approach is a design direction within the concept. Further validation should examine whether it offers enough benefit over simpler analytical or retrieval-based support to justify additional complexity."] },
        ],
      },
      {
        heading: "Value proposition & business assumptions",
        body: ["The concept aims to support:"],
        items: [
          "Lower energy costs and less waste through earlier identification of hidden inefficiencies, with potential reductions in operational emissions.",
          "More accessible specialist knowledge, reducing dependence on individual experts and repeated external troubleshooting.",
          "Clear explanations of likely causes, linked to relevant building data and system relationships.",
          "Faster, better-informed decisions through natural-language interaction and clearer next steps.",
          "Flexible, question-driven investigation across interconnected building systems.",
          "Support for energy-performance goals and relevant reporting and compliance work.",
        ],
        afterItemsBody: ["These are intended gains within the academic case, not measured outcomes."],
        subSections: [
          { heading: "Positioning & go-to-market", body: [
            "In the innovation report, I used PESTEL to examine external drivers and VRIO to assess resources and organisational capabilities. The analysis highlighted the need for cross-functional expertise, leadership support and a culture of learning.",
            "In the product protocol and business plan, I explored competitive positioning around cross-system diagnostics and understandable explanations for operators. I outlined a proposed introduction through early adopters and system-integrator partnerships, supported by integration assistance, onboarding and ongoing service.",
          ] },
          { heading: "Business model, packaging & value assessment", body: [
            "I used a Business Model Canvas to connect customer segments and value propositions with customer relationships, channels, key partners, activities and resources, cost structure and revenue streams. The proposed offer combines decision support with integration, ongoing support and continuous improvement.",
            "The business plan explores subscriptions and tiered SaaS packaging, ranging from building-level explanations to advanced diagnostics and portfolio-level support. I also outlined development, cloud and maintenance cost drivers and initial investment needs.",
            "I derived selected requirements from the value proposition and product definition, then used Software Value Map to assess functionality, reliability and usability alongside development cost and architectural maintainability. The assessment highlighted the value of a usable interface and explainable decision support, while making the development effort and technical debt associated with analysis, integration and model improvement visible. These were estimates within the academic case.",
          ] },
          { heading: "Assets, knowledge & Make/Buy/Share", body: [
            "I examined how code, requirements, architecture, documentation and tacit domain knowledge could be maintained and reused. This included codification and personal knowledge-sharing as complementary approaches to preserving expertise.",
            "I classified components as commodities, qualifiers or differentiators. I proposed concentrating internal development on domain-specific graph reasoning, root-cause analysis and traceable explanations, while using reusable AI components and externally sourced infrastructure where appropriate.",
            "I also examined service-based revenue and the possibility of bundling the concept with existing platform or service offers. The commercial assumptions, pricing model and expected gains remain subject to market validation.",
          ] },
          { heading: "Commercialisation & product life cycle", body: [
            "I developed a commercialisation plan covering parallel technical and marketing launch preparation. This connected integration and delivery capabilities with positioning, SaaS packaging, partner channels and proposed product-use testing.",
            "I proposed a staged market introduction, including geographic rollout, followed by performance monitoring, corrective action and customer-feedback loops. The plan considers how pricing, marketing and feature priorities could evolve through introduction, growth, maturity and decline. These are proposed commercialisation and lifecycle activities.",
          ] },
        ],
      },
      {
        heading: "Evidence & validation approach",
        subSections: [
          { heading: "Documented academic work", items: [
            "Innovation report with problem framing, PESTEL, VRIO, the Four Ps of innovation and a proposed Design Thinking approach.",
            "Productification plan with opportunity framing, a proposed PIC, concept generation, concept evaluation and development planning.",
            "Commercialisation plan with technical and marketing readiness, proposed market tests, staged introduction and post-launch lifecycle considerations.",
            "Product protocol covering the market, whole offer, delivery requirements, strategic fit and risks; a separate PRD specifying scenarios, requirements, MVP scope, intended success measures and acceptance criteria.",
            "System Requirements Document (SRD) with stakeholder analysis, elicitation findings, requirements traceability, system boundaries, ranking and Cost-Value-Risk analysis.",
            "Context diagram, conceptual data model, virtual window, interface mockup and task description.",
            "Business Model Canvas, Software Value Map and business plan with positioning, packaging and proposed go-to-market.",
            "Asset-management reflection, Make/Buy/Share analysis and an evaluation of open-source business-model options.",
          ] },
          { heading: "Documented elicitation", body: [
            "The initial innovation report proposed interviews, observation and prototyping within a Design Thinking approach. My later system requirements document records findings from interviews, observation and a simple chat-based prototype, and maps those findings to goals and requirements.",
            "One documented observation was that investigations required combining multiple views and inferring relationships between systems. This informed requirements for graph context, combined data queries and referenced explanations.",
          ] },
          { heading: "Further product validation", body: [
            "The commercialisation plan and business plan propose pilot installations, product-use testing and market validation before wider introduction. I also considered speculative-sale testing: presenting a proposed product pitch to assess customer interest and willingness to adopt.",
            "The next validation step is to run one narrow investigation workflow with representative users and real building data, comparing it with existing tools and with simpler analytical or retrieval-based support. It should assess investigation time, explanation quality, traceability, usefulness of next steps, customer value, service operating costs and willingness to pay.",
            "The coursework provides requirements, analyses and design artefacts. Quality targets and expected energy, cost and emissions benefits require separate measurement.",
          ] },
        ],
      },
      {
        heading: "How the case evolved",
        body: [
          "Talking SCADA started with my project in Innovation in Practice. I framed the service opportunity, analysed external drivers and organisational capabilities, and proposed an approach to user-centred development. My domain experience and applied AI studies provided the technical foundation.",
          "I then carried the same concept into coursework within my specialisation in Industrial Economics and Management at Blekinge Institute of Technology. The Talking SCADA case runs from August 2025 to May 2026, within the BTH specialisation continuing to June 2026 and broader postgraduate studies continuing to July 2026:",
        ],
        items: [
          "Product Management: productification and commercialisation plans covering the NPD process, concept evaluation, launch preparation and product life cycle, together with a product protocol and PRD defining the offer, scenarios, requirements, MVP scope and acceptance criteria.",
          "Product & Requirements Management: SRD, elicitation, requirements traceability and prioritisation; separate digital-product value and asset/sourcing analyses using Software Value Map, Business Model Canvas and Make/Buy/Share.",
          "Strategy & Business Models: a business plan connecting competitive positioning, packaging, revenue logic, partner channels, cost drivers and a proposed market-entry plan.",
        ],
        subSections: [{ heading: "Methods & domains", tags: ["PESTEL", "VRIO", "Design Thinking", "New Product Development (NPD)", "Product Innovation Charter (PIC)", "Concept Evaluation", "Product Vision", "Product Discovery", "Product Definition", "Product Positioning", "Stakeholder Analysis", "Requirements Elicitation", "Jobs to Be Done", "Requirements Management", "PRD & SRD", "Requirements Traceability", "Quality Requirements", "Value-Driven Design", "Reliability", "MVP Definition", "Success Measures", "Acceptance Criteria", "Explainability", "Prioritisation", "Cost-Value-Risk", "Software Value Map", "Business Model Canvas", "Business Planning", "Asset & Knowledge Management", "Make/Buy/Share", "Product Strategy", "Go-to-Market", "Commercialisation Planning", "Market Testing", "Validation Planning", "Product Life Cycle", "Applied AI", "Multi-agent AI", "SCADA", "BMS"] }],
      },
      {
        heading: "Reflection & next steps",
        body: [
          "Carrying one concept through innovation, product, requirements and business coursework showed how early framing decisions shape later scope, prioritisation and commercial assumptions. It also reinforced that useful innovation depends on user understanding, organisational readiness and cross-functional collaboration.",
          "Next, I would validate a narrow investigation workflow with users and real building data, then use those findings to refine requirements, MVP scope, quality targets and business assumptions.",
        ],
      },
    ],
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
    footnote: "Academic product case based on general industry and domain knowledge.",
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
      "Uncertainty-aware 48-hour wind power forecasting for SE1 and SE3, framed around risk-aware energy planning rather than prediction accuracy alone.",
    timelineSummary: {
      context:
        "Bachelor thesis co-authored with Fredrik Karlsson within an interdisciplinary Mälardalen University and Electrification Hub initiative on electrification and energy systems.",
      items: [
        { label: "Problem", body: "Point forecasts say little about uncertainty, which makes planning, storage and flexibility decisions harder for energy planners." },
        { label: "My contribution", body: "Built and evaluated the forecasting pipeline on real Swedish wind and weather data for SE1 and SE3, using a Temporal Fusion Transformer with quantile regression to produce uncertainty ranges." },
        { label: "Product relevance", body: "An AI output is only useful when its uncertainty and limitations are presented in a way that supports the decision the user actually has to make." },
      ],
    },
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
          "Product relevance: The work reinforced that an AI output is only useful when the uncertainty and limitations are presented in a way that supports the user's actual decision.",
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
      "Digital-platform integration of a wider data-centre IIoT environment into one unified operational platform in a mission-critical setting.",
    timelineSummary: {
      context:
        "Mission-critical data-centre environment, delivered as Senior Technical Advisor — Digital Platforms at Schneider Electric.",
      items: [
        { label: "Problem", body: "A complex connected infrastructure had to be integrated reliably, without disrupting operational continuity." },
        { label: "My contribution", body: "Technical discovery, customer and operational requirements, solution architecture, integration strategy and end-to-end technical ownership through validation and delivery." },
        { label: "Trade-offs", body: "Balanced customer needs, integration complexity, lifecycle implications and long-term maintainability across systems and stakeholders." },
      ],
    },
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
          "Leadership relevance: Complex integration required coordination across systems and stakeholders, clear handling of constraints and disciplined technical decision-making in a mission-critical environment.",
        ],
      },
    ],
  },
  {
    slug: "kth-living-lab",
    title: "KTH Live-In Lab",
    subtitle: "Open innovation platform for smart buildings and energy",
    org: "Schneider Electric",
    meta: "Project role: EcoStruxure Subject Matter Expert · Schneider's contact at KTH Live-In Lab",
    type: "Open Innovation Collaboration",
    priority: 5,
    flagship: true,
    categories: ["Industry", "Innovation", "Academic / Research"],
    teaser:
      "KTH Live-In Lab is an open innovation platform where industry partners, KTH researchers and universities collaborate on sustainable buildings and energy through full-scale residential testbeds. I took part through Schneider Electric as its contact and subject matter expert for EcoStruxure Building Operation — the building-management software that connects HVAC, lighting, energy and sensors into one place — supporting researchers with technical questions and engineering.",
    timelineSummary: {
      context:
        "Open innovation platform at KTH with full-scale residential testbeds. I participated through Schneider Electric, not as a KTH employee.",
      items: [
        { label: "My role", body: "Schneider Electric's contact at the centre and subject matter expert for EcoStruxure Building Operation, its building-management software." },
        { label: "My contribution", body: "Supported KTH researchers with platform expertise and the engineering parts of their research on sustainable buildings and energy efficiency, and explained what the platform could and could not support." },
        { label: "Innovation perspective", body: "Ideas were assessed against both research ambition and what deployed industrial platforms can realistically support." },
      ],
    },
    tags: [
      "Smart Buildings",
      "IoT",
      "Applied Research",
      "Energy Efficiency",
      "Platform Capability",
      "Feasibility",
      "Open Innovation",
      "Industry-Academia Collaboration",
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "KTH Live-In Lab is a research centre and open innovation platform at KTH where industry partners, KTH researchers and other universities collaborate on sustainable buildings and energy efficiency. It offers full-scale testbeds in real residential buildings, shared data and a structured project process — designed to increase the pace of innovation in the construction and real-estate sector.",
          "Several test environments were connected to Schneider Electric's EcoStruxure Building Operation platform — Schneider Electric's software platform for building management, which connects a building's technical systems (HVAC, lighting, energy, sensors and more) into one place for monitoring, control and data. That platform data is what made the lab's smart-building and energy research possible. My role was to be Schneider Electric's contact at KTH Live-In Lab.",
        ],
      },
      {
        heading: "Contribution",
        items: [
          "Represented Schneider Electric as one of the centre's industry members and acted as Schneider's contact at KTH Live-In Lab",
          "Acted as subject matter expert for Schneider Electric's EcoStruxure Building Operation platform — the building-management software that monitors, controls and collects data from a building's technical systems — and its ecosystem",
          "Worked in cross-disciplinary constellations with KTH researchers and other partner companies",
          "Helped KTH researchers with technical questions and with the engineering parts needed for their research on sustainable buildings and energy efficiency",
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
          "Collaboration relevance: Worked at the boundary between applied research and real industrial-platform constraints, contributing domain expertise while balancing experimental ambition with what could realistically work in deployed systems.",
          "Open innovation in practice: value came from combining several organisations' capabilities around a shared testbed, so ideas were assessed against both research ambition and what deployed industrial platforms can actually support.",
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
      { label: "Centre and project partners", href: "https://www.liveinlab.kth.se/en/om-kth-live-in-lab/centrum-och-projektpartners-1.965775" },
      { label: "Video: What is EcoStruxure Building Operation?", href: "https://www.youtube.com/watch?v=ieNdW6uAX_4" },
    ],
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
      "Discovery with the customer inside an operating theatre, translated into a unified interface that consolidated every room system on an edge architecture — proven in one theatre, then rolled out to the rest.",
    timelineSummary: {
      context:
        "Mission-critical operating theatres at an eye-care centre of excellence, delivered as Senior Technical Advisor — Digital Platforms at Schneider Electric.",
      items: [
        { label: "Problem", body: "Surgeons, nurses and theatre staff had to work across scattered subsystems instead of one interface for the room and the procedure." },
        { label: "My contribution", body: "Ran discovery inside a real operating theatre, translated the workflow into a tailored unified interface, and owned requirements, solution direction and integration of lighting, HVAC, CCTV, door-lock interlocks, nurse call and microscope video on an edge architecture." },
        { label: "Outcome", body: "Proven in one theatre, including door-lock interlocks, then rolled out to the remaining theatres." },
      ],
    },
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
      {
        heading: "Product relevance",
        body: [
          "This was not only a technical integration problem. It required understanding how different users worked, reconciling operational and technical constraints, creating confidence in a shared direction and proving the solution before broader rollout.",
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
      "Recurring field needs turned into a reusable HVAC monitoring and deviation-management product, sold to customers through the market organisation.",
    timelineSummary: {
      context:
        "Developed at Schneider Electric during my time as Support Engineer / National Technical Expert.",
      items: [
        { label: "Problem", body: "The same HVAC monitoring and deviation-management needs kept recurring and were solved again for each customer." },
        { label: "My contribution", body: "Owned the development of a reusable product covering deviation detection, alarms, trend logging, visualisation and documentation, packaged for consistent deployment across customer systems." },
        { label: "Product relevance", body: "An early shift from solving individual customer problems to turning recurring field needs into a repeatable offer." },
      ],
    },
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
          "Product relevance: Recurring needs observed across customer environments were turned into a repeatable capability rather than solved as isolated one-off issues — combining operational insight, standardisation, reuse and deployment practicality.",
        ],
      },
    ],
  },
  {
    slug: "planet-resande",
    title: "PLANE(ra)T Resande",
    subtitle: "Sustainable Travel Decision-Support Concept",
    org: "Mälardalen University · Interaction Design",
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
      "Team project in Interaction Design. Individual contribution is described only where it can be stated accurately.",
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
    org: "Mälardalen University · Interaction Design",
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
      "Team project in Interaction Design. The result is an adaptive wellbeing service concept, not a production AI model.",
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
    org: "Mälardalen University · Interaction Design",
    meta: "Individual Assignment",
    type: "Individual Assignment",
    priority: 11,
    flagship: false,
    categories: ["UX & Interaction", "Academic / Research"],
    teaser:
      "An independent academic accessibility and heuristic evaluation of Microsoft's Seeing AI iOS application — not a collaboration with Microsoft — with concrete design recommendations and a validation plan.",
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
