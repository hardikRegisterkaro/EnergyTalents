import PricingCard from "./PricingCard";

/**
 * Resume-builder hero — centered pill, gradient headline, subhead, a billing
 * toggle over two plan cards (Resume Only / Resume + LinkedIn), and a trust
 * line, over a single soft top glow. Adapted from the Insights hero design.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pb-16 pt-14 sm:px-6 md:pb-20 md:pt-20">
      {/* Soft top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 30%, rgba(251,146,60,0.22), rgba(251,146,60,0.06) 55%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[840px] flex-col items-center text-center">
        {/* Pill */}
        <div
          data-aos="fade-up"
          className="inline-flex items-center gap-2 rounded-full border border-[#ffe8d1] bg-[#fff4e8] px-4 py-2 font-body text-[12.5px] font-bold tracking-[0.06em] text-[#ea580c]"
        >
          <span className="size-1.5 rounded-full bg-[#f97316]" />
          RECRUITER-APPROVED · ATS-FRIENDLY
        </div>

        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="mt-6 font-jakarta text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-[#231a14]"
        >
          Build a strikingly powerful
          <br />
          resume{" "}
          <span className="bg-gradient-to-r from-[#fb923c] to-[#ea580c] bg-clip-text text-transparent">
            approved by recruiters
          </span>
        </h1>

        {/* Subhead */}
        <p
          data-aos="fade-up"
          className="mx-auto mt-6 max-w-[560px] font-body text-[17px] leading-relaxed text-[#574c44]"
        >
          Craft a job-winning, ATS-optimized resume in minutes — with AI content
          suggestions, real-time scoring and 100+ recruiter-tested templates.
        </p>

        {/* Pricing (toggle + two plan cards) */}
        <div data-aos="fade-up" className="w-full">
          <PricingCard />
        </div>

        {/* Trust line */}
        <p
          data-aos="fade-up"
          className="mt-8 font-body text-[13.5px] text-stone-400"
        >
          14-day money-back guarantee · cancel anytime · invoicing available
        </p>
      </div>
    </section>
  );
}
