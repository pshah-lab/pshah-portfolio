"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Palette, Zap, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code following best practices.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces with attention to detail.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for speed, accessibility, and user experience.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams and communicating complex ideas clearly.",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !contentRef.current || !cardsRef.current) return
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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-[rgb(0,0,18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
  <div className="prose prose-lg dark:prose-invert">
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      Hi, I’m Pratham Shah — a passionate developer who loves building things that make an impact. I specialize in
      JavaScript, React.js, Node.js, and full-stack development, with growing expertise in AI/ML and data-driven
      systems.
    </p>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      I enjoy solving complex problems, turning ideas into polished, user-friendly applications, and continuously
      learning new technologies. My projects range from frontend experiences to AI-powered tools like brain-signal
      classifiers and interactive visualizers.
    </p>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      When I’m not coding, you’ll often find me playing football, reading, or writing poetry. I believe in combining
      creativity with technology to build products that genuinely help people.
    </p>
  </div>
</div>

          {/* Highlights */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-[rgb(0,0,18)] shadow-md"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
