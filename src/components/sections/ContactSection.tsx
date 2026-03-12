"use client";

import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useContactModal } from "@/lib/contact-modal-context";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { SITE, SECTION_IDS, ANIMATION } from "@/lib/constants";

export function ContactSection() {
  const t = useTranslations("Contact");
  const { openModal } = useContactModal();

  return (
    <section id={SECTION_IDS.contact} className="contact">
      <m.div
        className="contact__inner"
        initial={ANIMATION.fadeInUp.initial}
        whileInView={ANIMATION.fadeInUp.animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={ANIMATION.fadeInUp.transition}
      >
        <p className="contact__label">{t("label")}</p>

        <h2 className="contact__headline">
          <span>{t("headline1")}</span>
          <span className="contact__headline--accent">{t("headline2")}</span>
        </h2>

        <div className="contact__badge">
          <span className="contact__badge-dot" />
          {t("badge")}
        </div>

        <MagneticButton onClick={openModal}>
          {t("cta")}
        </MagneticButton>

        <div className="contact__socials">
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
        </div>
      </m.div>
    </section>
  );
}
