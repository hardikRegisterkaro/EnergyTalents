import Image from "next/image";

/**
 * "The Builder" — copy on the left, and a mockup on the right of two overlapping
 * resume-template cards with a dark phone showing the live editor + AI chip.
 */
export default function Builder() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-14 lg:flex-row lg:gap-16">
        {/* Copy */}
        <div className="w-full flex-1" data-aos="fade-up">
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
            The Builder
          </p>
          <h2 className="mt-3.5 max-w-[490px] font-jakarta text-[30px] font-bold leading-[1.1] tracking-tight text-[#231a14] sm:text-[38px]">
            A feature-packed resume builder that makes resume creation a breeze.
          </h2>
          <p className="mt-4 max-w-[450px] font-body text-base leading-relaxed text-[#574c44]">
            Our builder guides you through the process — with content
            suggestions, smart formatting and the right layout, while you focus
            on what matters.
          </p>
          <a
            href="#templates"
            className="mt-6 inline-block border-b-2 border-[#ff7a00] pb-0.5 font-body text-[15px] font-semibold text-[#e36a00] transition-colors hover:text-[#ff7a00]"
          >
            Explore features →
          </a>
        </div>

        {/* Mockup */}
        <div className="w-full flex-1" data-aos="fade-up" data-aos-delay="120">
          <div className="relative mx-auto w-full max-w-[540px] pb-10 sm:pb-14">
            {/* Two template cards */}
            <div className="flex justify-end gap-4 pl-14 sm:pl-24">
              <div className="relative aspect-[224/317] w-[46%] overflow-hidden rounded-xl border border-[#231a14] shadow-[0_20px_40px_-14px_rgba(35,26,20,0.28)]">
                <Image
                  src="/resume/template-1.png"
                  alt="Resume template preview"
                  fill
                  sizes="250px"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[222/314] w-[46%] overflow-hidden rounded-xl border border-[#231a14] shadow-[0_20px_40px_-14px_rgba(35,26,20,0.28)]">
                <Image
                  src="/resume/template-2.png"
                  alt="Resume template preview"
                  fill
                  sizes="250px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Phone editor overlay */}
            <div className="absolute bottom-0 left-0 w-[44%] max-w-[208px] rounded-[28px] bg-[#231a14] p-2 shadow-[0_24px_28px_-6px_rgba(35,26,20,0.35)]">
              <div className="overflow-hidden rounded-[20px] bg-white">
                <div className="flex justify-center bg-[#f8f9fa] py-2">
                  <div className="h-1.5 w-14 rounded-full bg-[#e5e1dc]" />
                </div>
                <div className="p-4">
                  <p className="font-body text-[10px] font-bold uppercase tracking-wide text-[#e36a00]">
                    Editing · Summary
                  </p>
                  <div className="mt-2 flex flex-col gap-[7px] rounded-[10px] border-2 border-[#ff7a00] p-2.5">
                    <div className="h-1.5 w-[80%] rounded-full bg-[#e5e1dc]" />
                    <div className="h-1.5 w-[64%] rounded-full bg-[#e5e1dc]" />
                    <div className="h-1.5 w-[48%] rounded-full bg-[#e5e1dc]" />
                  </div>
                  <div className="mt-3 inline-flex rounded-lg bg-[#fff1e2] px-2.5 py-2">
                    <span className="font-body text-[10px] font-semibold text-[#e36a00]">
                      ✦ AI suggestion ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
