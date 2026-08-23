import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import portraitAsset from "../assets/rickard-portrait.png.asset.json";
import { profile } from "../content/profile";

const nav = [
  { to: "/", label: "Home" },
  { to: "/journey", label: "Journey" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-night/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          {profile.name}
          <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            Product · Applied AI
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground font-medium" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden night-panel">
      <div className="relative mx-auto max-w-6xl px-5 py-14">
        <p className="font-display text-2xl font-semibold text-night-foreground">
          {profile.name}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-night-muted">
          {profile.descriptor} — {profile.location}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <li>
            <a className="text-aurora-teal hover:underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className="text-aurora-teal hover:underline" href={profile.phoneLink}>
              {profile.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              className="text-aurora-teal hover:underline"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              {profile.linkedinDisplay}
            </a>
          </li>
        </ul>
        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-night-muted">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-night-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-xs text-night-muted">
          © {new Date().getFullYear()} {profile.name}. Built as a static site.
        </p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <main className="mx-auto max-w-6xl px-5 py-16 sm:py-20">{children}</main>;
}

export function NightHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string | undefined;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden night-panel">
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-teal">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-balance-tight text-4xl font-semibold text-night-foreground sm:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-night-muted">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function PortraitFrame({
  className = "",
  eager = true,
}: {
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[320px] ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-aurora-teal/8 blur-2xl"
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-night-border bg-night-soft shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
        <img
          src={portraitAsset.url}
          alt="Portrait of Rickard Sörlin"
          width={480}
          height={480}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full scale-[1.07] object-cover object-[50%_22%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
        />
      </div>
    </div>
  );
}

/** Smaller, centred identity portrait used at the start of the Journey. */
export function JourneyPortrait() {
  return (
    <div className="flex flex-col items-center text-center">
      <PortraitFrame className="w-[130px] sm:w-[150px] lg:w-[168px]" eager={false} />
      <h2 className="mt-6 font-display text-2xl font-semibold text-night-foreground">
        {profile.name}
      </h2>
      <p className="mt-1.5 text-[15px] text-night-body">{profile.descriptor}</p>
      <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.11em] text-night-muted">
        {profile.location}
      </p>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 sm:py-16 ${className}`}>
      {children}
    </section>
  );
}
