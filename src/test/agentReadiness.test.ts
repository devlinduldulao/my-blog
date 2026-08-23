import { describe, expect, it } from "vitest";
import {
  appendVary,
  preferredType,
  shouldNegotiate,
} from "@/utils/acceptMarkdown";
import { negotiateMarkdown } from "@/utils/negotiateMarkdown";
import {
  DEVELOPER_RESOURCES_TITLE,
  buildLlmsTxt,
  developersMarkdown,
  loadBlogPosts,
  notFoundMarkdown,
  resolveAgentMarkdown,
} from "@/utils/agentContent";
import {
  organizationSchema,
  serializeJsonLd,
} from "@/utils/organizationSchema";

describe("markdown Accept negotiation", () => {
  it("serves HTML when Accept is missing or */*", () => {
    expect(preferredType(null)).toBe("text/html");
    expect(preferredType("")).toBe("text/html");
    expect(preferredType("*/*")).toBe("text/html");
  });

  it("serves markdown when Accept prefers text/markdown", () => {
    expect(preferredType("text/markdown")).toBe("text/markdown");
    expect(preferredType("text/markdown, text/html, */*")).toBe(
      "text/markdown"
    );
  });

  it("serves HTML for a typical browser Accept list", () => {
    expect(
      preferredType(
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      )
    ).toBe("text/html");
  });

  it("honors q-values and specificity", () => {
    expect(preferredType("text/html;q=0.8, text/markdown;q=0.9")).toBe(
      "text/markdown"
    );
    expect(preferredType("text/html;q=0, */*;q=1")).toBe("text/markdown");
  });

  it("returns null when every produced type is rejected", () => {
    expect(preferredType("text/html;q=0, text/markdown;q=0")).toBeNull();
    expect(preferredType("application/json")).toBeNull();
  });

  it("adds Accept and Accept-Encoding to Vary without duplicating", () => {
    const headers = new Headers({ Vary: "Accept-Encoding" });
    appendVary(headers);
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");

    appendVary(headers);
    expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
  });

  it("returns a markdown response for Accept: text/markdown", () => {
    const result = negotiateMarkdown({
      method: "GET",
      pathname: "/",
      accept: "text/markdown",
    });
    expect(result).not.toBeNull();
    expect(result?.status).toBe(200);
    expect(result?.headers["content-type"]).toBe(
      "text/markdown; charset=utf-8"
    );
    expect(result?.headers.vary?.toLowerCase()).toContain("accept");
    expect(result?.body).toContain("# Devlin Duldulao");
  });

  it("returns 406 when HTML and markdown are rejected", () => {
    const result = negotiateMarkdown({
      method: "GET",
      pathname: "/",
      accept: "application/json",
    });
    expect(result?.status).toBe(406);
  });

  it("falls through to HTML for browser Accept lists", () => {
    expect(
      negotiateMarkdown({
        method: "GET",
        pathname: "/",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      })
    ).toBeNull();
  });

  it("skips negotiation for assets and already-plain files", () => {
    expect(shouldNegotiate("/")).toBe(true);
    expect(shouldNegotiate("/posts/hello")).toBe(true);
    expect(shouldNegotiate("/missing-page")).toBe(true);
    expect(shouldNegotiate("/llms.txt")).toBe(false);
    expect(shouldNegotiate("/rss.xml")).toBe(false);
    expect(shouldNegotiate("/robots.txt")).toBe(false);
    expect(shouldNegotiate("/favicon.ico")).toBe(false);
    expect(shouldNegotiate("/_astro/index.css")).toBe(false);
    expect(shouldNegotiate("/pagefind/pagefind.js")).toBe(false);
  });
});

describe("agent-friendly 404s", () => {
  it("returns HTTP 404 with a markdown recovery body", () => {
    const result = resolveAgentMarkdown("/some-path-that-does-not-exist");
    expect(result.status).toBe(404);
    expect(result.body).toContain("# 404 Not Found");
    expect(result.body).toContain("/llms.txt");
    expect(result.body).toContain("/sitemap-index.xml");
    expect(result.body).toContain("/developers");
    expect(result.body).toContain(DEVELOPER_RESOURCES_TITLE);
  });

  it("points agents at the sitemap, llms.txt, and developer resources", () => {
    const body = notFoundMarkdown("/nope");
    expect(body).toContain("https://devlinduldulao.vercel.app/llms.txt");
    expect(body).toContain(
      "https://devlinduldulao.vercel.app/sitemap-index.xml"
    );
    expect(body).toContain("https://devlinduldulao.vercel.app/developers");
  });
});

describe("markdown page representations", () => {
  it("serves homepage markdown for /", () => {
    const result = resolveAgentMarkdown("/");
    expect(result.status).toBe(200);
    expect(result.body).toContain("# Devlin Duldulao");
    expect(result.body).toContain("/llms.txt");
  });

  it("serves original markdown for a published post", () => {
    const posts = loadBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    const featured = posts.find(post => post.featured) ?? posts[0];
    const result = resolveAgentMarkdown(featured.path);
    expect(result.status).toBe(200);
    expect(result.body).toContain(featured.title);
  });

  it("resolves both the canonical slug and the filename alias", () => {
    const canonical = resolveAgentMarkdown(
      "/posts/deconstructing-the-model-context-protocol-the-lingua-franca-for-ai-agents"
    );
    const alias = resolveAgentMarkdown(
      "/posts/deconstructing-mcp-the-protocol-for-ai-agents"
    );
    expect(canonical.status).toBe(200);
    expect(alias.status).toBe(200);
    expect(canonical.body).toBe(alias.body);
  });

  it("serves developer resources markdown with the product name in the heading", () => {
    const result = resolveAgentMarkdown("/developers");
    expect(result.status).toBe(200);
    expect(result.body.startsWith(`# ${DEVELOPER_RESOURCES_TITLE}`)).toBe(true);
    expect(result.body).toContain("devlinduldulao.vercel.app");
    expect(result.body).toContain("When to use");
  });
});

describe("llms.txt when-to-use and developer resources", () => {
  it("follows llmstxt.org (H1, blockquote, H2 file lists)", () => {
    const txt = buildLlmsTxt(loadBlogPosts());
    expect(txt.startsWith("# Devlin Duldulao\n")).toBe(true);
    expect(txt).toMatch(/^> /m);
    expect(txt).toContain("## When to use this");
    expect(txt).toContain(`## ${DEVELOPER_RESOURCES_TITLE}`);
    expect(txt).toContain(
      "[Devlin Duldulao developer resources](https://devlinduldulao.vercel.app/developers)"
    );
  });

  it("names best-fit jobs and how an agent should call the site", () => {
    const txt = buildLlmsTxt(loadBlogPosts());
    expect(txt.toLowerCase()).toContain("when to use this site");
    expect(txt).toContain("Accept: text/markdown");
    expect(txt).toContain("Do not use this site as a hosted model API");
    expect(txt).toContain("MCP server");
  });

  it("lists published posts as markdown links", () => {
    const posts = loadBlogPosts();
    const txt = buildLlmsTxt(posts);
    expect(posts.length).toBeGreaterThan(3);
    for (const post of posts.slice(0, 3)) {
      expect(txt).toContain(`](https://devlinduldulao.vercel.app${post.path})`);
    }
  });

  it("keeps the developer resources page copy specific", () => {
    const md = developersMarkdown();
    expect(md).toContain(DEVELOPER_RESOURCES_TITLE);
    expect(md).toContain("How an agent should call this site");
    expect(md).toContain("There is no API key, OpenAPI surface, or webhook");
  });
});

describe("Vercel edge glob inlining", () => {
  it("keeps the agentContent glob in the shape the build patch replaces", async () => {
    const { readFile } = await import("node:fs/promises");
    const source = await readFile(
      new URL("../utils/agentContent.ts", import.meta.url),
      "utf8"
    );
    expect(
      /const rawPosts = import\.meta\.glob[\s\S]*?eager:\s*true,\s*}\);/.test(
        source
      )
    ).toBe(true);
  });
});

describe("Organization JSON-LD", () => {
  it("includes Organization, contactPoint, and PostalAddress", () => {
    expect(organizationSchema["@type"]).toBe("Organization");
    expect(organizationSchema.name).toBe("Devlin Duldulao");
    expect(organizationSchema.contactPoint["@type"]).toBe("ContactPoint");
    expect(organizationSchema.contactPoint.email).toBe(
      "devlinduldulao@gmail.com"
    );
    expect(organizationSchema.contactPoint.contactType).toBe("author");
    expect(organizationSchema.address["@type"]).toBe("PostalAddress");
    expect(organizationSchema.address.addressCountry).toBe("NO");
  });

  it("escapes < in JSON-LD script payloads", () => {
    expect(serializeJsonLd({ name: "a <script> b" })).toBe(
      '{"name":"a \\u003cscript> b"}'
    );
  });
});
