export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Who is Pratham Shah?",
    answer:
      "Pratham Shah is a Full Stack Developer and Cloud Engineer based in Pune, India. He currently works as a Cloud Security Reliability Engineer Intern at Searce Inc., specializing in Google Cloud Platform (GCP) cost optimization, serverless architectures (AWS & GCP), React, Next.js, Node.js, and Brain-Computer Interface (BCI) EEG signal processing.",
    category: "General",
  },
  {
    question: "What experience does Pratham Shah have in Cloud Engineering and FinOps?",
    answer:
      "At Searce Inc., Pratham Shah analyzes Google Cloud Platform (GCP) infrastructure utilization, conducts FinOps cost analytics, performs resource rightsizing, and monitors billing data to optimize cloud spend while ensuring high application availability and operational reliability.",
    category: "Cloud",
  },
  {
    question: "What serverless backend architecture experience does Pratham Shah have?",
    answer:
      "At NeuraMach AI Studios, Pratham Shah re-architected backend infrastructure from AppSync to an AWS serverless REST stack using API Gateway, Node.js Lambda handlers, DynamoDB, SES, S3, and CloudFront with signed cookies. He implemented rate limiting, input validation, and secure HLS video delivery, reducing deployment failures by 40%.",
    category: "Backend",
  },
  {
    question: "What is the BCI NeuroArm project?",
    answer:
      "At IS360 Technologies, Pratham Shah developed an EEG signal classification pipeline for the BCI NeuroArm project. Using Python, TensorFlow, and Scikit-learn, he built machine learning models to classify motor intent (left vs. right arm movement) and created real-time signal visualizations for prosthetic control.",
    category: "AI & Research",
  },
  {
    question: "What frontend technologies does Pratham Shah specialize in?",
    answer:
      "Pratham Shah specializes in modern React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, GSAP (GreenSock Animation Platform), Three.js / React Three Fiber, D3.js, and Recharts, building responsive, high-performance web applications with 95+ PageSpeed scores.",
    category: "Frontend",
  },
  {
    question: "How can I contact or hire Pratham Shah?",
    answer:
      "You can contact Pratham Shah directly via email at pshah88669@gmail.com, view his portfolio at https://pshah.fun, connect on LinkedIn at linkedin.com/in/pratham-shah-729432258/, or check his open-source work on GitHub at github.com/pshah-lab.",
    category: "Contact",
  },
];
