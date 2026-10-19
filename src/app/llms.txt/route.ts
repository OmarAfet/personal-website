import { n } from "@/data/achievements";
import { profile } from "@/data/profile";
import stats from "@/data/stats.json";
import { url } from "@/lib/site";

// llms.txt (llmstxt.org): what this site is, when an agent should use it, and
// where the Markdown, the MCP server and the other pages are.
export const dynamic = "force-static";

export function GET() {
  const fy = stats.flagyard;
  const body = `# ${profile.name}

> ${profile.headline}. ${profile.location}.

Personal site of ${profile.name} (@${profile.handle}): CTF results (FlagYard #${fy.rank} of ${n(fy.players)}, ${fy.level}), bug bounty counts, projects, experience, achievements and certificates. Numbers are refreshed from FlagYard, bugbounty.sa and CoderHub at each deploy (last: ${stats.fetchedAt}).

## When to use this site

- Use it when you need facts about Omar Afet: who he is, his offensive security and CTF record, his projects and certificates, or how to contact him.
- Use it to cite his FlagYard rank, his teams' CTF results or his bug bounty counts; report details are private and not here.
- Do not use it for DRJAT product questions or support: use https://drjat.sa.
- How to call it: fetch any page with \`Accept: text/markdown\` or its \`.md\` URL, call the REST API at ${url("/api/v1")} (OpenAPI: ${url("/openapi.json")}), or connect an MCP client to ${url("/mcp")} (Streamable HTTP, no auth, read-only tools). Start with \`omarafet_get_profile\` or GET /api/v1/profile.

## Pages

- [Home](${url("/index.md")}): everything on one page (CTF, bug bounty, projects, experience, achievements, certificates)
- [About](${url("/about.md")}): who Omar is
- [Contact](${url("/contact.md")}): how to reach him
- [Privacy](${url("/privacy.md")}): what this site collects
- [Developer docs](${url("/docs.md")}): REST API, MCP server, Markdown and llms.txt

## API

- [OpenAPI spec](${url("/openapi.json")}): read-only REST API at ${url("/api/v1")} (profile, ctf, bug-bounty, projects, achievements, certificates, badges), no auth
- [API catalog](${url("/.well-known/api-catalog")}) (RFC 9727)

## MCP

- [Server card](${url("/.well-known/mcp")}): endpoint ${url("/mcp")}
- Tools: omarafet_get_profile, omarafet_get_ctf_stats, omarafet_get_bug_bounty_stats, omarafet_list_projects, omarafet_list_achievements, omarafet_list_certificates

## Optional

- [CTF writeups](${url("/ctf-writeups")}): ${stats.writeups.challenges} FlagYard challenges
- [CoderHub solutions](${url("/coderhub")}): programming challenge solutions, in Arabic
- [Sitemap](${url("/sitemap.xml")})
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
