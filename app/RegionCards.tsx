"use client";

import Link from "next/link";
import { useCarousel } from "./useCarousel";

/**
 * Geographic operations — four region cards (image + black label desk). On
 * mobile it's a swipeable scroll-snap carousel with pagination dots; at sm it
 * becomes a 2-up grid and at lg a 4-across grid. No hover stretch (each card
 * holds its width so real photography won't distort) — just a gentle uniform
 * zoom + arrow nudge on hover. Gradient placeholders stand in for photography.
 */

type Region = {
  title: string;
  bg: string;
};

const REGIONS: Region[] = [
  {
    title: "The Americas",
    bg: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url('/america.webp')",
  },
  {
    title: "Middle East\n& Africa",
    bg: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url('/middleEast.webp')",
  },
  {
    title: "Europe\n& North Sea",
    bg: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url('/europe.webp')",
  },
  {
    title: "Asia-Pacific",
    bg: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%), url('/asia.webp')",
  },
];

export default function RegionCards() {
  const { scrollerRef, active, goTo } = useCarousel();

  return (
    <>
      {/* Header */}
      <div data-aos="fade-up">
        <div className="flex items-center gap-3.5">
          <span className="h-[1.5px] w-10 bg-orange-500" />
          <span className="font-jbmono text-xs uppercase tracking-[0.2em] text-orange-500">
            Geographic Operations
          </span>
        </div>
        <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
          Regions we operate in
        </h2>
      </div>

      {/* Cards — mobile carousel → grid at sm/lg */}
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-4 -mb-4 mt-10 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-px-4 px-4 py-4 sm:mx-0 sm:mb-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0 lg:mt-12 lg:grid-cols-4"
      >
        {REGIONS.map((r) => (
          <Link
            key={r.title}
            href="/careers#roles"
            data-aos="fade-up"
            className="group relative block h-[420px] w-[72%] shrink-0 snap-start overflow-hidden outline outline-1 -outline-offset-1 outline-stone-200 sm:w-auto"
          >
            {/* Background (gradient placeholder) */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: r.bg }}
            />

            {/* Label desk — fixed height so 1- and 2-line titles align */}
            <div className="absolute inset-x-0 bottom-0 flex h-32 flex-col justify-between bg-black p-6">
              <h3 className="whitespace-pre-line font-archivo text-xl font-bold leading-7 text-white">
                {r.title}
              </h3>
              <span className="inline-flex self-start items-center gap-6 border-b border-amber-500/60 pb-1 font-jbmono text-xs tracking-tight text-amber-400">
                <span className="whitespace-nowrap">
                  Explore Regional Workforce
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination dots — mobile only */}
      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        {REGIONS.map((r, i) => (
          <button
            key={r.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${r.title.replace("\n", " ")}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "grad w-6" : "w-2 bg-stone-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}
