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
  studyProgression,
  type TimelineChild,
  type TimelineMilestone,
} from "../content/timeline";

/** The page reads newest first: the present, then what it was built on.
 *  `milestones` stays in calendar order — it is the record, and other
 *  readers of it must not inherit a presentation decision. */
const newestFirst = [...milestones].reverse();

/** No phase block runs on the parallel path, so nothing is consumed there. */
const EMPTY_GROUPS: ReadonlySet<string> = new Set();

/** The first row in reading order that fills BOTH columns — the parallel card
 *  is what puts something in the opposite half — so the headings can be shown
 *  where they describe something. */
const headingsBeforeId = [...milestones].reverse().find((m) => m.parallelMilestoneId)?.id;

/** Milestones rendered inside another row, so the sequence must skip them. */
const renderedInParallel = new Set(
  milestones.map((m) => m.parallelMilestoneId).filter((id): id is string => !!id),
);

/** What the rail node says. Read newest first, a node carrying only the year
 *  a period STARTED labels the most recent entry with its oldest date — the
 *  postgraduate node read AUG 2025 for a period that ran to July 2026, and
 *  sat directly above the degree's own 2025. So a milestone whose period is
 *  a range is labelled with the range, in years: the sequence then descends,
 *  and duration is stated in text rather than implied by a distance the
 *  layout does not have. Derived from the card's own period, so the node and
 *  the card cannot drift apart. */
function railLabelFor(entry: TimelineMilestone) {
  const fallback = entry.railMarker?.label ?? "";
  const years = entry.period?.match(/\d{4}/g);
  if (!years || years.length < 2) return fallback;
  const from = years[0];
  const to = years[years.length - 1];
  if (!from || !to || from === to) return fallback;
  return `${from}–${to}`;
}

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
  const slots = project.images?.slots;
  const lead = slots?.find((slot) => slot.src && slot.lead) ?? slots?.find((slot) => slot.src);
  return (
    <ProjectEvidenceSheet project={project} period={child.period}>
      <button
        type="button"
        className="night-card group flex h-full w-full min-w-0 flex-col rounded-xl p-4 text-left transition-colors duration-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-teal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
        style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 55%, transparent)` }}
      >
        {lead ? (
          <div className="mb-3 hidden overflow-hidden rounded-lg border border-night-border/70 sm:block">
            <img
              src={lead.src}
              alt={lead.alt ?? lead.caption}
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        ) : null}
        <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
          {/* Both, when the dates are verified: the period is the fact the
              reader is looking for and the type is what the card IS. One
              replacing the other loses whichever was written last. */}
          {child.period ? `${child.period} · ${project.type}` : project.type}
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
      className="night-card flex h-full min-w-0 flex-col rounded-xl p-4 sm:p-[18px]"
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
        <p
          className={[
            "border-l pl-2.5 text-[14.5px] leading-[1.55] text-[#B8C3CB]",
            compact ? "mt-auto pt-2.5" : "mt-2.5",
          ].join(" ")}
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
  const out: { compact: boolean; projects: boolean; items: TimelineChild[] }[] = [];
  for (const c of items) {
    const isCompact = c.kind !== "project" && c.variant === "compact";
    const isProject = c.kind === "project";
    const last = out[out.length - 1];
    // Consecutive projects are one set, the way consecutive compact courses
    // are: a role with four of them read as a long strip of full-width cards.
    if (last && last.compact && isCompact) last.items.push(c);
    else if (last && last.projects && isProject) last.items.push(c);
    else out.push({ compact: isCompact, projects: isProject, items: [c] });
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
  const slots = project.images?.slots;
  const caseLead = slots?.find((slot) => slot.src && slot.lead) ?? slots?.find((slot) => slot.src);

  return (
    <div
      className="night-card rounded-2xl p-5 sm:p-6"
      style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 55%, transparent)` }}
    >
      {caseLead?.src ? (
        <div className="mb-3 hidden overflow-hidden rounded-lg border border-night-border/70 sm:block">
          <img
            src={caseLead.src}
            alt={caseLead.alt ?? project.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover opacity-90"
          />
        </div>
      ) : null}
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
/** One phase of the postgraduate period: its courses in the study column and
 *  the project belonging to that phase beside them. Written once and used by
 *  both phases — a "Phase2Block" rendering phase 1 is the kind of name that
 *  stops being true, and a second copy would drift from this one. */
function PhaseBlock({
  group,
  accent,
  reduced,
  promoteParent = true,
  side,
}: {
  group: { title?: string | undefined; items: TimelineChild[] };
  accent: string;
  reduced: boolean;
  /** Phase 2 opens with a specialisation card above its courses; phase 1 has
   *  no such parent, and promoting its first course would invent one. */
  promoteParent?: boolean;
  side?: ((activeCourse: string | null) => React.ReactNode) | undefined;
}) {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const parent = promoteParent
    ? group.items.find((i) => i.kind !== "project" && i.variant !== "compact")
    : undefined;
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
          {/* Same cap and same side as the course column every other milestone
              uses, so phase 2 lines up with phase 1 and with the degree's own
              courses instead of spreading across the whole half. */}
          <div
            className="grid gap-4 min-[1100px]:ml-auto min-[1100px]:max-w-[620px]"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
          >
            {courses.map((child) => (
              <motion.div
                key={child.title}
                className="h-full min-w-0"
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

        {side ? (
          <div className="min-w-0 min-[1100px]:col-start-3 min-[1100px]:self-start min-[1100px]:pl-10 min-[1280px]:sticky min-[1280px]:top-[110px]">
            <div className="min-[1280px]:min-w-[480px] min-[1280px]:max-w-[560px]">
              {side(activeCourse)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** A milestone's children sit in ITS OWN column. The rail carries two
 *  headings — Professional experience on the left, Education · Product · AI
 *  development on the right — and children used to be placed opposite their
 *  own card, so a role's projects rendered under the education heading and a
 *  degree's courses under the professional one. Same side means each column
 *  reads as the track it is named after, and the overlap between work and
 *  study becomes something a reader sees rather than something stated. */
function ChildColumn({
  entry,
  accent,
  side,
  reduced,
  consumedGroups,
}: {
  entry: TimelineMilestone;
  accent: string;
  side: "left" | "right";
  reduced: boolean;
  /** Groups already rendered by a phase block. Passed in from the row that
   *  built those blocks rather than matched by title here, so a group can
   *  never be drawn twice or silently dropped by a pattern that stops
   *  matching. */
  consumedGroups: ReadonlySet<string>;
}) {
  if (!entry.children?.length) return null;
  // A phase block can consume every group in the milestone. The column then has
  // nothing to show, and rendering its heading over that leaves a label with no
  // content under it — which is what "no children" used to mean and no longer
  // does now that other blocks draw them.
  const visible = groupChildren(entry.children).filter(
    (g) => !(g.title && consumedGroups.has(g.title)),
  );
  if (!visible.length) return null;
  let index = 0;
  return (
    <div className="mt-6 space-y-6 min-[1100px]:mt-0">
      {entry.childrenLabel ? (
        <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
          {entry.childrenLabel}
        </p>
      ) : null}
      {visible.map((group) => (
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
            if (run.projects) {
              return (
                <ChildShell
                  key={`projects-${runIndex}`}
                  accent={accent}
                  side={side}
                  index={i}
                  reduced={reduced}
                >
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
                  >
                    {run.items.map((child) =>
                      child.kind !== "project" ? null : (
                        <ProjectChildCard key={child.slug} child={child} accent={accent} />
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
          <div className="night-card mt-6 rounded-2xl p-5 sm:p-7">
            <div
              className="grid gap-x-8 gap-y-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
            >
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
              <div
                className="mt-6 grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
              >
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

/** Lighter than the track bridge: this joins two study periods rather than
 *  marking a track boundary. Placed at the phase boundary INSIDE the
 *  postgraduate period: the move from technology to product happens between
 *  its two phases, not between that period and the degree before it — and
 *  because it now separates the two halves of one block rather than joining
 *  two entries, it is drawn as a rule with the label set into it. */
function StudyProgression() {
  return (
    <div className="relative pl-10 sm:pl-12 min-[1100px]:pl-0">
      {/* The sky behind is at its brightest here, and thin grey text over a
          lit ray is the one thing on this page a reader cannot get back. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[190px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 46% 100% at 50% 50%, rgb(2 4 7 / 0.86), rgb(2 4 7 / 0.5) 55%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-[760px] text-center">
        <div className="flex items-center gap-4 sm:gap-6">
          <span
            aria-hidden="true"
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--development-accent) 70%, transparent))",
            }}
          />
          <p className="whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.16em] text-development">
            {studyProgression.label}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(270deg, transparent, color-mix(in oklab, var(--development-accent) 70%, transparent))",
            }}
          />
        </div>
        <p className="mx-auto mt-4 max-w-[600px] text-[15.5px] leading-[1.65] text-night-foreground">
          {studyProgression.body}
        </p>
      </div>
    </div>
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
            label={railLabelFor(entry)}
            active={active}
            accent="var(--professional-accent)"
            className="-left-[26px] -top-[26px] min-[1100px]:left-1/2 min-[1100px]:top-[26px] min-[1100px]:-translate-x-1/2"
          />
        ) : null}
      </span>
      <div className="min-[1100px]:flex min-[1100px]:justify-center">
        <article
          className="night-card mt-8 w-full rounded-2xl p-5 sm:p-6 min-[1100px]:mt-20 min-[1100px]:max-w-[440px] min-[1100px]:text-center"
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

/** The milestone's own card. Extracted so it can also be rendered inside
 *  another milestone's row, for a role that ran alongside a study period. */
/** The key to the two columns. It sits at the row where both columns first
 *  carry content, not at the top of the rail: above that row the left column
 *  has nothing under it for two screens, and a heading over an empty half
 *  reads as a missing section rather than as a label. */
function TrackHeadings() {
  return (
    <li className="relative list-none">
      <div className="mb-2 hidden grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center min-[1100px]:grid">
        <p className="pr-10 text-right font-mono text-[12px] uppercase tracking-[0.09em] text-professional">
          Professional experience
        </p>
        <span className="block" />
        <p className="pl-10 font-mono text-[12px] uppercase tracking-[0.09em] text-development">
          Education · Product · AI development
        </p>
      </div>
      <div className="flex gap-4 pl-10 sm:pl-12 min-[1100px]:hidden">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-professional">
          Professional
        </span>
        <span className="font-mono text-[11.5px] uppercase tracking-[0.09em] text-development">
          Development
        </span>
      </div>
    </li>
  );
}

function MilestoneCard({
  entry,
  accent,
  active,
  open,
  panelId,
  onToggleRole,
  className,
}: {
  entry: TimelineMilestone;
  accent: string;
  active: boolean;
  open: boolean;
  panelId: string;
  onToggleRole: (id: string) => void;
  className: string;
}) {
  return (
    <article
      className={[
        "night-card relative rounded-2xl p-5 transition-colors duration-500 sm:p-6",
        className,
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
              width={1280}
              height={720}
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
  const groups = groupChildren(entry.children ?? []);
  const phase2 = caseChild ? groups.find((g) => /^phase 2/i.test(g.title ?? "")) : undefined;
  const phase1 = groups.find((g) => /^phase 1/i.test(g.title ?? ""));
  // The project belonging to phase 1 is the one that is not the continuous
  // case. Only looked for when a phase 1 exists — every milestone has projects.
  const phase1Project = phase1
    ? (entry.children?.find((c) => c.kind === "project" && !c.caseTrack) as CaseChild | undefined)
    : undefined;
  // Groups a block renders, so the child column does not render them again.
  // Collected from the blocks themselves rather than matched by title.
  const groupOf = (child: TimelineChild) => groups.find((g) => g.items.includes(child));
  const consumedGroups = new Set<string>();
  for (const g of [
    phase2,
    phase1,
    caseChild ? groupOf(caseChild) : undefined,
    phase1Project ? groupOf(phase1Project) : undefined,
  ]) {
    if (g?.title) consumedGroups.add(g.title);
  }
  const spansBothColumns = !!phase2;
  const parallel = entry.parallelMilestoneId
    ? milestones.find((m) => m.id === entry.parallelMilestoneId)
    : undefined;
  const marker = entry.railMarker;

  return (
    <li
      ref={ref}
      className={[
        "relative pl-10 sm:pl-12 min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] min-[1100px]:items-start min-[1100px]:gap-x-0 min-[1100px]:pl-0",
        // Without a card, row 1 has no height and the first block lands on the
        // rail label. Padding moves the content, not the node: an absolutely
        // positioned label is measured from the padding box, so it stays put.
        entry.hideOwnCard ? "pt-8 min-[1100px]:pt-12" : "",
      ].join(" ")}
    >
      <span className="absolute left-[13px] top-6 z-10 -translate-x-1/2 min-[1100px]:left-1/2 min-[1100px]:top-7">
        <Node lit={active} isNow={false} accent={accent} level={marker?.kind ?? "minor"} />
        {marker ? (
          <RailLabel
            label={railLabelFor(entry)}
            active={active}
            accent={accent}
            className="-left-[26px] -top-[26px] min-[1100px]:left-1/2 min-[1100px]:top-[26px] min-[1100px]:-translate-x-1/2"
          />
        ) : null}
      </span>

      {entry.hideOwnCard ? null : (
        <motion.div
          style={{
            scale: reduced ? 1 : scale,
            opacity: reduced ? 1 : opacity,
            y: reduced ? 0 : y,
          }}
          className={[
            "min-w-0 min-[1100px]:row-start-1",
            // A milestone whose own content spans both columns is the header of
            // that block, not an entry in one track's column — so it is centred,
            // the way the phase block below it centres its own header. Its rail
            // node and track accent still say which track it belongs to, which
            // is what keeps it distinct from the connectors, which have neither.
            spansBothColumns
              ? "min-[1100px]:col-span-3"
              : isDev
                ? "min-[1100px]:col-start-3 min-[1100px]:pl-10"
                : "min-[1100px]:col-start-1 min-[1100px]:pr-10",
          ].join(" ")}
        >
          <div
            className={
              spansBothColumns
                ? "min-[1100px]:mx-auto min-[1100px]:max-w-[720px]"
                : isDev
                  ? "min-[1100px]:max-w-[620px]"
                  : "min-[1100px]:ml-auto min-[1100px]:max-w-[620px]"
            }
          >
            <MilestoneCard
              entry={entry}
              accent={accent}
              active={active}
              open={open}
              panelId={panelId}
              onToggleRole={onToggleRole}
              className=""
            />
            {/* Under the card, not in a grid row of its own: the child column
                sits between the two, so a row further down put the evidence
                below the role's OWN projects. Same placement as the parallel
                card's, which is the point — this is one rule, at both of its
                sites. */}
            {entry.roleId ? (
              <div id={panelId}>
                <RoleEvidence roleId={entry.roleId} open={open} reduced={reduced} />
              </div>
            ) : null}
          </div>
        </motion.div>
      )}

      <div className="hidden min-[1100px]:col-start-2 min-[1100px]:row-start-1 min-[1100px]:block" />

      {parallel ? (
        <div
          className={[
            "mt-8 min-w-0 min-[1100px]:mt-0 min-[1100px]:row-start-1 min-[1100px]:row-end-6",
            isDev
              ? "min-[1100px]:col-start-1 min-[1100px]:pr-10"
              : "min-[1100px]:col-start-3 min-[1100px]:pl-10",
          ].join(" ")}
        >
          <div
            className={
              isDev
                ? "min-[1100px]:ml-auto min-[1100px]:max-w-[620px]"
                : "min-[1100px]:max-w-[620px]"
            }
          >
            <MilestoneCard
              entry={parallel}
              accent={accentFor(parallel.track)}
              active={active}
              open={!!parallel.roleId && openRoleId === parallel.roleId}
              panelId={`${panelId}-parallel`}
              onToggleRole={onToggleRole}
              className=""
            />
            {/* Directly under its own card, not in a row of its own further
                down the grid: the evidence is what fills the tall column
                beside the studies, and a panel two screens below the button
                that opens it is not "under the role". */}
            {parallel.roleId ? (
              <div id={`${panelId}-parallel`}>
                <RoleEvidence
                  roleId={parallel.roleId}
                  open={openRoleId === parallel.roleId}
                  reduced={reduced}
                />
              </div>
            ) : null}
            {/* Its own children too. The milestone is skipped in the sequence,
                so this is the ONLY place they can render — moving the card here
                without them left the role's projects nowhere at all. Nothing is
                consumed by a block on this path, so the set is empty. */}
            <ChildColumn
              entry={parallel}
              accent={accentFor(parallel.track)}
              side={parallel.track === "development" ? "right" : "left"}
              reduced={reduced}
              consumedGroups={EMPTY_GROUPS}
            />
            {/* The years of this role that predate the milestone it stands
                beside. Down is earlier here, so the foot of the column is
                where 2020–2023 belongs — and aligned tops then say what
                they should: both ran to 2025. */}
            {parallel.preStudyNote ? (
              <div
                className="mt-6 border-l pl-4"
                style={{
                  borderColor: `color-mix(in oklab, ${accentFor(parallel.track)} 45%, transparent)`,
                }}
              >
                <p className="font-mono text-[12px] uppercase tracking-[0.09em] text-night-subtle">
                  {parallel.preStudyNote.label}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-night-body">
                  {parallel.preStudyNote.body}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {phase2 ? (
        <div className="mt-10 min-[1100px]:col-span-3 min-[1100px]:row-start-2 min-[1100px]:mt-16">
          <PhaseBlock
            group={phase2}
            accent={accent}
            reduced={reduced}
            side={
              caseChild
                ? (activeCourse) => (
                    <CaseTrackCard child={caseChild} accent={accent} activeCourse={activeCourse} />
                  )
                : undefined
            }
          />
        </div>
      ) : null}

      {phase2 ? (
        <div className="mt-12 min-[1100px]:col-span-3 min-[1100px]:row-start-3 min-[1100px]:mt-16">
          <StudyProgression />
        </div>
      ) : null}

      {phase1 ? (
        <div className="mt-10 min-[1100px]:col-span-3 min-[1100px]:row-start-4 min-[1100px]:mt-16">
          <PhaseBlock
            group={phase1}
            accent={accent}
            reduced={reduced}
            promoteParent={false}
            side={
              phase1Project
                ? () => <ProjectChildCard child={phase1Project} accent={accent} />
                : undefined
            }
          />
        </div>
      ) : null}

      <div
        className={[
          "min-w-0 min-[1100px]:row-start-5",
          isDev
            ? "min-[1100px]:col-start-3 min-[1100px]:pl-10"
            : "min-[1100px]:col-start-1 min-[1100px]:pr-10",
        ].join(" ")}
      >
        <div
          className={
            isDev ? "min-[1100px]:max-w-[620px]" : "min-[1100px]:ml-auto min-[1100px]:max-w-[620px]"
          }
        >
          <ChildColumn
            entry={entry}
            accent={accent}
            side={isDev ? "right" : "left"}
            reduced={reduced}
            consumedGroups={consumedGroups}
          />
        </div>
      </div>

    </li>
  );
}

export function Timeline() {
  const reduced = !!useReducedMotion();
  const [openRoleId, setOpenRoleId] = useState<string | null>(
    () => milestones.find((m) => m.roleEvidenceOpenByDefault)?.roleId ?? null,
  );
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
              "linear-gradient(180deg, var(--development-accent), var(--aurora-green) 55%, var(--professional-accent))",
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
        {newestFirst
          .filter((entry) => !renderedInParallel.has(entry.id))
          .map((entry) => (
          <Fragment key={entry.id}>
            {entry.id === headingsBeforeId ? <TrackHeadings key="headings" /> : null}
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
            {/* Both connectors name the milestone they precede in CALENDAR
                order, so reading newest-first puts them on the other side of
                that milestone — after the row rather than before it. */}
            {entry.id === parallelBridge.beforeMilestoneId ? (
              <ParallelBridge key="bridge" />
            ) : null}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
