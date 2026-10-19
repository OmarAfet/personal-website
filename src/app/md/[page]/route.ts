import { MARKDOWN_HEADERS, markdown } from "@/lib/markdown";
import { type Page, pages } from "@/lib/site";

// The Markdown twin of each page. The proxy rewrites `Accept: text/markdown`
// requests and `/<page>.md` URLs here; built once, served from the CDN.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({ page }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ page: string }> },
) {
  const { page } = await params;
  return new Response(markdown(page as Page), {
    headers: {
      ...MARKDOWN_HEADERS,
      "Cache-Control": "public, max-age=0, s-maxage=31536000, must-revalidate",
    },
  });
}
