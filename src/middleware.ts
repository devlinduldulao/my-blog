import { defineMiddleware } from "astro:middleware";
import { appendVary } from "@/utils/acceptMarkdown";
import {
  applyNegotiatedResponse,
  negotiateMarkdown,
} from "@/utils/negotiateMarkdown";

export const onRequest = defineMiddleware(async (context, next) => {
  // Production negotiation is the Vercel Edge handler in
  // src/vercel-edge-markdown.ts. Skip header access during prerender.
  if (import.meta.env.PROD) {
    return next();
  }

  const { request, url } = context;
  const negotiated = negotiateMarkdown({
    method: request.method,
    pathname: url.pathname,
    accept: request.headers.get("accept"),
  });

  if (negotiated) {
    return applyNegotiatedResponse(negotiated, request.method);
  }

  const response = await next();
  appendVary(response.headers);
  return response;
});
