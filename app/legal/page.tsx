import type { Metadata } from "next";
import Link from "next/link";
import { formatUpdated, getLegalContent } from "./legal-api";

/**
 * Privacy, Terms & Cookies — rendered from the CMS.
 *
 * The three policies were 240 lines of hardcoded JSX, so a wording change
 * needed a developer and a deploy — for the content most likely to be revised
 * by someone who is not one. Each is now an HTML body authored in the CMS.
 *
 * A section with no content is omitted, including from the contents list, so a
 * policy that has not been written yet leaves no empty heading behind.
 */

export async function generateMetadata(): Promise<Metadata> {
  const legal = await getLegalContent();
  return {
    title: legal?.metaTitle || "Legal — Privacy, Terms & Cookies",
    description:
      legal?.metaDescription ||
      "How Energy Talents handles your personal data, the terms of using this site and our services, and the cookies we use.",
    alternates: { canonical: "/legal" },
  };
}

const CONTACT_EMAIL = "immanuel@energytalentz.com";

/** Anchors are part of the site's URLs — the footer links to /legal#privacy. */
const SECTION_META = [
  { id: "privacy", eyebrow: "01 — Data Protection", title: "Privacy Policy" },
  { id: "terms", eyebrow: "02 — Site & Services", title: "Terms & Conditions" },
  { id: "cookies", eyebrow: "03 — Tracking", title: "Cookie Policy" },
] as const;

export default async function LegalPage() {
  const legal = await getLegalContent();

  const sections = [
    { ...SECTION_META[0], html: legal?.privacyHtml ?? "" },
    { ...SECTION_META[1], html: legal?.termsHtml ?? "" },
    { ...SECTION_META[2], html: legal?.cookiesHtml ?? "" },
  ].filter((s) => s.html.length > 0);

  const updated = formatUpdated(legal?.updatedAt ?? null);

  return (
    <main>
      {/* Hero -------------------------------------------------------- */}
      <section className="dotbg relative overflow-hidden border-b border-linec bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="relative mx-auto max-w-[1100px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-4 py-2 softshadow">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-body text-xs font-semibold text-ink">
              Legal &amp; Compliance
            </span>
          </div>
          <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[44px] lg:text-[52px]">
            {legal?.title ? (
              legal.title
            ) : (
              <>
                Privacy, Terms &amp; <span className="o-text">Cookies</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-body2 sm:text-[17px]">
            {legal?.subTitle ||
              "This page sets out how Energy Talents handles your personal data, the terms on which we provide this website and our crewing services, and the cookies we use. Please read it carefully — using this site means you accept what follows."}
          </p>
          {updated && (
            <p className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-body2/70">
              Last updated: {updated}
            </p>
          )}
        </div>
      </section>

      {/* Body -------------------------------------------------------- */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky table of contents — only what actually renders below */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {sections.length > 0 && (
              <>
                <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-body2/60">
                  On this page
                </p>
                <nav className="mt-4 flex flex-col gap-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="rounded-lg px-3 py-2 font-body text-sm font-medium text-body2 transition-colors hover:bg-brand/[0.06] hover:text-brand"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </>
            )}
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {sections.length === 0 ? (
              <p className="font-body text-[15px] leading-relaxed text-body2">
                Our legal policies are being updated. Please contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-brand hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                in the meantime.
              </p>
            ) : (
              sections.map((s, i) => (
                <div
                  key={s.id}
                  className={i > 0 ? "mt-16 border-t border-linec pt-16" : undefined}
                >
                  <div id={s.id} className="scroll-mt-24">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-tight text-ink sm:text-[34px]">
                      {s.title}
                    </h2>
                  </div>
                  {/* Authored in the CMS by signed-in staff and stored as HTML.
                      `jd-body` carries the shared element styling; `legal-body`
                      adds the reading scale used here. */}
                  <div
                    className="jd-body legal-body mt-6"
                    dangerouslySetInnerHTML={{ __html: s.html }}
                  />
                </div>
              ))
            )}

            {/* Contact ------------------------------------------------ */}
            <div className="mt-16 rounded-2xl border border-linec bg-white p-7 softshadow">
              <h3 className="font-display text-lg font-bold text-ink">
                Questions about this policy?
              </h3>
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
        </div>
      </section>
    </main>
  );
}
