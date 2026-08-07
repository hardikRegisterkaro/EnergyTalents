"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowRight, IconMenu, IconClose } from "./about/icons";
import type { HeaderMenu, NavItem } from "./lib/menus";

/**
 * The interactive header: desktop dropdowns and the mobile drawer.
 *
 * Split out of site-header.tsx when the nav became CMS-driven — the wrapper is
 * a server component that fetches the menu, and this stays a client component
 * because the dropdown and drawer are stateful.
 */

// Display-agnostic so callers set `inline-flex` / `hidden md:inline-flex`
// themselves without two conflicting `display` utilities fighting over order.
const btnPrimaryBase =
  "shine items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2";

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Path part of an href, so "#" fragments and query strings don't break matching. */
function pathOf(href: string): string {
  return href.split(/[?#]/)[0];
}

export default function SiteHeaderNav({ nav, cta }: HeaderMenu) {
  const [open, setOpen] = useState(false);
  // Which desktop dropdown is open (by label), and the mobile accordion state.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const isCurrent = (href: string) => pathname === pathOf(href);

  /**
   * A dropdown is "current" when the page belongs to one of its children.
   * Previously hardcoded to `/services`; derived now that the groups come
   * from the CMS and need not be services at all.
   */
  const isSectionCurrent = (item: Extract<NavItem, { children: unknown }>) =>
    item.children.some((c) => {
      const path = pathOf(c.href);
      return path !== "/" && pathname.startsWith(path);
    });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-linec/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Energy Talents" className="h-11 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) =>
            "children" in n ? (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(n.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((v) => (v === n.label ? null : n.label))
                  }
                  aria-haspopup="true"
                  aria-expanded={openMenu === n.label}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand ${
                    isSectionCurrent(n) ? "text-brand" : "text-ink/70"
                  }`}
                >
                  {n.label}
                  <Chevron
                    className={`h-3.5 w-3.5 transition-transform ${
                      openMenu === n.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown panel (pt-3 bridges the hover gap) */}
                <div
                  className={`absolute left-1/2 top-full z-50 w-[336px] -translate-x-1/2 pt-3 transition-all duration-150 ${
                    openMenu === n.label
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-linec bg-white p-2 shadow-xl shadow-ink/5">
                    {n.children.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setOpenMenu(null)}
                        aria-current={isCurrent(s.href) ? "page" : undefined}
                        className="group/item flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-colors hover:bg-cream-2 aria-[current=page]:bg-cream-2"
                      >
                        <span className="flex items-center justify-between text-sm font-semibold text-ink">
                          {s.label}
                          <IconArrowRight className="h-4 w-4 shrink-0 text-ink/30 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-brand" />
                        </span>
                        {/* The CMS has no description field, so this only
                            renders for the shipped defaults. */}
                        {s.desc && (
                          <span className="text-xs leading-5 text-body2">
                            {s.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.label}
                href={n.href}
                className="text-sm font-medium text-ink/70 transition-colors hover:text-brand aria-[current=page]:text-brand"
                aria-current={isCurrent(n.href) ? "page" : undefined}
              >
                {n.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <Link href={cta.href} className={`${btnPrimaryBase} hidden md:inline-flex`}>
          {cta.label} <IconArrowRight className="h-4 w-4" />
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center rounded-lg border border-linec text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 md:hidden"
        >
          {open ? (
            <IconClose className="h-6 w-6" />
          ) : (
            <IconMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 top-16 z-40 bg-ink/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] origin-top overflow-y-auto border-b border-linec bg-white shadow-lg transition-all duration-300 md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-[1360px] px-6 py-4">
          <ul className="flex flex-col divide-y divide-linec">
            {nav.map((n) =>
              "children" in n ? (
                <li key={n.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileMenu((v) => (v === n.label ? null : n.label))
                    }
                    aria-expanded={mobileMenu === n.label}
                    className={`flex w-full items-center justify-between py-3.5 font-display text-lg font-semibold transition-colors hover:text-brand ${
                      isSectionCurrent(n) ? "text-brand" : "text-ink"
                    }`}
                  >
                    {n.label}
                    <Chevron
                      className={`h-5 w-5 text-ink/30 transition-transform ${
                        mobileMenu === n.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileMenu === n.label && (
                    <ul className="pb-3">
                      {n.children.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            onClick={() => setOpen(false)}
                            aria-current={isCurrent(s.href) ? "page" : undefined}
                            className="flex items-center gap-2.5 py-2.5 pl-1 text-[15px] font-medium text-ink/70 transition-colors hover:text-brand aria-[current=page]:text-brand"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(n.href) ? "page" : undefined}
                    className="flex items-center justify-between py-3.5 font-display text-lg font-semibold text-ink transition-colors hover:text-brand aria-[current=page]:text-brand"
                  >
                    {n.label}
                    <IconArrowRight className="h-5 w-5 text-ink/30" />
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className={`${btnPrimaryBase} mt-4 flex w-full justify-center`}
          >
            {cta.label} <IconArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
