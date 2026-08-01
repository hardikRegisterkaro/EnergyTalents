"use client";

import { useEffect, useRef, useState } from "react";

type Hub = {
  tag: string;
  city: string;
  addr: string;
  desk: string;
  coords: string;
};

export default function OfficesCarousel({ hubs }: { hubs: Hub[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track which card is centered in the mobile scroller to light the right dot.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const elRect = el.getBoundingClientRect();
      const center = elRect.left + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const target =
      card.getBoundingClientRect().left -
      el.getBoundingClientRect().left +
      el.scrollLeft -
      24; // matches scroll-padding-left (px-6)
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-6 -mb-4 mt-8 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-px-6 px-6 py-4 sm:mx-0 sm:mb-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-4"
      >
        {hubs.map((h, i) => (
          <div
            key={h.city}
            className="card reveal w-[70%] shrink-0 snap-start p-6 sm:w-auto"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div
              className={`text-[11.5px] font-bold uppercase tracking-wider ${
                i === 0 ? "text-brand" : "text-stone-400"
              }`}
            >
              {h.tag}
            </div>
            <h3 className="mt-1.5 font-display text-[18px] font-bold text-ink">
              {h.city}
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-body2">
              {h.addr}
              <br />
              {h.desk}
            </p>
            <p className="mt-4 border-t border-linec pt-4 text-[12.5px] text-body2">
              {h.coords}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination dots — mobile only */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {hubs.map((h, i) => (
          <button
            key={h.city}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${h.city}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "grad w-6" : "w-2 bg-linec"
            }`}
          />
        ))}
      </div>
    </>
  );
}
