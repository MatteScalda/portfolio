"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcon";
import { techStack } from "@/data/techStack";
import { SECTION_IDS, ANIMATION } from "@/lib/constants";

const categories = ["frontend", "backend", "tools"] as const;

export function TechStackSection() {
	const t = useTranslations("TechStack");

	return (
		<section id={SECTION_IDS.techStack} className='tech-stack'>
			<SectionHeading label={t("label")} title={t("heading")} />

			{categories.map((category) => {
				const items = techStack.filter((item) => item.category === category);
				if (items.length === 0) return null;

				return (
					<m.div
						key={category}
						className='tech-stack__category'
						initial={ANIMATION.fadeIn.initial}
						whileInView={ANIMATION.fadeIn.animate}
						viewport={{ once: true, margin: "-50px" }}
						transition={ANIMATION.fadeIn.transition}
					>
						<h3 className='tech-stack__category-label'>{t(`categories.${category}`)}</h3>
						<div className='tech-stack__grid'>
							{items.map((item, index) => (
								<TechIcon key={item.name} item={item} index={index} />
							))}
						</div>
					</m.div>
				);
			})}
		</section>
	);
}
