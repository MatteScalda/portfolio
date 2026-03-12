"use client";

import { m } from "motion/react";
import { useTranslations } from "next-intl";
import { GlowCard } from "@/components/ui/GlowCard";
import { ExternalLinkIcon, CodeIcon } from "@/components/ui/Icons";
import { Project } from "@/types/project";
import { ANIMATION } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations("Projects");

  return (
    <m.div
      initial={ANIMATION.fadeInUp.initial}
      whileInView={ANIMATION.fadeInUp.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...ANIMATION.fadeInUp.transition, delay: index * 0.15 }}
    >
      <GlowCard>
        <div className="project-card">
          <div className="project-card__image-wrapper">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary))`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
              }}
            >
              {t(`items.${project.id}.title`)}
            </div>
          </div>
          <div className="project-card__body">
            <h3 className="project-card__title">
              {t(`items.${project.id}.title`)}
            </h3>
            <p className="project-card__description">
              {t(`items.${project.id}.description`)}
            </p>
            <div className="project-card__tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="project-card__tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-card__links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  <ExternalLinkIcon /> {t("viewProject")}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  <CodeIcon /> {t("viewCode")}
                </a>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </m.div>
  );
}
