import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "./Hero";
import Builder from "./Builder";
import Templates from "./Templates";
import AtsMatrix from "./AtsMatrix";
import FormatChecker from "./FormatChecker";
import TailorBanner from "./TailorBanner";
import BeforeAfter from "./BeforeAfter";
import Reviews from "./Reviews";
import FaqSection from "./FaqSection";
import { getServicePage, sectionById } from "../services/service-api";
import type { PricingFeature } from "./PricingCard";

/**
 * Resume Builder, rendered from the CMS.
 *
 * It is stored as a ServicePage with template "resume-builder" rather than
 * getting its own model: the ServicePage document is already a hero plus
 * ordered generic sections with a working editor, and the CMS's own "packages"
 * model is a travel-itinerary shape (region, season, itinerary days) inherited
 * from the fork, which cannot express plans and billing periods.
 *
 * /services/[slug] refuses anything that is not template "division", so this
 * page is not reachable at a second URL.
 *
 * Editor-managed: the hero copy, the pricing table and both feature lists, and
 * the FAQ. Everything else on this page — the builder mock-up, template
 * gallery, ATS matrix, format checker, tailor banner, before/after and the
 * reviews — is design rather than copy, and stays in code.
 */

const SLUG = "resume-builder";
const TEMPLATE = "resume-builder";

const SECTIONS = {
  /** table: row 0 is the header; each row is [period, price, note] per plan. */
  pricing: "pricing",
  resumeFeatures: "pricing-resume-features",
  comboFeatures: "pricing-combo-features",
  faq: "faq",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage(SLUG);
  return {
    title: page?.metaTitle || "Resume Builder",
    description:
      page?.metaDescription ||
      "Build a strikingly powerful, ATS-optimized resume approved by recruiters — with AI content suggestions, real-time scoring and 100+ recruiter-tested templates.",
    alternates: { canonical: "/resume-builder" },
  };
}

/** notes → {lead, rest}: the bold opening and the grey remainder of a feature. */
function toFeatures(
  notes: { title: string; body: string }[] | undefined
): PricingFeature[] {
  return (notes ?? []).map((n) => ({ lead: n.title, rest: n.body }));
}

export default async function ResumeBuilderPage() {
  const page = await getServicePage(SLUG);
  if (!page || page.template !== TEMPLATE) notFound();

  const content = page.content ?? {};
  const pricingTable = sectionById(content, SECTIONS.pricing, "table");
  const resumeFeatures = sectionById(content, SECTIONS.resumeFeatures, "notes");
  const comboFeatures = sectionById(content, SECTIONS.comboFeatures, "notes");
  const faq = sectionById(content, SECTIONS.faq, "faq");

  // Each row is [period, resume price, resume note, combo price, combo note].
  // Rows are read positionally, so a short row yields empty strings rather
  // than undefined reaching the component.
  const rows = pricingTable?.rows ?? [];
  const cell = (row: string[], i: number) => row[i] ?? "";

  const pricing = {
    periods: rows.map((r) => cell(r, 0)),
    resume: {
      price: rows.map((r) => cell(r, 1)),
      note: rows.map((r) => cell(r, 2)),
      features: toFeatures(resumeFeatures?.notes),
    },
    combo: {
      price: rows.map((r) => cell(r, 3)),
      note: rows.map((r) => cell(r, 4)),
      features: toFeatures(comboFeatures?.notes),
    },
  };

  return (
    <main>
      <Hero
        pill={content.badge}
        headingLead={content.titleLead}
        headingAccent={content.titleAccent}
        subhead={content.subtitle}
        pricing={pricing}
      />
      <Builder />
      <Templates />
      <AtsMatrix />
      <FormatChecker />
      <TailorBanner />
      <BeforeAfter />
      <Reviews />
      {faq && <FaqSection faqs={faq.faqs} />}
    </main>
  );
}
