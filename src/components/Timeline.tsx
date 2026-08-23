import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";

import { roles } from "../content/experience";
import { getProject } from "../content/projects";
import { ProjectEvidenceSheet } from "./ProjectEvidenceSheet";
import {
  milestones,
  postgraduatePhases,
  talkingScadaChain,
  type TimelineBranch,
  type TimelineMilestone,
} from "../content/timeline";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduced;
}

function accentFor(track: TimelineMilestone["track"]) {
  return track === "development" ? "var(--development-accent)" : "var(--professional-accent)";
}

function trackLabel(track: TimelineMilestone["track"]) {
  return track === "development" ? "Development" : track === "direction" ? "Now" : "Professional";
}

function Node({
  lit,
  isNow,
  accent,
}: {
  lit: boolean;
  isNow: boolean;
  accent: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative block h-4 w-4 rounded-full border-2 transition-[transform,background-color,border-color,box-shadow] duration-500 ease-out",
        lit ? "scale-100" : "scale-75",
      ].join(" ")}
      style={{
        backgroundColor: lit ? accent : "#070d18",
        borderColor: lit ? accent : `color-mix(in oklab, ${accent} 30%, transparent)`,
        boxShadow: lit ? `0 0 14px 0 color-mix(in oklab, ${accent} 55%, transparent)` : "none",
      }}
    >
      {isNow && lit ? (
        <span
          className="absolute -inset-1.5 animate-ping rounded-full opacity-30"
          style={{ backgroundColor: accent, animationDuration: "2.8s" }}
        />
      ) : null}
    </span>
  );
}

function BranchCard({
  branch,
  accent,
}: {
  branch: TimelineBranch;
  accent: string;
}) {
  const project = getProject(branch.slug);
  if (!project) return null;
  return (
    <ProjectEvidenceSheet project={project} period={branch.period}>
      <button
        type="button"
        className="group block w-full min-w-0 rounded-xl border border-night-border/60 bg-white/[0.035] p-4 text-left transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0"
        style={{ borderLeft: `2px solid color-mix(in oklab, ${accent} 45%, transparent)` }}
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
          {branch.period ?? project.type}
        </p>
        <h4 className="mt-1 text-[17px] font-semibold text-night-foreground">{project.title}</h4>
        {project.subtitle ? (
          <p className="mt-1 text-[13px] text-night-muted">{project.subtitle}</p>
        ) : null}
        <p className="mt-2 text-[15px] leading-relaxed text-night-body">{project.teaser}</p>
        {branch.note ? (
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
            {branch.note}
          </p>
        ) : null}
        <span
          className="mt-3 inline-flex min-h-[24px] items-center gap-2 text-[13px] transition-opacity group-hover:opacity-80"
          style={{ color: accent }}
        >
          Open case study <span aria-hidden="true">→</span>
        </span>
      </button>
    </ProjectEvidenceSheet>
  );
}

function groupBranches(branches: TimelineBranch[]) {
  const out: { title?: string | undefined; branches: TimelineBranch[] }[] = [];
  for (const b of branches) {
    const last = out[out.length - 1];
    if (last && last.title === b.group) last.branches.push(b);
    else out.push({ title: b.group, branches: [b] });
  }
  return out;
}

function RoleEvidence({ roleId }: { roleId: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const role = roles.find((r) => r.id === roleId);
  if (!role) return null;

  return (
    <div className="mt-5 border-t border-night-border/50 pt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-aurora-teal transition-opacity hover:opacity-80"
      >
        {open ? "Hide role evidence" : "Explore role evidence"}
        <span aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"}>
          ↓
        </span>
      </button>
      <div id={panelId} hidden={!open} className="mt-4 space-y-5">
        <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {role.detailGroups.map((g) => (
            <section key={g.title}>
              <h5 className="font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-green">
                {g.title}
              </h5>
              <ul className="mt-2 space-y-1">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] leading-snug text-night-body">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-aurora-green"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {role.notes?.map((n) => (
          <p
            key={n.label}
            className="rounded-lg border border-night-border/60 bg-white/[0.03] p-4 text-[14.5px] leading-relaxed text-night-body"
          >
            <span className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
              {n.label}
            </span>
            <span className="mt-1 block">{n.body}</span>
          </p>
        ))}

        {role.flow?.length ? (
          <div>
            <h5 className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
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
    </div>
  );
}

function PostgraduateDetail() {
  return (
    <div className="mt-5 space-y-5 border-t border-night-border/50 pt-4">
      {postgraduatePhases.map((phase) => (
        <section key={phase.title}>
          <h5 className="font-mono text-[12px] uppercase tracking-[0.11em] text-aurora-violet">
            {phase.title}
          </h5>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {phase.entries.map((entry) => (
              <div
                key={entry.title}
                className="rounded-lg border border-night-border/60 bg-white/[0.03] p-4"
              >
                <p className="text-[15px] font-semibold text-night-foreground">{entry.title}</p>
                <p className="mt-0.5 text-[12.5px] text-night-muted">{entry.org}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {entry.topics.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-night-border px-2.5 py-0.5 text-[12.5px] text-night-body"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {"relevance" in entry && entry.relevance ? (
                  <p className="mt-2 text-[14px] leading-relaxed text-night-body">
                    {entry.relevance}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h5 className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
          Talking SCADA — continuous story
        </h5>
        <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
          {talkingScadaChain.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-night-border bg-white/5 px-2.5 py-1 text-[13px] text-night-foreground">
                {step}
              </span>
              {i < talkingScadaChain.length - 1 ? (
                <span aria-hidden="true" className="text-aurora-violet">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function MilestoneRow({
  entry,
  reduced,
}: {
  entry: TimelineMilestone;
  reduced: boolean;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { margin: "-45% 0px -35% 0px" });
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const shown = reduced || seen;
  const accent = accentFor(entry.track);
  const isDev = entry.track === "development";
  const active = reduced || inView;

  return (
    <li
      ref={ref}
      className="relative pl-10 sm:pl-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-start lg:gap-x-0 lg:pl-0"
    >
      <div className="hidden lg:block" />
      <span className="absolute left-[13px] top-6 z-10 -translate-x-1/2 lg:relative lg:left-auto lg:top-6 lg:translate-x-0">
        <Node lit={active} isNow={!!entry.now} accent={accent} />
      </span>

      <div
        style={{
          transitionDuration: reduced ? "0ms" : "600ms",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={[
          "min-w-0 transition-all",
          shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          isDev ? "lg:col-start-3 lg:row-start-1 lg:pl-12" : "lg:col-start-1 lg:row-start-1 lg:pr-12",
        ].join(" ")}
      >
        <article
          className={[
            "rounded-2xl border p-5 backdrop-blur-sm transition-colors duration-500 sm:p-6",
            active ? "border-night-border bg-white/[0.055]" : "border-night-border/50 bg-white/[0.025]",
          ].join(" ")}
          style={
            active
              ? { boxShadow: `0 0 0 1px color-mix(in oklab, ${accent} 22%, transparent)` }
              : undefined
          }
        >
          <p className="font-mono text-[12.5px] uppercase tracking-[0.11em]" style={{ color: accent }}>
            {entry.now ? "Now" : entry.period}
            <span className="ml-2 text-night-muted">· {trackLabel(entry.track)}</span>
          </p>
          <h3 className="mt-2 font-display text-[22px] font-semibold leading-snug text-night-foreground sm:text-[23px]">
            {entry.title}
          </h3>
          {entry.subtitle ? (
            <p className="mt-1 text-[15px] text-night-body">{entry.subtitle}</p>
          ) : null}
          {entry.org ? <p className="mt-1 text-[13px] text-night-muted">{entry.org}</p> : null}
          {entry.stage ? (
            <p className="mt-3 font-mono text-[12.5px] uppercase tracking-[0.11em] text-night-muted">
              {entry.stage}
            </p>
          ) : null}
          <p className="mt-3 text-[16px] leading-relaxed text-night-body">{entry.summary}</p>

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

          {entry.roles?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.roles.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-aurora-teal/45 px-3 py-1 text-[13px] text-night-foreground"
                >
                  {r}
                </li>
              ))}
            </ul>
          ) : null}

          {entry.parallelNote ? (
            <p className="mt-4 rounded-lg border border-night-border/60 bg-white/[0.03] p-3 text-[14px] leading-relaxed text-night-muted">
              {entry.parallelNote}
            </p>
          ) : null}

          {entry.roleId ? <RoleEvidence roleId={entry.roleId} /> : null}
          {entry.id === "postgraduate" ? <PostgraduateDetail /> : null}
        </article>

        {entry.branches?.length ? (
          <div className="mt-4 space-y-5">
            {entry.branchesLabel ? (
              <p className="font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
                {entry.branchesLabel}
              </p>
            ) : null}
            {groupBranches(entry.branches).map((group) => (
              <section key={group.title ?? "ungrouped"} className="min-w-0 space-y-3">
                {group.title ? (
                  <h4
                    className="font-mono text-[12px] uppercase tracking-[0.11em]"
                    style={{ color: accent }}
                  >
                    {group.title}
                  </h4>
                ) : null}
                {group.branches.map((b) => (
                  <BranchCard key={b.slug} branch={b} accent={accent} />
                ))}
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export function Timeline() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 45%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });
  const dotTop = useTransform(smoothProgress, (v) => `${v * 100}%`);
  const dotOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* track headings */}
      <div className="mb-10 hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center lg:grid">
        <p className="pr-12 font-mono text-[12px] uppercase tracking-[0.11em] text-professional">
          Professional experience
        </p>
        <span className="block w-4" />
        <p className="pl-12 font-mono text-[12px] uppercase tracking-[0.11em] text-development">
          Education · Product · AI development
        </p>
      </div>
      <div className="mb-8 flex gap-4 lg:hidden">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.11em] text-professional">
          Professional
        </span>
        <span className="font-mono text-[11.5px] uppercase tracking-[0.11em] text-development">
          Development
        </span>
      </div>

      {/* background rail */}
      <div
        aria-hidden="true"
        className="absolute left-[13px] top-0 h-full w-px bg-night-border/60 lg:left-1/2 lg:-translate-x-1/2"
      >
        <motion.div
          className="w-px origin-top"
          style={{
            height: "100%",
            scaleY: reduced ? 1 : smoothProgress,
            background:
              "linear-gradient(180deg, var(--professional-accent), var(--aurora-green) 55%, var(--development-accent))",
            boxShadow: "0 0 12px 1px color-mix(in oklab, var(--aurora-green) 35%, transparent)",
          }}
        />
        {!reduced ? (
          <motion.span
            className="absolute left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              top: dotTop,
              opacity: dotOpacity,
              backgroundColor: "var(--aurora-green)",
              boxShadow: "0 0 18px 3px color-mix(in oklab, var(--aurora-green) 60%, transparent)",
            }}
          />
        ) : null}
      </div>

      <ol className="relative space-y-12 lg:space-y-16">
        {milestones.map((entry) => (
          <MilestoneRow key={entry.id} entry={entry} reduced={reduced} />
        ))}
      </ol>
    </div>
  );
}
