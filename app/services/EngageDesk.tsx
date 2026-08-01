import CtaForms from "../CtaForms";

/**
 * "Two ways to engage the desk" — section header over the shared dual CTA forms
 * (client request + talent pipeline). Reuses the same functional CtaForms used
 * on the home page so the conversion flow stays consistent site-wide.
 */
export default function EngageDesk() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1276px]">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-6 pb-9 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-[1.5px] w-6 bg-orange-500" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                Start a Mobilization
              </span>
            </div>
            <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
              Two ways to engage
              <br />
              the desk
            </h2>
          </div>
          <p className="max-w-sm font-hanken text-base leading-6 text-zinc-600 lg:text-right">
            Clients get an indicative crew plan, mobilization window and rate
            band within one business day. Talent gets matched to live rotations.
          </p>
        </div>

        {/* Shared dual CTA forms */}
        <CtaForms />
      </div>
    </section>
  );
}
