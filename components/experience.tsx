"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Full-Stack Engineering Intern",
    company: "NeuraMach AI Studios",
    location: "Pune, India",
    period: "Jan 12, 2026 – April 11, 2026",
    description:
      "Full-stack engineering internship focused on rebuilding backend architecture, delivering secure APIs, and improving reliability across the product stack.",
    achievements: [
      "Re-architected backend from AppSync to API Gateway, Lambda, DynamoDB, and SES, eliminating public data exposure and improving API security.",
      "Built REST endpoints and Lambda handlers in Node.js with validation and DynamoDB persistence.",
      "Implemented abuse-resistant submission pipeline with multi-window rate limiting (IP/email), validation, and injection protection.",
      "Architected secure HLS delivery using AWS S3 + CloudFront with signed cookies and role-based access control.",
      "Resolved 15+ cross-layer production issues across Next.js, Node.js, CI/CD, and AWS, reducing deployment failures by 40%."
    ],
    technologies: [
      "Node.js",
      "AWS API Gateway",
      "AWS Lambda",
      "DynamoDB",
      "SES",
      "S3",
      "CloudFront",
      "Next.js",
      "CI/CD"
    ]
  },
   {
    title: "Freelance Project",
    company: "Client Project",
    location: "Remote",
    period: "November 2025",
    description:
      "Independently developing the complete website for a Real Estate client, a luxury residential and villas showcase platform. Responsible for designing, coding, and deploying the entire project while ensuring a balance of performance, aesthetics, and usability.",
    achievements: [
      "Develop responsive layouts ensuring accessibility across devices",
      "Implemented smooth animations and transitions to enhance user engagement",
      "Collaborated with client to refine design choices and content flow",
    ],
    technologies: ["React", "GSAP", "Tailwind CSS", "JavaScript", "NextJs"],
  },
  {
    title: "Research Developer – BCI NeuroArm",
    company: "IS360 Technologies",
    location: "Pune, India",
    period: "July 2024 - December 2024",
    description:
      "Focused on building a Neuro Signal Classifier as part of the BCI NeuroArm project. Implemented an end-to-end EEG signal pipeline for acquiring, preprocessing, and classifying brain signals to identify movement intent (left vs right).",
    achievements: [
      "Designed and trained ML models for EEG-based movement intent classification",
      "Achieved high accuracy in differentiating left vs right arm movement signals",
      "Built real-time visualization to map classified signals into actionable outputs",
    ],
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Matplotlib"],
  },
 
  
];

export default function Experience() {
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
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
      id="experience"
      ref={sectionRef}
      className="py-24"
    >
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 className="section-title mt-3">Work that connects product, backend, and research.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            Recent roles and client engagements with the technical details kept visible.
          </p>
        </div>

        <div ref={timelineRef} className="border-t border-stone-300/70 dark:border-white/10">
          <div className="divide-y divide-stone-300/70 dark:divide-white/10">
            {experiences.map((exp, index) => (
              <article key={index} className="grid gap-6 py-8 lg:grid-cols-[0.28fr_0.72fr]">
                <div className="flex items-start gap-3 text-sm text-stone-500 dark:text-stone-400">
                  <span className="mt-2 h-2 w-2 bg-teal-700 dark:bg-teal-300" />
                  <span>{exp.period}</span>
                </div>

                <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-stone-950 dark:text-white">
                          {exp.title}
                        </h3>
                        <div className="mt-3 flex items-center text-teal-700 dark:text-teal-300">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 sm:items-end">
                        <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center text-stone-500 dark:text-stone-400 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300">
                      {exp.description}
                    </p>

                    <div className="mt-6">
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                        Key outcomes
                      </h4>
                      <ul className="grid gap-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm leading-6 text-stone-600 dark:text-stone-300"
                          >
                            <span className="mr-3 mt-2 h-1.5 w-1.5 flex-none bg-stone-400 dark:bg-stone-500" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="rounded-none border-stone-300 bg-transparent text-xs text-stone-600 dark:border-white/10 dark:text-stone-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
