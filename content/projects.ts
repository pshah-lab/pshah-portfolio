import type { CardProject, Project } from "./types";

/**
 * Project facts are taken from the public repositories under github.com/pshah-lab
 * (source read on 2026-09-28), the resume, and the owner’s earlier site copy.
 * Periods are derived from repository activity unless a resume date exists.
 */
export const projects: Project[] = [
  {
    slug: "insightvault",
    name: "InsightVault",
    summary: "Ask questions of your own PDFs and get answers grounded in the passages that support them.",
    description:
      "A retrieval-augmented question-answering app. PDFs are chunked, embedded into Postgres with pgvector, and searched by cosine similarity before an LLM answers from the retrieved context only.",
    categories: ["ai", "full-stack"],
    tier: "featured",
    kind: "AI product (RAG)",
    period: "Nov 2025 – Sep 2026",
    stack: ["Next.js 16", "React 19", "Supabase Postgres", "pgvector (HNSW)", "OpenAI / Gemini / Hugging Face embeddings", "Groq / OpenAI chat"],
    image: {
      src: "/insightvault.webp",
      alt: "InsightVault query screen: a question box, recent questions in the sidebar and a panel counting answered questions.",
      width: 1024,
      height: 588,
    },
    links: { repo: "https://github.com/pshah-lab/insightVault" },
    caseStudy: {
      problem:
        "Keyword search over a stack of PDFs misses answers phrased differently from the query, and a general chatbot answers confidently without reading your documents. The goal was answers that come from the uploaded document and show which passages they came from.",
      why:
        "Retrieval-augmented generation is the core pattern behind most applied LLM products. Building it end to end, from ingestion and chunking to vector indexing, retrieval tuning and grounded prompting, means owning every decision instead of hiding them behind a framework.",
      role: "Sole developer: data model, ingestion pipeline, retrieval, API routes, prompt design and UI.",
      architecture: [
        {
          title: "Ingestion",
          caption: "Runs once per uploaded PDF.",
          nodes: [
            { label: "PDF upload", detail: "POST /api/upload" },
            { label: "Validate", detail: "25 MB cap, %PDF- magic bytes, rate limit" },
            { label: "Extract text", detail: "pdf-parse" },
            { label: "Chunk", detail: "sentence-aware, 800 chars, 120 overlap" },
            { label: "Embed", detail: "HF → Gemini → OpenAI fallback" },
            { label: "Store", detail: "document_chunks.embedding vector(1536)" },
          ],
        },
        {
          title: "Query",
          caption: "Runs on every question.",
          nodes: [
            { label: "Question", detail: "POST /api/query, ≤2,000 chars" },
            { label: "Embed query", detail: "same provider chain" },
            { label: "Vector search", detail: "match_chunks(): cosine, top 6, threshold 0.2" },
            { label: "Build context", detail: "top chunks, capped at 8,000 chars" },
            { label: "LLM", detail: "Groq or GPT-4o mini, 800 max tokens" },
            { label: "Answer + sources", detail: "similarity scores returned to UI" },
          ],
        },
      ],
      decisions: [
        {
          title: "pgvector inside Postgres instead of a separate vector database",
          body: "Documents, chunks, queries and responses live in one Supabase Postgres database. Similarity search is a SQL function (match_chunks) over an HNSW index with cosine distance, so metadata filters like a single document_id sit in the same query as the vector search.",
        },
        {
          title: "A provider chain for embeddings",
          body: "Embeddings try Hugging Face (bge-small), then Gemini (gemini-embedding-001 at 1536 dimensions), then OpenAI (text-embedding-3-small). Free-tier quota failures degrade to the next provider instead of failing the upload.",
        },
        {
          title: "Retrieval that degrades instead of returning nothing",
          body: "If no chunk clears the 0.2 similarity threshold, the query retries at 0.0, and failing that falls back to the document’s first chunks. The prompt tells the model to say the document does not contain the answer rather than guess.",
        },
        {
          title: "Sentence-aware chunking with overlap",
          body: "Text is split on sentence boundaries and packed to about 800 characters, with a 120-character tail carried into the next chunk, so an answer that spans a boundary is still retrievable.",
        },
      ],
      challenges: [
        {
          title: "Keeping one vector column across providers",
          body: "Providers return different dimensions. Gemini can be asked for 1536 directly; the 384-dimension Hugging Face vectors are zero-padded to fit the vector(1536) column. The trade-off: vectors from different providers are not comparable, so a document and its queries need to be embedded by the same provider.",
        },
        {
          title: "Protecting a paid API from abuse",
          body: "Upload and query routes are rate-limited per IP (10 uploads per 10 minutes, 40 queries per minute), inputs are length-capped, document IDs are validated as UUIDs, and uploads are checked by magic bytes rather than trusting the file extension.",
        },
      ],
      implementation: [
        "Next.js 16 App Router with route handlers for upload, query, documents, chunks and history.",
        "Supabase schema with pgvector, an HNSW index (vector_cosine_ops) and a match_chunks() RPC scoped by document_id.",
        "Per-query latency recorded in a responses table, so response times can be measured over time.",
        "LLM client switches to Groq when a Groq key is configured and falls back to OpenAI GPT-4o mini, with typed rate-limit detection for clearer errors.",
        "Answers are returned with the matched chunks and their similarity scores so the UI can show sources.",
      ],
      results: [
        "Working end-to-end RAG over uploaded PDFs with cited source passages.",
        "Uploads keep working when one embedding provider’s free quota runs out.",
      ],
      lessons: [
        "Most RAG quality problems are retrieval problems: threshold, chunk size and fallback behaviour mattered more than the choice of chat model.",
        "Mixing embedding providers in one index is convenient but quietly breaks similarity. Recording the provider per chunk is the fix.",
      ],
      next: [
        "Store the embedding provider per chunk and re-embed queries with the matching one.",
        "Turn on the per-user Row Level Security policies already drafted in supabase-schema.sql for multi-tenant vaults.",
        "Move the in-memory rate limiter to a shared store so limits hold across serverless instances.",
        "Add a small evaluation set of question/answer pairs to measure retrieval changes instead of eyeballing them.",
      ],
    },
    resume: {
      tagline: "Question answering over uploaded PDFs",
      bullets: [
        "Built a Next.js app that chunks PDF text, stores embeddings in Supabase Postgres (pgvector, HNSW index) and answers questions from the top-matching passages through an LLM API.",
        "Added per-IP rate limits, input length caps, PDF magic-byte checks and an embedding-provider fallback (Hugging Face, then Gemini, then OpenAI).",
      ],
    },
  },
  {
    slug: "neuroarm",
    name: "NeuroArm",
    summary: "EEG signal classification and visualization for a brain-controlled prosthetic arm.",
    description:
      "Research engineering on a brain-computer interface: preprocessing EEG, extracting frequency-band features, training classifiers for movement intent, and visualizing the signal path from brain to arm.",
    categories: ["research", "ai"],
    tier: "notable",
    kind: "Brain-computer interface research",
    period: "Jul 2024 – May 2025",
    stack: ["Python", "scikit-learn", "TensorFlow / Keras", "pandas", "React", "TypeScript", "Tailwind CSS"],
    image: {
      src: "/neuro.webp",
      alt: "NeuroArm BCI web app: an EEG data upload area under a header describing the signal classifier.",
      width: 1600,
      height: 913,
    },
    links: {
      live: "https://neuro-arm.vercel.app/",
      repo: "https://github.com/pshah-lab/NeuroArm",
      docs: "https://github.com/pshah-lab/BCI",
    },
    metrics: [
      {
        value: "91.6%",
        label: "test accuracy, Random Forest",
        context: "Binary EEG classification, 12,811 samples, 14 features, 80/20 split",
        source: "BCI repository, randomforest.ipynb output",
      },
    ],
    caseStudy: {
      problem:
        "A prosthetic arm driven by thought needs a reliable way to turn noisy, low-amplitude EEG into a small set of commands. The signal is non-stationary, differs from person to person, and is buried in artifacts from blinks and muscle movement.",
      why:
        "NeuroArm was an industry research project at IS360 Technologies. It sits where signal processing, machine learning and interface design meet, and a classifier’s output only matters if someone can see and trust it.",
      role:
        "Research developer on a team. Worked on EEG preprocessing and classification, trained and compared models, and helped build the visualization that maps classified signals to arm movement.",
      architecture: [
        {
          title: "Signal path",
          caption: "From headset to actuator, as modelled in the NeuroArm web app.",
          nodes: [
            { label: "EEG capture", detail: "multi-channel headset, e.g. AF3 … AF4" },
            { label: "Preprocess", detail: "filtering, standardization" },
            { label: "Features", detail: "band power: delta, theta, alpha, beta, gamma" },
            { label: "Classify", detail: "Random Forest / MLP" },
            { label: "Intent", detail: "left vs right" },
            { label: "Arm command", detail: "visualized in the web app" },
          ],
        },
      ],
      decisions: [
        {
          title: "Frequency-band features before deep learning",
          body: "Band-power features (delta through gamma, mean and standard deviation per electrode) are compact and interpretable, and they work with small datasets where end-to-end deep models overfit.",
        },
        {
          title: "Compare a tree ensemble against a neural network",
          body: "The public notebooks train both a 100-tree Random Forest and a two-layer MLP (128 → 64, dropout 0.3, early stopping) on standardized features, so the simpler model has to be beaten rather than assumed worse.",
        },
        {
          title: "Make the pipeline visible",
          body: "The NeuroArm web app walks through upload, visualization, filtering, feature extraction, training and results. It is meant for people who need to inspect the pipeline, not just read a number.",
        },
      ],
      challenges: [
        {
          title: "Noisy, subject-specific signals",
          body: "EEG varies across sessions and people. The reported numbers come from a random split of one dataset, so they measure within-dataset performance, not how well a model transfers to a new user.",
        },
        {
          title: "Honest evaluation",
          body: "One accuracy number hides class balance. The notebook reports per-class precision and recall (0.96 / 0.87 and 0.88 / 0.96) and a confusion matrix.",
        },
      ],
      implementation: [
        "pandas and scikit-learn pipeline: load, scale with StandardScaler, 80/20 train/test split, train RandomForestClassifier(n_estimators=100).",
        "Keras MLP with dropout and early stopping for comparison.",
        "Trained model and scaler exported with joblib for reuse in inference.",
        "React + TypeScript web app (Vite, Tailwind) for uploading EEG files and walking through the pipeline stages.",
      ],
      results: [
        "91.6% test accuracy (macro F1 0.92) for the Random Forest on the public 12,811-sample EEG dataset in the BCI repository.",
      ],
      lessons: [
        "Per-class metrics and a confusion matrix say more than headline accuracy, especially with near-balanced classes.",
        "For small EEG datasets, feature engineering and a strong classical baseline go a long way before deep learning pays off.",
      ],
      next: [
        "Cross-subject validation (leave-one-subject-out) to measure how well models generalize to new users.",
        "Streaming inference with windowed features to close the loop in real time.",
      ],
    },
    notes: [
      "NeuroArm was a team project. The public NeuroArm and BCI repositories are forks of the team’s repositories.",
      "The 91.6% figure comes from the public notebook’s dataset and binary label, not necessarily from the prosthetic-arm recordings.",
    ],
  },
  {
    slug: "abhinandan-mountreea",
    name: "Abhinandan Mountreea",
    summary: "Marketing site for a residential villa project, built for a paying client.",
    description:
      "Freelance build of a real-estate showcase, from requirements to deployment, with image delivery through Cloudinary (WebP, caching, lazy loading) to keep the image-heavy pages light on mobile.",
    categories: ["full-stack"],
    tier: "featured",
    kind: "Freelance client work",
    period: "Jul 2025 – Nov 2025",
    stack: ["React", "Vite", "GSAP", "Cloudinary", "WebP"],
    image: {
      src: "/Abhinandan.webp",
      alt: "Abhinandan Mountreea homepage: a full-width rendering of modern villas with timber facades and a Schedule Visit button.",
      width: 1600,
      height: 946,
    },
    links: { live: "https://www.abhinandanmountreea.com/" },
    caseStudy: {
      problem:
        "A real-estate brand sells on imagery. Full-resolution renders of villas make a site feel slow, especially on mobile, and prospective buyers leave before the gallery loads.",
      why:
        "The client needed a site that communicates the project’s brand and builds trust with buyers. Speed and presentation both carry weight in that.",
      role: "Sole developer: requirements with the client, design implementation, animation, image pipeline and deployment.",
      architecture: [
        {
          title: "Image delivery",
          caption: "The browser only downloads what the current viewport needs.",
          nodes: [
            { label: "Source renders", detail: "high-resolution originals" },
            { label: "Cloudinary", detail: "upload once, transform on request" },
            { label: "WebP + sizing", detail: "format and width per device" },
            { label: "CDN cache", detail: "served from the edge" },
            { label: "Lazy load", detail: "below-the-fold images deferred" },
          ],
        },
      ],
      decisions: [
        {
          title: "Offload image transformation to a CDN",
          body: "Cloudinary generates WebP variants on request and caches them at the edge. There is no build-time image pipeline to maintain, and the client can swap renders without a redeploy.",
        },
        {
          title: "Animation that stays out of the way",
          body: "GSAP handles the entrance and scroll motion, and content stays readable while it runs.",
        },
      ],
      challenges: [
        {
          title: "Heavy imagery on mobile",
          body: "Most of the page weight was images. Converting to WebP, sizing per device and deferring off-screen images addressed the bulk of it.",
        },
      ],
      implementation: [
        "React + Vite single-page site with GSAP animation.",
        "Cloudinary delivery with WebP conversion, caching and lazy loading.",
        "Responsive layouts across devices, iterated with the client on design and content flow.",
      ],
      results: [
        "Live at abhinandanmountreea.com.",
        "Image delivery moved off the build into a CDN the client can update without a redeploy.",
        "Client testimonial: “The website reflects exactly what we had envisioned…”",
      ],
      lessons: [
        "On content-led sites, image delivery is the performance budget. Fix that before touching JavaScript.",
        "Client work is mostly communication: agreeing on content flow early avoided late rework.",
      ],
      next: [
        "Track Core Web Vitals from real users (field data) rather than lab runs alone.",
      ],
    },
    notes: ["Client code is private, so there is no public repository."],
  },
  {
    slug: "cloud-media-hub",
    name: "Cloud Media Hub",
    summary: "Media upload and storage service that streams files straight to S3 and catalogs them in MongoDB.",
    description:
      "A distributed file-storage service: Express streams multipart uploads directly to S3 without buffering in memory, MongoDB stores the metadata, and a proxy route serves objects from a private bucket.",
    categories: ["cloud", "full-stack"],
    tier: "notable",
    kind: "Distributed storage backend",
    period: "Sep 2026",
    stack: ["Node.js", "Express 5", "AWS S3 (SDK v3)", "multer-s3", "MongoDB", "Mongoose"],
    links: {
      repo: "https://github.com/pshah-lab/aws-s3-mongodb-media-hub",
      docs: "https://github.com/pshah-lab/aws-s3-mongodb-media-hub/blob/main/ARCHITECTURE.md",
    },
    caseStudy: {
      problem:
        "Media uploads break naïve servers. Buffering files in memory exhausts the Node.js heap under concurrent uploads, storing binaries in the database bloats it, and a private bucket blocks the browser from showing previews.",
      why:
        "Storing binaries in S3 and metadata in a database, then streaming between them, underpins almost every product that handles user files. This project builds that from first principles, with a written design document.",
      role: "Sole developer: architecture and design document, API, storage layer and UI.",
      architecture: [
        {
          title: "Upload path",
          caption: "Server memory stays flat regardless of file size.",
          nodes: [
            { label: "Browser", detail: "multipart/form-data" },
            { label: "Express", detail: "POST /upload" },
            { label: "Multer filter", detail: "image/* only, 25 MB cap" },
            { label: "multer-s3 stream", detail: "UUID key, piped to S3" },
            { label: "S3", detail: "private bucket" },
            { label: "MongoDB", detail: "insertMany after S3 ack" },
          ],
        },
        {
          title: "Read path",
          nodes: [
            { label: "Browser", detail: "GET /media/:id" },
            { label: "Express proxy", detail: "looks up key in MongoDB" },
            { label: "S3 GetObject", detail: "server IAM credentials" },
            { label: "Stream to client", detail: "correct Content-Type" },
          ],
        },
      ],
      decisions: [
        {
          title: "S3 for binaries, MongoDB for metadata",
          body: "Object storage is cheap, durable and CDN-friendly. The database holds only what you query (name, size, MIME type, key, timestamps). The design doc compares this against GridFS and local disk.",
        },
        {
          title: "Commit metadata only after S3 acknowledges",
          body: "MongoDB records are written with insertMany once S3 confirms the upload, so a dropped connection mid-upload cannot leave orphaned database rows.",
        },
        {
          title: "A streaming proxy for private buckets",
          body: "With Block Public Access on, direct S3 URLs fail in the browser. GET /media/:id streams the object through the server’s credentials, and the UI falls back to it automatically.",
        },
        {
          title: "Swappable storage engine",
          body: "STORAGE_TYPE=s3 or local lets the app run offline in development and CI without AWS credentials or cloud cost.",
        },
      ],
      challenges: [
        {
          title: "Memory under concurrent uploads",
          body: "Replacing memory storage with multer-s3 streaming keeps memory use independent of file size, because chunks flow from the socket to S3 with backpressure.",
        },
        {
          title: "Untrusted file input",
          body: "Files are renamed to random UUIDv4 keys (no path traversal or collisions), non-image MIME types are rejected before upload starts, and size is capped at 25 MB.",
        },
      ],
      implementation: [
        "REST API: POST /upload, GET /images, GET /media/:id, DELETE /images (batch) and /images/:id, GET /api/config.",
        "Batch deletes use S3 DeleteObjects plus a single MongoDB delete.",
        "Vanilla JS client with drag-and-drop staging, multi-select delete and a lightbox preview.",
        "ARCHITECTURE.md with high-level and low-level design, sequence diagrams and API contracts.",
      ],
      results: [
        "Upload memory use does not grow with file size.",
        "Runs identically against S3 or local disk behind one environment flag.",
      ],
      lessons: [
        "Where you commit the metadata write decides whether failures leave garbage behind.",
        "Writing the design doc first made the trade-offs (GridFS vs S3 vs disk) explicit instead of accidental.",
      ],
      next: [
        "Presigned URLs so browsers upload directly to S3 and the server never touches the bytes.",
        "CloudFront in front of the bucket, and a Lambda trigger for thumbnails.",
        "Authentication on upload and delete.",
      ],
    },
  },
  {
    slug: "streamvault",
    name: "StreamVault",
    summary: "Invite-only HLS video streaming on AWS with edge-enforced access control.",
    description:
      "End-to-end video platform: an EC2 FFmpeg pipeline produces multi-audio HLS, Cognito with PKCE signs viewers in, a Lambda issues CloudFront signed cookies, and a FastAPI + DynamoDB service syncs watch progress. Infrastructure is defined in AWS CDK.",
    categories: ["cloud", "full-stack"],
    tier: "featured",
    kind: "Video platform on AWS",
    period: "Aug 2026 – Sep 2026",
    stack: ["AWS CDK", "CloudFront signed cookies", "S3", "Cognito (PKCE)", "Lambda", "API Gateway", "Secrets Manager", "EC2", "FFmpeg", "FastAPI", "DynamoDB", "HLS.js", "TypeScript"],
    links: { repo: "https://github.com/pshah-lab/StreamVault" },
    caseStudy: {
      problem:
        "Private video needs every playlist and every segment protected, not just the page that embeds them. Signed URLs per segment don’t scale to HLS, where a player requests hundreds of files.",
      why:
        "Signed-cookie delivery is the standard way to protect segmented video on AWS. Building it end to end, with infrastructure as code, a real auth flow and an encoding pipeline, covers most of what a production media stack needs.",
      role: "Sole developer: CDK infrastructure, auth Lambda, encoding pipeline, progress API and web player.",
      architecture: [
        {
          title: "Sign-in to playback",
          nodes: [
            { label: "Viewer", detail: "web app on CloudFront" },
            { label: "Cognito Hosted UI", detail: "PKCE authorization code" },
            { label: "Auth Lambda", detail: "HMAC-signed state, JWT verify" },
            { label: "Signed cookies", detail: "HttpOnly, Secure, 4-hour policy" },
            { label: "CloudFront", detail: "key group checks every request" },
            { label: "Private S3", detail: ".m3u8 + .ts segments" },
          ],
        },
        {
          title: "Encoding pipeline",
          nodes: [
            { label: "Raw video", detail: "mp4 / mkv / mov" },
            { label: "S3 input/", detail: "pipeline.sh" },
            { label: "EC2 worker", detail: "c7i.2xlarge, scoped IAM role" },
            { label: "FFmpeg", detail: "libx264, 10 s HLS segments, multi-audio" },
            { label: "S3 output/", detail: "catalog updated, web redeployed" },
          ],
        },
      ],
      decisions: [
        {
          title: "Signed cookies instead of signed URLs",
          body: "One cookie policy covers every playlist and segment under the distribution, so the player needs no URL rewriting and access is still checked at the edge on every request.",
        },
        {
          title: "PKCE with HMAC-signed state",
          body: "The auth Lambda generates the PKCE verifier and signs the state with a secret in Secrets Manager, stores it in a short-lived HttpOnly cookie scoped to /auth, and verifies the Cognito ID token before issuing CloudFront cookies.",
        },
        {
          title: "Everything in CDK",
          body: "User pool, hosted UI domain, CloudFront public key and key group, secrets, HTTP API and the EC2 worker role are all declared in one stack, so the environment can be rebuilt from scratch.",
        },
        {
          title: "Short-lived compute for encoding",
          body: "Encoding runs on an EC2 worker launched per job instead of an always-on server, so compute is only billed while it works.",
        },
      ],
      challenges: [
        {
          title: "Cookie scope and SameSite",
          body: "Auth-state cookies use SameSite=Lax so the Cognito redirect can return them, while CloudFront cookies are cleared with Strict on sign-out.",
        },
      ],
      implementation: [
        "Auth Lambda in TypeScript with aws-jwt-verify, with unit tests for the PKCE crypto.",
        "FastAPI progress API validating Cognito RS256 JWTs against JWKS, persisting to DynamoDB, and containerized with Docker.",
        "HLS.js player with audio-track and WebVTT subtitle switching.",
        "Single-command pipeline: scan, upload, launch EC2 encode, sync HLS output, update catalog, redeploy.",
      ],
      results: [
        "Every playlist and segment is protected at the CDN edge; the bucket is never public.",
        "Reproducible infrastructure from a single CDK deploy.",
      ],
      lessons: [
        "For HLS, the access-control unit is the distribution path, not the file.",
        "Auth flows fail in the details (cookie paths, SameSite, expiry), so test them explicitly.",
      ],
      next: [
        "Run the encode worker on Spot capacity with interruption handling to cut encoding cost further.",
        "Adaptive bitrate ladders (multiple renditions) instead of a single rendition.",
      ],
    },
    notes: [
      "Personal project with invite-only access, so there is no public demo; the repository has the full infrastructure and application code.",
    ],
    resume: {
      tagline: "Invite-only video streaming on AWS",
      bullets: [
        "Defined Cognito (hosted UI with PKCE), CloudFront signed cookies, a private S3 origin, Lambda, API Gateway and Secrets Manager in one AWS CDK stack.",
        "Wrote the sign-in Lambda in TypeScript (HMAC-signed PKCE state, ID-token verification) with unit tests, and a FastAPI + DynamoDB service that saves watch progress behind Cognito JWT checks.",
        "Scripted an FFmpeg pipeline that encodes uploads to HLS on an EC2 worker and syncs the output to S3.",
      ],
    },
  },
  {
    slug: "force-dark-mode",
    name: "Force Dark Mode",
    summary: "Privacy-first Chrome extension that darkens websites, PDFs and local documents. 1,270+ weekly users.",
    description:
      "A Manifest V3 extension, published as Force Dark Mode - ThemeSwitcher under my Chameleon Labs brand, that picks a dark-mode strategy per page, renders PDFs offline in a dark canvas viewer, and syncs per-site preferences. No telemetry and no network requests.",
    categories: ["open-source", "full-stack"],
    tier: "featured",
    kind: "Chrome extension",
    period: "Jan 2026 – present",
    stack: ["JavaScript", "Chrome Extensions MV3", "PDF.js", "chrome.storage.sync", "MutationObserver"],
    image: {
      src: "/force-dark-mode.webp",
      alt: "Chrome Web Store listing for Force Dark Mode, showing 1,000 users and a screenshot of Wikipedia.",
      width: 1024,
      height: 607,
    },
    links: {
      repo: "https://github.com/pshah-lab/force-dark-mode-extension",
      store: "https://chromewebstore.google.com/detail/kmhhphbakbhohiohagkhhgdgfbplkfke",
      live: "https://darkmode.pshah.fun/",
    },
    publisher: { name: "Chameleon Labs", url: "https://darkmode.pshah.fun/", id: "https://darkmode.pshah.fun/#organization" },
    metrics: [
      { value: "1,270+", label: "weekly users", context: "Chrome Web Store developer dashboard", source: "Chrome Web Store developer dashboard, 30 Sep 2026" },
    ],
    caseStudy: {
      problem:
        "Global colour inversion turns photos into negatives, double-inverts sites that are already dark, and flashes white before the theme applies. PDFs and local files usually aren’t covered at all.",
      why:
        "A small, useful product used by real people, with the constraints that come with that: performance on every page, a store review process, privacy obligations and releases.",
      role: "Sole developer and maintainer: engines, viewer, options UI, tests, documentation and Chrome Web Store releases.",
      architecture: [
        {
          title: "Per-page theming",
          nodes: [
            { label: "Navigation", detail: "content script at document_start" },
            { label: "Bind CSS variables", detail: "before first paint, no white flash" },
            { label: "Read pass", detail: "luminance + media density, no DOM writes" },
            { label: "Choose engine", detail: "Auto / CSS override / invert / skip" },
            { label: "Batched write", detail: "one requestAnimationFrame" },
            { label: "Observe", detail: "MutationObserver for SPA updates" },
          ],
        },
      ],
      decisions: [
        {
          title: "Separate read and write passes",
          body: "Measuring the page and applying styles in different animation frames avoids layout thrashing, which keeps scrolling smooth.",
        },
        {
          title: "Detect native dark mode and leave it alone",
          body: "Sites like YouTube and GitHub are already dark. The Auto engine skips them instead of double-inverting.",
        },
        {
          title: "Offline and minimal permissions",
          body: "Only storage, activeTab and a document_start content script. PDF.js is bundled, so no document leaves the machine.",
        },
      ],
      challenges: [
        {
          title: "Canvas-rendered apps",
          body: "Editors like Google Docs draw content on canvas, which no CSS approach can recolor. This is documented as a known limitation rather than hacked around.",
        },
      ],
      implementation: [
        "Auto, CSS-override and invert engines, plus a PDF, Markdown, TXT and RTF viewer with saturation-aware pixel conversion.",
        "v1.6.1 added data export, import and erase with schema validation, and a privacy/security test suite (prototype-pollution guards, no innerHTML, CSP checks).",
        "Documentation set covering privacy, threat model, incident response and a compliance matrix, plus a public marketing site.",
      ],
      results: [
        "1,270+ weekly users on the Chrome Web Store.",
        "Semantic-versioned releases with a changelog.",
      ],
      lessons: [
        "Shipping to real users means writing the privacy policy, handling store review and treating edge cases as bugs, not trivia.",
      ],
      next: ["DOCX and PPTX preview in the offline viewer (spec and plan dated 2026-09-26 in the repository)."],
    },
    resume: {
      tagline: "Chrome extension with 1,270+ weekly users",
      bullets: [
        "Built a Manifest V3 extension in JavaScript that chooses a dark-mode strategy per page from a luminance check and applies changes in batched animation frames to avoid layout thrashing.",
        "Added an offline PDF viewer on PDF.js, per-site preferences synced through chrome.storage, and settings export, import and erase with schema validation, covered by automated privacy and security tests.",
      ],
    },
  },
  {
    slug: "finchess",
    name: "FinChess Strategy",
    summary: "Teaches financial literacy through chess: every piece maps to a financial concept.",
    description:
      "A React + TypeScript game built on chess.js where each move updates liquidity, risk and net-worth metrics, with lessons, quizzes and reflection prompts.",
    categories: ["full-stack"],
    tier: "archive",
    kind: "Educational game",
    period: "Oct 2025 – Apr 2026",
    stack: ["React", "TypeScript", "Vite", "chess.js", "Tailwind CSS"],
    links: { live: "https://fin-wise-fin-chess.vercel.app", repo: "https://github.com/pshah-lab/FinWise---FinChess" },
  },
  {
    slug: "book-review-platform",
    name: "Book Review Platform",
    summary: "MERN app for signing up, adding books and writing reviews.",
    description: "Full-stack review platform on MongoDB, Express, React and Node.js with user accounts.",
    categories: ["full-stack"],
    tier: "archive",
    kind: "Web app",
    period: "Oct 2025",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    links: { live: "https://book-review-platform-swart.vercel.app", repo: "https://github.com/pshah-lab/Book-Review-Platform" },
  },
  {
    slug: "leetcode-visualizer",
    name: "LeetCode 2106 Visualizer",
    summary: "Step-through visualization of a sliding-window solution to “Maximum Fruits Harvested”.",
    description: "An interactive page that animates how the algorithm moves, so the logic can be seen rather than read.",
    categories: ["open-source"],
    tier: "archive",
    kind: "Algorithm visualization",
    period: "Aug 2025",
    stack: ["JavaScript"],
    links: {
      live: "https://leet-code-visualizer-2106-maximum-f.vercel.app",
      repo: "https://github.com/pshah-lab/leetCodeVisualizer---2106.-Maximum-Fruits-Harvested-After-at-Most-K-Steps",
    },
  },
];

export { categoryLabels } from "./categories";

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.caseStudy);

/** The fields a project card needs, so client components don’t receive case-study text. */
export const toCard = ({ caseStudy, ...rest }: Project): CardProject => ({ ...rest, hasCaseStudy: Boolean(caseStudy) });
