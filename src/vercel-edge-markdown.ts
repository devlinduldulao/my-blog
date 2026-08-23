import { appendVary } from "./utils/acceptMarkdown";
import {
  applyNegotiatedResponse,
  negotiateMarkdown,
} from "./utils/negotiateMarkdown";

/**
 * Vercel Edge Middleware entry. Short-circuits markdown/406 responses and
 * otherwise continues to static files.
 */
export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const result = negotiateMarkdown({
    method: request.method,
    pathname: url.pathname,
    accept: request.headers.get("accept"),
  });

  if (result) {
    return applyNegotiatedResponse(result, request.method);
  }

  const headers = new Headers({ "x-middleware-next": "1" });
  appendVary(headers);
  return new Response(null, { headers });
}
