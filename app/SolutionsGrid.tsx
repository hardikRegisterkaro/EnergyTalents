"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

/**
 * "How we deploy" solutions grid that sits directly below the hero.
 * Client island so the "Search open jobs" card can route to /careers with a
 * query.
 */

type Solution = {
  n: string;
  glyph: "square-outline" | "square-solid" | "circle-outline";
  title: string;
  body: string;
  cta?: { label: string; href: string };
  search?: boolean;
};

const SOLUTIONS: Solution[] = [
  {
    n: "01",
    glyph: "square-outline",
    title: "Employer of Record\n& Payroll Solutions",
    body: "We carry the local entity, tax and statutory risk so you deploy compliant talent in 45+ jurisdictions, fast.",
    cta: { label: "Explore EOR", href: "/careers#roles" },
  },
  {
    n: "02",
    glyph: "square-solid",
    title: "Managed Workforce\nSourcing (MSP)",
    body: "End-to-end programme management of your contingent crews — sourcing, vetting, mobilization and rotation governance.",
    cta: { label: "Explore MSP", href: "/careers#roles" },
  },
  {
    n: "03",
    glyph: "circle-outline",
    title: "Search Open Jobs",
    body: "Live technical rotations across every energy sector and region.",
    search: true,
  },
];

function Glyph({ kind }: { kind: Solution["glyph"] }) {
  if (kind === "square-solid")
    return <span className="size-6 bg-orange-500" aria-hidden />;
  if (kind === "circle-outline")
    return (
      <span
        className="size-6 rounded-full border-2 border-orange-500"
        aria-hidden
      />
    );
  return (
    <span className="size-6 border-2 border-orange-500" aria-hidden />
  );
}

function Card({ s }: { s: Solution }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/careers?q=${encodeURIComponent(query)}#roles` : "/careers#roles");
  };

  return (
    <div className="flex h-full flex-col border border-gray-200 bg-white p-8 transition-colors hover:border-neutral-900/30">
      {/* Icon tile + number */}
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center border border-gray-200">
          <Glyph kind={s.glyph} />
        </span>
        <span className="font-jbmono text-xs text-gray-300">{s.n}</span>
      </div>

      {/* Title */}
      <h3 className="mt-7 whitespace-pre-line font-display text-xl font-bold leading-snug text-neutral-900">
        {s.title}
      </h3>

      {/* Body */}
      <p className="mt-3 font-body text-[15px] leading-6 text-zinc-600">
        {s.body}
      </p>

      {/* Footer — link or search */}
      {s.search ? (
        <form onSubmit={submitSearch} className="mt-auto pt-6">
          <div className="relative">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Role, sector or location"
              aria-label="Search open jobs"
              className="w-full border border-gray-200 py-3.5 pl-4 pr-16 font-body text-sm text-neutral-900 outline-none transition-colors placeholder:text-gray-400 focus:border-neutral-900/40"
            />
            <button
              type="submit"
              aria-label="Search open jobs"
              className="absolute inset-y-1.5 right-1.5 grid w-12 place-items-center rounded-md text-white shadow-[0_12px_26px_-8px_rgba(234,88,12,0.65)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)" }}
            >
              <span aria-hidden className="text-lg">→</span>
            </button>
          </div>
        </form>
      ) : s.cta ? (
        <Link
          href={s.cta.href}
          className="group mt-auto inline-flex items-center gap-2 pt-6 font-jbmono text-sm text-orange-600 transition-colors hover:text-orange-700"
        >
          {s.cta.label}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}

export default function SolutionsGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {SOLUTIONS.map((s) => (
        <div key={s.n} data-aos="fade-up" className="h-full">
          <Card s={s} />
        </div>
      ))}
    </div>
  );
}
