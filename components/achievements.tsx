"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Award, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline items animation
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, x: -100, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
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
      className="py-20 bg-gray-50 dark:bg-[rgb(0,0,18)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Key Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Highlights of my contributions and successful projects.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-500 hidden md:block" />

          <div className="space-y-8">
            {achievementsData.map((achievement, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-4 border-white dark:border-gray-900 hidden md:block" />

                <Card className="md:ml-16 group hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-[rgb(0,0,18)] shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {achievement.title}
                        </h3>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                          <Award className="h-4 w-4 mr-2" />
                          <span className="font-medium">
                            {achievement.organization}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end space-y-1">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{achievement.period}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {achievement.description}
                    </p>

                    {achievement.technologies &&
                      achievement.technologies.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {achievement.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
