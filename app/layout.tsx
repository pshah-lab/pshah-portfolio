import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pratham Shah - Full Stack Developer Portfolio",
  description:
    "Portfolio of Pratham Shah, a passionate Full Stack Developer specializing in JavaScript, React.js, Node.js, and AI-powered applications.",
  keywords:
    "Pratham Shah, full stack developer, react developer, node.js developer, AI projects, web development, portfolio",
  authors: [{ name: "Pratham Shah" }],
  openGraph: {
    title: "Pratham Shah - Full Stack Developer Portfolio",
    description:
      "Explore the portfolio of Pratham Shah, a Full Stack Developer building impactful projects with React.js, Node.js, and AI/ML.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Shah - Full Stack Developer Portfolio",
    description:
      "Portfolio of Pratham Shah, a Full Stack Developer specializing in React, Node.js, and AI-powered applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
