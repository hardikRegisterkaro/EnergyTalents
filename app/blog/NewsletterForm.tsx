"use client";

import { useState } from "react";
import { submitLead } from "../lib/leads";

/**
 * "The Brief" signup — sits on a dark band at the foot of the blog index.
 *
 * The CMS records every subscriber as a lead and requires name, email and
 * phone, so this is a three-field form rather than the single email input the
 * band was originally designed around. Name and phone share a row to keep it
 * to two lines, and email keeps its joined input + button treatment.
 */

const darkInput =
  "w-full min-w-0 border border-white/15 bg-white/5 px-5 py-4 font-plex text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setError(null);

    const result = await submitLead({
      name,
      email,
      phoneNo: phone,
      leadSource: "Blog — The Brief Newsletter",
    });

    setPending(false);
    if (result.ok) setSubscribed(true);
    else setError(result.message);
  }

  if (subscribed) {
    return (
      <div className="flex w-full items-center gap-3 border border-orange-500/40 bg-orange-500/10 px-5 py-4 lg:w-[460px]">
        <span className="font-jbmono text-base font-bold text-orange-500">✓</span>
        <span className="font-plex text-sm text-white">
          You&rsquo;re subscribed — field notes inbound.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 lg:w-[460px]">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          aria-label="Full name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={darkInput}
        />
        <input
          type="tel"
          required
          aria-label="Phone number"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={darkInput}
        />
      </div>

      <div className="flex">
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${darkInput} border-r-0`}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 bg-orange-500 px-8 font-jbmono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-orange-500"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-2 border-red-500 bg-red-500/10 px-3 py-2 font-plex text-sm text-red-300"
        >
          {error}
        </p>
      )}
    </form>
  );
}
