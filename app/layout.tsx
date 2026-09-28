import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TrackClicks } from "@/components/track-clicks";
import { JsonLd } from "@/components/json-ld";
import { profile, site } from "@/content/profile";
import { personSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const display = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
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
