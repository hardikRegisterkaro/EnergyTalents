import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRole, getRoles, formatRate } from "../roles-api";
import ApplyForm from "./ApplyForm";

type Params = { params: Promise<{ slug: string }> };

/**
 * Pre-render the roles that exist at build time. Roles published in the CMS
 * afterwards are still served — Next renders them on first request and the
 * `career-list` / `career-<slug>` tags keep them fresh.
 */
export async function generateStaticParams() {
  const { roles } = await getRoles();
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRole(slug);
  if (!role) return {};

  const description =
    role.metaDescription ??
    role.summary ??
    `Apply for ${role.title} (${role.type}, ${role.location}). ${formatRate(role.salary, role.unit)}. Mobilized and managed end to end by Energy Talents.`;

  return {
    title: role.metaTitle ?? `${role.title} — Careers`,
    description,
    alternates: { canonical: `/careers/${slug}` },
  };
}

/** A labelled fact in the role's key-details strip. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-jbmono text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </span>
      <span className="font-poppins text-sm font-semibold text-neutral-900">
        {value}
      </span>
    </div>
  );
}

export default async function RoleApplyPage({ params }: Params) {
  const { slug } = await params;
  const role = await getRole(slug);
  if (!role) notFound();

  return (
    <main className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1276px] px-6 py-3 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="font-jbmono text-xs uppercase tracking-wider text-gray-400"
          >
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Home
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link
              href="/careers#roles"
              className="transition-colors hover:text-neutral-900"
            >
              Careers
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-neutral-900">{role.title}</span>
          </nav>
        </div>
      </div>

      {/* Two-column: JD (left) + apply form (right) */}
      <div className="mx-auto max-w-[1276px] px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          {/* Left — job description */}
          <article className="min-w-0">
            <Link
              href="/careers#roles"
              className="inline-flex items-center gap-1.5 font-jbmono text-xs font-bold uppercase tracking-wide text-zinc-500 transition-colors hover:text-orange-500"
            >
              ← All roles
            </Link>

            <div className="mt-5 flex items-center gap-2.5">
              <span className="h-2 w-2 shrink-0 bg-orange-500" />
              <span className="font-plex text-[11px] font-medium uppercase tracking-wide text-orange-500">
                {role.category}
              </span>
              {role.featured && (
                <span className="bg-orange-50 px-1.5 py-[3px] font-jbmono text-[9px] font-medium uppercase tracking-wide text-orange-500">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-3 font-poppins text-[30px] font-extrabold leading-tight text-neutral-900 sm:text-[40px]">
              {role.title}
            </h1>

            {/* Key details strip */}
            <div className="mt-7 grid grid-cols-2 gap-5 border-y border-gray-200 py-6 sm:grid-cols-4">
              <Fact label="Location" value={role.location} />
              <Fact label="Type" value={role.type} />
              <Fact label="Duration" value={role.duration} />
              <Fact label="Day rate" value={formatRate(role.salary, role.unit)} />
            </div>

            {/* Body — HTML authored in the CMS TipTap editor.
                The CMS is the only writer and content is admin-authored, so the
                markup is trusted; `jd-body` below carries the typography. */}
            {role.description ? (
              <div
                className="jd-body mt-9"
                dangerouslySetInnerHTML={{ __html: role.description }}
              />
            ) : (
              <div className="mt-9">
                <h2 className="font-poppins text-xl font-extrabold text-neutral-900">
                  About the role
                </h2>
                <p className="mt-4 font-plex text-[15px] leading-7 text-zinc-600">
                  {role.summary ??
                    `We're hiring a ${role.title} for a ${role.type.toLowerCase()} assignment in ${role.location}. It's a ${role.duration} position paying ${formatRate(role.salary, role.unit)}, mobilized and managed end to end by Energy Talents — you focus on the job while we handle visas, travel, payroll and compliance.`}
                </p>
              </div>
            )}
          </article>

          {/* Right — apply form (sticky on desktop) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ApplyForm roleTitle={role.title} />
          </aside>
        </div>
      </div>
    </main>
  );
}
