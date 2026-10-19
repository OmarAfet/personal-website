import type { MetadataRoute } from "next";
import stats from "@/data/stats.json";
import { pagePath, pages, url } from "@/lib/site";

// Every page of this app, plus the CoderHub zone. The ctf-writeups zone is
// left out: its pages are placeholders and marked noindex for now.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = stats.fetchedAt;
  return [
    ...pages.map((page) => ({
      url: url(pagePath(page)),
      lastModified,
      priority: page === "index" ? 1 : 0.5,
    })),
    { url: url("/coderhub"), lastModified, priority: 0.3 },
  ];
}
