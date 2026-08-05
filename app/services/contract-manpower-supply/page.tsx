import type { Metadata } from "next";
import Link from "next/link";
import DisciplinesSection from "../DisciplinesSection";
import ValueSwitch from "../ValueSwitch";
import LifecycleSteps from "../LifecycleSteps";
import ClientOutcomes from "../ClientOutcomes";
import RiskMitigation from "../RiskMitigation";
import FaqSection from "../FaqSection";
import CtaBanner from "../CtaBanner";
import EngageDesk from "../EngageDesk";
import { RequestModalButton } from "../RequestModal";

export const metadata: Metadata = {
  title: "Contract Manpower Supply",
  description:
    "Engineered workforce solutions for the energy sector — highly technical, compliant and vetted engineering talent deployed across upstream, downstream and renewable projects, with rotation, payroll and mobilization handled end to end.",
  alternates: { canonical: "/services/contract-manpower-supply" },
};

const BADGES = [
  "Vetted technical crews",
  "Compliance-first",
  "Single global contract",
];

const DESK_STATS = [
  { label: "Deployment reach", display: "Global" },
  { label: "Compliance", display: "End-to-end" },
  {
    label: "Vetted shortlist",
    display: "Fast",
    chart: [45, 62, 40, 78, 55, 88, 70],
  },
];

export default function ContractManpowerSupplyPage() {
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
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-500">Managed Solutions</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-neutral-900">Contract Manpower Supply</span>
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
            <div className="flex items-center gap-3.5">
              <span className="h-[1.5px] w-6 shrink-0 bg-orange-500" />
              <span className="font-jbmono text-xs font-medium tracking-[0.24em] text-orange-500">
                CONTRACT MANPOWER SUPPLY
              </span>
            </div>

            <h1 className="py-5 font-archivo text-[28px] font-black uppercase leading-[1.06] text-white sm:text-4xl lg:text-5xl">
              Engineered <span className="text-orange-500">workforce</span>{" "}
              solutions for the energy sector
            </h1>

            <p className="max-w-[640px] pb-8 font-plex text-base leading-6 text-stone-300">
              We deploy highly technical, compliant and vetted engineering talent
              across upstream, downstream and renewable projects — with rotation,
              payroll and mobilization handled end to end.
            </p>

            {/* CTAs */}
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
              <RequestModalButton
                className="flex items-center justify-center px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white outline outline-1 -outline-offset-1 outline-white/40 transition-colors hover:bg-white/10"
              >
                [ Discuss Project Requirements ]
              </RequestModalButton>
            </div>

            {/* Trust badges */}
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
              {BADGES.map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 bg-orange-500"
                  />
                  <span className="font-jbmono text-xs font-medium uppercase tracking-wider text-gray-300">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — live mobilization desk */}
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
                  i !== DESK_STATS.length - 1 ? "border-b border-white/5 py-5" : "py-5"
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

      {/* Disciplines & workforce types + stat band --------------- */}
      <DisciplinesSection />

      {/* The value switch — comparison table --------------------- */}
      <ValueSwitch />

      {/* Mobilization lifecycle — 4-step process ----------------- */}
      <LifecycleSteps />

      {/* Client outcomes — testimonials -------------------------- */}
      <ClientOutcomes />

      {/* Risk mitigation — compliance guarantees ----------------- */}
      <RiskMitigation />

      {/* Common questions — FAQ accordion ------------------------ */}
      <FaqSection />

      {/* Closing CTA banner -------------------------------------- */}
      <CtaBanner />

      {/* Two ways to engage — dual CTA forms --------------------- */}
      <EngageDesk />
    </main>
  );
}
