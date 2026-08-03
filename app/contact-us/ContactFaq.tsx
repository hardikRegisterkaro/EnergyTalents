"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How fast can you mobilize a crew?",
    a: "For disciplines where we hold pre-cleared standby pools, under 72 hours from instruction to on-site — medicals, certifications and travel included. Scarce or highly specialised roles typically run two to four weeks. Tell us the window in the form and we'll confirm what's realistic in the first reply.",
  },
  {
    q: "Do contractors pay any fees?",
    a: "Never. Contractors pay nothing for placement, visas or mobilization — our fee is invoiced to the operator. Anyone asking a worker for money is not us.",
  },
  {
    q: "Which regions and contract types do you cover?",
    a: "Rotational, contract, staff and project-hire crews across the Middle East & Africa, Europe & North Sea, Asia-Pacific and the Americas — oil & gas, renewables, marine and heavy infrastructure.",
  },
  {
    q: "What do you need from me to start?",
    a: "A rough scope is enough: role or discipline, headcount, region, rotation and start window. We'll come back with an indicative crew plan and rate band; contracts and compliance follow once you confirm.",
  },
  {
    q: "How are certifications verified?",
    a: "Every ticket — BOSIET, OPITO, GWO, MLC 2006 and discipline-specific credentials — is validated against the issuing body before mobilization, with medicals and right-to-work checks logged on file.",
  },
  {
    q: "Is my project information confidential?",
    a: "Yes. Enquiries are handled by a named coordinator under NDA by default, stored under GDPR-aligned controls, and never shared beyond the desk crewing your project.",
  },
];

export default function ContactFaq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <div data-aos="fade-up">
      {FAQS.map((f, i) => {
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
