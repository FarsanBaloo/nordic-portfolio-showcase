import { Fragment, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { roles } from "../content/experience";
import { getProject } from "../content/projects";
import { ProjectEvidenceSheet } from "./ProjectEvidenceSheet";
import {
  milestones,
  parallelBridge,
  type TimelineChild,
  type TimelineMilestone,
} from "../content/timeline";

function accentFor(track: TimelineMilestone["track"]) {
  return track === "development" ? "var(--development-accent)" : "var(--professional-accent)";
}

function trackLabel(track: TimelineMilestone["track"]) {
  return track === "development" ? "Development" : track === "direction" ? "Now" : "Professional";
}

const FOCUS_SPRING = { stiffness: 110, damping: 29, mass: 0.35 } as const;

/** Scroll-linked focus progress for one row: 0 far before, 0.5 in focus, 1 far after.
 *  Continuous visuals stay on motion values; React state only flips on the
 *  semantic inactive → active threshold. */
function useFocusMotion(
  ref: React.RefObject<HTMLElement | null>,
  reduced: boolean,
  variant: "parent" | "child" = "parent",
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"],
  });
  const smooth = useSpring(scrollYProgress, FOCUS_SPRING);
  const parentScale = [0.992, 1, 1.021, 1.002, 0.995];
  const childScale = [0.996, 1, 1.011, 1.001, 0.997];
  const scale = useTransform(
    smooth,
    [0, 0.3, 0.5, 0.72, 1],
    variant === "parent" ? parentScale : childScale,
  );
  const opacity = useTransform(smooth, [0, 0.3, 0.5, 0.72, 1], [0.9, 0.96, 1, 0.98, 0.93]);
  const y = useTransform(
    smooth,
    [0, 0.3, 0.5, 0.72, 1],
    variant === "parent" ? [0, 0, -3, 0, 0] : [0, 0, -1, 0, 0],
  );
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setActive(true);
      return;
    }
    return smooth.on("change", (v) => {
      const next = v > 0.24 && v < 0.86;
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    });
  }, [smooth, reduced]);

  return { scale, opacity, y, active };
}

type NodeLevel = "major" | "phase" | "minor";

const nodeSize: Record<NodeLevel, { idle: number; active: number }> = {
  major: { idle: 18, active: 21 },
  phase: { idle: 11, active: 15 },
  minor: { idle: 7, active: 9 },
};

function Node({
  lit,
  isNow,
  accent,
  level = "phase",
}: {
  lit: boolean;
  isNow: boolean;
  accent: string;
  level?: NodeLevel;
}) {
  const size = nodeSize[level];
  const d = lit ? size.active : size.idle;
  return (
    <span
      aria-hidden="true"
      className="relative block rounded-full border-2 transition-[width,height,background-color,border-color,box-shadow] duration-500 ease-out"
      style={{
        width: d,
        height: d,
        backgroundColor: lit ? accent : "#070d18",
        borderColor: lit ? accent : `color-mix(in oklab, ${accent} 32%, transparent)`,
        boxShadow: lit ? `0 0 14px 0 color-mix(in oklab, ${accent} 45%, transparent)` : "none",
      }}
    >
      {isNow ? (
        <span
          className="absolute -inset-2 rounded-full opacity-25"
          style={{
            backgroundColor: accent,
            animation: "star-breathe 4.5s ease-in-out infinite",
          }}
        />
      ) : null}
    </span>
  );
}

/** Fixed, verified year / phase label rendered beside a rail node. */
function RailLabel({
  label,
  active,
  accent,
  className,
}: {
  label: string;
  active: boolean;
  accent: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute whitespace-nowrap font-mono text-[12.5px] font-medium tracking-[0.08em] transition-colors duration-500",
        className ?? "",
      ].join(" ")}
      style={{ color: active ? accent : "#A5B1BA" }}
    >
      {label}
    </span>
  );
}

/** Short horizontal connector from the central rail to a child card. */
function Connector({ accent, side }: { accent: string; side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "pointer-events-none absolute top-7 hidden h-px w-10 min-[1100px]:block",
        side === "right" ? "-left-10" : "-right-10",
      ].join(" ")}
      style={{
        background:
          side === "right"
            ? `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 25%, transparent))`
            : `linear-gradient(270deg, ${accent}, color-mix(in oklab, ${accent} 25%, transparent))`,
        boxShadow: `0 0 8px 0 color-mix(in oklab, ${accent} 40%, transparent)`,
      }}
    >
      <span
        className={[
          "absolute top-1/2 block h-1.5 w-1.5 -translate-y-1/2 rounded-full",
          side === "right" ? "right-0" : "left-0",
        ].join(" ")}
        style={{ backgroundColor: accent }}
      />
    </span>
  );
}

function ChildShell({
  accent,
  side,
  index,
  reduced,
  children,
}: {
  accent: string;
  side: "left" | "right";
  index: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const fromX = side === "right" ? 16 : -16;
  return (
    <motion.div
      className="relative min-w-0"
      initial={reduced ? false : { opacity: 0, x: fromX, scale: 0.985 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.075, ease: [0.22, 1, 0.36, 1] }}
    >
      <Connector accent={accent} side={side} />
      {children}
    </motion.div>
  );
}

function ProjectChildCard({
  child,
  accent,
}: {
  child: Extract<TimelineChild, { kind: "project" }>;
  accent: string;
}) {
  const project = getProject(child.slug);
  if (!project) return null;
  const lead = project.images?.slots.find((slot) => slot.src);
  return (
    <ProjectEvidenceSheet project={project} period={child.period}>
      <button
        type="button"
        className="night-card group block w-full min-w-0 rounded-xl p-4 text-left transition-colors duration-300 hover:bg-white/[0.06] focus-visible:outline-none"
        style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 55%, transparent)` }}
      >
        {lead ? (
          <div className="mb-3 hidden overflow-hidden rounded-lg border border-night-border/70 sm:block">
            <img
              src={lead.src}
              alt={lead.alt ?? lead.caption}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        ) : null}
        <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
          {child.period ?? project.type}
        </p>
        <h4 className="mt-1 text-[17.5px] font-semibold text-night-foreground">{project.title}</h4>

        {project.subtitle ? (
          <p className="mt-1 text-[13.5px] text-night-muted">{project.subtitle}</p>
        ) : null}
        <p className="mt-2 text-[15px] leading-relaxed text-night-body">{project.teaser}</p>
        {child.note ? (
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
            {child.note}
          </p>
        ) : null}
        {child.caseNotes?.length ? (
          <ul className="mt-3 space-y-1.5">
            {child.caseNotes.map((n) => (
              <li
                key={n}
                className="border-l pl-2.5 text-[13.5px] leading-relaxed text-night-muted"
                style={{ borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }}
              >
                {n}
              </li>
            ))}
          </ul>
        ) : null}
        {child.continuityChain?.length ? (
          <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
            {child.continuityChain.map((step, i) => (
              <li key={step} className="flex items-center gap-1.5">
                <span className="rounded-md border border-night-border bg-white/5 px-2 py-0.5 text-[12px] text-night-body">
                  {step}
                </span>
                {i < child.continuityChain!.length - 1 ? (
                  <span aria-hidden="true" style={{ color: accent }}>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}
        <span
          className="mt-3 inline-flex min-h-[24px] items-center gap-2 text-[13.5px] transition-opacity group-hover:opacity-80"
          style={{ color: accent }}
        >
          Open case study <span aria-hidden="true">→</span>
        </span>
      </button>
    </ProjectEvidenceSheet>
  );
}

function StudyChildCard({
  child,
  accent,
}: {
  child: Extract<TimelineChild, { kind: "course" | "topics" }>;
  accent: string;
}) {
  const compact = child.variant === "compact";
  return (
    <div
      className="night-card min-w-0 rounded-xl p-4 sm:p-[18px]"
      style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 45%, transparent)` }}
    >
      {child.org ? (
        <p className="font-mono text-[12.5px] uppercase tracking-[0.09em] text-[#929FAA]">
          {child.org}
        </p>
      ) : null}
      {child.university ? (
        <p className="mt-1 text-[14px] font-medium text-[#B4C0C8]">{child.university}</p>
      ) : null}
      <h4
        className={
          compact
            ? "mt-1 font-display text-[17.5px] font-semibold leading-[1.32] text-[#F4F7F9]"
            : "mt-1 font-display text-[18.5px] font-semibold leading-[1.32] text-[#F4F7F9]"
        }
      >
        {child.formalTitle ?? child.title}
      </h4>
      {child.level ? (
        <p className="mt-1 font-mono text-[12.5px] uppercase tracking-[0.09em] text-[#929FAA]">
          {child.level}
        </p>
      ) : null}
      {child.signals?.length ? (
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {child.signals.map((s) => (
            <li
              key={s}
              className="rounded-full border border-night-border px-2.5 py-0.5 text-[12.5px] text-[#CDD6DD]"
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
      {child.body ? (
        <p className="mt-2.5 text-[15.5px] leading-[1.6] text-[#D3DBE2]">{child.body}</p>
      ) : null}
      {child.body2 ? (
        <p className="mt-2.5 text-[15.5px] leading-[1.6] text-[#D3DBE2]">{child.body2}</p>
      ) : null}
      {child.scadaLink ? (
        <p className="mt-2.5 border-l pl-2.5 text-[14.5px] leading-[1.55] text-[#B8C3CB]"
          style={{ borderColor: `color-mix(in oklab, ${accent} 45%, transparent)` }}
        >
          {child.scadaLink}
        </p>
      ) : null}
      {child.topics.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {child.topics.map((t) => (
            <li
              key={t}
              className="rounded-full border border-night-border px-2.5 py-0.5 text-[12.5px] text-[#CDD6DD]"
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      {child.chain?.length ? (
        <ol className="mt-3 space-y-1">
          {child.chain.map((step, i) => (
            <li key={step} className="text-[14.5px] text-[#D3DBE2]">
              {i > 0 ? (
                <span aria-hidden="true" className="mr-1.5" style={{ color: accent }}>
                  ↓
                </span>
              ) : null}
              {step}
            </li>
          ))}
        </ol>
      ) : null}
      {child.relevance ? (
        <div className="mt-3 border-t border-night-border/50 pt-3">
          <p className="font-mono text-[12.5px] uppercase tracking-[0.09em] text-[#929FAA]">
            Product relevance
          </p>
          <p className="mt-1 text-[15.5px] leading-[1.6] text-[#D3DBE2]">{child.relevance}</p>
        </div>
      ) : null}
    </div>
  );
}


function runs(items: TimelineChild[]) {
  const out: { compact: boolean; items: TimelineChild[] }[] = [];
  for (const c of items) {
    const isCompact = c.kind !== "project" && c.variant === "compact";
    const last = out[out.length - 1];
    if (last && last.compact && isCompact) last.items.push(c);
    else out.push({ compact: isCompact, items: [c] });
  }
  return out;
}

function groupChildren(children: TimelineChild[]) {
  const out: { title?: string | undefined; items: TimelineChild[] }[] = [];
  for (const c of children) {
    const last = out[out.length - 1];
    if (last && last.title === c.group) last.items.push(c);
    else out.push({ title: c.group, items: [c] });
  }
  return out;
}

type CaseChild = Extract<TimelineChild, { kind: "project" }>;

function isPhase2Group(title?: string) {
  if (!title) return false;
  return /^phase 2/i.test(title) || /^continuous product case/i.test(title);
}

function findCaseChild(entry: TimelineMilestone): CaseChild | undefined {
  return entry.children?.find((c) => c.kind === "project" && c.caseTrack) as CaseChild | undefined;
}

/** Compact grouped view of the continuous product case. */
const caseStageGroups = [
  { id: "opportunity", label: "Opportunity", stages: ["Innovation Opportunity", "Initial Concept"] },
  { id: "ai", label: "AI & feasibility", stages: ["Language Interaction", "AI Feasibility"] },
  {
    id: "definition",
    label: "Product definition",
    stages: ["Product Discovery", "Product Vision", "Value Proposition"],
  },
  { id: "requirements", label: "Requirements", stages: ["PRD", "Requirements", "Prioritisation"] },
  { id: "mvp", label: "MVP & validation", stages: ["Conceptual MVP", "Validation Approach"] },
  {
    id: "business",
    label: "Business",
    stages: ["Product Strategy", "Business Model", "Market Relevance", "Go-to-Market"],
  },
  {
    id: "final",
    label: "Final",
    stages: ["Technical Feasibility", "Adoption Considerations"],
  },
] as const;

const courseStageMap: Record<string, string[]> = {
  "Product Management": ["definition", "mvp"],
  "Product and Requirements Management for Digital Environments": ["requirements", "final"],
  "Industrial Economics and Management": ["business"],
  "Strategy and Business Models in Technology-Intensive Businesses": ["business"],
  "Agile Process and Project Management": ["mvp", "requirements"],
  "Leadership in High-Technology and Knowledge-Intensive Organizations": ["definition"],
};

function CaseTrackCard({
  child,
  accent,
  activeCourse,
}: {
  child: CaseChild;
  accent: string;
  activeCourse: string | null;
}) {
  const project = getProject(child.slug);
  if (!project) return null;
  const activeGroups = activeCourse ? (courseStageMap[activeCourse] ?? []) : [];

  return (
    <div
      className="night-card rounded-2xl p-5 sm:p-6"
      style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 55%, transparent)` }}
    >
      <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
        Continuous product case
      </p>
      <h4 className="mt-2 font-display text-[23px] font-semibold leading-snug text-night-foreground">
        {project.title}
      </h4>
      {child.continuityLabel ? (
        <p className="mt-1 text-[16px] text-night-body">{child.continuityLabel}</p>
      ) : null}
      {child.note ? (
        <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
          {child.note}
        </p>
      ) : null}
      <p className="mt-3 text-[15.5px] leading-relaxed text-night-body">{project.teaser}</p>

      <ol className="mt-5 space-y-3">
        {caseStageGroups.map((g) => {
          const on = activeGroups.includes(g.id);
          return (
            <li
              key={g.id}
              className="border-l pl-3 transition-colors duration-300"
              style={{
                borderColor: on
                  ? accent
                  : `color-mix(in oklab, ${accent} 22%, transparent)`,
              }}
            >
              <p
                className="font-mono text-[11.5px] uppercase tracking-[0.09em] transition-colors duration-300"
                style={{ color: on ? accent : "var(--night-subtle, #8b97a8)" }}
              >
                {g.label}
              </p>
              <p
                className={[
                  "mt-1 text-[14.5px] leading-relaxed transition-colors duration-300",
                  on ? "text-night-foreground" : "text-night-muted",
                ].join(" ")}
              >
                {g.stages.join(" · ")}
              </p>
            </li>
          );
        })}
      </ol>

      {child.caseNotes?.length ? (
        <ul className="mt-5 space-y-1.5 border-t border-night-border/50 pt-4">
          {child.caseNotes.map((n) => (
            <li key={n} className="text-[13.5px] leading-relaxed text-night-muted">
              {n}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4">
        <ProjectEvidenceSheet project={project} period={child.period}>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 text-[14.5px] font-medium transition-opacity hover:opacity-80"
            style={{ color: accent }}
          >
            Open case study <span aria-hidden="true">→</span>
          </button>
        </ProjectEvidenceSheet>
      </div>
    </div>
  );
}

/** Phase 2: BTH parent on top, formal courses left, continuous case right. */
function Phase2Block({
  group,
  caseChild,
  accent,
  reduced,
}: {
  group: { title?: string | undefined; items: TimelineChild[] };
  caseChild: CaseChild | undefined;
  accent: string;
  reduced: boolean;
}) {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const parent = group.items.find((i) => i.kind !== "project" && i.variant !== "compact");
  const courses = group.items.filter(
    (i) => i !== parent && i.kind !== "project",
  ) as Extract<TimelineChild, { kind: "course" | "topics" }>[];

  return (
    <section className="min-w-0">
      {group.title ? (
        <h4
          className="text-center font-mono text-[12px] uppercase tracking-[0.09em]"
          style={{ color: accent }}
        >
          {group.title}
        </h4>
      ) : null}

      {parent && parent.kind !== "project" ? (
        <div className="mx-auto mt-4 w-full max-w-[900px]">
          <StudyChildCard child={parent} accent={accent} />
        </div>
      ) : null}

      <div className="mt-8 grid gap-8 min-[1100px]:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] min-[1100px]:gap-0">
        <div className="min-w-0 min-[1100px]:col-start-1 min-[1100px]:pr-10">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
          >
            {courses.map((child) => (
              <motion.div
                key={child.title}
                className="min-w-0"
                onViewportEnter={() => {
                  if (!reduced) setActiveCourse(child.title);
                }}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              >
                <StudyChildCard child={child} accent={accent} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden min-[1100px]:col-start-2 min-[1100px]:block" />

        {caseChild ? (
          <div className="min-w-0 min-[1100px]:col-start-3 min-[1100px]:self-start min-[1100px]:pl-10 min-[1280px]:sticky min-[1280px]:top-[110px]">
            <div className="min-[1280px]:min-w-[480px] min-[1280px]:max-w-[560px]">
              <CaseTrackCard child={caseChild} accent={accent} activeCourse={activeCourse} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ChildColumn({
  entry,
  accent,
  side,
  reduced,
}: {
  entry: TimelineMilestone;
  accent: string;
  side: "left" | "right";
  reduced: boolean;
}) {
  if (!entry.children?.length) return null;
  const hasPhase2 = !!findCaseChild(entry);
  let index = 0;
  return (
    <div className="mt-6 space-y-6 min-[1100px]:mt-0">
      {entry.childrenLabel ? (
        <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
          {entry.childrenLabel}
        </p>
      ) : null}
      {groupChildren(entry.children)
        .filter((g) => !(hasPhase2 && isPhase2Group(g.title)))
        .map((group) => (
        <section key={group.title ?? "ungrouped"} className="min-w-0 space-y-3">
          {group.title ? (
            <h4
              className="font-mono text-[12px] uppercase tracking-[0.09em]"
              style={{ color: accent }}
            >
              {group.title}
            </h4>
          ) : null}
          {runs(group.items).map((run, runIndex) => {
            const i = index++;
            if (run.compact) {
              return (
                <ChildShell
                  key={`compact-${runIndex}`}
                  accent={accent}
                  side={side}
                  index={i}
                  reduced={reduced}
                >
                  <div
                    className="grid gap-3"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
                  >
                    {run.items.map((child) =>
                      child.kind === "project" ? null : (
                        <StudyChildCard key={child.title} child={child} accent={accent} />
                      ),
                    )}
                  </div>
                </ChildShell>
              );
            }
            const child = run.items[0]!;
            const key = child.kind === "project" ? child.slug : child.title;
            return (
              <ChildShell key={key} accent={accent} side={side} index={i} reduced={reduced}>
                {child.kind === "project" ? (
                  <ProjectChildCard child={child} accent={accent} />
                ) : (
                  <StudyChildCard child={child} accent={accent} />
                )}
              </ChildShell>
            );
          })}
        </section>
      ))}
    </div>
  );
}

function RoleEvidence({
  roleId,
  open,
  reduced,
}: {
  roleId: string;
  open: boolean;
  reduced: boolean;
}) {
  const role = roles.find((r) => r.id === roleId);
  if (!role) return null;

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="evidence"
          initial={reduced ? false : { height: 0, opacity: 0, y: 8 }}
          animate={{ height: "auto", opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="night-card mx-auto mt-6 max-w-[1080px] rounded-2xl p-5 sm:p-7">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
              {role.detailGroups.map((g) => (
                <section key={g.title}>
                  <h5 className="font-mono text-[12px] uppercase tracking-[0.09em] text-aurora-green">
                    {g.title}
                  </h5>
                  <ul className="mt-2 space-y-1.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-[14.5px] leading-snug text-night-body"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-aurora-green"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {role.notes?.length ? (
              <div className="mt-6 grid gap-4 min-[1100px]:grid-cols-2">
                {role.notes.map((n) => (
                  <p
                    key={n.label}
                    className="rounded-lg border border-night-border/60 bg-white/[0.03] p-4 text-[14.5px] leading-relaxed text-night-body"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
                      {n.label}
                    </span>
                    <span className="mt-1 block">{n.body}</span>
                  </p>
                ))}
              </div>
            ) : null}

            {role.flow?.length ? (
              <div className="mt-6">
                <h5 className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
                  Offer &amp; product evidence
                </h5>
                <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
                  {role.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-night-border bg-white/5 px-2.5 py-1 text-[13px] text-night-foreground">
                        {step}
                      </span>
                      {i < role.flow!.length - 1 ? (
                        <span aria-hidden="true" className="text-aurora-teal">
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ParallelBridge() {
  return (
    <li className="relative pl-10 sm:pl-12 min-[1100px]:pl-0">
      <div className="mx-auto max-w-[620px] text-center">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-night-subtle">
          {parallelBridge.label}
        </p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-night-muted">
          {parallelBridge.body}
        </p>
      </div>
    </li>
  );
}

function NowRow({ entry, reduced }: { entry: TimelineMilestone; reduced: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const { active } = useFocusMotion(ref, reduced);
  return (
    <li ref={ref} className="relative pl-10 sm:pl-12 min-[1100px]:pl-0">
      <span className="absolute left-[13px] top-2 z-10 -translate-x-1/2 min-[1100px]:left-1/2">
        <Node lit={active} isNow accent="var(--professional-accent)" level="major" />
        {entry.railMarker ? (
          <RailLabel
            label={entry.railMarker.label}
            active={active}
            accent="var(--professional-accent)"
            className="-left-[26px] -top-[26px] min-[1100px]:left-1/2 min-[1100px]:top-[26px] min-[1100px]:-translate-x-1/2"
          />
        ) : null}
      </span>
      <div className="min-[1100px]:flex min-[1100px]:justify-center">
        <article
          className="night-card mt-8 w-full rounded-2xl p-5 sm:p-6 min-[1100px]:mt-12 min-[1100px]:max-w-[440px] min-[1100px]:text-center"
          style={{
            borderColor: "color-mix(in oklab, var(--development-accent) 30%, transparent)",
            boxShadow:
              "0 0 0 1px color-mix(in oklab, var(--professional-accent) 20%, transparent), 0 22px 60px -30px color-mix(in oklab, var(--development-accent) 60%, transparent)",
          }}
        >
          <p
            className="font-mono text-[12.5px] uppercase tracking-[0.09em]"
            style={{
              background:
                "linear-gradient(90deg, var(--professional-accent), var(--development-accent))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Now · Direction
          </p>
          <h3 className="mt-2 font-display text-[24px] font-semibold text-night-foreground">
            {entry.title}
          </h3>
          <p className="mt-3 text-[16px] leading-relaxed text-night-body">{entry.summary}</p>
          {entry.roles?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2 min-[1100px]:justify-center">
              {entry.roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border px-3 py-1 text-[13px] text-night-foreground"
                  style={{
                    borderColor: "color-mix(in oklab, var(--professional-accent) 45%, transparent)",
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </div>
    </li>
  );
}

function MilestoneRow({
  entry,
  reduced,
  openRoleId,
  onToggleRole,
}: {
  entry: TimelineMilestone;
  reduced: boolean;
  openRoleId: string | null;
  onToggleRole: (id: string) => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const { scale, opacity, y, active } = useFocusMotion(ref, reduced);
  const accent = accentFor(entry.track);
  const isDev = entry.track === "development";
  const panelId = useId();
  const open = !!entry.roleId && openRoleId === entry.roleId;
  const caseChild = findCaseChild(entry);
  const phase2 = caseChild
    ? groupChildren(entry.children ?? []).find((g) => /^phase 2/i.test(g.title ?? ""))
    : undefined;
  const marker = entry.railMarker;

  return (
    <li
      ref={ref}
      className="relative pl-10 sm:pl-12 min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] min-[1100px]:items-start min-[1100px]:gap-x-0 min-[1100px]:pl-0"
    >
      <span className="absolute left-[13px] top-6 z-10 -translate-x-1/2 min-[1100px]:left-1/2 min-[1100px]:top-7">
        <Node lit={active} isNow={false} accent={accent} level={marker?.kind ?? "minor"} />
        {marker ? (
          <RailLabel
            label={marker.label}
            active={active}
            accent={accent}
            className="-left-[26px] -top-[26px] min-[1100px]:left-1/2 min-[1100px]:top-[26px] min-[1100px]:-translate-x-1/2"
          />
        ) : null}
      </span>

      <motion.div
        style={{
          scale: reduced ? 1 : scale,
          opacity: reduced ? 1 : opacity,
          y: reduced ? 0 : y,
        }}
        className={[
          "min-w-0 min-[1100px]:row-start-1",
          isDev ? "min-[1100px]:col-start-3 min-[1100px]:pl-10" : "min-[1100px]:col-start-1 min-[1100px]:pr-10",
        ].join(" ")}
      >
        <article
          className={[
            "night-card relative rounded-2xl p-5 transition-colors duration-500 sm:p-6",
            isDev ? "min-[1100px]:max-w-[620px]" : "min-[1100px]:ml-auto min-[1100px]:max-w-[620px]",
          ].join(" ")}
          style={
            active
              ? {
                  borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
                  boxShadow: `0 0 0 1px color-mix(in oklab, ${accent} 18%, transparent), 0 24px 60px -34px color-mix(in oklab, ${accent} 70%, transparent)`,
                }
              : undefined
          }
        >
          <p
            className="font-mono text-[12.5px] uppercase tracking-[0.09em]"
            style={{ color: accent }}
          >
            {entry.period}
            <span className="ml-2 text-night-subtle">· {trackLabel(entry.track)}</span>
          </p>
          <h3 className="mt-2 font-display text-[24px] font-semibold leading-snug text-night-foreground sm:text-[25px]">
            {entry.title}
          </h3>
          {entry.university ? (
            <p className="mt-1.5 text-[13.5px] font-medium text-night-muted">{entry.university}</p>
          ) : null}
          {entry.formalTitle ? (
            <p className="mt-1 text-[16px] font-semibold leading-snug text-night-foreground">
              {entry.formalTitle}
            </p>
          ) : null}
          {entry.degreeDescriptor ? (
            <p className="mt-1 text-[14px] text-night-muted">{entry.degreeDescriptor}</p>
          ) : null}
          {entry.subtitle ? (
            <p className="mt-1 text-[15px] text-night-body">{entry.subtitle}</p>
          ) : null}
          {entry.org ? <p className="mt-1 text-[13.5px] text-night-muted">{entry.org}</p> : null}

          {entry.stage ? (
            <p className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.09em] text-night-subtle">
              {entry.stage}
            </p>
          ) : null}
          <p className="mt-3 text-[16.5px] leading-relaxed text-night-body">{entry.summary}</p>

          {entry.image ? (
            <figure className="mt-5">
              <div className="overflow-hidden rounded-xl border border-night-border/70">
                <img
                  src={entry.image.src}
                  alt={entry.image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-night-muted">
                {entry.image.caption}
              </figcaption>
            </figure>
          ) : null}


          {entry.overviewBullets?.length ? (
            <ul className="mt-4 space-y-2.5">
              {entry.overviewBullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15.5px] leading-relaxed text-night-body">
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}

          {entry.relevanceSignals?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.relevanceSignals.map((s) => (
                <li
                  key={s}
                  className="rounded-full border px-3 py-1 text-[12.5px] text-night-foreground"
                  style={{ borderColor: `color-mix(in oklab, ${accent} 40%, transparent)` }}
                >
                  {s}
                </li>
              ))}
            </ul>
          ) : null}

          {entry.roleId ? (
            <div className="mt-5 border-t border-night-border/50 pt-4">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => onToggleRole(entry.roleId!)}
                className="inline-flex min-h-[44px] items-center gap-2 text-[14.5px] font-medium text-aurora-teal transition-opacity hover:opacity-80"
              >
                {open ? "Hide role evidence" : "Explore role evidence"}
                <span aria-hidden="true">{open ? "↑" : "↓"}</span>
              </button>
            </div>
          ) : null}
        </article>
      </motion.div>

      <div className="hidden min-[1100px]:col-start-2 min-[1100px]:row-start-1 min-[1100px]:block" />

      <div
        className={[
          "min-w-0 min-[1100px]:row-start-1",
          isDev
            ? "min-[1100px]:col-start-1 min-[1100px]:pr-10"
            : "min-[1100px]:col-start-3 min-[1100px]:pl-10",
        ].join(" ")}
      >
        <div
          className={
            isDev ? "min-[1100px]:ml-auto min-[1100px]:max-w-[620px]" : "min-[1100px]:max-w-[620px]"
          }
        >
          <ChildColumn
            entry={entry}
            accent={accent}
            side={isDev ? "left" : "right"}
            reduced={reduced}
          />
        </div>
      </div>

      {phase2 ? (
        <div className="mt-10 min-[1100px]:col-span-3 min-[1100px]:row-start-2 min-[1100px]:mt-16">
          <Phase2Block
            group={phase2}
            caseChild={caseChild}
            accent={accent}
            reduced={reduced}
          />
        </div>
      ) : null}

      {entry.roleId ? (
        <div
          id={panelId}
          className="min-[1100px]:col-span-3 min-[1100px]:row-start-3"
        >
          <RoleEvidence roleId={entry.roleId} open={open} reduced={reduced} />
        </div>
      ) : null}
    </li>
  );
}

export function Timeline() {
  const reduced = !!useReducedMotion();
  const [openRoleId, setOpenRoleId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 45%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 29,
    mass: 0.35,
  });
  // Soft trailing glow at the head of the illuminated rail — no travelling dot.
  const glowTop = useTransform(smoothProgress, (v) => `${v * 100}%`);
  const glowOpacity = useTransform(smoothProgress, [0, 0.03, 0.97, 1], [0, 0.5, 0.5, 0]);

  const toggleRole = (id: string) => setOpenRoleId((cur) => (cur === id ? null : id));

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[min(94vw,1480px)]"
    >

      {/* track headings */}
      <div className="mb-10 hidden grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center min-[1100px]:grid">
        <p className="pr-10 text-right font-mono text-[12px] uppercase tracking-[0.09em] text-professional">
          Professional experience
        </p>
        <span className="block" />
        <p className="pl-10 font-mono text-[12px] uppercase tracking-[0.09em] text-development">
          Education · Product · AI development
        </p>
      </div>
      <div className="mb-8 flex gap-4 min-[1100px]:hidden">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-professional">
          Professional
        </span>
        <span className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-development">
          Development
        </span>
      </div>

      {/* background rail */}
      <div
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-night-border/60 min-[1100px]:left-1/2 min-[1100px]:-translate-x-1/2"
      >
        <motion.div
          className="w-px origin-top"
          style={{
            height: "100%",
            scaleY: reduced ? 1 : smoothProgress,
            background:
              "linear-gradient(180deg, var(--professional-accent), var(--aurora-green) 55%, var(--development-accent))",
            opacity: 0.75,
          }}
        />
        {!reduced ? (
          <motion.span
            className="absolute left-1/2 block h-56 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[10px]"
            style={{
              top: glowTop,
              opacity: glowOpacity,
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, var(--aurora-green) 40%, transparent), transparent)",
            }}
          />
        ) : null}
      </div>

      <ol className="relative space-y-14 min-[1100px]:space-y-20">
        {milestones.map((entry) => (
          <Fragment key={entry.id}>
            {entry.id === parallelBridge.beforeMilestoneId ? (
              <ParallelBridge key="bridge" />
            ) : null}
            {entry.now ? (
              <NowRow key={entry.id} entry={entry} reduced={reduced} />
            ) : (
              <MilestoneRow
                key={entry.id}
                entry={entry}
                reduced={reduced}
                openRoleId={openRoleId}
                onToggleRole={toggleRole}
              />
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
