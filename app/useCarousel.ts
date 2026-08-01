"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared mobile scroll-snap carousel state (matches the About page carousels):
 * tracks which card is centered to light the right dot, and scrolls to a given
 * index. `padLeft` should match the scroller's scroll-padding-left.
 */
export function useCarousel(padLeft = 16) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.getBoundingClientRect().left + el.clientWidth / 2;
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
      padLeft;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return { scrollerRef, active, goTo };
}
