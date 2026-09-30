import type { Achievement, CapabilityGroup, Certification, Faq, Testimonial, TimelineEvent } from "./types";

export const certifications: Certification[] = [
  { name: "Associate Cloud Engineer", issuer: "Google Cloud", status: "Certified" },
];

export const achievements: Achievement[] = [
  {
    title: "Second runner-up, SHODH 1.0 campus hackathon",
    context: "Full-stack solution to a campus problem statement.",
    year: "2025",
    category: "Hackathon",
    source: "Resume",
  },
  {
    title: "Chrome extension with 1,270+ weekly users",
    context: "Force Dark Mode, built and maintained solo.",
    year: "2026",
    category: "Product",
    source: "Chrome Web Store developer dashboard, Sep 2026",
  },
];

/**
 * Home-page evidence: things a reader can open and check in a minute. Each item links
 * to the proof. No figure appears here unless a public page shows it.
 */
export const evidence: { claim: string; detail: string; proof: string; href: string }[] = [
  {
    claim: "AWS infrastructure as code",
    detail: "Cognito with PKCE, CloudFront signed cookies, Lambda, API Gateway and Secrets Manager in one CDK stack, plus a FastAPI + DynamoDB service.",
    proof: "StreamVault repository",
    href: "/projects/streamvault",
  },
  {
    claim: "Retrieval over your own documents",
    detail: "PDF chunking, pgvector search with an HNSW index, and grounded LLM answers with rate limits and input checks.",
    proof: "InsightVault repository",
    href: "/projects/insightvault",
  },
  {
    claim: "1,270+ weekly users on a shipped product",
    detail: "A Manifest V3 extension with an offline PDF viewer, a privacy test suite and versioned releases.",
    proof: "Chrome Web Store developer dashboard",
    href: "/projects/force-dark-mode",
  },
  {
    claim: "Paid client work, live",
    detail: "A marketing site for a residential villa project, delivered end to end, with the client’s own review.",
    proof: "abhinandanmountreea.com",
    href: "/projects/abhinandan-mountreea",
  },
  {
    claim: "Two internships",
    detail: "Google Cloud billing and rightsizing analysis at Searce; Next.js and FastAPI product work with a QA focus at NeuraMach.",
    proof: "Experience",
    href: "/experience",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The website reflects exactly what we had envisioned - a platform that communicates our brand values, showcases our flagship project, and builds trust with potential customers. His attention to detail, technical expertise, and timely delivery have truly impressed us.",
    organization: "Abhinandan Group",
    relationship: "Freelance client, Abhinandan Mountreea website",
    date: "November 2025",
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    id: "cloud",
    name: "Cloud and infrastructure",
    statement: "Secure, cost-aware systems on AWS and Google Cloud.",
    abilities: [
      { name: "Google Cloud cost analysis: billing data, utilization, rightsizing", evidence: "Searce internship", href: "/experience#searce" },
      { name: "Edge-enforced access control with CloudFront signed cookies", evidence: "StreamVault", href: "/projects/streamvault" },
      { name: "Serverless pieces: Lambda, API Gateway, DynamoDB", evidence: "StreamVault", href: "/projects/streamvault" },
      { name: "Infrastructure as code with AWS CDK, Cognito and Secrets Manager", evidence: "StreamVault", href: "/projects/streamvault" },
    ],
    tools: ["Google Cloud", "AWS", "S3", "CloudFront", "Lambda", "API Gateway", "DynamoDB", "Cognito", "EC2", "AWS CDK", "Docker", "Vercel"],
  },
  {
    id: "product",
    name: "Backend and full-stack",
    statement: "Web products from data model to deployed interface.",
    abilities: [
      { name: "REST APIs in Node.js, Express and FastAPI", evidence: "StreamVault, Cloud Media Hub", href: "/projects/streamvault" },
      { name: "Next.js frontends on FastAPI backends (React Query, Axios)", evidence: "NeuraMach internship", href: "/experience#neuramach" },
      { name: "Next.js and React apps with server route handlers", evidence: "InsightVault, this site", href: "/projects/insightvault" },
      { name: "Postgres and MongoDB schemas", evidence: "InsightVault, Cloud Media Hub", href: "/projects/cloud-media-hub" },
      { name: "Client delivery, front-end performance", evidence: "Abhinandan Mountreea", href: "/projects/abhinandan-mountreea" },
    ],
    tools: ["TypeScript", "JavaScript", "Python", "Node.js", "Express", "FastAPI", "React", "Next.js", "PostgreSQL", "Supabase", "MongoDB", "Tailwind CSS"],
  },
  {
    id: "ai",
    name: "Applied AI and research",
    statement: "LLM features grounded in data, and ML on real signals.",
    abilities: [
      { name: "Embeddings, pgvector search and grounded LLM prompts", evidence: "InsightVault", href: "/projects/insightvault" },
      { name: "EEG classification with scikit-learn and TensorFlow", evidence: "NeuroArm (team research)", href: "/research" },
      { name: "AI-assisted engineering workflow", evidence: "Specs and plans in shipped repos", href: "/about#ai" },
    ],
    tools: ["OpenAI API", "Gemini API", "Groq", "pgvector", "scikit-learn", "TensorFlow", "pandas"],
  },
];

export const journey: TimelineEvent[] = [
  {
    year: "2022",
    title: "Started a B.Tech in Computer Science",
    body: "MIT-ADT University, Pune. Foundations in programming, data structures and web development.",
  },
  {
    year: "2023",
    title: "Started building in public",
    body: "Opened the GitHub account (February 2023) that now holds most of the work on this site.",
    href: "https://github.com/pshah-lab",
  },
  {
    year: "2024",
    title: "Research: brain signals to arm movement",
    body: "Joined the NeuroArm brain-computer interface team at IS360 Technologies and worked on EEG preprocessing and classification. Machine learning first had to work on noisy, real-world data here.",
    href: "/research",
  },
  {
    year: "2025",
    title: "From models to products and clients",
    body: "Helped build NeuroArm’s pipeline visualization, delivered a paid client website, placed second runner-up at the SHODH 1.0 hackathon, and started InsightVault, a RAG system built end to end.",
    href: "/projects/abhinandan-mountreea",
  },
  {
    year: "2026",
    title: "Production cloud work, and graduation",
    body: "Full-stack and QA work at NeuraMach, then Google Cloud cost optimization at Searce. Outside work: shipped Force Dark Mode to 1,270+ weekly users and built StreamVault on AWS. Completed the B.Tech in June.",
    href: "/experience",
  },
];

export const faqs: Faq[] = [
  {
    question: "Who is Pratham Shah?",
    answer:
      "Pratham Shah is a 2026 Computer Science graduate (B.Tech, MIT-ADT University, Pune) and a Google Cloud Associate Cloud Engineer. He works on cloud, backend and full-stack engineering.",
  },
  {
    question: "What cloud experience does Pratham have?",
    answer:
      "As an Associate Cloud Reliability Engineer intern at Searce (Apr–Aug 2026) he analyzed Google Cloud billing and utilization data and prepared rightsizing and cost-optimization recommendations. His StreamVault project defines Cognito, CloudFront, Lambda and API Gateway infrastructure in AWS CDK.",
  },
  {
    question: "What did Pratham do at NeuraMach AI Studios?",
    answer:
      "He was an AI/ML Full-Stack Engineering Intern with a QA focus (Jan–Apr 2026, Pune). He built Next.js and TypeScript interfaces using SSR and SSG, integrated FastAPI REST endpoints with React Query and Axios, and used AI coding tools such as GitHub Copilot and Cursor.",
  },
  {
    question: "What AI work has Pratham done?",
    answer:
      "He built InsightVault, a question-answering app over uploaded PDFs using Supabase Postgres with pgvector, multi-provider embeddings and grounded LLM prompts. Earlier he worked on EEG classification for the NeuroArm brain-computer interface team project.",
  },
  {
    question: "What roles is Pratham looking for?",
    answer: "Junior cloud, backend, FinOps and full-stack engineering roles.",
  },
  {
    question: "How can I contact Pratham?",
    answer:
      "Email pshah88669@gmail.com, or connect on LinkedIn (linkedin.com/in/pratham-shah-729432258) or GitHub (github.com/pshah-lab). A resume is at pshah.fun/resume.",
  },
];
