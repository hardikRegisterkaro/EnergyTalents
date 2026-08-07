import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DisciplinesSection from "../DisciplinesSection";
import ValueSwitch from "../ValueSwitch";
import LifecycleSteps from "../LifecycleSteps";
import ClientOutcomes from "../ClientOutcomes";
import RiskMitigation from "../RiskMitigation";
import FaqSection from "../FaqSection";
import CtaBanner from "../CtaBanner";
import EngageDesk from "../EngageDesk";
import { RequestModalButton } from "../RequestModal";
import {
  SECTION_IDS,
  getServicePage,
  getServiceSlugs,
  sectionById,
} from "../service-api";

type Params = { params: Promise<{ slug: string }> };

/**
 * Service pages, rendered from the CMS.
 *
 * This replaced a hardcoded page at /services/contract-manpower-supply. The
 * design is unchanged — each bespoke component is fed from the CMS section
 * carrying its id (see SECTION_IDS in service-api.ts). A section that is
 * missing, empty, or saved under a different kind simply does not render, so a
 * half-finished edit drops one block instead of breaking the page.
 *
 * There is deliberately no hardcoded fallback: the CMS is the only source, and
 * a slug it does not publish is a 404.
 */
/**
 * The layout this route renders. Other templates reuse the ServicePage model
 * for pages that live elsewhere — /resume-builder is stored as one — so a
 * page whose template is not "division" must not be reachable here, or it
 * would render under the wrong design at a second URL.
 */
const DIVISION_TEMPLATE = "division";

export async function generateStaticParams() {
  const services = await getServiceSlugs();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (!page || page.template !== DIVISION_TEMPLATE) return {};

  const title = page.metaTitle || page.content?.titleLead || slug;
  const description = page.metaDescription || page.content?.subtitle || undefined;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
  };
}

/** Trust chips under the hero CTAs. */
const HERO_BADGES_ID = "hero-badges";
/** The four figures in the band under the disciplines grid. */
const DISCIPLINE_STATS_ID = "disciplines-stats";

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (!page || page.template !== DIVISION_TEMPLATE) notFound();

  const content = page.content ?? {};

  // ── Map CMS sections onto the components ────────────────────────────────
  const disciplines = sectionById(content, SECTION_IDS.disciplines, "cards");
  const disciplineStats = sectionById(content, DISCIPLINE_STATS_ID, "intro");
  const valueOld = sectionById(content, SECTION_IDS.valueOld, "notes");
  const valueOur = sectionById(content, SECTION_IDS.valueOur, "notes");
  const lifecycle = sectionById(content, SECTION_IDS.lifecycle, "steps");
  const riskBadges = sectionById(content, SECTION_IDS.riskBadges, "chips");
  const riskGuarantees = sectionById(content, SECTION_IDS.riskGuarantees, "notes");
  const faq = sectionById(content, SECTION_IDS.faq, "faq");
  const heroBadges = sectionById(content, HERO_BADGES_ID, "chips");

  const breadcrumb = content.breadcrumb ?? [];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-[1276px] px-6 py-3 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="font-jbmono text-xs uppercase tracking-wider text-gray-400"
          >
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Home
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                <span className="mx-2 text-gray-300">/</span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-neutral-900"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      i === breadcrumb.length - 1
                        ? "text-neutral-900"
                        : "text-gray-500"
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero ------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-neutral-950 px-4 py-14 sm:px-6 md:py-24">
        {/* Warm glow, left edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-12%] top-[-10%] h-[760px] w-[760px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 60% 50%, rgba(249,115,22,0.35), rgba(249,115,22,0) 62%)",
          }}
        />

        <div
          className="relative mx-auto flex max-w-[1276px] flex-col items-stretch justify-between gap-10 rounded-[33px] px-5 py-10 shadow-[inset_0px_3px_4px_0px_rgba(255,255,255,0.25),inset_0px_-4px_4px_0px_rgba(255,255,255,0.15)] sm:px-8 md:px-12 md:py-14 lg:flex-row lg:items-center"
          style={{
            backgroundImage:
              "linear-gradient(41deg, rgba(0,0,0,0.30), rgba(120,113,108,0.30))",
          }}
        >
          {/* Left column */}
          <div className="w-full lg:max-w-[760px]">
            {content.badge && (
              <div className="flex items-center gap-3.5">
                <span className="h-[1.5px] w-6 shrink-0 bg-orange-500" />
                <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                  {content.badge}
                </span>
              </div>
            )}

            <h1 className="py-5 font-archivo text-[28px] font-black uppercase leading-[1.06] text-white sm:text-4xl lg:text-5xl">
              {content.titleLead}{" "}
              <span className="text-orange-500">{content.titleAccent}</span>
            </h1>

            {content.subtitle && (
              <p className="max-w-[640px] pb-8 font-plex text-base leading-6 text-stone-300">
                {content.subtitle}
              </p>
            )}

            {/* CTAs — fixed for this template, not editor-managed */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/careers"
                className="flex items-center justify-center rounded-lg px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)",
                }}
              >
                [ Request Talent Profiles → ]
              </Link>
              <RequestModalButton className="flex items-center justify-center px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white outline outline-1 -outline-offset-1 outline-white/40 transition-colors hover:bg-white/10">
                [ Discuss Project Requirements ]
              </RequestModalButton>
            </div>

            {/* Trust badges */}
            {heroBadges && heroBadges.chips.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {heroBadges.chips.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <span aria-hidden className="size-1.5 shrink-0 bg-orange-500" />
                    <span className="font-jbmono text-xs font-medium uppercase tracking-wider text-gray-300">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column — decorative live desk panel, not editor-managed */}
          <div className="w-full shrink-0 bg-gray-900/80 p-6 outline outline-1 -outline-offset-1 outline-white/10 lg:w-[360px]">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <span className="size-1.5 rounded-full bg-green-400" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-widest text-gray-500">
                Mobilization Desk · Live
              </span>
            </div>
            {DESK_STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  i !== DESK_STATS.length - 1
                    ? "border-b border-white/5 py-5"
                    : "py-5"
                }
              >
                <div className="font-jbmono text-[11px] uppercase tracking-wider text-gray-500">
                  {s.label}
                </div>
                <div className="mt-1.5 flex items-baseline font-archivo text-3xl font-extrabold text-white">
                  <span>{s.display}</span>
                </div>
                {s.chart && (
                  <div className="mt-3 flex h-6 items-end gap-1">
                    {s.chart.map((h, j) => (
                      <span
                        key={j}
                        className="w-1.5 rounded-sm bg-orange-500/80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-jbmono text-[11px] uppercase tracking-wider">
              <span className="text-gray-500">Demand index · High</span>
              <span className="text-orange-500">Updated just now</span>
            </div>
          </div>
        </div>
      </section>

      {disciplines && (
        <DisciplinesSection
          eyebrow={disciplines.label}
          heading={disciplines.heading}
          intro={disciplines.intro}
          disciplines={disciplines.cards.map((c) => ({
            title: c.title,
            // The CMS card holds bullet points; this template renders one
            // sentence, so they are joined rather than dropped.
            body: c.points.join(" "),
          }))}
          stats={(disciplineStats?.stats ?? []).map((s) => ({
            value: s.value,
            label: s.label,
          }))}
        />
      )}

      {valueOld && valueOur && (
        <ValueSwitch
          eyebrow={valueOld.label}
          heading={valueOld.heading}
          intro={valueOld.intro}
          oldWay={{
            heading: valueOld.notes[0]?.title ?? "The old way",
            rows: valueOld.notes.slice(1),
          }}
          ourWay={{
            heading: valueOur.notes[0]?.title ?? "Our way",
            rows: valueOur.notes.slice(1),
          }}
        />
      )}

      {lifecycle && (
        <LifecycleSteps
          eyebrow={lifecycle.label}
          heading={lifecycle.heading}
          intro={lifecycle.intro}
          steps={lifecycle.steps.map((s) => ({
            // `day` is the CMS's free-text extra on a step; this template uses
            // it for the small orange caption above the title.
            label: s.day,
            title: s.title,
            body: s.text,
          }))}
        />
      )}

      {/* Testimonials stay in code: the CMS has no section kind that carries a
          quote plus metric, name and role. */}
      <ClientOutcomes />

      {riskGuarantees && (
        <RiskMitigation
          eyebrow={riskGuarantees.label}
          heading={riskGuarantees.heading}
          intro={riskGuarantees.intro}
          badges={riskBadges?.chips ?? []}
          guarantees={riskGuarantees.notes}
        />
      )}

      {faq && (
        <FaqSection
          eyebrow={faq.label}
          heading={faq.heading}
          intro={faq.intro}
          faqs={faq.faqs}
        />
      )}

      <CtaBanner />
      <EngageDesk />
    </main>
  );
}

/** Decorative figures in the hero's "live desk" panel. */
const DESK_STATS = [
  { label: "Deployment reach", display: "Global", chart: undefined as number[] | undefined },
  { label: "Compliance", display: "End-to-end", chart: undefined as number[] | undefined },
  {
    label: "Vetted shortlist",
    display: "Fast",
    chart: [45, 62, 40, 78, 55, 88, 70] as number[] | undefined,
  },
];
