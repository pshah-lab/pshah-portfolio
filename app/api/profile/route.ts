import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pshah.fun";

  const profileData = {
    entity: "Pratham Shah",
    title: "Full Stack Developer & Cloud Engineer",
    location: "Pune, India",
    email: "pshah88669@gmail.com",
    website: siteUrl,
    resume: `${siteUrl}/Pratham_Resume.pdf`,
    llmContext: `${siteUrl}/llms.txt`,
    socials: {
      github: "https://github.com/pshah-lab",
      linkedin: "https://linkedin.com/in/pratham-shah-729432258/",
      twitter: "https://x.com/pshah_lab",
    },
    currentRole: {
      title: "Cloud Security Reliability Engineer Intern",
      company: "Searce Inc.",
      location: "Pune, India",
      period: "Apr 2026 – Present",
      focus: ["GCP Cost Optimization", "FinOps Analytics", "Cloud Infrastructure Reliability"],
    },
    experience: [
      {
        title: "Full-Stack Engineering Intern",
        company: "NeuraMach AI Studios",
        period: "Jan 2026 – Apr 2026",
        stack: ["Node.js", "AWS API Gateway", "Lambda", "DynamoDB", "SES", "S3", "CloudFront", "Next.js"],
        outcomes: [
          "Re-architected backend from AppSync to serverless REST stack",
          "Built abuse-resistant submission pipeline with rate limiting",
          "Architected secure HLS delivery with CloudFront signed cookies",
          "Reduced deployment failures by 40%",
        ],
      },
      {
        title: "Freelance Developer",
        company: "Abhinandan Mountreea Showcase",
        period: "Nov 2025",
        stack: ["React", "Next.js", "GSAP", "Tailwind CSS"],
        outcomes: ["Built real estate portfolio website for luxury residential projects"],
      },
      {
        title: "Research Developer (BCI NeuroArm)",
        company: "IS360 Technologies",
        period: "Jul 2024 – Dec 2024",
        stack: ["Python", "TensorFlow", "Scikit-learn", "EEG Signal Processing"],
        outcomes: [
          "Engineered EEG signal processing pipeline for prosthetic arm movement intent classification",
        ],
      },
    ],
    skills: {
      frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "GSAP", "Three.js", "D3.js"],
      backendAndCloud: ["Node.js", "Express", "AWS Lambda", "API Gateway", "DynamoDB", "GCP FinOps", "S3", "CloudFront"],
      aiAndSignalProcessing: ["Python", "TensorFlow", "Scikit-learn", "EEG Signal Classification"],
    },
    projects: [
      {
        name: "NeuroArm Signal Flow",
        description: "Interactive visualization of EEG signal pipeline for prosthetic arm control.",
        url: "https://neuro-arm.vercel.app/",
        github: "https://github.com/pshah-lab/NeuroArm",
        tech: ["React", "TypeScript", "Tailwind CSS", "D3.js"],
      },
      {
        name: "Animated Website Design",
        description: "Motion-led web experience built with React, Tailwind, and GSAP.",
        url: "https://animated-design-website.vercel.app/",
        github: "https://github.com/pshah-lab/animated-design-website",
        tech: ["React", "Tailwind CSS", "GSAP"],
      },
      {
        name: "Abhinandan Mountreea",
        description: "Responsive real estate showcase for luxury villas.",
        url: "https://www.abhinandanmountreea.com/",
        tech: ["React", "TypeScript", "GSAP"],
      },
    ],
  };

  return NextResponse.json(profileData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "X-LLM-Context": `${siteUrl}/llms.txt`,
    },
  });
}
