/**
 * "Risk Mitigation" — a dark two-column band: compliance pitch + accreditation
 * chips on the left, and a bracket-framed panel of four compliance guarantees
 * on the right (amber corner brackets, same framing as the home page image).
 */

export type RiskMitigationProps = {
  eyebrow: string;
  heading: string;
  intro?: string;
  /** Accreditation chips, e.g. ISO 9001 / OPITO / GWO. */
  badges: string[];
  guarantees: { title: string; body: string }[];
};

export default function RiskMitigation({
  eyebrow,
  heading,
  intro,
  badges,
  guarantees,
}: RiskMitigationProps) {
  return (
    <section className="bg-neutral-900 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1276px] gap-12 lg:grid-cols-[minmax(0,384px)_1fr] lg:items-center lg:gap-14">
        {/* Left — pitch + accreditations */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-6 bg-orange-500" />
            <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
              {eyebrow}
            </span>
          </div>
          <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-white sm:text-[38px] sm:leading-[1.1]">
            {heading}
          </h2>
          {intro && (
            <p className="mt-5 font-hanken text-base leading-6 text-gray-400">
              {intro}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b}
                className="border border-white/20 px-3.5 py-2 font-jbmono text-xs tracking-wide text-gray-300"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right — bracket-framed guarantees panel */}
        <div data-aos="fade-up" data-aos-delay="120" className="relative">
          <div className="bg-white/5 p-8 outline outline-1 -outline-offset-1 outline-white/10 sm:p-9">
            {guarantees.map((g, i) => {
              const isFirst = i === 0;
              const isLast = i === guarantees.length - 1;
              return (
                <div
                  key={g.title}
                  className={`flex gap-4 ${
                    isFirst ? "pb-5" : isLast ? "pt-5" : "py-5"
                  } ${isLast ? "" : "border-b border-white/10"}`}
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-2 shrink-0 bg-orange-500"
                  />
                  <div>
                    <div className="font-poppins text-base font-semibold text-white">
                      {g.title}
                    </div>
                    <div className="mt-1 font-plex text-sm leading-5 text-gray-400">
                      {g.body}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* amber corner brackets */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-2 -top-2 size-5 border-r-2 border-t-2 border-orange-500"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-2 -left-2 size-5 border-b-2 border-l-2 border-orange-500"
          />
        </div>
      </div>
    </section>
  );
}
