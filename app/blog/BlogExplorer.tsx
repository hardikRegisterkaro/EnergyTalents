"use client";

import { useRef, useState } from "react";

import {
  ALL_POSTS,
  PAGE_SIZE,
  type BlogPost,
  type PostCategory,
  fetchPosts,
} from "./posts-api";
import ArticleCard from "./ArticleCard";

/**
 * Category filter + "load more" over the CMS post feed.
 *
 * The first page is rendered on the server and handed in, so the grid is in
 * the initial HTML. Changing category or loading more re-queries the CMS from
 * the browser, which keeps this correct as the post count grows — the old
 * version filtered a fully-shipped static array, which would not.
 */
export default function BlogExplorer({
  initialPosts,
  initialTotal,
  initialHasMore,
  categories,
}: {
  initialPosts: BlogPost[];
  initialTotal: number;
  initialHasMore: boolean;
  categories: PostCategory[];
}) {
  const [category, setCategory] = useState<string>(ALL_POSTS);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // "All posts" plus whatever the editors configured, so a new category needs
  // no code change.
  const tabs = [ALL_POSTS, ...categories.map((c) => c.name)];

  /** Category slug for the API; ALL_POSTS means no filter. */
  function slugFor(name: string): string | undefined {
    if (name === ALL_POSTS) return undefined;
    return categories.find((c) => c.name === name)?.slug ?? name;
  }

  async function selectCategory(name: string) {
    if (name === category || pending) return;
    setCategory(name);
    setPending(true);
    const res = await fetchPosts({ page: 1, category: slugFor(name) });
    setPosts(res.posts);
    setTotal(res.pagination.totalCount);
    setHasMore(res.pagination.hasNextPage);
    setPage(1);
    setPending(false);
  }

  async function loadMore() {
    if (pending || !hasMore) return;
    setPending(true);
    const next = page + 1;
    const res = await fetchPosts({ page: next, category: slugFor(category) });
    // Append rather than replace — "load more" grows the list.
    setPosts((current) => [...current, ...res.posts]);
    setHasMore(res.pagination.hasNextPage);
    setPage(next);
    setPending(false);
  }

  async function showLess() {
    setPending(true);
    const res = await fetchPosts({ page: 1, category: slugFor(category) });
    setPosts(res.posts);
    setHasMore(res.pagination.hasNextPage);
    setPage(1);
    setPending(false);
    setTimeout(
      () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      60
    );
  }

  return (
    <>
      {/* Category filters */}
      <div
        ref={topRef}
        data-aos="fade-up"
        className="flex scroll-mt-24 flex-wrap gap-2.5 pb-8"
      >
        {tabs.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              disabled={pending}
              onClick={() => selectCategory(c)}
              className={`px-4 py-2 font-jbmono text-xs font-medium uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
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
          {total} article{total === 1 ? "" : "s"}
        </span>
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="border border-dashed border-gray-300 px-6 py-16 text-center">
          <p className="font-poppins text-lg font-bold text-neutral-900">
            {category === ALL_POSTS
              ? "No articles published yet"
              : "No articles in this category yet"}
          </p>
          {category !== ALL_POSTS && (
            <button
              type="button"
              onClick={() => selectCategory(ALL_POSTS)}
              className="mt-5 border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
            >
              View all posts
            </button>
          )}
        </div>
      ) : (
        <div
          className={`grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
            pending ? "opacity-60" : ""
          }`}
        >
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      {/* Load more / show less */}
      {(hasMore || posts.length > PAGE_SIZE) && (
        <div className="flex flex-wrap justify-center gap-3 pt-12">
          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              disabled={pending}
              className="border-[1.5px] border-neutral-900/25 px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:border-neutral-900/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "[ Loading… ]" : "[ Load more articles ]"}
            </button>
          )}
          {posts.length > PAGE_SIZE && (
            <button
              type="button"
              onClick={showLess}
              disabled={pending}
              className="border-[1.5px] border-neutral-900/25 px-6 py-4 font-jbmono text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:border-neutral-900/50 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              [ Show less ]
            </button>
          )}
        </div>
      )}
    </>
  );
}
