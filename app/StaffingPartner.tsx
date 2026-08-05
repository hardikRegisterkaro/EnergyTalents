import Image from "next/image";

/**
 * "Long-term staffing partner" — two-column intro (copy + framed image).
 */

const FEATURES = [
  "Rotation & travel logistics",
  "Project safety oversight",
  "Cross-border payroll",
  "Dedicated account desk",
];

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
          <div className="relative aspect-[557/460] w-full overflow-hidden bg-neutral-900">
            <Image
              src="/oil-rig.webp"
              alt="Offshore drilling platform at sea"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
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
    </>
  );
}
