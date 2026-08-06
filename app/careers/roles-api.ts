/**
 * Careers data — served by the CMS public API.
 *
 * Replaces the hand-maintained array in `roles-data.ts`. The payload shape is
 * deliberately identical to the old `Role` type, including the derived
 * `posted` label and `days` sort key, so components did not need reshaping.
 *
 * Caching note (Next 16, `cacheComponents` is NOT enabled on this project):
 * `fetch` is uncached by default, so every cached read below opts in with
 * `cache: "force-cache"` and carries a tag. The CMS calls
 * POST /api/revalidate with those tags after any career mutation, which is
 * handled by app/api/revalidate/route.ts.
 */

export type Role = {
  slug: string;
  title: string;
  category: string;
  location: string;
  type: string;
  duration: string;
  salary: string;
  unit: string;
  featured: boolean;
  summary: string | null;
  /** Human label, e.g. "3 days ago". Derived by the CMS from publishedAt. */
  posted: string;
  /** Age in days — used for sorting; smaller = newer. */
  days: number;
};

export type RoleDetail = Role & {
  /** Job description authored in the CMS TipTap editor, stored as HTML. */
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type RolesResponse = {
  success: boolean;
  roles: Role[];
  /** Total matching the filters — not the length of this page. */
  total: number;
  pagination: Pagination;
  filters: {
    /** Editor-managed discipline tabs, in the order configured in the CMS. */
    disciplines?: Array<{ name: string; slug: string }>;
    categories: string[];
    types: string[];
    locations: string[];
  };
};

/**
 * The default tab. Not a stored discipline — it means "no category filter".
 * The remaining tabs come from the CMS so editors can add a discipline
 * without a code change; see `tabsFrom()` below.
 */
export const ALL_ROLES = "All roles";

/** Build the tab list: "All roles" plus every active discipline from the CMS. */
export function tabsFrom(filters: RolesResponse["filters"] | undefined): string[] {
  const names = filters?.categories ?? [];
  return [ALL_ROLES, ...names];
}

/**
 * Base URL of the CMS. Public because the roles explorer re-queries the API
 * from the browser as the visitor types and switches disciplines.
 */
export const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Split a role's pay into amount and period for display.
 *
 * Authors naturally type the period into the salary box ("£700–820/day") as
 * well as picking it from the dropdown, which rendered as "£700–820/day/day".
 * Rather than police the input, strip a trailing unit off the amount so the
 * two parts are always rendered from a single normalized source.
 */
export function splitRate(salary: string, unit: string): { amount: string; period: string } {
  const amount = salary.trim();
  const period = unit.trim();
  if (period && amount.toLowerCase().endsWith(period.toLowerCase())) {
    return { amount: amount.slice(0, -period.length).trim(), period };
  }
  return { amount, period };
}

/** The same value as one string, e.g. "£700–820/day". */
export function formatRate(salary: string, unit: string): string {
  const { amount, period } = splitRate(salary, unit);
  return `${amount}${period}`;
}

/** How many roles the public listing shows per page. */
export const PAGE_SIZE = 6;

export type RoleQuery = {
  q?: string;
  category?: string;
  type?: string;
  sort?: "newest" | "oldest";
  featured?: boolean;
  limit?: number;
  /** 1-based. Omit to fetch every match (used by generateStaticParams). */
  page?: number;
};

/** Build the query string the CMS `/client` endpoint expects. */
export function rolesQueryString(params: RoleQuery = {}): string {
  const sp = new URLSearchParams();
  if (params.q?.trim()) sp.set("q", params.q.trim());
  // "All roles" means no filter — sending it would match zero rows.
  if (params.category && params.category !== ALL_ROLES) sp.set("category", params.category);
  if (params.type) sp.set("type", params.type);
  if (params.sort) sp.set("sort", params.sort);
  if (params.featured) sp.set("featured", "true");
  if (params.limit) sp.set("limit", String(params.limit));
  if (params.page) sp.set("page", String(params.page));
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

const EMPTY: RolesResponse = {
  success: false,
  roles: [],
  total: 0,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: PAGE_SIZE,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: { disciplines: [], categories: [], types: [], locations: [] },
};

/**
 * Server-side roles fetch used for the initial render.
 * Never throws — the careers page must still render its hero and pipeline form
 * if the CMS is unreachable.
 */
export async function getRoles(params: RoleQuery = {}): Promise<RolesResponse> {
  try {
    const res = await fetch(`${CMS_URL}/api/careers/client${rolesQueryString(params)}`, {
      cache: "force-cache",
      next: { tags: ["career-list"] },
    });
    if (!res.ok) return EMPTY;
    return (await res.json()) as RolesResponse;
  } catch {
    return EMPTY;
  }
}

/** Server-side detail fetch. Returns null for drafts, unknown slugs or errors. */
export async function getRole(slug: string): Promise<RoleDetail | null> {
  try {
    const res = await fetch(`${CMS_URL}/api/careers/client/${encodeURIComponent(slug)}`, {
      cache: "force-cache",
      next: { tags: [`career-${slug}`] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { success: boolean; role: RoleDetail };
    return data.success ? data.role : null;
  } catch {
    return null;
  }
}

/**
 * Browser-side roles fetch, used by the explorer when filters change.
 * `signal` lets a newer keystroke abort the request in flight.
 */
export async function fetchRolesClient(
  params: RoleQuery,
  signal?: AbortSignal
): Promise<RolesResponse> {
  const res = await fetch(`${CMS_URL}/api/careers/client${rolesQueryString(params)}`, {
    signal,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Roles request failed (${res.status})`);
  return (await res.json()) as RolesResponse;
}
