"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "./icons";
import type { AboutPageContent } from "./about-content";

type ValueCard = AboutPageContent["values"]["cards"][number];

/**
 * Icon components can't cross the server→client boundary as props, so the CMS
 * stores an icon NAME and it is resolved to a component here.
 */
function resolveIcon(name: string) {
  const map = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return map[name] ?? Icons.IconShield;
}


export default function ValuesCarousel({ cards }: { cards: ValueCard[] }) {
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
        className="no-scrollbar -mx-6 -mb-4 mt-8 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-px-6 px-6 py-4 md:mx-0 md:mb-0 md:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:py-0"
      >
        {cards.map((v, i) => (
          <div
            key={`${v.title}-${i}`}
            className="vcard reveal w-[70%] shrink-0 snap-start p-8 md:w-auto"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            <div className="vnum" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </div>
            <span className="grad chip-glow grid h-11 w-11 place-items-center rounded-xl text-white">
              {(() => {
                const Icon = resolveIcon(v.icon);
                return <Icon className="h-5 w-5" />;
              })()}
            </span>
            <h3 className="mt-5 font-display text-[19px] font-bold text-ink">
              {v.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-body2">
              {v.body}
            </p>
            <div className="vproof">
              <b>{v.proofLead}</b>
              <span className="text-[12.5px] leading-snug text-body2">
                {v.proof}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots — mobile / small-tablet only */}
      <div className="mt-6 flex justify-center gap-2 md:hidden">
        {cards.map((_, i) => (
          <button
            key={`dot-${i}`}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to value ${i + 1}`}
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
