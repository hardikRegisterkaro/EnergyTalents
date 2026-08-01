import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconLinkedIn, IconX } from "../../about/icons";
import {
  ALL_ARTICLES,
  AUTHORS,
  RIG_IMAGE_STYLE,
  getArticle,
  relatedArticles,
} from "../articles";
import ArticleToc from "./ArticleToc";
import ArticleCard from "../ArticleCard";
import TheBrief from "../TheBrief";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt },
  };
}

const STATS = [
  { value: "320", accent: "+", label: "Open rotations" },
  { value: "18", accent: "%", label: "YoY rate rise" },
  { value: "72", accent: "h", label: "Avg. mobilization" },
];

const TAGS = ["#offshore", "#rotations", "#market-intelligence"];

const pClass = "font-plex text-[15.5px] leading-7 text-zinc-600";
const h2Class =
  "scroll-mt-24 font-poppins text-2xl font-extrabold text-neutral-900 sm:text-[28px]";

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const author = AUTHORS[article.initials];
  const related = relatedArticles(article.slug, 3);
  const url = `https://energytalents.com/blog/${article.slug}`;
  const share = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
    email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`,
  };
  const shareBtn =
    "grid h-9 w-9 place-items-center border border-gray-200 text-neutral-900 transition-colors hover:border-neutral-900/50";

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
            <Link
              href="/blog"
              className="transition-colors hover:text-neutral-900"
            >
              Insights
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-neutral-900">{article.category}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-[1276px] px-6 pt-12 pb-16 md:pb-20 lg:px-8">
        {/* Header */}
        <header>
          <div className="font-jbmono text-xs font-bold uppercase tracking-wider text-orange-500">
            {article.category}
            <span className="mx-2 text-orange-500/50">·</span>
            {article.readTime}
          </div>
          <h1 className="mt-4 max-w-[1040px] font-poppins text-[28px] font-extrabold leading-[1.12] text-neutral-900 sm:text-[42px]">
            {article.title}
          </h1>
          <p className="mt-5 max-w-[720px] font-plex text-lg leading-7 text-zinc-600">
            {article.excerpt}
          </p>

          {/* Author + share */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center bg-neutral-900 font-poppins text-sm font-bold text-white">
                {article.initials}
              </div>
              <div>
                <div className="font-poppins text-sm font-semibold text-neutral-900">
                  {article.author}
                </div>
                <div className="font-jbmono text-xs tracking-wide text-gray-500">
                  {author.role} · {article.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="mr-1 font-jbmono text-[11px] uppercase tracking-widest text-gray-400">
                Share
              </span>
              <a
                href={share.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className={shareBtn}
              >
                <IconLinkedIn className="h-4 w-4" />
              </a>
              <a
                href={share.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className={shareBtn}
              >
                <IconX className="h-4 w-4" />
              </a>
              <a
                href={share.email}
                aria-label="Share by email"
                className={shareBtn}
              >
                <span aria-hidden className="text-sm">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div
          data-aos="fade-up"
          className="mt-10 aspect-[16/9] w-full sm:aspect-[21/9]"
          style={RIG_IMAGE_STYLE}
          role="img"
          aria-label="Offshore platform at sunset"
        />

        {/* Body + sidebar */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          {/* Main content (shared placeholder body) */}
          <div>
            <p className="font-plex text-lg leading-8 text-zinc-800">
              Across the North Sea, the Gulf and West Africa, the same
              conversation is playing out in operations meetings: the crew
              needed next quarter may not exist yet.
            </p>

            <h2 id="supply-gap" className={`${h2Class} mt-12`}>
              A supply gap three years in the making
            </h2>
            <p className={`${pClass} mt-5`}>
              The squeeze didn&rsquo;t appear overnight. A decade of deferred
              training budgets, an ageing offshore workforce, and a renewables
              build-out competing for the same skill sets have combined to thin
              the pool of ticketed, deployable crew.
            </p>
            <p className={`${pClass} mt-4`}>
              Our deployment data shows the gap widening fastest in roles that
              take years to certify — dynamic positioning operators,
              commissioning leads and senior HSE personnel among them.
            </p>

            <blockquote className="mt-8 border-l-2 border-orange-500 pl-6">
              <p className="font-poppins text-xl font-bold leading-snug text-neutral-900">
                For every two DP operators retiring, the industry is certifying
                barely one replacement.
              </p>
              <cite className="mt-3 block font-jbmono text-[11px] font-medium uppercase not-italic tracking-wider text-orange-500">
                — Internal mobility report, Q1 2026
              </cite>
            </blockquote>

            <h2 id="where-sharpest" className={`${h2Class} mt-12`}>
              Where the squeeze is sharpest
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                {
                  place: "North Sea",
                  text: "rotational DP and marine roles are clearing within days of posting.",
                },
                {
                  place: "Gulf of Mexico",
                  text: "ROV and subsea crews command premium rates at short notice.",
                },
                {
                  place: "West Africa",
                  text: "senior drilling supervisors are the single hardest role to fill.",
                },
              ].map((b) => (
                <li key={b.place} className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 shrink-0 bg-orange-500" />
                  <span className={pClass}>
                    <span className="font-semibold text-neutral-900">
                      {b.place}
                    </span>{" "}
                    &mdash; {b.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stat band */}
            <div
              data-aos="fade-up"
              className="mt-8 grid grid-cols-3 gap-4 bg-neutral-900 p-6"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline font-archivo text-2xl font-extrabold text-white sm:text-3xl">
                    {s.value}
                    <span className="text-orange-500">{s.accent}</span>
                  </div>
                  <div className="mt-1 font-jbmono text-[10px] uppercase tracking-wider text-gray-400">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <h2 id="what-operators" className={`${h2Class} mt-12`}>
              What leading operators are doing
            </h2>
            <p className={`${pClass} mt-5`}>
              The operators weathering this best treat workforce supply as a
              planning input, not a procurement afterthought. Three moves stand
              out: locking framework agreements early, funding ticket renewals
              before they lapse, and widening the geographic net for
              hard-to-place roles.
            </p>

            <div
              className="mt-8 aspect-[16/9] w-full"
              style={RIG_IMAGE_STYLE}
              role="img"
              aria-label="Offshore platform at sunset"
            />

            <p className={`${pClass} mt-8`}>
              None of this removes the squeeze. But it turns an unpredictable
              scramble into a managed, repeatable pipeline — which, in a market
              this tight, is the real competitive advantage.
            </p>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="border border-gray-200 px-3 py-1.5 font-jbmono text-xs text-zinc-500"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Author bio */}
            <div className="mt-8 flex flex-col gap-4 border border-gray-200 p-6 sm:flex-row">
              <div className="grid size-12 shrink-0 place-items-center bg-neutral-900 font-poppins text-base font-bold text-white">
                {article.initials}
              </div>
              <div>
                <div className="font-poppins text-base font-bold text-neutral-900">
                  {article.author}
                </div>
                <div className="mt-0.5 font-jbmono text-[11px] font-medium uppercase tracking-wider text-orange-500">
                  {author.role}
                </div>
                <p className="mt-3 font-plex text-sm leading-6 text-zinc-600">
                  {author.bio}
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-block font-jbmono text-xs font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:text-orange-600"
                >
                  View all articles →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ArticleToc />

            {/* The Brief card */}
            <div
              className="mt-6 p-6 text-white"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, #f59e0b 0%, #ea580c 100%)",
              }}
            >
              <div className="text-center font-jbmono text-[11px] uppercase tracking-widest text-white/80">
                The brief
              </div>
              <h3 className="mt-3 font-poppins text-xl font-extrabold leading-tight">
                Field notes, in your inbox
              </h3>
              <p className="mt-2 font-plex text-sm leading-6 text-white/85">
                Workforce intelligence every fortnight. No fluff.
              </p>
              <Link
                href="#brief"
                className="mt-5 inline-flex bg-white px-5 py-3 font-jbmono text-xs font-bold uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                [ Subscribe → ]
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-[1276px] px-6 lg:px-8">
            <div data-aos="fade-up" className="flex items-center gap-3.5 pb-8">
              <span className="h-[1.5px] w-6 bg-orange-500" />
              <span className="font-jbmono text-xs font-medium uppercase tracking-[0.24em] text-orange-500">
                Related articles
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <div key={a.slug} data-aos="fade-up">
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter — The Brief */}
      <TheBrief />
    </main>
  );
}
