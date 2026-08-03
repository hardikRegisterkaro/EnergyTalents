/**
 * "Before & After" — a rejected (42%) vs recruiter-approved (98%) resume score
 * comparison, with an AI-optimize arrow between. All CSS, no assets.
 */
const ACCENT_GRADIENT = "linear-gradient(90deg, #ffa800, #ff7a00)";

export default function BeforeAfter() {
  return (
    <section className="border-y border-[#ece7e1] bg-[#f8f9fa] px-4 py-16 sm:px-6 md:py-24">
      {/* Header */}
      <div
        data-aos="fade-up"
        className="mx-auto max-w-[760px] text-center"
      >
        <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
          Before &amp; After
        </p>
        <h2 className="mt-3.5 font-jakarta text-[28px] font-bold leading-[1.12] tracking-tight text-[#231a14] sm:text-[38px]">
          Watch a resume go from rejected to recruiter-approved.
        </h2>
      </div>

      {/* Comparison */}
      <div className="mx-auto mt-12 flex max-w-[1180px] flex-col items-center gap-6 lg:flex-row lg:justify-center">
        {/* Before */}
        <div
          data-aos="fade-up"
          className="w-full max-w-[540px] flex-1 rounded-2xl border border-[#ece7e1] bg-white p-7"
        >
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-[#9a8e84]">
            Before — Unoptimized
          </p>
          <div className="mt-3.5 flex items-center gap-4">
            <span className="font-jakarta text-[48px] font-bold leading-none tracking-tight text-[#d93f46] sm:text-[54px]">
              42%
            </span>
            <div>
              <p className="font-body text-[15px] font-semibold text-[#231a14]">
                Current Match Rating
              </p>
              <span className="mt-2 inline-flex rounded-full bg-[#fdeaea] px-2.5 py-[5px] font-body text-[11px] font-bold uppercase tracking-wide text-[#d93f46]">
                High Risk
              </span>
            </div>
          </div>
          <div className="mt-[18px] h-2 w-full rounded-full bg-[#e2ded9]">
            <div
              className="h-2 rounded-full bg-[#d93f46]"
              style={{ width: "42%" }}
            />
          </div>
          <p className="mt-4 font-body text-[13.5px] leading-normal text-[#574c44]">
            Keywords missing · non-standard headings · parsing errors detected.
          </p>
        </div>

        {/* Arrow */}
        <div
          data-aos="fade-up"
          className="flex shrink-0 flex-col items-center gap-2.5"
        >
          <div
            className="grid size-14 place-items-center rounded-full shadow-[0_10px_13px_-3px_rgba(255,122,0,0.5)]"
            style={{ backgroundImage: ACCENT_GRADIENT }}
          >
            <span className="rotate-90 text-2xl font-bold text-white lg:rotate-0">
              →
            </span>
          </div>
          <span className="font-body text-[10px] font-bold uppercase tracking-wider text-[#e36a00]">
            AI Optimize
          </span>
        </div>

        {/* After */}
        <div
          data-aos="fade-up"
          className="w-full max-w-[540px] flex-1 overflow-hidden rounded-2xl border-2 border-[#ff7a00] bg-white shadow-[0_24px_54px_-20px_rgba(255,122,0,0.22)]"
        >
          <div
            className="py-2.5 text-center"
            style={{ backgroundImage: ACCENT_GRADIENT }}
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              ✓&nbsp; Recruiter Approved
            </span>
          </div>
          <div className="px-7 py-6">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.08em] text-[#e36a00]">
              After — Optimized
            </p>
            <div className="mt-3.5 flex items-center gap-4">
              <span className="font-jakarta text-[48px] font-bold leading-none tracking-tight text-[#1c9456] sm:text-[54px]">
                98%
              </span>
              <div>
                <p className="font-body text-[15px] font-semibold text-[#231a14]">
                  Optimized Match Rating
                </p>
                <span className="mt-2 inline-flex rounded-full bg-[#e4f5ea] px-2.5 py-[5px] font-body text-[11px] font-bold uppercase tracking-wide text-[#1c9456]">
                  Recruiter Approved
                </span>
              </div>
            </div>
            <div className="mt-[18px] h-2 w-full rounded-full bg-[#e2ded9]">
              <div
                className="h-2 rounded-full bg-[#ff7a00]"
                style={{ width: "98%" }}
              />
            </div>
            <p className="mt-4 font-body text-[13.5px] leading-normal text-[#574c44]">
              Keywords matched · clean structure · fully ATS-readable export.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
