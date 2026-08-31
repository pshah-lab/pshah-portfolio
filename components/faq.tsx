"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqItems } from "@/lib/faq-data";

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const faqListRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !faqListRef.current) return;

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
        faqListRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqListRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-24">
      <div className="section-shell">
        <div ref={titleRef} className="mb-14 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="section-kicker">AEO & Direct Answers</p>
            <h2 className="section-title mt-3">Frequently Asked Questions</h2>
          </div>
          <p className="section-copy lg:pt-10">
            Direct, structured answers optimized for search engines, AI assistants, and recruiters inspecting technical background.
          </p>
        </div>

        <div
          ref={faqListRef}
          className="border-t border-stone-300/70 dark:border-white/10"
        >
          <div className="divide-y divide-stone-300/70 dark:divide-white/10">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <article
                  key={item.question}
                  className="py-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 text-left transition-colors hover:text-teal-700 dark:hover:text-teal-300 focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 flex-none text-teal-700 dark:text-teal-300" />
                      <h3
                        className="text-lg font-semibold tracking-tight text-stone-950 dark:text-white"
                        itemProp="name"
                      >
                        {item.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 flex-none text-stone-500 transition-transform duration-300 dark:text-stone-400 ${
                        isOpen ? "rotate-180 text-teal-700 dark:text-teal-300" : ""
                      }`}
                    />
                  </button>

                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden pl-8">
                      <p
                        className="max-w-3xl text-base leading-8 text-stone-600 dark:text-stone-300"
                        itemProp="text"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
