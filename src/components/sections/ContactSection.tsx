"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { SITE, SECTION_IDS, ANIMATION } from "@/lib/constants";

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section id={SECTION_IDS.contact} className="contact">
      <SectionHeading label={t("label")} title={t("heading")} center />

      <m.p
        className="contact__subtitle"
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.animate}
        viewport={{ once: true }}
        transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.2 }}
      >
        {t("subtitle")}
      </m.p>

      <m.div
        className="contact__placeholder"
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.animate}
        viewport={{ once: true }}
        transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.3 }}
      >
        {t("placeholder")}
      </m.div>

      <m.div
        className="contact__email"
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.animate}
        viewport={{ once: true }}
        transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.4 }}
      >
        <span>{t("emailLabel")}</span>{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </m.div>

      <m.div
        className="contact__socials"
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.animate}
        viewport={{ once: true }}
        transition={{ ...ANIMATION.fadeInUp.transition, delay: 0.5 }}
      >
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="contact__social-link"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="contact__social-link"
          aria-label="LinkedIn"
        >
          <LinkedinIcon />
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="contact__social-link"
          aria-label="Email"
        >
          <MailIcon />
        </a>
      </m.div>
    </section>
  );
}
