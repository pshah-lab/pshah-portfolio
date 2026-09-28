import { buildKnowledge, type Chunk } from "./knowledge";

/**
 * Small BM25 retriever over the portfolio content. The corpus is a few dozen chunks,
 * so an in-process lexical index is fast, free and deterministic; no embedding service
 * or vector database is needed.
 */

const STOP = new Set(
  "a an and are as at be by can could did do does for from has have he her his how i in is it its me my of on or pratham pratham's shah tell the their them they this to was what when where which who why with would you your about any".split(
    " ",
  ),
);

/** Query expansion for common recruiter phrasings. */
const SYNONYMS: Record<string, string[]> = {
  aws: ["amazon", "s3", "cloudfront", "lambda", "dynamodb", "cognito", "ec2"],
  gcp: ["google", "cloud", "finops"],
  cloud: ["aws", "gcp", "infrastructure"],
  projects: ["project"],
  project: ["projects"],
  ai: ["llm", "rag", "embeddings", "machine", "learning"],
  ml: ["machine", "learning", "classifier", "tensorflow", "scikit"],
  bci: ["eeg", "brain", "neuroarm"],
  eeg: ["bci", "brain", "neuroarm"],
  contact: ["email", "linkedin", "reach"],
  hire: ["roles", "open", "contact"],
  looking: ["roles", "open"],
  job: ["roles", "open"],
  cost: ["finops", "savings", "billing"],
  frontend: ["react", "next", "performance"],
  backend: ["api", "node", "lambda", "fastapi", "express"],
  research: ["neuroarm", "eeg"],
  certification: ["certified", "certifications", "google", "anthropic"],
};

export const tokenize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9$%+.\s-]/g, " ")
    .split(/[\s.-]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));

type Index = {
  chunks: Chunk[];
  docs: Map<string, number>[];
  titles: Set<string>[];
  lengths: number[];
  avgLen: number;
  df: Map<string, number>;
};

let index: Index | null = null;

function getIndex(): Index {
  if (index) return index;
  const chunks = buildKnowledge();
  const docs = chunks.map((c) => {
    const tf = new Map<string, number>();
    // Titles count double: they say what the chunk is about.
    for (const t of [...tokenize(c.title), ...tokenize(c.title), ...tokenize(c.text)]) tf.set(t, (tf.get(t) ?? 0) + 1);
    return tf;
  });
  const lengths = docs.map((d) => [...d.values()].reduce((a, b) => a + b, 0));
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const titles = chunks.map((c) => new Set(tokenize(c.title)));
  index = { chunks, docs, titles, lengths, avgLen: lengths.reduce((a, b) => a + b, 0) / lengths.length, df };
  return index;
}

export function retrieve(question: string, k = 4): { chunk: Chunk; score: number }[] {
  const { chunks, docs, titles, lengths, avgLen, df } = getIndex();
  const base = tokenize(question);
  const terms = [...new Set([...base, ...base.flatMap((t) => SYNONYMS[t] ?? [])])];
  const N = chunks.length;
  const k1 = 1.4;
  const b = 0.75;

  return chunks
    .map((chunk, i) => {
      let score = 0;
      for (const t of terms) {
        const f = docs[i].get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
        const weight = base.includes(t) ? 1 : 0.5; // expanded terms count less
        score += weight * idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * lengths[i]) / avgLen)));
        // A question naming the subject of a chunk ("NeuraMach", "InsightVault") should land on it.
        if (base.includes(t) && titles[i].has(t)) score += 1.5 * idf;
      }
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k);
}

/**
 * Without an LLM: answer from the best chunk's own sentences. Keep its opening sentence
 * (what the thing is) plus the sentences that overlap the question most, in original order.
 */
export function extractiveAnswer(question: string, hits: { chunk: Chunk }[]): string {
  const q = new Set(tokenize(question));
  const sentences = hits[0].chunk.text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9$])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 360);
  if (sentences.length === 0) return hits[0].chunk.text.slice(0, 360);
  const ranked = sentences
    .map((s, i) => ({ i, overlap: tokenize(s).filter((t) => q.has(t)).length }))
    .filter((x) => x.i > 0 && x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
    .map((x) => x.i);
  const keep = [0, ...ranked, ...(ranked.length === 0 ? [1, 2] : [])].filter((i) => i < sentences.length);
  return [...new Set(keep)]
    .sort((a, b) => a - b)
    .map((i) => sentences[i])
    .join(" ");
}
