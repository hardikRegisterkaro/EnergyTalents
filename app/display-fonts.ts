import {
  Archivo,
  JetBrains_Mono,
  IBM_Plex_Sans,
  Hanken_Grotesk,
  Poppins,
} from "next/font/google";

/**
 * The bolder "display" type system (distinct from the site-wide Space Grotesk /
 * Inter). Shared by the routes that use it via their nested layouts, so the
 * fonts load once and aren't pulled onto other pages.
 *
 * Note on preloading: Turbopack merges these families' @font-face rules into
 * one shared CSS chunk, so any route loading that chunk preloads all of them —
 * splitting this into per-route sets was tried and changed nothing. The only
 * levers that actually move the number are dropping a family or, as with
 * Hanken below, opting one out of preload.
 */
const archivo = Archivo({
  variable: "--ff-archivo",
  subsets: ["latin"],
  display: "swap",
});
const jbMono = JetBrains_Mono({
  variable: "--ff-jbmono",
  subsets: ["latin"],
  display: "swap",
});
const plex = IBM_Plex_Sans({
  variable: "--ff-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});
const hanken = Hanken_Grotesk({
  variable: "--ff-hanken",
  subsets: ["latin"],
  display: "swap",
  // Not preloaded: 18 uses, body copy on /careers and /services only, while the
  // preload cost landed on every display route. With display:swap the text
  // still paints immediately in the fallback and swaps when the file arrives.
  preload: false,
});
const poppins = Poppins({
  variable: "--ff-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

/** Space-separated CSS-variable classes to spread onto a wrapping element. */
export const displayFontVars = `${archivo.variable} ${jbMono.variable} ${plex.variable} ${hanken.variable} ${poppins.variable}`;
