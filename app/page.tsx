"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const Blackhole = dynamic(() => import("@/components/blackhole"), { ssr: false });
const StarsCanvas = dynamic(() => import("@/components/StarBackground"), { ssr: false });
const Testimonial = dynamic(() => import("@/components/testimonial"), { ssr: false });
const Achievements = dynamic(() => import("@/components/achievements"), { ssr: false });
const Faq = dynamic(() => import("@/components/faq"), { ssr: false });
const Contact = dynamic(() => import("@/components/contact"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"), { ssr: false });
const ScrollIndicator = dynamic(() => import("@/components/scroll-indicator"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef(null);

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
          }
        );
      });

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
          }
        );
      });

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
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <ThemeProvider>
      <div
        ref={mainRef}
        className="min-h-screen bg-[#f7f4ee] text-stone-950 transition-colors duration-300 dark:bg-[#080b10] dark:text-stone-50"
      >
        <Blackhole />
        <StarsCanvas />
        <Navbar />
        <ScrollIndicator />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Testimonial />
          <Achievements />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}
