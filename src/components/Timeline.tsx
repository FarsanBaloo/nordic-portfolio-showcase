import { timeline } from "../content/timeline";

const professional = timeline.filter((t) => t.track === "professional");
const development = timeline.filter((t) => t.track === "development");
const merged = [...timeline].sort((a, b) => a.order - b.order);

function Node({
  period,
  title,
  detail,
  accent,
}: {
  period: string;
  title: string;
  detail: string;
  accent: "green" | "violet";
}) {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-0 top-2 h-3 w-3 rounded-full ring-4"
        style={{
          backgroundColor:
            accent === "green" ? "var(--aurora-green)" : "var(--aurora-violet)",
          // ring colour matched to the night band
          boxShadow: "0 0 0 4px color-mix(in oklab, var(--night) 88%, transparent)",
        }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-teal">{period}</p>
      <h3 className="mt-1.5 text-lg font-semibold text-night-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-night-muted">{detail}</p>
    </li>
  );
}

export function Timeline() {
  return (
    <div>
      {/* Desktop: two coordinated tracks */}
      <div className="hidden gap-12 md:grid md:grid-cols-2">
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-night-muted">
            Professional Experience
          </h3>
          <ol className="space-y-10 border-l border-night-border pl-0">
            {professional.map((entry) => (
              <Node key={entry.title} {...entry} accent="green" />
            ))}
          </ol>
        </div>
        <div>
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-night-muted">
            Education · AI · Product Development
          </h3>
          <ol className="space-y-10 border-l border-night-border pl-0">
            {development.map((entry) => (
              <Node key={entry.title} {...entry} accent="violet" />
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile: one chronological sequence */}
      <ol className="space-y-9 border-l border-night-border md:hidden">
        {merged.map((entry) => (
          <li key={entry.title} className="relative pl-7">
            <span
              aria-hidden="true"
              className="absolute -left-[6px] top-2 h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  entry.track === "professional"
                    ? "var(--aurora-green)"
                    : "var(--aurora-violet)",
              }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-aurora-teal">
              {entry.period}
              <span className="ml-2 text-night-muted">
                {entry.track === "professional" ? "· Experience" : "· Development"}
              </span>
            </p>
            <h3 className="mt-1.5 text-base font-semibold text-night-foreground">
              {entry.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-night-muted">{entry.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
