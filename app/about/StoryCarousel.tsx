"use client";

import { useCallback, useEffect, useState } from "react";
import type { StorySlide } from "./about-content";

/** Fake browser-window chrome shared by both slides. */
function WindowBar({ badge }: { badge: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-linec/70 px-5 py-3.5">
      <span className="flex gap-1.5">
        <i className="block h-2.5 w-2.5 rounded-full bg-stone-200" />
        <i className="block h-2.5 w-2.5 rounded-full bg-stone-200" />
        <i className="block h-2.5 w-2.5 rounded-full bg-stone-200" />
      </span>
      <span className="h-7 flex-1 rounded-md bg-stone-100" />
      <span className="grad whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] font-bold text-white">
        {badge}
      </span>
    </div>
  );
}

export default function StoryCarousel({ slides }: { slides: StorySlide[] }) {
  // Slide count is whatever the CMS supplies — wrap-around, dots, keyboard
  // arrows and auto-advance all derive from it.
  const count = slides.length;
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex(count > 0 ? ((next % count) + count) % count : 0);
  }, [count]);

  // Keyboard arrows when the carousel region is focused
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  };

  // Auto-advance, pausing on hover/focus and when reduced motion is requested.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => go(index + 1), 7000);
    return () => window.clearInterval(t);
  }, [index, paused, go]);

  return (
    <div
      className="relative reveal"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our story"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute -left-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute -right-4 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        →
      </button>

      <div className="overflow-hidden rounded-[26px]">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, si) => (
            <div
              key={`${slide.badge}-${si}`}
              className="grad-deep dotbg-dark relative w-full shrink-0 overflow-hidden"
              aria-hidden={index !== si}
            >
              <div className="grid min-h-[480px] gap-8 p-8 lg:grid-cols-[0.42fr_0.58fr] lg:p-10">
                <div className="flex flex-col justify-center">
                  <span className="self-start rounded-full bg-white/20 px-3.5 py-1.5 text-[12.5px] font-semibold text-white">
                    {slide.badge}
                  </span>
                  <h2 className="mt-5 whitespace-pre-line font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.08] text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-white/85">
                    {slide.body}
                  </p>
                  {slide.links.length > 0 && (
                    <div className="mt-7 flex gap-3">
                      {slide.links.map((l, li) => (
                        <a
                          key={`${l.href}-${li}`}
                          href={l.href}
                          className={
                            li === 0
                              ? "btn-lift rounded-lg bg-white px-5 py-3 text-[14px] font-bold text-brand"
                              : "btn-lift rounded-lg border border-white/50 px-5 py-3 text-[14px] font-semibold text-white hover:bg-white/10"
                          }
                        >
                          {l.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-xl bg-white shadow-2xl lg:absolute lg:inset-x-0 lg:-bottom-2 lg:top-2">
                    <WindowBar badge={slide.windowBadge} />

                    {slide.panel === "steps" ? (
                      <div className="grid gap-2.5 p-4">
                        {slide.steps.map((t, i) => (
                          <div
                            key={`${t.title}-${i}`}
                            className="flex items-center gap-4 rounded-xl border border-linec p-3"
                          >
                            <span className="w-10 shrink-0 text-[12px] font-bold text-brand">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <div className="text-[14.5px] font-bold text-ink">{t.title}</div>
                              <div className="mt-0.5 text-[12.5px] text-body2">{t.body}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-3.5 p-5 sm:grid-cols-2">
                        {slide.regions.map((h, i) => (
                          <div
                            key={`${h.city}-${i}`}
                            className="rounded-xl border border-linec p-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11.5px] font-semibold text-stone-500">
                                {h.tag}
                              </span>
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            </div>
                            <div className="mt-2 text-[15px] font-bold text-ink">{h.city}</div>
                            <div className="mt-0.5 text-[12.5px] text-body2">{h.desk}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "grad w-6" : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
