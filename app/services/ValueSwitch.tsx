/**
 * "The Value Switch" — a side-by-side comparison of Traditional Agencies vs
 * Energy Talents. Two equal-height cards (the second brand-outlined with an
 * orange header), each a list of ✕ / ✓ rows, over a static segmented indicator
 * that points to Energy Talents.
 */

export type ValueSwitchProps = {
  eyebrow: string;
  heading: string;
  intro?: string;
  /** Left card: the status quo. `heading` names it, e.g. "Traditional Agencies". */
  oldWay: { heading: string; rows: { title: string; body: string }[] };
  /** Right card: us. */
  ourWay: { heading: string; rows: { title: string; body: string }[] };
};

export default function ValueSwitch({
  eyebrow,
  heading,
  intro,
  oldWay,
  ourWay,
}: ValueSwitchProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1276px]">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between"
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
            <p className="max-w-sm font-plex text-base leading-6 text-zinc-600 lg:text-right">
              {intro}
            </p>
          )}
        </div>

        {/* Comparison cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traditional */}
          <div
            data-aos="fade-up"
            className="flex flex-col bg-white outline outline-1 -outline-offset-1 outline-gray-200"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <span className="font-poppins text-lg font-bold text-neutral-900">
                {oldWay.heading}
              </span>
              <span className="border border-zinc-400 px-2.5 py-[5px] font-jbmono text-[10px] tracking-wider text-zinc-400">
                THE OLD WAY
              </span>
            </div>
            {oldWay.rows.map((r, i) => (
              <div
                key={r.title}
                className={`flex items-start gap-3.5 px-6 py-4 ${
                  i < oldWay.rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="grid size-5 shrink-0 place-items-center bg-red-50 font-jbmono text-xs font-bold text-orange-700 outline outline-1 -outline-offset-1 outline-stone-200">
                  ✕
                </span>
                <div>
                  <div className="font-poppins text-sm font-semibold text-zinc-500">
                    {r.title}
                  </div>
                  <div className="mt-0.5 font-hanken text-sm leading-5 text-zinc-600">
                    {r.body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Energy Talents */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col bg-white outline outline-1 -outline-offset-1 outline-orange-500"
          >
            <div className="flex items-center justify-between bg-orange-500 px-6 py-5">
              <span className="font-poppins text-lg font-bold text-white">
                {ourWay.heading}
              </span>
              <span className="border border-white px-2.5 py-[5px] font-jbmono text-[10px] tracking-wider text-white">
                OUR WAY
              </span>
            </div>
            {ourWay.rows.map((r, i) => (
              <div
                key={r.title}
                className={`flex items-start gap-3.5 px-6 py-4 ${
                  i < ourWay.rows.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="grid size-5 shrink-0 place-items-center bg-orange-500 font-jbmono text-xs font-bold text-white">
                  ✓
                </span>
                <div>
                  <div className="font-poppins text-sm font-semibold text-neutral-900">
                    {r.title}
                  </div>
                  <div className="mt-0.5 font-hanken text-sm leading-5 text-zinc-600">
                    {r.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segmented indicator */}
        <div className="flex justify-center pt-10">
          <div className="inline-flex gap-1 border border-gray-200 bg-white p-[5px]">
            <span className="px-5 py-2.5 font-jbmono text-xs font-bold tracking-wide text-neutral-400">
              {oldWay.heading}
            </span>
            <span className="bg-orange-500 px-5 py-2.5 font-jbmono text-xs font-bold tracking-wide text-white">
              {ourWay.heading}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
