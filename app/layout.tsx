import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import JsonLd from "@/components/json-ld"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pshah.fun"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#080b10" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pratham Shah | Full Stack Developer & Cloud Engineer",
    template: "%s | Pratham Shah",
  },
  description:
    "Portfolio of Pratham Shah, a Full Stack Developer & Cloud Engineer specializing in React.js, Next.js, Node.js, AWS/GCP, and AI/BCI signal processing.",
  keywords: [
    "Pratham Shah",
    "Pratham Shah Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Engineer",
    "Cloud Engineer",
    "FinOps Engineer",
    "GCP Optimization",
    "AWS Lambda",
    "BCI Research",
    "EEG Signal Processing",
    "Web Developer Pune",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Pratham Shah", url: siteUrl }],
  creator: "Pratham Shah",
  publisher: "Pratham Shah",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": `${siteUrl}/llms.txt`,
    },
  },
  openGraph: {
    title: "Pratham Shah | Full Stack Developer & Cloud Engineer",
    description:
      "Full Stack Developer building polished web applications, cloud infrastructure (AWS/GCP), and AI/BCI signal pipelines.",
    url: siteUrl,
    siteName: "Pratham Shah Developer Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Shah | Full Stack Developer & Cloud Engineer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, AWS, GCP FinOps, and Brain-Computer Interfaces.",
    creator: "@pshah_lab",
    site: "@pshah_lab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    apple: "/logo.jpg",
  },
  manifest: "/manifest.json",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
        <link rel="author" type="text/markdown" href="/llms.txt" title="LLM Context" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full LLM Profile" />
        <JsonLd />
      </head>
      <body className={inter.className}>
        {children}

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}