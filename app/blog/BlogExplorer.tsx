"use client";

import { useMemo, useRef, useState } from "react";

import { ARTICLES, CATEGORIES } from "./articles";
import ArticleCard from "./ArticleCard";

const STEP = 6;

export default function BlogExplorer() {
  const [category, setCategory] = useState<string>("All posts");
  const [visible, setVisible] = useState(STEP);
  const topRef = useRef<HTMLDivElement>(null);

  // Reset pagination when the category changes (render-time state adjustment).
  const [prevCategory, setPrevCategory] = useState(category);
  if (category !== prevCategory) {
    setPrevCategory(category);
    setVisible(STEP);
  }

  // Collapse back to the first page and re-orient the user at the list top.
  const showLess = () => {
    setVisible(STEP);
    setTimeout(
      () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60,
    );
  };

  const filtered = useMemo(
    () =>
      category === "All posts"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === category),
    [category],
  );
  const shown = filtered.slice(0, visible);

  return (
    <>
      {/* Category filters */}
      <div
        ref={topRef}
        data-aos="fade-up"
        className="flex scroll-mt-24 flex-wrap gap-2.5 pb-8"
      >
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 font-jbmono text-xs font-medium uppercase tracking-wide transition-colors ${
                active
                  ? "bg-neutral-900 text-white"
                  : "border border-gray-200 bg-white text-zinc-600 hover:border-neutral-900/40 hover:text-neutral-900"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Section label + count */}
      <div data-aos="fade-up" className="flex items-center justify-between pb-8">
        <div className="flex items-center gap-3.5">
          <span className="h-[1.5px] w-6 bg-orange-500" />
          <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
            Latest articles
          </span>
        </div>
        <span className="font-jbmono text-xs uppercase tracking-wider text-gray-400">
          {filtered.length} article{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-gray-300 px-6 py-16 text-center">
          <p className="font-poppins text-lg font-bold text-neutral-900">
            No articles in this category yet
          </p>
          <button
            type="button"
            onClick={() => setCategory("All posts")}
            className="mt-5 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
          >
            View all posts
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}

      {/* Load more / show less */}
      {(visible < filtered.length || visible > STEP) && (
        <div className="flex flex-wrap justify-center gap-3 pt-12">
          {visible < filtered.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + STEP)}
              className="border-[1.5px] border-neutral-900/25 px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:border-neutral-900/50"
            >
              [ Load more articles ]
            </button>
          )}
          {visible > STEP && (
            <button
              type="button"
              onClick={showLess}
              className="border-[1.5px] border-neutral-900/25 px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:border-neutral-900/50 hover:text-neutral-900"
            >
              [ Show less ]
            </button>
          )}
        </div>
      )}
    </>
  );
}
