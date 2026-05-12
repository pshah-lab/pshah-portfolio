"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "GitHub", href: "https://github.com/pshah-lab", icon: Github },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/pratham-shah-729432258/",
    icon: Linkedin,
  },
  { label: "X", href: "https://x.com/pshah_lab", icon: Twitter },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="section-title mt-3">Have a build that needs a careful hand?</h2>
          </div>
          <p className="section-copy lg:pt-10">
            Send the brief, context, or problem statement. I will reply with next steps and practical questions.
          </p>
        </div>

        <div
          ref={contactInfoRef}
          className="grid border border-stone-300/70 bg-[#fbfaf7] dark:border-white/10 dark:bg-white/[0.03] lg:grid-cols-[1fr_0.8fr]"
        >
          <div className="border-b border-stone-300/70 p-6 dark:border-white/10 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
              Email
            </p>
            <a
              href="mailto:pshah88669@gmail.com"
              className="group inline-flex items-center text-2xl font-semibold tracking-tight text-stone-950 transition-colors hover:text-teal-700 dark:text-white dark:hover:text-teal-300 sm:text-4xl"
            >
              pshah88669@gmail.com
              <ArrowUpRight className="ml-3 h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="p-6 sm:p-8">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
              Elsewhere
            </p>
            <div className="grid gap-3">
              {links.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  className="h-12 justify-between rounded-none border-stone-300 bg-transparent px-4 text-stone-900 shadow-none hover:bg-stone-200/70 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center">
                      <link.icon className="mr-3 h-4 w-4" />
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
