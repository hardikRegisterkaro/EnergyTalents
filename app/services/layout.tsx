import { displayFontVars } from "../display-fonts";
import { RequestModalProvider } from "./RequestModal";

/**
 * Service pages use the bolder display type system (Archivo / JetBrains Mono /
 * IBM Plex), scoped here so those fonts load only on these routes. The
 * RequestModalProvider mounts the shared enquiry modal once for every service
 * page so any CTA can open it.
 */
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={displayFontVars}>
      <RequestModalProvider>{children}</RequestModalProvider>
    </div>
  );
}
