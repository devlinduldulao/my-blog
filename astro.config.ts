import { defineConfig, envField } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import partytown from "@astrojs/partytown";
import type { Plugin } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { negotiateMarkdown } from "./src/utils/negotiateMarkdown";

function acceptMarkdownDevPlugin(): Plugin {
  return {
    name: "accept-markdown-dev",
    configureServer(server) {
      server.middlewares.use(
        (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const header = req.headers.accept;
          const accept = Array.isArray(header)
            ? header.join(",")
            : (header ?? null);
          const pathname = (req.url ?? "/").split("?")[0] ?? "/";
          const result = negotiateMarkdown({
            method: req.method ?? "GET",
            pathname,
            accept,
          });
          if (!result) {
            next();
            return;
          }
          res.statusCode = result.status;
          for (const [key, value] of Object.entries(result.headers)) {
            res.setHeader(key, value);
          }
          res.end(result.body ?? "");
        }
      );
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  output: "static",
  adapter: vercel({
    middlewareMode: "edge",
  }),
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
    react(),
    partytown(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
    }),
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [acceptMarkdownDevPlugin(), tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
