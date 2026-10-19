import { profile } from "@/data/profile";

// The origin of this build. Production (and local builds) use the public
// domain; a Vercel preview build uses its own URL, so the links in llms.txt,
// the sitemap and the MCP server card resolve on the deployment being checked.
// Canonical URLs always point at the public domain (profile.url).
export const origin =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
    ? `https://${process.env.VERCEL_URL}`
    : profile.url;

export const url = (path: string) => new URL(path, origin).toString();

// Pages that have both an HTML and a Markdown representation.
export const pages = ["index", "about", "contact", "privacy", "docs"] as const;
export type Page = (typeof pages)[number];

export const pagePath = (page: Page) => (page === "index" ? "/" : `/${page}`);
