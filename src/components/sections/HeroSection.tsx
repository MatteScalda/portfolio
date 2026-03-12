"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { GridBackground } from "@/components/ui/GridBackground";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDownIcon } from "@/components/ui/Icons";
import { SECTION_IDS } from "@/lib/constants";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id={SECTION_IDS.hero} className="hero">
      <GridBackground />

      <div className="hero__content">
        <m.p
          className="hero__greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("greeting")}
        </m.p>

        <m.h1
          className="hero__name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t("name")}
        </m.h1>

        <m.p
          className="hero__role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t("role")}
        </m.p>

        <m.div
          className="hero__tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <TypewriterText text={t("tagline")} startDelay={1200} delay={40} />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <MagneticButton href={`#${SECTION_IDS.projects}`}>
            {t("cta")}
            <ArrowDownIcon />
          </MagneticButton>
        </m.div>
      </div>

      <m.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <span>scroll</span>
        <ArrowDownIcon className="hero__scroll-chevron" />
      </m.div>
    </section>
  );
}
