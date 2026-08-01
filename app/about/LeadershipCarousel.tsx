"use client";

import { useEffect, useRef, useState } from "react";

type Leader = {
  initials: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
};

export default function LeadershipCarousel({
  leaders,
}: {
  leaders: Leader[];
}) {
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
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
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
        className="no-scrollbar -mx-6 -mb-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 py-4 sm:mx-0 sm:mb-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:py-0 lg:grid-cols-4"
      >
        {leaders.map((l, i) => (
          <article
            key={l.name}
            tabIndex={0}
            className="lead-card reveal grad-deep w-[70%] shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 sm:w-auto"
            style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
          >
            {/* Initials stand in for the portrait photo */}
            <span className="portrait grid place-items-center bg-transparent font-display text-[64px] font-bold text-white/25">
              {l.initials}
            </span>
            <span className="shade" />
            <span className="tint" />
            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white backdrop-blur-md">
              {l.tag}
            </span>
            <div className="meta text-white">
              <div className="bar" />
              <h3 className="font-display text-[20px] font-bold leading-tight">
                {l.name}
              </h3>
              <p className="mt-0.5 text-[13px] font-semibold text-white/85">
                {l.role}
              </p>
              <p className="bio text-[13.5px] leading-relaxed text-white/90">
                {l.bio}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination dots — mobile only */}
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {leaders.map((l, i) => (
          <button
            key={l.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${l.name}`}
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
