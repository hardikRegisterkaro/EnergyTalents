import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-demand cache invalidation, called by the CMS after any content mutation.
 *
 * The CMS has been posting here since before this route existed (see
 * revalidateFrontendTags in the CMS), and it swallows failures — so a missing
 * route showed up only as content that never refreshed.
 *
 * Contract: POST { tags: string[] } with an `x-revalidate-secret` header
 * matching REVALIDATE_SECRET on both sides.
 */

/**
 * Hosting dashboards often paste values with surrounding quotes or whitespace
 * that dotenv would have stripped, so normalize before comparing.
 */
const normalize = (v: string | null | undefined) =>
  (v ?? "").trim().replace(/^['"]|['"]$/g, "");

/** Constant-time compare so a wrong secret can't be guessed byte by byte. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const expected = normalize(process.env.REVALIDATE_SECRET);

  // Fail closed: with no secret configured, refuse rather than accept anything.
  if (!expected) {
    console.error("Revalidate: REVALIDATE_SECRET is not set on the frontend.");
    return NextResponse.json(
      { revalidated: false, message: "Revalidation is not configured." },
      { status: 500 }
    );
  }

  const provided = normalize(req.headers.get("x-revalidate-secret"));
  if (!safeEqual(provided, expected)) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid revalidation secret." },
      { status: 401 }
    );
  }

  let tags: unknown;
  try {
    ({ tags } = await req.json());
  } catch {
    return NextResponse.json(
      { revalidated: false, message: "Body must be JSON: { tags: string[] }" },
      { status: 400 }
    );
  }

  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
    return NextResponse.json(
      { revalidated: false, message: "`tags` must be an array of strings." },
      { status: 400 }
    );
  }

  // Next 16 caps tags at 256 characters; drop anything longer rather than
  // letting one bad tag throw and abandon the rest of the batch.
  const valid = (tags as string[]).filter((t) => t.length > 0 && t.length <= 256);

  for (const tag of valid) {
    // "max" gives stale-while-revalidate semantics. Calling revalidateTag
    // without this second argument is deprecated in Next 16.
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tags: valid, count: valid.length });
}
