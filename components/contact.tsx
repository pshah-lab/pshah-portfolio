"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
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
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
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
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-[rgb(0,0,18)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from
            you.
          </p>
        </div>

        <div
          ref={contactInfoRef}
          className="space-y-8 flex flex-col items-center justify-center"
        >
          <Card className="border-0 shadow-lg bg-white dark:bg-[rgb(0,0,18)] w-full max-w-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 justify-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <a href="mailto:pshah88669@gmail.com">
                      <p className="text-gray-900 dark:text-white font-medium">
                        pshah88669@gmail.com
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white dark:bg-[rgb(0,0,18)] w-full max-w-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Follow Me
              </h3>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://github.com/pshah-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </a>

                <a
                  href="https://linkedin.com/in/pratham-shah-729432258/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>

                <a
                   href="https://x.com/pshah_lab"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <Button
                     variant="outline"
                     size="icon"
                     className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-transparent"
                   >
                     <Twitter className="h-5 w-5" />
                   </Button>
                 </a>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                Let's connect and build something amazing together!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
