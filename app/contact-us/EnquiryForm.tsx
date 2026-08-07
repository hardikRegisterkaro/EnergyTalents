"use client";

import { useState } from "react";
import { isValidEmail, isValidPhone, submitLead } from "../lib/leads";

/**
 * "Send an enquiry" — the two-column form section. Choosing a project region
 * dynamically names the desk/coordinator the enquiry routes to, and the form
 * validates inline before posting to the CMS as a lead. Client-side island.
 */

type Region = {
  value: string;
  label: string;
};

// Where the project is — every enquiry reaches our one mobilization desk.
const REGIONS: Region[] = [
  { value: "mea", label: "Middle East & Africa" },
  { value: "euro", label: "Europe & North Sea" },
  { value: "apac", label: "Asia-Pacific" },
  { value: "amer", label: "The Americas" },
  { value: "india", label: "India / domestic" },
  { value: "global", label: "Multiple / global" },
];

const inputBase =
  "w-full rounded-xl border border-linec bg-white px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-body2/50 focus:border-brand";

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 text-body2/60" aria-hidden>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 text-body2/60" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 5 8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 text-body2/60" aria-hidden>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.7 2 2 0 016.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const desk = REGIONS.find((r) => r.value === region) ?? null;
  // Same rules the CMS applies, so a field that passes here is never bounced.
  const emailOk = isValidEmail(email);
  const phoneOk = isValidPhone(phone);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    setTried(true);
    if (!name.trim() || !emailOk || !phoneOk || !region || !message.trim() || !agree) {
      return;
    }

    setPending(true);
    setError(null);

    const result = await submitLead({
      name,
      email,
      phoneNo: phone,
      leadSource: "Contact — Send an Enquiry",
      formData: {
        "Project region": desk?.label ?? region,
        "How can we help?": message,
        Consent: "Agreed to storage & processing",
      },
    });

    setPending(false);
    if (result.ok) setSent(true);
    else setError(result.message);
  };

  const reset = () => {
    setSent(false);
    setName("");
    setEmail("");
    setPhone("");
    setRegion("");
    setMessage("");
    setAgree(false);
    setTried(false);
    setError(null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left — pitch + routing */}
      <div data-aos="fade-up">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Send an enquiry
        </p>
        <h2 className="mt-4 max-w-md font-display text-[28px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[40px]">
          One form. Straight to our desk.
        </h2>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-body2">
          Tell us the project region and scope, and our mobilization desk takes
          it from there — sourcing, vetting and travel handled end to end.
        </p>

        {/* Routing card */}
        <div className="mt-8 max-w-md rounded-2xl border border-linec bg-white p-6 softshadow">
          <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-body2/60">
            This enquiry routes to
          </p>
          <div className="mt-4 flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white grad">
              ET
            </span>
            <div>
              <div className="font-display text-base font-bold text-ink">
                Our mobilization desk
              </div>
              <div className="mt-0.5 font-body text-[13px] leading-snug text-body2">
                {desk
                  ? `We'll match crew for your ${desk.label} project.`
                  : "Tirunelveli, Tamil Nadu, India"}
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-linec pt-4">
            <span className="size-2 rounded-full bg-green-500" />
            <span className="font-body text-[13px] font-medium text-body2">
              Open now · replies within 4 working hours
            </span>
          </div>
        </div>

        {/* Points */}
        <ul className="mt-6 flex max-w-md flex-col gap-5">
          <li className="flex gap-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white grad">
              ⏱
            </span>
            <div>
              <div className="font-display text-sm font-bold text-ink">
                Answered in 4 working hours
              </div>
              <p className="mt-0.5 font-body text-[13.5px] leading-snug text-body2">
                Crew requests get an indicative plan and rate band inside one
                business day.
              </p>
            </div>
          </li>
          <li className="flex gap-3.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white grad">
              ⛨
            </span>
            <div>
              <div className="font-display text-sm font-bold text-ink">
                No fee to workers, confidential by default
              </div>
              <p className="mt-0.5 font-body text-[13.5px] leading-snug text-body2">
                Contractors never pay for placement or visas. Details held under
                GDPR-aligned controls.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right — form card */}
      <div
        data-aos="fade-up"
        data-aos-delay="120"
        className="rounded-3xl border border-linec bg-white p-6 softshadow sm:p-8"
      >
        {sent ? (
          <div className="flex flex-col items-start py-6">
            <span className="grid size-12 place-items-center rounded-full bg-orange-50 text-xl font-bold text-brand">
              ✓
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-ink">
              Enquiry received
            </h3>
            <p className="mt-2 font-body text-sm leading-6 text-body2">
              Your request is with our{" "}
              <span className="font-semibold text-ink">mobilization desk</span>.
              We&rsquo;ll reply within four working hours.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-lg border border-ink/20 px-5 py-2.5 font-body text-sm font-semibold text-ink transition-colors hover:border-ink/40"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="font-body text-sm font-semibold text-ink">
                  Full name
                </span>
                <span className="relative mt-2 flex items-center">
                  <span className="pointer-events-none absolute left-3.5">
                    <IconUser />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Reeve"
                    className={`${inputBase} pl-10`}
                  />
                </span>
                {tried && !name.trim() && (
                  <span className="mt-1 block font-body text-xs text-red-500">
                    Please enter your name.
                  </span>
                )}
              </label>
              <label className="block">
                <span className="font-body text-sm font-semibold text-ink">
                  Work email
                </span>
                <span className="relative mt-2 flex items-center">
                  <span className="pointer-events-none absolute left-3.5">
                    <IconMail />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@operator.com"
                    className={`${inputBase} pl-10`}
                  />
                </span>
                {tried && !emailOk && (
                  <span className="mt-1 block font-body text-xs text-red-500">
                    Enter a valid email address.
                  </span>
                )}
              </label>
            </div>

            <label className="block">
              <span className="font-body text-sm font-semibold text-ink">
                Phone number
              </span>
              <span className="relative mt-2 flex items-center">
                <span className="pointer-events-none absolute left-3.5">
                  <IconPhone />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7700 900123"
                  className={`${inputBase} pl-10`}
                />
              </span>
              {tried && !phoneOk && (
                <span className="mt-1 block font-body text-xs text-red-500">
                  Enter a valid phone number (7–15 digits).
                </span>
              )}
            </label>

            <label className="block">
              <span className="font-body text-sm font-semibold text-ink">
                Project region
              </span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`${inputBase} mt-2 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 ${region ? "text-ink" : "text-body2/60"}`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2357534e' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">Select a region...</option>
                {REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              {tried && !region && (
                <span className="mt-1 block font-body text-xs text-red-500">
                  Please choose a region.
                </span>
              )}
            </label>

            <label className="block">
              <span className="font-body text-sm font-semibold text-ink">
                How can we help?
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="e.g. 40 offshore crew, North Sea, Q3 — rotational 3/3, MLC-compliant contracts required. Or: 9 years subsea inspection, BOSIET current, seeking 28/28 work."
                className={`${inputBase} resize-none`}
              />
              {tried && !message.trim() && (
                <span className="mt-1 block font-body text-xs text-red-500">
                  Tell us a little about what you need.
                </span>
              )}
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-linec bg-cream-2 p-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-brand"
              />
              <span className="font-body text-[13px] leading-snug text-body2">
                I agree that Energy Talents may store and process these details
                to respond to my enquiry.
              </span>
            </label>
            {tried && !agree && (
              <span className="-mt-3 font-body text-xs text-red-500">
                Please accept to continue.
              </span>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border-l-2 border-red-500 bg-red-50 px-4 py-3 font-body text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={pending}
                className="btn-grad btn-lift inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-body text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Sending…" : "Send Enquiry →"}
              </button>
              <span className="font-body text-[13px] text-body2">
                Typical reply:{" "}
                <span className="font-semibold text-ink">
                  under 4 working hours
                </span>
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
