"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import { SECTION_IDS } from "@/lib/constants";

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id={SECTION_IDS.projects} className="projects">
      <SectionHeading label={t("label")} title={t("heading")} />

      <div className="projects__grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
