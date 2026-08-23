import {
  MARKDOWN_CONTENT_TYPE,
  VARY_TOKENS,
  markdownHeaders,
  notAcceptableResponse,
  preferredType,
  shouldNegotiate,
} from "./acceptMarkdown";
import { resolveAgentMarkdown } from "./agentContent";

export type NegotiatedResponse = {
  status: number;
  headers: Record<string, string>;
  body: string | null;
};

function headersToRecord(headers: Headers): Record<string, string> {
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

export function varyValue(): string {
  return VARY_TOKENS.join(", ");
}

/**
 * Request-time Accept negotiation.
 * Returns a response to send immediately, or null to continue with HTML.
 */
export function negotiateMarkdown(input: {
  method: string;
  pathname: string;
  accept: string | null;
}): NegotiatedResponse | null {
  const method = input.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD") return null;
  if (!shouldNegotiate(input.pathname)) return null;

  const chosen = preferredType(input.accept);
  if (chosen === null) {
    const response = notAcceptableResponse();
    return {
      status: 406,
      headers: headersToRecord(response.headers),
      body:
        method === "HEAD"
          ? null
          : "Not Acceptable. Available representations: text/html, text/markdown.",
    };
  }

  if (chosen !== "text/markdown") return null;

  const { status, body } = resolveAgentMarkdown(input.pathname);
  return {
    status,
    headers: headersToRecord(markdownHeaders()),
    body: method === "HEAD" ? null : body,
  };
}

export function applyNegotiatedResponse(
  result: NegotiatedResponse,
  method: string
): Response {
  return new Response(method.toUpperCase() === "HEAD" ? null : result.body, {
    status: result.status,
    headers: {
      ...result.headers,
      "Content-Type":
        result.headers["content-type"] ??
        result.headers["Content-Type"] ??
        MARKDOWN_CONTENT_TYPE,
    },
  });
}
