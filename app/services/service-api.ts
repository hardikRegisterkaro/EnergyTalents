/**
 * Service pages — served by the CMS.
 *
 * The CMS stores a service page as a hero plus an ordered list of generic
 * sections (`intro | cards | chips | steps | checklist | faq | table | notes`),
 * defined in energy-talent-cms/app/lib/content/service-content.ts. This page
 * keeps its bespoke components and looks each section up **by id**, so the
 * design is unchanged and editors control the copy.
 *
 * Section ids are therefore a contract between the seeded content and this
 * file — see SECTION_IDS below. A renamed id makes that section disappear
 * rather than render wrongly, which is the safer failure.
 *
 * Note the CMS's editor rewrites saved content to these exact section shapes
 * (`cleanContent` in service-page-form.tsx), so storing a bespoke shape is not
 * an option: it would be stripped the first time an editor pressed Save.
 */

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const serviceTag = (slug: string) => `service-${slug}`;
export const SERVICE_LIST_TAG = "service-list";

function cacheFor(tags: string[]): RequestInit & { next?: { tags: string[] } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { cache: "force-cache", next: { tags } };
}

// ── CMS section shapes ────────────────────────────────────────────────────

type SectionBase = { id: string; label: string; heading: string };

export type CardsSection = SectionBase & {
  kind: "cards";
  intro?: string;
  cards: { title: string; points: string[] }[];
};

export type ChipsSection = SectionBase & {
  kind: "chips";
  intro?: string;
  chips: string[];
  note?: string;
};

export type StepsSection = SectionBase & {
  kind: "steps";
  intro?: string;
  steps: { title: string; text: string; day?: string; note?: string }[];
};

export type FaqSection = SectionBase & {
  kind: "faq";
  intro?: string;
  faqs: { q: string; a: string }[];
};

export type NotesSection = SectionBase & {
  kind: "notes";
  intro?: string;
  notes: { title: string; body: string }[];
};

export type IntroSection = SectionBase & {
  kind: "intro";
  paragraphs: string[];
  stats?: { value: string; label: string }[];
};

export type ChecklistSection = SectionBase & { kind: "checklist"; intro?: string; items: string[] };
export type TableSection = SectionBase & {
  kind: "table";
  intro?: string;
  columns: string[];
  rows: string[][];
};

export type Section =
  | IntroSection
  | CardsSection
  | ChipsSection
  | StepsSection
  | ChecklistSection
  | FaqSection
  | TableSection
  | NotesSection;

export type ServicePageContent = {
  breadcrumb?: { label: string; href?: string }[];
  badge?: string;
  titleLead?: string;
  titleAccent?: string;
  subtitle?: string;
  sections?: Section[];
};

export type ServicePage = {
  slug: string;
  template: string;
  metaTitle: string | null;
  metaDescription: string | null;
  content: ServicePageContent;
  updatedAt: string;
};

/**
 * Section ids this page's components read.
 *
 * ValueSwitch and RiskMitigation each draw on two sections because the CMS has
 * no single kind carrying both halves.
 */
export const SECTION_IDS = {
  disciplines: "disciplines",
  valueOld: "value-old-way",
  valueOur: "value-our-way",
  lifecycle: "lifecycle",
  riskBadges: "risk-badges",
  riskGuarantees: "risk-guarantees",
  faq: "faq",
} as const;

// ── Lookup helpers ────────────────────────────────────────────────────────

/**
 * Find a section by id, narrowed to the expected kind.
 *
 * Returns undefined when it is missing *or* stored under a different kind —
 * an editor who changes a section's type gets that block omitted rather than a
 * crash from reading fields that are not there.
 */
export function sectionById<K extends Section["kind"]>(
  content: ServicePageContent | undefined,
  id: string,
  kind: K
): Extract<Section, { kind: K }> | undefined {
  const found = content?.sections?.find((s) => s?.id === id);
  return found?.kind === kind ? (found as Extract<Section, { kind: K }>) : undefined;
}

// ── Fetching ──────────────────────────────────────────────────────────────

/**
 * One published service page, or null.
 *
 * The CMS route answers 200 with `servicePages: null` when nothing matches
 * (there is no `success` flag and no 404), so absence is detected on the body
 * rather than the status code.
 */
export async function getServicePage(slug: string): Promise<ServicePage | null> {
  try {
    const res = await fetch(
      `${CMS_URL}/api/services/client/${encodeURIComponent(slug)}`,
      cacheFor([serviceTag(slug)])
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { servicePages?: ServicePage | null };
    return json?.servicePages ?? null;
  } catch {
    return null;
  }
}

/**
 * ServicePage slugs that are NOT services: stored in the same model but
 * rendered by a dedicated route elsewhere on the site. They must never appear
 * under /services/<slug>.
 */
const OWN_ROUTE_SLUGS = new Set(["resume-builder"]);

/**
 * Published service slugs, for generateStaticParams and the sitemap.
 *
 * Filtered to the division template: the ServicePage model also backs pages
 * that live outside /services (the resume builder is stored as one), and
 * listing those here would prerender and advertise /services/<slug> URLs that
 * the route deliberately 404s.
 */
export async function getServiceSlugs(): Promise<
  Array<{ slug: string; updatedAt?: string }>
> {
  try {
    const res = await fetch(
      `${CMS_URL}/api/services/client/sitemap`,
      cacheFor([SERVICE_LIST_TAG])
    );
    if (!res.ok) return [];
    const json = (await res.json()) as {
      success?: boolean;
      services?: Array<{ slug: string; updatedAt?: string; template?: string }>;
    };
    if (!json?.success || !Array.isArray(json.services)) return [];

    // Always drop slugs the frontend renders from their own route. Belt and
    // braces: `template` only tells us apart once the CMS exposing it is
    // deployed, and until then every page looks like a division page — which
    // would prerender /services/resume-builder as a 404 and advertise it in
    // the sitemap.
    const candidates = json.services.filter((s) => !OWN_ROUTE_SLUGS.has(s.slug));

    // Filter on template only when the CMS actually returns it; an older
    // deployment omits the field entirely, and treating that as "not a
    // division page" would empty the list.
    const cmsSendsTemplate = candidates.some((s) => s.template !== undefined);
    return cmsSendsTemplate
      ? candidates.filter((s) => s.template === "division")
      : candidates;
  } catch {
    return [];
  }
}
