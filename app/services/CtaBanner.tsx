import { RequestModalButton } from "./RequestModal";

/**
 * Closing CTA band — orange gradient, headline left, white contact button
 * right. Stacks on mobile.
 */

export default function CtaBanner() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto flex max-w-[1276px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div data-aos="fade-up" className="flex flex-col gap-3.5">
          <span className="font-jbmono text-xs font-medium uppercase tracking-[0.2em] text-white">
            Build Your Contingent Team
          </span>
          <h2 className="max-w-[640px] font-poppins text-[26px] font-extrabold leading-[1.15] text-white sm:text-[34px] sm:leading-[1.1]">
            Ready to scale your project workforce? Let&rsquo;s build your team
            without boundaries.
          </h2>
        </div>

        <RequestModalButton
          data-aos="fade-up"
          data-aos-delay="100"
          className="inline-flex shrink-0 self-start bg-white px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-100 lg:self-auto"
        >
          [ Contact an Energy HR Consultant → ]
        </RequestModalButton>
      </div>
    </section>
  );
}
