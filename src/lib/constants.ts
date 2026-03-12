export const SITE = {
  name: "Matteo",
  title: "Matteo | Freelance Web Developer",
  url: "https://matteo.dev",
  email: "hello@matteo.dev",
  github: "https://github.com/matteo",
  linkedin: "https://linkedin.com/in/matteo",
} as const;

export const ANIMATION = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
  },
} as const;

export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  projects: "projects",
  techStack: "tech-stack",
  contact: "contact",
} as const;
