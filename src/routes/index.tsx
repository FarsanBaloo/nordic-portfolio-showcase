import { createFileRoute, Link } from "@tanstack/react-router";

import { ExperienceCard } from "../components/ExperienceCard";
import { ProjectCard } from "../components/ProjectCard";
import { Section } from "../components/site";
import { Timeline } from "../components/Timeline";
import { BulletList, Callout, Eyebrow, SectionHeading, TagList } from "../components/ui-bits";
import { mainCapabilities, capabilityNote } from "../content/capabilities";
import { bachelor, postgraduate, certifications } from "../content/education";
import { offerRelevance, roles } from "../content/experience";
import {
  aboutParagraphs,
  contactIntro,
  journeyIntro,
  productPhilosophy,
  profile,
  whatIBring,
} from "../content/profile";
import { sortedProjects } from "../content/projects";

const title = "Rickard Sörlin — Digital Platforms, Product & Applied AI";
const description =
  "Product-oriented industrial digital-platform professional with 25+ years in SCADA, BMS/HVAC and IoT, combined with Computer Science, interaction design and applied AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.descriptor,
          email: `mailto:${profile.email}`,
          telephone: "+46730795308",
          address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
          sameAs: [profile.linkedin],
          description: profile.positioning,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = sortedProjects.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-teal">
            {profile.location}
          </p>
          <h1 className="mt-4 text-balance-tight text-5xl font-semibold text-night-foreground sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-night-foreground/90">{profile.descriptor}</p>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-night-muted">
            {profile.heroPrimary}
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-night-muted">
            {profile.heroSupporting}
          </p>

          <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2">
            {profile.progression.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-night-border bg-white/5 px-3 py-1.5 text-sm text-night-foreground">
                  {step}
                </span>
                {i < profile.progression.length - 1 ? (
                  <span aria-hidden="true" className="text-aurora-teal">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-night-border bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-night-muted">
              Target / focus roles
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.targetRoles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-night-border px-3 py-1 text-sm text-night-foreground"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/journey"
              className="rounded-md bg-aurora-teal px-5 py-2.5 text-sm font-medium text-night transition-opacity hover:opacity-90"
            >
              Explore my journey
            </Link>
            <Link
              to="/projects"
              className="rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
            >
              View selected projects
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-night-border px-5 py-2.5 text-sm font-medium text-night-foreground transition-colors hover:bg-white/10"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden night-panel">
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-aurora-teal">
            The journey
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-night-foreground sm:text-4xl">
            From industrial systems to AI-enabled products
          </h2>
          <div className="mt-6 max-w-3xl space-y-4">
            {journeyIntro.slice(0, 2).map((p) => (
              <p key={p} className="text-[15px] leading-relaxed text-night-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-14">
            <Timeline />
          </div>
          <Link
            to="/journey"
            className="mt-12 inline-block text-sm font-medium text-aurora-teal hover:underline"
          >
            Read the full journey →
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <Section id="capabilities">
          <SectionHeading
            eyebrow="Capabilities"
            title="Where product, platforms and AI meet"
            intro={capabilityNote}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mainCapabilities.map((group) => (
              <div key={group.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <div className="mt-4">
                  <TagList items={group.items} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="25+ years close to customers and real systems"
            intro="Three stages at Schneider Electric — from delivery engineering to national platform expertise and senior technical advisory."
          />
          <div className="mt-8 space-y-6">
            {roles.map((role) => (
              <ExperienceCard key={role.id} role={role} />
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">{offerRelevance.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {offerRelevance.body}
            </p>
            <div className="mt-5">
              <TagList items={offerRelevance.items} />
            </div>
          </div>
        </Section>

        <Section id="projects">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects and case studies"
            intro="Applied AI, industrial platforms, interaction design and innovation work — each with the full story behind it."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <div key={project.slug} className="relative">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <Link
            to="/projects"
            className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
          >
            See all {sortedProjects.length} projects →
          </Link>
        </Section>

        <Section id="education">
          <SectionHeading
            eyebrow="Education"
            title="Deliberate, continuous development"
            intro={`${bachelor.title} — ${bachelor.specialisation}, plus advanced postgraduate studies in AI, innovation, product and requirements management.`}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {postgraduate.entries.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-border bg-card p-6">
                <Eyebrow>{entry.period}</Eyebrow>
                <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{entry.institution}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {entry.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span
                key={cert.title}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
              >
                {cert.title} · {cert.institution}
              </span>
            ))}
          </div>
          <Link
            to="/education"
            className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
          >
            Full education overview →
          </Link>
        </Section>

        <Section id="about">
          <SectionHeading eyebrow="About" title="How I work" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-4">
              {aboutParagraphs.slice(0, 3).map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <Callout label="Product philosophy">{productPhilosophy}</Callout>
            </div>
            <div className="space-y-4">
              {whatIBring.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact">
          <SectionHeading eyebrow="Contact" title="Let's talk" intro={contactIntro} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </p>
              <p className="mt-2 text-[15px] font-medium">{profile.email}</p>
            </a>
            <a
              href={profile.phoneLink}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Phone
              </p>
              <p className="mt-2 text-[15px] font-medium">{profile.phoneDisplay}</p>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                LinkedIn
              </p>
              <p className="mt-2 text-[15px] font-medium">{profile.linkedinDisplay}</p>
            </a>
          </div>
          <div className="mt-8">
            <BulletList items={profile.summary} />
          </div>
        </Section>
      </div>
    </>
  );
}
