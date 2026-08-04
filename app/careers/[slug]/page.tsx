import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES, getRole, getJobDescription, slugify } from "../roles-data";
import ApplyForm from "./ApplyForm";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: slugify(r.title) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return {};
  return {
    title: `${role.title} — Careers`,
    description: `Apply for ${role.title} (${role.type}, ${role.location}). ${role.salary}${role.unit}. Mobilized and managed end to end by Energy Talents.`,
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

/** A titled bullet list block in the JD body. */
function JdBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-poppins text-xl font-extrabold text-neutral-900">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2 size-1.5 shrink-0 bg-orange-500"
            />
            <span className="font-plex text-[15px] leading-6 text-zinc-600">
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function RoleApplyPage({ params }: Params) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();

  const jd = getJobDescription(role);

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
              <Fact
                label="Day rate"
                value={`${role.salary}${role.unit}`}
              />
            </div>

            {/* Body */}
            <div className="mt-9 flex flex-col gap-9">
              <div>
                <h2 className="font-poppins text-xl font-extrabold text-neutral-900">
                  About the role
                </h2>
                <p className="mt-4 font-plex text-[15px] leading-7 text-zinc-600">
                  {jd.overview}
                </p>
              </div>
              <JdBlock title="Key responsibilities" items={jd.responsibilities} />
              <JdBlock title="What you'll need" items={jd.requirements} />
              <JdBlock title="What we offer" items={jd.offer} />
            </div>
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
