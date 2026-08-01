import {
  Archivo,
  JetBrains_Mono,
  IBM_Plex_Sans,
  Hanken_Grotesk,
  Poppins,
} from "next/font/google";

/**
 * The bolder "display" type system (distinct from the site-wide Space Grotesk /
 * Inter). Shared by the routes that use it — /careers and /blog — via their
 * nested layouts, so the fonts load once and aren't pulled onto other pages.
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
});
const poppins = Poppins({
  variable: "--ff-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

/** Space-separated CSS-variable classes to spread onto a wrapping element. */
export const displayFontVars = `${archivo.variable} ${jbMono.variable} ${plex.variable} ${hanken.variable} ${poppins.variable}`;
