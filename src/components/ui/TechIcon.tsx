"use client";

import { m } from "motion/react";
import { TechItem } from "@/types/techStack";
import { ANIMATION } from "@/lib/constants";
import { techIcons } from "@/components/ui/TechIcons";

interface TechIconProps {
	item: TechItem;
	index: number;
}

export function TechIcon({ item, index }: TechIconProps) {
	const IconComponent = techIcons[item.name];

	return (
		<m.a
			href={item.url}
			target='_blank'
			rel='noopener noreferrer'
			className='tech-icon'
			style={{ "--tech-brand-color": item.brandColor } as React.CSSProperties}
			initial={ANIMATION.scaleIn.initial}
			whileInView={ANIMATION.scaleIn.animate}
			viewport={{ once: true }}
			transition={{ ...ANIMATION.scaleIn.transition, delay: index * 0.05 }}
			whileHover={{ borderColor: item.brandColor }}
		>
			<span className='tech-icon__svg'>{IconComponent ? <IconComponent /> : null}</span>
			<span className='tech-icon__name'>{item.name}</span>
		</m.a>
	);
}
