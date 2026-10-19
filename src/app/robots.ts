import type { MetadataRoute } from "next";
import { url } from "@/lib/site";

// Every crawler, search and AI alike, may read every page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: url("/sitemap.xml"),
  };
}
