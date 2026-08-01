"use client";

import { Suspense, createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type FilterState = {
  /** Free-text query shared between the hero search and the roles toolbar. */
  query: string;
  setQuery: (v: string) => void;
};

const FilterCtx = createContext<FilterState | null>(null);

/**
 * Seeds the shared query from a ?q= param — so links like
 * /careers?q=welder#roles (the home page "Search open jobs" card) land
 * pre-filtered. Kept in its own Suspense-wrapped island so useSearchParams
 * doesn't force the whole page out of static rendering.
 */
function QueryParamSync() {
  const { setQuery } = useFilters();
  const q = useSearchParams().get("q") ?? "";
  useEffect(() => {
    if (q) setQuery(q);
  }, [q, setQuery]);
  return null;
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <FilterCtx.Provider value={{ query, setQuery }}>
      <Suspense fallback={null}>
        <QueryParamSync />
      </Suspense>
      {children}
    </FilterCtx.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterCtx);
  if (!ctx) throw new Error("useFilters must be used within <FilterProvider>");
  return ctx;
}
