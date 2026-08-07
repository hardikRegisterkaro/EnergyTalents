import Link from "next/link";
import { IconLinkedIn, IconX, IconYouTube } from "./about/icons";
import { getFooterMenu, type NavLink } from "./lib/menus";

/**
 * Site footer — columns and contact details come from the CMS, falling back to
 * the shipped structure when it is unreachable or unconfigured (see lib/menus).
 */

/**
 * Social icons are matched by label, since the CMS stores only a name + URL.
 *
 * Returns an element rather than a component type on purpose: picking a
 * component into a variable and rendering `<Icon />` counts as creating a
 * component during render, which React's lint rules reject.
 */
function socialIcon(label: string) {
  switch (label.trim().toLowerCase()) {
    case "linkedin":
      return <IconLinkedIn className="h-4 w-4" />;
    case "x":
    case "twitter":
      return <IconX className="h-4 w-4" />;
    case "youtube":
      return <IconYouTube className="h-4 w-4" />;
    default:
      return null;
  }
}

/** A social entry the CMS gave us no icon for still needs to be clickable. */
function SocialLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      aria-label={link.label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-linec bg-white text-ink/70 transition-colors hover:border-brand-400 hover:text-brand"
    >
      {socialIcon(link.label) ?? (
        <span className="text-[11px] font-bold uppercase">
          {link.label.slice(0, 2)}
        </span>
      )}
    </Link>
  );
}

export default async function SiteFooter() {
  const { columns, contact } = await getFooterMenu();

  return (
    <footer className="border-t border-linec bg-white pt-16 pb-8">
      <div className="mx-auto max-w-[1216px] px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Energy Talents" className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-body2">
              Supplying, deploying, and managing skilled technical manpower for
              global infrastructure, oil &amp; gas, marine, and renewable energy
              projects.
            </p>

            {contact && (
              <div className="mt-6 text-[14px] text-body2">
                {contact.lines.length > 0 && (
                  <>
                    <p className="font-bold text-ink">Head Office</p>
                    <p className="mt-1">
                      {contact.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < contact.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </>
                )}
                {(contact.phone || contact.email) && (
                  <p className="mt-2">
                    {contact.phone && (
                      <a href={contact.phone.href} className="hover:text-brand">
                        {contact.phone.label}
                      </a>
                    )}
                    {contact.phone && contact.email && " · "}
                    {contact.email && (
                      <a href={contact.email.href} className="hover:text-brand">
                        {contact.email.label}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}

            {contact && contact.socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {contact.socials.map((s) => (
                  <SocialLink key={s.label} link={s} />
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[.14em] text-stone-400">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-body2 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-linec pt-6 text-[13px] text-body2 sm:flex-row sm:items-center">
          <p>© 2026 Energy Talents Ltd. All rights reserved.</p>
          <span className="flex gap-6">
            <Link href="/legal#privacy" className="hover:text-brand">
              Privacy
            </Link>
            <Link href="/legal#terms" className="hover:text-brand">
              Terms
            </Link>
            <Link href="/legal#cookies" className="hover:text-brand">
              Cookies
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
