/**
 * Legal page content — served by the CMS.
 *
 * TermsPolicy is a single record holding three separate HTML bodies authored
 * in the CMS TipTap editor: privacy, terms and cookies. They are distinct
 * fields rather than one document because each is a legally separate policy,
 * updated on its own cycle, and the page links to each by its own anchor.
 */

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const TERMS_POLICY_TAG = "terms-policy";

/** Dev reads live: the CMS revalidation ping goes to PRODUCTION_URL, not here. */
function cacheFor(tags: string[]): RequestInit & { next?: { tags: string[] } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { cache: "force-cache", next: { tags } };
}

/** Each body arrives as `{ body: "<html>" }`. */
type HtmlBody = { body?: string } | null | undefined;

export type LegalContent = {
  metaTitle: string | null;
  metaDescription: string | null;
  title: string | null;
  subTitle: string | null;
  privacyHtml: string;
  termsHtml: string;
  cookiesHtml: string;
  updatedAt: string | null;
};

const html = (value: HtmlBody): string => (value?.body ?? "").trim();

/**
 * The legal record, or null when the CMS has none.
 *
 * Never throws — an unreachable CMS yields null and the page renders its
 * "not published yet" state rather than a 500.
 */
export async function getLegalContent(): Promise<LegalContent | null> {
  try {
    const res = await fetch(`${CMS_URL}/api/terms-policy`, cacheFor([TERMS_POLICY_TAG]));
    if (!res.ok) return null;

    const json = (await res.json()) as {
      success?: boolean;
      data?: {
        metaTitle?: string | null;
        metaDescription?: string | null;
        title?: string | null;
        subTitle?: string | null;
        content?: HtmlBody;
        privacyPolicyContent?: HtmlBody;
        cookiePolicyContent?: HtmlBody;
        updatedAt?: string | null;
      } | null;
    };
    if (!json?.success || !json.data) return null;

    const d = json.data;
    return {
      metaTitle: d.metaTitle ?? null,
      metaDescription: d.metaDescription ?? null,
      title: d.title ?? null,
      subTitle: d.subTitle ?? null,
      privacyHtml: html(d.privacyPolicyContent),
      // `content` is the terms body — the field predates the other two and
      // kept its generic name.
      termsHtml: html(d.content),
      cookiesHtml: html(d.cookiePolicyContent),
      updatedAt: d.updatedAt ?? null,
    };
  } catch {
    return null;
  }
}

/** "August 4, 2026" — the date shown under the hero. */
export function formatUpdated(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
