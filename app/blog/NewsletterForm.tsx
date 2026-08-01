"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubscribed(true);
      }}
      className="flex w-full lg:w-[460px]"
    >
      <input
        type="email"
        required
        aria-label="Email address"
        placeholder="you@company.com"
        className="w-full border border-r-0 border-white/15 bg-white/5 px-5 py-4 font-plex text-sm text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-orange-500 px-8 font-jbmono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-orange-600"
      >
        Subscribe
      </button>
    </form>
  );
}
