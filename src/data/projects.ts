import { Project } from "@/types/project";

export const projects: Project[] = [
	{
		id: "timetrack",
		slug: "timetrack",
		thumbnail: "/images/projects/timetrack-thumb.webp",
		techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
		liveUrl: "https://time-track-mu.vercel.app/",
		featured: true,
		year: 2026,
	},
	{
		id: "edil2000",
		slug: "edil2000",
		thumbnail: "/images/projects/edil2000-thumb.webp",
		techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
		liveUrl: "https://edil2000samarate.com/",
		featured: true,
		year: 2026,
	},
];
