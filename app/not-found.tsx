import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24 sm:py-32">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-[2.75rem] leading-tight">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-prose text-muted">The link may be out of date. These are the places most people are looking for:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className="btn-primary">
          Projects
        </Link>
        <Link href="/experience" className="btn-secondary">
          Experience
        </Link>
        <Link href="/resume" className="btn-secondary">
          Resume
        </Link>
      </div>
    </div>
  );
}
