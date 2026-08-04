"use client";

import { useState } from "react";
import { RequestModalButton } from "./RequestModal";

/**
 * "Common Questions" — a sticky pitch + CTA on the left and an interactive FAQ
 * accordion on the right. Each row toggles independently (multiple can be open);
 * item 01 starts open. The +/− marker is CSS-only (the vertical bar fades out
 * when the row is open).
 */

const FAQS = [
  {
    q: "How fast can you mobilize a crew?",
    a: "For pre-vetted disciplines we return an indicative, compliance-checked shortlist within 72 hours. Full mobilization — visas, medicals, travel and onboarding — typically completes in 2–4 weeks depending on jurisdiction.",
  },
  {
    q: "Who is the legal employer of the contractors?",
    a: "We are. Through our owned local entities in 80+ regions, Energy Talents acts as the legal employer of record — carrying tax, statutory and co-employment liability so your business never does.",
  },
  {
    q: "What disciplines and certifications do you cover?",
    a: "Every technical niche the energy sector demands — from DP operators, ROV pilots and subsea welders to commissioning leads, HSE managers and wind techs — validated against OPITO, GWO, BOSIET and MLC 2006 standards.",
  },
  {
    q: "How is compliance and insurance handled?",
    a: "Under one global contract. Every contractor is fully insured for Professional Indemnity and Public Liability, payrolled through compliant local entities, and covered by international HSSE governance — all fully auditable.",
  },
  {
    q: "Can you manage rotations and replacements?",
    a: "Yes. We own the full rotation lifecycle — crew-change scheduling, travel and continuity planning — and guarantee vetted replacements from the same pre-screened pool if a rotation slips.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-[1276px] gap-10 lg:grid-cols-[minmax(0,384px)_1fr] lg:gap-14">
        {/* Left — pitch + CTA */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-6 bg-orange-500" />
            <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
              Common Questions
            </span>
          </div>
          <h2 className="mt-4 font-poppins text-[26px] font-extrabold leading-[1.15] text-neutral-900 sm:text-[38px] sm:leading-[1.1]">
            Answers before
            <br />
            you brief us
          </h2>
          <p className="mt-4 max-w-sm font-hanken text-base leading-6 text-zinc-600">
            Still need specifics? Our mobilization desk responds with an
            indicative crew plan within one business day.
          </p>
          <RequestModalButton
            className="mt-6 inline-flex px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 outline outline-[1.5px] -outline-offset-[1.5px] outline-neutral-900/25 transition-colors hover:outline-neutral-900/50"
          >
            [ Talk to the desk → ]
          </RequestModalButton>
        </div>

        {/* Right — accordion */}
        <div className="border-t border-gray-200" data-aos="fade-up">
          {FAQS.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={f.q} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 py-6 pl-0.5 text-left"
                >
                  <span className="pt-0.5 font-jbmono text-xs font-medium tracking-wide text-orange-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-poppins text-lg font-semibold leading-6 transition-colors ${
                      isOpen ? "text-orange-500" : "text-neutral-900"
                    }`}
                  >
                    {f.q}
                  </span>
                  {/* +/− marker */}
                  <span
                    aria-hidden
                    className="relative mt-1 block size-5 shrink-0"
                  >
                    <span className="absolute left-0 top-[9px] h-0.5 w-5 bg-orange-500" />
                    <span
                      className={`absolute left-[9px] top-0 h-5 w-0.5 bg-orange-500 transition-all ${
                        isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="max-w-2xl pb-6 pl-16 pr-4 font-hanken text-base leading-6 text-zinc-600 sm:pr-7">
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
