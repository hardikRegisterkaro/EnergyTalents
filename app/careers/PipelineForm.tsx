"use client";

import { useState } from "react";
import { submitLead, uploadCv, validateCv } from "../lib/leads";

const inputClass =
  "w-full bg-white px-4 py-3.5 font-hanken text-sm text-zinc-800 outline outline-1 -outline-offset-1 outline-gray-200 placeholder:text-zinc-400 focus:outline-orange-500";

export default function PipelineForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function reset() {
    setSubmitted(false);
    setError(null);
    setName("");
    setTrade("");
    setEmail("");
    setPhone("");
    setTickets("");
    setCv(null);
    setFileName(null);
  }

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

    // CV first — a failed upload must not file a lead with a missing CV.
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
      leadSource: "Careers — Talent Pipeline",
      formData: {
        "Trade / discipline": trade,
        "Tickets held": tickets,
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
      <div
        data-aos="fade-up"
        data-aos-delay={120}
        className="flex w-full flex-col items-start rounded-xl bg-white px-6 py-10 outline outline-1 -outline-offset-1 outline-zinc-600/25 sm:px-10 lg:w-[640px] lg:shrink-0"
      >
        <span className="grid size-12 place-items-center rounded-full bg-orange-50 font-jbmono text-lg font-bold text-orange-500">
          ✓
        </span>
        <h3 className="pt-5 font-poppins text-2xl font-extrabold text-neutral-900">
          You&rsquo;re in the pipeline
        </h3>
        <p className="pt-2 font-hanken text-sm leading-6 text-zinc-600">
          Thanks for registering. A dedicated desk will review your profile and
          reach out as relevant rotations open — usually within one working day.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
        >
          Register another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-aos="fade-up"
      data-aos-delay={120}
      className="w-full rounded-xl bg-white px-6 py-8 outline outline-1 -outline-offset-1 outline-zinc-600/25 sm:px-10 sm:py-11 lg:w-[640px] lg:shrink-0"
    >
      <div className="font-jbmono text-xs font-medium uppercase tracking-widest text-orange-500">
        For talent
      </div>
      <h3 className="pb-5 pt-3.5 font-poppins text-2xl font-extrabold text-neutral-900">
        Join the workforce pipeline
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
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
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
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
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <input
          type="text"
          name="tickets"
          aria-label="Tickets held"
          placeholder="Tickets held (e.g. BOSIET, GWO, OPITO)"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          className={inputClass}
        />

        <label className="flex cursor-pointer items-center gap-3 px-4 py-3.5 outline outline-1 -outline-offset-1 outline-neutral-300 transition-colors hover:outline-orange-500">
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
          className="flex items-center justify-center gap-[5px] rounded-xl px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0px_10px_30px_-8px_rgba(234,88,12,0.40)] transition-transform hover:-translate-y-0.5 bg-[linear-gradient(30deg,#eab308,#ea580c)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending
            ? cv
              ? "[ Uploading… ]"
              : "[ Sending… ]"
            : "[ Join the pipeline → ]"}
        </button>
      </div>

      <p className="pt-4 text-center font-jbmono text-xs tracking-wide text-zinc-400">
        Your data is handled under GDPR &amp; local labour law
      </p>
    </form>
  );
}
