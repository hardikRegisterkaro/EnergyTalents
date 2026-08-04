import type { Metadata } from "next";
import Link from "next/link";
import { displayFontVars } from "./display-fonts";
import SolutionsGrid from "./SolutionsGrid";
import SectorPanels from "./SectorPanels";
import StaffingPartner from "./StaffingPartner";
import ReadinessVault from "./ReadinessVault";
import RegionCards from "./RegionCards";
import JobMarquee from "./JobMarquee";
import CtaForms from "./CtaForms";

export const metadata: Metadata = {
  title: {
    absolute:
      "Energy Talents — Aligning expertise & workforce needs in the energy industry",
  },
  description:
    "We source, mobilize and manage the technical crews behind the world's most demanding energy projects — deployed across 45+ countries with compliance, payroll and rotation logistics handled end to end.",
  alternates: { canonical: "/" },
};

const REQUEST_CREW_HREF = "/contact-us";

// amber→orange accent gradient (eyebrow rule + badge bullets)
const ACCENT_GRADIENT = { backgroundImage: "linear-gradient(350deg, #f59e0b, #f97316)" };

const BADGES = [
  "Tier-1 Operator Approved",
  "100% HSSE Rating",
  "Single Global Contract",
];

export default function Home() {
  return (
    <main>
      {/* Hero — floating inset block ------------------------------- */}
      <div className="p-2 sm:p-3">
        <section className="relative overflow-hidden rounded-[28px] bg-neutral-950 px-4 py-16 sm:px-6 md:py-24">
        {/* Background — rig-at-sunset photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homeHero.png')" }}
        />
        {/* Subtle darkening for text contrast over any photo */}
        <div aria-hidden className="absolute inset-0 bg-black/20" />

        {/* Glass card */}
        <div
          className="relative mx-auto max-w-[1141px] overflow-hidden rounded-[33px] border border-white/15 px-6 py-12 shadow-[inset_0_3px_4px_0_rgba(255,255,255,0.25),inset_0_-4px_4px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl sm:px-10 md:py-14 lg:px-24"
          style={{
            backgroundImage:
              "linear-gradient(41deg, rgba(0,0,0,0.30), rgba(120,113,108,0.30))",
          }}
        >
          {/* soft dark blob for depth + text legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-6 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/50 blur-[130px]"
          />

          <div className="relative mx-auto flex max-w-[660px] flex-col items-center text-center">
            {/* Eyebrow */}
            <div className="reveal flex items-center gap-3">
              <span className="h-0.5 w-10 shrink-0" style={ACCENT_GRADIENT} />
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                Global Workforce Mobilization
              </span>
            </div>

            {/* Heading */}
            <h1 className="reveal mt-7 text-[27px] font-extrabold uppercase leading-[1.12] text-white sm:text-5xl sm:leading-[1.08]">
              Aligning expertise
              <br />
              &amp; workforce needs
              <br />
              in the <span className="text-amber-500">energy industry.</span>
            </h1>

            {/* Description */}
            <p className="reveal mt-7 max-w-[620px] text-base leading-6 text-white/90">
              We source, mobilize and manage the technical crews behind the
              world&rsquo;s most demanding energy projects — engineering
              specialists, offshore operators and skilled trades deployed across
              45+ countries with compliance, payroll and rotation logistics
              handled end to end.
            </p>

            {/* CTAs */}
            <div className="reveal mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href={REQUEST_CREW_HREF}
                className="flex items-center gap-1.5 rounded-xl px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_10px_30px_-8px_rgba(234,88,12,0.4)] transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)",
                }}
              >
                <span className="font-bold opacity-75">[</span>
                Request Technical Crew
                <span className="font-bold opacity-75">]</span>
              </Link>
              <Link
                href="/careers#roles"
                className="flex items-center gap-2 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white outline outline-1 -outline-offset-1 outline-white transition-colors hover:bg-white/10"
              >
                <span className="font-bold opacity-50">[</span>
                Search Open Rotations
                <span className="font-bold opacity-50">]</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {BADGES.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0" style={ACCENT_GRADIENT} />
                  <span className="text-xs font-bold uppercase tracking-wide text-white">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* How we deploy — solutions grid --------------------------- */}
      <section className={`${displayFontVars} bg-gray-50 px-4 py-16 sm:px-6 md:py-24`}>
        <div className="mx-auto max-w-[1276px]">
          <SolutionsGrid />
        </div>
      </section>

      {/* Industry sectors — expanding panels ---------------------- */}
      <section className={`${displayFontVars} bg-white px-4 py-16 sm:px-6 md:py-24`}>
        <div className="mx-auto max-w-[1276px]">
          <SectorPanels />
        </div>
      </section>

      {/* Long-term staffing partner — copy + image + stats -------- */}
      <section className={`${displayFontVars} bg-white px-4 pb-20 pt-4 sm:px-6 md:pb-28`}>
        <div className="mx-auto max-w-[1240px]">
          <StaffingPartner />
        </div>
      </section>

      {/* Workforce readiness vault — compliance pillars ----------- */}
      <section className={`${displayFontVars} bg-gray-50 px-4 py-16 sm:px-6 md:py-24`}>
        <div className="mx-auto max-w-[1280px]">
          <ReadinessVault />
        </div>
      </section>

      {/* Geographic operations — region cards --------------------- */}
      <section className={`${displayFontVars} bg-white px-4 pb-20 pt-4 sm:px-6 md:pb-28`}>
        <div className="mx-auto max-w-[1240px]">
          <RegionCards />
        </div>
      </section>

      {/* Active staffing pipeline — infinite job marquee (full-bleed) */}
      <section className={`${displayFontVars} overflow-hidden bg-white pb-20 pt-4 md:pb-28`}>
        <JobMarquee />
      </section>

      {/* Dual CTA — request crew / join pipeline forms ------------ */}
      <section className={`${displayFontVars} bg-white px-4 pb-24 pt-4 sm:px-6 md:pb-32`}>
        <div className="mx-auto max-w-[1240px]">
          <CtaForms />
        </div>
      </section>
    </main>
  );
}
