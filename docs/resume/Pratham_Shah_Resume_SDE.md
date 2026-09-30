# Pratham Shah

pshah88669@gmail.com | Pune, India | pshah.fun | linkedin.com/in/pratham-shah-729432258 | github.com/pshah-lab

## Experience

**Associate Cloud Reliability Engineer (Intern)** | *Searce Inc., Pune, India* | Apr 2026 - Aug 2026

- Analyzed Google Cloud billing data and resource utilization for client workloads to find idle and oversized resources.
- Prepared rightsizing and cost-optimization recommendations, weighing savings against performance and reliability.
- Tracked usage trends and cost allocation across GCP projects to support cost governance.

**AI/ML Full-Stack Engineering Intern (QA focus)** | *NeuraMach AI Studios, Pune, India* | Jan 2026 - Apr 2026

- Built responsive UIs in Next.js and TypeScript, using server-side rendering and static generation to improve load times and SEO.
- Integrated FastAPI REST endpoints into the frontend and managed asynchronous data with React Query and Axios.
- Used AI coding tools (GitHub Copilot, Cursor) to speed up development and tighten code reliability, alongside QA work on the product.

**Frontend Developer (freelance)** | *Abhinandan Mountreea, Remote* | Jul 2025 - Nov 2025

- Built the marketing site for a residential villa project in React, Vite and GSAP, from client requirements to deployment.
- Served imagery through Cloudinary with WebP conversion, caching and lazy loading to cut page weight on mobile.

## Projects

**InsightVault** | *Question answering over uploaded PDFs* | github.com/pshah-lab/insightVault

- Built a Next.js app that chunks PDF text, stores embeddings in Supabase Postgres (pgvector, HNSW index) and answers questions from the top-matching passages through an LLM API.
- Added per-IP rate limits, input length caps, PDF magic-byte checks and an embedding-provider fallback (Hugging Face, then Gemini, then OpenAI).

**StreamVault** | *Invite-only video streaming on AWS* | github.com/pshah-lab/StreamVault

- Defined Cognito (hosted UI with PKCE), CloudFront signed cookies, a private S3 origin, Lambda, API Gateway and Secrets Manager in one AWS CDK stack.
- Wrote the sign-in Lambda in TypeScript (HMAC-signed PKCE state, ID-token verification) with unit tests, and a FastAPI + DynamoDB service that saves watch progress behind Cognito JWT checks.
- Scripted an FFmpeg pipeline that encodes uploads to HLS on an EC2 worker and syncs the output to S3.

## Certifications

- Google Cloud Associate Cloud Engineer | Jul 2026 | [Verify on Credly](https://www.credly.com/badges/e295f3cf-c88c-4991-a4eb-d68a6c608a88)

## Education

**MIT-ADT University**, Pune, India | 2022 - 2026

*B.Tech in Computer Science*

Coursework: Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks

## Technical Skills

- **Languages:** JavaScript, TypeScript, Python, SQL
- **Frontend:** React, Next.js (SSR/SSG), React Query, Axios, Tailwind CSS
- **Backend:** Node.js, Express, FastAPI, REST APIs
- **Databases:** PostgreSQL, MongoDB, DynamoDB, Supabase (pgvector)
- **Cloud:** AWS (S3, CloudFront, Lambda, API Gateway, Cognito, EC2), Google Cloud, Docker, AWS CDK
- **Tools:** Git, GitHub, pnpm, Vercel, GitHub Copilot, Cursor

## Achievements

- Published Force Dark Mode, a Manifest V3 Chrome extension with 1,270+ weekly users on the Chrome Web Store (2026)
