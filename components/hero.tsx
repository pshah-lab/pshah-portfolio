"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.35"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          socialRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.25"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.to(heroRef.current, {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(28,25,23,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,25,23,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-[#f7f4ee] to-transparent dark:from-[#080b10]" />

      <div className="section-shell relative z-30 grid min-h-[calc(100vh-5rem)] items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-4xl space-y-6">
          <div ref={titleRef} className="space-y-5">
            <p className="section-kicker">Pratham Shah</p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-stone-950 sm:text-5xl lg:text-6xl 2xl:text-7xl dark:text-stone-50">
              Full-Stack Developer & Cloud Engineer.
            </h1>
          </div>

          <div ref={subtitleRef}>
            <p className="max-w-2xl text-lg leading-8 text-stone-700 dark:text-stone-300">
              Building precise web products across React, Next.js, Node.js, AWS/GCP infrastructure, and signal-driven BCI applications with engineering depth.
            </p>
          </div>

          <div
            ref={descriptionRef}
            className="hidden max-w-2xl grid-cols-3 border-y border-stone-300/70 py-5 dark:border-white/10 2xl:grid"
          >
            <div>
              <p className="text-2xl font-semibold text-stone-950 dark:text-white">
                03
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                shipped projects
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-950 dark:text-white">
                BCI
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                research focus
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-stone-950 dark:text-white">
                GCP / AWS
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                cloud & FinOps
              </p>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="rounded-none bg-stone-950 px-7 py-6 text-base font-medium text-white shadow-none hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
              onClick={scrollToAbout}
            >
              View work
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="/Pratham_Resume.pdf" download aria-label="Download Pratham Shah's Resume PDF">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none border-stone-400 bg-transparent px-7 py-6 text-base font-medium text-stone-950 shadow-none hover:bg-stone-200/70 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              >
                Resume
              </Button>
            </a>
          </div>

          <div ref={socialRef} className="flex items-center gap-2 pt-2">
            <a
              href="https://github.com/pshah-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub Profile"
                className="rounded-none text-stone-600 hover:bg-stone-200 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
              </Button>
            </a>

            <a
              href="https://linkedin.com/in/pratham-shah-729432258/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn Profile"
                className="rounded-none text-stone-600 hover:bg-stone-200 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>

            <a
              href="mailto:pshah88669@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Pratham Shah"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Email Pratham Shah"
                className="rounded-none text-stone-600 hover:bg-stone-200 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[460px] border-l border-stone-300/70 pl-10 dark:border-white/10 lg:block">
          <div className="absolute right-0 top-4 h-[76%] w-[86%] border border-stone-300 bg-[#efebe3] dark:border-white/10 dark:bg-white/[0.03]" />
          <div className="absolute right-10 top-16 h-[76%] w-[78%] overflow-hidden border border-stone-400/60 bg-stone-950 shadow-2xl shadow-stone-950/10 dark:border-white/15">
            <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-white/10 bg-black/60 px-4">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-yellow-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="flex h-full items-end bg-[url('/neuro.png')] bg-cover bg-center">
              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-7 pt-28 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-teal-200">
                  Selected work
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  NeuroArm Signal Flow
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/72">
                  Interactive EEG pipeline visualization for movement-intent
                  classification.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer sm:block"
          onClick={scrollToAbout}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-950 dark:text-stone-400 dark:hover:text-white">
            <span>Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
