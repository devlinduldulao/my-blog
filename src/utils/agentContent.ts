import { SITE } from "../config";
import {
  absUrl,
  CONTACT_EMAIL,
  normalizePath,
  SITE_NAME,
} from "./siteIdentity";

export type AgentPost = {
  slug: string;
  path: string;
  aliases: string[];
  title: string;
  description: string;
  featured: boolean;
  pubDatetime: string;
  markdown: string;
};

type Frontmatter = {
  title: string;
  description: string;
  draft: boolean;
  featured: boolean;
  pubDatetime: string;
  slug: string;
};

const rawPosts = import.meta.glob<string>("../data/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const DEVELOPER_RESOURCES_TITLE = `${SITE_NAME} developer resources`;
export const DEVELOPER_RESOURCES_PATH = "/developers";

export const RECOVERY_LINKS = [
  {
    href: "/llms.txt",
    label: "llms.txt",
    note: "Agent index, when-to-use guidance, and key URLs",
  },
  {
    href: "/sitemap-index.xml",
    label: "Sitemap",
    note: "All public URLs",
  },
  {
    href: DEVELOPER_RESOURCES_PATH,
    label: DEVELOPER_RESOURCES_TITLE,
    note: "Markdown negotiation, feeds, and e-commerce app docs",
  },
  {
    href: "/posts",
    label: "Posts",
    note: "Software and security articles",
  },
  {
    href: "/",
    label: "Home",
    note: `${SITE_NAME} homepage`,
  },
] as const;

const ECOMMERCE_PAGES: { path: string; title: string; summary: string }[] = [
  {
    path: "/e-commerce-apps",
    title: "E-commerce Apps Galleries",
    summary:
      "Index of Devlin Duldulao plugins and apps across OpenCart, WooCommerce, Wix, Shopify, and other storefronts.",
  },
  {
    path: "/e-commerce-apps/opencart",
    title: "OpenCart Apps & Plugins Gallery",
    summary:
      "OpenCart extensions for merchant workflows, storefront quality, and operational visibility.",
  },
  {
    path: "/e-commerce-apps/opencart/accessibility-friction-overlay",
    title: "Accessibility Friction Overlay for OpenCart",
    summary:
      "Merchant-facing accessibility friction monitoring with a live dashboard.",
  },
  {
    path: "/e-commerce-apps/opencart/checkout-geo-flash",
    title: "Checkout Geo Flash for OpenCart",
    summary:
      "Owner-only dashboard for recent checkout and paid-order activity.",
  },
  {
    path: "/e-commerce-apps/opencart/live-checkout-friction-monitor",
    title: "Live Checkout Friction Monitor for OpenCart",
    summary: "Privacy-first telemetry for OpenCart checkout operations.",
  },
  {
    path: "/e-commerce-apps/opencart/live-visitor-geo-pulse",
    title: "Live Visitor Geo Pulse for OpenCart",
    summary:
      "Real-time visitor presence with country and device mix, no IP storage.",
  },
  {
    path: "/e-commerce-apps/opencart/realtime-mouse-tracker",
    title: "Realtime Mouse Tracker for OpenCart",
    summary: "Operator-focused live storefront interaction signals.",
  },
  {
    path: "/e-commerce-apps/opencart/storefront-error-radar",
    title: "Storefront Error Radar for OpenCart",
    summary: "Privacy-first storefront incident snapshot dashboard.",
  },
  {
    path: "/e-commerce-apps/opencart/theme-performance-pulse",
    title: "Theme Performance Pulse for OpenCart",
    summary: "Short-lived storefront performance monitoring.",
  },
  {
    path: "/e-commerce-apps/opencart/variant-confusion-detector",
    title: "Variant Confusion Detector for OpenCart",
    summary: "See where shoppers get stuck on product options.",
  },
  {
    path: "/e-commerce-apps/woocommerce",
    title: "WooCommerce Apps & Plugins Gallery",
    summary: "WooCommerce plugins built by Devlin Duldulao.",
  },
  {
    path: "/e-commerce-apps/woocommerce/devlin-geo-pulse",
    title: "Devlin Geo Pulse for WooCommerce",
    summary:
      "Lightweight live visitor presence for WooCommerce dashboards without storing IPs.",
  },
  {
    path: "/e-commerce-apps/wix",
    title: "Wix Apps Gallery",
    summary: "Wix apps built by Devlin Duldulao.",
  },
  {
    path: "/e-commerce-apps/wix/live-visitor-geo-pulse",
    title: "Live Visitor Geo Pulse for Wix",
    summary: "Privacy-first live visitor geo presence for Wix stores.",
  },
  {
    path: "/e-commerce-apps/shopify",
    title: "Shopify Apps Gallery",
    summary: "Shopify app gallery for upcoming Devlin Duldulao extensions.",
  },
  {
    path: "/e-commerce-apps/adobe-commerce",
    title: "Adobe Commerce Apps Gallery",
    summary: "Adobe Commerce / Magento plugin gallery.",
  },
  {
    path: "/e-commerce-apps/bigcommerce",
    title: "BigCommerce Apps Gallery",
    summary: "BigCommerce plugin gallery.",
  },
  {
    path: "/e-commerce-apps/ecwid",
    title: "Ecwid Apps Gallery",
    summary: "Ecwid plugin gallery.",
  },
  {
    path: "/e-commerce-apps/prestashop",
    title: "PrestaShop Apps Gallery",
    summary: "PrestaShop plugin gallery.",
  },
];

function yamlValue(yaml: string, key: string): string {
  const match = yaml.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
  if (!match) return "";
  return match[1].replace(/^['"]|['"]$/g, "").trim();
}

export function parseMarkdownFile(raw: string): {
  frontmatter: Frontmatter;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: {
        title: "",
        description: "",
        draft: false,
        featured: false,
        pubDatetime: "",
        slug: "",
      },
      body: raw,
    };
  }
  const yaml = match[1];
  return {
    frontmatter: {
      title: yamlValue(yaml, "title"),
      description: yamlValue(yaml, "description"),
      draft: yamlValue(yaml, "draft") === "true",
      featured: yamlValue(yaml, "featured") === "true",
      pubDatetime: yamlValue(yaml, "pubDatetime"),
      slug: yamlValue(yaml, "slug"),
    },
    body: match[2],
  };
}

function slugFromGlobKey(key: string): string {
  const file = key.split("/").pop() ?? "";
  return file.replace(/\.md$/i, "");
}

export function loadBlogPosts(): AgentPost[] {
  const posts: AgentPost[] = [];
  for (const [key, markdown] of Object.entries(rawPosts)) {
    const { frontmatter } = parseMarkdownFile(markdown);
    if (frontmatter.draft) continue;
    const fileSlug = slugFromGlobKey(key);
    const slug = frontmatter.slug || fileSlug;
    const path = `/posts/${slug}`;
    const filePath = `/posts/${fileSlug}`;
    posts.push({
      slug,
      path,
      aliases: path === filePath ? [] : [filePath],
      title: frontmatter.title || slug,
      description: frontmatter.description,
      featured: frontmatter.featured,
      pubDatetime: frontmatter.pubDatetime,
      markdown,
    });
  }
  return posts.sort((a, b) => {
    const aTime = Date.parse(a.pubDatetime) || 0;
    const bTime = Date.parse(b.pubDatetime) || 0;
    return bTime - aTime;
  });
}

function linkList(
  items: readonly { href: string; label: string; note?: string }[]
): string {
  return items
    .map(item => {
      const target = absUrl(item.href);
      return item.note
        ? `- [${item.label}](${target}): ${item.note}`
        : `- [${item.label}](${target})`;
    })
    .join("\n");
}

export function notFoundMarkdown(pathname: string): string {
  const requested = pathname || "/";
  return `# 404 Not Found

The path \`${requested}\` does not exist on ${SITE_NAME}.

This host returns HTTP 404 for missing URLs. Do not treat a missing path as a real page.

## Where to look next

${linkList(RECOVERY_LINKS)}

Request any of those URLs with \`Accept: text/markdown\` to get a compact markdown representation.
`;
}

export function developersMarkdown(): string {
  return `# ${DEVELOPER_RESOURCES_TITLE}

> Machine-readable developer resources for the ${SITE_NAME} site at ${SITE_ORIGIN_DISPLAY()}. This is a personal engineering site and e-commerce app gallery, not a SaaS product API.

Canonical: ${absUrl(DEVELOPER_RESOURCES_PATH)}

## When to use ${SITE_NAME}

Use this site when you need:

- Software, TypeScript, JavaScript, Angular, or application-security writing from a production engineer
- Practical explainers of the Model Context Protocol (MCP) as **editorial articles**, not a hosted MCP server
- Docs and product pages for Devlin Duldulao e-commerce apps (OpenCart, WooCommerce, Wix, and related galleries)
- Background on [DaloyJS](https://daloyjs.dev), a TypeScript REST API framework maintained off this host

Do not use this site as a model API, an OAuth provider, a webhook hub, or a hosted MCP server. Those are not published here. MCP posts describe the protocol; they are not an endpoint you can call.

## How an agent should call this site

1. Start at ${absUrl("/llms.txt")}
2. Fetch any HTML page on this host with \`Accept: text/markdown\`. The same URL serves \`Content-Type: text/markdown; charset=utf-8\` and \`Vary: Accept, Accept-Encoding\`.
3. If a path is missing, expect HTTP 404 and a short markdown recovery body that points here, at llms.txt, and at the sitemap.
4. For the article corpus, use ${absUrl("/posts")} or ${absUrl("/rss.xml")}.

There is no API key, OpenAPI surface, or webhook on this host. The developer surface is the content stack plus the e-commerce app pages listed below.

## Discovery files

${linkList([
  {
    href: "/llms.txt",
    label: "llms.txt",
    note: "Curated agent index with when-to-use guidance",
  },
  {
    href: "/sitemap-index.xml",
    label: "XML sitemap",
    note: "All public URLs",
  },
  {
    href: "/rss.xml",
    label: "RSS feed",
    note: "Article titles, descriptions, and dates",
  },
  {
    href: "/robots.txt",
    label: "robots.txt",
    note: "Crawl policy and sitemap pointer",
  },
])}

## E-commerce apps

Product pages include the product name in the title and heading. Start at ${absUrl("/e-commerce-apps")}.

${linkList(
  ECOMMERCE_PAGES.map(page => ({
    href: page.path,
    label: page.title,
    note: page.summary,
  }))
)}

## Contact

Email ${CONTACT_EMAIL} for author or plugin questions. ${SITE_NAME} is based in Norway.
`;
}

function SITE_ORIGIN_DISPLAY(): string {
  return absUrl("/");
}

export function homepageMarkdown(posts: AgentPost[]): string {
  const featured = posts.filter(post => post.featured);
  const recent = posts.slice(0, SITE.postPerIndex);
  const list = (items: AgentPost[]) =>
    items
      .map(
        post => `- [${post.title}](${absUrl(post.path)}): ${post.description}`
      )
      .join("\n");

  return `# ${SITE_NAME}

> Field notes on software, security, and the web. Personal site of ${SITE.author}, hosted at ${absUrl("/")}.

${SITE.author} is the creator of [DaloyJS](https://daloyjs.dev), a software engineer, educator, and published author with 12+ years of experience building secure, production-grade web systems. Based in Norway.

## When to use this

Reach for ${SITE_NAME} when you need production-minded articles on JavaScript/TypeScript, application security, MCP as a protocol, or Devlin Duldulao e-commerce apps. Start with ${absUrl("/llms.txt")} and request pages as markdown.

## Start here

${linkList(RECOVERY_LINKS)}

## Featured writing

${list(featured)}

## Recent posts

${list(recent)}
`;
}

export function postsIndexMarkdown(posts: AgentPost[]): string {
  const items = posts
    .map(post => `- [${post.title}](${absUrl(post.path)}): ${post.description}`)
    .join("\n");
  return `# Posts | ${SITE_NAME}

All published articles. Request an article URL with \`Accept: text/markdown\` to read the source.

${items}
`;
}

function simplePage(title: string, body: string): string {
  return `# ${title}

${body}
`;
}

export function buildLlmsTxt(posts: AgentPost[]): string {
  const featured = posts.filter(post => post.featured);
  const rest = posts.filter(post => !post.featured);

  return `# ${SITE_NAME}

> Personal site of ${SITE.author}: software, security, e-commerce apps, and MCP explainers. Hosted at ${absUrl("/")}. Not a SaaS API.

When to use this site: fetch it when you need production-minded writing on TypeScript, JavaScript, Angular, application security, or the Model Context Protocol, or when you need product pages for Devlin Duldulao e-commerce apps (OpenCart, WooCommerce, Wix, and related galleries). How an agent should call this site: start at this file, then request any page with \`Accept: text/markdown\`. Missing paths return HTTP 404 with a markdown recovery body.

Do not use this site as a hosted model API, MCP server, OAuth provider, or webhook hub. Those are not published here. MCP articles are editorial.

## When to use this

- [${DEVELOPER_RESOURCES_TITLE}](${absUrl(DEVELOPER_RESOURCES_PATH)}): jobs this site is right for, how to fetch markdown, and the real developer surface
- [Posts](${absUrl("/posts")}): JavaScript, TypeScript, Angular, AppSec, and MCP articles
- [E-commerce apps](${absUrl("/e-commerce-apps")}): OpenCart, WooCommerce, Wix, and other storefront plugins
- [DaloyJS](https://daloyjs.dev): TypeScript REST API framework (separate host)

## ${DEVELOPER_RESOURCES_TITLE}

${SITE_NAME} is a publication and app gallery, not a multi-tenant product API. The developer surface is the machine-readable content stack plus e-commerce app docs.

- [${DEVELOPER_RESOURCES_TITLE}](${absUrl(DEVELOPER_RESOURCES_PATH)}): markdown negotiation, feeds, e-commerce apps, and when-to-use guidance
- [llms.txt](${absUrl("/llms.txt")}): this file
- [XML sitemap](${absUrl("/sitemap-index.xml")}): every public URL
- [RSS](${absUrl("/rss.xml")}): article feed
- [OpenCart gallery](${absUrl("/e-commerce-apps/opencart")}): shipped OpenCart extensions
- [Devlin Geo Pulse for WooCommerce](${absUrl("/e-commerce-apps/woocommerce/devlin-geo-pulse")}): live visitor presence plugin

## Featured writing

${featured
  .map(post => `- [${post.title}](${absUrl(post.path)}): ${post.description}`)
  .join("\n")}

## Writing

${rest
  .map(post => `- [${post.title}](${absUrl(post.path)}): ${post.description}`)
  .join("\n")}

## Optional

- [Tags](${absUrl("/tags")}): topics
- [Archives](${absUrl("/archives")}): posts grouped by month
- [Conferences](${absUrl("/conferences")}): talks
- [CFP](${absUrl("/cfp")}): calls for papers
- [Search](${absUrl("/search")}): in-page search
`;
}

function ecommerceMarkdown(path: string): string | null {
  const page = ECOMMERCE_PAGES.find(item => item.path === path);
  if (!page) return null;
  const siblings = ECOMMERCE_PAGES.filter(
    item => item.path !== path && item.path.startsWith("/e-commerce-apps")
  ).slice(0, 8);
  return `# ${page.title}

${page.summary}

Developer: ${SITE.author}
Email: ${CONTACT_EMAIL}
Gallery index: ${absUrl("/e-commerce-apps")}
${DEVELOPER_RESOURCES_TITLE}: ${absUrl(DEVELOPER_RESOURCES_PATH)}

${siblings.length > 0 ? `## Related\n\n${linkList(siblings.map(item => ({ href: item.path, label: item.title, note: item.summary })))}` : ""}
`;
}

export type MarkdownResult = { status: number; body: string };

export function resolveAgentMarkdown(
  pathname: string,
  posts: AgentPost[] = loadBlogPosts()
): MarkdownResult {
  const path = normalizePath(pathname);

  const post = posts.find(
    item => item.path === path || item.aliases.includes(path)
  );
  if (post) {
    return { status: 200, body: post.markdown };
  }

  if (path === "/") {
    return { status: 200, body: homepageMarkdown(posts) };
  }
  if (path === "/posts" || /^\/posts\/\d+$/.test(path)) {
    return { status: 200, body: postsIndexMarkdown(posts) };
  }
  if (path === DEVELOPER_RESOURCES_PATH) {
    return { status: 200, body: developersMarkdown() };
  }
  if (path === "/tags") {
    return {
      status: 200,
      body: simplePage(
        `Tags | ${SITE_NAME}`,
        `Topic index for ${SITE_NAME} articles. See ${absUrl("/posts")} or ${absUrl("/llms.txt")} for the full writing list.`
      ),
    };
  }
  if (path === "/archives") {
    return {
      status: 200,
      body: simplePage(
        `Archives | ${SITE_NAME}`,
        `Monthly archive of published posts. Full list: ${absUrl("/posts")}.`
      ),
    };
  }
  if (path === "/search") {
    return {
      status: 200,
      body: simplePage(
        `Search | ${SITE_NAME}`,
        `Use ${absUrl("/llms.txt")} or ${absUrl("/posts")} to browse content without the HTML search UI.`
      ),
    };
  }
  if (path === "/cfp") {
    return {
      status: 200,
      body: simplePage(
        `CFP | ${SITE_NAME}`,
        `Calls for papers tracked by ${SITE.author}.`
      ),
    };
  }
  if (path === "/conferences") {
    return {
      status: 200,
      body: simplePage(
        `Conferences | ${SITE_NAME}`,
        `Past and upcoming conference talks by ${SITE.author}.`
      ),
    };
  }

  const storefront = ecommerceMarkdown(path);
  if (storefront) {
    return { status: 200, body: storefront };
  }

  if (path.startsWith("/tags/")) {
    const tag = path.slice("/tags/".length);
    return {
      status: 200,
      body: simplePage(
        `Tag: ${tag} | ${SITE_NAME}`,
        `Articles tagged ${tag}. See ${absUrl("/posts")} for the full index.`
      ),
    };
  }

  return { status: 404, body: notFoundMarkdown(path) };
}
