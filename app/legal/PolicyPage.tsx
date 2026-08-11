import Link from "next/link";
import { formatUpdated, type LegalContent } from "./legal-api";

/**
 * Shared layout for a single legal policy.
 *
 * Privacy, Terms and Cookies were one /legal page with three anchored
 * sections; they are now a page each. The three read identically apart from
 * their heading and body, so the chrome lives here rather than being copied
 * into three routes that would then drift.
 *
 * Each page still links to its two siblings — someone reading the privacy
 * policy often wants the cookie one next, and splitting the pages removed the
 * sidebar that used to make them reachable.
 */

const CONTACT_EMAIL = "immanuel@energytalentz.com";

export type PolicyKey = "privacy" | "terms" | "cookies";

export const POLICIES: Record<
  PolicyKey,
  { href: string; label: string; eyebrow: string; title: string }
> = {
  privacy: {
    href: "/privacy-policy",
    label: "Privacy Policy",
    eyebrow: "Data Protection",
    title: "Privacy Policy",
  },
  terms: {
    href: "/terms-and-conditions",
    label: "Terms & Conditions",
    eyebrow: "Site & Services",
    title: "Terms & Conditions",
  },
  cookies: {
    href: "/cookie-policy",
    label: "Cookie Policy",
    eyebrow: "Tracking",
    title: "Cookie Policy",
  },
};

export const POLICY_ORDER: PolicyKey[] = ["privacy", "terms", "cookies"];

/** Pick the body for a policy out of the single CMS record. */
export function policyHtml(legal: LegalContent | null, key: PolicyKey): string {
  if (!legal) return "";
  if (key === "privacy") return legal.privacyHtml;
  if (key === "terms") return legal.termsHtml;
  return legal.cookiesHtml;
}

export default function PolicyPage({
  policy,
  legal,
}: {
  policy: PolicyKey;
  legal: LegalContent | null;
}) {
  const meta = POLICIES[policy];
  const html = policyHtml(legal, policy);
  const updated = formatUpdated(legal?.updatedAt ?? null);
  const others = POLICY_ORDER.filter((k) => k !== policy);

  return (
    <main>
      {/* Hero -------------------------------------------------------- */}
      <section className="dotbg relative overflow-hidden border-b border-linec bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="relative mx-auto max-w-[900px]">
          <nav
            aria-label="Breadcrumb"
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-body2/70"
          >
            <Link href="/" className="transition-colors hover:text-brand">
              Home
            </Link>
            <span className="mx-2 text-body2/40">/</span>
            <span className="text-ink">{meta.label}</span>
          </nav>

          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-4 py-2 softshadow">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-body text-xs font-semibold text-ink">
              {meta.eyebrow}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[44px]">
            {meta.title}
          </h1>

          {updated && (
            <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-body2/70">
              Last updated: {updated}
            </p>
          )}
        </div>
      </section>

      {/* Body -------------------------------------------------------- */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-[900px]">
          {html ? (
            /* Authored in the CMS by signed-in staff and stored as HTML.
               `jd-body` carries the shared element styling; `legal-body` adds
               the reading scale this page uses. */
            <div
              className="jd-body legal-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="font-body text-[15px] leading-relaxed text-body2">
              This policy is being updated. Please contact us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-brand hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              in the meantime.
            </p>
          )}

          {/* The other two policies, since there is no longer a shared page. */}
          <div className="mt-14 border-t border-linec pt-8">
            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-body2/60">
              Also read
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((k) => (
                <Link
                  key={k}
                  href={POLICIES[k].href}
                  className="btn-lift inline-flex items-center rounded-xl border border-ink/20 px-5 py-3 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
                >
                  {POLICIES[k].label} →
                </Link>
              ))}
            </div>
          </div>

          {/* Contact ------------------------------------------------- */}
          <div className="mt-8 rounded-2xl border border-linec bg-white p-7 softshadow">
            <h2 className="font-display text-lg font-bold text-ink">
              Questions about this policy?
            </h2>
            <p className="mt-2 font-body text-[15px] leading-relaxed text-body2">
              Contact our team and we&rsquo;ll point you to the right desk.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="btn-grad btn-lift inline-flex items-center gap-2 rounded-xl px-5 py-3 font-body text-sm font-bold text-white"
              >
                Contact Us →
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-lift inline-flex items-center rounded-xl border border-ink/20 px-5 py-3 font-body text-sm font-semibold text-ink hover:border-ink/40"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
