/**
 * Industry sector content — served by the CMS.
 *
 * Each sector is stored as a ServicePage with template "industry", reusing the
 * generic section editor rather than adding a model for four records. The
 * shipped copy in industries.ts stays as the fallback, so an unreachable or
 * unedited CMS still renders a complete page.
 *
 * What deliberately stays in code: the slug, the photograph, its focal point,
 * the index, and the careers category. Those tie each sector to an image in
 * /public and to a fixed position in the home page's sector row — adding a
 * fifth is a design change, not a content edit.
 */

import {
  INDUSTRIES,
  industryBySlug,
  type Industry,
} from "./industries";
import { sectionById, type ServicePage } from "../services/service-api";

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const INDUSTRY_TEMPLATE = "industry";
export const industryTag = (slug: string) => `service-${slug}`;

function cacheFor(tags: string[]): RequestInit & { next?: { tags: string[] } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { cache: "force-cache", next: { tags } };
}

/** Section ids the industry template reads. Renaming one drops that block. */
export const INDUSTRY_SECTIONS = {
  overview: "overview",
  supplies: "supplies",
} as const;

/** A sector's fixed design values merged with its editable copy. */
export type IndustryContent = Industry & {
  metaTitle: string | null;
  metaDescription: string | null;
};

/** The shipped copy, used when the CMS has nothing (or is unreachable). */
function fallback(industry: Industry): IndustryContent {
  return { ...industry, metaTitle: null, metaDescription: null };
}

/**
 * One sector, or null when the slug is not one of ours.
 *
 * Each editable field falls back independently: an editor who clears the
 * write-up but leaves the disciplines gets the shipped write-up back rather
 * than an empty section.
 */
export async function getIndustry(slug: string): Promise<IndustryContent | null> {
  const base = industryBySlug(slug);
  if (!base) return null;

  try {
    const res = await fetch(
      `${CMS_URL}/api/services/client/${encodeURIComponent(slug)}`,
      cacheFor([industryTag(slug)])
    );
    if (!res.ok) return fallback(base);

    const json = (await res.json()) as { servicePages?: ServicePage | null };
    const page = json?.servicePages;
    // Guard the template too: the slug is ours, but a page saved under another
    // template is not an industry document and should not drive this page.
    if (!page || page.template !== INDUSTRY_TEMPLATE) return fallback(base);

    const content = page.content ?? {};
    const overview = sectionById(content, INDUSTRY_SECTIONS.overview, "intro");
    const supplies = sectionById(content, INDUSTRY_SECTIONS.supplies, "notes");

    const paragraphs = (overview?.paragraphs ?? []).filter((p) => p.trim());
    const items = (supplies?.notes ?? []).filter((n) => n.title.trim());

    return {
      ...base,
      title: content.titleLead?.trim() || base.title,
      body: content.subtitle?.trim() || base.body,
      overviewHeading: overview?.heading?.trim() || base.overviewHeading,
      overview: paragraphs.length > 0 ? paragraphs : base.overview,
      supplies: items.length > 0 ? items : base.supplies,
      metaTitle: page.metaTitle ?? null,
      metaDescription: page.metaDescription ?? null,
    };
  } catch {
    return fallback(base);
  }
}

/**
 * All four sectors, for the home page cards.
 *
 * Fetched in parallel; any that fails falls back on its own, so one bad
 * response cannot blank the row.
 */
export async function getIndustries(): Promise<IndustryContent[]> {
  const all = await Promise.all(
    INDUSTRIES.map(async (i) => (await getIndustry(i.slug)) ?? fallback(i))
  );
  return all;
}
