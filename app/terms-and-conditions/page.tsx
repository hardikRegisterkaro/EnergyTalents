import type { Metadata } from "next";
import { getLegalContent } from "../legal/legal-api";
import PolicyPage from "../legal/PolicyPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms on which Energy Talents provides this website and its crewing and manpower services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function Page() {
  const legal = await getLegalContent();
  return <PolicyPage policy="terms" legal={legal} />;
}
