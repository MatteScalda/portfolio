import type { CollectionConfig } from "payload";
import { authenticated, publishedRead } from "../access";
import { urlField } from "../fields";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Progetto", plural: "Progetti" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "year", "published", "sortOrder"] },
  defaultSort: "sortOrder",
  access: { read: publishedRead, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "title", label: "Titolo", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "description", label: "Descrizione", type: "textarea", required: true, localized: true },
    { name: "thumbnail", label: "Immagine", type: "upload", relationTo: "media", required: true },
    { name: "techStack", label: "Tecnologie", type: "array", fields: [{ name: "name", label: "Nome", type: "text", required: true }] },
    urlField("liveUrl", "Sito del progetto"),
    urlField("repoUrl", "Repository"),
    { name: "year", label: "Anno", type: "number", required: true, min: 1900, max: 2100 },
    { name: "featured", label: "In evidenza", type: "checkbox", defaultValue: true },
    { name: "published", label: "Pubblicato", type: "checkbox", defaultValue: false, admin: { position: "sidebar", description: "Solo i progetti pubblicati sono visibili sul sito." } },
    { name: "sortOrder", label: "Ordine", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
