"use client";

import { useState } from "react";

/**
 * Resume-builder FAQ — a centered accordion. Rows toggle independently (first
 * open by default); the orange +/− marker is CSS (the vertical bar fades out
 * when open).
 */
export type ResumeFaqProps = { faqs: { q: string; a: string }[] };


export default function FaqSection({ faqs }: ResumeFaqProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[768px]">
        <h2
          data-aos="fade-up"
          className="text-center font-jakarta text-[28px] font-bold tracking-tight text-[#231a14] sm:text-[36px]"
        >
          Frequently asked questions
        </h2>

        <div data-aos="fade-up" className="mt-8">
          {faqs.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={f.q} className="border-b border-[#ece7e1]">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-jakarta text-[17px] font-bold text-[#231a14]">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="relative size-3.5 shrink-0"
                  >
                    <span className="absolute left-0 top-[6px] h-0.5 w-3.5 rounded-full bg-[#ff7a00]" />
                    <span
                      className={`absolute left-[6px] top-0 h-3.5 w-0.5 rounded-full bg-[#ff7a00] transition-all ${
                        isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                      }`}
                    />
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-[720px] pb-5 font-body text-[15px] leading-relaxed text-[#574c44]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
