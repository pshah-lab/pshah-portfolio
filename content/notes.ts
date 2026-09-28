import type { Note } from "./types";

/**
 * Engineering notes. Each is a walkthrough of code in a public repository; `basis`
 * says which. No invented anecdotes: the notes describe what the code does and the
 * trade-offs visible in it.
 */
export const notes: Note[] = [
  {
    slug: "rag-retrieval-that-degrades-gracefully",
    title: "RAG retrieval that degrades instead of returning nothing",
    summary:
      "How InsightVault’s query path handles weak matches, and the embedding-dimension trade-off behind a multi-provider fallback chain.",
    date: "2026-09-28",
    tags: ["AI", "RAG", "Postgres"],
    project: "insightvault",
    basis: "InsightVault repository: app/api/query/route.js, src/lib/embeddingClient.js, supabase-schema.sql",
    body: [
      {
        type: "p",
        text: "A retrieval-augmented app has two failure modes that look the same to a user: the right passage exists but retrieval missed it, or the document really doesn’t contain the answer. InsightVault handles the first with a retrieval fallback chain and the second with an explicit instruction to the model.",
      },
      { type: "h2", text: "The query path" },
      {
        type: "flow",
        flow: {
          title: "Query",
          nodes: [
            { label: "Question", detail: "≤2,000 chars" },
            { label: "Embed", detail: "provider chain" },
            { label: "match_chunks()", detail: "cosine, top 6" },
            { label: "Context", detail: "≤8,000 chars" },
            { label: "LLM", detail: "grounded prompt" },
          ],
        },
      },
      {
        type: "p",
        text: "Similarity search is a Postgres function over an HNSW index, so filtering to a single document happens in the same query as the vector search:",
      },
      {
        type: "code",
        lang: "sql",
        code: `SELECT dc.id, dc.document_id AS doc_id, dc.content,
       (1 - (dc.embedding <=> query_embedding))::float AS similarity
FROM document_chunks dc
WHERE (match_chunks.document_id IS NULL OR dc.document_id = match_chunks.document_id)
  AND (1 - (dc.embedding <=> query_embedding)) > match_threshold
ORDER BY similarity DESC
LIMIT match_count;`,
      },
      { type: "h2", text: "Three levels of fallback" },
      {
        type: "list",
        items: [
          "First pass: threshold 0.2, top 6 chunks.",
          "If nothing clears the threshold, retry at 0.0. The closest chunks are usually still the most useful ones.",
          "If vector search returns nothing at all, take the document’s first chunks directly so the model has something to reason over.",
        ],
      },
      {
        type: "p",
        text: "The prompt then carries the other half of the contract: if the answer is not in the context, the model must reply that the document does not contain it. Retrieval stays permissive; the model is told to be strict.",
      },
      { type: "h2", text: "The dimension problem" },
      {
        type: "p",
        text: "Embeddings come from Hugging Face (bge-small, 384 dimensions), then Gemini (asked for 1536), then OpenAI (text-embedding-3-small, 1536). The column is vector(1536), so the Hugging Face vectors are zero-padded to fit. That keeps inserts working, but vectors from different models live in different spaces. A query embedded by one provider shouldn’t be compared with chunks embedded by another. The fix is to store the provider alongside each chunk and embed the query with the same one.",
      },
      {
        type: "p",
        text: "Takeaway: most answer-quality problems in a RAG app are retrieval problems, and retrieval problems hide in schema decisions.",
      },
    ],
  },
  {
    slug: "protecting-hls-with-cloudfront-signed-cookies",
    title: "Protecting HLS video with CloudFront signed cookies",
    summary:
      "Why signed cookies fit HLS better than signed URLs, and how StreamVault issues them after a Cognito PKCE sign-in.",
    date: "2026-09-28",
    tags: ["Cloud", "AWS", "Security"],
    project: "streamvault",
    basis: "StreamVault repository: services/auth/src/handler.ts, infra/lib/video-auth-stack.ts",
    body: [
      {
        type: "p",
        text: "An HLS player doesn’t request one video file. It requests a master playlist, then a media playlist, then a segment every few seconds. Signing each URL means rewriting playlists on the fly. A signed cookie scoped to the distribution path covers every request the player makes, and CloudFront validates it at the edge before anything reaches S3.",
      },
      { type: "h2", text: "The sign-in flow" },
      {
        type: "flow",
        flow: {
          title: "Sign-in",
          nodes: [
            { label: "/auth/login", detail: "PKCE verifier + HMAC-signed state" },
            { label: "Cognito Hosted UI", detail: "authorization code" },
            { label: "/auth/callback", detail: "verify state, redeem code" },
            { label: "Verify ID token", detail: "aws-jwt-verify" },
            { label: "Set cookies", detail: "CloudFront-Policy, -Signature, -Key-Pair-Id" },
          ],
        },
      },
      {
        type: "p",
        text: "The Lambda keeps the PKCE verifier in a short-lived HttpOnly cookie scoped to /auth and signs it with a secret from Secrets Manager, so a tampered or replayed state is rejected before the code is redeemed. After the ID token verifies, it writes a custom policy that allows the viewer domain for four hours:",
      },
      {
        type: "code",
        lang: "ts",
        code: `const policy = JSON.stringify({
  Statement: [{
    Resource: \`https://\${config.viewerDomain}/*\`,
    Condition: { DateLessThan: { "AWS:EpochTime": Math.floor(expiresAt.getTime() / 1000) } },
  }],
});`,
      },
      { type: "h2", text: "Details that matter" },
      {
        type: "list",
        items: [
          "Every cookie is HttpOnly and Secure, so page scripts can’t read the signature.",
          "The auth-state cookie uses SameSite=Lax so it survives the redirect back from Cognito.",
          "Sign-out clears all three CloudFront cookies and the state cookie explicitly.",
          "The public key, key group, user pool, secrets and API are declared in one CDK stack, so the setup is reproducible.",
        ],
      },
      {
        type: "p",
        text: "Takeaway: for segmented media, the unit of access control is a path prefix, not a file.",
      },
    ],
  },
  {
    slug: "zero-buffer-uploads-to-s3",
    title: "Uploads that don’t grow server memory",
    summary:
      "Streaming multipart uploads straight to S3 with multer-s3, and committing metadata only after S3 acknowledges.",
    date: "2026-09-28",
    tags: ["Cloud", "Node.js", "Storage"],
    project: "cloud-media-hub",
    basis: "Cloud Media Hub repository: server.js, ARCHITECTURE.md",
    body: [
      {
        type: "p",
        text: "multer.memoryStorage() holds every file in the Node.js heap until the request finishes. With concurrent large uploads that is a straight path to an out-of-memory crash. Streaming storage pipes each chunk from the socket to S3 as it arrives, so memory use tracks the chunk size, not the file size.",
      },
      {
        type: "flow",
        flow: {
          title: "Upload",
          nodes: [
            { label: "Multipart request" },
            { label: "Multer filter", detail: "image/*, 25 MB" },
            { label: "multer-s3", detail: "UUID key" },
            { label: "S3 ack" },
            { label: "Image.insertMany()" },
          ],
        },
      },
      { type: "h2", text: "Order of writes" },
      {
        type: "p",
        text: "The metadata write happens after S3 confirms every file. If the connection drops mid-upload, there is no database row pointing at an object that doesn’t exist. The worst case is an orphaned object in S3, which a lifecycle rule can clean up, rather than a broken record the UI tries to render.",
      },
      { type: "h2", text: "Reading from a private bucket" },
      {
        type: "p",
        text: "With Block Public Access on, the browser can’t load objects directly. A /media/:id route looks up the key and streams GetObject back through the server’s IAM role with the stored Content-Type. The UI tries the direct URL first and falls back to the proxy.",
      },
      {
        type: "p",
        text: "Next step: presigned PUT URLs, so the browser uploads straight to S3 and the server only issues permissions and records metadata.",
      },
    ],
  },
];

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
