import { displayFontVars } from "../display-fonts";

/**
 * Applies the display type system to the sector pages.
 *
 * These pages were written using font-archivo / font-jbmono / font-plex but
 * had no layout defining those variables, so every one of them resolved to a
 * system fallback — the pages rendered in the wrong typefaces.
 */
export default function IndustryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={displayFontVars}>{children}</div>;
}
