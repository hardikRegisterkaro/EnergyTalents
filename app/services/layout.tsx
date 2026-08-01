import { displayFontVars } from "../display-fonts";

/**
 * Service pages use the bolder display type system (Archivo / JetBrains Mono /
 * IBM Plex), scoped here so those fonts load only on these routes.
 */
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={displayFontVars}>{children}</div>;
}
