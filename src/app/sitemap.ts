import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { FRAMEWORKS } from "@/data/insights";
import { DROPS } from "@/data/drops";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/insights",
    "/drops",
    "/autonomy",
    "/speakers",
    "/quotes",
    "/tools",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const f of FRAMEWORKS) {
    entries.push({
      url: `${SITE.url}/insights/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const d of DROPS) {
    entries.push({
      url: `${SITE.url}/drops/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
