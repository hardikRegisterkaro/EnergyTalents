import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconLinkedIn, IconX } from "../../about/icons";
import {
  getPost,
  getPostSlugs,
  getRelatedPosts,
  initialsFrom,
  postDate,
  primaryCategory,
  readTimeLabel,
} from "../posts-api";
import { processArticleHtml } from "../article-html";
import { RIG_IMAGE_STYLE } from "../placeholder-image";
import ArticleToc from "./ArticleToc";
import ArticleCard from "../ArticleCard";
import TheBrief from "../TheBrief";

type Params = { params: Promise<{ slug: string }> };

const SITE = "https://energytalentz.com";

/**
 * Prerender every published post. An empty list is valid — with
 * `dynamicParams` left at its default, posts published later are rendered on
 * first request rather than 404ing until the next deploy.
 */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.excerpt ?? undefined;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { html, headings } = processArticleHtml(post.content);
  const related = await getRelatedPosts(post, 3);

  const author = post.author?.username ?? "Energy Talent";
  const category = primaryCategory(post);
  const url = `${SITE}/blog/${post.slug}`;
  const share = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`,
  };
  const shareBtn =
    "grid h-9 w-9 place-items-center border border-gray-200 text-neutral-900 transition-colors hover:border-neutral-900/50";

  const faqs = Array.isArray(post.faq_items) ? post.faq_items : [];

  return (
    <main>
      {/* JSON-LD authored in the CMS, emitted verbatim when present. */}
      {post.schema != null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
        />
      )}

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
            <Link href="/blog" className="transition-colors hover:text-neutral-900">
              Insights
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-neutral-900">{category}</span>
          </nav>
        </div>
      </div>

      <article className="mx-auto max-w-[1276px] px-6 pt-12 pb-16 md:pb-20 lg:px-8">
        {/* Header */}
        <header>
          <div className="font-jbmono text-xs font-bold uppercase tracking-wider text-orange-500">
            {category}
            <span className="mx-2 text-orange-500/50">·</span>
            {readTimeLabel(post.readTimeMinutes)}
          </div>
          <h1 className="mt-4 max-w-[1040px] font-poppins text-[28px] font-extrabold leading-[1.12] text-neutral-900 sm:text-[42px]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-5 max-w-[720px] font-plex text-lg leading-7 text-zinc-600">
              {post.excerpt}
            </p>
          )}

          {/* Author + share */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center bg-neutral-900 font-poppins text-sm font-bold text-white">
                {initialsFrom(author)}
              </div>
              <div>
                <div className="font-poppins text-sm font-semibold text-neutral-900">
                  {author}
                </div>
                <div className="font-jbmono text-xs tracking-wide text-gray-500">
                  {postDate(post)}
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
              <a href={share.email} aria-label="Share by email" className={shareBtn}>
                <span aria-hidden className="text-sm">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero image */}
        {post.featuredImage ? (
          // Editor-supplied remote URL — see the note in ArticleCard.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt=""
            data-aos="fade-up"
            className="mt-10 aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
          />
        ) : (
          <div
            data-aos="fade-up"
            className="mt-10 aspect-[16/9] w-full sm:aspect-[21/9]"
            style={RIG_IMAGE_STYLE}
            role="img"
            aria-label="Offshore platform at sunset"
          />
        )}

        {/* Body + sidebar */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <div>
            {html ? (
              /* Authored in the CMS TipTap editor by signed-in staff and stored
                 as HTML, so it is rendered as-is. `jd-body` carries the
                 element-level styling shared with job descriptions;
                 `article-body` layers the long-form reading scale on top. */
              <div
                className="jd-body article-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p className="font-plex text-base leading-7 text-zinc-500">
                This article has no content yet.
              </p>
            )}

            {/* FAQ repeater from the CMS */}
            {faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="font-poppins text-2xl font-extrabold text-neutral-900 sm:text-[28px]">
                  Frequently asked questions
                </h2>
                <dl className="mt-6 space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 p-5">
                      <dt className="font-poppins text-base font-bold text-neutral-900">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 font-plex text-sm leading-6 text-zinc-600">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Author bio */}
            <div className="mt-8 flex flex-col gap-4 border border-gray-200 p-6 sm:flex-row">
              <div className="grid size-12 shrink-0 place-items-center bg-neutral-900 font-poppins text-base font-bold text-white">
                {initialsFrom(author)}
              </div>
              <div>
                <div className="font-poppins text-base font-bold text-neutral-900">
                  {author}
                </div>
                <div className="mt-0.5 font-jbmono text-[11px] font-medium uppercase tracking-wider text-orange-500">
                  Energy Talent
                </div>
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
            <ArticleToc headings={headings} />

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
              {related.map((p) => (
                <div key={p.slug} data-aos="fade-up">
                  <ArticleCard post={p} />
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
