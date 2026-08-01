import { displayFontVars } from "../display-fonts";

/**
 * The blog ("Insights") shares the careers display type system. Scoped via this
 * nested layout so the fonts stay off routes that don't use them.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={displayFontVars}>{children}</div>;
}
