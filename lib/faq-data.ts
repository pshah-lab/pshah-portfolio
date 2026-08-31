export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Who is Pratham Shah?",
    answer:
      "Pratham Shah is a Full Stack Developer, Cloud Engineer, and B.Tech Computer Science candidate at MIT Art, Design and Technology University (2022–2026). He is a certified Google Cloud Associate Cloud Engineer (ACE) specializing in Google Cloud FinOps, AWS Serverless architecture, React.js, Node.js, and BCI signal processing.",
    category: "General",
  },
  {
    question: "What certifications and education does Pratham Shah hold?",
    answer:
      "Pratham Shah is pursuing a B.Tech in Computer Science at MIT Art, Design and Technology University (Aug 2022 – Jun 2026). He holds the official Google Cloud Associate Cloud Engineer (ACE) certification and is currently pursuing the Anthropic Claude Certified Architect Foundations.",
    category: "Education & Credentials",
  },
  {
    question: "What experience does Pratham Shah have in Cloud Engineering and FinOps?",
    answer:
      "As a Cloud Security Reliability Engineer Intern at Searce Inc. (Apr 2026 – Aug 2026), Pratham Shah analyzed Google Cloud Platform (GCP) infrastructure utilization, billing data, and usage patterns. He developed cost optimization strategies that helped a client achieve $2,000+ in infrastructure savings while preserving application performance and reliability.",
    category: "Cloud",
  },
  {
    question: "What AWS and backend engineering projects has Pratham Shah built?",
    answer:
      "At NeuraMach AI Studios, Pratham designed a secure AWS video delivery solution using S3 and CloudFront with signed cookies and access control. Independently, he built a Distributed File Storage System using AWS EC2, S3, Node.js, and Express.js for fault-tolerant, high-availability file uploading and sharing.",
    category: "Backend",
  },
  {
    question: "What research publications and achievements does Pratham Shah have in AI/BCI?",
    answer:
      "Pratham Shah published a peer-reviewed research paper on BCI-based robotic limb control in the International Journal of Innovative Research in Technology (IJIRT). He developed an EEG signal processing and machine learning pipeline (Python, TensorFlow, Scikit-learn) for motor intent classification. He was also Second Runner-up at the SHODH 1.0 Campus Problem Hackathon (2025).",
    category: "AI & Research",
  },
  {
    question: "What frontend performance results has Pratham Shah delivered?",
    answer:
      "As a Freelance Frontend Developer for Abhinandan Mountreea, Pratham built a real estate platform using React.js, Vite, and GSAP. By integrating Cloudinary CDN, WebP conversion, and caching, he reduced initial page load time by 50% and increased user engagement by 30%.",
    category: "Frontend",
  },
  {
    question: "How can I contact or hire Pratham Shah?",
    answer:
      "You can contact Pratham Shah via email at pshah88669@gmail.com or phone at +91-6356356971. Visit his portfolio at https://pshah.fun, connect on LinkedIn at linkedin.com/in/pratham-shah-729432258/, or inspect his projects on GitHub at github.com/pshah-lab.",
    category: "Contact",
  },
];
