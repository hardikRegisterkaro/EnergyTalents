import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * The resume-builder product page uses Plus Jakarta Sans for display headings
 * (with Inter for body, already global). Scoped here so the font loads only on
 * this route; `font-jakarta` reads --ff-jakarta directly (see globals.css).
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--ff-jakarta",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jakarta.variable}>{children}</div>;
}
