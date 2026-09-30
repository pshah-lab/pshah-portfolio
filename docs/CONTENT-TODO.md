# Content that needs owner input

The resume (`content/resume.ts` → `/resume` and `public/Pratham_Resume.pdf`) and the site read
from the same files in `content/`, so a fix in one place fixes both. After editing, run
`pnpm resume` to regenerate the PDF.

## Verify before sending the resume

| # | Item | Why |
|---|------|-----|
| 1 | **Searce** | ✅ Title and dates verified against the internship completion certificate: "Associate Cloud Reliability Engineer", Searce India Private Limited, 15 Apr – 26 Aug 2026. The certificate lists no duties, so the bullets are self-reported. Get your manager to confirm them in a LinkedIn recommendation or as a reference |
| 2 | **Searce location** (Pune) | ✅ Confirmed by owner (30 Sep 2026); not printed on the certificate |
| 3 | **NeuraMach** | ✅ Verified against the experience letter dated 10 Apr 2026: title "AI/ML Full-Stack Engineering Intern (with a QA focus)", 12 Jan – 11 Apr 2026, Pune office, Next.js/TypeScript SSR/SSG, FastAPI + React Query/Axios, Copilot/Cursor |
| 4 | **Google Cloud ACE credential** | ✅ Credly https://www.credly.com/badges/e295f3cf-c88c-4991-a4eb-d68a6c608a88 (public), issued 26 Jul 2026, expires 26 Jul 2029. Certificate image at `public/certificates/`. Renew before it expires |
| 4b | **CGPA** | Owner decided not to include it (30 Sep 2026) |
| 4c | **SDE coursework line** (DSA, OOP, DBMS, OS, Computer Networks) | Standard B.Tech CS subjects; confirm they match your transcript |
| 5 | **Degree completion.** "Completed 2026" | ✅ Provisional certificate issued (owner, 30 Sep 2026) |
| 6 | **SHODH 1.0 hackathon** | Removed from the site and resumes at the owner's request (30 Sep 2026) |
| 7 | **Live URLs**: abhinandanmountreea.com (200 OK on 2026-09-28), both GitHub repos (public) | Re-check before each application |
| 7b | **Domain cost** for pshah.fun | ✅ Namecheap, $9.34 for 18 Dec 2024 to 19 Dec 2026 (owner-provided). **Renew before 19 Dec 2026**, then update `content/stats.ts` with the renewal price and term |
| 7c | **Force Dark Mode: 1,270+ weekly users** | From the Chrome Web Store developer dashboard on 30 Sep 2026 (owner-provided). Used on the site and both resumes; refresh it when the number moves |
| 8 | **Phone number.** It's not in the public PDF | Run `RESUME_PHONE="+91-…" pnpm resume` for a private copy that includes it (`docs/resume/private/`, gitignored) |

## Claims removed (restore only with a document you can show)

| Claim | Where it was | Evidence that would justify restoring it |
|---|---|---|
| $2,000+ client savings | Searce | A manager's email or report with the figure |
| AWS video delivery (S3, CloudFront signed cookies), AppSync → API Gateway/Lambda/DynamoDB/SES, IP/email rate limiting | NeuraMach | Not in the experience letter. Add back only with a reference who can confirm it; the same skills are shown by StreamVault |
| 80+ production defects, 20+ backend errors, 6 vulnerabilities | NeuraMach | Ticket export or manager confirmation |
| 15+ issues, 40% fewer deployment failures | Old site, NeuraMach | Same |
| 50% faster initial load, 30% more engagement | Abhinandan Mountreea | Before/after Lighthouse or analytics screenshots |
| EC2 Spot, 90% lower processing cost | StreamVault | The public script runs on-demand `c7i.2xlarge`; commit the Spot version |
| "30% backend performance improvement" | Brief | No source found |
| IJIRT publication | Achievements, research page | Title, authors, DOI. Rephrase honestly (e.g. co-authored literature review) if you add it back |
| Claude Certified Architect (in progress) | Certifications | Add once passed, with a credential link |

## Still missing

- Name and role of the person who wrote the Abhinandan Group testimonial, and permission to name them.
- A real screenshot of Cloud Media Hub. The old image was a generated mock-up and was deleted.
- A StreamVault screenshot without commercial film posters.
- A public demo for InsightVault. Resume projects link only to GitHub today.
- Paradise Nursery was removed from the site because it matches a well-known online-course brief. If it was original work, it can go back in the archive.
- LinkedIn could not be checked automatically (it blocks bots). Make its titles and dates match the resume.
