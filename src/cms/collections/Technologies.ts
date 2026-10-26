import type { CollectionConfig } from "payload";
import { authenticated, publicRead } from "../access";
import { urlField } from "../fields";

export const Technologies: CollectionConfig = {
  slug: "technologies",
  labels: { singular: "Tecnologia", plural: "Tecnologie" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "category", "sortOrder"] },
  defaultSort: "sortOrder",
  access: { read: publicRead, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: "name", label: "Nome", type: "text", required: true, unique: true, admin: { description: "I nomi delle tecnologie esistenti riconoscono automaticamente la relativa icona." } },
    { name: "category", label: "Categoria", type: "select", required: true, options: [{ label: "Frontend", value: "frontend" }, { label: "Backend", value: "backend" }, { label: "Strumenti", value: "tools" }] },
    { name: "brandColor", label: "Colore", type: "text", required: true, defaultValue: "#ffffff", validate: (value: unknown) => /^#[0-9a-f]{6}$/i.test(String(value)) || "Usa un colore esadecimale, ad esempio #61DAFB." },
    urlField("url", "Sito ufficiale", true),
    { name: "sortOrder", label: "Ordine", type: "number", defaultValue: 0 },
  ],
};
