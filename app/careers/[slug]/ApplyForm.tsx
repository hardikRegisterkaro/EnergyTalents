"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-white px-4 py-3 font-hanken text-sm text-zinc-800 outline outline-1 -outline-offset-1 outline-gray-200 placeholder:text-zinc-400 focus:outline-orange-500";

/**
 * Per-role application form. The Trade / discipline field is seeded with the
 * role title (passed from the server page) so the applicant doesn't retype it.
 * No backend yet — submit acknowledges client-side, mirroring the pipeline form.
 */
export default function ApplyForm({ roleTitle }: { roleTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [trade, setTrade] = useState(roleTitle);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend yet — acknowledge client-side so the flow is complete.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-white px-6 py-9 outline outline-1 -outline-offset-1 outline-zinc-600/25 sm:px-8">
        <span className="grid size-11 place-items-center rounded-full bg-orange-50 font-jbmono text-lg font-bold text-orange-500">
          ✓
        </span>
        <h3 className="pt-4 font-poppins text-xl font-extrabold text-neutral-900">
          Application received
        </h3>
        <p className="pt-2 font-hanken text-sm leading-6 text-zinc-600">
          Thanks for applying for <span className="font-semibold">{roleTitle}</span>.
          A dedicated desk will review your profile and get back to you — usually
          within one working day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFileName(null);
          }}
          className="mt-5 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
        >
          Edit application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white px-6 py-6 outline outline-1 -outline-offset-1 outline-zinc-600/25 sm:px-8"
    >
      <div className="font-jbmono text-xs font-medium uppercase tracking-widest text-orange-500">
        Apply now
      </div>
      <h3 className="pb-4 pt-2.5 font-poppins text-xl font-extrabold text-neutral-900">
        Send your application
      </h3>

      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          name="name"
          required
          aria-label="Full name"
          placeholder="Full name"
          className={inputClass}
        />
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            aria-label="Email"
            placeholder="Email"
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            required
            aria-label="Phone number"
            placeholder="Phone"
            className={inputClass}
          />
        </div>
        <input
          type="text"
          name="trade"
          required
          aria-label="Trade / discipline"
          placeholder="Trade / discipline"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className={inputClass}
        />

        <label className="flex cursor-pointer items-center gap-3 px-4 py-3 outline outline-1 -outline-offset-1 outline-neutral-300 transition-colors hover:outline-orange-500">
          <input
            type="file"
            accept=".pdf,.docx"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <span className="grid size-7 shrink-0 place-items-center bg-orange-500 font-jbmono text-sm font-bold text-white">
            ↑
          </span>
          <span className="truncate font-hanken text-sm text-zinc-600">
            {fileName ?? "Upload CV / certifications (PDF, DOCX)"}
          </span>
        </label>

        <button
          type="submit"
          className="mt-1 flex items-center justify-center gap-[5px] rounded-xl px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0px_10px_30px_-8px_rgba(234,88,12,0.40)] transition-transform hover:-translate-y-0.5 bg-[linear-gradient(30deg,#eab308,#ea580c)]"
        >
          [ Submit application → ]
        </button>
      </div>

      <p className="pt-3 text-center font-jbmono text-xs tracking-wide text-zinc-400">
        Your data is handled under GDPR &amp; local labour law
      </p>
    </form>
  );
}
