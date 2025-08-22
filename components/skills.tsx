"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 55 },
      { name: "Next.js", level: 60 },
      { name: "TypeScript", level: 25 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 10 },
      { name: "GSAP", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 50 },
      { name: "Express.js", level: 50 },
      { name: "Python", level: 30 },
      { name: "PostgreSQL", level: 10 },
      { name: "MongoDB", level: 60 },
      { name: "GraphQL", level: 10 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 10 },
      { name: "AWS", level: 40 },
      { name: "Figma", level: 85 },
      { name: "Jest", level: 10 },
      { name: "Webpack", level: 10 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !categoriesRef.current) return;
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Categories stagger animation
      gsap.fromTo(
        categoriesRef.current.children,
        { opacity: 0, y: 100, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Skill bars animation
      skillCategories.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          const progressBar = document.querySelector(
            `#progress-${categoryIndex}-${skillIndex}`
          );
          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: `${skill.level}%`,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: progressBar,
                  start: "top 90%",
                  toggleActions: "play none none none",
                  once: true,
                },
              }
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-[rgb(0,0,18)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div ref={categoriesRef} className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-[rgb(0,0,18)]"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          id={`progress-${categoryIndex}-${skillIndex}`}
                          className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
                          style={{ width: "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
