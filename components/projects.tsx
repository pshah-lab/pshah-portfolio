"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Animated Website Design",
    description: "A motion-led web experience built with React, Tailwind CSS, and GSAP.",
    longDescription:
      "Designed and implemented an animated website experience with scroll timing, layered motion, and responsive page composition. The project focused on fluid transitions without compromising page structure.",
    image: "/A1.png",
    technologies: ["React", "Tailwind CSS", "GSAP"],
    github: "https://github.com/pshah-lab/animated-design-website",
    live: "https://animated-design-website.vercel.app/",
  },
  {
    id: 2,
    title: "NeuroArm Signal Flow",
    description:
      "Interactive visualization of an EEG signal pipeline for prosthetic arm control.",
    longDescription:
      "Built a web-based system to demonstrate EEG capture, preprocessing, classification, and prosthetic movement intent. The interface makes a complex signal pipeline easier to inspect in real time.",
    image: "/neuro.png",
    technologies: ["React", "TypeScript", "Tailwind", "D3.js", "Chart.js"],
    github: "https://github.com/pshah-lab/NeuroArm",
    live: "https://neuro-arm.vercel.app/",
  },
  {
    id: 3,
    title: "Abhinandan Mountreea",
    description:
      "A responsive real estate website for showcasing residential and villa projects.",
    longDescription:
      "Designed and developed a property showcase for Abhinandan Mountreea with a cleaner content flow, responsive pages, and smoother brand presentation for prospective buyers.",
    image: "/Abhinandan.png",
    technologies: ["React", "TypeScript", "JavaScript", "GSAP"],
    github: "",
    live: "https://www.abhinandanmountreea.com/",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !projectsRef.current) return;

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
        projectsRef.current.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title mt-3">Projects that show the range: motion, product, systems.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            A short set of shipped work, with emphasis on real interfaces and technical execution.
          </p>
        </div>

        <div ref={projectsRef} className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group grid overflow-hidden border border-stone-300/70 bg-[#fbfaf7] dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-[0.96fr_1.04fr]"
            >
              <div className={`relative min-h-[280px] overflow-hidden lg:min-h-[430px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="flex items-center justify-between gap-6 border-b border-stone-300/70 pb-6 dark:border-white/10">
                    <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                      0{index + 1}
                    </p>
                    <div className="flex flex-wrap justify-end gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="border border-stone-300 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-white/10 dark:text-stone-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-8 max-w-xl text-3xl font-semibold tracking-tight text-stone-950 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-300">
                    {expandedProject === project.id
                      ? project.longDescription
                      : project.description}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-none border-stone-400 bg-transparent text-stone-900 shadow-none hover:bg-stone-200/70 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="rounded-none bg-stone-950 text-white shadow-none hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
                    asChild
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Visit
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProject(project.id)}
                    className="rounded-none text-stone-600 hover:bg-stone-200 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    Details
                    <ChevronDown
                      className={`ml-2 h-4 w-4 transition-transform ${
                        expandedProject === project.id ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
