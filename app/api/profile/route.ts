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
      frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "GSAP", "Three.js", "D3.js", "Chrome Extensions MV3"],
      backendAndCloud: ["Node.js", "Express", "AWS S3", "AWS CloudFront", "AWS Lambda", "Cognito", "DynamoDB", "FFmpeg", "MongoDB", "GCP FinOps", "Supabase pgvector"],
      aiAndSignalProcessing: ["Python", "RAG & Vector Embeddings", "TensorFlow", "Scikit-learn", "EEG Signal Classification"],
    },
    projects: [
      {
        name: "StreamVault (HLS Video Platform)",
        description: "Enterprise video streaming pipeline with CloudFront Signed Cookies, AWS Cognito auth, and automated EC2 FFmpeg chunking.",
        github: "https://github.com/pshah-lab/StreamVault",
        tech: ["AWS CloudFront", "AWS S3", "AWS Lambda", "Cognito", "FFmpeg", "HLS.js", "TypeScript"],
      },
      {
        name: "InsightVault (AI Document Intelligence)",
        description: "AI-powered document intelligence and semantic search platform with multi-tier vector embeddings and Supabase pgvector.",
        github: "https://github.com/pshah-lab/insightVault",
        tech: ["Next.js", "React 19", "Supabase pgvector", "Gemini / OpenAI", "Tailwind CSS v4"],
      },
      {
        name: "NeuroArm Signal Flow",
        description: "Interactive visualization of EEG signal pipeline for prosthetic arm control.",
        url: "https://neuro-arm.vercel.app/",
        github: "https://github.com/pshah-lab/NeuroArm",
        tech: ["React", "TypeScript", "Tailwind CSS", "D3.js"],
      },
      {
        name: "Cloud Media Hub (AWS S3 + MongoDB)",
        description: "High-performance distributed media storage engine with zero-buffer S3 streaming and MongoDB metadata cataloging.",
        github: "https://github.com/pshah-lab/aws-s3-mongodb-media-hub",
        tech: ["AWS S3", "Node.js", "Express.js", "MongoDB", "Multer-S3", "REST APIs"],
      },
      {
        name: "Force Dark Mode (Chrome Extension MV3)",
        description: "Intelligent Manifest V3 Chrome extension with 1,000+ active users and a 5.0 rating on the Chrome Web Store, applying dynamic dark themes across websites, PDFs, and local docs.",
        url: "https://chromewebstore.google.com/detail/kmhhphbakbhohiohagkhhgdgfbplkfke",
        github: "https://github.com/pshah-lab/force-dark-mode-extension",
        tech: ["JavaScript", "Chrome Extensions API (MV3)", "CSS3", "PDF.js", "Storage Sync"],
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
