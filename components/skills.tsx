"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SiJavascript = dynamic(() => import("react-icons/si").then((m) => m.SiJavascript), { ssr: false });
const SiNextdotjs = dynamic(() => import("react-icons/si").then((m) => m.SiNextdotjs), { ssr: false });
const SiTailwindcss = dynamic(() => import("react-icons/si").then((m) => m.SiTailwindcss), { ssr: false });
const SiMongodb = dynamic(() => import("react-icons/si").then((m) => m.SiMongodb), { ssr: false });
const SiVercel = dynamic(() => import("react-icons/si").then((m) => m.SiVercel), { ssr: false });
const SiWordpress = dynamic(() => import("react-icons/si").then((m) => m.SiWordpress), { ssr: false });
const SiAmazon = dynamic(() => import("react-icons/si").then((m) => m.SiAmazon), { ssr: false });
const SiGooglecloud = dynamic(() => import("react-icons/si").then((m) => m.SiGooglecloud), { ssr: false });
const SiHtml5 = dynamic(() => import("react-icons/si").then((m) => m.SiHtml5), { ssr: false });
const SiCss3 = dynamic(() => import("react-icons/si").then((m) => m.SiCss3), { ssr: false });
const SiReact = dynamic(() => import("react-icons/si").then((m) => m.SiReact), { ssr: false });
const SiExpress = dynamic(() => import("react-icons/si").then((m) => m.SiExpress), { ssr: false });
const SiGit = dynamic(() => import("react-icons/si").then((m) => m.SiGit), { ssr: false });
const SiFigma = dynamic(() => import("react-icons/si").then((m) => m.SiFigma), { ssr: false });
const Server = dynamic(() => import("react-icons/fa").then((m) => m.FaServer), { ssr: false });

const skills = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Node.js", icon: Server },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Git", icon: SiGit },
  { name: "AWS", icon: SiAmazon },
  { name: "GCP", icon: SiGooglecloud },
  { name: "Figma", icon: SiFigma },
  { name: "Vercel", icon: SiVercel },
  { name: "WordPress", icon: SiWordpress },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !skillsRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.035,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <div ref={titleRef} className="mb-12 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Stack</p>
            <h2 className="section-title mt-3">Tools I use when the work needs to ship.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            Frontend, backend, cloud, and design tools used across recent portfolio and client work.
          </p>
        </div>

        <div
          ref={skillsRef}
          className="grid grid-cols-2 border-l border-t border-stone-300/70 dark:border-white/10 sm:grid-cols-3 md:grid-cols-5"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="flex min-h-32 flex-col justify-between border-b border-r border-stone-300/70 bg-[#fbfaf7]/60 p-5 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.06]"
              >
                <Icon className="h-7 w-7 text-stone-900 dark:text-stone-100" />
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
