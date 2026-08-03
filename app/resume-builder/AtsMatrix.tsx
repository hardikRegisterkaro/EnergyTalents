/**
 * "What makes us different" — a header over two comparison cards: traditional
 * visual templates (unreadable to the bot) vs our parser-first architecture.
 * All CSS shapes, no assets.
 */

const TRAD_BARS = [
  { w: "81%", c: "bg-[#e5e1dc]" },
  { w: "65%", c: "bg-[#d93f46]" },
  { w: "81%", c: "bg-[#e5e1dc]" },
  { w: "49%", c: "bg-[#d93f46]" },
  { w: "73%", c: "bg-[#e5e1dc]" },
  { w: "57%", c: "bg-[#e5e1dc]" },
];

const STREAM_ROWS = ["76%", "70%", "64%", "73%", "59%"];

function Pill({
  tone,
  mark,
  children,
}: {
  tone: "red" | "green";
  mark: string;
  children: string;
}) {
  const styles =
    tone === "red"
      ? "bg-[#fdeaea] text-[#d93f46]"
      : "bg-[#e4f5ea] text-[#1c9456]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-[7px] font-body ${styles}`}
    >
      <span className="text-[11px] font-bold">{mark}</span>
      <span className="text-xs font-semibold">{children}</span>
    </span>
  );
}

export default function AtsMatrix() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-16">
      {/* Header */}
      <div
        data-aos="fade-up"
        className="mx-auto flex max-w-[820px] flex-col items-center text-center"
      >
        <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
          What makes us different
        </p>
        <h2 className="mt-3.5 font-jakarta text-[28px] font-bold leading-[1.12] tracking-tight text-[#231a14] sm:text-[38px]">
          Engineered to pass the algorithms where other builders fail.
        </h2>
        <p className="mt-4 max-w-[620px] font-body text-[15px] leading-relaxed text-[#574c44]">
          Most builders export pretty layouts that scanners can&rsquo;t read. We
          build clean, parser-first structure underneath every template.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-[1312px] gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Traditional */}
        <div
          data-aos="fade-up"
          className="flex flex-col rounded-2xl border border-[#ece7e1] bg-[#edeae6] p-7"
        >
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#9a8e84]">
            Traditional Visual Templates
          </p>
          <h3 className="mt-1.5 font-jakarta text-[19px] font-bold text-[#231a14]">
            Looks fine to you. Unreadable to the bot.
          </h3>
          <div className="mt-[18px] flex h-[196px] gap-3 overflow-hidden rounded-xl border border-[#ece7e1] bg-white px-4 pb-4 pt-[18px]">
            <div className="grid h-[150px] w-[120px] shrink-0 place-items-center rounded-md border-[1.5px] border-dashed border-[#d93f46] bg-[#d6d1c9]">
              <span className="font-body text-[9px] font-bold uppercase tracking-wide text-[#d93f46]">
                IMG / Table
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[9px]">
              {TRAD_BARS.map((b, i) => (
                <span
                  key={i}
                  className={`h-[7px] rounded-full ${b.c}`}
                  style={{ width: b.w }}
                />
              ))}
            </div>
          </div>
          <div className="mt-[18px] flex flex-wrap gap-2.5">
            <Pill tone="red" mark="✕">
              Unscannable image layer
            </Pill>
            <Pill tone="red" mark="✕">
              Parsing failure risk
            </Pill>
          </div>
        </div>

        {/* Optimized */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="flex flex-col rounded-2xl border-2 border-[#ff7a00] bg-white p-7 shadow-[0_24px_27px_-8px_rgba(255,122,0,0.18)]"
        >
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-[#e36a00]">
            Our Optimized Architecture
          </p>
          <h3 className="mt-1.5 font-jakarta text-[19px] font-bold text-[#231a14]">
            Clean structure the scanner reads perfectly.
          </h3>
          <div className="mt-[18px] flex h-[196px] flex-col gap-2.5 overflow-hidden rounded-xl border border-[#ece7e1] bg-[#f8f9fa] p-4">
            <span className="inline-flex w-fit items-center rounded-md bg-[#fff1e2] px-2 py-[5px] font-body text-[9px] font-bold uppercase tracking-wide text-[#e36a00]">
              UTF-8 Text Stream
            </span>
            <div className="flex flex-col gap-2.5 pt-1.5">
              {STREAM_ROWS.map((w, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-[7px] w-8 shrink-0 rounded-full bg-[#ff7a00]" />
                  <span
                    className="h-[7px] rounded-full bg-[#e5e1dc]"
                    style={{ width: w }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[18px] flex flex-wrap gap-2.5">
            <Pill tone="green" mark="✓">
              100% scanner readable
            </Pill>
            <Pill tone="green" mark="✓">
              Clean keyword indexing
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
