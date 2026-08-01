import Link from "next/link";
import { type Article, RIG_IMAGE_STYLE } from "./articles";

/** Standard blog article card — used by the index grid and the related strip. */
export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group flex flex-col border border-gray-200 bg-white">
      <Link href={`/blog/${article.slug}`} className="block">
        <div
          className="aspect-[16/10] w-full"
          style={RIG_IMAGE_STYLE}
          role="img"
          aria-label="Offshore platform at sunset"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="font-jbmono text-xs uppercase tracking-wider text-gray-400">
          {article.readTime}
        </div>
        <h3 className="mt-3 font-poppins text-xl font-bold leading-snug text-neutral-900">
          <Link
            href={`/blog/${article.slug}`}
            className="transition-colors group-hover:text-orange-600"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 font-plex text-sm leading-6 text-zinc-600">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="grid size-9 shrink-0 place-items-center bg-neutral-900 font-poppins text-xs font-bold text-white">
            {article.initials}
          </div>
          <div>
            <div className="font-poppins text-sm font-semibold text-neutral-900">
              {article.author}
            </div>
            <div className="font-jbmono text-[11px] tracking-wide text-gray-400">
              {article.date}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
