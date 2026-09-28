/**
 * Builds the SDE and Cloud resumes from content/resume.ts, so they never drift from the site.
 *
 *   pnpm resume                        → public/Pratham_Shah_Resume_SDE.pdf, public/Pratham_Shah_Resume_Cloud.pdf
 *                                        (public/Pratham_Resume.pdf = SDE copy, kept for old links)
 *                                        docs/resume/<name>.md for each
 *   RESUME_PHONE="+91-…" pnpm resume   → also docs/resume/private/<name>.pdf with the phone number
 *                                        (gitignored; use these when applying)
 *
 * ATS rules enforced here: single column, standard section headings, real selectable text,
 * no tables, icons, images, headers or footers, and plain ASCII punctuation (the build fails if
 * an em or en dash survives). Each PDF must be exactly one page.
 *
 * Needs Google Chrome (set CHROME_PATH if it isn't in the default macOS location).
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resumes, type Resume, type ResumeSection } from "../content/resume";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const phone = process.env.RESUME_PHONE?.trim();

/** Plain ASCII punctuation: ATS parsers and recruiters' copy-paste both handle it reliably. */
const ascii = (s: string) =>
  s
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/ /g, " ");

const esc = (s: string) => ascii(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const link = (href: string, text = href) =>
  `<a href="${esc(href.startsWith("http") || href.startsWith("mailto:") ? href : `https://${href}`)}">${esc(text)}</a>`;

const HEADINGS: Record<ResumeSection, string> = {
  education: "Education",
  certifications: "Certifications",
  skills: "Technical Skills",
  experience: "Experience",
  projects: "Projects",
  achievements: "Achievements",
};

function htmlSection(r: Resume, section: ResumeSection): string {
  const li = (items: string[]) => `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
  const h = `<h2>${HEADINGS[section]}</h2>`;
  switch (section) {
    case "experience":
      return `${h}${r.experience
        .map(
          (e) =>
            `<div class="row"><span><b>${esc(e.role)}</b> | <i>${esc(e.company)}, ${esc(e.location)}</i></span><span class="date">${esc(e.period)}</span></div>${li(e.bullets)}`,
        )
        .join("")}`;
    case "projects":
      return `${h}${r.projects
        .map(
          (p) =>
            `<div class="row"><span><b>${esc(p.name)}</b> | <i>${esc(p.tagline)}</i></span><span class="date">${link(p.repo.replace("https://", ""))}</span></div>${li(p.bullets)}`,
        )
        .join("")}`;
    case "certifications":
      return `${h}${li(r.certifications.map((c) => `${c.issuer} ${c.name}`))}`;
    case "education":
      return `${h}<div class="row"><span><b>${esc(r.education.school)}</b>, ${esc(r.education.location)}</span><span class="date">${esc(r.education.period)}</span></div><div><i>${esc(r.education.degree)}</i></div>${
        r.education.detail ? `<div class="detail">${esc(r.education.detail)}</div>` : ""
      }`;
    case "skills":
      return `${h}<div class="skills">${r.skills.map((g) => `<div><b>${esc(g.label)}:</b> ${esc(g.items.join(", "))}</div>`).join("")}</div>`;
    case "achievements":
      return `${h}${li(r.achievements.map((a) => `${a.text}${a.year ? ` (${a.year})` : ""}`))}`;
  }
}

function html(r: Resume, withPhone: boolean) {
  const contact = [
    link(`mailto:${r.email}`, r.email),
    ...(withPhone && phone ? [esc(phone)] : []),
    esc(r.location),
    link(r.website),
    link(r.linkedin),
    link(r.github),
  ].join(" | ");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(r.name)} - ${esc(r.label)} Resume</title>
<style>
  @page { size: A4; margin: 9mm 12mm; }
  body { font-family: "Open Sans", Arial, Helvetica, sans-serif; font-size: 9.6pt; line-height: 1.3; color: #111; margin: 0; }
  header { text-align: center; padding-bottom: 7px; border-bottom: 1px solid #9aa0a6; }
  h1 { font-size: 19pt; margin: 0; color: #1f3864; letter-spacing: 0.5px; }
  .contact { margin-top: 3px; font-size: 9pt; white-space: nowrap; }
  .contact a { color: #1155cc; text-decoration: underline; }
  h2 { font-size: 10.2pt; text-transform: uppercase; color: #1f3864; border-bottom: 1.2px solid #1f3864; padding-bottom: 1px; margin: 9px 0 4px; letter-spacing: 0.3px; }
  .row { display: flex; justify-content: space-between; gap: 12px; margin-top: 6px; }
  .row .date { white-space: nowrap; color: #555; }
  .row .date a { color: #555; text-decoration: none; }
  .detail { margin-top: 2px; }
  ul { margin: 2px 0 0; padding-left: 20px; list-style: disc; }
  li { margin: 1px 0; padding-left: 2px; }
  a { color: #111; text-decoration: none; }
  .skills div { margin: 1.5px 0; }
</style></head><body>
<header>
<h1>${esc(r.name.toUpperCase())}</h1>
<div class="contact">${contact}</div>
</header>
${r.order.map((s) => htmlSection(r, s)).join("\n")}
</body></html>`;
}

function markdown(r: Resume, withPhone: boolean) {
  const out: string[] = [
    `# ${r.name}`,
    "",
    [r.email, ...(withPhone && phone ? [phone] : []), r.location, r.website, r.linkedin, r.github].join(" | "),
    "",
  ];
  for (const section of r.order) {
    out.push(`## ${HEADINGS[section]}`, "");
    if (section === "education") {
      out.push(`**${r.education.school}**, ${r.education.location} | ${r.education.period}`, "", `*${r.education.degree}*`);
      if (r.education.detail) out.push("", r.education.detail);
    } else if (section === "certifications") {
      out.push(...r.certifications.map((c) => `- ${c.issuer} ${c.name}`));
    } else if (section === "skills") {
      out.push(...r.skills.map((g) => `- **${g.label}:** ${g.items.join(", ")}`));
    } else if (section === "experience") {
      for (const e of r.experience) out.push(`**${e.role}** | *${e.company}, ${e.location}* | ${e.period}`, "", ...e.bullets.map((b) => `- ${b}`), "");
    } else if (section === "projects") {
      for (const p of r.projects) out.push(`**${p.name}** | *${p.tagline}* | ${p.repo.replace("https://", "")}`, "", ...p.bullets.map((b) => `- ${b}`), "");
    } else if (section === "achievements") {
      out.push(...r.achievements.map((a) => `- ${a.text}${a.year ? ` (${a.year})` : ""}`));
    }
    out.push("");
  }
  return ascii(out.join("\n").replace(/\n{3,}/g, "\n\n"));
}

function assertAscii(label: string, text: string) {
  const bad = text.match(/[–—]/g);
  if (bad) throw new Error(`${label} still contains ${bad.length} em/en dash(es)`);
}

function printPdf(htmlPath: string, pdfPath: string) {
  if (!existsSync(chrome)) throw new Error(`Chrome not found at ${chrome}. Set CHROME_PATH.`);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`], {
    stdio: "ignore",
  });
  const pages = (readFileSync(pdfPath, "latin1").match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
  console.log(`${pdfPath.replace(root + "/", "")}: ${pages} page${pages === 1 ? "" : "s"}`);
  if (pages !== 1) throw new Error(`${pdfPath} is ${pages} pages; trim content in content/ to fit one page.`);
}

const docs = join(root, "docs/resume");
const privateDir = join(docs, "private");
mkdirSync(docs, { recursive: true });

for (const r of Object.values(resumes)) {
  const md = markdown(r, false);
  const page = html(r, false);
  assertAscii(`${r.file}.md`, md);
  assertAscii(`${r.file}.html`, page);

  writeFileSync(join(docs, `${r.file}.md`), md);
  console.log(`docs/resume/${r.file}.md`);
  const htmlPath = join(docs, `${r.file}.html`);
  writeFileSync(htmlPath, page);
  printPdf(htmlPath, join(root, "public", `${r.file}.pdf`));

  if (phone) {
    mkdirSync(privateDir, { recursive: true });
    const privateHtml = join(privateDir, `${r.file}.html`);
    writeFileSync(privateHtml, html(r, true));
    writeFileSync(join(privateDir, `${r.file}.md`), markdown(r, true));
    printPdf(privateHtml, join(privateDir, `${r.file}.pdf`));
  }
}

// Old links (and the site's default download) point here.
copyFileSync(join(root, "public", `${resumes.sde.file}.pdf`), join(root, "public/Pratham_Resume.pdf"));
