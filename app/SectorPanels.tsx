"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarousel } from "./useCarousel";
import { INDUSTRIES } from "./industry/industries";

/**
 * Industry Sectors — a row of image panels linking to each sector's page. On
 * mobile it's a swipeable scroll-snap carousel with pagination dots; at sm it
 * becomes a 2-up grid and at lg a 4-across grid. Descriptions reveal on hover
 * (desktop) and stay visible on touch.
 *
 * The sectors themselves live in industry/industries.ts, shared with the pages
 * they link to so a card and its page cannot describe the same sector
 * differently.
 */


/** Darkening scrim over the photo so the index + label stay legible. */
const SCRIM =
  "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0.55) 100%)";

export default function SectorPanels() {
  const { scrollerRef, active, goTo } = useCarousel();

  return (
    <>
      {/* Header */}
      <div
        data-aos="fade-up"
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-10 bg-orange-500" />
            <span className="font-jbmono text-xs uppercase tracking-[0.24em] text-orange-500">
              Industry Sectors
            </span>
          </div>
          <h2 className="mt-5 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[38px] sm:leading-[1.1]">
            The crews that power
            <br />
            every energy sector
          </h2>
        </div>
        <p className="max-w-sm font-plex text-base leading-6 text-stone-600 lg:text-right">
          Dedicated talent pools, pre-vetted and deployment-ready. Hover a sector
          to expand its desk.
        </p>
      </div>

      {/* Panels — mobile carousel → grid at sm/lg */}
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-4 -mb-4 mt-10 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-px-4 px-4 py-4 sm:mx-0 sm:mb-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:py-0 lg:mt-12 lg:grid-cols-4 lg:gap-3"
      >
        {INDUSTRIES.map((s) => (
          <Link
            key={s.n}
            href={`/industry/${s.slug}`}
            data-aos="fade-up"
            className="group relative block h-[400px] w-[72%] shrink-0 snap-start overflow-hidden outline outline-1 -outline-offset-1 outline-stone-200 sm:w-auto lg:h-[560px]"
          >
            {/* Sector photo (optimized) + scrim overlay */}
            <Image
              src={s.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 72vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: s.pos }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: SCRIM }}
            />

            {/* Index */}
            <span className="absolute left-4 top-4 font-jbmono text-xs text-white/90">
              {s.n}
            </span>

            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 bg-black p-5">
              <h3 className="whitespace-pre-line font-archivo text-lg font-bold leading-6 text-white">
                {s.cardTitle}
              </h3>
              <p className="overflow-hidden font-plex text-xs leading-5 text-white/80 transition-all duration-500 ease-out mt-2.5 max-h-24 opacity-100 lg:mt-0 lg:max-h-0 lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                {s.body}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination dots — mobile only */}
      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        {INDUSTRIES.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.title}`}
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
