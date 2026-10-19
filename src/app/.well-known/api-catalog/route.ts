import { API_BASE } from "@/lib/api";
import { url } from "@/lib/site";

// RFC 9727 API catalog: where the API is and where its description lives.
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      linkset: [
        {
          anchor: url(API_BASE),
          "service-desc": [
            { href: url("/openapi.json"), type: "application/openapi+json" },
          ],
          "service-doc": [{ href: url("/docs"), type: "text/html" }],
        },
        {
          anchor: url("/mcp"),
          "service-desc": [
            { href: url("/.well-known/mcp"), type: "application/json" },
          ],
          "service-doc": [{ href: url("/docs"), type: "text/html" }],
        },
      ],
    },
    {
      headers: {
        "Content-Type":
          'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
