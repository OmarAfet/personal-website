import { type NextRequest, NextResponse } from "next/server";
import { MARKDOWN_HEADERS, notFound } from "@/lib/markdown";
import { negotiate } from "@/lib/negotiate";
import { type Page, pages } from "@/lib/site";

// Serves each page as HTML or Markdown from the same URL (content negotiation),
// so agents get clean text instead of the console markup (2026-10-19, for the
// is-agentic.com and acceptmarkdown.com checks):
// - `Accept: text/markdown`, `/<page>.md` or `?mode=agent` -> Markdown;
// - a path with no page -> 404, in Markdown when Markdown was asked for;
// - an Accept header that takes neither type -> 406.
// Both representations carry `Vary: Accept`.
const PAGE_BY_PATH: Record<string, Page> = Object.fromEntries(
  pages.map((page) => [page === "index" ? "/" : `/${page}`, page]),
);

function varyAccept(headers: Headers) {
  const vary = headers.get("Vary");
  if (!vary) headers.set("Vary", "Accept");
  else if (
    !vary
      .toLowerCase()
      .split(/\s*,\s*/)
      .includes("accept")
  )
    headers.set("Vary", `${vary}, Accept`);
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Next.js client navigations fetch RSC payloads with `Accept: */*`, which
  // negotiates to HTML; their rsc headers and _rsc parameter are stripped
  // before the proxy runs, so they cannot be used to tell them apart.

  if (pathname.endsWith(".md")) {
    const page =
      PAGE_BY_PATH[pathname === "/index.md" ? "/" : pathname.slice(0, -3)];
    if (!page)
      return new Response(notFound(pathname), {
        status: 404,
        headers: MARKDOWN_HEADERS,
      });
    return NextResponse.rewrite(new URL(`/md/${page}`, request.url));
  }

  const page = PAGE_BY_PATH[pathname];
  const type =
    searchParams.get("mode") === "agent"
      ? "text/markdown"
      : negotiate(request.headers.get("accept"));

  if (type === null)
    return new Response(
      "Not Acceptable\n\nAvailable: text/html, text/markdown\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      },
    );

  if (type === "text/markdown") {
    if (!page)
      return new Response(notFound(pathname), {
        status: 404,
        headers: MARKDOWN_HEADERS,
      });
    const rewritten = NextResponse.rewrite(new URL(`/md/${page}`, request.url));
    varyAccept(rewritten.headers);
    return rewritten;
  }

  const response = NextResponse.next();
  varyAccept(response.headers);
  return response;
}

// The matcher must be a literal: Next.js reads it at build time.
export const config = {
  matcher: [
    {
      // Page paths (no file extension), minus Next internals, routes with
      // their own handlers and the two zones served by other apps. Browsers
      // send `Accept: text/html,…`, which always negotiates to HTML, so they
      // skip the proxy and its cost on the first byte (about 40 ms on
      // Vercel, 2026-10-19); agents, curl and `*/*` come here. Next.js adds
      // an optional `.json` suffix to every matcher, so /openapi.json would
      // match as the page /openapi; it and /api (no slash) are excluded by
      // name, or `Accept: application/json` gets a 406.
      source:
        "/((?!_next/|_vercel/|md/|mcp|api(?:/|$)|openapi\\.json|\\.well-known/|ctf-writeups|coderhub)[^.]*)",
      missing: [{ type: "header", key: "accept", value: "text/html,.*" }],
    },
    // The .md twins.
    "/(.*\\.md)",
  ],
};
