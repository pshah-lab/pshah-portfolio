import { profile, site } from "./profile";
import { experience } from "./experience";
import { projects } from "./projects";
import { achievements, certifications } from "./credentials";

/**
 * Two one-page fresher resumes built from the same verified content as the site:
 *   sde   → software development engineer roles
 *   cloud → cloud / DevOps / FinOps roles
 *
 * Experience bullets are identical in both (they come from experience.ts, which is
 * checked against the NeuraMach experience letter and the Searce completion certificate).
 * The variants differ only in skills emphasis, project order and the SDE coursework line.
 * Layout follows the owner's reference resume: Experience, Projects, Certifications,
 * Education, Technical Skills, Achievements, with no summary on the PDF. The `summary`
 * field is used only as the intro on the /resume web page.
 *
 * Rules: one page, max three bullets per role, no unsupported metrics, plain ASCII
 * punctuation in the PDF (no em or en dashes) for ATS parsing.
 */

export type ResumeVariant = "sde" | "cloud";
export type ResumeSection = "education" | "certifications" | "skills" | "experience" | "projects" | "achievements";

const resumeProject = (slug: string, maxBullets = 3) => {
  const p = projects.find((x) => x.slug === slug)!;
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.resume!.tagline,
    repo: p.links.repo!,
    bullets: p.resume!.bullets.slice(0, maxBullets),
  };
};

const extension = {
  text: "Published Force Dark Mode, a Manifest V3 Chrome extension with 1,270+ weekly users on the Chrome Web Store",
  year: "2026",
};

const hackathon = achievements.filter((a) => a.category === "Hackathon").map((a) => ({ text: a.title, year: a.year }));

const base = {
  name: profile.name,
  location: profile.location,
  email: profile.email,
  website: site.url.replace(/^https?:\/\//, ""),
  linkedin: "linkedin.com/in/pratham-shah-729432258",
  github: "github.com/pshah-lab",
  experience: experience
    .filter((e) => e.onResume)
    .map((e) => ({ role: e.role, company: e.company, location: e.location, period: e.period, bullets: e.highlights.slice(0, 3) })),
  certifications: certifications.filter((c) => c.status === "Certified"),
};

export const resumes = {
  sde: {
    ...base,
    variant: "sde" as const,
    label: "Software Development Engineer",
    file: "Pratham_Shah_Resume_SDE",
    summary:
      "Software engineer and 2026 B.Tech Computer Science graduate from MIT-ADT University, Pune. Built Next.js, TypeScript and FastAPI features as a full-stack intern at NeuraMach AI Studios, and ships personal projects end to end, including a Chrome extension with 1,270+ weekly users and a serverless video platform on AWS.",
    order: ["experience", "projects", "certifications", "education", "skills", "achievements"] as ResumeSection[],
    education: {
      ...profile.education,
      detail:
        "Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks",
    },
    skills: [
      { label: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL"] },
      { label: "Frontend", items: ["React", "Next.js (SSR/SSG)", "React Query", "Axios", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs"] },
      { label: "Databases", items: ["PostgreSQL", "MongoDB", "DynamoDB", "Supabase (pgvector)"] },
      { label: "Cloud", items: ["AWS (S3, CloudFront, Lambda, API Gateway, Cognito, EC2)", "Google Cloud", "Docker", "AWS CDK"] },
      { label: "Tools", items: ["Git", "GitHub", "pnpm", "Vercel", "GitHub Copilot", "Cursor"] },
    ],
    projects: [resumeProject("insightvault", 2), resumeProject("streamvault", 3)],
    achievements: [extension, ...hackathon],
  },
  cloud: {
    ...base,
    variant: "cloud" as const,
    label: "Cloud Engineer",
    file: "Pratham_Shah_Resume_Cloud",
    summary:
      "2026 B.Tech Computer Science graduate, Pune, and Google Cloud Associate Cloud Engineer. Worked on Google Cloud cost optimization as an Associate Cloud Reliability Engineer intern at Searce, and builds AWS infrastructure as code with CDK, Cognito, CloudFront, Lambda and DynamoDB.",
    order: ["experience", "projects", "certifications", "education", "skills", "achievements"] as ResumeSection[],
    education: { ...profile.education, detail: undefined as string | undefined },
    skills: [
      { label: "Cloud", items: ["Google Cloud (billing analysis, rightsizing, cost allocation)", "AWS (S3, CloudFront, Lambda, API Gateway, DynamoDB, Cognito, EC2, SES, Secrets Manager)"] },
      { label: "Infrastructure", items: ["AWS CDK", "Docker", "Git", "GitHub"] },
      { label: "Backend", items: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
      { label: "Frontend", items: ["TypeScript", "React", "Next.js"] },
      { label: "Tools", items: ["pnpm", "Vercel", "Supabase", "GitHub Copilot", "Cursor"] },
    ],
    projects: [resumeProject("streamvault", 3), resumeProject("insightvault", 2)],
    achievements: [extension, ...hackathon],
  },
};

export type Resume = (typeof resumes)[ResumeVariant];

/** The /resume page shows the SDE version, which includes all three projects. */
export const resume: Resume = resumes.sde;
