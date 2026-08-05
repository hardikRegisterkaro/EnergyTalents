import type { MetadataRoute } from "next";
import { ROLES, slugify } from "./careers/roles-data";
import { ALL_ARTICLES } from "./blog/articles";

// Keep in sync with metadataBase in app/layout.tsx.
const BASE = "https://energytalentz.com";

/**
 * Full sitemap: the static marketing pages plus every dynamically generated
 * careers role and blog article (sourced from the same data the pages render
 * from, so new roles/posts appear automatically).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE}/services/contract-manpower-supply`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE}/careers`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/resume-builder`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact-us`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/legal`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const roles: MetadataRoute.Sitemap = ROLES.map((r) => ({
    url: `${BASE}/careers/${slugify(r.title)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articles: MetadataRoute.Sitemap = ALL_ARTICLES.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...core, ...roles, ...articles].map((entry) => ({
    lastModified: now,
    ...entry,
  }));
}
