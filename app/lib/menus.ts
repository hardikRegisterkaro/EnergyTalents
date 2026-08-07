/**
 * Header and footer navigation — served by the CMS, with the shipped menus as
 * a fallback.
 *
 * Unlike the blog, an empty response here is NOT a valid state to render: a
 * site with no navigation is broken, not "not yet populated". So every read
 * falls back to the DEFAULT_* structures below, which are the menus the site
 * shipped with. The CMS takes over the moment an editor saves something.
 *
 * The CMS stores these as free-form JSON (HeaderMenu.mainMenu /
 * FooterMenu.mainMenu), authored by the dashboard editors in
 * energy-talent-cms/app/dashboard/{header,footer}-menu. The `Cms*` types below
 * mirror that shape exactly — including the editor's habit of writing `false`
 * rather than an empty array for "no children" — and `toNav()` / `toColumns()`
 * translate it into what the components render.
 */

const CMS_URL = (
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const HEADER_MENU_TAG = "header-menu";
export const FOOTER_MENU_TAG = "footer-menu";

/**
 * Cache policy. Same reasoning as the blog: in development the CMS's
 * revalidation ping goes to PRODUCTION_URL rather than the dev server, and
 * Next persists the fetch cache to .next/cache, so a cached menu would
 * survive both publishing and a restart.
 */
function cacheFor(tags: string[]): RequestInit & { next?: { tags: string[] } } {
  return process.env.NODE_ENV === "development"
    ? { cache: "no-store" }
    : { cache: "force-cache", next: { tags } };
}

// ── What the CMS stores ───────────────────────────────────────────────────

/** The editor writes `false`, not `[]`, when an item has no children. */
type CmsChildren<T> = T[] | false | null | undefined;

type CmsSubChild = { title?: string; url?: string };

type CmsChild = {
  title?: string;
  url?: string;
  sub_child_menu?: CmsChildren<CmsSubChild>;
};

type CmsMenuItem = {
  title?: string;
  url?: string;
  child_menu?: CmsChildren<CmsChild>;
};

/** Utility-bar content on the header. Only the CTA is rendered today. */
type CmsHeaderContact = {
  whatsappLabel?: string;
  whatsappNumber?: string;
  careLabel?: string;
  careNumber?: string;
  ctaText?: string;
  ctaUrl?: string;
};

type CmsFooterContact = {
  title?: string;
  type?: "email" | "phone" | "address" | "social" | "link" | "text";
  value?: string;
  url?: string;
  image?: string;
};

// ── What the components render ────────────────────────────────────────────

export type NavLink = { label: string; href: string; desc?: string };

/** A top-level nav entry: either a plain link or a dropdown of links. */
export type NavItem =
  | { label: string; href: string }
  | { label: string; children: NavLink[] };

export type HeaderMenu = {
  nav: NavItem[];
  cta: { label: string; href: string };
};

export type FooterColumn = { title: string; links: NavLink[] };

export type FooterContact = {
  /** Rendered as paragraphs in the address block. */
  lines: string[];
  phone: { label: string; href: string } | null;
  email: { label: string; href: string } | null;
  socials: NavLink[];
};

export type FooterMenu = {
  columns: FooterColumn[];
  contact: FooterContact | null;
};

// ── Defaults (what the site shipped with) ─────────────────────────────────

export const DEFAULT_HEADER: HeaderMenu = {
  nav: [
    { label: "About Us", href: "/about" },
    {
      label: "Services",
      children: [
        {
          label: "Contract Manpower Supply",
          href: "/services/contract-manpower-supply",
          desc: "Vetted, compliant technical crews deployed across energy projects.",
        },
      ],
    },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "Careers", href: "/careers" },
    { label: "Insights", href: "/blog" },
  ],
  cta: { label: "Request Technical Crew", href: "/contact-us" },
};

export const DEFAULT_FOOTER: FooterMenu = {
  columns: [
    {
      title: "Sectors",
      links: [
        { label: "Oil & Gas", href: "/careers#roles" },
        { label: "Offshore & Marine", href: "/careers#roles" },
        { label: "Renewables", href: "/careers#roles" },
        { label: "Construction", href: "/careers#roles" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Recruitment", href: "/careers" },
        { label: "Mobilization", href: "/about#crisis" },
        { label: "Global Payroll", href: "/about#hse" },
        { label: "Verification", href: "/about#hse" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Leadership", href: "/about#team" },
        { label: "Careers", href: "/careers" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "mailto:immanuel@energytalentz.com" },
      ],
    },
    {
      title: "Compliance",
      links: [
        { label: "ISO Certifications", href: "/about#hse" },
        { label: "MLC 2006 Policy", href: "/about#hse" },
        { label: "Modern Slavery Statement", href: "/about#hse" },
        { label: "Data Protection", href: "/about#hse" },
      ],
    },
  ],
  contact: null,
};

/** The address block, shown when the CMS has no contact details of its own. */
export const DEFAULT_FOOTER_CONTACT: FooterContact = {
  lines: [
    "7A, Muthu Vinayagar Koil Street, Panagudi Post,",
    "Radhapuram Taluk, Tirunelveli District,",
    "Tamil Nadu, India — 627109",
  ],
  phone: { label: "+91 91766 74449", href: "tel:+919176674449" },
  email: {
    label: "immanuel@energytalentz.com",
    href: "mailto:immanuel@energytalentz.com",
  },
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

// ── Mapping ───────────────────────────────────────────────────────────────

/** `false` / null / non-array all mean "no children". */
function childrenOf<T>(value: CmsChildren<T>): T[] {
  return Array.isArray(value) ? value : [];
}

/** An entry is only usable if it has both a label and a destination. */
function toLink(item: { title?: string; url?: string }): NavLink | null {
  const label = (item.title ?? "").trim();
  const href = (item.url ?? "").trim();
  if (!label || !href) return null;
  return { label, href };
}

function toNav(items: CmsMenuItem[]): NavItem[] {
  const out: NavItem[] = [];

  for (const item of items) {
    const label = (item.title ?? "").trim();
    if (!label) continue;

    const children = childrenOf(item.child_menu)
      .map(toLink)
      .filter((l): l is NavLink => l !== null);

    if (children.length > 0) {
      out.push({ label, children });
      continue;
    }

    // No children — needs its own URL to be a link at all.
    const href = (item.url ?? "").trim();
    if (href) out.push({ label, href });
  }

  return out;
}

function toColumns(items: CmsMenuItem[]): FooterColumn[] {
  const out: FooterColumn[] = [];

  for (const item of items) {
    const title = (item.title ?? "").trim();
    if (!title) continue;

    const links = childrenOf(item.child_menu)
      .map(toLink)
      .filter((l): l is NavLink => l !== null);

    // A footer column with no links is an empty heading — skip it.
    if (links.length > 0) out.push({ title, links });
  }

  return out;
}

/** Turn the CMS's typed contact rows into the blocks the footer renders. */
function toFooterContact(items: CmsFooterContact[]): FooterContact | null {
  const contact: FooterContact = { lines: [], phone: null, email: null, socials: [] };

  for (const item of items) {
    const label = (item.value ?? item.title ?? "").trim();
    const url = (item.url ?? "").trim();
    if (!label && !url) continue;

    switch (item.type) {
      case "phone":
        if (!contact.phone && label) {
          contact.phone = { label, href: url || `tel:${label.replace(/[^\d+]/g, "")}` };
        }
        break;
      case "email":
        if (!contact.email && label) {
          contact.email = { label, href: url || `mailto:${label}` };
        }
        break;
      case "social":
        if (url) contact.socials.push({ label: item.title?.trim() || label, href: url });
        break;
      case "address":
      case "text":
        if (label) contact.lines.push(label);
        break;
      case "link":
      default:
        if (label && url) contact.socials.push({ label, href: url });
        else if (label) contact.lines.push(label);
        break;
    }
  }

  const empty =
    contact.lines.length === 0 &&
    !contact.phone &&
    !contact.email &&
    contact.socials.length === 0;

  return empty ? null : contact;
}

// ── Fetching ──────────────────────────────────────────────────────────────

/**
 * Header nav + CTA.
 *
 * Falls back to DEFAULT_HEADER whenever the CMS is unreachable, errors, or
 * has nothing configured — navigation is not optional.
 */
export async function getHeaderMenu(): Promise<HeaderMenu> {
  try {
    const res = await fetch(`${CMS_URL}/api/header-menu`, cacheFor([HEADER_MENU_TAG]));
    if (!res.ok) return DEFAULT_HEADER;

    const json = (await res.json()) as {
      success?: boolean;
      headerMenu?: { main_menu?: CmsMenuItem[]; contact_details?: CmsHeaderContact | null };
    };
    if (!json?.success) return DEFAULT_HEADER;

    const nav = toNav(
      Array.isArray(json.headerMenu?.main_menu) ? json.headerMenu.main_menu : []
    );
    const details = json.headerMenu?.contact_details ?? null;
    const ctaLabel = (details?.ctaText ?? "").trim();
    const ctaHref = (details?.ctaUrl ?? "").trim();

    return {
      // Menu and CTA fall back independently: an editor may configure the nav
      // without touching the utility bar, and losing the CTA would cost the
      // site its primary conversion path.
      nav: nav.length > 0 ? nav : DEFAULT_HEADER.nav,
      cta:
        ctaLabel && ctaHref
          ? { label: ctaLabel, href: ctaHref }
          : DEFAULT_HEADER.cta,
    };
  } catch {
    return DEFAULT_HEADER;
  }
}

/** Footer columns + contact block, falling back the same way. */
export async function getFooterMenu(): Promise<FooterMenu> {
  try {
    const res = await fetch(`${CMS_URL}/api/footer-menu`, cacheFor([FOOTER_MENU_TAG]));
    if (!res.ok) return { ...DEFAULT_FOOTER, contact: DEFAULT_FOOTER_CONTACT };

    const json = (await res.json()) as {
      success?: boolean;
      footerMenu?: { main_menu?: CmsMenuItem[]; contact_details?: CmsFooterContact[] };
    };
    if (!json?.success) return { ...DEFAULT_FOOTER, contact: DEFAULT_FOOTER_CONTACT };

    const columns = toColumns(
      Array.isArray(json.footerMenu?.main_menu) ? json.footerMenu.main_menu : []
    );
    const contact = toFooterContact(
      Array.isArray(json.footerMenu?.contact_details)
        ? json.footerMenu.contact_details
        : []
    );

    return {
      columns: columns.length > 0 ? columns : DEFAULT_FOOTER.columns,
      contact: contact ?? DEFAULT_FOOTER_CONTACT,
    };
  } catch {
    return { ...DEFAULT_FOOTER, contact: DEFAULT_FOOTER_CONTACT };
  }
}
