import type { Metadata } from "next";
import { getLegalContent } from "../legal/legal-api";
import PolicyPage from "../legal/PolicyPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies Energy Talents sets on this website, what each is for, and how to control them.",
  alternates: { canonical: "/cookie-policy" },
};

export default async function Page() {
  const legal = await getLegalContent();
  return <PolicyPage policy="cookies" legal={legal} />;
}
