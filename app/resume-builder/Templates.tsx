import Image from "next/image";

/**
 * "Template Library" — a staircase cascade of three template previews on the
 * left, copy + a Search Templates button on the right. Light `#f8f9fa` band.
 */
const CARDS = [
  { src: "/resume/template-1.png", mt: "mt-16", ratio: "aspect-[185/262]" },
  { src: "/resume/template-2.png", mt: "mt-8", ratio: "aspect-[185/262]" },
  { src: "/resume/template-3.png", mt: "mt-0", ratio: "aspect-[186/262]" },
];

export default function Templates() {
  return (
    <section
      id="templates"
      className="border-y border-[#ece7e1] bg-[#f8f9fa] px-4 py-16 sm:px-6 md:py-24 lg:px-16"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Cascade */}
        <div className="w-full flex-1" data-aos="fade-up">
          <div className="relative mx-auto flex max-w-[560px] items-start justify-center gap-3 sm:gap-5">
            {CARDS.map((c) => (
              <div
                key={c.src}
                className={`${c.mt} ${c.ratio} w-1/3 max-w-[186px] overflow-hidden rounded-lg border border-black/30 bg-white shadow-[0_18px_36px_-16px_rgba(35,26,20,0.3)]`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={c.src}
                    alt="Resume template preview"
                    fill
                    sizes="186px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div className="w-full flex-1" data-aos="fade-up" data-aos-delay="120">
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
            Template Library
          </p>
          <h2 className="mt-3.5 max-w-[430px] font-jakarta text-[30px] font-bold leading-[1.1] tracking-tight text-[#231a14] sm:text-[38px]">
            One resume builder, hundreds of templates.
          </h2>
          <p className="mt-4 max-w-[440px] font-body text-base leading-relaxed text-[#574c44]">
            Choose from hundreds of professionally designed, ATS-friendly
            templates — thousands of combinations made to help you stand out.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center justify-center rounded-xl border-[1.5px] border-[#b8b0a8] px-6 py-3.5 font-body text-sm font-semibold text-[#231a14] transition-colors hover:border-[#231a14]"
          >
            Search Templates
          </a>
        </div>
      </div>
    </section>
  );
}
