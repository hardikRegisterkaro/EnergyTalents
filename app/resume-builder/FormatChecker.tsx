/**
 * "Format Auditor" — copy + gradient CTA on the left, and a mock audit panel on
 * the right (score header + skeleton doc, floating ✓ chips and an AI suggestion
 * card). All CSS shapes, no assets.
 */

const ACCENT_GRADIENT = "linear-gradient(90deg, #ffa800, #ff7a00)";

// [width, tall?, dark? / accent?]
const G1 = [
  { w: "66%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "100%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "86%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "72%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "54%", h: "h-2", c: "bg-[#ff7a00]" },
  { w: "100%", h: "h-1.5", c: "bg-[#e5e1dc]" },
];
const G2 = [
  { w: "33%", h: "h-2", c: "bg-[#231a14]" },
  { w: "100%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "100%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "66%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "33%", h: "h-2", c: "bg-[#231a14]" },
  { w: "100%", h: "h-1.5", c: "bg-[#e5e1dc]" },
  { w: "80%", h: "h-1.5", c: "bg-[#e5e1dc]" },
];

function CheckChip({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center gap-2 rounded-[10px] border border-[#ece7e1] bg-white px-3 py-2.5 shadow-[0_12px_15px_-4px_rgba(35,26,20,0.16)] ${className}`}
    >
      <span className="grid size-5 place-items-center rounded-full bg-[#e4f5ea] text-[10px] font-bold text-[#1c9456]">
        ✓
      </span>
      <span className="whitespace-nowrap font-body text-xs font-medium text-[#231a14]">
        {children}
      </span>
    </div>
  );
}

export default function FormatChecker() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-14 lg:flex-row lg:gap-16">
        {/* Copy */}
        <div className="w-full flex-1" data-aos="fade-up">
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
            Format Auditor
          </p>
          <h2 className="mt-3.5 max-w-[480px] font-jakarta text-[30px] font-bold leading-[1.1] tracking-tight text-[#231a14] sm:text-[38px]">
            Check your resume for formatting and applicant-tracking mistakes.
          </h2>
          <p className="mt-4 max-w-[450px] font-body text-base leading-relaxed text-[#574c44]">
            Run your resume through our live auditor — it flags broken
            formatting, risky fonts and missing keywords, then suggests fixes in
            plain language as you edit.
          </p>
          <button
            type="button"
            className="mt-6 rounded-xl px-6 py-[15px] font-body text-sm font-semibold text-white shadow-[0_14px_17px_-4px_rgba(255,122,0,0.5)] transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: ACCENT_GRADIENT }}
          >
            Run Format Audit
          </button>
        </div>

        {/* Mockup */}
        <div className="w-full flex-1" data-aos="fade-up" data-aos-delay="120">
          <div className="relative mx-auto w-full max-w-[520px] pb-14 pt-2">
            {/* Audit card */}
            <div className="rounded-2xl border border-[#ece7e1] bg-white p-6 shadow-[0_24px_30px_-8px_rgba(35,26,20,0.16)]">
              <div className="flex items-center justify-between border-b border-[#ece7e1] pb-[18px]">
                <span className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#9a8e84]">
                  Format Audit
                </span>
                <span className="font-body text-xs font-bold uppercase tracking-wide text-[#ff7a00]">
                  Score 91/100
                </span>
              </div>
              <div className="flex gap-4 pt-[18px]">
                <div className="flex w-[110px] shrink-0 flex-col gap-2 sm:w-[130px]">
                  {G1.map((b, i) => (
                    <span
                      key={i}
                      className={`${b.h} rounded-full ${b.c}`}
                      style={{ width: b.w }}
                    />
                  ))}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  {G2.map((b, i) => (
                    <span
                      key={i}
                      className={`${b.h} rounded-full ${b.c}`}
                      style={{ width: b.w }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating check chips */}
            <CheckChip className="left-0 top-[18%] sm:-left-3">
              Header parsed cleanly
            </CheckChip>
            <CheckChip className="right-1 top-[30%] sm:-right-2">
              Dates formatted
            </CheckChip>

            {/* Suggestion card */}
            <div
              className="absolute bottom-0 right-0 z-10 w-[260px] max-w-[86%] rounded-xl p-4 shadow-[0_20px_23px_-6px_rgba(255,122,0,0.45)]"
              style={{ backgroundImage: ACCENT_GRADIENT }}
            >
              <div className="flex items-center gap-1.5 font-body font-bold text-white">
                <span className="text-xs">✦</span>
                <span className="text-[10px] uppercase tracking-wider">
                  Suggestion
                </span>
              </div>
              <p className="mt-2 font-body text-[13px] font-medium leading-snug text-white">
                Add &ldquo;Agile Delivery&rdquo; to match the target job
                description.
              </p>
              <button
                type="button"
                className="mt-3 rounded-lg bg-white px-3 py-1.5 font-body text-xs font-semibold text-[#e36a00]"
              >
                Apply fix
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
