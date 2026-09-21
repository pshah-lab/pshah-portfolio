"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const About = dynamic(() => import("@/components/about")) as React.FC;
const Projects = dynamic(() => import("@/components/projects")) as React.FC;
const Skills = dynamic(() => import("@/components/skills")) as React.FC;
const Experience = dynamic(() => import("@/components/experience")) as React.FC;

const Blackhole = dynamic(() => import("@/components/blackhole"), { ssr: false }) as React.FC;
const StarsCanvas = dynamic(() => import("@/components/StarBackground"), { ssr: false }) as React.FC;
const Testimonial = dynamic(() => import("@/components/testimonial"), { ssr: false }) as React.FC;
const Achievements = dynamic(() => import("@/components/achievements"), { ssr: false }) as React.FC;
const Faq = dynamic(() => import("@/components/faq"), { ssr: false }) as React.FC;
const Contact = dynamic(() => import("@/components/contact"), { ssr: false }) as React.FC;
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"), { ssr: false }) as React.FC;
const ScrollIndicator = dynamic(() => import("@/components/scroll-indicator"), { ssr: false }) as React.FC;

export default function Home() {
  return (
    <ThemeProvider>
      <div
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
