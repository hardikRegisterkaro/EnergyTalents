import Link from "next/link";

/**
 * Active staffing pipeline — a full-bleed, infinitely scrolling marquee of live
 * role cards. Reuses the site's `.marquee` engine (translateX 0→-50%, paused on
 * hover via `.marquee-track`, disabled under prefers-reduced-motion). The card
 * set is rendered twice so the -50% loop is seamless; per-card `mr-6` (not a
 * flex gap) keeps the seam perfectly aligned. Edge gradients fade the ends.
 */

type Job = {
  sector: keyof typeof SECTOR_STYLES;
  title: string;
  region: string;
  rotation: string;
};

const SECTOR_STYLES = {
  Subsea: "bg-cyan-700/10 text-cyan-700",
  Renewable: "bg-green-600/10 text-green-600",
  Maritime: "bg-sky-700/10 text-sky-700",
  "Oil & Gas": "bg-orange-500/10 text-orange-500",
  Infrastructure: "bg-violet-600/10 text-violet-600",
} as const;

const JOBS: Job[] = [
  { sector: "Subsea", title: "Subsea Construction Engineer", region: "Angola", rotation: "Rotational · 28/28" },
  { sector: "Renewable", title: "Wind Turbine Technician (GWO)", region: "North Sea", rotation: "Contract · 12 mo" },
  { sector: "Maritime", title: "Dynamic Positioning Operator", region: "Brazil", rotation: "Rotational · 6/6" },
  { sector: "Oil & Gas", title: "Commissioning Lead — LNG", region: "Qatar", rotation: "Staff · Permanent" },
  { sector: "Infrastructure", title: "HSE Manager — EPC", region: "Saudi Arabia", rotation: "Contract · 24 mo" },
  { sector: "Subsea", title: "Subsea Pipeline Welder (6G)", region: "Norway", rotation: "Project · 8 mo" },
  { sector: "Renewable", title: "Solar EPC Site Manager", region: "Australia", rotation: "Contract · 18 mo" },
  { sector: "Oil & Gas", title: "Drilling Supervisor", region: "Guyana", rotation: "Rotational · 28/28" },
];

function JobCard({ job, hidden }: { job: Job; hidden?: boolean }) {
  return (
    <Link
      href="/careers#roles"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group mr-6 flex h-64 w-80 shrink-0 flex-col border border-stone-200 bg-white p-6 transition-colors hover:border-stone-300"
    >
      {/* Sector tag + live indicator */}
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 font-jbmono text-[10px] leading-4 ${SECTOR_STYLES[job.sector]}`}
        >
          {job.sector}
        </span>
        <span className="flex items-center gap-1.5 font-jbmono text-[10px] text-orange-500">
          <span
            aria-hidden
            className="size-1.5 animate-pulse rounded-full bg-orange-500"
          />
          Staffing
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-6 font-archivo text-lg font-bold leading-6 text-stone-900">
        {job.title}
      </h3>

      {/* Meta */}
      <div className="mt-auto grid grid-cols-2 gap-4 border-t border-stone-200 pt-4">
        <div>
          <div className="font-jbmono text-[9.5px] text-stone-400">Region</div>
          <div className="mt-1 font-jbmono text-xs text-stone-600">
            {job.region}
          </div>
        </div>
        <div>
          <div className="font-jbmono text-[9.5px] text-stone-400">Rotation</div>
          <div className="mt-1 font-jbmono text-xs text-stone-600">
            {job.rotation}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 flex items-center gap-2 font-jbmono text-xs text-stone-900">
        Apply now
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </div>
    </Link>
  );
}

export default function JobMarquee() {
  return (
    <>
      {/* Header (contained) */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div
          data-aos="fade-up"
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inline-flex size-2.5 animate-ping rounded-full bg-amber-500 opacity-40"
                />
                <span
                  aria-hidden
                  className="relative inline-flex size-1.5 rounded-full bg-amber-500"
                />
              </span>
              <span className="font-jbmono text-xs uppercase tracking-[0.2em] text-orange-500">
                Active Staffing Pipeline
              </span>
            </div>
            <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
              Roles being staffed
              <br />
              right now
            </h2>
          </div>
          <Link
            href="/careers#roles"
            className="group inline-flex items-center gap-2 self-start border-b-2 border-amber-500 pb-1 font-jbmono text-xs tracking-tight text-stone-900 sm:self-auto"
          >
            View all open rotations
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Marquee (full-bleed) */}
      <div className="marquee-track relative mt-12 overflow-hidden">
        <div className="marquee" style={{ animationDuration: "48s" }}>
          {JOBS.map((job, i) => (
            <JobCard key={`a-${i}`} job={job} />
          ))}
          {JOBS.map((job, i) => (
            <JobCard key={`b-${i}`} job={job} hidden />
          ))}
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24"
        />
      </div>
    </>
  );
}
