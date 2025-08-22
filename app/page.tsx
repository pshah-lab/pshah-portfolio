"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import ScrollIndicator from "@/components/scroll-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Stars from "@/components/stars"
import Blackhole from "@/components/blackhole"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef(null)

  useEffect(() => {
    // Smooth scrolling setup
    const ctx = gsap.context(() => {
      // Global scroll animations
      gsap.utils.toArray(".fade-in").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      gsap.utils.toArray(".slide-in-left").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      gsap.utils.toArray(".slide-in-right").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <ThemeProvider>
      <div
        ref={mainRef}
        className="min-h-screen bg-white dark:bg-[rgb(0,0,18)] text-gray-900 dark:text-white transition-colors duration-300"
      >
        <Blackhole />
        <Stars />
        <Navbar />
        <ScrollIndicator />
        <main>
          <Hero/>
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}
