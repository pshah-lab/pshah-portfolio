"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface AchievementItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies?: string[];
}

const achievementsData: AchievementItem[] = [
  {
    title: "Neuro Signal Classifier for BCI NeuroArm",
    organization: "IS360 Technologies",
    period: "July 2024 - December 2024",
    description:
      "Developed an end-to-end EEG signal pipeline, achieving high accuracy in classifying brain signals for movement intent (left vs right arm).",
    technologies: ["Python", "TensorFlow", "Scikit-learn"],
  },
  {
    title: "Real-time Visualization for Brain Signals",
    organization: "IS360 Technologies",
    period: "January 2025 - May 2025",
    description:
      "Built a real-time visualization system to map classified EEG signals into actionable outputs, enhancing user interaction and feedback.",
    technologies: ["Python", "Matplotlib", "Real-time data processing"],
  },
  {
    title: "Runner Up in SHODH 1.0 Campus Hackathon",
    organization: "Campus Hackathon",
    period: "March 2023",
    description:
      "Successfully built a Canteen Management System for Campus Canteens, securing the runner-up position.",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js, PHP"],
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !timelineRef.current) return;

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
        timelineRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-24"
    >
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Milestones</p>
            <h2 className="section-title mt-3">Recognition and research outcomes.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            A few concrete markers from research, visualization, and hackathon work.
          </p>
        </div>

        <div ref={timelineRef} className="grid gap-px border border-stone-300/70 bg-stone-300/70 dark:border-white/10 dark:bg-white/10 lg:grid-cols-3">
            {achievementsData.map((achievement, index) => (
              <article key={index} className="bg-[#fbfaf7] p-6 dark:bg-[#080b10]">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <Award className="h-5 w-5 text-teal-700 dark:text-teal-300" />
                        <h3 className="text-xl font-semibold tracking-tight text-stone-950 dark:text-white">
                          {achievement.title}
                        </h3>
                        <div className="flex items-center text-sm text-teal-700 dark:text-teal-300">
                          <span className="font-medium">
                            {achievement.organization}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm">
                          <Star className="h-4 w-4 mr-1 flex-none" />
                          <span>{achievement.period}</span>
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-stone-600 dark:text-stone-300">
                      {achievement.description}
                    </p>

                    {achievement.technologies &&
                      achievement.technologies.length > 0 && (
                        <div className="mt-6">
                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                            Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {achievement.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="rounded-none border-stone-300 bg-transparent text-xs text-stone-600 dark:border-white/10 dark:text-stone-300"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
