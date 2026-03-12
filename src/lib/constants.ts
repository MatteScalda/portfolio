export const SITE = {
	name: "Matteo",
	title: "Matteo | Freelance Web Developer",
	url: "https://matteo.dev",
	email: "matteo.scaldaferri@gmail.com",
	phone: "+39 349 901 0793",
	phoneTel: "+393499010793",
	github: "https://github.com/mattescalda",
	linkedin: "https://www.linkedin.com/in/matteo-scaldaferri-3260a51b2/",
} as const;

export const ANIMATION = {
	fadeInUp: {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.4, ease: "easeInOut" },
	},
	fadeIn: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: 0.2 },
	},
	staggerContainer: {
		animate: { transition: { staggerChildren: 0.1 } },
	},
	scaleIn: {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.2 },
	},
} as const;

export const SECTION_IDS = {
	hero: "hero",
	about: "about",
	projects: "projects",
	techStack: "tech-stack",
	contact: "contact",
} as const;
