import { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { settings } = await getSiteContent("it");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${settings.url}/sitemap.xml`,
  };
}
