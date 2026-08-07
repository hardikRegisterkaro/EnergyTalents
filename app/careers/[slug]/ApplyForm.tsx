"use client";

import { useState } from "react";
import { submitLead, uploadCv, validateCv } from "../../lib/leads";

const inputClass =
  "w-full bg-white px-4 py-3 font-hanken text-sm text-zinc-800 outline outline-1 -outline-offset-1 outline-gray-200 placeholder:text-zinc-400 focus:outline-orange-500";

/**
 * Per-role application form. The Trade / discipline field is seeded with the
 * role title (passed from the server page) so the applicant doesn't retype it.
 *
 * Submits to the CMS as a lead tagged with the role, uploading the CV first so
 * the recruiter gets a downloadable file alongside the application.
 */
export default function ApplyForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState(roleTitle);
  const [cv, setCv] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setCv(null);
      setFileName(null);
      return;
    }
    const problem = validateCv(file);
    if (problem) {
      setError(problem);
      setCv(null);
      setFileName(null);
      e.target.value = "";
      return;
    }
    setError(null);
    setCv(file);
    setFileName(file.name);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    // CV first — a failed upload must not file an application without it.
    let attachmentUrl: string | null = null;
    let attachmentName: string | null = null;
    if (cv) {
      const upload = await uploadCv(cv);
      if (!upload.ok) {
        setPending(false);
        setError(upload.message);
        return;
      }
      attachmentUrl = upload.url;
      attachmentName = upload.filename;
    }

    const result = await submitLead({
      name,
      email,
      phoneNo: phone,
      leadSource: `Careers — Application: ${roleTitle}`,
      formData: {
        "Applied for": roleTitle,
        "Role link": roleSlug ? `/careers/${roleSlug}` : undefined,
        "Trade / discipline": trade,
      },
      attachmentUrl,
      attachmentName,
    });

    setPending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
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
            setError(null);
            setCv(null);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="tel"
            name="phone"
            required
            aria-label="Phone number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={onFileChange}
          />
          <span className="grid size-7 shrink-0 place-items-center bg-orange-500 font-jbmono text-sm font-bold text-white">
            ↑
          </span>
          <span className="truncate font-hanken text-sm text-zinc-600">
            {fileName ?? "Upload CV / certifications (PDF, DOC, DOCX · max 8MB)"}
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="border-l-2 border-red-500 bg-red-50 px-3 py-2 font-hanken text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-1 flex items-center justify-center gap-[5px] rounded-xl px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0px_10px_30px_-8px_rgba(234,88,12,0.40)] transition-transform hover:-translate-y-0.5 bg-[linear-gradient(30deg,#eab308,#ea580c)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending
            ? cv
              ? "[ Uploading… ]"
              : "[ Sending… ]"
            : "[ Submit application → ]"}
        </button>
      </div>

      <p className="pt-3 text-center font-jbmono text-xs tracking-wide text-zinc-400">
        Your data is handled under GDPR &amp; local labour law
      </p>
    </form>
  );
}
