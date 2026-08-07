import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "./EnquiryForm";
import ContactFaq from "./ContactFaq";
import { getContactPage, telHref } from "./contact-api";

/**
 * Contact Us — rendered from the CMS.
 *
 * Every string on this page is editor-managed; the layout and the form fields
 * are not. getContactPage() falls back to the shipped copy, so an unreachable
 * or unconfigured CMS still renders a complete page with a working form —
 * this is the site's main conversion route, so a blank render is not an
 * acceptable failure mode.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return {
    title: page.metaTitle || "Contact Us",
    description:
      page.metaDescription ||
      "Tell us what the project needs and we'll crew it. Every enquiry reaches a named coordinator in the nearest hub — crew requests answered within four working hours, urgent rotation issues in fifteen minutes.",
    alternates: { canonical: "/contact-us" },
  };
}

export default async function ContactPage() {
  const { content } = await getContactPage();
  const { hero, enquiry, emergency, faq, cta } = content;

  return (
    <main>
      {/* Hero -------------------------------------------------------- */}
      <section className="dotbg relative overflow-hidden bg-white px-4 py-16 sm:px-6 md:py-24">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-4 py-2 softshadow"
          >
            <span className="size-2 rounded-full bg-green-500" />
            <span className="font-body text-xs font-semibold text-ink">
              {hero.badge}
            </span>
            <span className="font-body text-xs text-body2/70">
              {hero.badgeSuffix}
            </span>
          </div>

          <h1
            data-aos="fade-up"
            className="mt-7 font-display text-[32px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[44px] lg:text-[52px]"
          >
            {hero.titleLead}{" "}
            <span className="o-text">{hero.titleAccent}</span>
          </h1>

          <p
            data-aos="fade-up"
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-body2 sm:text-[17px]"
          >
            {hero.subtitle}
          </p>

          <div
            data-aos="fade-up"
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#enquiry"
              className="btn-grad btn-lift inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-body text-sm font-bold text-white"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#enquiry"
              className="btn-lift inline-flex items-center rounded-xl border border-ink/20 px-6 py-3.5 font-body text-sm font-semibold text-ink hover:border-ink/40"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry ----------------------------------------------------- */}
      <section
        id="enquiry"
        className="dotbg scroll-mt-16 border-t border-linec bg-cream px-4 py-16 sm:px-6 md:py-24"
      >
        <div className="mx-auto max-w-[1200px]">
          <EnquiryForm copy={enquiry} />
        </div>
      </section>

      {/* Emergency --------------------------------------------------- */}
      <section className="grad-deep relative overflow-hidden px-4 py-16 sm:px-6 md:py-20">
        <div aria-hidden className="dotbg-dark absolute inset-0" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div data-aos="fade-up" className="max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/15 px-3.5 py-1.5 font-body text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-green-400" />
              {emergency.badge}
            </span>
            <h2 className="mt-5 font-display text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[40px]">
              {emergency.heading}
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-white/85">
              {emergency.body}
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-4">
            <a
              href={telHref(emergency.phoneNumber)}
              data-aos="fade-up"
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-6 softshadow"
            >
              <div>
                <div className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-body2/70">
                  {emergency.phoneLabel}
                </div>
                <div className="mt-1 font-display text-xl font-bold text-brand">
                  {emergency.phoneNumber}
                </div>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl text-white grad">
                <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
                  <path
                    d="M6.5 3h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5a2 2 0 012-2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a
              href={`mailto:${emergency.emailAddress}`}
              data-aos="fade-up"
              data-aos-delay="100"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/30 p-6 transition-colors hover:bg-white/10"
            >
              <div>
                <div className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                  {emergency.emailLabel}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-white">
                  {emergency.emailAddress}
                </div>
              </div>
              <span className="text-xl text-white transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ --------------------------------------------------------- */}
      <section className="dotbg bg-cream px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[minmax(0,384px)_1fr] lg:gap-16">
          <div data-aos="fade-up">
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">
              {faq.kicker}
            </p>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[40px]">
              {faq.heading}
            </h2>
            <p className="mt-4 max-w-sm font-body text-base leading-relaxed text-body2">
              {faq.intro}
            </p>
          </div>
          <ContactFaq faqs={faq.items} />
        </div>
      </section>

      {/* CTA --------------------------------------------------------- */}
      <section className="bg-cream px-4 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="grad-deep relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12">
            <div aria-hidden className="dotbg-dark absolute inset-0" />
            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div data-aos="fade-up">
                <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
                  {cta.heading}
                </h2>
                <p className="mt-3 max-w-md font-body text-base leading-relaxed text-white/85">
                  {cta.body}
                </p>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#enquiry"
                  className="btn-lift inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-body text-sm font-bold text-ink hover:bg-cream-2"
                >
                  {cta.primaryLabel}
                </a>
                <Link
                  href="/about"
                  className="btn-lift inline-flex items-center rounded-xl border border-white/40 px-6 py-3.5 font-body text-sm font-semibold text-white hover:bg-white/10"
                >
                  {cta.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
