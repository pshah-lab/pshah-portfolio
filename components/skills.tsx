"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiMongodb, SiVercel, SiWordpress, SiAmazon, SiGooglecloud, SiHtml5, SiCss3, SiReact, SiExpress, SiGit, SiFigma } from "react-icons/si";
import { FaServer as Server, FaDatabase as Database, FaBolt as Zap } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: SiExpress },
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
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: titleRef.current, start: "top 90%", toggleActions: "play none none none", once: true } }
      );

      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: skillsRef.current, start: "top 90%", toggleActions: "play none none none", once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-[rgb(0,0,18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I use to build modern applications.
          </p>
        </div>

        <div ref={skillsRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 justify-center">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card key={skill.name} className="border-0 shadow-lg bg-white dark:bg-[rgb(0,0,18)] hover:shadow-2xl transition-transform duration-300 hover:scale-105">
                <CardContent className="flex flex-col items-center p-6">
                  <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-3" />
                  <span className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}