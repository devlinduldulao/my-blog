import { SITE } from "../config";

export const SITE_ORIGIN = SITE.website.replace(/\/$/, "");
export const SITE_NAME = SITE.title;
export const CONTACT_EMAIL = "devlinduldulao@gmail.com";

export const SAME_AS = [
  "https://github.com/devlinduldulao/",
  "https://x.com/devlinduldulao",
  "https://www.linkedin.com/in/devlinduldulao/",
] as const;

export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function normalizePath(pathname: string): string {
  let path = pathname || "/";
  try {
    path = decodeURIComponent(path);
  } catch {
    // Keep the raw path if it is not valid URI encoding.
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}
