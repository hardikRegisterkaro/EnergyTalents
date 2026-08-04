/**
 * "Long-term staffing partner" — two-column intro (copy + framed image) over a
 * four-stat bar. The stats use the site-wide count-up (`.counter[data-target]`
 * animated by RevealInit); the server-rendered text is the final value so it's
 * correct with JS disabled.
 */

const FEATURES = [
  "Rotation & travel logistics",
  "Project safety oversight",
  "Cross-border payroll",
  "Dedicated account desk",
];

type Stat = { target: string; suffix: string; display: string; label: string };

const STATS: Stat[] = [
  { target: "80", suffix: "+", display: "80+", label: "Regional Entities" },
  { target: "50", suffix: "+", display: "50+", label: "Combined Years Experience" },
  { target: "2200", suffix: "+", display: "2,200+", label: "Active Clients" },
  { target: "24000", suffix: "+", display: "24,000+", label: "Deployed Contractors" },
];

// Warm industrial placeholder — swap for real crew/site photography.
const IMAGE_STYLE = {
  backgroundImage: "url('/oil-rig.svg')",
};

export default function StaffingPartner() {
  return (
    <>
      {/* Intro: copy + framed image */}
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-10 bg-orange-500" />
            <span className="font-jbmono text-xs uppercase tracking-[0.2em] text-orange-500">
              Your Long-Term Staffing Partner
            </span>
          </div>
          <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
            Worldwide crew provisioning,
            <br />
            managed as one programme
          </h2>
          <p className="mt-6 max-w-xl font-plex text-base leading-6 text-stone-600">
            From a single requisition to a 2,000-strong rotational workforce, we
            own the full lifecycle — sourcing and vetting, mobilization and
            travel, rotation scheduling, payroll across borders, and on-site
            safety oversight. One accountable partner, every region, every
            discipline.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <span className="size-1.5 shrink-0 bg-orange-500" aria-hidden />
                <span className="font-jbmono text-xs tracking-tight text-stone-600">
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Framed image */}
        <div data-aos="fade-up" data-aos-delay="120" className="relative">
          <div
            className="aspect-[557/460] w-full overflow-hidden bg-neutral-900 bg-cover bg-center"
            style={IMAGE_STYLE}
            role="img"
            aria-label="Offshore drilling platform at sea"
          />
          {/* amber corner brackets */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-3 size-14 border-r-2 border-t-2 border-amber-500"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -left-3 size-14 border-b-2 border-l-2 border-amber-500"
          />
        </div>
      </div>

      {/* Stat bar */}
      <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-stone-200 pt-12 md:mt-20 md:grid-cols-4 md:gap-y-0">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            data-aos="fade-up"
            data-aos-delay={`${i * 80}`}
            className={
              i > 0 ? "md:border-l md:border-stone-200 md:pl-8" : undefined
            }
          >
            <div
              className="counter font-archivo text-5xl font-bold leading-none text-stone-900 sm:text-6xl"
              data-target={s.target}
              data-suffix={s.suffix}
            >
              {s.display}
            </div>
            <div className="mt-4 font-jbmono text-xs tracking-tight text-stone-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
