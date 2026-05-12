"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies?: string[];
}

const testimonialsData: TestimonialItem[] = [
  {
    title: "Abhinandan Mountreea",
    organization: "Abhinandan Group",
    period: "November 2025",
    description:
      "The website reflects exactly what we had envisioned - a platform that communicates our brand values, showcases our flagship project, and builds trust with potential customers. His attention to detail, technical expertise, and timely delivery have truly impressed us.",
  },
];

export default function Testimonial() {
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
      id="testimonials"
      ref={sectionRef}
      className="py-24"
    >
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Client note</p>
            <h2 className="section-title mt-3">Feedback from a shipped real estate build.</h2>
          </div>
          <p className="section-copy lg:pt-10">
            One client signal from work delivered outside coursework and demos.
          </p>
        </div>

        <div ref={timelineRef} className="max-w-5xl border-y border-stone-300/70 py-10 dark:border-white/10">
            {testimonialsData.map((achievement, index) => (
              <figure key={index} className="grid gap-8 lg:grid-cols-[0.18fr_0.82fr]">
                <Quote className="h-12 w-12 text-teal-700 dark:text-teal-300" />
                <div>
                    <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight text-stone-950 dark:text-white sm:text-4xl">
                      "{achievement.description}"
                    </blockquote>
                    <figcaption className="mt-8 flex flex-col gap-1 border-t border-stone-300/70 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-stone-950 dark:text-white">
                          {achievement.title}
                        </p>
                        <p className="text-sm text-teal-700 dark:text-teal-300">
                          {achievement.organization}
                        </p>
                      </div>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {achievement.period}
                      </p>
                    </figcaption>
                </div>
              </figure>
            ))}
        </div>
      </div>
    </section>
  );
}
