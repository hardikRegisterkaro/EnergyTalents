import { displayFontVars } from "../display-fonts";

/**
 * The careers page uses its own bolder, darker type system (distinct from the
 * warm Space Grotesk / Inter of the rest of the site). Scoped here via a nested
 * layout so these fonts aren't downloaded on other routes.
 */
export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={displayFontVars}>{children}</div>;
}
