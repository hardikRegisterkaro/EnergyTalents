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
  /** Section heading above the write-up. */
  overviewHeading: string;
  /** The write-up itself, one string per paragraph. */
  overview: string[];
  /** Disciplines crewed in this sector, shown beside the write-up. */
  supplies: { title: string; body: string }[];
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
    overviewHeading: "Crewing the energy transition",
    overview: [
      "Renewables build faster than the workforce behind them. Offshore wind farms, utility-scale solar and the grid connections tying them in all compete for the same certified people — and the certification, not the willingness, is what limits supply.",
      "We crew the build and the run: technicians who hold current GWO and working-at-height tickets, EPC crews who have commissioned at scale before, and the high-voltage specialists who make the connection. Many transfer from oil and gas, where the offshore discipline is already second nature and only the sector-specific modules are missing.",
    ],
    supplies: [
      { title: "Wind technicians", body: "GWO-certified turbine techs for installation, commissioning and O&M campaigns." },
      { title: "Solar EPC crews", body: "Site managers, electrical supervisors and installation teams for utility-scale builds." },
      { title: "Grid & HV specialists", body: "Substation, cabling and high-voltage commissioning engineers for connection works." },
      { title: "Commissioning leads", body: "Handover-focused engineers who take an asset from mechanical completion to output." },
    ],
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
    overviewHeading: "From spud to shutdown",
    overview: [
      "Upstream and downstream work runs to fixed windows: a drilling campaign, a turnaround, a commissioning date. Miss the crew and the whole schedule moves, which is why the roles that are hardest to certify are also the ones most likely to hold a project up.",
      "We hold pre-cleared pools for exactly those positions — drilling supervisors, mud engineers, commissioning leads — with tickets validated against the issuing body before anyone mobilizes, and rotation cover planned before the first crew change rather than after it.",
    ],
    supplies: [
      { title: "Drilling crews", body: "Supervisors, toolpushers and mud engineers for onshore and offshore campaigns." },
      { title: "Commissioning & start-up", body: "Discipline engineers and commissioning leads for LNG, refining and processing." },
      { title: "Turnaround & shutdown", body: "Surge crews mobilized to a fixed window and demobilized cleanly afterwards." },
      { title: "Production & maintenance", body: "Operators, technicians and integrity specialists for steady-state running." },
    ],
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
    overviewHeading: "The crews behind the megaproject",
    overview: [
      "Resource and infrastructure megaprojects fail on people long before they fail on engineering. An EPC programme needs discipline engineers, planners and quality inspectors on site in the right sequence, in a country where few of them live.",
      "We supply the technical layer of those programmes and carry the compliance that comes with it — local employment law, tax, right-to-work and mobilization — so the project team manages the build rather than the paperwork behind each person on it.",
    ],
    supplies: [
      { title: "EPC management", body: "Project, construction and package managers for multi-discipline programmes." },
      { title: "Discipline engineers", body: "Civil, structural, mechanical, electrical and instrumentation across design and site." },
      { title: "Planning & controls", body: "Planners, cost engineers and document controllers keeping the programme honest." },
      { title: "QA/QC & inspection", body: "Welding, coatings and materials inspectors working to project and code standards." },
    ],
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
    overviewHeading: "Certified crew, cleared to sail",
    overview: [
      "Marine crewing is a documentation problem as much as a hiring one. A seafarer is only deployable when the ticket, the medical, the flag-state clearance and the visa all line up — and any one of them lapsing stops the crew change, not just the individual.",
      "We crew vessels, rigs and FPSOs with certificates verified at source and tracked to expiry, contracts written to MLC 2006, and a crew-change desk that owns travel, transfers and port agency as one workstream instead of three separate handoffs.",
    ],
    supplies: [
      { title: "DP operators", body: "Full and limited DP certification for drillships and construction vessels." },
      { title: "Deck & engine officers", body: "Masters, chief officers, chief engineers and ETOs across tonnage classes." },
      { title: "Subsea & ROV", body: "ROV pilots, technicians and survey personnel for inspection and IMR campaigns." },
      { title: "Marine crew", body: "ABs, bosuns and deckhands with current STCW basic safety training." },
    ],
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
