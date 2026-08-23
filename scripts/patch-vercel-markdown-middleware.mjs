import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, ".vercel/output/config.json");
const middlewareDir = path.join(
  root,
  ".vercel/output/functions/_middleware.func"
);
const middlewareFile = path.join(middlewareDir, "middleware.mjs");
const vcConfigFile = path.join(middlewareDir, ".vc-config.json");
const entry = path.join(root, "src/vercel-edge-markdown.ts");

if (!existsSync(configPath)) {
  process.exit(0);
}

mkdirSync(middlewareDir, { recursive: true });

const blogDir = path.join(root, "src/data/blog");
const blogFiles = readdirSync(blogDir).filter(name => name.endsWith(".md"));
const rawPostEntries = blogFiles
  .map(name => {
    const body = readFileSync(path.join(blogDir, name), "utf8");
    return `${JSON.stringify(`../data/blog/${name}`)}: ${JSON.stringify(body)}`;
  })
  .join(",\n");

await esbuild.build({
  absWorkingDir: root,
  entryPoints: [entry],
  outfile: middlewareFile,
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "esnext",
  conditions: ["edge-light", "worker", "browser"],
  legalComments: "none",
  plugins: [
    {
      name: "inline-blog-glob",
      setup(build) {
        build.onLoad({ filter: /agentContent\.ts$/ }, args => {
          const source = readFileSync(args.path, "utf8");
          const contents = source.replace(
            /const rawPosts = import\.meta\.glob[\s\S]*?eager:\s*true,\s*}\);/,
            `const rawPosts = {${rawPostEntries}};`
          );
          return { contents, loader: "ts" };
        });
      },
    },
  ],
});

writeFileSync(
  vcConfigFile,
  `${JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "middleware.mjs",
    },
    null,
    "\t"
  )}\n`
);

const config = JSON.parse(readFileSync(configPath, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
const already = routes.some(
  route =>
    route &&
    route.middlewarePath === "_middleware" &&
    route.continue === true
);
if (!already) {
  routes.unshift({
    src: "/(.*)",
    middlewarePath: "_middleware",
    continue: true,
  });
  config.routes = routes;
  writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
}
