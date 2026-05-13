import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/sanity-client";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cats = await getCategories();
  const now = new Date();

  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/portfolio`, lastModified: now, priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: now, priority: 0.7 },
    ...cats.map((c) => ({
      url: `${SITE.url}/portfolio/${c.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
