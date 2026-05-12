"use client";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300/70 py-8 dark:border-white/10">
      <div className="section-shell flex flex-col gap-3 text-sm text-stone-500 dark:text-stone-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pratham Shah</p>
        <p>Full-stack development, interfaces, and applied AI systems.</p>
      </div>
    </footer>
  );
}
