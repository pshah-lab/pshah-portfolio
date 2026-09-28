import type { Metadata } from "next";
import { profile, site } from "@/content/profile";
import { certifications, capabilities } from "@/content/credentials";
import type { Note, Project } from "@/content/types";

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
};

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, type = "website", publishedTime }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: site.locale,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, creator: "@pshah_lab" },
  };
}

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: profile.shortRole,
    description: profile.tagline,
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    hasCredential: certifications
      .filter((c) => c.status === "Certified")
      .map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name,
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: c.issuer },
      })),
    knowsAbout: capabilities.flatMap((c) => c.tools),
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.x],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    dateModified: site.updated,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A project with public source is SoftwareSourceCode; client work is a CreativeWork. */
export function projectSchema(project: Project) {
  const base = {
    "@context": "https://schema.org",
    name: project.name,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    author: { "@id": personId },
    keywords: project.stack.join(", "),
    ...(project.image ? { image: absoluteUrl(project.image.src) } : {}),
  };
  if (project.links.repo) {
    return {
      ...base,
      "@type": "SoftwareSourceCode",
      codeRepository: project.links.repo,
      ...(project.links.live ? { sameAs: project.links.live } : {}),
    };
  }
  return { ...base, "@type": "CreativeWork", ...(project.links.live ? { sameAs: project.links.live } : {}) };
}

export function articleSchema(note: Note) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    dateModified: note.date,
    url: absoluteUrl(`/notes/${note.slug}`),
    author: { "@id": personId, name: profile.name },
    keywords: note.tags.join(", "),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
