"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ALL_ROLES,
  PAGE_SIZE,
  tabsFrom,
  fetchRolesClient,
  splitRate,
  type Pagination,
  type Role,
  type RolesResponse,
} from "./roles-api";
import { useFilters } from "./FilterContext";

/** Wait this long after the last keystroke before querying the CMS. */
const DEBOUNCE_MS = 300;

/** Marker for a gap in the page-number strip. */
const ELLIPSIS = -1;

/**
 * Page numbers to render: always first and last, plus a window around the
 * current page, with gaps collapsed to an ellipsis. Keeps the control a fixed
 * width whether there are 5 pages or 500.
 */
function buildPageNumbers(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: number[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev && n - prev > 1) out.push(ELLIPSIS);
    out.push(n);
    prev = n;
  }
  return out;
}

type Sort = "newest" | "oldest";

export default function RolesExplorer({ initial }: { initial: RolesResponse }) {
  const { query, setQuery } = useFilters();
  const [category, setCategory] = useState<string>(ALL_ROLES);
  const [sort, setSort] = useState<Sort>("newest");
  const [page, setPage] = useState(1);

  const [roles, setRoles] = useState<Role[]>(initial.roles);
  const [pagination, setPagination] = useState<Pagination>(initial.pagination);
  // Tabs are CMS-managed. Seeded from the server render and refreshed with
  // each response, so a discipline added in the CMS appears without a deploy.
  const [tabs, setTabs] = useState<string[]>(() => tabsFrom(initial.filters));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to the first page whenever the filters change. This is React's
  // "adjust state during render" pattern — no effect, no extra pass. Without
  // it, filtering while on page 4 would request page 4 of a much shorter list
  // and render an empty page.
  const filterKey = `${query}|${category}|${sort}`;
  const [prevKey, setPrevKey] = useState(filterKey);
  if (filterKey !== prevKey) {
    setPrevKey(filterKey);
    setPage(1);
  }

  const pageNumbers = useMemo(
    () => buildPageNumbers(page, pagination.totalPages),
    [page, pagination.totalPages]
  );

  const goToPage = useCallback(
    (next: number) => {
      const target = Math.min(Math.max(1, next), Math.max(1, pagination.totalPages));
      if (target === page) return;
      setPage(target);
      // Bring the listing back into view — otherwise paging from the bottom of
      // page 1 lands you mid-way down page 2.
      document.getElementById("roles")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [page, pagination.totalPages]
  );

  // Restore ?page= on first load.
  //
  // This has to be an effect, not a lazy useState initializer: the server
  // always renders page 1, so seeding from the URL during render would make
  // the pagination buttons differ between server and client — a hydration
  // mismatch. Reading `window` in an effect is the only point at which the
  // URL is safely available.
  //
  // The lint rule below flags setState-in-effect because it costs an extra
  // render. That is exactly what is wanted here and it happens once, only when
  // the URL carries a page other than 1.
  useEffect(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get("page") ?? "1", 10);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Number.isFinite(n) && n > 1) setPage(n);
  }, []);

  // Mirror the page into the URL so a reload or a shared link keeps its place.
  // Only `page` is written; the filters stay in component state. The first
  // commit is skipped so this can't clobber the ?page= the effect above reads.
  const syncedOnce = useRef(false);
  useEffect(() => {
    if (!syncedOnce.current) {
      syncedOnce.current = true;
      return;
    }
    const qs = new URLSearchParams(window.location.search);
    if (page <= 1) qs.delete("page");
    else qs.set("page", String(page));
    const q = qs.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`
    );
  }, [page]);

  // The server already rendered the unfiltered, newest-first list, so skip the
  // duplicate request on mount and only query once something actually changes.
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current && filterKey === `||newest` && page === 1) {
      isInitial.current = false;
      return;
    }
    isInitial.current = false;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);
      fetchRolesClient(
        { q: query, category, sort, page, limit: PAGE_SIZE },
        controller.signal
      )
        .then((data) => {
          setRoles(data.roles);
          setPagination(data.pagination);
          setTabs(tabsFrom(data.filters));
          setLoading(false);
        })
        .catch((err: unknown) => {
          // An aborted request was superseded by a newer one — not an error,
          // and its replacement owns the loading state from here.
          if (err instanceof DOMException && err.name === "AbortError") return;
          setError("Couldn't load roles. Please try again.");
          setLoading(false);
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category, sort, page, filterKey]);


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
          {loading && (
            <span
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-[1.5px] border-gray-300 border-t-orange-500"
            />
          )}
          {query && !loading && (
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
        {tabs.map((f) => {
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
      <p
        aria-live="polite"
        className="pb-4 font-plex text-xs font-medium uppercase tracking-wide text-zinc-600"
      >
        {loading ? (
          "Searching roles…"
        ) : (
          <>
            Showing <span className="text-orange-500">{roles.length}</span> of{" "}
            <span className="text-orange-500">{pagination.totalCount}</span> roles
          </>
        )}
      </p>

      {/* Role list */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: Math.min(roles.length || 3, PAGE_SIZE) }).map((_, i) => (
            <div
              key={i}
              className="flex items-stretch border-b border-r border-t border-gray-200 bg-white"
            >
              <div className="w-[3px] shrink-0 bg-orange-500/30" />
              <div className="flex flex-1 animate-pulse flex-col gap-3 px-5 py-6 sm:px-7">
                <div className="h-3 w-28 bg-gray-200" />
                <div className="h-4 w-2/5 bg-gray-200" />
                <div className="h-3 w-3/5 bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <p className="font-poppins text-lg font-bold text-neutral-900">{error}</p>
          <p className="mt-2 font-plex text-sm text-zinc-600">
            The roles service is temporarily unavailable.
          </p>
        </div>
      ) : roles.length === 0 ? (
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
              setCategory(ALL_ROLES);
            }}
            className="mt-5 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {roles.map((role) => (
            <article
              key={role.slug}
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
                      {splitRate(role.salary, role.unit).amount}
                    </span>
                    <span className="font-jbmono text-[10px] tracking-wide text-gray-500">
                      {splitRate(role.salary, role.unit).period}
                    </span>
                  </div>
                  <Link
                    href={`/careers/${role.slug}`}
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

      {/* Pagination — each page is a separate request, so the browser only
          ever holds one page of roles rather than the whole table. */}
      {pagination.totalPages > 1 && (
        <nav
          aria-label="Roles pagination"
          className="flex flex-wrap items-center justify-center gap-2 pt-8"
        >
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={!pagination.hasPrevPage || loading}
            className="border border-gray-200 bg-white px-4 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200"
          >
            ← Prev
          </button>

          {pageNumbers.map((n, i) =>
            n === ELLIPSIS ? (
              <span
                key={`gap-${i}`}
                aria-hidden
                className="px-1 font-jbmono text-xs text-gray-400"
              >
                …
              </span>
            ) : (
              <button
                key={n}
                type="button"
                onClick={() => goToPage(n)}
                disabled={loading}
                aria-current={n === page ? "page" : undefined}
                className={`min-w-10 border px-3 py-2.5 font-jbmono text-xs font-bold transition-colors disabled:cursor-not-allowed ${
                  n === page
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-gray-200 bg-white text-neutral-900 hover:border-neutral-900/40"
                }`}
              >
                {n}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={!pagination.hasNextPage || loading}
            className="border border-gray-200 bg-white px-4 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200"
          >
            Next →
          </button>
        </nav>
      )}
    </>
  );
}
