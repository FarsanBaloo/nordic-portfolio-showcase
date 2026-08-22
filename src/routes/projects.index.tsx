import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ProjectCard } from "../components/ProjectCard";
import { NightHero, Page } from "../components/site";
import { projectFilters, sortedProjects, type ProjectCategory } from "../content/projects";

const title = "Projects & Case Studies — Rickard Sörlin";
const description =
  "Applied industrial AI, SCADA and building-platform work, interaction design and innovation projects — each documented from problem to validated result.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
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
      </Page>
    </>
  );
}
