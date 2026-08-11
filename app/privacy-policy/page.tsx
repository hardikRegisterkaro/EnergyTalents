import type { Metadata } from "next";
import { getLegalContent } from "../legal/legal-api";
import PolicyPage from "../legal/PolicyPage";

/**
 * Privacy Policy — its own page.
 *
 * Metadata is per-page rather than taken from the CMS record: that record
 * carries one metaTitle/metaDescription that described the combined /legal
 * page, so it fits none of the three individually.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Energy Talents collects, uses, shares and retains your personal data, and the rights you have over it.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function Page() {
  const legal = await getLegalContent();
  return <PolicyPage policy="privacy" legal={legal} />;
}
