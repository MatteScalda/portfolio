"use client";

import { useCallback, useState } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { GlowCard } from "@/components/ui/GlowCard";
import { ExternalLinkIcon, CodeIcon } from "@/components/ui/Icons";
import { Project } from "@/types/project";
import { ANIMATION } from "@/lib/constants";
import Image from "next/image";

interface ProjectCardProps {
	project: Project;
	index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
	const t = useTranslations("Projects");
	const [hovered, setHovered] = useState(false);

	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);
	const smoothX = useSpring(cursorX, { stiffness: 400, damping: 30 });
	const smoothY = useSpring(cursorY, { stiffness: 400, damping: 30 });

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = e.currentTarget.getBoundingClientRect();
			cursorX.set(e.clientX - rect.left);
			cursorY.set(e.clientY - rect.top);
		},
		[cursorX, cursorY],
	);

	const url = project.liveUrl || project.repoUrl;

	return (
		<m.div
			initial={ANIMATION.fadeInUp.initial}
			whileInView={ANIMATION.fadeInUp.animate}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ ...ANIMATION.fadeInUp.transition, delay: index * 0.15 }}
		>
			<GlowCard>
				<div className={`project-card${url ? " project-card--has-link" : ""}`} onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
					{/* Stretched link — covers full card, sits behind content */}
					{url && <a href={url} target='_blank' rel='noopener noreferrer' className='project-card__stretched-link' aria-label={t(`items.${project.id}.title`)} />}

					{/* Custom cursor */}
					{url && (
						<m.div className='project-card__cursor' style={{ x: smoothX, y: smoothY }} animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.15 }}>
							<ExternalLinkIcon />
						</m.div>
					)}

					<div className='project-card__image-wrapper'>
						{/* <div
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
						</div> */}
						<Image
							src={project.thumbnail}
							alt={t(`items.${project.id}.title`)}
							fill
							sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='project-card__image'
							priority={index === 0}
						/>
					</div>

					<div className='project-card__body'>
						<h3 className='project-card__title'>{t(`items.${project.id}.title`)}</h3>
						<p className='project-card__description'>{t(`items.${project.id}.description`)}</p>
						<div className='project-card__tags'>
							{project.techStack.map((tech) => (
								<span key={tech} className='project-card__tag'>
									{tech}
								</span>
							))}
						</div>
					</div>
				</div>
			</GlowCard>
		</m.div>
	);
}
