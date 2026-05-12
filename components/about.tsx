"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Gauge, PencilRuler, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Product engineering",
    description: "React, Next.js, Node.js, and API work with attention to maintainability.",
  },
  {
    icon: PencilRuler,
    title: "Interface craft",
    description: "Layouts, motion, and interaction details that support the job of the page.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Fast loading, accessible structure, and fewer unnecessary moving parts.",
  },
  {
    icon: Users,
    title: "Client delivery",
    description: "Clear communication from scope to deployment, especially on freelance builds.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !contentRef.current || !cardsRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">About</p>
            <h2 className="section-title mt-3">Engineering with enough taste to keep the interface honest.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            I build full-stack web products that need both a solid technical foundation and a polished front end.
            My recent work spans real estate websites, animated product experiences, and BCI signal visualization.
          </p>
        </div>

        <div className="grid gap-12 border-t border-stone-300/70 pt-12 dark:border-white/10 lg:grid-cols-[0.95fr_1.05fr]">
          <div ref={contentRef} className="space-y-6 text-lg leading-9 text-stone-700 dark:text-stone-300">
            <p>
              I work across JavaScript, React, Next.js, Node.js, and data-driven systems. The common thread is practical execution: understand the problem, reduce the noise, and ship the part users can actually feel.
            </p>
            <p>
              Alongside web development, I have worked on EEG signal classification and real-time visualization for NeuroArm, where interface clarity and model output both matter.
            </p>
          </div>

          <div ref={cardsRef} className="grid gap-px overflow-hidden border border-stone-300/70 bg-stone-300/70 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="bg-[#fbfaf7] p-6 transition-colors hover:bg-white dark:bg-[#080b10] dark:hover:bg-white/[0.06]">
                <item.icon className="mb-6 h-5 w-5 text-teal-700 dark:text-teal-300" />
                <h3 className="text-base font-semibold text-stone-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
