import NewsletterForm from "./NewsletterForm";

/** The dark "The Brief" newsletter band — shared by the blog index and every
 *  article page. Anchored as #brief so in-page "Subscribe" links can reach it. */
export default function TheBrief() {
  return (
    <section
      id="brief"
      className="relative scroll-mt-16 overflow-hidden bg-neutral-900 py-16 md:py-20"
    >
      {/* Orange glow, bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-40%] right-[-6%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(234,88,12,0.30), rgba(234,88,12,0) 60%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1276px] flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div data-aos="fade-up">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-6 bg-orange-500" />
            <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
              The brief
            </span>
          </div>
          <h2 className="mt-5 font-poppins text-3xl font-extrabold text-white sm:text-4xl">
            Field notes, every fortnight.
          </h2>
          <p className="mt-4 font-plex text-base leading-6 text-gray-400">
            Workforce intelligence for energy operators and crew — no fluff, no
            spam.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={100}
          className="w-full lg:w-auto"
        >
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
