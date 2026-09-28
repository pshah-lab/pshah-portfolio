import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TrackClicks } from "@/components/track-clicks";
import { JsonLd } from "@/components/json-ld";
import { profile, site } from "@/content/profile";
import { personSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

/*
 * IBM Plex is self-hosted from app/fonts (SIL Open Font License, see OFL-LICENSE.txt) so the
 * build never depends on reaching Google Fonts. next/font/local still generates size-adjusted
 * fallbacks, so there is no layout shift while the files load.
 */
const sans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
const display = localFont({
  src: [{ path: "./fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", weight: "600", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});
const mono = localFont({
  src: [{ path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
  // Only used below the fold (diagrams, code); don't compete with the hero for bandwidth.
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF0F2" },
    { media: "(prefers-color-scheme: dark)", color: "#0F141C" },
  ],
  width: "device-width",
  initialScale: 1,
};

const title = `${profile.name}: ${profile.shortRole}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${profile.name}` },
  description: `${profile.tagline} Based in ${profile.location}.`,
  applicationName: site.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: {
    canonical: site.url,
    types: { "text/plain": `${site.url}/llms.txt` },
  },
  openGraph: {
    title,
    description: profile.tagline,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "profile",
  },
  twitter: { card: "summary_large_image", title, description: profile.tagline, creator: "@pshah_lab" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } }
    : {}),
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <TrackClicks />
        <Analytics />
      </body>
    </html>
  );
}
