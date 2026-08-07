"use client";

import { useState } from "react";
import { submitLead, uploadCv, validateCv } from "./lib/leads";

/**
 * Dual conversion cards — "Request project crew" (clients) and "Join the
 * workforce pipeline" (talent). Both submit to the CMS via `submitLead`, and
 * the talent form uploads the CV first so the lead carries a link to it.
 */

const baseInput =
  "w-full min-w-0 px-4 py-3.5 font-plex text-sm text-stone-800 outline outline-1 -outline-offset-1 outline-gray-200 placeholder:text-stone-400 focus:outline-orange-500";

function Success({
  title,
  body,
  onReset,
}: {
  title: string;
  body: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-8 flex flex-col items-start">
      <span className="grid size-11 place-items-center rounded-full bg-orange-500/10 font-jbmono text-lg font-bold text-orange-500">
        ✓
      </span>
      <h3 className="mt-5 font-archivo text-xl font-bold text-stone-900">
        {title}
      </h3>
      <p className="mt-2 font-plex text-sm leading-6 text-stone-600">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 border border-stone-300 px-5 py-2.5 font-jbmono text-xs tracking-tight text-stone-900 transition-colors hover:border-stone-500"
      >
        Send another
      </button>
    </div>
  );
}

/** Inline submission error, announced to assistive tech. */
function FormError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="border-l-2 border-red-500 bg-red-50 px-3 py-2 font-plex text-sm text-red-700"
    >
      {message}
    </p>
  );
}

function ClientForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scope, setScope] = useState("");

  function reset() {
    setSubmitted(false);
    setError(null);
    setName("");
    setEmail("");
    setPhone("");
    setScope("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    const result = await submitLead({
      name,
      email,
      phoneNo: phone,
      leadSource: "Home — Request Project Crew",
      formData: { "Region & scope": scope },
    });

    setPending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
  }

  if (submitted) {
    return (
      <Success
        title="Request received"
        body="Thanks — a desk lead will return an indicative crew plan, mobilization window and rate band within one business day."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          aria-label="Full name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${baseInput} bg-gray-50`}
        />
        <input
          type="email"
          required
          aria-label="Work email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${baseInput} bg-gray-50`}
        />
      </div>
      <input
        type="tel"
        required
        aria-label="Phone number"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={`${baseInput} bg-gray-50`}
      />
      <input
        type="text"
        required
        aria-label="Region & scope"
        placeholder="Region & scope (e.g. 40 crew · North Sea · Q3)"
        value={scope}
        onChange={(e) => setScope(e.target.value)}
        className={`${baseInput} bg-gray-50`}
      />

      {error && <FormError message={error} />}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex items-center justify-center rounded-lg px-6 py-4 font-jbmono text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        style={{ backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)" }}
      >
        {pending ? "[ Sending… ]" : "[ Request Project Crew → ]"}
      </button>
    </form>
  );
}

function TalentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function reset() {
    setSubmitted(false);
    setError(null);
    setName("");
    setTrade("");
    setEmail("");
    setPhone("");
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

    // Upload the CV first — if it fails the visitor keeps their input and can
    // retry, rather than us silently filing a lead with no attachment.
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
      leadSource: "Home — Join the Workforce Pipeline",
      formData: { "Trade / discipline": trade },
      attachmentUrl,
      attachmentName,
    });

    setPending(false);
    if (result.ok) setSubmitted(true);
    else setError(result.message);
  }

  if (submitted) {
    return (
      <Success
        title="You're in the pipeline"
        body="Thanks for registering. A dedicated desk will match your profile to live rotations as they open — usually within one working day."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          aria-label="Full name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${baseInput} bg-white`}
        />
        <input
          type="text"
          required
          aria-label="Trade / discipline"
          placeholder="Trade / discipline"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className={`${baseInput} bg-white`}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="email"
          required
          aria-label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${baseInput} bg-white`}
        />
        <input
          type="tel"
          required
          aria-label="Phone number"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${baseInput} bg-white`}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 border border-dashed border-gray-300 bg-white px-4 py-3.5 transition-colors hover:border-orange-500">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={onFileChange}
        />
        <span className="grid size-7 shrink-0 place-items-center bg-orange-500 font-jbmono text-sm font-bold text-white">
          ↑
        </span>
        <span className="truncate font-plex text-sm text-stone-600">
          {fileName ?? "Upload CV / certifications (PDF, DOC, DOCX · max 8MB)"}
        </span>
      </label>

      {error && <FormError message={error} />}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 flex items-center justify-center border border-neutral-900 px-6 py-4 font-jbmono text-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-neutral-900"
      >
        {pending ? (cv ? "[ Uploading… ]" : "[ Sending… ]") : "[ Join the Pipeline → ]"}
      </button>
    </form>
  );
}

export default function CtaForms() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* For clients */}
      <div
        data-aos="fade-up"
        className="relative min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-10"
      >
        {/* warm corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(251,146,60,0.28), rgba(251,146,60,0) 70%)",
          }}
        />
        <div className="relative">
          <div className="font-jbmono text-xs tracking-[0.2em] text-orange-500">
            For Clients
          </div>
          <h2 className="mt-4 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[34px] sm:leading-[1.1]">
            Request
            <br />
            project crew
          </h2>
          <p className="mt-5 max-w-md font-plex text-base leading-6 text-stone-600">
            Tell us the scope and we&rsquo;ll return an indicative crew plan,
            mobilization window and rate band within one business day.
          </p>
          <ClientForm />
        </div>
      </div>

      {/* For talent */}
      <div
        data-aos="fade-up"
        data-aos-delay="120"
        className="min-w-0 rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10"
      >
        <div className="font-jbmono text-xs tracking-[0.2em] text-orange-500">
          For Talent
        </div>
        <h2 className="mt-4 font-archivo text-4xl font-bold leading-[1.05] text-stone-900">
          Join the
          <br />
          workforce pipeline
        </h2>
        <p className="mt-5 max-w-md font-plex text-base leading-6 text-stone-600">
          Register your trade and tickets once. We&rsquo;ll match you to live
          rotations across every energy region as they open.
        </p>
        <TalentForm />
      </div>
    </div>
  );
}
