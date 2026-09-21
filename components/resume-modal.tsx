"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Moon,
  Sun,
  FileText,
  Layout,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [pdfDarkMode, setPdfDarkMode] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setPdfDarkMode(theme === "dark");
  }, [theme]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[92vh] flex flex-col p-0 gap-0 overflow-hidden border border-stone-300/80 bg-[#fbfaf7] text-stone-950 shadow-2xl dark:border-white/15 dark:bg-[#080b10] dark:text-stone-50 rounded-none sm:rounded-none">
        {/* Modal Top Control Bar */}
        <DialogHeader className="flex-none border-b border-stone-300/70 bg-[#f4f0e6]/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-stone-950 text-white dark:bg-white dark:text-stone-950">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold tracking-tight text-stone-950 dark:text-white">
                  Pratham Shah — Resume
                </DialogTitle>
                <DialogDescription className="text-xs text-stone-600 dark:text-stone-400">
                  Full Stack Developer & Cloud Engineer • Pune, India
                </DialogDescription>
              </div>
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Tab Switcher (Interactive vs PDF) */}
              <div className="flex items-center border border-stone-300/80 bg-white/80 p-0.5 dark:border-white/10 dark:bg-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setViewMode("interactive")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "interactive"
                      ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950"
                      : "text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <Layout className="h-3.5 w-3.5" />
                  <span>Interactive</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("pdf")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium transition-colors ${
                    viewMode === "pdf"
                      ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950"
                      : "text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-white"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>PDF Document</span>
                </button>
              </div>

              {/* PDF Dark Mode Filter Toggle (visible only in PDF mode) */}
              {viewMode === "pdf" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPdfDarkMode(!pdfDarkMode)}
                  title={pdfDarkMode ? "Switch PDF to Light Theme" : "Switch PDF to Dark Theme"}
                  className="h-8 rounded-none border-stone-300 bg-transparent px-2.5 text-xs text-stone-700 hover:bg-stone-200/70 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                >
                  {pdfDarkMode ? (
                    <>
                      <Sun className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
                      Light PDF
                    </>
                  ) : (
                    <>
                      <Moon className="mr-1.5 h-3.5 w-3.5 text-teal-400" />
                      Dark PDF
                    </>
                  )}
                </Button>
              )}

              {/* Open in New Tab */}
              <a
                href="/Pratham_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="Open raw PDF in full browser window"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-none border-stone-300 bg-transparent px-2.5 text-xs text-stone-700 hover:bg-stone-200/70 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:mr-1.5" />
                  <span className="hidden sm:inline">Open</span>
                </Button>
              </a>

              {/* Download PDF */}
              <a
                href="/Pratham_Resume.pdf"
                download
                title="Download Pratham Shah's Resume PDF"
              >
                <Button
                  size="sm"
                  className="h-8 rounded-none bg-stone-950 px-3 text-xs font-medium text-white shadow-none hover:bg-teal-800 dark:bg-white dark:text-stone-950 dark:hover:bg-teal-200"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download
                </Button>
              </a>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === "interactive" ? (
            /* Interactive Web ATS Resume */
            <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-10">
              {/* Header Profile Info */}
              <div className="border-b border-stone-300/70 pb-6 dark:border-white/10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-stone-950 dark:text-white">
                      PRATHAM SHAH
                    </h1>
                    <p className="mt-1 text-sm font-medium text-teal-700 dark:text-teal-300">
                      Cloud Security Reliability Engineer & AI Full-Stack Developer
                    </p>
                  </div>

                  {/* Recruiter Quick Copy & Social Pills */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard("pshah88669@gmail.com", "email")}
                      className="flex items-center gap-1.5 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition hover:border-stone-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:border-white/30"
                    >
                      {copiedField === "email" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Mail className="h-3.5 w-3.5 text-stone-500" />
                      )}
                      <span>{copiedField === "email" ? "Copied!" : "pshah88669@gmail.com"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => copyToClipboard("+916356356971", "phone")}
                      className="flex items-center gap-1.5 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition hover:border-stone-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:border-white/30"
                    >
                      {copiedField === "phone" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Phone className="h-3.5 w-3.5 text-stone-500" />
                      )}
                      <span>{copiedField === "phone" ? "Copied!" : "+91-6356356971"}</span>
                    </button>

                    <a
                      href="https://pshah.fun"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition hover:border-stone-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:border-white/30"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
                      <span>pshah.fun</span>
                    </a>

                    <a
                      href="https://linkedin.com/in/pratham-shah-729432258"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition hover:border-stone-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:border-white/30"
                    >
                      <Linkedin className="h-3.5 w-3.5 text-[#0077b5]" />
                      <span>LinkedIn</span>
                    </a>

                    <a
                      href="https://github.com/pshah-lab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700 transition hover:border-stone-500 dark:border-white/15 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:border-white/30"
                    >
                      <Github className="h-3.5 w-3.5 text-stone-900 dark:text-white" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <Briefcase className="h-4 w-4" />
                  <span>EXPERIENCE</span>
                </div>

                <div className="space-y-6">
                  {/* Searce */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                        Cloud Security Reliability Engineer Intern <span className="text-stone-400 font-normal">|</span> Searce Inc.
                      </h2>
                      <span className="text-xs text-stone-600 dark:text-stone-400">
                        Apr 2026 – Aug 2026
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Analyzed Google Cloud infrastructure utilization, billing data, and usage patterns to identify cost inefficiencies and recommend resource rightsizing opportunities.</li>
                      <li>Developed and implemented cloud cost optimization strategies that helped a client achieve $2,000+ in savings, balancing cost efficiency with application reliability and performance.</li>
                    </ul>
                  </div>

                  {/* NeuraMach */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                        AI Full-Stack Engineering Intern (QA Focus) <span className="text-stone-400 font-normal">|</span> NeuraMach AI Studios
                      </h2>
                      <span className="text-xs text-stone-600 dark:text-stone-400">
                        Jan 2026 – Apr 2026
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Designed and implemented a secure AWS video delivery solution using S3 and CloudFront, incorporating signed cookies, authentication-based access control, and protected content delivery.</li>
                      <li>Resolved 80+ production defects and 20+ backend errors, improving application stability and reducing recurring issues in the existing codebase.</li>
                      <li>Identified and remediated 6 security vulnerabilities, and refactored cluttered legacy code into structured, reusable React components to improve maintainability.</li>
                    </ul>
                  </div>

                  {/* Abhinandan Mountreea */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                        Frontend Developer <span className="text-stone-400 font-normal">|</span> Abhinandan Mountreea (Freelance)
                      </h2>
                      <span className="text-xs text-stone-600 dark:text-stone-400">
                        Jul 2025 – Nov 2025
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Translated business and UX requirements into a high-performance real estate platform using React.js, Vite, and GSAP.</li>
                      <li>Integrated Cloudinary CDN, WebP conversion, caching, and lazy loading, reducing initial page load time by 50% and increasing user engagement by 30%.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <Code className="h-4 w-4" />
                  <span>PROJECTS</span>
                </div>

                <div className="space-y-5">
                  {/* InsightVault */}
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                      InsightVault: LLM-Powered Semantic Search System (Python)
                    </h2>
                    <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Architected a semantic search and knowledge retrieval system powered by LLMs, with backend APIs optimized for caching and low latency.</li>
                      <li>Integrated vector-based search to enable accurate, context-aware retrieval over unstructured content, with a scalable, modular backend architecture.</li>
                    </ul>
                  </div>

                  {/* StreamVault */}
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                      StreamVault: Cloud Video Streaming Platform (Python)
                    </h2>
                    <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Built a secure video streaming platform using AWS CloudFront, S3, and Cognito to deliver protected HLS video streams.</li>
                      <li>Automated video transcoding using FFmpeg on EC2 Spot Instances, reducing video processing costs by over 90%.</li>
                      <li>Developed RESTful APIs using FastAPI and DynamoDB to save and resume user playback progress.</li>
                    </ul>
                  </div>

                  {/* Paradise Nursery */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                        Paradise Nursery: React E-Commerce App (TypeScript, React)
                      </h2>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                      <li>Built a React 19 e-commerce application (React Router, Vite) for browsing and purchasing products across categorized listings.</li>
                      <li>Implemented cart state management (add/remove items, quantity updates, real-time total cost calculation) using reusable components (ProductCard, CartItem, Header).</li>
                    </ul>
                    <div className="mt-2 flex items-center gap-4 text-xs">
                      <a
                        href="https://paradise-nursery-inky.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:underline dark:text-teal-300 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live demo: paradise-nursery-inky.vercel.app
                      </a>
                      <a
                        href="https://github.com/pshah-lab/paradise-nursery"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-600 hover:underline dark:text-stone-300 flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        Source: github.com/pshah-lab/paradise-nursery
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <Award className="h-4 w-4" />
                  <span>CERTIFICATIONS</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                  <li><span className="font-semibold text-stone-950 dark:text-white">Google Cloud Associate Cloud Engineer (ACE)</span></li>
                  <li><span className="font-semibold text-stone-950 dark:text-white">Claude Certified Architect - Foundations (CCA-F)</span>, Anthropic (In Progress)</li>
                </ul>
              </div>

              {/* Education Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <GraduationCap className="h-4 w-4" />
                  <span>EDUCATION</span>
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-stone-950 dark:text-white">
                      MIT Art, Design and Technology University
                    </h3>
                    <span className="text-xs text-stone-600 dark:text-stone-400">
                      Aug 2022 – Jun 2026
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-0.5">
                    B.Tech in Computer Science
                  </p>
                </div>
              </div>

              {/* Technical Skills Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <Code className="h-4 w-4" />
                  <span>TECHNICAL SKILLS</span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-stone-950 dark:text-white">Languages: </span>
                    Python, JavaScript (ES6+), TypeScript
                  </p>
                  <p className="text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-stone-950 dark:text-white">Frontend: </span>
                    React.js, React Router, HTML5, CSS3, Responsive Web Design
                  </p>
                  <p className="text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-stone-950 dark:text-white">Backend & Databases: </span>
                    Node.js, Express.js, FastAPI, REST APIs, MongoDB, PostgreSQL
                  </p>
                  <p className="text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-stone-950 dark:text-white">Cloud & DevOps: </span>
                    AWS (EC2, S3, CloudFront), Google Cloud, Docker, Git, GitHub Actions
                  </p>
                  <p className="text-stone-700 dark:text-stone-300">
                    <span className="font-semibold text-stone-950 dark:text-white">AI/ML: </span>
                    LLM Applications, RAG, Semantic Search, Vector Search, Prompt Engineering
                  </p>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 border-b border-stone-300/60 pb-2 dark:border-white/10">
                  <Award className="h-4 w-4" />
                  <span>ACHIEVEMENTS</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 list-disc list-inside">
                  <li>Second Runner-up at SHODH 1.0 Campus Problem Hackathon (2025) for an innovative full-stack solution.</li>
                  <li>Published research paper on BCI-based robotic limb control in IJIRT.</li>
                </ul>
              </div>
            </div>

          ) : (
            /* High-Res Original Document Viewer with Smart Dark Theme Filter */
            <div className="min-h-full w-full bg-stone-900/90 p-4 sm:p-8 flex justify-center items-start overflow-y-auto">
              <div
                className="relative max-w-2xl w-full bg-white shadow-2xl transition-all duration-300 rounded-sm overflow-hidden"
                style={{
                  filter: pdfDarkMode
                    ? "invert(0.92) hue-rotate(180deg) contrast(0.95)"
                    : "none",
                }}
              >
                <img
                  src="/resume-preview.png"
                  alt="Pratham Shah Official Resume Document"
                  className="w-full h-auto object-contain select-none"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

