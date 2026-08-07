/**
 * "Mobilization Lifecycle" — the four-stage process from requisition to rig.
 * A header over a 4-up row of steps (dark numbered tile, mono stage label,
 * title, description). Collapses to 2-up then single column.
 */

export type LifecycleProps = {
  eyebrow: string;
  heading: string;
  intro?: string;
  /** `label` is the small orange phase caption above each step title. */
  steps: { label?: string; title: string; body: string }[];
};

export default function LifecycleSteps({
  eyebrow,
  heading,
  intro,
  steps,
}: LifecycleProps) {
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
                {eyebrow}
              </span>
            </div>
            <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
              {heading}
            </h2>
          </div>
          {intro && (
            <p className="max-w-md font-plex text-base leading-6 text-zinc-600 lg:text-right">
              {intro}
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} data-aos="fade-up" data-aos-delay={`${i * 80}`}>
              <div className="grid size-14 place-items-center bg-neutral-900 font-archivo text-base font-extrabold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>
              {s.label && (
                <div className="mt-6 font-jbmono text-xs font-medium uppercase tracking-widest text-orange-500">
                  {s.label}
                </div>
              )}
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
