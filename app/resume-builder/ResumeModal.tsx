"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ResumeIntent } from "./resume-intents";

/**
 * A single resume-builder enquiry modal, mounted once by the layout. Every CTA
 * on the page opens it with an "intent" (see resume-intents.ts) that tailors the
 * heading, fields and submit label to what was clicked — plan signup, tailoring,
 * format audit or template browse. No backend yet: submit confirms client-side.
 */

const ACCENT_GRADIENT = "linear-gradient(95deg, #ffb020, #ea580c)";

type Ctx = { openModal: (intent: ResumeIntent) => void };
const ResumeModalCtx = createContext<Ctx | null>(null);

export function useResumeModal() {
  const ctx = useContext(ResumeModalCtx);
  if (!ctx)
    throw new Error("useResumeModal must be used within <ResumeModalProvider>");
  return ctx;
}

export function ResumeModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [intent, setIntent] = useState<ResumeIntent | null>(null);
  const openModal = useCallback((next: ResumeIntent) => setIntent(next), []);
  const closeModal = useCallback(() => setIntent(null), []);
  return (
    <ResumeModalCtx.Provider value={{ openModal }}>
      {children}
      {intent && (
        <ResumeModal key={intent.title} intent={intent} onClose={closeModal} />
      )}
    </ResumeModalCtx.Provider>
  );
}

/** A button that opens the modal with a preset intent. Forwards className/style/data-*. */
export function ResumeModalButton({
  intent,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { intent: ResumeIntent }) {
  const { openModal } = useResumeModal();
  return (
    <button type="button" {...props} onClick={() => openModal(intent)}>
      {children}
    </button>
  );
}

const baseInput =
  "w-full min-w-0 rounded-xl border border-[#e5ded4] bg-white px-4 py-3 font-body text-sm text-[#231a14] placeholder:text-stone-400 focus:border-[#ff7a00] focus:outline-none focus:ring-1 focus:ring-[#ff7a00]";

function ResumeModal({
  intent,
  onClose,
}: {
  intent: ResumeIntent;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

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
        aria-labelledby="resume-modal-title"
        className="relative my-auto w-full max-w-[520px] rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
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
            <span
              className="grid size-11 place-items-center rounded-full text-lg font-bold text-white"
              style={{ backgroundImage: ACCENT_GRADIENT }}
            >
              ✓
            </span>
            <h2 className="mt-5 font-jakarta text-2xl font-extrabold text-[#231a14]">
              You&rsquo;re all set
            </h2>
            <p className="mt-2 font-body text-sm leading-6 text-[#574c44]">
              Thanks — we&rsquo;ve got your details and we&rsquo;ll email your
              next step within a few minutes.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl px-6 py-3 font-body text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: ACCENT_GRADIENT }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff7a00]">
              {intent.eyebrow}
            </div>
            <h2
              id="resume-modal-title"
              className="mt-2 pr-8 font-jakarta text-[24px] font-extrabold leading-tight tracking-tight text-[#231a14] sm:text-[28px]"
            >
              {intent.title}
            </h2>
            <p className="mt-2 font-body text-sm leading-6 text-[#574c44]">
              {intent.subtitle}
            </p>

            {intent.summary && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#ffe3c4] bg-[#fff6ec] px-4 py-3">
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-[#ea580c]"
                />
                <span className="font-body text-[13px] font-bold text-[#ea580c]">
                  {intent.summary}
                </span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-5 flex flex-col gap-3"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  ref={firstFieldRef}
                  type="text"
                  required
                  aria-label="Full name"
                  placeholder="Full name"
                  className={baseInput}
                />
                <input
                  type="email"
                  required
                  aria-label="Email"
                  placeholder="Email"
                  className={baseInput}
                />
              </div>

              {intent.phone && (
                <input
                  type="tel"
                  aria-label="Phone"
                  placeholder="Phone (optional)"
                  className={baseInput}
                />
              )}

              {intent.role && (
                <input
                  type="text"
                  aria-label="Target role or industry"
                  placeholder="Target role / industry (optional)"
                  className={baseInput}
                />
              )}

              {intent.resume && (
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#d8cfc3] bg-white px-4 py-3 transition-colors hover:border-[#ff7a00]">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="sr-only"
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name ?? null)
                    }
                  />
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-md text-sm font-bold text-white"
                    style={{ backgroundImage: ACCENT_GRADIENT }}
                  >
                    ↑
                  </span>
                  <span className="truncate font-body text-sm text-[#574c44]">
                    {fileName ?? "Upload your resume (PDF, DOCX)"}
                  </span>
                </label>
              )}

              {intent.jobDescription && (
                <textarea
                  aria-label="Job description"
                  placeholder="Paste the job description you're targeting…"
                  rows={4}
                  className={`${baseInput} resize-none`}
                />
              )}

              <button
                type="submit"
                className="mt-1 rounded-xl py-3.5 font-body text-[15px] font-bold text-white shadow-[0_10px_26px_-10px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: ACCENT_GRADIENT }}
              >
                {intent.submitLabel}
              </button>
              <p className="pt-1 text-center font-body text-[11px] text-stone-400">
                14-day money-back guarantee · we never share your data
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
