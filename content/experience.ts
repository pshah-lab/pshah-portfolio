import type { Experience } from "./types";

/**
 * Roles as they appear on the resume (content/resume.ts renders these same bullets).
 * Claims are deliberately conservative: numbers that can't be backed by a document the
 * owner can show (client savings, bug counts, load-time percentages) are left out.
 * See docs/CONTENT-TODO.md for what can be restored with evidence.
 */
export const experience: Experience[] = [
  {
    // Title and dates: Searce internship completion certificate (15 Apr – 26 Aug 2026).
    // The certificate lists no duties; the bullets below are self-reported, kept conservative.
    slug: "searce",
    role: "Associate Cloud Reliability Engineer (Intern)",
    company: "Searce Inc.",
    type: "Internship",
    location: "Pune, India",
    start: "2026-04",
    end: "2026-08",
    period: "Apr 2026 – Aug 2026",
    summary:
      "FinOps work on Google Cloud: reading billing and utilization data to find waste, and recommending changes that cut cost without hurting performance.",
    highlights: [
      "Analyzed Google Cloud billing data and resource utilization for client workloads to find idle and oversized resources.",
      "Prepared rightsizing and cost-optimization recommendations, weighing savings against performance and reliability.",
      "Tracked usage trends and cost allocation across GCP projects to support cost governance.",
    ],
    stack: ["Google Cloud", "Cloud Billing", "FinOps", "Rightsizing", "Cost allocation"],
    onResume: true,
  },
  {
    // Source: NeuraMach internship experience letter, dated 10 April 2026.
    slug: "neuramach",
    role: "AI/ML Full-Stack Engineering Intern (QA focus)",
    company: "NeuraMach AI Studios",
    type: "Internship",
    location: "Pune, India",
    start: "2026-01",
    end: "2026-04",
    period: "Jan 2026 – Apr 2026",
    summary:
      "Full-stack work with a QA focus on the core engineering team of an early-stage AI studio: Next.js and TypeScript frontends wired to FastAPI services.",
    highlights: [
      "Built responsive UIs in Next.js and TypeScript, using server-side rendering and static generation to improve load times and SEO.",
      "Integrated FastAPI REST endpoints into the frontend and managed asynchronous data with React Query and Axios.",
      "Used AI coding tools (GitHub Copilot, Cursor) to speed up development and tighten code reliability, alongside QA work on the product.",
    ],
    stack: ["Next.js", "TypeScript", "React", "React Query", "Axios", "FastAPI", "GitHub Copilot", "Cursor"],
    onResume: true,
  },
  {
    slug: "abhinandan-mountreea",
    role: "Frontend Developer (freelance)",
    company: "Abhinandan Mountreea",
    type: "Freelance",
    location: "Remote",
    start: "2025-07",
    end: "2025-11",
    period: "Jul 2025 – Nov 2025",
    summary:
      "Sole developer on the marketing site for a residential villa project, from client requirements through deployment.",
    highlights: [
      "Built the marketing site for a residential villa project in React, Vite and GSAP, from client requirements to deployment.",
      "Served imagery through Cloudinary with WebP conversion, caching and lazy loading to cut page weight on mobile.",
    ],
    stack: ["React", "Vite", "GSAP", "Cloudinary", "WebP"],
    relatedProjects: ["abhinandan-mountreea"],
    onResume: true,
  },
  {
    slug: "is360",
    role: "Research Developer, BCI NeuroArm",
    company: "IS360 Technologies",
    type: "Research",
    location: "Pune, India",
    start: "2024-07",
    end: "2025-05",
    period: "Jul 2024 – May 2025",
    summary:
      "Worked on the signal-classification side of NeuroArm, a team brain-computer interface project for controlling a prosthetic arm from EEG.",
    highlights: [
      "Worked on an EEG pipeline to preprocess and classify brain signals for arm-movement intent.",
      "Trained and compared classifiers (scikit-learn Random Forest, TensorFlow MLP).",
      "Helped build a web visualization that walks through the pipeline from EEG to arm command.",
    ],
    stack: ["Python", "scikit-learn", "TensorFlow", "EEG"],
    relatedProjects: ["neuroarm"],
    onResume: false,
  },
];
