/**
 * Accept: text/markdown negotiation helpers.
 * Follows acceptmarkdown.com: q-values, specificity, q=0 rejection, Vary.
 */

export const PRODUCES = ["text/html", "text/markdown"] as const;
export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const VARY_TOKENS = ["Accept", "Accept-Encoding"] as const;

type AcceptEntry = { type: string; q: number; specificity: number };

const SKIP_EXTENSION =
  /\.(?:js|mjs|cjs|css|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|otf|xml|txt|json|webmanifest|pdf|mp4|mp3|wasm)$/i;

const SKIP_PREFIXES = [
  "/_astro",
  "/pagefind",
  "/_image",
  "/_vercel",
  "/assets",
];

const SKIP_PATHS = new Set([
  "/robots.txt",
  "/rss.xml",
  "/llms.txt",
  "/ads.txt",
  "/sitemap-index.xml",
  "/favicon.ico",
  "/toggle-theme.js",
  "/site.webmanifest",
  "/browserconfig.xml",
]);

export function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map(raw => {
      const parts = raw
        .trim()
        .split(";")
        .map(s => s.trim())
        .filter(Boolean);
      const type = (parts[0] ?? "").toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split("=").map(s => s.trim());
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity };
    })
    .filter(entry => entry.type.length > 0);
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) {
    return candidate.startsWith(entry.type.slice(0, -1));
  }
  return entry.type === candidate;
}

/**
 * Pick the representation to serve.
 * Returns null when every produced type is rejected (caller should 406).
 */
export function preferredType(header: string | null): string | null {
  if (!header || header.trim() === "") return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let best: string | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    for (let idx = 0; idx < entries.length; idx++) {
      const entry = entries[idx];
      if (!matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue;

    if (
      matched.q > bestQ ||
      (matched.q === bestQ && matchedPosition < bestPosition)
    ) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      best = candidate;
    }
  }

  return best;
}

export function appendVary(
  headers: Headers,
  tokens: readonly string[] = VARY_TOKENS
): void {
  const existing = headers.get("Vary");
  const current = existing
    ? existing
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    : [];
  const lower = new Set(current.map(s => s.toLowerCase()));
  for (const token of tokens) {
    if (!lower.has(token.toLowerCase())) {
      current.push(token);
      lower.add(token.toLowerCase());
    }
  }
  headers.set("Vary", current.join(", "));
}

export function shouldNegotiate(pathname: string): boolean {
  if (SKIP_EXTENSION.test(pathname)) return false;
  if (SKIP_PREFIXES.some(prefix => pathname.startsWith(prefix))) return false;
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  if (SKIP_PATHS.has(path)) return false;
  if (path.startsWith("/sitemap")) return false;
  return true;
}

export function markdownHeaders(): Headers {
  const headers = new Headers({
    "Content-Type": MARKDOWN_CONTENT_TYPE,
  });
  appendVary(headers);
  return headers;
}

export function markdownResponse(
  body: string,
  status: number,
  method: string
): Response {
  return new Response(method === "HEAD" ? null : body, {
    status,
    headers: markdownHeaders(),
  });
}

export function notAcceptableResponse(): Response {
  const headers = new Headers({
    "Content-Type": "text/plain; charset=utf-8",
  });
  appendVary(headers);
  return new Response(
    "Not Acceptable. Available representations: text/html, text/markdown.",
    { status: 406, headers }
  );
}
