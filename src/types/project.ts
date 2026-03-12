export interface Project {
  id: string;
  slug: string;
  thumbnail: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
}
