import type { Metadata } from "next";
import Link from "next/link";
import StoryCarousel from "./StoryCarousel";
import ValuesCarousel from "./ValuesCarousel";
import OfficesCarousel from "./OfficesCarousel";
import { IconBolt, IconSun, IconArrowRight } from "./icons";
import { getAboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Energy crewing specialists based in Tamil Nadu, India. We recruit, vet and mobilize skilled technical crews to energy projects worldwide — and stay reachable when a rotation goes sideways.",
  alternates: { canonical: "/about" },
};

/* --------------------------------- data --------------------------------- */







/* ------------------------------- component ------------------------------ */

export default async function AboutPage() {
  // Cached and tagged `about-page`, so a CMS save refreshes this without a
  // redeploy. Falls back to the shipped copy if the CMS is unreachable.
  const c = await getAboutContent();
  const { hero, story, sectors, values, hse, crisis, offices, careers, finalCta } = c;

  return (
    <>
      <main id="top">
        {/* Hero ------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-white pt-14 pb-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 dotbg opacity-60" />
          <div className="relative mx-auto max-w-[1216px] px-6 text-center">
            <span className="reveal inline-flex items-center gap-2 rounded-full border border-linec bg-white px-4 py-2 shadow-[0_6px_20px_-10px_rgba(30,27,22,.2)]">
              <span className="text-[13.5px] text-body2">{hero.badgePrefix}</span>
              <IconBolt className="h-4 w-4 text-brand" />
              <span className="text-[13.5px] font-bold text-ink">
                {hero.badgeStrong}
              </span>
            </span>
            <h1 className="reveal mx-auto mt-7 font-display text-[clamp(1.75rem,4.2vw,2.9rem)] font-bold leading-[1.06] tracking-tight text-ink text-balance">
              {hero.titleLead}
              <br />
              <span className="o-text">{hero.titleAccent}</span> {hero.titleTail}
            </h1>
            <p className="reveal mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-body2">
              {hero.subtitle}
            </p>
            <div className="reveal mt-8 flex justify-center gap-3">
              <Link
                href={hero.ctaPrimary.href}
                className="btn-grad inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold"
              >
                {hero.ctaPrimary.text} <IconArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={hero.ctaSecondary.href}
                className="btn-lift inline-flex items-center rounded-full border border-linec bg-white px-7 py-3.5 text-[15px] font-semibold text-ink hover:border-brand-400"
              >
                {hero.ctaSecondary.text}
              </Link>
            </div>
          </div>
        </section>

        {/* Story carousel (mission + how we work) --------------------- */}
        <section id="story" className="bg-white pb-6">
          <div className="mx-auto max-w-[1216px] px-6">
            <StoryCarousel slides={story.slides} />
          </div>
        </section>

        {/* Every technical role (sectors) ----------------------------- */}
        <section className="bg-cream dotbg overflow-hidden border-y border-linec/60 py-24">
          <div className="mx-auto max-w-[1216px] px-6 text-center">
            <h2 className="reveal font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
              <span className="o-text">{sectors.titleAccent}</span>
              <br />
              {sectors.titleRest}
            </h2>
            <p className="reveal mx-auto mt-5 max-w-[620px] text-[16.5px] leading-relaxed text-body2">
              {sectors.subtitle}
            </p>
            <div className="reveal mt-10 flex justify-center">
              <span
                className="grid h-[86px] w-[86px] place-items-center rounded-[22px] border-[3px] border-[#C9B99F] bg-cream-2 text-brand"
                style={{
                  boxShadow:
                    "0 0 0 6px rgba(249,115,22,.14), 0 0 34px 6px rgba(249,115,22,.35)",
                }}
              >
                <IconSun className="h-9 w-11" />
              </span>
            </div>
          </div>

          <div className="rwrap relative mt-10 grid gap-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream to-transparent" />
            <div className="rrow rrow-l">
              {[...sectors.rolesRowOne, ...sectors.rolesRowOne].map((role, i) => (
                <span key={i} className="rchip">
                  <i />
                  {role}
                </span>
              ))}
            </div>
            <div className="rrow rrow-r">
              {[...sectors.rolesRowTwo, ...sectors.rolesRowTwo].map((role, i) => (
                <span key={i} className="rchip">
                  <i />
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={sectors.cta.href}
              className="btn-lift reveal inline-flex items-center gap-2.5 rounded-full border border-linec bg-white px-7 py-3.5 text-[15px] font-bold text-ink shadow-sm hover:border-brand-400"
            >
              {sectors.cta.text} <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Values ----------------------------------------------------- */}
        <section id="values" className="bg-cream dotbg border-y border-linec/60 py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="text-center">
              <span className="grad chip-glow reveal inline-block rounded-full px-4 py-1.5 text-[12.5px] font-bold text-white">
                {values.badge}
              </span>
              <h2 className="reveal mt-5 font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                {values.titleLead}
                <br />
                <span className="o-text">{values.titleAccent}</span>
              </h2>
            </div>
            <ValuesCarousel cards={values.cards} />
          </div>
        </section>

        {/* HSE protocols ---------------------------------------------- */}
        <section id="hse" className="bg-white py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  {hse.kicker}
                </div>
                <h2 className="reveal mt-3 max-w-[620px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  {hse.titleLead}{" "}
                  <span className="o-text">{hse.titleAccent}</span>
                </h2>
              </div>
              <p className="reveal max-w-[420px] text-[15px] leading-relaxed text-body2">
                {hse.intro}
              </p>
            </div>

            <div className="mt-11 grid overflow-hidden rounded-[18px] border border-linec bg-linec md:grid-cols-2 lg:grid-cols-4 gap-px">
              {hse.protocols.map((p, i) => (
                <div key={`${p.title}-${i}`} className="hse-tile bg-white p-7">
                  <div className="text-[11.5px] font-bold uppercase tracking-[.14em] text-stone-400">
                    {hse.protocolLabel} {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crisis management ------------------------------------------ */}
        <section id="crisis" className="bg-white py-20 md:py-24 border-t border-linec/60">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  {crisis.kicker}
                </div>
                <h2 className="reveal mt-3 max-w-[620px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  {crisis.titleLead}{" "}
                  <span className="o-text">{crisis.titleAccent}</span>
                </h2>
              </div>
              <p className="reveal max-w-[420px] text-[15px] leading-relaxed text-body2">
                {crisis.intro}
              </p>
            </div>

            <ol className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {crisis.steps.map((c, i) => (
                <li
                  key={`${c.title}-${i}`}
                  className="crisis-step reveal"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <span className="crisis-num grid h-[46px] w-[46px] place-items-center rounded-xl border border-linec bg-white font-display text-[16px] font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink">
                    {c.title}
                  </h3>
                  <div className="mt-1 text-[11.5px] font-bold o-text">
                    {c.when}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {c.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="card softshadow mt-5 grid gap-6 p-7 sm:grid-cols-3">
              {crisis.stats.map((s, i) => (
                <MiniStat key={`${s.big}-${i}`} big={s.big} small={s.small} />
              ))}
            </div>
          </div>
        </section>

        {/* Office ----------------------------------------------------- */}
        <section
          id="offices"
          className="bg-cream py-24 border-y border-linec/60"
        >
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="text-center">
              <span className="grad chip-glow reveal inline-block rounded-full px-4 py-1.5 text-[12.5px] font-bold text-white">
                {offices.badge}
              </span>
              <h2 className="reveal mt-5 font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                {offices.titleLead} <span className="o-text">{offices.titleAccent}</span>
              </h2>
            </div>
            <OfficesCarousel hubs={offices.hubs} />
          </div>
        </section>

        {/* Careers ---------------------------------------------------- */}
        <section id="careers" className="bg-white py-24">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="reveal text-[12px] font-bold uppercase tracking-[.18em] o-text">
                  {careers.kicker}
                </div>
                <h2 className="reveal mt-3 max-w-[560px] font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.12] tracking-tight text-ink">
                  {careers.title}
                </h2>
              </div>
              <p className="reveal max-w-[400px] text-[15px] leading-relaxed text-body2">
                {careers.intro}
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {careers.jobs.map((r, i) => (
                <Link
                  key={`${r.title}-${i}`}
                  href={r.href}
                  className="card softshadow reveal block p-6 transition-colors hover:border-brand-400"
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11.5px] font-bold text-brand">
                      {r.where}
                    </span>
                    <span className="text-stone-400" aria-hidden>
                      ›
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
                    {r.body}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href={careers.cta.href}
                className="btn-lift inline-flex items-center gap-2 rounded-full border border-linec bg-white px-6 py-3 text-[14.5px] font-bold text-ink shadow-sm hover:border-brand-400"
              >
                {careers.cta.text} <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA -------------------------------------------------- */}
        <section className="bg-white pb-20">
          <div className="mx-auto max-w-[1216px] px-6">
            <div className="grad-deep dotbg-dark reveal grid items-center gap-9 overflow-hidden rounded-[26px] p-9 text-white lg:grid-cols-2 lg:p-12">
              <div>
                <h2 className="font-display text-[clamp(1.6rem,3vw,2.375rem)] font-bold leading-[1.1] tracking-tight">
                  {finalCta.title}
                </h2>
                <p className="mt-4 max-w-[430px] text-[15.5px] leading-relaxed text-white/90">
                  {finalCta.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={finalCta.ctaPrimary.href}
                  className="btn-lift inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[14.5px] font-bold"
                >
                  <span className="o-text inline-flex items-center gap-2">
                    {finalCta.ctaPrimary.text} <IconArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href={finalCta.ctaSecondary.href}
                  className="btn-lift inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-white/10"
                >
                  {finalCta.ctaSecondary.text}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ------------------------------ sub-components --------------------------- */

function MiniStat({ big, small }: { big: string; small: string }) {
  return (
    <div>
      <p className="font-display text-[26px] font-bold leading-none o-text">
        {big}
      </p>
      <p className="mt-2 text-[13.5px] leading-snug text-body2">{small}</p>
    </div>
  );
}
