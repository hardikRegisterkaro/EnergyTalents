"use client";

import { useState } from "react";
import { useFilters } from "./FilterContext";

const FIELDS = [
  { key: "role", label: "Role or keyword", placeholder: "e.g. DP Operator, HSE" },
  { key: "location", label: "Location", placeholder: "Any region" },
  { key: "discipline", label: "Discipline", placeholder: "All disciplines" },
] as const;

export default function HeroSearch() {
  const { setQuery } = useFilters();
  const [vals, setVals] = useState({ role: "", location: "", discipline: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = [vals.role, vals.location, vals.discipline]
      .map((v) => v.trim())
      .filter(Boolean)
      .join(" ");
    setQuery(query);
    document
      .getElementById("roles")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col bg-white outline outline-1 -outline-offset-1 outline-white/20 sm:flex-row sm:items-stretch"
    >
      {FIELDS.map((f) => (
        <div
          key={f.key}
          className="flex flex-1 flex-col gap-1 border-b border-gray-200 px-4 py-3 sm:border-b-0 sm:border-r"
        >
          <label className="font-jbmono text-[9.5px] font-medium uppercase tracking-wider text-zinc-400">
            {f.label}
          </label>
          <input
            type="text"
            aria-label={f.label}
            placeholder={f.placeholder}
            value={vals[f.key]}
            onChange={(e) => setVals((v) => ({ ...v, [f.key]: e.target.value }))}
            className="w-full bg-transparent font-hanken text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
      ))}
      <button
        type="submit"
        className="flex items-center justify-center bg-orange-500 px-7 py-3.5 transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:py-0"
      >
        <span className="font-jbmono text-xs font-bold tracking-wider text-white">
          SEARCH →
        </span>
      </button>
    </form>
  );
}
