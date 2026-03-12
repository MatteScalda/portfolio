import { TechItem } from "@/types/techStack";

export const techStack: TechItem[] = [
  // Frontend
  { name: "React", category: "frontend", brandColor: "#61DAFB", url: "https://react.dev" },
  { name: "Next.js", category: "frontend", brandColor: "#ffffff", url: "https://nextjs.org" },
  { name: "TypeScript", category: "frontend", brandColor: "#3178C6", url: "https://typescriptlang.org" },
  { name: "JavaScript", category: "frontend", brandColor: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TailwindCSS", category: "frontend", brandColor: "#06B6D4", url: "https://tailwindcss.com" },
  { name: "HTML", category: "frontend", brandColor: "#E34F26", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", category: "frontend", brandColor: "#1572B6", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },

  // Backend
  { name: "Node.js", category: "backend", brandColor: "#339933", url: "https://nodejs.org" },
  { name: "Java", category: "backend", brandColor: "#ED8B00", url: "https://dev.java" },
  { name: "Express", category: "backend", brandColor: "#ffffff", url: "https://expressjs.com" },
  { name: "PostgreSQL", category: "backend", brandColor: "#4169E1", url: "https://postgresql.org" },
  { name: "MongoDB", category: "backend", brandColor: "#47A248", url: "https://mongodb.com" },

  // Tools
  { name: "Git", category: "tools", brandColor: "#F05032", url: "https://git-scm.com" },
  { name: "Docker", category: "tools", brandColor: "#2496ED", url: "https://docker.com" },
  { name: "Vercel", category: "tools", brandColor: "#ffffff", url: "https://vercel.com" },
  { name: "Figma", category: "tools", brandColor: "#F24E1E", url: "https://figma.com" },
];
