export const RIG_IMAGE_STYLE: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(circle at 62% 88%, rgba(251,146,60,0.75), rgba(251,146,60,0) 42%), linear-gradient(180deg, #171717 0%, #292524 46%, #7c2d12 82%, #c2410c 100%)",
};

export const CATEGORIES = [
  "All posts",
  "Market trends",
  "Renewables",
  "Compliance",
  "Mobility",
  "Oil & Gas",
  "Workforce",
];

export type Article = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  initials: string;
  date: string;
};

// Author role + bio, keyed by initials (authors recur across articles).
export const AUTHORS: Record<string, { role: string; bio: string }> = {
  SO: {
    role: "Head of Market Intelligence",
    bio: "Sofia leads workforce and market analysis at Energy Talents, tracking rotation demand, rate movements and mobility trends across the global energy sector.",
  },
  PN: {
    role: "Renewables Desk Lead",
    bio: "Priya leads renewables crewing at Energy Talents, placing GWO-ticketed technicians on wind and solar projects worldwide.",
  },
  OA: {
    role: "Head of Compliance",
    bio: "Omar oversees contractor compliance and mobility at Energy Talents, keeping cross-border deployments audit-clean.",
  },
  DH: {
    role: "Mobilization Lead",
    bio: "Declan runs mobilization logistics at Energy Talents, moving crews, kit and paperwork across four continents.",
  },
  ML: {
    role: "Market Analyst",
    bio: "Markus tracks day rates and demand signals across the offshore energy market for Energy Talents.",
  },
  AR: {
    role: "Workforce Insights Lead",
    bio: "Amara studies retention, rotation patterns and crew wellbeing across 24,000+ deployments for Energy Talents.",
  },
};

export const FEATURED: Article = {
  slug: "2026-energy-workforce-squeeze",
  category: "Market trends",
  readTime: "8 min read",
  title: "The 2026 energy workforce squeeze — and how operators are responding",
  excerpt:
    "Demand for ticketed offshore crew is outpacing supply across three continents. Here's where the pressure is highest — and what the best operators are doing about it.",
  author: "Sofia Okonkwo",
  initials: "SO",
  date: "May 28, 2026",
};

export const ARTICLES: Article[] = [
  {
    slug: "offshore-wind-technician-demand",
    category: "Renewables",
    readTime: "6 min read",
    title: "What the offshore wind boom means for technician demand",
    excerpt:
      "GWO-ticketed techs are the new bottleneck. Where the next wave of capacity is being trained.",
    author: "Priya Nair",
    initials: "PN",
    date: "May 24, 2026",
  },
  {
    slug: "right-to-work-2026-rules",
    category: "Compliance",
    readTime: "5 min read",
    title: "Right-to-work in 2026: the rules that changed this quarter",
    excerpt:
      "Three jurisdictions tightened contractor classification. What mobilization teams need to know.",
    author: "Omar Al-Farsi",
    initials: "OA",
    date: "May 19, 2026",
  },
  {
    slug: "mobilizing-200-crew-72-hours",
    category: "Mobility",
    readTime: "7 min read",
    title: "Mobilizing 200 crew in 72 hours: a logistics teardown",
    excerpt:
      "Visas, medicals, flights and kit — how a large rotation comes together under deadline.",
    author: "Declan Hayes",
    initials: "DH",
    date: "May 14, 2026",
  },
  {
    slug: "day-rates-west-africa",
    category: "Market trends",
    readTime: "4 min read",
    title: "Day rates are climbing in West Africa — here's why",
    excerpt:
      "Tight supply of senior supervisors is pushing offshore rates to multi-year highs.",
    author: "Markus Lindqvist",
    initials: "ML",
    date: "May 9, 2026",
  },
  {
    slug: "retention-on-rotation",
    category: "Workforce",
    readTime: "6 min read",
    title: "Retention on rotation: what actually keeps crews coming back",
    excerpt:
      "Pay matters, but it's rarely the whole story. Data from 24,000 deployments says otherwise.",
    author: "Amara Reuben",
    initials: "AR",
    date: "May 3, 2026",
  },
  {
    slug: "lng-next-wave-commissioning-talent",
    category: "Oil & Gas",
    readTime: "5 min read",
    title: "LNG's next wave: where the commissioning talent will come from",
    excerpt:
      "A surge of LNG capacity is landing in 2027. The commissioning workforce isn't ready yet.",
    author: "Sofia Okonkwo",
    initials: "SO",
    date: "Apr 28, 2026",
  },
  {
    slug: "offshore-rates-q3",
    category: "Market trends",
    readTime: "5 min read",
    title: "Where offshore rates are heading into Q3",
    excerpt:
      "Benchmarks from Q2 point to another leg up for senior offshore roles. Where the pressure is building.",
    author: "Markus Lindqvist",
    initials: "ML",
    date: "Apr 24, 2026",
  },
  {
    slug: "gwo-vs-opito-tickets",
    category: "Renewables",
    readTime: "6 min read",
    title: "GWO vs OPITO: which tickets open which doors",
    excerpt:
      "Two ticket schemes, very different doors. A field guide for techs weighing their next cert.",
    author: "Priya Nair",
    initials: "PN",
    date: "Apr 20, 2026",
  },
  {
    slug: "visa-bottlenecks-mobilization",
    category: "Compliance",
    readTime: "4 min read",
    title: "Visa bottlenecks: the three borders slowing mobilization",
    excerpt:
      "Three jurisdictions are stalling start dates. What mobilization teams are doing to get ahead of it.",
    author: "Omar Al-Farsi",
    initials: "OA",
    date: "Apr 15, 2026",
  },
  {
    slug: "crew-change-logistics-fuel-spike",
    category: "Mobility",
    readTime: "5 min read",
    title: "Crew-change logistics after the fuel-cost spike",
    excerpt:
      "Higher fuel costs are reshaping crew-change routing. How planners keep rotations on schedule.",
    author: "Declan Hayes",
    initials: "DH",
    date: "Apr 11, 2026",
  },
  {
    slug: "deepwater-senior-hands",
    category: "Oil & Gas",
    readTime: "7 min read",
    title: "Deepwater is back — and short on senior hands",
    excerpt:
      "Deepwater sanctioning is rebounding faster than the talent pool. The senior-hand gap, quantified.",
    author: "Sofia Okonkwo",
    initials: "SO",
    date: "Apr 6, 2026",
  },
  {
    slug: "4-week-rotation-experiment",
    category: "Workforce",
    readTime: "8 min read",
    title: "The 4-week rotation experiment: what the data shows",
    excerpt:
      "Shorter rotations promised better retention. 18 months of data tells a more complicated story.",
    author: "Amara Reuben",
    initials: "AR",
    date: "Apr 1, 2026",
  },
];

export const ALL_ARTICLES: Article[] = [FEATURED, ...ARTICLES];

export function getArticle(slug: string) {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

/** A few related articles (same category first, then recent), excluding self. */
export function relatedArticles(slug: string, count = 3) {
  const current = getArticle(slug);
  const pool = ALL_ARTICLES.filter((a) => a.slug !== slug);
  const sameCat = pool.filter((a) => a.category === current?.category);
  const rest = pool.filter((a) => a.category !== current?.category);
  return [...sameCat, ...rest].slice(0, count);
}
