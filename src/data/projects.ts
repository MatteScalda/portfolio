import { Project } from "@/types/project";

export const projects: Project[] = [
	{
		id: "jushin",
		slug: "scuola-del-tempo-jushin",
		thumbnail: "/images/projects/jushin-thumb.png",
		techStack: ["Next.js", "TailwindCSS", "PayloadCMS"],
		liveUrl: "https://campus.scuoladeltempojushin.com/",
		featured: true,
		year: 2026,
	},
	{
		id: "havant",
		slug: "havant",
		thumbnail: "/images/projects/havant-thumb.png",
		techStack: ["Wordpress", "ACF", "PHP", "TailwindCSS"],
		liveUrl: "https://www.havant.com/",
		featured: true,
		year: 2026,
	},
	{ id: "edil2000", slug: "edil2000", thumbnail: "/images/projects/edil2000-thumb.png", techStack: ["WIX"], liveUrl: "https://edil2000samarate.com/", featured: true, year: 2019 },
];
