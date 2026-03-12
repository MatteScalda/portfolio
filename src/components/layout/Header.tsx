"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "motion/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const activeSection = useActiveSection();

  const isScrolled = scrollY > 50;
  const isHidden = scrollDirection === "down" && scrollY > 200 && !mobileOpen;

  return (
    <>
      <header
        className={cn(
          "header",
          isHidden && "header--hidden",
          isScrolled && "header--scrolled"
        )}
      >
        <nav className="header__nav">
          <a href="#hero" className="header__logo">
            {"<M />"}
          </a>

          <div className="header__links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "header__link",
                  activeSection === link.href.slice(1) && "header__link--active"
                )}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>

          <div className="header__actions">
            <LocaleSwitcher />
            <button
              className={cn(
                "header__menu-btn",
                mobileOpen && "header__menu-btn--open"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="header__mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <m.a
                key={link.href}
                href={link.href}
                className="header__mobile-link"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {t(link.labelKey)}
              </m.a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
