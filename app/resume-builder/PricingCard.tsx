"use client";

import { useState } from "react";
import { useResumeModal } from "./ResumeModal";
import { planIntent } from "./resume-intents";

/**
 * Hero pricing — a shared experience-level toggle over two plan cards (Resume
 * Only, and Resume + LinkedIn / Best Value). Switching the level updates both
 * prices and their small print.
 *
 * This was a billing-period toggle (Monthly / Quarterly / 6 Months). Resume
 * writing is priced by how much career history there is to work with, not by
 * subscription length, so the tiers are now experience bands and the price is
 * a one-off fee rather than a monthly charge.
 */

const ACCENT_GRADIENT = "linear-gradient(95deg, #ffb020, #ea580c)";
const LI_BLUE = "#0a66c2";

export type PricingFeature = { lead: string; rest: string };

export type PricingPlan = {
  /** Price per experience level, index-aligned with `tiers`. */
  price: string[];
  /** Small print under the price, index-aligned with `tiers`. */
  note: string[];
  features: PricingFeature[];
};

export type PricingProps = {
  /** Experience bands, e.g. "Entry level" / "Mid level" / "Senior level". */
  tiers: string[];
  resume: PricingPlan;
  combo: PricingPlan;
};

function Tick({ tone, li }: { tone: "orange" | "blue"; li?: boolean }) {
  const bg = tone === "orange" ? "bg-[#fff0e0]" : "bg-[#e8f1fa]";
  const stroke = tone === "orange" ? "#ea580c" : LI_BLUE;
  return (
    <span className={`grid size-5 shrink-0 place-items-center rounded-full ${bg}`}>
      {li ? (
        <svg viewBox="0 0 24 24" width="11" height="11" fill={LI_BLUE} aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.1 20.45H3.53V9H7.1v11.45z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke={stroke} strokeWidth="3.4" aria-hidden>
          <path d="M4.5 12.5l5 5L19.5 7" />
        </svg>
      )}
    </span>
  );
}

export default function PricingCard({ tiers, resume, combo }: PricingProps) {
  // Default to the middle option when there is one — it was Quarterly in the
  // shipped design — but stay in range for any number of tiers.
  const [active, setActive] = useState(() =>
    tiers.length > 1 ? Math.min(1, tiers.length - 1) : 0
  );
  const { openModal } = useResumeModal();

  return (
    <div className="mt-10 w-full">
      {/* Billing toggle */}
      <div
        role="tablist"
        aria-label="Experience level"
        className="mx-auto flex max-w-[340px] gap-1 rounded-xl border border-linec bg-[#f4f2ee] p-1"
      >
        {tiers.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`flex-1 rounded-[9px] py-2.5 font-body text-[13px] transition-all ${
                on
                  ? "bg-white font-bold text-[#ea580c] shadow-[0_3px_10px_-4px_rgba(37,40,46,0.25)]"
                  : "font-semibold text-body2 hover:text-ink"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Plan cards */}
      <div className="mx-auto mt-8 grid max-w-[790px] items-stretch gap-6 text-left md:grid-cols-2">
        {/* Resume Only */}
        <div className="flex flex-col rounded-2xl border-2 border-[#fb923c] bg-white p-6 pt-7 shadow-[0_28px_60px_-24px_rgba(234,88,12,0.35)]">
          <span className="w-fit rounded-md border border-[#ffe8d1] bg-[#fff4e8] px-2 py-1 font-body text-[11px] font-bold text-[#ea580c]">
            RESUME ONLY
          </span>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-jakarta text-[40px] font-extrabold leading-none text-ink">
              {resume.price[active]}
            </span>
          </div>
          <div className="mt-2 font-body text-[13px] text-body2">
            {resume.note[active]}
          </div>
          <ul className="mt-5 grid gap-3">
            {resume.features.map((f) => (
              <li key={f.lead} className="flex items-center gap-3">
                <Tick tone="orange" />
                <span className="font-body text-sm text-ink">
                  <b>{f.lead}</b>
                  {f.rest}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() =>
              openModal(
                planIntent("Resume Only", tiers[active], resume.price[active]),
              )
            }
            className="mt-auto block w-full rounded-xl pt-0 text-center"
          >
            <span
              className="mt-6 block rounded-xl py-3.5 font-body text-[15px] font-bold text-white shadow-[0_10px_26px_-10px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: ACCENT_GRADIENT }}
            >
              Get Pro
            </span>
          </button>
        </div>

        {/* Resume + LinkedIn */}
        <div className="relative">
          <span
            className="absolute -top-3 right-6 z-10 whitespace-nowrap rounded-full px-4 py-1.5 font-body text-[11.5px] font-bold tracking-[0.06em] text-white"
            style={{ backgroundColor: LI_BLUE, boxShadow: "0 6px 16px -6px rgba(10,102,194,0.6)" }}
          >
            BEST VALUE
          </span>
          <div
            className="flex h-full flex-col rounded-2xl border-2 bg-white p-6 pt-8"
            style={{ borderColor: LI_BLUE, boxShadow: "0 28px 60px -24px rgba(10,102,194,0.35)" }}
          >
            <span
              className="w-fit rounded-md border px-2 py-1 font-body text-[11px] font-bold"
              style={{ backgroundColor: "#e8f1fa", color: LI_BLUE, borderColor: "#c7def3" }}
            >
              RESUME + LINKEDIN
            </span>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-jakarta text-[40px] font-extrabold leading-none text-ink">
                {combo.price[active]}
              </span>
              </div>
            <div className="mt-2 font-body text-[13px] text-body2">
              {combo.note[active]}
            </div>
            <ul className="mt-5 grid gap-3">
              {combo.features.map((f) => (
                <li key={f.lead} className="flex items-center gap-3">
                  <Tick tone="blue" li={/linkedin/i.test(`${f.lead} ${f.rest}`)} />
                  <span className="font-body text-sm text-ink">
                    <b>{f.lead}</b>
                    {f.rest}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                openModal(
                  planIntent(
                    "Resume + LinkedIn",
                    tiers[active],
                    combo.price[active],
                  ),
                )
              }
              className="mt-auto flex w-full items-center justify-center gap-2.5 rounded-xl pt-0"
            >
              <span
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 font-body text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: LI_BLUE, boxShadow: "0 10px 26px -10px rgba(10,102,194,0.55)" }}
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.1 20.45H3.53V9H7.1v11.45z" />
                </svg>
                Get Pro + LinkedIn
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
