"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { submitLead } from "../lib/leads";

/**
 * A single "Request crew / talk to the desk" enquiry modal, mounted once by the
 * services layout. Any CTA on a service page opens it via <RequestModalButton>
 * (or the useRequestModal hook), so the three lead buttons — Contact an Energy
 * HR Consultant, Talk to the desk, Request Talent Profiles — all share one form
 * instead of opening a mailto. Submits to the CMS as a lead.
 */

type Ctx = { openModal: () => void };
const RequestModalCtx = createContext<Ctx | null>(null);

export function useRequestModal() {
  const ctx = useContext(RequestModalCtx);
  if (!ctx)
    throw new Error("useRequestModal must be used within <RequestModalProvider>");
  return ctx;
}

export function RequestModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <RequestModalCtx.Provider value={{ openModal }}>
      {children}
      {open && <RequestModal onClose={closeModal} />}
    </RequestModalCtx.Provider>
  );
}

/** A button that opens the shared enquiry modal. Forwards className/style/data-*. */
export function RequestModalButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openModal } = useRequestModal();
  return (
    <button type="button" {...props} onClick={openModal}>
      {children}
    </button>
  );
}

const baseInput =
  "w-full min-w-0 bg-gray-50 px-4 py-3 font-plex text-sm text-stone-800 outline outline-1 -outline-offset-1 outline-gray-200 placeholder:text-stone-400 focus:outline-orange-500";

// Submits to the CMS as a lead — see app/lib/leads.ts for the payload contract.

function RequestModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scope, setScope] = useState("");
  const [details, setDetails] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    const result = await submitLead({
      name,
      email,
      phoneNo: phone,
      leadSource: "Services — Contract Manpower Supply",
      formData: {
        Company: company,
        "Region & scope": scope,
        "Project details": details,
      },
    });

    setPending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
  }

  // Lock body scroll, focus the first field, close on Escape, restore focus.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevActive?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
        className="relative my-auto w-full max-w-[560px] rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-gray-100 hover:text-neutral-900"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {submitted ? (
          <div className="py-3">
            <span className="grid size-11 place-items-center rounded-full bg-orange-500/10 font-jbmono text-lg font-bold text-orange-500">
              ✓
            </span>
            <h2 className="mt-5 font-archivo text-2xl font-bold text-stone-900">
              Request received
            </h2>
            <p className="mt-2 font-plex text-sm leading-6 text-stone-600">
              Thanks — a desk lead will return an indicative crew plan,
              mobilization window and rate band within one business day.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex items-center justify-center rounded-lg px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)" }}
            >
              [ Done ]
            </button>
          </div>
        ) : (
          <>
            <div className="font-jbmono text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
              Contract Manpower Supply
            </div>
            <h2
              id="request-modal-title"
              className="mt-2 pr-8 font-archivo text-2xl font-bold leading-tight text-stone-900 sm:text-[28px]"
            >
              Talk to an Energy HR consultant
            </h2>
            <p className="mt-2 font-plex text-sm leading-6 text-stone-600">
              Share the scope and we&rsquo;ll return an indicative crew plan,
              mobilization window and rate band within one business day.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  ref={firstFieldRef}
                  type="text"
                  required
                  aria-label="Full name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={baseInput}
                />
                <input
                  type="text"
                  required
                  aria-label="Company"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={baseInput}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="email"
                  required
                  aria-label="Work email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={baseInput}
                />
                <input
                  type="tel"
                  required
                  aria-label="Phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={baseInput}
                />
              </div>
              <input
                type="text"
                required
                aria-label="Region and scope"
                placeholder="Region & scope (e.g. 40 crew · North Sea · Q3)"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className={baseInput}
              />
              <textarea
                aria-label="Project details"
                placeholder="Disciplines, headcount, timeline… (optional)"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`${baseInput} resize-none`}
              />

              {error && (
                <p
                  role="alert"
                  className="border-l-2 border-red-500 bg-red-50 px-4 py-3 font-plex text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-1 flex items-center justify-center rounded-lg px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                style={{
                  backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)",
                }}
              >
                {pending ? "[ Sending… ]" : "[ Send request → ]"}
              </button>
              <p className="pt-1 text-center font-jbmono text-[11px] tracking-wide text-stone-400">
                Your data is handled under GDPR &amp; local labour law
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
