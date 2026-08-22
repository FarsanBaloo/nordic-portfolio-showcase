import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { NightHero, Page } from "../components/site";
import { BulletList, Callout, Eyebrow, FlowSteps, ImageFrame, TagList } from "../components/ui-bits";
import { getProject, sortedProjects } from "../content/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case study | Rickard Sörlin`;
    return {
      meta: [
        { title },
        { name: "description", content: project.teaser },
        { property: "og:title", content: title },
        { property: "og:description", content: project.teaser },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  notFoundComponent: CaseNotFound,
  component: CaseStudy,
});

function CaseNotFound() {
  return (
    <Page>
      <h1 className="text-3xl font-semibold">Case study not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary hover:underline">
        Back to all projects →
      </Link>
    </Page>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const index = sortedProjects.findIndex((p) => p.slug === project.slug);
  const next = sortedProjects[(index + 1) % sortedProjects.length];

  return (
    <>
      <NightHero
        eyebrow={`${project.type} · ${project.meta}`}
        title={project.title}
        intro={project.subtitle ?? project.teaser}
      >
        <p className="mt-6 max-w-2xl text-sm text-night-muted">{project.org}</p>
        {project.highlight ? (
          <p className="mt-8 max-w-2xl border-l-2 border-aurora-teal pl-5 text-lg italic leading-relaxed text-night-foreground">
            {project.highlight}
          </p>
        ) : null}
        <div className="mt-8">
          <TagList items={project.tags} night />
        </div>
      </NightHero>

      <Page>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
          <article className="max-w-3xl space-y-12">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold">{section.heading}</h2>
                {section.body?.map((p) => (
                  <p key={p} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.items?.length ? (
                  <div className="mt-5">
                    <BulletList items={section.items} />
                  </div>
                ) : null}
                {section.quote ? (
                  <blockquote className="mt-5 border-l-2 border-primary pl-5 text-[15px] italic leading-relaxed">
                    {section.quote}
                  </blockquote>
                ) : null}
              </section>
            ))}

            {project.flow ? <FlowSteps steps={project.flow.steps} label={project.flow.label} /> : null}

            {project.images?.slots.length ? (
              <section>
                <h2 className="text-2xl font-semibold">Images</h2>
                {project.images.intro ? (
                  <p className="mt-3 text-sm text-muted-foreground">{project.images.intro}</p>
                ) : null}
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {project.images.slots.map((slot) => (
                    <ImageFrame
                      key={slot.caption}
                      caption={slot.caption}
                      aspect={slot.aspect}
                      note={slot.note}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {project.reflection ? <Callout label="Reflection">{project.reflection}</Callout> : null}
            {project.contributionNote ? (
              <Callout label="My contribution">{project.contributionNote}</Callout>
            ) : null}
          </article>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {project.metrics?.length ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <Eyebrow>Results</Eyebrow>
                <dl className="mt-4 space-y-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </dt>
                      <dd className="text-xl font-semibold">{metric.value}</dd>
                      {metric.note ? (
                        <dd className="text-xs text-muted-foreground">{metric.note}</dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="rounded-xl border border-border bg-card p-6">
              <Eyebrow>Categories</Eyebrow>
              <div className="mt-4">
                <TagList items={project.categories} />
              </div>
            </div>

            {project.links?.length ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <Eyebrow>Links</Eyebrow>
                <ul className="mt-4 space-y-2 text-sm">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        <nav className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
            ← All projects
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Next: {next.title} →
          </Link>
        </nav>
      </Page>
    </>
  );
}
