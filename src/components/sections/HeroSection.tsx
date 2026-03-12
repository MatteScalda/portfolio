"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { m, useScroll, useTransform } from "motion/react";
import { GridBackground } from "@/components/ui/GridBackground";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDownIcon } from "@/components/ui/Icons";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
	const t = useTranslations("Hero");
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	// Parallax: content drifts upward as user scrolls down
	const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -250]);

	// Scroll indicator: fades out and drifts upward quickly
	const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
	const scrollY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

	return (
		<section ref={sectionRef} id={SECTION_IDS.hero} className='hero'>
			<GridBackground />

			<m.div className='hero__content' style={{ opacity: contentOpacity, y: contentY }}>
				<m.p className='hero__greeting' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
					{t("greeting")}
				</m.p>

				<m.h1 className='hero__name' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
					{t("name")}
				</m.h1>

				<m.p className='hero__role' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
					{t("role")}
				</m.p>

				<m.div className='hero__tagline' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 1 }}>
					<TypewriterText text={t("tagline")} startDelay={1200} delay={40} />
				</m.div>

				<m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
					<MagneticButton href={`#${SECTION_IDS.projects}`}>
						{t("cta")}
						<ArrowDownIcon />
					</MagneticButton>
				</m.div>
			</m.div>

			<m.div className='hero__scroll-indicator' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2 }} style={{ opacity: scrollOpacity, y: scrollY }}>
				<span>{t("scroll")}</span>
				<ArrowDownIcon className='hero__scroll-chevron' />
			</m.div>
		</section>
	);
}
