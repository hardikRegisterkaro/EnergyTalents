"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ROLES, FILTERS, slugify } from "./roles-data";
import { useFilters } from "./FilterContext";

const STEP = 6;

type Sort = "newest" | "oldest";

export default function RolesExplorer() {
  const { query, setQuery } = useFilters();
  const [category, setCategory] = useState<string>("All roles");
  const [sort, setSort] = useState<Sort>("newest");
  const [visible, setVisible] = useState(STEP);

  // Reset pagination to the first page whenever the filters change. This is
  // React's "adjust state during render" pattern — no effect, no extra pass.
  const filterKey = `${query}|${category}|${sort}`;
  const [prevKey, setPrevKey] = useState(filterKey);
  if (filterKey !== prevKey) {
    setPrevKey(filterKey);
    setVisible(STEP);
  }

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const list = ROLES.filter((r) => {
      if (category !== "All roles" && r.category !== category) return false;
      if (!terms.length) return true;
      const haystack =
        `${r.title} ${r.location} ${r.category} ${r.type} ${r.duration}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
    return list.sort((a, b) =>
      sort === "oldest" ? b.days - a.days : a.days - b.days,
    );
  }, [query, category, sort]);

  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Search + sort toolbar */}
      <div className="flex flex-col gap-3.5 pb-5 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 items-center gap-2.5 border border-gray-200 bg-white px-4 py-3.5 focus-within:border-orange-500">
          <span aria-hidden className="font-jbmono text-base text-gray-500">
            ⌕
          </span>
          <input
            type="text"
            aria-label="Search roles"
            placeholder="Search role title or location…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent font-plex text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="font-jbmono text-sm text-gray-400 transition-colors hover:text-neutral-900"
            >
              ✕
            </button>
          )}
        </div>
        <div className="relative">
          <select
            aria-label="Sort roles"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-full w-full cursor-pointer appearance-none border border-gray-200 bg-white py-3.5 pl-4 pr-10 font-jbmono text-xs font-medium uppercase tracking-wide text-neutral-900 transition-colors hover:border-gray-300 focus:border-orange-500 focus:outline-none"
          >
            <option value="newest">Sort · Newest</option>
            <option value="oldest">Sort · Oldest</option>
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-jbmono text-xs text-neutral-900"
          >
            ▾
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 pb-5">
        {FILTERS.map((f) => {
          const active = category === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(f)}
              className={`px-4 py-2 font-plex text-xs font-medium uppercase tracking-wide transition-colors ${
                active
                  ? "bg-neutral-900 text-white"
                  : "border border-gray-200 bg-white text-zinc-600 hover:border-neutral-900/40 hover:text-neutral-900"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="pb-4 font-plex text-xs font-medium uppercase tracking-wide text-zinc-600">
        Showing <span className="text-orange-500">{shown.length}</span> of{" "}
        <span className="text-orange-500">{filtered.length}</span> roles
      </p>

      {/* Role list */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <p className="font-poppins text-lg font-bold text-neutral-900">
            No roles match your search
          </p>
          <p className="mt-2 font-plex text-sm text-zinc-600">
            Try a different keyword or category — or join the pipeline below and
            we&rsquo;ll match you as roles open.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All roles");
            }}
            className="mt-5 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {shown.map((role) => (
            <article
              key={role.title}
              className="flex items-stretch border-b border-r border-t border-gray-200 bg-white transition-shadow hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)]"
            >
              <div className="w-[3px] shrink-0 bg-orange-500" />
              <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
                <div className="flex shrink-0 items-center gap-1.5 sm:w-36">
                  <span className="h-2 w-2 shrink-0 bg-orange-500" />
                  <span className="font-plex text-[10px] font-medium uppercase tracking-wide text-orange-500">
                    {role.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-poppins text-lg font-bold text-neutral-900">
                      {role.title}
                    </h3>
                    {role.featured && (
                      <span className="bg-orange-50 px-1.5 py-[3px] font-jbmono text-[9px] font-medium uppercase tracking-wide text-orange-500">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
                    <span className="font-plex text-xs tracking-wide text-zinc-600">
                      {role.location}
                    </span>
                    <span className="font-plex text-xs tracking-wide text-zinc-600">
                      {role.type}
                    </span>
                    <span className="font-plex text-xs font-medium tracking-wide text-orange-500">
                      {role.duration}
                    </span>
                    <span className="font-plex text-xs tracking-wide text-gray-500">
                      {role.posted}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-end justify-between gap-4 sm:flex-col sm:items-end sm:justify-start sm:gap-2.5">
                  <div className="flex items-baseline gap-[3px]">
                    <span className="font-archivo text-base font-extrabold text-neutral-900">
                      {role.salary}
                    </span>
                    <span className="font-jbmono text-[10px] tracking-wide text-gray-500">
                      {role.unit}
                    </span>
                  </div>
                  <Link
                    href={`/careers/${slugify(role.title)}`}
                    className="border border-orange-500/40 px-4 py-2 font-jbmono text-xs font-bold tracking-wide text-orange-500 transition-colors hover:bg-orange-50"
                  >
                    APPLY →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Load more */}
      {visible < filtered.length && (
        <div className="flex justify-center pt-7">
          <button
            type="button"
            onClick={() => setVisible((v) => v + STEP)}
            className="border-[1.5px] border-neutral-900/25 px-6 py-4 font-plex text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:border-neutral-900/50"
          >
            [ Load more roles ]
          </button>
        </div>
      )}
    </>
  );
}
