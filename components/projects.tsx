"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Animated Website Design",
    description: "An animated and visually appealing website design",
    longDescription:
      "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing, and admin dashboard. Implemented real-time inventory management and order tracking.",
    image: "/A1.png",
    technologies: ["React", "Tailwind CSS", "GSAP"],
    github: "https://github.com/pshah-lab/animated-design-website",
    live: "https://animated-design-website.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "NeuroArm Signal Flow",
    description: "An interactive visualization of brain-signal processing for prosthetic arm control.",
    longDescription:
      "Built an interactive web-based system to demonstrate the complete EEG signal pipeline — from brainwave capture, preprocessing, classification, to prosthetic arm movement. Designed with modular components for extensibility and real-time visualization of signal flow.",
    image: "/neuro.png",
    technologies: ["React", "TypeScript", "TailwindCSS", "D3.js", "Chart.js"],
    github: "https://github.com/pshah-lab/NeuroArm",
    live: "https://neuro-arm.vercel.app/",
    featured: true,
  },
  // {
  //   id: 3,
  //   title: "Weather Dashboard",
  //   description: "A beautiful weather application with location-based forecasts and interactive maps.",
  //   longDescription:
  //     "Created an intuitive weather dashboard featuring current conditions, 7-day forecasts, interactive maps, and weather alerts. Implemented geolocation services and multiple weather data sources.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   technologies: ["Vue.js", "Express.js", "OpenWeather API", "Chart.js"],
  //   github: "https://github.com/pshah-lab/animated-design-website",
  //   live: "https://animated-design-website.vercel.app/",
  //   featured: false,
  // },
  // {
  //   id: 4,
  //   title: "Social Media Analytics",
  //   description: "Analytics dashboard for social media performance tracking and insights.",
  //   longDescription:
  //     "Built a comprehensive analytics platform that aggregates data from multiple social media platforms, providing detailed insights, performance metrics, and automated reporting features.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
  //   github: "https://github.com/pshah-lab/animated-design-website",
  //   live: "https://animated-design-website.vercel.app/",
  //   featured: false,
  // },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !projectsRef.current) return
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
        },
      )

      // Projects stagger animation
      gsap.fromTo(
        projectsRef.current.children,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white dark:bg-[rgb(0,0,18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>

        <div ref={projectsRef} className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="rounded-full" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {expandedProject === project.id ? project.longDescription : project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="rounded-full bg-transparent" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => toggleProject(project.id)} className="rounded-full">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${expandedProject === project.id ? "rotate-90" : ""}`}
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
            More projects coming soon...
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
