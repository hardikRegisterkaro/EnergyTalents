/**
 * The four industry sectors shown on the home page, each with its own page.
 *
 * These are a fixed set rather than CMS records: each is tied to a specific
 * photograph shipped in /public and to a position in the home page's sector
 * row, so adding a fifth is a design change, not a content edit. The copy here
 * is the same copy those cards already show.
 *
 * What each page actually lists — the open roles — comes from the CMS, keyed
 * by `category` below.
 */

export type Industry = {
  slug: string;
  /** Index shown on the card and the page, e.g. "01". */
  n: string;
  /** Single-line name, for headings and breadcrumbs. */
  title: string;
  /** Two-line form used on the home page card. */
  cardTitle: string;
  body: string;
  /** Photograph, shared with the home page card. */
  src: string;
  /** Object focal point — these shots frame the rig mid/right. */
  pos: string;
  /**
   * The CMS careers category whose roles belong to this sector.
   *
   * "HSE & Quality" deliberately maps to no industry: safety and quality roles
   * run across all four rather than belonging to one, so they appear on
   * /careers but not on a sector page.
   */
  category: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "renewable-power",
    n: "01",
    title: "Renewable Power",
    cardTitle: "Renewable\nPower",
    body: "Wind technicians, solar EPC crews and grid specialists driving the energy transition.",
    src: "/offshore-drilling-rig.webp",
    pos: "72% center",
    category: "Renewables",
  },
  {
    // "oil-and-gas", not "oil&gas": an ampersand starts the query string, so a
    // literal one would truncate the path.
    slug: "oil-and-gas",
    n: "02",
    title: "Oil & Gas",
    cardTitle: "Oil &\nGas",
    body: "Drilling, commissioning & turnaround specialists for upstream and downstream operations.",
    src: "/silhouette-oil-rig.webp",
    pos: "70% center",
    category: "Oil & Gas",
  },
  {
    slug: "infrastructure-and-civil",
    n: "03",
    title: "Infrastructure & Civil",
    cardTitle: "Infrastructure\n& Civil",
    body: "Heavy civil, EPC and processing crews for resource and infrastructure megaprojects.",
    src: "/oil-rig.webp",
    pos: "62% center",
    category: "Engineering",
  },
  {
    slug: "maritime-and-offshore",
    n: "04",
    title: "Maritime & Offshore",
    cardTitle: "Maritime\n& Offshore",
    body: "Marine crew, DP operators and deck & engine officers for vessels, rigs and FPSOs.",
    src: "/semi-submersible-oil.webp",
    pos: "66% center",
    category: "Marine & Offshore",
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
