/**
 * "Disciplines & workforce types we supply" — a 3×2 grid of discipline cards
 * (orange top rule, diamond icon + index, title, description) with thin column
 * dividers, over a full-width stat band. Numbers count up via the site-wide
 * `.counter` engine; the accent suffix stays a separate orange span so it keeps
 * its colour through the animation.
 */

const DISCIPLINES = [
  {
    n: "01",
    title: "Contract Staffing",
    body: "EPC managers, discipline engineers and commissioning leads for megaprojects.",
  },
  {
    n: "02",
    title: "Employer of Record (EOR)",
    body: "DP operators, ROV pilots, toolpushers and subsea engineering crews.",
  },
  {
    n: "03",
    title: "Global Mobility & Logistics",
    body: "Safety officers, QA/QC inspectors and incident-free site governance.",
  },
  {
    n: "04",
    title: "Permanent Direct Hire",
    body: "GWO-certified wind techs, solar EPC crews and grid integration teams.",
  },
  {
    n: "05",
    title: "Executive Search",
    body: "Country managers, asset directors and scarce senior technical leadership.",
  },
  {
    n: "06",
    title: "Managed Service Provision (MSP)",
    body: "Compliant local-entity payroll, visas and end-to-end travel logistics.",
  },
];

const STATS = [
  { number: "Fast", suffix: "", label: "Vetted shortlist" },
  { number: "Global", suffix: "", label: "Deployment reach" },
  { number: "24/7", suffix: "", label: "Rotation support" },
  { number: "0", suffix: " fees", label: "Contractors never pay" },
];

// Column dividers: none on the first item of each row, present otherwise —
// tracked separately for the 2-up (sm) and 3-up (lg) breakpoints.
function cardDivider(i: number) {
  const sm = i % 2 === 1 ? "sm:border-l sm:border-gray-200 sm:pl-8" : "";
  const lg =
    i % 3 === 0
      ? "lg:border-l-0 lg:pl-0"
      : "lg:border-l lg:border-gray-200 lg:pl-8";
  return `${sm} ${lg}`;
}

function statDivider(i: number) {
  const base = i % 2 === 1 ? "border-l border-gray-200 pl-6" : "";
  const md =
    i % 4 === 0
      ? "md:border-l-0 md:pl-0"
      : "md:border-l md:border-gray-200 md:pl-8";
  return `${base} ${md}`;
}

export default function DisciplinesSection() {
  return (
    <section className="bg-white pt-16 md:pt-24">
      <div className="mx-auto max-w-[1276px] px-4 sm:px-6">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-[1.5px] w-10 bg-orange-500" />
              <span className="font-jbmono text-xs uppercase tracking-[0.24em] text-orange-500">
                At a glance
              </span>
            </div>
            <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
              Disciplines &amp; workforce
              <br />
              types we supply
            </h2>
          </div>
          <p className="max-w-sm font-plex text-base leading-6 text-stone-600 lg:text-right">
            Pre-vetted talent pools across every technical niche the energy
            sector demands — ready to mobilize on your timeline.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {DISCIPLINES.map((d, i) => (
            <div
              key={d.n}
              data-aos="fade-up"
              data-aos-delay={`${(i % 3) * 80}`}
              className={`flex flex-col pr-0 sm:pr-8 ${cardDivider(i)}`}
            >
              {/* Orange top rule */}
              <span aria-hidden className="h-0.5 w-full bg-orange-500" />

              {/* Icon + index */}
              <div className="mt-6 flex items-start gap-3">
                <span className="grid size-11 place-items-center border border-gray-200">
                  <span aria-hidden className="size-4 rotate-45 bg-orange-500" />
                </span>
                <span className="font-jbmono text-xs text-gray-300">{d.n}</span>
              </div>

              <h3 className="mt-6 font-archivo text-lg font-bold leading-6 text-stone-900">
                {d.title}
              </h3>
              <p className="mt-2.5 font-plex text-sm leading-6 text-stone-600">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stat band — full width */}
      <div className="mt-16 border-t border-gray-200 bg-gray-50 md:mt-20">
        <div className="mx-auto max-w-[1276px] px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={`${i * 80}`}
                className={statDivider(i)}
              >
                <div className="flex items-baseline font-archivo text-4xl font-extrabold leading-none text-stone-900 sm:text-5xl">
                  <span>{s.number}</span>
                  <span className="text-orange-500">{s.suffix}</span>
                </div>
                <div className="mt-3 font-jbmono text-[11px] uppercase tracking-wider text-gray-500">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
