import "server-only";
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import en from "../../messages/en.json";
import it from "../../messages/it.json";
import { SITE } from "./constants";
import type { SiteSettings } from "./site-settings-context";
import type { Project } from "@/types/project";
import type { TechItem } from "@/types/techStack";

// Only known message keys are passed to next-intl. Empty translations use the original copy.
function mergeMessages<T extends Record<string, unknown>>(fallback: T, content: Record<string, unknown>): T {
  return Object.fromEntries(Object.entries(fallback).map(([key, value]) => [key,
    typeof value === "string"
      ? (typeof content[key] === "string" && content[key] !== "" ? content[key] : value)
      : mergeMessages(value as Record<string, unknown>, (content[key] ?? {}) as Record<string, unknown>),
  ])) as T;
}

export const getSiteContent = cache(async (requestedLocale: string) => {
  const locale = requestedLocale === "en" ? "en" : "it";
  const payload = await getPayload({ config });
  const [content, settingsDoc, projectDocs, technologyDocs] = await Promise.all([
    payload.findGlobal({ slug: "site-content", locale, fallbackLocale: false, depth: 1, overrideAccess: false }),
    payload.findGlobal({ slug: "site-settings", overrideAccess: false }),
    payload.find({ collection: "projects", locale, depth: 1, sort: "sortOrder", limit: 1000, pagination: false, overrideAccess: false }),
    payload.find({ collection: "technologies", sort: "sortOrder", limit: 1000, pagination: false, overrideAccess: false }),
  ]);
  const settings = Object.fromEntries(Object.entries(SITE).map(([key, value]) => [
    key, settingsDoc[key as keyof typeof settingsDoc] || value,
  ])) as SiteSettings;

  const projects: Project[] = projectDocs.docs.map((project) => {
    const image = typeof project.thumbnail === "object" ? project.thumbnail : null;
    return {
      id: String(project.id), slug: project.slug, title: project.title, description: project.description,
      thumbnail: image?.sizes?.thumbnail?.url || image?.url || "/file.svg",
      thumbnailAlt: image?.alt || project.title,
      techStack: (project.techStack ?? []).map((tech) => tech.name),
      liveUrl: project.liveUrl || undefined, repoUrl: project.repoUrl || undefined,
      featured: project.featured ?? false, year: project.year,
    };
  });
  const technologies: TechItem[] = technologyDocs.docs.map(({ name, category, brandColor, url }) => ({ name, category, brandColor, url }));
  const messages = mergeMessages(locale === "en" ? en : it, content as unknown as Record<string, unknown>);
  const seo = {
    title: content.meta?.title?.trim() || messages.Metadata.title,
    description: content.meta?.description?.trim() || messages.Metadata.description,
    image: typeof content.meta?.image === "object" ? content.meta.image : null,
  };
  return { messages, settings, projects, technologies, seo };
});
