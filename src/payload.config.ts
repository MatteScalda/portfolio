import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { en } from "@payloadcms/translations/languages/en";
import { it } from "@payloadcms/translations/languages/it";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Projects } from "./cms/collections/Projects";
import { Technologies } from "./cms/collections/Technologies";
import { SiteContent } from "./cms/globals/SiteContent";
import { SiteSettings } from "./cms/globals/SiteSettings";
import itMessages from "../messages/it.json";
import enMessages from "../messages/en.json";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: dirname, importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.ts") }, meta: { titleSuffix: " | Matteo CMS" } },
  collections: [Users, Media, Projects, Technologies],
  globals: [SiteContent, SiteSettings],
  plugins: [seoPlugin({
    globals: [SiteContent.slug],
    uploadsCollection: Media.slug,
    tabbedUI: true,
    generateTitle: ({ doc, locale }) => {
      const fallback = locale === "en" ? enMessages : itMessages;
      return doc?.Hero?.name && doc?.Hero?.role
        ? `${doc.Hero.name} | ${doc.Hero.role}`
        : doc?.Metadata?.title || fallback.Metadata.title;
    },
    generateDescription: ({ doc, locale }) => {
      const fallback = locale === "en" ? enMessages : itMessages;
      return doc?.Metadata?.description || doc?.Hero?.tagline || fallback.Metadata.description;
    },
    generateURL: async ({ locale, req }) => {
      const settings = await req.payload.findGlobal({ slug: "site-settings", overrideAccess: false, req });
      return new URL(`/${locale === "en" ? "en" : "it"}`, settings.url).href;
    },
  })],
  localization: { locales: [{ label: "Italiano", code: "it" }, { label: "English", code: "en" }], defaultLocale: "it", fallback: true },
  i18n: { supportedLanguages: { it, en }, fallbackLanguage: "it" },
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URL || "file:./data/portfolio.db" }, push: false }),
  sharp,
  graphQL: { disable: true },
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
