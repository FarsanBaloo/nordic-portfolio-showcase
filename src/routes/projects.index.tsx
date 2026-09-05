import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ProjectCard } from "../components/ProjectCard";
import { GithubIcon } from "../components/brand-icons";
import { NightHero, Page } from "../components/site";
import { profile } from "../content/profile";
import { projectFilters, sortedProjects, type ProjectCategory } from "../content/projects";
import { seo } from "../lib/site";

const title = "Projects & Case Studies — Rickard Sörlin";
const description =
  "Applied industrial AI, SCADA and building-platform work, interaction design and innovation projects — each documented from problem to validated result.";

export const Route = createFileRoute("/projects/")({
  head: () => seo({ title, description, path: "/projects" }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<string>("All");
  const visible =
    filter === "All"
      ? sortedProjects
      : sortedProjects.filter((p) => p.categories.includes(filter as ProjectCategory));

  return (
    <>
      <NightHero
        eyebrow="Selected work"
        title="Projects and case studies"
        intro="Each case follows the same thread: the real problem, the discovery, the solution, how it was validated, and why it matters as a product."
      />
      <Page>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {projectFilters.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === option
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <div key={project.slug} className="relative">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="More study projects on GitHub (opens in a new tab)"
        className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
      >
        <GithubIcon className="h-8 w-8 shrink-0 text-foreground" />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">More on GitHub</span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Study projects in Computer Vision, Natural Language Processing, Machine Learning and
            more — code and experiments from my BSc in Computer Science.
          </span>
        </span>
        <span className="shrink-0 text-sm font-medium text-primary">
          {profile.githubDisplay} →
        </span>
      </a>
    </Page>
    </>
  );
}
