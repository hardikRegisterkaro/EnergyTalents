import type { Metadata } from "next";
import Hero from "./Hero";
import Builder from "./Builder";
import Templates from "./Templates";
import AtsMatrix from "./AtsMatrix";
import FormatChecker from "./FormatChecker";
import TailorBanner from "./TailorBanner";
import BeforeAfter from "./BeforeAfter";
import Reviews from "./Reviews";
import FaqSection from "./FaqSection";

export const metadata: Metadata = {
  title: "Resume Builder",
  description:
    "Build a strikingly powerful, ATS-optimized resume approved by recruiters — with AI content suggestions, real-time scoring and 100+ recruiter-tested templates.",
  alternates: { canonical: "/resume-builder" },
};

export default function ResumeBuilderPage() {
  return (
    <main>
      <Hero />
      <Builder />
      <Templates />
      <AtsMatrix />
      <FormatChecker />
      <TailorBanner />
      <BeforeAfter />
      <Reviews />
      <FaqSection />
    </main>
  );
}
