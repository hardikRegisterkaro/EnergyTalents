"use client";

import { useEffect, useState } from "react";

// Matches the shared article body's <h2 id="…"> headings.
const ITEMS = [
  { id: "supply-gap", label: "A supply gap three years in the making" },
  { id: "where-sharpest", label: "Where the squeeze is sharpest" },
  { id: "what-operators", label: "What leading operators are doing" },
];

export default function ArticleToc() {
  const [active, setActive] = useState(ITEMS[0].id);

  useEffect(() => {
    const headings = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="border border-gray-200 p-5">
      <div className="font-jbmono text-[11px] uppercase tracking-widest text-gray-400">
        On this page
      </div>
      <ul className="mt-4 space-y-1">
        {ITEMS.map((i) => {
          const isActive = active === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block border-l-2 py-1 pl-3 font-plex text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-orange-500 font-medium text-neutral-900"
                    : "border-gray-200 text-zinc-500 hover:text-neutral-900"
                }`}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
