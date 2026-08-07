import Link from "next/link";
import {
  type BlogPost,
  initialsFrom,
  postDate,
  readTimeLabel,
} from "./posts-api";
import { RIG_IMAGE_STYLE } from "./placeholder-image";

/** Standard blog article card — used by the index grid and the related strip. */
export default function ArticleCard({ post }: { post: BlogPost }) {
  const author = post.author?.username ?? "Energy Talent";
  const date = postDate(post);

  return (
    <article className="group flex flex-col border border-gray-200 bg-white">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featuredImage ? (
          // Editor-supplied images are arbitrary remote URLs, so this stays a
          // plain <img> rather than next/image, which would need every CMS
          // media host allow-listed in next.config.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImage}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div
            className="aspect-[16/10] w-full"
            style={RIG_IMAGE_STYLE}
            role="img"
            aria-label="Offshore platform at sunset"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="font-jbmono text-xs uppercase tracking-wider text-gray-400">
          {readTimeLabel(post.readTimeMinutes)}
        </div>
        <h3 className="mt-3 font-poppins text-xl font-bold leading-snug text-neutral-900">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors group-hover:text-orange-600"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-3 font-plex text-sm leading-6 text-zinc-600">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-5">
          <div className="grid size-9 shrink-0 place-items-center bg-neutral-900 font-poppins text-xs font-bold text-white">
            {initialsFrom(author)}
          </div>
          <div>
            <div className="font-poppins text-sm font-semibold text-neutral-900">
              {author}
            </div>
            {date && (
              <div className="font-jbmono text-[11px] tracking-wide text-gray-400">
                {date}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
