import { useState, type ReactNode } from "react";

export function Tag({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <span
      className={
        night
          ? "inline-flex items-center rounded-full border border-night-border px-3 py-1 text-xs font-medium text-night-muted"
          : "inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
      }
    >
      {children}
    </span>
  );
}

export function TagList({ items, night = false }: { items: readonly string[]; night?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag night={night}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function Eyebrow({ children, night = false }: { children: ReactNode; night?: boolean }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.2em] ${
        night ? "text-aurora-teal" : "text-primary"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="mt-3 text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg text-muted-foreground">{intro}</p> : null}
    </header>
  );
}

/** Horizontal step progression, e.g. Customer Need → Feasibility → Solution. */
export function FlowSteps({
  steps,
  label,
  night = false,
}: {
  steps: readonly string[];
  label?: string;
  night?: boolean;
}) {
  return (
    <div>
      {label ? (
        <p
          className={`mb-3 font-mono text-xs uppercase tracking-[0.18em] ${
            night ? "text-night-muted" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
      ) : null}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={
                night
                  ? "rounded-md border border-night-border bg-white/5 px-3 py-1.5 text-sm text-night-foreground"
                  : "rounded-md border border-border bg-card px-3 py-1.5 text-sm"
              }
            >
              {step}
            </span>
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={night ? "text-aurora-teal" : "text-primary"}
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Disclosure({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-secondary"
      >
        <span>{summary}</span>
        <span aria-hidden="true" className="text-primary">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? <div className="border-t border-border px-5 py-5">{children}</div> : null}
    </div>
  );
}

export function Callout({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border-l-2 border-primary bg-accent/50 px-5 py-4">
      {label ? (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{label}</p>
      ) : null}
      <div className="mt-1 text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

export function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const aspectClass: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
  "1/1": "aspect-square",
};

/** Frame for a project image; renders a placeholder when no source is supplied. */
export function ImageFrame({
  caption,
  aspect = "16/9",
  note,
  src,
  alt,
}: {
  caption: string;
  aspect?: string | undefined;
  note?: string | undefined;
  src?: string | undefined;
  alt?: string | undefined;
}) {
  const ratio = aspectClass[aspect] ?? "aspect-video";
  return (
    <figure>
      {src ? (
        <div
          className={`${ratio} overflow-hidden rounded-lg border border-border bg-secondary shadow-[0_18px_48px_-24px_rgba(0,0,0,0.75)]`}
        >
          <img
            src={src}
            alt={alt ?? caption}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`${ratio} flex items-center justify-center rounded-lg border border-dashed border-border bg-secondary`}
        >
          <span className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Image to be added
          </span>
        </div>
      )}
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {caption}
        {note ? <span className="block text-xs italic">{note}</span> : null}
      </figcaption>
    </figure>
  );
}

