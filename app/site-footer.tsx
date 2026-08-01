import Link from "next/link";
import {
  IconSun,
  IconLinkedIn,
  IconX,
  IconYouTube,
} from "./about/icons";

const CONTACT_HREF = "mailto:crew@energytalents.com";

// Everything points at a page/section that actually exists. Sector and
// capability topics live on the About & Careers pages; compliance detail
// sits in the About page's HSE section.
const COLS = [
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
      { label: "Contact", href: CONTACT_HREF },
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
];

const SOCIALS = [
  { label: "LinkedIn", Icon: IconLinkedIn, href: "#" },
  { label: "X", Icon: IconX, href: "#" },
  { label: "YouTube", Icon: IconYouTube, href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-linec bg-white pt-16 pb-8">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-brand">
              <IconSun className="h-6 w-8" />
              <span className="font-display text-[11px] font-bold uppercase leading-[1.1] tracking-[0.28em] text-ink">
                Energy
                <br />
                Talents
              </span>
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-body2">
              Supplying, deploying, and managing skilled technical manpower for
              global infrastructure, oil & gas, marine, and renewable energy
              projects.
            </p>
            <div className="mt-6 text-[14px] text-body2">
              <p className="font-bold text-ink">Global HQ</p>
              <p className="mt-1">
                Energy Plaza, Level 14 · Dubai, UAE
                <br />
                +971 4 000 0000 · crew@energytalents.com
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ label, Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-linec bg-white text-ink/70 transition-colors hover:border-brand-400 hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[.14em] text-stone-400">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-body2 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-linec pt-6 text-[13px] text-body2 sm:flex-row sm:items-center">
          <p>© 2026 Energy Talents Ltd. All rights reserved.</p>
          <span className="flex gap-6">
            <Link href="#" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="#" className="hover:text-brand">
              Terms
            </Link>
            <Link href="#" className="hover:text-brand">
              Cookies
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
