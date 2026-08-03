/**
 * "Success Wall" — a 3×2 grid of testimonial cards (stars, quote, outcome
 * badge, gradient-initials avatar). The badge dot uses currentColor.
 */

const TONES: Record<string, string> = {
  green: "bg-[#e4f5ea] text-[#1c9456]",
  blue: "bg-[#e7effd] text-[#2673d9]",
  orange: "bg-[#fff1e2] text-[#e36a00]",
  purple: "bg-[#efe9fd] text-[#7c5cd6]",
};

const REVIEWS = [
  {
    quote:
      "It’s the only builder that gives a polished resume the bots can still read. I passed the recruiter screen at a top fintech on my first try.",
    badge: "Hired at a top fintech",
    tone: "green",
    initials: "JP",
    name: "Joshua Perk",
    role: "Account Manager · OpenNest",
  },
  {
    quote:
      "Clean, recruiter-friendly and genuinely fast. I stopped getting auto-rejected and started getting calls.",
    badge: "Passed every ATS",
    tone: "blue",
    initials: "AK",
    name: "Aisha Khan",
    role: "Operations Lead · Vantage",
  },
  {
    quote:
      "My interview response rate jumped the moment my ATS score crossed 95. Same experience, totally different results.",
    badge: "+140% response rate",
    tone: "orange",
    initials: "DL",
    name: "David Lin",
    role: "Software Engineer · Cloudwave",
  },
  {
    quote:
      "Went from zero callbacks to five interviews in two weeks. The before/after score made the difference obvious.",
    badge: "5 interviews booked",
    tone: "purple",
    initials: "MB",
    name: "Marcus Bell",
    role: "Sales · Brightline",
  },
  {
    quote:
      "The AI keyword tailor did in two minutes what used to take me a whole evening of guesswork.",
    badge: "4 hrs saved per app",
    tone: "green",
    initials: "TR",
    name: "Tara Reyes",
    role: "Data Analyst · Northbeam",
  },
  {
    quote:
      "Beautiful templates that don’t sabotage you behind the scenes. Landed three offers and picked the best one.",
    badge: "3 offers received",
    tone: "blue",
    initials: "PN",
    name: "Priya Nair",
    role: "UX Designer · Studio Field",
  },
];

const ACCENT_GRADIENT = "linear-gradient(90deg, #ffa800, #ff7a00)";

export default function Reviews() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-16">
      {/* Header */}
      <div data-aos="fade-up" className="mx-auto max-w-[760px] text-center">
        <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
          Success Wall
        </p>
        <h2 className="mt-3.5 font-jakarta text-[28px] font-bold leading-[1.12] tracking-tight text-[#231a14] sm:text-[38px]">
          What do people say about us?
        </h2>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-[1230px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <div
            key={r.name}
            data-aos="fade-up"
            data-aos-delay={`${(i % 3) * 80}`}
            className="flex flex-col rounded-2xl border border-[#ece7e1] bg-white p-6 shadow-[0_14px_17px_-6px_rgba(35,26,20,0.1)]"
          >
            <p className="font-body text-sm font-bold tracking-wide text-[#ffb020]">
              ★★★★★
            </p>
            <p className="flex-1 pb-4 pt-3 font-jakarta text-base font-medium leading-[1.48] text-[#231a14]">
              {r.quote}
            </p>
            <span
              className={`mb-4 inline-flex w-fit items-center gap-[7px] rounded-full px-3 py-1.5 font-body text-[11.5px] font-semibold ${TONES[r.tone]}`}
            >
              <span className="size-[7px] rounded-full bg-current" />
              {r.badge}
            </span>
            <div className="flex items-center gap-3 border-t border-[#ece7e1] pt-4">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full font-body text-[13px] font-semibold text-white"
                style={{ backgroundImage: ACCENT_GRADIENT }}
              >
                {r.initials}
              </span>
              <div className="min-w-0">
                <p className="font-body text-sm font-semibold text-[#231a14]">
                  {r.name}
                </p>
                <p className="font-body text-[12.5px] text-[#9a8e84]">
                  {r.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
