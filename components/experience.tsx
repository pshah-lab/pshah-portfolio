"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description:
      "Lead development of scalable web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.",
    achievements: [
      "Reduced application load time by 40% through optimization",
      "Led team of 5 developers on major product redesign",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple client projects from concept to deployment. Collaborated with design team to create pixel-perfect implementations.",
    achievements: [
      "Built 15+ responsive web applications",
      "Improved code coverage from 60% to 95%",
      "Reduced bug reports by 50% through better testing practices",
    ],
    technologies: ["Vue.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    location: "Remote",
    period: "2019 - 2020",
    description:
      "Specialized in creating interactive user interfaces and optimizing user experience. Worked closely with UX designers and backend developers.",
    achievements: [
      "Increased user engagement by 35% through UI improvements",
      "Delivered 20+ projects on time and within budget",
      "Established component library used across all projects",
    ],
    technologies: ["React", "JavaScript", "SASS", "Webpack"],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !timelineRef.current) return
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
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-white dark:bg-[rgb(0,0,18)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and the impact I've made along the way.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 hidden md:block" />

                <Card className="md:ml-16 group hover:shadow-lg transition-all duration-300 border-0 bg-white dark:bg-[rgb(0,0,18)] shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                          <Building className="h-4 w-4 mr-2" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end space-y-1">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
