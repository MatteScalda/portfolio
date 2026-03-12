"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { PhoneIcon, MailIcon, CopyIcon, CheckIcon, XIcon } from "@/components/ui/Icons";
import { useContactModal } from "@/lib/contact-modal-context";
import { SITE } from "@/lib/constants";

export function ContactModal() {
	const { isOpen, closeModal: onClose } = useContactModal();
	const t = useTranslations("Contact");
	const [copiedPhone, setCopiedPhone] = useState(false);
	const [copiedMail, setCopiedMail] = useState(false);

	const handleCopyPhone = useCallback(async () => {
		await navigator.clipboard.writeText(SITE.phone);
		setCopiedPhone(true);
		setTimeout(() => setCopiedPhone(false), 2000);
	}, []);

	const handleCopyMail = useCallback(async () => {
		await navigator.clipboard.writeText(SITE.email);
		setCopiedMail(true);
		setTimeout(() => setCopiedMail(false), 2000);
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [isOpen, onClose]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div className='contact-modal__overlay' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose}>
					<m.div
						className='contact-modal'
						initial={{ opacity: 0, scale: 0.95, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 16 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						role='dialog'
						aria-modal='true'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<div className='contact-modal__header'>
							<h2 className='contact-modal__title'>{t("modal.title")}</h2>
							<button className='contact-modal__close' onClick={onClose} aria-label='Close'>
								<XIcon />
							</button>
						</div>

						{/* Options */}
						<div className='contact-modal__options'>
							{/* Call */}
							<div className='contact-modal__card'>
								<div className='contact-modal__card-icon'>
									<PhoneIcon />
								</div>
								<h3 className='contact-modal__card-title'>{t("modal.call.title")}</h3>
								<p className='contact-modal__phone'>{SITE.phone}</p>
								<p className='contact-modal__hours'>{t("modal.call.hours")}</p>
								<div className='contact-modal__actions'>
									<a href={`tel:${SITE.phoneTel}`} className='contact-modal__btn contact-modal__btn--primary'>
										<PhoneIcon />
										{t("modal.call.cta")}
									</a>
									<button type='button' className='contact-modal__btn contact-modal__btn--secondary' onClick={handleCopyPhone}>
										{copiedPhone ? <CheckIcon /> : <CopyIcon />}
										{copiedPhone ? t("modal.call.copied") : t("modal.call.copy")}
									</button>
								</div>
							</div>

							{/* Divider */}
							<div className='contact-modal__divider'>
								<span>{t("modal.or")}</span>
							</div>

							{/* Email */}
							<div className='contact-modal__card'>
								<div className='contact-modal__card-icon'>
									<MailIcon />
								</div>
								<h3 className='contact-modal__card-title'>{t("modal.email.title")}</h3>
								<p className='contact-modal__email-address'>{SITE.email}</p>
								<div className='contact-modal__actions'>
									<a href={`mailto:${SITE.email}`} className='contact-modal__btn contact-modal__btn--primary'>
										<MailIcon />
										{t("modal.email.cta")}
									</a>
									<button type='button' className='contact-modal__btn contact-modal__btn--secondary' onClick={handleCopyMail}>
										{copiedMail ? <CheckIcon /> : <CopyIcon />}
										{copiedMail ? t("modal.email.copied") : t("modal.email.copy")}
									</button>
								</div>
							</div>
						</div>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	);
}
