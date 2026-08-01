/**
 * "Client Outcomes" — three testimonial cards, each a big faded quote mark, the
 * quote, an orange headline metric, and an author row (mono initials tile).
 * Quotes flex to fill so the author rows align at the bottom of the row.
 */

const TESTIMONIALS = [
  {
    quote:
      "They turned a 40-person North Sea mobilization that was slipping our schedule into a vetted shortlist in three days. Every contractor landed compliant, insured and rig-ready.",
    metric: "↓ 60% TIME-TO-DEPLOY",
    initials: "MK",
    name: "Markus Lindqvist",
    role: "Project Director · Offshore EPC",
  },
  {
    quote:
      "One global contract replaced six local agencies. Payroll, visas and tax exposure across four jurisdictions are now somebody else’s problem — handled, and auditable.",
    metric: "6 → 1 VENDOR CONTRACT",
    initials: "AR",
    name: "Amara Reuben",
    role: "Head of Supply Chain · LNG",
  },
  {
    quote:
      "Two full rotation cycles, zero HSE incidents and a 94% crew retention rate on a remote wind build. The dedicated desk feels like an extension of our own team.",
    metric: "94% CREW RETENTION",
    initials: "SO",
    name: "Sofia Okonkwo",
    role: "Asset Manager · Renewables",
  },
];

export default function ClientOutcomes() {
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
              <span className="size-1.5 rounded-sm bg-orange-500" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                Client Outcomes
              </span>
            </div>
            <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
              What project directors
              <br />
              say about the desk
            </h2>
          </div>
          <p className="max-w-sm font-plex text-base leading-6 text-zinc-600 lg:text-right">
            From single requisitions to 2,000-strong rotational workforces — the
            measure is time-to-rig, retention and zero compliance incidents.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={`${i * 100}`}
              className="flex flex-col bg-white px-8 py-8 outline outline-1 -outline-offset-1 outline-gray-200"
            >
              <div
                aria-hidden
                className="font-poppins text-5xl font-extrabold leading-none text-orange-500/20"
              >
                &ldquo;
              </div>
              <p className="mt-2 flex-1 font-plex text-base leading-6 text-zinc-800">
                {t.quote}
              </p>
              <div className="mt-5 font-jbmono text-xs font-bold tracking-wide text-orange-500">
                {t.metric}
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-200 pt-5">
                <span className="grid size-11 shrink-0 place-items-center bg-neutral-900 font-poppins text-sm font-bold text-white">
                  {t.initials}
                </span>
                <div>
                  <div className="font-poppins text-sm font-semibold text-neutral-900">
                    {t.name}
                  </div>
                  <div className="mt-0.5 font-jbmono text-xs tracking-wide text-zinc-600">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
