import type { Metadata } from "next";
import Link from "next/link";
import StoryCarousel from "./StoryCarousel";
import LeadershipCarousel from "./LeadershipCarousel";
import ValuesCarousel from "./ValuesCarousel";
import OfficesCarousel from "./OfficesCarousel";
import { IconBolt, IconSun, IconArrowRight } from "./icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Two decades in energy crewing. We mobilize 25,000+ technical professionals across 40+ countries — and still answer the phone at 3am when a rotation goes sideways.",
  alternates: { canonical: "/about" },
};

/* --------------------------------- data --------------------------------- */

const HUBS = [
  {
    tag: "Global HQ",
    city: "Dubai, UAE",
    addr: "Energy Plaza, Level 14",
    desk: "Middle East & Africa desk",
    coords: "25.20°N, 55.27°E · GMT+4",
  },
  {
    tag: "Regional Hub",
    city: "Aberdeen, UK",
    addr: "Queens Terrace",
    desk: "Europe & North Sea desk",
    coords: "57.15°N, 2.09°W · GMT",
  },
  {
    tag: "Regional Hub",
    city: "Singapore",
    addr: "Marina Bay Financial Centre",
    desk: "Asia-Pacific desk",
    coords: "1.35°N, 103.82°E · GMT+8",
  },
  {
    tag: "Regional Hub",
    city: "Houston, US",
    addr: "Energy Corridor",
    desk: "Americas desk",
    coords: "29.76°N, 95.37°W · GMT-6",
  },
];

const CLIENTS = [
  "MERIDIAN energy",
  "CAWLEY⟡MARINE",
  "Helix Offshore",
  "BOREALIS WIND",
  "Sable Construct",
  "NORDPETRO",
];

const ROLES_ROW_1 = [
  "Drilling Engineer",
  "Subsea ROV Pilot",
  "Marine DPO",
  "Wind Turbine Technician",
  "Solar Grid Specialist",
  "HSE Director",
  "Welding Inspector",
  "Toolpusher",
  "Piping Designer",
  "Project Director",
];

const ROLES_ROW_2 = [
  "Mobilization Lead",
  "Payroll Admin",
  "Civil Supervisor",
  "Commissioning Engineer",
  "Crane Operator",
  "Crew Coordinator",
  "QA/QC Inspector",
  "Cost Controller",
  "Rope Access Technician",
  "Geotechnical Engineer",
];

const HSE_STATS = [
  {
    target: "0.11",
    suffix: "",
    label: "LTIFR (12-month rolling)",
    body: "Lost Time Injury Frequency Rate per 200,000 hours worked — against an industry benchmark of 0.34.",
  },
  {
    target: "4.2",
    suffix: "M",
    label: "Man-hours LTI-free",
    body: "Cumulative hours worked across live projects without a lost-time incident.",
  },
  {
    target: "100",
    suffix: "%",
    label: "Fit-for-Duty screened",
    body: "No contractor travels without a cleared medical, valid certification and role-specific competency sign-off.",
  },
  {
    target: "24",
    suffix: "h",
    label: "Incident review window",
    body: "Every reported event is investigated and reported to the client within one working day.",
  },
];

const PROTOCOLS = [
  {
    tag: "Protocol 01",
    title: "Stop Work Authority",
    body: "Every contractor we place carries unconditional authority to stop a job they believe is unsafe — and our contracts protect their pay and position when they use it. We have never billed a client for a stoppage.",
  },
  {
    tag: "Protocol 02",
    title: "Fit-for-Duty Gate",
    body: "Pre-deployment medicals, drug & alcohol screening, OPITO/GWO currency checks and fatigue-risk review. If one item is open, the traveller does not board.",
  },
  {
    tag: "Protocol 03",
    title: "Emergency Mobilization",
    body: "A duty manager is reachable in every hub, every hour. Medevac coordination, next-of-kin protocol and replacement crew activation run from one escalation chain.",
  },
  {
    tag: "Protocol 04",
    title: "Audit & Assurance",
    body: "ISO 45001-aligned management system, client-witnessed audits on request, and quarterly HSE performance reporting delivered to your ops team unprompted.",
  },
];

const LEADERS = [
  {
    initials: "RA",
    name: "Rashid Al-Farsi",
    role: "Chief Executive · Founder",
    tag: "14 yrs on the rig floor",
    bio: "14 years as a drilling supervisor in the Gulf before founding Energy Talents in 2006. Still reviews every Tier-1 mobilization plan.",
  },
  {
    initials: "EM",
    name: "Elin Moreno",
    role: "Chief Operations Officer",
    tag: "Ex-EPC logistics",
    bio: "Ex-EPC logistics director; built the 72-hour mobilization pipeline that now runs across four continents.",
  },
  {
    initials: "DO",
    name: "David Okonkwo",
    role: "Head of Compliance & HSE",
    tag: "Ex-offshore HSE lead",
    bio: "Former offshore HSE lead; owns the 99.4% compliance pass rate and intends to keep it there.",
  },
  {
    initials: "PL",
    name: "Priya Lakshmi",
    role: "Head of Talent Cloud",
    tag: "200k-profile database",
    bio: "Leads the 200k-profile database and the energy-specific ATS that beats the keyword filters.",
  },
];

const BIG_STATS = [
  { target: "20", suffix: "", label: "Years in operation" },
  { target: "80", suffix: "+", label: "Nationalities on rotation" },
  { target: "25000", suffix: "+", label: "Talents mobilized to date" },
  { target: "99.4", suffix: "%", label: "Compliance pass rate" },
];

const CERTS = [
  { abbr: "ISO", title: "ISO 9001 & 45001", note: "Quality & safety certified" },
  { abbr: "OP", title: "OPITO & GWO", note: "Approved training standards" },
  { abbr: "MLC", title: "MLC 2006", note: "Maritime labour compliant" },
];

const CRISIS = [
  {
    n: "01",
    title: "Flagged & acknowledged",
    when: "Within 15 minutes",
    body: "One number reaches a named duty manager in the nearest hub — never a call centre, never a ticket queue. The contractor, the client rep and the desk lead are on the same thread immediately.",
  },
  {
    n: "02",
    title: "Triaged by scenario",
    when: "Pre-written playbooks",
    body: "Flight disruption, medical event, visa or port bottleneck, weather stand-down — each runs on a rehearsed protocol with defined authority to spend, rebook and escalate without waiting for approval.",
  },
  {
    n: "03",
    title: "Resolved or replaced",
    when: "Same rotation window",
    body: "We rebook, re-route, arrange medevac and repatriation, or activate a pre-cleared standby contractor in the same discipline — already screened, certified and travel-ready before the call came in.",
  },
  {
    n: "04",
    title: "Closed out in writing",
    when: "Within 24 hours",
    body: "A written account of what happened, what it cost, what we changed and who is covering the seat — to your ops team and to the contractor's family where relevant. No silent recovery.",
  },
];

const ROLES = [
  {
    where: "Dubai · Hybrid",
    title: "Senior Recruiter — Drilling & Wells",
    body: "Own the drilling desk. Field experience in wells or rig operations required.",
  },
  {
    where: "Aberdeen · On-site",
    title: "Mobilization Coordinator — North Sea",
    body: "Run visas, medicals, and travel for offshore rotations across the UK & Norwegian sectors.",
  },
  {
    where: "Singapore · Hybrid",
    title: "Compliance Analyst — Talent Cloud",
    body: "Keep the 99.4% pass rate honest: certification verification and audit tooling.",
  },
];

/* ------------------------------- component ------------------------------ */

export default function AboutPage() {
  return (
    <>
      <main id="top">
        {/* Hero ------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-white pt-14 pb-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 dotbg opacity-60" />
          <div className="relative mx-auto max-w-[1216px] px-6 text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-linec bg-white px-4 py-2 shadow-[0_6px_20px_-10px_rgba(30,27,22,.2)]">
              <span className="text-[13.5px] text-body2">Established 2006</span>
              <IconBolt className="h-4 w-4 text-brand" />
              <span className="text-[13.5px] font-bold text-ink">
                Two decades in energy
              </span>
            </span>
            <h1 className="reveal mx-auto mt-7 font-display text-[clamp(1.75rem,4.2vw,2.9rem)] font-bold leading-[1.06] tracking-tight text-ink text-balance">
              The people behind the
              <br />
              <span className="o-text">crews that power</span> the world
            </h1>
            <p className="reveal mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-body2">
              We started as a two-desk crewing agency in Dubai. Today we mobilize
              25,000+ technical professionals across 40+ countries — and we still
              answer the phone at 3am when a rotation goes sideways.
            </p>
            <div className="reveal mt-8 flex justify-center gap-3">
              <Link
                href="#team"
                className="btn-grad inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold"
              >
                Meet the Team <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#story"
                className="btn-lift inline-flex items-center rounded-full border border-linec bg-white px-7 py-3.5 text-[15px] font-semibold text-ink hover:border-brand-400"
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Story carousel (mission + global presence) ----------------- */}
        <section id="story" className="bg-white pb-6">
          <div className="mx-auto max-w-[1216px] px-6">
            <StoryCarousel />
          </div>
        </section>

        {/* Client marquee --------------------------------------------- */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-8 text-center text-sm font-medium text-ink/50 reveal">
              Twenty years of repeat business with operators, EPC contractors &
              developers
            </p>
          </div>
          <div className="marquee-track relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="marquee gap-14 pr-14">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink/35"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Every technical role (sectors) ----------------------------- */}
        <section className="bg-cream dotbg overflow-hidden border-y border-linec/60 py-24">
          <div className="mx-auto max-w-[1216px] px-6 text-center">
            <h2 className="reveal font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
              <span className="o-text">Mobilize every technical role</span>
              <br />
              across the energy value chain
            </h2>
            <p className="reveal mx-auto mt-5 max-w-[620px] text-[16.5px] leading-relaxed text-body2">
              From a single specialist to a full project crew — one partner for
              sourcing, screening, mobilization, and payroll across every sector
              and discipline.
            </p>
            <div className="reveal mt-10 flex justify-center">
              <span
                className="grid h-[86px] w-[86px] place-items-center rounded-[22px] border-[3px] border-[#C9B99F] bg-cream-2 text-brand"
                style={{
                  boxShadow:
                    "0 0 0 6px rgba(249,115,22,.14), 0 0 34px 6px rgba(249,115,22,.35)",
                }}
              >
                <IconSun className="h-9 w-11" />
              </span>
            </div>
          </div>

          <div className="rwrap relative mt-10 grid gap-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
            <div className="rrow rrow-l">
              {[...ROLES_ROW_1, ...ROLES_ROW_1].map((role, i) => (
                <span key={i} className="rchip">
                  <i />
                  {role}
                </span>
              ))}
            </div>
            <div className="rrow rrow-r">
              {[...ROLES_ROW_2, ...ROLES_ROW_2].map((role, i) => (
                <span key={i} className="rchip">
                  <i />
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/careers"
              className="btn-lift reveal inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-7 py-3.5 text-[15px] font-bold text-ink shadow-sm hover:border-brand-400"
            >
              Explore all sectors <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Values ----------------------------------------------------- */}
        <section id="values" className="bg-cream dotbg border-y border-linec/60 py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="text-center">
              <span className="grad chip-glow reveal inline-block rounded-full px-4 py-1.5 text-[12.5px] font-bold text-white">
                What we stand for
              </span>
              <h2 className="reveal mt-5 font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                Values written on
                <br />
                <span className="o-text">rig floors, not walls</span>
              </h2>
            </div>
            <ValuesCarousel />
          </div>
        </section>

        {/* HSE stats + protocols -------------------------------------- */}
        <section id="hse" className="bg-white py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  Operational HSE
                </div>
                <h2 className="reveal mt-3 max-w-[620px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  Safety isn&apos;t a value here.{" "}
                  <span className="o-text">It&apos;s a procedure.</span>
                </h2>
              </div>
              <p className="reveal max-w-[420px] text-[15px] leading-relaxed text-body2">
                Every crew we mobilize is covered by the same audited HSE
                protocol — no client exemptions, no schedule pressure, no
                exceptions. These are the numbers our clients audit us on.
              </p>
            </div>

            <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {HSE_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="card softshadow reveal p-6"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <div className="font-display text-[38px] font-bold leading-none o-text">
                    <span
                      className="counter"
                      data-target={s.target}
                      data-suffix={s.suffix}
                    >
                      0
                    </span>
                  </div>
                  <div className="mt-3 text-[14px] font-bold text-ink">
                    {s.label}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-body2">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid overflow-hidden rounded-[18px] border border-linec bg-linec md:grid-cols-2 lg:grid-cols-4 gap-px">
              {PROTOCOLS.map((p) => (
                <div key={p.tag} className="hse-tile bg-white p-7">
                  <div className="text-[11.5px] font-bold uppercase tracking-[.14em] text-stone-400">
                    {p.tag}
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership ------------------------------------------------- */}
        <section id="team" className="bg-cream dotbg border-y border-linec/60 py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
              Leadership
            </div>
            <h2 className="reveal mt-3 max-w-[620px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
              Run by people who&apos;ve worked the sites
            </h2>
            <p className="reveal mt-4 max-w-[560px] text-[15.5px] leading-relaxed text-body2">
              Every desk lead has field experience in the discipline they staff.
              It&apos;s why our vetting catches what keyword filters miss.
            </p>
            <LeadershipCarousel leaders={LEADERS} />
            <div className="reveal mt-6 hidden items-center justify-center gap-2 text-[13px] text-body2 sm:flex">
              <span className="grad inline-block h-1.5 w-1.5 rounded-full" />
              Hover a portrait to read their story
            </div>
          </div>
        </section>

        {/* Twenty years in numbers (deep gradient) -------------------- */}
        <section className="grad-deep dotbg-dark py-24 text-white">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="reveal inline-block rounded-full bg-white/20 px-4 py-1.5 text-[12.5px] font-semibold text-white">
                  Twenty years in numbers
                </span>
                <h2 className="reveal mt-5 font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight">
                  Built rotation by rotation since 2006.
                </h2>
                <p className="reveal mt-4 max-w-[440px] text-[15.5px] leading-relaxed text-white/85">
                  From one office and a phone to the workforce engine behind
                  projects in over 40 countries.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {BIG_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="stat-card reveal rounded-2xl border border-white/25 bg-white/5 p-6"
                    style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  >
                    <div className="font-display text-[38px] font-bold leading-none">
                      <span
                        className="counter"
                        data-target={s.target}
                        data-suffix={s.suffix}
                      >
                        0
                      </span>
                    </div>
                    <div className="stat-bar" />
                    <p className="mt-3 text-[13.5px] font-medium text-white/85">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {CERTS.map((c) => (
                <div
                  key={c.abbr}
                  className="reveal flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg"
                >
                  <span className="font-display text-[12px] font-bold text-brand">
                    {c.abbr}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold text-ink">
                      {c.title}
                    </p>
                    <p className="text-[13px] text-body2">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crisis management ------------------------------------------ */}
        <section id="crisis" className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  Crisis Management · 24/7 Rotation Support
                </div>
                <h2 className="reveal mt-3 max-w-[620px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  Someone answers at 3am.{" "}
                  <span className="o-text">Every time.</span>
                </h2>
              </div>
              <p className="reveal max-w-[420px] text-[15px] leading-relaxed text-body2">
                Rotations go wrong at the worst possible hour — a cancelled
                connection, a failed medical, a visa held at the counter. Here is
                exactly what happens when they do.
              </p>
            </div>

            <ol className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CRISIS.map((c, i) => (
                <li
                  key={c.n}
                  className="crisis-step reveal"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="crisis-num grid h-[46px] w-[46px] place-items-center rounded-xl border border-linec bg-white font-display text-[16px] font-bold text-ink">
                    {c.n}
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-[11.5px] font-bold o-text">
                    {c.when}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {c.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="card softshadow mt-5 grid gap-6 p-7 sm:grid-cols-3">
              <MiniStat big="15 min" small="Acknowledgement standard — any hour, any hub" />
              <MiniStat big="4 hubs" small="Duty managers on rotation across all time zones" />
              <MiniStat big="Zero" small="Escalations routed to voicemail since 2006" />
            </div>
          </div>
        </section>

        {/* Offices ---------------------------------------------------- */}
        <section
          id="offices"
          className="bg-cream py-24 border-b border-linec/60"
        >
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="text-center">
              <span className="grad chip-glow reveal inline-block rounded-full px-4 py-1.5 text-[12.5px] font-bold text-white">
                Where we work
              </span>
              <h2 className="reveal mt-5 font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                Four hubs, <span className="o-text">one pipeline</span>
              </h2>
            </div>
            <OfficesCarousel hubs={HUBS} />
          </div>
        </section>

        {/* Careers ---------------------------------------------------- */}
        <section id="careers" className="bg-white py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  Careers at Energy Talents
                </div>
                <h2 className="reveal mt-3 max-w-[560px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  Join the team behind the crews
                </h2>
              </div>
              <p className="reveal max-w-[400px] text-[15px] leading-relaxed text-body2">
                We hire recruiters who&apos;ve worked the disciplines they staff
                — and coordinators who treat every rotation like their own.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {ROLES.map((r, i) => (
                <Link
                  key={r.title}
                  href="/careers"
                  className="card softshadow reveal block p-6 transition-colors hover:border-brand-400"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11.5px] font-bold text-brand">
                      {r.where}
                    </span>
                    <span className="text-stone-400" aria-hidden>
                      ›
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {r.body}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/careers"
                className="btn-lift inline-flex items-center gap-2 rounded-full border border-linec bg-white px-6 py-3 text-[14.5px] font-bold text-ink shadow-sm hover:border-brand-400"
              >
                View all open roles <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA -------------------------------------------------- */}
        <section className="bg-white pb-20">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="grad-deep dotbg-dark reveal grid items-center gap-9 overflow-hidden rounded-[26px] p-9 text-white lg:grid-cols-2 lg:p-12">
              <div>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.1] tracking-tight">
                  Work with us — either side of the desk.
                </h2>
                <p className="mt-4 max-w-[430px] text-[15.5px] leading-relaxed text-white/90">
                  Need a crew mobilized, or looking for your next rotation? Both
                  start with the same team.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href="/contact-us"
                  className="btn-lift inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[14.5px] font-bold"
                >
                  <span className="o-text inline-flex items-center gap-2">
                    Request Technical Crew <IconArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/careers#pipeline"
                  className="btn-lift inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-white/10"
                >
                  Join the Talent Pool
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ------------------------------ sub-components --------------------------- */

function MiniStat({ big, small }: { big: string; small: string }) {
  return (
    <div>
      <p className="font-display text-[26px] font-bold leading-none o-text">
        {big}
      </p>
      <p className="mt-2 text-[13.5px] leading-snug text-body2">{small}</p>
    </div>
  );
}
