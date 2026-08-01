/**
 * Workforce Readiness Vault — three compliance "pillars" in a hairline-divided
 * grid over a light band, plus an accreditation row. The pillars share one
 * stone-200 background with 1px gaps so the seams read as dividers (vertical on
 * desktop, horizontal when stacked). Each pillar's amber→orange top accent
 * sweeps across on hover (0-width at rest, matching the export).
 */

type Pillar = {
  tag: string;
  title: string;
  items: string[];
};

const PILLARS: Pillar[] = [
  {
    tag: "/ 01 — Vetting Rigor",
    title: "Verified before\nthey're mobilized",
    items: [
      "Technical certification & ticket validation against discipline standards",
      "Right-to-work, reference & criminal background checks",
      "Offshore medicals & fitness-to-work screening",
    ],
  },
  {
    tag: "/ 02 — Localized Compliance",
    title: "Compliant in\nevery jurisdiction",
    items: [
      "Adherence to domestic tax & social security frameworks",
      "Alignment with international & local labour law",
      "Owned local corporate entities in 80+ regions",
    ],
  },
  {
    tag: "/ 03 — Safety Governance",
    title: "Zero downtime\nfrom day one",
    items: [
      "Mandatory alignment with international HSSE standards",
      "OPITO, GWO & MLC 2006 verified credentials",
      "Continuous incident monitoring & reporting",
    ],
  },
];

const ACCREDITATIONS = ["ISO 9001", "OPITO", "GWO", "MLC 2006"];

export default function ReadinessVault() {
  return (
    <>
      {/* Header */}
      <div data-aos="fade-up">
        <div className="flex items-center gap-3.5">
          <span className="h-[1.5px] w-10 bg-orange-500" />
          <span className="font-jbmono text-xs uppercase tracking-[0.2em] text-orange-500">
            Workforce Readiness Vault
          </span>
        </div>
        <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
          Every crew, field-ready
          <br />
          &amp; fully compliant
        </h2>
      </div>

      {/* Pillars — one shared bg with 1px gaps = hairline dividers */}
      <div
        data-aos="fade-up"
        className="mt-10 grid grid-cols-1 gap-px overflow-hidden bg-stone-200 outline outline-1 -outline-offset-1 outline-stone-200 lg:mt-12 lg:grid-cols-3"
      >
        {PILLARS.map((p) => (
          <div key={p.tag} className="group relative bg-white p-8 sm:p-10">
            {/* Top accent — sweeps in on hover */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out group-hover:w-full"
            />

            <div className="font-jbmono text-xs text-stone-400">{p.tag}</div>
            <h3 className="mt-4 whitespace-pre-line font-archivo text-xl font-bold leading-6 text-stone-900">
              {p.title}
            </h3>
            <ul className="mt-8 space-y-4">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[9px] size-1.5 shrink-0 bg-orange-500"
                  />
                  <span className="font-plex text-sm leading-6 text-stone-600">
                    {it}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Accreditations */}
      <div
        data-aos="fade-up"
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <span className="font-jbmono text-xs tracking-tight text-stone-400">
          Accredited:
        </span>
        {ACCREDITATIONS.map((a) => (
          <span
            key={a}
            className="border border-stone-200 bg-white px-3 py-2 font-jbmono text-xs tracking-tight text-stone-500"
          >
            {a}
          </span>
        ))}
      </div>
    </>
  );
}
