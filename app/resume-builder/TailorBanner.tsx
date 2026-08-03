import Image from "next/image";

/**
 * "Smart Tailoring" — a dark purple gradient banner: framed photo (with a match
 * score chip) on the left, copy + gradient CTA on the right. The corner glow is
 * reproduced in CSS.
 */
const ACCENT_GRADIENT = "linear-gradient(90deg, #ffa800, #ff7a00)";

export default function TailorBanner() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-[1312px]">
        <div
          className="relative overflow-hidden rounded-[24px] px-6 py-10 sm:px-10 md:px-16 md:py-12"
          style={{ backgroundImage: "linear-gradient(90deg, #241f3d, #3b2f63)" }}
        >
          {/* Corner glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-60px] top-1/3 size-[360px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,122,0,0.18), rgba(255,122,0,0) 62%)",
            }}
          />

          <div
            data-aos="fade-up"
            className="relative flex flex-col items-center gap-10 lg:flex-row lg:gap-20"
          >
            {/* Photo */}
            <div
              className="relative aspect-[470/300] w-full max-w-[470px] shrink-0 overflow-hidden rounded-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(147deg, #473d6b 0%, #292145 71%)",
              }}
            >
              <Image
                src="/resume/tailor-photo.png"
                alt="Tailoring a resume to a job description"
                fill
                sizes="470px"
                className="object-cover"
              />
              <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-white px-3 py-[7px] font-body text-[11px] font-semibold text-[#231a14]">
                Match score · 96%
              </span>
            </div>

            {/* Copy */}
            <div className="w-full">
              <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
                Smart Tailoring
              </p>
              <h2 className="mt-3.5 max-w-[420px] font-jakarta text-[28px] font-bold leading-[1.12] tracking-tight text-white sm:text-[34px]">
                Tailor your resume to the job with a single click.
              </h2>
              <p className="mt-3.5 max-w-[440px] font-body text-base leading-relaxed text-[#d6d1e5]">
                Paste any job description and our engine matches your resume to
                the employer&rsquo;s exact requirements — surfacing the keywords
                and skills you need to pass the ATS screening.
              </p>
              <button
                type="button"
                className="mt-6 rounded-xl px-6 py-[15px] font-body text-sm font-semibold text-white shadow-[0_14px_17px_-4px_rgba(255,122,0,0.55)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: ACCENT_GRADIENT }}
              >
                Tailor My Resume Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
