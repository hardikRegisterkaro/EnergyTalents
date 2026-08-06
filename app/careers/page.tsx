import type { Metadata } from "next";
import { FilterProvider } from "./FilterContext";
import HeroSearch from "./HeroSearch";
import RolesExplorer from "./RolesExplorer";
import { getRoles, PAGE_SIZE } from "./roles-api";
import Link from "next/link";
import PipelineForm from "./PipelineForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Rotational, contract and staff roles across oil & gas, renewables, marine and infrastructure — with visas, payroll, compliance and travel handled for you, anywhere on earth.",
  alternates: { canonical: "/careers" },
};

const STATS = [
  { value: "Global", accent: "", label: "Deployment reach" },
  { value: "24/7", accent: "", label: "Rotation support" },
  { value: "0", accent: " fees", label: "Contractors never pay" },
  { value: "End-to-end", accent: "", label: "Visas · travel · payroll" },
];

/** The hero panel shows the four most recent roles flagged Featured in the CMS. */
const FEATURED_LIMIT = 4;

const BENEFITS = [
  {
    title: "Compliant global payroll",
    body: "Paid correctly, on time, in your currency — through owned legal entities in 80+ regions.",
  },
  {
    title: "Visas & mobility handled",
    body: "Work permits, medicals, travel and accommodation organised end to end before you fly.",
  },
  {
    title: "Competitive day rates",
    body: "Transparent, benchmarked rates with no hidden agency margins eating your earnings.",
  },
  {
    title: "Tickets & certifications",
    body: "Support keeping OPITO, GWO, BOSIET and discipline tickets current and funded.",
  },
  {
    title: "One dedicated desk",
    body: "A single named account manager who knows your file across every rotation and region.",
  },
  {
    title: "Long-term continuity",
    body: "Back-to-back rotations and a pipeline of projects — not one job, then silence.",
  },
];

const STEPS = [
  {
    num: "01",
    kicker: "Apply",
    title: "Apply once",
    body: "Submit your CV and tickets a single time. We match you to every relevant live rotation.",
  },
  {
    num: "02",
    kicker: "Screen & verify",
    title: "Vetting & checks",
    body: "Technical screening, ticket validation and background checks against discipline standards.",
  },
  {
    num: "03",
    kicker: "Mobilize",
    title: "Mobilization",
    body: "Offer, contract, visa, medical and travel — all arranged by your dedicated desk.",
  },
  {
    num: "04",
    kicker: "Deploy",
    title: "On-site & paid",
    body: "Onboarding, HSE briefing and compliant local payroll from your very first shift.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Three rotations in and I've never once chased an invoice or a flight. They sort the paperwork, I do the job. That's how it should be.",
    highlight: "3 rotations · zero payroll issues",
    initials: "DH",
    name: "Declan Hayes",
    role: "DP Operator · North Sea",
  },
  {
    quote:
      "They funded my GWO renewal and had me on a wind project in Brazil within a month. The desk genuinely looks after its people.",
    highlight: "Certifications kept current",
    initials: "PN",
    name: "Priya Nair",
    role: "Wind Technician · Renewables",
  },
  {
    quote:
      "As an HSE lead I've worked through plenty of agencies. This is the first one where compliance and visas were actually airtight.",
    highlight: "Airtight compliance",
    initials: "OA",
    name: "Omar Al-Farsi",
    role: "HSE Manager · EPC",
  },
];

const PIPELINE_POINTS = [
  "One profile, matched to every relevant rotation",
  "First-access alerts before roles go public",
  "A dedicated desk that keeps your tickets current",
];

export default async function CareersPage() {
  // Both reads are cached and tagged, so the CMS's revalidate call after a
  // career edit refreshes them without a redeploy. Fetched in parallel — the
  // featured panel and the listing are independent.
  const [listing, featured] = await Promise.all([
    // Only the first page — the explorer fetches subsequent pages itself, so
    // the browser never receives the whole table at once.
    getRoles({ page: 1, limit: PAGE_SIZE }),
    getRoles({ featured: true, limit: FEATURED_LIMIT }),
  ]);

  return (
    <FilterProvider>
      <main>
      {/* Hero ------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-neutral-900 px-4 py-14 sm:px-6 md:py-24">
          {/* Orange glow, top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-18%] top-[-30%] h-[800px] w-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 20% 85%, rgba(249,115,22,0.40), rgba(249,115,22,0) 60%)",
            }}
          />

          <div className="relative mx-auto flex max-w-[1276px] flex-col items-stretch justify-between gap-10 rounded-[33px] bg-neutral-600/20 px-5 py-10 shadow-[inset_0_3px_4px_0_rgba(255,255,255,0.25),inset_0_-4px_4px_0_rgba(255,255,255,0.15)] sm:px-8 md:px-12 md:py-14 lg:flex-row lg:items-center">
            {/* Left column */}
            <div className="w-full lg:max-w-[746px]">
              <div className="flex items-center gap-3.5">
                <span className="h-[1.5px] w-6 shrink-0 bg-orange-500" />
                <span className="font-jbmono text-xs font-medium tracking-[0.24em] text-orange-500">
                  BUILD WITH ENERGY TALENTS
                </span>
              </div>

              <h1 className="py-5 font-archivo text-[28px] font-black uppercase leading-[1.08] text-white sm:text-4xl lg:text-5xl">
                The career behind the world&rsquo;s{" "}
                <span className="text-orange-500">energy</span>
              </h1>

              <p className="max-w-[620px] pb-7 font-plex text-base leading-6 text-stone-300">
                Rotational, contract and staff roles across oil &amp; gas,
                renewables, marine and infrastructure — with visas, payroll,
                compliance and travel handled for you, anywhere on earth.
              </p>

              {/* Search bar (feeds the roles listing below) */}
              <HeroSearch />

              {/* Stats */}
              <div className="flex flex-wrap gap-x-10 gap-y-5 pt-6">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col gap-[3px]">
                    <div className="flex items-center font-archivo text-2xl font-extrabold text-white">
                      {s.value}
                      {s.accent && (
                        <span className="text-orange-500">{s.accent}</span>
                      )}
                    </div>
                    <div className="font-jbmono text-xs font-medium uppercase tracking-wider text-gray-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — featured jobs */}
            <div className="w-full shrink-0 bg-gray-900/80 p-6 outline outline-1 -outline-offset-1 outline-white/10 lg:w-96">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="font-jbmono text-xs font-medium uppercase tracking-widest text-gray-500">
                  Featured this week
                </span>
              </div>

              {featured.roles.length === 0 ? (
                <p className="py-5 font-plex text-xs tracking-wide text-gray-500">
                  No featured roles right now — browse all open roles below.
                </p>
              ) : (
                featured.roles.map((job, i) => (
                  <div
                    key={job.slug}
                    className={`flex items-center justify-between py-3.5 ${
                      i !== featured.roles.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-[3px]">
                      <div className="font-poppins text-sm font-semibold text-white">
                        {job.title}
                      </div>
                      <div className="font-plex text-xs tracking-wide text-gray-500">
                        {job.location} · {job.duration}
                      </div>
                    </div>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="whitespace-nowrap font-jbmono text-xs font-medium tracking-wide text-orange-500 transition-colors hover:text-orange-400"
                    >
                      Apply →
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Open roles listing ----------------------------------------- */}
        <section id="roles" className="bg-gray-50 py-16 md:py-20 scroll-mt-16">
          <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
            {/* Header */}
            <div
              data-aos="fade-up"
              className="flex flex-col gap-6 pb-9 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="h-1.5 w-1.5 rounded-sm bg-orange-500" />
                  <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                    Open roles
                  </span>
                </div>
                <h2 className="font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
                  Find your next
                  <br />
                  rotation
                </h2>
              </div>
              <p className="max-w-80 font-plex text-base leading-6 text-zinc-600 sm:text-right">
                Live vacancies across every energy discipline. Apply once and
                our mobilization desk handles the rest.
              </p>
            </div>

            {/* Toolbar + chips + live-filtered list + load more */}
            <RolesExplorer initial={listing} />
          </div>
        </section>

        {/* Why build here — benefits grid ----------------------------- */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
            {/* Header */}
            <div
              data-aos="fade-up"
              className="flex flex-col gap-6 pb-11 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="h-[1.5px] w-6 bg-orange-500" />
                  <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                    Why build here
                  </span>
                </div>
                <h2 className="font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
                  More than a placement.
                  <br />A managed career.
                </h2>
              </div>
              <p className="max-w-80 font-plex text-base leading-6 text-zinc-600 sm:text-right">
                We remove the friction that comes with international energy work
                so you can focus on the job.
              </p>
            </div>

            {/* Benefit cards — hairline dividers via gap-px over gray bg */}
            <div className="grid gap-px bg-gray-200 outline outline-1 -outline-offset-1 outline-gray-200 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b, i) => (
                <div
                  key={b.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                  className="flex flex-col bg-white px-8 py-9"
                >
                  <div className="pb-5">
                    <div className="flex size-11 items-center justify-center outline outline-1 -outline-offset-1 outline-gray-200">
                      <span className="size-4 rotate-45 bg-orange-500" />
                    </div>
                  </div>
                  <h3 className="pb-2 font-poppins text-lg font-bold leading-5 text-neutral-900">
                    {b.title}
                  </h3>
                  <p className="font-plex text-sm leading-5 text-zinc-600">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How hiring works — 4-step process -------------------------- */}
        <section className="border-y border-gray-200 bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
            {/* Header */}
            <div
              data-aos="fade-up"
              className="flex flex-col gap-6 pb-11 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="h-[1.5px] w-6 bg-orange-500" />
                  <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                    How hiring works
                  </span>
                </div>
                <h2 className="font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
                  From apply to rig
                  <br />
                  in four steps
                </h2>
              </div>
              <p className="max-w-80 font-plex text-base leading-6 text-zinc-600 sm:text-right">
                A clear, fast process — most candidates go from application to an
                offer within days, not weeks.
              </p>
            </div>

            {/* Steps */}
            <div className="grid gap-x-7 gap-y-10 pt-1.5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  data-aos="fade-up"
                  data-aos-delay={i * 90}
                  className="flex flex-col items-start"
                >
                  <div className="mb-6 flex size-14 items-center justify-center bg-neutral-900">
                    <span className="font-archivo text-base font-extrabold text-white">
                      {step.num}
                    </span>
                  </div>
                  <div className="font-jbmono text-xs font-medium uppercase tracking-widest text-orange-500">
                    {step.kicker}
                  </div>
                  <h3 className="pb-2.5 pt-1.5 font-poppins text-lg font-bold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="font-plex text-sm leading-5 text-zinc-600">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* From the crew — testimonials ------------------------------- */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
            {/* Header */}
            <div
              data-aos="fade-up"
              className="flex flex-col gap-6 pb-11 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="h-1.5 w-1.5 rounded-sm bg-orange-500" />
                  <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                    From the crew
                  </span>
                </div>
                <h2 className="font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
                  What it&rsquo;s like to
                  <br />
                  work with us
                </h2>
              </div>
              <p className="max-w-80 font-plex text-base leading-6 text-zinc-600 sm:text-right">
                Contractors who&rsquo;ve run multiple rotations through our desk,
                in their own words.
              </p>
            </div>

            {/* Testimonial cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={t.name}
                  data-aos="fade-up"
                  data-aos-delay={i * 90}
                  className="flex flex-col bg-white p-8 outline outline-1 -outline-offset-1 outline-gray-200"
                >
                  <div
                    aria-hidden
                    className="pb-1.5 font-poppins text-5xl font-extrabold leading-none text-orange-500/20"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="font-plex text-base leading-6 text-zinc-800">
                    {t.quote}
                  </blockquote>
                  <div className="mt-auto">
                    <div className="pt-5 font-jbmono text-xs font-bold uppercase tracking-wide text-orange-500">
                      {t.highlight}
                    </div>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-5">
                      <div className="flex size-11 shrink-0 items-center justify-center bg-neutral-900">
                        <span className="font-poppins text-sm font-bold text-white">
                          {t.initials}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="font-poppins text-sm font-semibold text-neutral-900">
                          {t.name}
                        </div>
                        <div className="font-jbmono text-xs tracking-wide text-zinc-600">
                          {t.role}
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA banner ----------------------------------------- */}
        <section className="overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-14">
          <div className="mx-auto flex max-w-[1276px] flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div data-aos="fade-up" className="flex flex-col gap-3.5">
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.2em] text-white">
                Ready when you are
              </span>
              <h2 className="max-w-[620px] font-poppins text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Your next rotation is already open. Let&rsquo;s get you on it.
              </h2>
            </div>
            <a
              href="#roles"
              data-aos="fade-up"
              data-aos-delay={120}
              className="shrink-0 bg-white px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              [ Browse open roles → ]
            </a>
          </div>
        </section>

        {/* Join the pipeline — talent registration -------------------- */}
        <section
          id="pipeline"
          className="scroll-mt-16 border-t border-gray-200 bg-gray-50 py-16 md:py-20"
        >
          <div className="mx-auto flex max-w-[1276px] flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8">
            {/* Left — intro */}
            <div data-aos="fade-up" className="lg:flex-1">
              <div className="flex items-center gap-3.5">
                <span className="h-[1.5px] w-6 bg-orange-500" />
                <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                  Join the pipeline
                </span>
              </div>
              <h2 className="py-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
                Not seeing the right
                <br />
                role yet?
              </h2>
              <p className="pb-6 font-hanken text-base leading-6 text-zinc-600">
                Register your trade and tickets once. We&rsquo;ll match you to
                live rotations across every energy region as they open.
              </p>
              <ul className="flex flex-col gap-3">
                {PIPELINE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 shrink-0 bg-orange-500" />
                    <span className="font-hanken text-sm leading-5 text-zinc-800">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form card */}
            <PipelineForm />
          </div>
        </section>
      </main>
    </FilterProvider>
  );
}
