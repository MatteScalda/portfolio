import { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { settings } = await getSiteContent("it");
  const locales = ["en", "it"];

  return locales.map((locale) => ({
    url: `${settings.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${settings.url}/${l}`])
      ),
    },
  }));
}
