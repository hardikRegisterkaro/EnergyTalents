import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import RevealInit from "./reveal-init";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://energytalentz.com"),
  title: {
    default: "Energy Talents — Technical Crewing for Global Energy Projects",
    template: "%s · Energy Talents",
  },
  description:
    "Energy Talents supplies, deploys, and manages skilled technical manpower for global infrastructure, oil & gas, marine, and renewable energy projects.",
  keywords: [
    "energy crewing",
    "oil and gas recruitment",
    "offshore crew",
    "renewable energy staffing",
    "technical manpower",
    "global mobilization",
  ],
  openGraph: {
    type: "website",
    siteName: "Energy Talents",
    title: "Energy Talents — Technical Crewing for Global Energy Projects",
    description:
      "Skilled technical crews recruited and mobilized from India to energy projects worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-body text-ink">
        <RevealInit />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
