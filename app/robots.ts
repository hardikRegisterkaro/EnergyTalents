import type { MetadataRoute } from "next";

// Keep in sync with metadataBase in app/layout.tsx.
const BASE = "https://energytalentz.com";

/** Allow all crawlers and point them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
