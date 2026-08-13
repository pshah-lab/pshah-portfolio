import React from "react";

export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pshah.fun";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Pratham Shah",
    alternateName: ["Pratham Shah Developer", "pshah-lab"],
    jobTitle: "Full Stack Developer & Cloud Engineer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, Node.js, Cloud (GCP FinOps / AWS Serverless), and Brain-Computer Interface (BCI) EEG signal processing.",
    url: siteUrl,
    image: `${siteUrl}/logo.jpg`,
    email: "mailto:pshah88669@gmail.com",
    sameAs: [
      "https://github.com/pshah-lab",
      "https://linkedin.com/in/pratham-shah-729432258/",
      "https://x.com/pshah_lab",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Searce Inc.",
        role: "Cloud Security Reliability Engineer Intern",
      },
      {
        "@type": "Organization",
        name: "NeuraMach AI Studios",
        role: "Full-Stack Engineering Intern",
      },
    ],
    knowsAbout: [
      "Full Stack Web Development",
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Amazon Web Services (AWS)",
      "Google Cloud Platform (GCP)",
      "FinOps & Cloud Cost Optimization",
      "Brain-Computer Interfaces (BCI)",
      "EEG Signal Processing",
      "TensorFlow",
      "Python",
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: "Pratham Shah - Full Stack Developer Portfolio",
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    dateCreated: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Pratham Shah Portfolio",
    description: "Official Developer Portfolio of Pratham Shah.",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
    inLanguage: "en-US",
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "SoftwareApplication",
          name: "NeuroArm Signal Flow",
          description:
            "Interactive visualization of an EEG signal processing pipeline for prosthetic arm control.",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web Browser",
          url: "https://neuro-arm.vercel.app/",
          sameAs: "https://github.com/pshah-lab/NeuroArm",
          author: {
            "@id": `${siteUrl}/#person`,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "SoftwareApplication",
          name: "Animated Website Design",
          description:
            "A motion-led web experience built with React, Tailwind CSS, and GSAP.",
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          url: "https://animated-design-website.vercel.app/",
          sameAs: "https://github.com/pshah-lab/animated-design-website",
          author: {
            "@id": `${siteUrl}/#person`,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "SoftwareApplication",
          name: "Abhinandan Mountreea Showcase",
          description:
            "A responsive real estate showcase website for luxury residential and villa projects.",
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          url: "https://www.abhinandanmountreea.com/",
          author: {
            "@id": `${siteUrl}/#person`,
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
    </>
  );
}
