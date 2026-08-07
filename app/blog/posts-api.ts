/**
 * Blog data — served by the CMS public API.
 *
 * Replaces the hand-maintained array in `articles.ts`. Mirrors the approach in
 * `careers/roles-api.ts`: typed helpers, cached reads carrying a tag, and
 * derived display fields (initials, formatted date, read-time label) computed
 * here so the components stay presentational.
 *
 * Caching note (Next 16, `cacheComponents` is NOT enabled on this project):
 * `fetch` is uncached by default, so every cached read below opts in with
 * `cache: "force-cache"` and a tag. The CMS calls POST /api/revalidate with
 * ["post-list", `post-<slug>`] after any post mutation — those exact strings
 * are defined in energy-talent-cms/app/api/post/create-update-delete-post,
 * so they must not be renamed on one side only.
 */

export const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/** Cache tags, kept in one place so they cannot drift from the CMS. */
export const POST_LIST_TAG = "post-list";
export const postTag = (slug: string) => `post-${slug}`;

export type PostCategory = {
  id: string;
  name: string;
  slug: string;
  color: string;
};

export type PostAuthor = {
  id: string;
  username: string;
};

/** A post as it appears in listings. */
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Derived by the CMS from the body word count. */
  readTimeMinutes: number;
  author: PostAuthor | null;
  /** A post can carry several categories; the UI shows the first. */
  category: PostCategory[];
};

/** A single post, including the body authored in the CMS TipTap editor. */
export type BlogPostDetail = BlogPost & {
  /** Sanitised HTML from the editor. */
  content: string | null;
  faq_items: Array<{ question: string; answer: string }>;
  additionalFields: Record<string, unknown>;
  schema: unknown;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PostsResponse = {
  posts: BlogPost[];
  pagination: Pagination;
};

/** The default filter tab. Not a stored category — it means "no filter". */
export const ALL_POSTS = "All posts";

/** How many cards the explorer requests per page. */
export const PAGE_SIZE = 9;

// ── Display helpers ───────────────────────────────────────────────────────

/** "Sofia Okonkwo" -> "SO". Falls back to the first two characters. */
export function initialsFrom(name: string | null | undefined): string {
  const clean = (name ?? "").trim();
  if (!clean) return "ET";
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

/** "May 28, 2026". Returns "" when the CMS has no date yet (unpublished). */
export function formatPostDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function readTimeLabel(minutes: number | null | undefined): string {
  const m = Math.max(1, Math.round(minutes ?? 1));
  return `${m} min read`;
}

/** The category shown on a card — a post may have several, or none. */
export function primaryCategory(post: Pick<BlogPost, "category">): string {
  return post.category?.[0]?.name ?? "Insights";
}

/** The date a reader cares about: publication, falling back to creation. */
export function postDate(post: Pick<BlogPost, "publishedAt" | "createdAt">): string {
  return formatPostDate(post.publishedAt ?? post.createdAt);
}

// ── Fetching ──────────────────────────────────────────────────────────────

const EMPTY: PostsResponse = {
  posts: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    limit: PAGE_SIZE,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

type PostsParams = {
  page?: number;
  limit?: number;
  /** Category *slug*; omit or pass ALL_POSTS for everything. */
  category?: string;
};

/**
 * Listing endpoint. The CMS splits these: /filter handles a category, and
 * /all-blog is the unfiltered feed ordered by most recent activity.
 */
function listUrl({ page = 1, limit = PAGE_SIZE, category }: PostsParams): string {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category && category !== ALL_POSTS) {
    params.set("category", category);
    return `${CMS_URL}/api/post/client/filter?${params}`;
  }
  return `${CMS_URL}/api/post/client/all-blog?${params}`;
}

function normalizeList(json: unknown): PostsResponse {
  const data = json as Partial<PostsResponse> & { success?: boolean };
  if (!data?.success || !Array.isArray(data.posts)) return EMPTY;
  return {
    posts: data.posts,
    pagination: { ...EMPTY.pagination, ...(data.pagination ?? {}) },
  };
}

/**
 * Posts for the index and the explorer.
 *
 * Never throws: an unreachable CMS renders an empty blog rather than a 500,
 * matching how careers degrades.
 */
export async function getPosts(params: PostsParams = {}): Promise<PostsResponse> {
  try {
    const res = await fetch(listUrl(params), {
      cache: "force-cache",
      next: { tags: [POST_LIST_TAG] },
    });
    if (!res.ok) return EMPTY;
    return normalizeList(await res.json());
  } catch {
    return EMPTY;
  }
}

/** Client-side variant used by the explorer; uncached so filters feel live. */
export async function fetchPosts(params: PostsParams = {}): Promise<PostsResponse> {
  try {
    const res = await fetch(listUrl(params), { cache: "no-store" });
    if (!res.ok) return EMPTY;
    return normalizeList(await res.json());
  } catch {
    return EMPTY;
  }
}

/** One post by slug, or null when it is missing or unpublished. */
export async function getPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(
      `${CMS_URL}/api/post/client/detail-blog?slug=${encodeURIComponent(slug)}`,
      { cache: "force-cache", next: { tags: [postTag(slug)] } }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; post?: BlogPostDetail };
    return json?.success && json.post ? json.post : null;
  } catch {
    return null;
  }
}

/**
 * Editor-managed category tabs, in the order configured in the CMS.
 *
 * /filter with no `category` returns the category list rather than posts —
 * an odd shape, but it is what the endpoint provides.
 */
export async function getCategories(): Promise<PostCategory[]> {
  try {
    const res = await fetch(`${CMS_URL}/api/post/client/filter`, {
      cache: "force-cache",
      next: { tags: [POST_LIST_TAG] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { success?: boolean; categories?: PostCategory[] };
    return json?.success && Array.isArray(json.categories) ? json.categories : [];
  } catch {
    return [];
  }
}

/** Every published slug — used by generateStaticParams and the sitemap. */
export async function getPostSlugs(): Promise<
  Array<{ slug: string; updatedAt?: string; publishedAt?: string }>
> {
  try {
    const res = await fetch(`${CMS_URL}/api/post/client/sitemap`, {
      cache: "force-cache",
      next: { tags: [POST_LIST_TAG] },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      success?: boolean;
      posts?: Array<{ slug: string; updatedAt?: string; publishedAt?: string }>;
    };
    return json?.success && Array.isArray(json.posts) ? json.posts : [];
  } catch {
    return [];
  }
}

/**
 * Up to `limit` other posts to show under an article.
 *
 * Prefers posts sharing a category, then backfills with the most recent so the
 * strip is not half-empty on a site with few posts.
 */
export async function getRelatedPosts(
  current: BlogPost,
  limit = 3
): Promise<BlogPost[]> {
  const categorySlug = current.category?.[0]?.slug;

  const sameCategory = categorySlug
    ? (await getPosts({ category: categorySlug, limit: limit + 1 })).posts
    : [];

  const picked = sameCategory.filter((p) => p.slug !== current.slug).slice(0, limit);
  if (picked.length >= limit) return picked;

  const recent = (await getPosts({ limit: limit + picked.length + 1 })).posts;
  for (const post of recent) {
    if (picked.length >= limit) break;
    if (post.slug === current.slug) continue;
    if (picked.some((p) => p.slug === post.slug)) continue;
    picked.push(post);
  }
  return picked;
}
