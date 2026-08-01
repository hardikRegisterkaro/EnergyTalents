/**
 * "Mobilization Lifecycle" — the four-stage process from requisition to rig.
 * A header over a 4-up row of steps (dark numbered tile, mono stage label,
 * title, description). Collapses to 2-up then single column.
 */

const STEPS = [
  {
    n: "01",
    label: "Source & Vet",
    title: "Talent Pooling",
    body: "Rigorous technical testing, ticket validation and background checks against discipline standards.",
  },
  {
    n: "02",
    label: "Comply & Mobilize",
    title: "Mobilisation",
    body: "Visas, local tax compliance, medical clearances and right-to-work confirmation.",
  },
  {
    n: "03",
    label: "Deploy & Manage",
    title: "Compliant Payroll",
    body: "On-site onboarding, HSE briefings and fully compliant local-entity payroll management.",
  },
  {
    n: "04",
    label: "Rotate & Retain",
    title: "Consolidation",
    body: "Smooth rotation logistics, continuity planning and long-term workforce retention.",
  },
];

export default function LifecycleSteps() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1276px]">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-6 pb-11 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-[1.5px] w-6 bg-orange-500" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                Mobilization Lifecycle
              </span>
            </div>
            <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
              From requisition to rig,
              <br />
              managed end to end
            </h2>
          </div>
          <p className="max-w-md font-plex text-base leading-6 text-zinc-600 lg:text-right">
            Supplying manpower isn&rsquo;t just the résumé — it&rsquo;s getting
            the right person to an offshore rig or remote solar farm, safely and
            legally.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} data-aos="fade-up" data-aos-delay={`${i * 80}`}>
              <div className="grid size-14 place-items-center bg-neutral-900 font-archivo text-base font-extrabold text-white">
                {s.n}
              </div>
              <div className="mt-6 font-jbmono text-xs font-medium uppercase tracking-widest text-orange-500">
                {s.label}
              </div>
              <h3 className="mt-1.5 font-poppins text-lg font-bold text-neutral-900">
                {s.title}
              </h3>
              <p className="mt-2.5 font-plex text-sm leading-5 text-zinc-600">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
