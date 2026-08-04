export const FILTERS = [
  "All roles",
  "Oil & Gas",
  "Renewables",
  "Marine & Offshore",
  "HSE & Quality",
  "Engineering",
] as const;

export type Role = {
  category: string;
  title: string;
  featured: boolean;
  location: string;
  type: string;
  duration: string;
  posted: string;
  /** Age in days — used for sorting; smaller = newer. */
  days: number;
  salary: string;
  unit: string;
};

export const ROLES: Role[] = [
  {
    category: "Marine & Offshore",
    title: "Senior DP Operator",
    featured: true,
    location: "North Sea, UK",
    type: "Rotational",
    duration: "6/6 rotation",
    posted: "1 day ago",
    days: 1,
    salary: "£700–820",
    unit: "/day",
  },
  {
    category: "Engineering",
    title: "Commissioning Lead — LNG",
    featured: true,
    location: "Ras Laffan, Qatar",
    type: "Contract",
    duration: "24-month",
    posted: "2 days ago",
    days: 2,
    salary: "$850–1,000",
    unit: "/day",
  },
  {
    category: "Renewables",
    title: "Wind Turbine Technician (GWO)",
    featured: true,
    location: "Rio Grande, Brazil",
    type: "Rotational",
    duration: "12-month",
    posted: "2 days ago",
    days: 2,
    salary: "€480–560",
    unit: "/day",
  },
  {
    category: "HSE & Quality",
    title: "HSE Manager — EPC",
    featured: true,
    location: "Jubail, Saudi Arabia",
    type: "Staff",
    duration: "Residential",
    posted: "3 days ago",
    days: 3,
    salary: "$160–190k",
    unit: "/yr",
  },
  {
    category: "Engineering",
    title: "Subsea Pipeline Engineer",
    featured: false,
    location: "Stavanger, Norway",
    type: "Rotational",
    duration: "4/4 rotation",
    posted: "4 days ago",
    days: 4,
    salary: "€720–840",
    unit: "/day",
  },
  {
    category: "Oil & Gas",
    title: "Drilling Supervisor",
    featured: false,
    location: "Luanda, Angola",
    type: "Rotational",
    duration: "28/28 rotation",
    posted: "5 days ago",
    days: 5,
    salary: "$900–1,050",
    unit: "/day",
  },
  {
    category: "Marine & Offshore",
    title: "Chief Officer (DP)",
    featured: false,
    location: "Gulf of Mexico, US",
    type: "Rotational",
    duration: "5/5 rotation",
    posted: "6 days ago",
    days: 6,
    salary: "$650–780",
    unit: "/day",
  },
  {
    category: "Renewables",
    title: "Solar Project Engineer",
    featured: false,
    location: "Abu Dhabi, UAE",
    type: "Contract",
    duration: "18-month",
    posted: "1 week ago",
    days: 7,
    salary: "$520–620",
    unit: "/day",
  },
  {
    category: "HSE & Quality",
    title: "QA/QC Inspector — Welding",
    featured: false,
    location: "Rotterdam, Netherlands",
    type: "Contract",
    duration: "9-month",
    posted: "1 week ago",
    days: 8,
    salary: "€400–470",
    unit: "/day",
  },
  {
    category: "Oil & Gas",
    title: "Mud Engineer",
    featured: false,
    location: "Basra, Iraq",
    type: "Rotational",
    duration: "35/35 rotation",
    posted: "10 days ago",
    days: 10,
    salary: "$700–820",
    unit: "/day",
  },
  {
    category: "Engineering",
    title: "Instrumentation Technician",
    featured: false,
    location: "Kuala Lumpur, Malaysia",
    type: "Staff",
    duration: "Residential",
    posted: "12 days ago",
    days: 12,
    salary: "$90–110k",
    unit: "/yr",
  },
  {
    category: "Marine & Offshore",
    title: "ROV Supervisor",
    featured: false,
    location: "Aberdeen, UK",
    type: "Rotational",
    duration: "4/4 rotation",
    posted: "2 weeks ago",
    days: 13,
    salary: "£560–680",
    unit: "/day",
  },
  {
    category: "Renewables",
    title: "BESS Commissioning Engineer",
    featured: false,
    location: "Perth, Australia",
    type: "Contract",
    duration: "12-month",
    posted: "2 weeks ago",
    days: 15,
    salary: "A$780–900",
    unit: "/day",
  },
  {
    category: "HSE & Quality",
    title: "Safety Officer — Offshore",
    featured: false,
    location: "Lagos, Nigeria",
    type: "Rotational",
    duration: "6/6 rotation",
    posted: "3 weeks ago",
    days: 18,
    salary: "$380–450",
    unit: "/day",
  },
];

/** URL-safe slug from a role title, e.g. "Chief Officer (DP)" → "chief-officer-dp". */
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Look up a role by its slug — used by the /careers/[slug] application page. */
export function getRole(slug: string) {
  return ROLES.find((r) => slugify(r.title) === slug);
}

export type JobDescription = {
  overview: string;
  responsibilities: string[];
  requirements: string[];
  offer: string[];
};

// Discipline-level responsibilities & requirements. Kept per-category so every
// role reads as a believable JD without hand-writing fourteen separate specs.
const BY_CATEGORY: Record<
  string,
  { responsibilities: string[]; requirements: string[] }
> = {
  "Marine & Offshore": {
    responsibilities: [
      "Maintain safe station-keeping and watchkeeping in line with the vessel's DP and marine operating procedures.",
      "Operate and monitor bridge, DP and navigation systems across each shift.",
      "Work to permit-to-work and safety-critical procedures alongside the OIM and marine team.",
      "Keep accurate logs, handovers and incident reports for every watch.",
    ],
    requirements: [
      "Valid STCW certification and a current offshore medical (OGUK / ENG1 or equivalent).",
      "BOSIET / FOET survival training valid for the region.",
      "Role-relevant DP or marine certification with verifiable sea time.",
      "Fluent English and strong situational awareness under pressure.",
    ],
  },
  Engineering: {
    responsibilities: [
      "Own engineering delivery for your discipline across design, commissioning and hand-over.",
      "Produce and review technical documentation against project specifications and codes.",
      "Coordinate with multidiscipline teams, vendors and the client's site representatives.",
      "Drive close-out of punch-list items and support a safe start-up.",
    ],
    requirements: [
      "Degree or equivalent in a relevant engineering discipline.",
      "Proven project experience in energy, oil & gas or infrastructure.",
      "Working knowledge of international standards (ISO, API, IEC) relevant to the role.",
      "Strong reporting and stakeholder-communication skills.",
    ],
  },
  Renewables: {
    responsibilities: [
      "Install, commission and maintain turbine or solar plant to manufacturer and project standards.",
      "Carry out inspections, fault-finding and preventive maintenance safely at height or on site.",
      "Complete service records, snags and commissioning sign-offs accurately.",
      "Uphold electrical safety and isolation procedures at all times.",
    ],
    requirements: [
      "Current GWO modules (or willingness to certify) and work-at-height training.",
      "Relevant electrical or mechanical qualification for the role.",
      "Experience on wind, solar or BESS projects preferred.",
      "Comfortable with remote sites and rotational travel.",
    ],
  },
  "HSE & Quality": {
    responsibilities: [
      "Implement and monitor the project HSE and quality management systems on site.",
      "Run audits, inspections, toolbox talks and incident investigations.",
      "Track corrective actions to close-out and report performance to the client.",
      "Champion a strong safety culture across all crews and subcontractors.",
    ],
    requirements: [
      "Recognised HSE or QA certification (NEBOSH / IOSH, or CSWIP / CQI as relevant).",
      "Audit and inspection experience against international standards.",
      "Confident engaging crews, supervisors and client representatives.",
      "Meticulous documentation and reporting discipline.",
    ],
  },
  "Oil & Gas": {
    responsibilities: [
      "Supervise safe drilling / well operations and the crews delivering them.",
      "Maintain well control, equipment integrity and operational readiness.",
      "Enforce permit-to-work, isolation and safety-critical procedures.",
      "Report progress, NPT and HSE performance to the company man and base.",
    ],
    requirements: [
      "Valid well-control certification (IWCF / IADC) where applicable.",
      "Offshore survival (BOSIET / FOET) and a current medical.",
      "Solid discipline experience on comparable operations.",
      "Strong leadership and clear communication with mixed-nationality crews.",
    ],
  },
};

// Every role offers the same Energy Talents package.
const OFFER = [
  "Compliant global payroll in your currency, paid on time, every rotation.",
  "Visas, medicals, travel and accommodation arranged before you fly.",
  "Transparent, benchmarked day rates with no hidden agency margins.",
  "One dedicated account desk that knows your file end to end.",
];

/** Build a full job description for a role from its fields + discipline template. */
export function getJobDescription(role: Role): JobDescription {
  const cat = BY_CATEGORY[role.category] ?? BY_CATEGORY.Engineering;
  const overview =
    `We're hiring a ${role.title} for a ${role.type.toLowerCase()} assignment in ` +
    `${role.location}. It's a ${role.duration} position paying ${role.salary}${role.unit}, ` +
    `mobilized and managed end to end by Energy Talents — you focus on the job while we ` +
    `handle visas, travel, payroll and compliance.`;
  return {
    overview,
    responsibilities: cat.responsibilities,
    requirements: cat.requirements,
    offer: OFFER,
  };
}
