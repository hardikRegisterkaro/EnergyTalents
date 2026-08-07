/**
 * Config for the shared resume-builder enquiry modal. Each CTA opens the modal
 * with one of these "intents", which controls the heading, the fields shown and
 * the submit label — so a single form collects the right data for whichever
 * button was clicked. Kept in a plain (non-"use client") module so both server
 * components (Templates, TailorBanner, FormatChecker) and the client modal can
 * import it.
 */
export type ResumeIntent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  /** Optional highlighted summary line, e.g. the chosen plan · period · price. */
  summary?: string;
  // Name, email and phone are collected for every intent — the CMS requires all
  // three on a lead — so only the extra fields below are configurable.
  role?: boolean;
  resume?: boolean;
  jobDescription?: boolean;
};

export const TEMPLATES_INTENT: ResumeIntent = {
  eyebrow: "Template Library",
  title: "Find your template",
  subtitle:
    "Tell us where to send your picks and we'll get you set up in the builder.",
  submitLabel: "Get started →",
  role: true,
};

export const TAILOR_INTENT: ResumeIntent = {
  eyebrow: "Smart Tailoring",
  title: "Tailor your resume to the job",
  subtitle:
    "Share your resume and the job description — we'll match them and surface the keywords you need.",
  submitLabel: "Tailor my resume →",
  resume: true,
  jobDescription: true,
};

export const AUDIT_INTENT: ResumeIntent = {
  eyebrow: "Format Auditor",
  title: "Run a format audit",
  subtitle:
    "Upload your resume and we'll flag ATS and formatting issues with plain-language fixes.",
  submitLabel: "Run my audit →",
  resume: true,
};

/** Plan-signup intent, built from the pricing card's live plan/period/price. */
export function planIntent(
  plan: string,
  period: string,
  price: string,
): ResumeIntent {
  return {
    eyebrow: plan,
    title: `Start with ${plan}`,
    subtitle:
      "Create your account and we'll email your secure checkout link — no charge yet.",
    submitLabel: "Start my plan →",
    role: true,
    summary: `${plan} · ${period} · ${price}/mo`,
  };
}
