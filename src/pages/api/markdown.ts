import type { APIRoute } from "astro";
import {
  applyNegotiatedResponse,
  negotiateMarkdown,
} from "@/utils/negotiateMarkdown";

export const prerender = false;

export const GET: APIRoute = ({ request, url }) => {
  const src = url.searchParams.get("src") || "/";
  const result = negotiateMarkdown({
    method: request.method,
    pathname: src,
    accept: request.headers.get("accept") ?? "text/markdown",
  });
  if (!result) {
    const fallback = negotiateMarkdown({
      method: request.method,
      pathname: src,
      accept: "text/markdown",
    });
    return applyNegotiatedResponse(
      fallback ?? {
        status: 404,
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
        body: "Not found",
      },
      request.method
    );
  }
  return applyNegotiatedResponse(result, request.method);
};
