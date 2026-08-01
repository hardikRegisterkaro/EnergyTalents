"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Shared scroll-reveal engine (AOS-style) for the whole site.
 *
 * Rendered once in the root layout, so every page gets the same "simple but
 * premium" fade-up-on-scroll. It reveals both `.reveal` elements and
 * AOS-style `[data-aos]` elements, honours `data-aos-delay`, animates
 * `.counter[data-target]` count-ups, and re-scans on client-side navigation.
 *
 * Degrades gracefully: the hidden state is gated behind `[data-reveal-ready]`
 * on <html> (set here), so no-JS users / crawlers always see content.
 */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Arm the CSS hidden state only now that JS is confirmed running.
    document.documentElement.setAttribute("data-reveal-ready", "");

    const selector = ".reveal:not(.is-in), [data-aos]:not(.is-in)";
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const counters = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".counter[data-target]:not(.counting)",
      ),
    );

    // Apply AOS-style per-element delay.
    els.forEach((el) => {
      const delay = el.dataset.aosDelay;
      if (delay) el.style.transitionDelay = `${delay}ms`;
    });

    if (reduce) {
      els.forEach((el) => el.classList.add("is-in"));
      return; // counters keep their server-rendered final value
    }

    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const runCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      const decimals = (el.dataset.target || "").includes(".")
        ? (el.dataset.target!.split(".")[1]?.length ?? 0)
        : 0;
      const duration = 1600;
      const start = performance.now();
      const format = (v: number) =>
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) + suffix;

      el.classList.add("counting");
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p); // easeOutExpo
        el.textContent = format(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = format(target);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          if (el.classList.contains("counter") && el.dataset.target) {
            runCounter(el);
          }
          obs.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    // Anything already on screen reveals immediately (no flash for the hero).
    els.forEach((el) => {
      if (inView(el)) el.classList.add("is-in");
      else io.observe(el);
    });
    counters.forEach((el) => {
      el.textContent = "0" + (el.dataset.suffix ?? "");
      if (inView(el)) runCounter(el);
      else io.observe(el);
    });

    return () => io.disconnect();
    // Re-scan whenever the route changes so the next page's elements animate.
  }, [pathname]);

  return null;
}
