"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from "../article-html";

/**
 * "On this page" sidebar. Headings come from the rendered article HTML (see
 * article-html.ts), so the list always matches whatever the editor wrote —
 * it used to be a hardcoded three-item list describing one placeholder body.
 */
export default function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  // An article with no headings gets no empty box.
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="border border-gray-200 p-5">
      <div className="font-jbmono text-[11px] uppercase tracking-widest text-gray-400">
        On this page
      </div>
      <ul className="mt-4 space-y-1">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block border-l-2 py-1 font-plex text-sm leading-snug transition-colors ${
                  h.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "border-orange-500 font-medium text-neutral-900"
                    : "border-gray-200 text-zinc-500 hover:text-neutral-900"
                }`}
              >
                {h.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
