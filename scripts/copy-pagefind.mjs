import { cpSync, existsSync } from "node:fs";

if (!existsSync("dist/pagefind")) {
  throw new Error(
    "dist/pagefind is missing. Run `pagefind --site dist` before this script."
  );
}

cpSync("dist/pagefind", "public/pagefind", { recursive: true });

if (existsSync(".vercel/output/static")) {
  cpSync("dist/pagefind", ".vercel/output/static/pagefind", {
    recursive: true,
  });
}
