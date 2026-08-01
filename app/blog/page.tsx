import type { Metadata } from "next";
import Link from "next/link";
import BlogExplorer from "./BlogExplorer";
import TheBrief from "./TheBrief";
import { FEATURED, RIG_IMAGE_STYLE, AUTHORS } from "./articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Workforce intelligence, mobility playbooks and market reads for the people moving energy projects forward.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
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
            <span className="text-neutral-900">Insights</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
          {/* Header */}
          <div
            data-aos="fade-up"
            className="flex flex-col gap-6 pb-11 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-3.5">
                <span className="h-[1.5px] w-6 bg-orange-500" />
                <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                  Insights &amp; Intelligence
                </span>
              </div>
              <h1 className="mt-5 font-poppins text-[28px] font-extrabold leading-[1.12] text-neutral-900 sm:text-[42px]">
                Field notes from the
                <br />
                energy frontline
              </h1>
            </div>
            <p className="max-w-[360px] font-plex text-base leading-6 text-zinc-600 sm:text-right">
              Workforce intelligence, mobility playbooks and market reads for the
              people moving energy projects forward.
            </p>
          </div>

          {/* Featured article */}
          <article
            data-aos="fade-up"
            className="grid overflow-hidden border border-gray-200 lg:grid-cols-2"
          >
            {/* Image (placeholder gradient — swap for a real photo) */}
            <Link
              href={`/blog/${FEATURED.slug}`}
              aria-label={FEATURED.title}
              className="relative block min-h-[280px] lg:min-h-full"
              style={RIG_IMAGE_STYLE}
            >
              <span className="absolute left-4 top-4 bg-white px-3 py-1.5 font-jbmono text-[11px] font-bold uppercase tracking-wide text-neutral-900">
                Featured · {FEATURED.category}
              </span>
            </Link>

            {/* Content */}
            <div className="group flex flex-col p-8 lg:p-10">
              <div className="font-jbmono text-xs font-bold uppercase tracking-wider text-orange-500">
                {FEATURED.category}
                <span className="mx-2 text-orange-500/50">·</span>
                {FEATURED.readTime}
              </div>
              <h2 className="mt-4 font-poppins text-2xl font-extrabold leading-tight text-neutral-900 lg:text-[32px]">
                <Link
                  href={`/blog/${FEATURED.slug}`}
                  className="transition-colors group-hover:text-orange-600"
                >
                  {FEATURED.title}
                </Link>
              </h2>
              <p className="mt-4 font-plex text-base leading-6 text-zinc-600">
                {FEATURED.excerpt}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center bg-neutral-900 font-poppins text-sm font-bold text-white">
                    {FEATURED.initials}
                  </div>
                  <div>
                    <div className="font-poppins text-sm font-semibold text-neutral-900">
                      {FEATURED.author}
                    </div>
                    <div className="font-plex text-xs text-zinc-500">
                      {AUTHORS[FEATURED.initials].role} · {FEATURED.date}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/blog/${FEATURED.slug}`}
                  className="shrink-0 border border-neutral-900/25 px-5 py-3 font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:border-neutral-900/50"
                >
                  [ Read → ]
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Article grid — filters + pagination (interactive) ---------- */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
          <BlogExplorer />
        </div>
      </section>

      {/* Newsletter — The Brief ------------------------------------- */}
      <TheBrief />
    </main>
  );
}
