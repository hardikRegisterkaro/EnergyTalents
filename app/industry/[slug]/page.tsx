import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, industryBySlug } from "../industries";
import {
  formatRate,
  getRoles,
  type Role,
} from "../../careers/roles-api";

type Params = { params: Promise<{ slug: string }> };

/**
 * An industry sector page, reached from the sector cards on the home page.
 *
 * The sector itself (name, photograph, description) is fixed — see
 * industries.ts — but everything that dates comes from the CMS: the open roles
 * in that sector, and the figures above them, which are counted from those
 * roles rather than written down. A page with nothing open therefore says so
 * instead of showing stale numbers.
 */

/** Darkening scrim so the hero text stays legible over the photo. */
const SCRIM =
  "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.75) 100%)";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.title} Crewing`,
    description: industry.body,
    alternates: { canonical: `/industry/${industry.slug}` },
    openGraph: {
      title: `${industry.title} Crewing — Energy Talents`,
      description: industry.body,
      images: [industry.src],
    },
  };
}

/** Unique values in source order — used for the location and contract lists. */
function unique(values: string[]): string[] {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))];
}

function RoleCard({ role }: { role: Role }) {
  return (
    <Link
      href={`/careers/${role.slug}`}
      className="group flex flex-col border border-gray-200 bg-white p-6 transition-colors hover:border-stone-300"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate bg-orange-500/10 px-2 py-1 font-jbmono text-[10px] leading-4 text-orange-500">
          {role.type}
        </span>
        <span className="shrink-0 font-jbmono text-[10px] text-gray-400">
          {role.posted}
        </span>
      </div>

      <h3 className="mt-5 font-archivo text-lg font-bold leading-6 text-stone-900 transition-colors group-hover:text-orange-600">
        {role.title}
      </h3>

      {role.summary && (
        <p className="mt-2.5 line-clamp-2 font-plex text-sm leading-6 text-stone-600">
          {role.summary}
        </p>
      )}

      <div className="mt-auto grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
        <div>
          <div className="font-jbmono text-[9.5px] uppercase text-gray-400">
            Location
          </div>
          <div className="mt-1 truncate font-jbmono text-xs text-stone-600">
            {role.location}
          </div>
        </div>
        <div>
          <div className="font-jbmono text-[9.5px] uppercase text-gray-400">
            Rate
          </div>
          <div className="mt-1 truncate font-jbmono text-xs text-stone-600">
            {formatRate(role.salary, role.unit)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();

  // Roles in this sector. Never throws — an unreachable CMS yields an empty
  // list and the page still renders its hero and CTA.
  const { roles } = await getRoles({ category: industry.category, limit: 24 });

  const locations = unique(roles.map((r) => r.location));
  const contractTypes = unique(roles.map((r) => r.type));

  const stats = [
    { value: String(roles.length), label: "Open roles" },
    { value: String(locations.length), label: "Locations hiring" },
    { value: String(contractTypes.length), label: "Contract types" },
  ];

  return (
    <main>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-[1276px] px-6 py-3 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="font-jbmono text-xs uppercase tracking-wider text-gray-400"
          >
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-500">Industry Sectors</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-neutral-900">{industry.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero — the same photograph as the home page card */}
      <section className="relative overflow-hidden bg-neutral-950">
        <Image
          src={industry.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: industry.pos }}
        />
        <div aria-hidden className="absolute inset-0" style={{ background: SCRIM }} />

        <div className="relative mx-auto flex min-h-[420px] max-w-[1276px] flex-col justify-end px-6 py-16 lg:px-8 lg:py-24">
          <div className="flex items-center gap-3.5">
            <span className="h-[1.5px] w-10 bg-orange-500" />
            <span className="font-jbmono text-xs uppercase tracking-[0.24em] text-orange-500">
              Sector {industry.n}
            </span>
          </div>
          <h1 className="mt-5 max-w-[820px] font-archivo text-[30px] font-black uppercase leading-[1.06] text-white sm:text-4xl lg:text-5xl">
            {industry.title}
          </h1>
          <p className="mt-5 max-w-[620px] font-plex text-base leading-6 text-stone-200">
            {industry.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="flex items-center justify-center rounded-lg px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_30px_-8px_rgba(234,88,12,0.55)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "linear-gradient(30deg, #eab308, #ea580c)" }}
            >
              [ Request {industry.title} Crew → ]
            </Link>
            <Link
              href="/careers#roles"
              className="flex items-center justify-center px-6 py-3.5 font-jbmono text-xs font-bold uppercase tracking-wider text-white outline outline-1 -outline-offset-1 outline-white/40 transition-colors hover:bg-white/10"
            >
              [ Browse all roles ]
            </Link>
          </div>
        </div>
      </section>

      {/* About the sector — sits between the hero and the openings */}
      <section className="bg-white px-6 py-16 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1276px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3.5">
              <span className="h-[1.5px] w-6 bg-orange-500" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                About the sector
              </span>
            </div>
            <h2 className="mt-4 max-w-[620px] font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[34px]">
              {industry.overviewHeading}
            </h2>
            {industry.overview.map((paragraph, i) => (
              <p
                key={i}
                className={`max-w-[620px] font-plex text-[15.5px] leading-7 text-stone-600 ${
                  i === 0 ? "mt-6" : "mt-4"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* What we crew in this sector */}
          <div className="lg:pt-2">
            <p className="font-jbmono text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
              What we crew here
            </p>
            <div className="mt-5 border-t border-gray-200">
              {industry.supplies.map((item) => (
                <div key={item.title} className="border-b border-gray-200 py-5">
                  <div className="flex gap-3.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-orange-500" />
                    <div>
                      <div className="font-archivo text-base font-bold text-stone-900">
                        {item.title}
                      </div>
                      <p className="mt-1 font-plex text-sm leading-6 text-stone-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Figures — counted from the live roles, not written down */}
      {roles.length > 0 && (
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-[1276px] px-6 py-12 lg:px-8">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-archivo text-4xl font-extrabold leading-none text-stone-900 sm:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-3 font-jbmono text-[11px] uppercase tracking-wider text-gray-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open roles in this sector */}
      <section className="bg-white px-6 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-[1276px]">
          <div className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-[1.5px] w-6 bg-orange-500" />
                <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                  Now hiring
                </span>
              </div>
              <h2 className="mt-4 font-archivo text-[26px] font-bold leading-[1.15] text-stone-900 sm:text-[34px]">
                Open {industry.title} roles
              </h2>
            </div>
            {locations.length > 0 && (
              <p className="max-w-sm font-plex text-sm leading-6 text-stone-600 sm:text-right">
                Currently hiring in {locations.slice(0, 3).join(", ")}
                {locations.length > 3 && ` and ${locations.length - 3} more`}.
              </p>
            )}
          </div>

          {roles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <RoleCard key={role.slug} role={role} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 px-6 py-16 text-center">
              <p className="font-archivo text-lg font-bold text-stone-900">
                No {industry.title} roles are open right now
              </p>
              <p className="mt-2 font-plex text-sm text-stone-600">
                New rotations are posted regularly — tell us what you need and
                we&rsquo;ll source it.
              </p>
              <Link
                href="/contact-us"
                className="mt-6 inline-flex border border-neutral-900/25 px-5 py-2.5 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
              >
                Talk to the desk →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* The other three sectors */}
      <section className="border-t border-gray-200 bg-gray-50 px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1276px]">
          <div className="flex items-center gap-3.5 pb-8">
            <span className="h-[1.5px] w-6 bg-orange-500" />
            <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
              Other sectors
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {INDUSTRIES.filter((i) => i.slug !== industry.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/industry/${other.slug}`}
                className="group relative block h-48 overflow-hidden outline outline-1 -outline-offset-1 outline-stone-200"
              >
                <Image
                  src={other.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: other.pos }}
                />
                <div aria-hidden className="absolute inset-0" style={{ background: SCRIM }} />
                <div className="absolute inset-x-0 bottom-0 bg-black/80 p-4">
                  <h3 className="font-archivo text-base font-bold text-white">
                    {other.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
