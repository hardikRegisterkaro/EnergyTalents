"use client";

import { useState } from "react";

export type ContactFaqProps = { faqs: { q: string; a: string }[] };


export default function ContactFaq({ faqs }: ContactFaqProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div data-aos="fade-up">
      {faqs.map((f, i) => {
        const isOpen = open.has(i);
        return (
          <div key={f.q} className="border-b border-linec">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-[17px] font-bold text-ink">
                {f.q}
              </span>
              <span aria-hidden className="relative size-3.5 shrink-0">
                <span className="absolute left-0 top-[6px] h-0.5 w-3.5 rounded-full bg-brand" />
                <span
                  className={`absolute left-[6px] top-0 h-3.5 w-0.5 rounded-full bg-brand transition-all ${
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
                <p className="pb-5 font-body text-[15px] leading-relaxed text-body2">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
