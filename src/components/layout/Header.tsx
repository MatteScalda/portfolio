"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m, AnimatePresence } from "motion/react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useContactModal } from "@/lib/contact-modal-context";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Header() {
	const t = useTranslations();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { scrollDirection, scrollY } = useScrollDirection();
	const activeSection = useActiveSection();
	const { openModal } = useContactModal();

	const isHidden = scrollDirection === "down" && scrollY > 200 && !mobileOpen;

	return (
		<>
			{/* Logo + right side — hides on scroll-down */}
			<header className={cn("header", isHidden && "header--hidden")}>
				<div className='header__inner'>
					<a href='#hero' className='header__logo'>
						{"<MS />"}
					</a>

					<div className='header__right'>
						<button className='header__cta' onClick={openModal}>
							{t("Nav.cta")}
						</button>
						<LocaleSwitcher />
						<button className={cn("header__menu-btn", mobileOpen && "header__menu-btn--open")} onClick={() => setMobileOpen(!mobileOpen)} aria-label='Toggle menu'>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>

			{/* Floating pill nav — always visible on desktop */}
			<nav className='nav-pill'>
				{navLinks.map((link) => {
					const isActive = activeSection === link.href.slice(1);
					return (
						<a key={link.href} href={link.href} className={cn("nav-pill__link", isActive && "nav-pill__link--active")}>
							{isActive && <m.span layoutId='nav-pill-indicator' className='nav-pill__indicator' transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
							<span className='nav-pill__text'>{t(link.labelKey)}</span>
						</a>
					);
				})}
			</nav>

			{/* Mobile fullscreen menu */}
			<AnimatePresence>
				{mobileOpen && (
					<m.div className='header__mobile-menu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
						{navLinks.map((link) => (
							<m.a
								key={link.href}
								href={link.href}
								className='header__mobile-link'
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
