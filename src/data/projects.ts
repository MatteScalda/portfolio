import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "timetrack",
    slug: "timetrack",
    thumbnail: "/images/projects/timetrack-thumb.webp",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL"],
    liveUrl: "#",
    featured: true,
    year: 2025,
  },
  {
    id: "buildingCo",
    slug: "building-company",
    thumbnail: "/images/projects/building-co-thumb.webp",
    techStack: ["Next.js", "TailwindCSS", "Framer Motion"],
    liveUrl: "#",
    featured: true,
    year: 2025,
  },
];
