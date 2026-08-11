import type { Metadata } from "next";
import Link from "next/link";
import { getLegalContent } from "./legal-api";
import { POLICIES, POLICY_ORDER, policyHtml } from "./PolicyPage";

/**
 * Legal index.
 *
 * This used to render all three policies as anchored sections. They are now a
 * page each, but this route is kept as a hub rather than deleted: the footer,
 * the sitemap and any bookmark or inbound link still point here, and
 * /legal#privacy cannot be redirected server-side — the fragment never reaches
 * the server. A visitor landing on an old link gets a working page with the
 * three policies one click away.
 */

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Energy Talents' Privacy Policy, Terms & Conditions and Cookie Policy.",
  alternates: { canonical: "/legal" },
};

/** A plain-text preview of the policy body, shown under each link. */
function excerpt(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
}

export default async function LegalIndexPage() {
  const legal = await getLegalContent();

  return (
    <main>
      <section className="dotbg relative overflow-hidden border-b border-linec bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="relative mx-auto max-w-[900px]">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-4 py-2 softshadow">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-body text-xs font-semibold text-ink">
              Legal &amp; Compliance
            </span>
          </div>
          <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[44px]">
            Privacy, Terms &amp; <span className="o-text">Cookies</span>
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-body2 sm:text-[17px]">
            {legal?.subTitle ||
              "How Energy Talents handles your personal data, the terms on which we provide this website and our crewing services, and the cookies we use."}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-[900px] gap-5">
          {POLICY_ORDER.map((key) => {
            const meta = POLICIES[key];
            const preview = excerpt(policyHtml(legal, key));
            return (
              <Link
                key={key}
                href={meta.href}
                className="group rounded-2xl border border-linec bg-white p-7 transition-colors softshadow hover:border-brand/40"
              >
                <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  {meta.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink transition-colors group-hover:text-brand">
                  {meta.title}
                </h2>
                {preview && (
                  <p className="mt-2 font-body text-[15px] leading-relaxed text-body2">
                    {preview}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-ink">
                  Read
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
