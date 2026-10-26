export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt?: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
}
