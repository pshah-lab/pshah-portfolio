// Adapts the Node-style (req, res) telemetry handlers to Next.js App Router route handlers.
// Only the method and the raw body text are handed to the handler; no header or address is passed.
export function toRoute(handler) {
  const run = async (request) => {
    const method = request.method;
    const body = method === "GET" || method === "HEAD" || method === "OPTIONS" ? undefined : await request.text();
    const headers = new Headers();
    let status = 200;
    let out = null;
    const res = {
      setHeader(name, value) { headers.set(name, String(value)); },
      status(code) { status = code; return res; },
      end(chunk) { out = chunk === undefined ? null : chunk; },
    };
    await handler({ method, body }, res);
    const noBody = status === 204 || status === 304;
    return new Response(noBody ? null : out, { status, headers });
  };
  return { GET: run, POST: run, PUT: run, PATCH: run, DELETE: run, OPTIONS: run };
}
