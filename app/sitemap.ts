import type { MetadataRoute } from "next";
import { getRoles } from "./careers/roles-api";
import { getPostSlugs } from "./blog/posts-api";
import { getServiceSlugs } from "./services/service-api";

// Keep in sync with metadataBase in app/layout.tsx.
const BASE = "https://energytalentz.com";

/**
 * Full sitemap: the static marketing pages plus every careers role and blog
 * post, both read from the CMS.
 *
 * These used to come from the shipped `roles-data.ts` / `articles.ts` arrays,
 * which stopped being what the pages render once careers and the blog became
 * CMS-driven — so the sitemap advertised roles that no longer existed and
 * omitted every role added since. Reading the same source the pages read
 * keeps it honest.
 *
 * Both fetches degrade to an empty list rather than throwing, so an
 * unreachable CMS yields a sitemap of the core pages instead of a build
 * failure.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/careers`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/resume-builder`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact-us`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/legal`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // A large limit rather than paging: the CMS caps it, and one request keeps
  // sitemap generation cheap at build time.
  const [rolesResponse, postSlugs, serviceSlugs] = await Promise.all([
    getRoles({ limit: 200 }),
    getPostSlugs(),
    getServiceSlugs(),
  ]);

  const roles: MetadataRoute.Sitemap = rolesResponse.roles.map((r) => ({
    url: `${BASE}/careers/${r.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const services: MetadataRoute.Sitemap = serviceSlugs.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articles: MetadataRoute.Sitemap = postSlugs.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    // The CMS returns the post's own timestamps; fall back to the build time.
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...core, ...services, ...roles, ...articles].map((entry) => ({
    lastModified: now,
    ...entry,
  }));
}
