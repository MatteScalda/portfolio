"use client";

import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {year} {SITE.name}. {t("copyright")} &mdash; {t("builtWith")}
        </p>
        <div className="footer__socials">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="footer__social-link"
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
