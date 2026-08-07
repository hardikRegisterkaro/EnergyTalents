/**
 * Prepare CMS-authored article HTML for rendering.
 *
 * The TipTap editor emits plain `<h2>` / `<h3>` with no `id`, so the sidebar
 * table of contents has nothing to link to. This walks the headings once and
 * returns both the augmented HTML and the heading list, guaranteeing the
 * anchors and the TOC agree — deriving them separately would let them drift
 * whenever the slugify rules or duplicate handling changed on one side.
 */

export type ArticleHeading = {
  id: string;
  label: string;
  level: 2 | 3;
};

/** Matches h2/h3 blocks, capturing the attributes and inner markup. */
const HEADING_RE = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
const EXISTING_ID_RE = /\sid\s*=\s*["']([^"']+)["']/i;

/** Strip tags and decode the handful of entities TipTap emits. */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function processArticleHtml(html: string | null | undefined): {
  html: string;
  headings: ArticleHeading[];
} {
  if (!html) return { html: "", headings: [] };

  const headings: ArticleHeading[] = [];
  const used = new Set<string>();

  const out = html.replace(
    HEADING_RE,
    (match, level: string, attrs: string, inner: string) => {
      const label = toPlainText(inner);
      // A heading with no text (a stray empty block) is not worth an anchor.
      if (!label) return match;

      const existing = attrs.match(EXISTING_ID_RE)?.[1];
      let id = existing || slugify(label) || `section-${headings.length + 1}`;

      // Two headings with the same wording would otherwise produce one anchor
      // that always jumps to the first.
      if (!existing && used.has(id)) {
        let n = 2;
        while (used.has(`${id}-${n}`)) n += 1;
        id = `${id}-${n}`;
      }
      used.add(id);

      headings.push({
        id,
        label,
        level: level === "3" ? 3 : 2,
      });

      const withId = existing ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${withId}>${inner}</h${level}>`;
    }
  );

  return { html: out, headings };
}
