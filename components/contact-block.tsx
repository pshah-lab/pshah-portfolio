import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";

export function ContactBlock() {
  return (
    <section aria-labelledby="contact" className="border-t border-line bg-surface">
      <div className="shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 id="contact" className="scroll-mt-24 text-[2.25rem] leading-[1.05] sm:text-[3.25rem]">
            Hiring for cloud, backend or full-stack work? I’d like to hear about it.
          </h2>
          <p className="mt-5 max-w-prose text-muted">
            I’m looking for junior cloud, backend, FinOps and full-stack engineering roles in India. Email is the
            fastest way to reach me.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a href={profile.links.email} className="btn-primary h-14 justify-between px-5 text-base" data-track="contact_click" data-track-label="contact:email">
            {profile.email}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <div className="grid grid-cols-3 gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-track="contact_click"
              data-track-label="contact:linkedin"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-track="github_click"
              data-track-label="contact"
            >
              GitHub
            </a>
            <Link href="/resume" className="btn-secondary" data-track="resume_click" data-track-label="contact">
              Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
