# Align role descriptions on the site with the new CV

Yes — the role wording should be updated. The CV page already matches the new CV, but the Journey timeline and the expandable role detail still use the older wording and miss several of the strongest points from the new CV, especially product-ownership evidence.

## What is missing today

**Support Engineer (2013–2020)** — the strongest new item is missing entirely: owning the development of a reusable HVAC deviation-management capability for the market organisation (detection, alarms, logging, visualisation; consistent deployment across customer systems). Also missing: prioritising and coordinating critical issues by operational impact, urgency and risk; root-cause analysis separating implementation problems from real product defects and escalating verified defects to Global Product Support and R&D; the explicit stakeholder set (field engineers, Advanced Solution Support, system architects, Product Owners, Global Product Support, R&D, market teams).

**Senior Technical Advisor (2020–2025)** — missing: representing Schneider Electric in KTH Living Lab; the mission-critical delivery framing (data centre, pharmaceutical, healthcare; consolidation into a unified HMI and edge-based architecture) is only in the detail groups, not in the three visible bullets; mentoring is present but the CV ties it to delivery quality and consistency.

**Project Engineer (2003–2013)** — missing: managing smaller customer projects and technical work packages while supporting project managers on larger installations; technical ownership of large-scale building-automation and integrated-control projects; mentoring on integration patterns and scalable solution design.

## Must-have bullets per role (the visible three)

**Project Engineer**
1. Gathered operational needs from property managers, operations technicians, facility teams and end users and turned them into implementation-ready designs and configurations.
2. Managed smaller customer projects and work packages, and held technical ownership of large-scale building-automation and integrated-control projects from design through commissioning and handover.
3. Acted as quality tester with R&D on the IoT building-automation platform, and mentored engineers on integration patterns and scalable, maintainable solution design.

**Support Engineer / National Technical Expert**
1. Owned the development of a reusable HVAC deviation-management capability for the market organisation — detection, alarms, logging and visualisation — turning operational data into actionable insight and enabling consistent deployment across customer systems.
2. Turned recurring customer issues and real-world usage into structured product feedback and enhancement proposals justified on customer impact, business value and market needs, with Product Owners, Global Product Support and R&D.
3. Prioritised critical issues by operational impact and risk, performed root-cause analysis separating implementation problems from product defects, and supported release validation, deployment readiness and controlled rollout.

**Senior Technical Advisor**
1. Led customer-facing discovery and translated customer, operational and project needs into structured requirements, alternative architectures and product/solution options.
2. Held end-to-end technical ownership and influenced prioritisation, product selection and architectural trade-offs, balancing customer value, feasibility, lifecycle risk, cost and commercial value.
3. Delivered mission-critical platform integrations across data-centre, pharmaceutical and healthcare environments (unified HMI, edge-based architecture), and contributed domain expertise in KTH Living Lab.

## Technical changes

- `src/content/timeline.ts` — rewrite `overviewBullets` for `project-engineer`, `national-expert`, `senior-advisor`; adjust `relevanceSignals` so the Support Engineer role carries a capability-ownership signal and the Advisor role carries mission-critical delivery.
- `src/content/experience.ts` — update `bullets`, add the deviation-management capability and issue-prioritisation items to the Support Engineer role, add project/work-package management and mentoring to the Project Engineer role, add KTH Living Lab to the Advisor notes/details, and refresh `tags` accordingly.
- No layout, component or styling changes. All dates, employers and facts stay exactly as in the CV.
