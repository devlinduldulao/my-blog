import type { APIRoute } from "astro";
import { buildLlmsTxt, loadBlogPosts } from "@/utils/agentContent";

export const GET: APIRoute = () => {
  return new Response(buildLlmsTxt(loadBlogPosts()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
