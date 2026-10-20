import { n, ordinal } from "./achievements";
import { interests, links, profile } from "./profile";
import stats from "./stats.json";

// The /about, /contact, /privacy and /docs pages. One source for both the
// HTML page and its Markdown twin. They exist for people and for agents that
// check a site's trust pages (about, contact, privacy: 500+ characters each).
export type Block =
  | { p: string }
  | { h: string }
  | { list: { text: string; href?: string }[] }
  | { code: string };

export type Doc = {
  title: string;
  description: string;
  blocks: Block[];
};

const fy = stats.flagyard;
const bb = stats.bugbounty;
const labs = fy.labs.reduce(
  (t, l) => ({ solved: t.solved + l.solved, all: t.all + l.challenges }),
  { solved: 0, all: 0 },
);
const [bhmea, madar] = fy.events;
const link = (name: string) => links.find((l) => l.name === name)!;

const about: Doc = {
  title: "About Omar Afet",
  description: `${profile.name}: ${profile.headline}. Riyadh, Saudi Arabia.`,
  blocks: [
    {
      p: `${profile.name} is an offensive security practitioner and CTF player from Riyadh, Saudi Arabia, and the founder and CEO of DRJAT, an AI exam-preparation platform for the Saudi Qiyas tests.`,
    },
    {
      p: `On FlagYard he ranks #${fy.rank} of ${n(fy.players)} players at ${fy.level} level, with ${n(fy.points)} points, and has solved ${labs.solved} of the ${labs.all} open lab challenges.${
        bhmea && madar
          ? ` In 2026 he captained team ${bhmea.team} to ${ordinal(bhmea.rank)} of ${n(bhmea.teams)} teams in the ${bhmea.name} ${bhmea.stage.toLowerCase()}, and his team ${madar.team} placed ${ordinal(madar.rank)} of ${n(madar.teams)} in the ${madar.name} ${madar.stage.toLowerCase()}.`
          : ""
      }`,
    },
    {
      p: `On bugbounty.sa he is a verified researcher with ${bb.valid} valid findings (${Object.entries(
        bb.severity,
      )
        .map(([level, count]) => `${count} ${level}`)
        .join(", ")}).`,
    },
    {
      p: "He holds a Bachelor of Applied Computing from King Saud University and completed the COOP training program at SDAIA, the Saudi Data & AI Authority, in 2026.",
    },
    {
      p: "He builds in Python, Rust and TypeScript: AI products such as Reqab, Isnad and Daqeeqah, systems such as the Obsidium Minecraft server, and DRJAT itself.",
    },
    { p: `Interests: ${interests.join(", ")}.` },
  ],
};

const contact: Doc = {
  title: "Contact Omar Afet",
  description:
    "How to reach Omar Afet: direct messages on X, LinkedIn and GitHub.",
  blocks: [
    {
      p: "Omar Afet reads direct messages on these accounts, in Arabic or English:",
    },
    {
      list: [
        { text: `X: @${profile.handle}`, href: link("x").href },
        { text: "LinkedIn: in/omarafet", href: link("linkedin").href },
        {
          text: "GitHub: OmarAfet (for code, open an issue on the public repository)",
          href: link("github").href,
        },
      ],
    },
    {
      p: "For DRJAT accounts, subscriptions and payments, write to DRJAT support at support@drjat.sa. That is the company's support desk, not Omar's personal inbox.",
    },
    {
      p: `CTF teams and event organisers can find him on FlagYard as ${fy.username}. His other profiles are listed on the home page, in the output of cat ~/.links.`,
    },
    {
      p: "He does not publish a personal email address or phone number on this site. Location: Riyadh, Saudi Arabia (UTC+3).",
    },
  ],
};

const privacy: Doc = {
  title: "Privacy",
  description:
    "What omarafet.vercel.app collects: anonymous page views, no cookies.",
  blocks: [
    {
      p: "This site has no accounts, forms, comments or cookies, and it loads no third-party scripts, fonts or images.",
    },
    { h: "Analytics" },
    {
      p: "Page views are counted with Vercel Web Analytics. It sets no cookies: Vercel identifies a visit by a hash of the request and discards it after 24 hours. A page view may record the time, the page URL, the referrer, filtered query parameters, an approximate location (country, region, city), the device type, the operating system and the browser. Vercel states that these data points are anonymous and not tied to an IP address.",
    },
    { h: "Hosting" },
    {
      p: "Vercel hosts the site and handles each request, including the IP address it comes from, to deliver it. Vercel's privacy policy covers that processing.",
    },
    { h: "The shell and the MCP server" },
    {
      p: "The shell at the end of the home page runs in your browser; what you type there is not sent anywhere. The MCP server at /mcp is read-only and keeps no record of what you send to it.",
    },
    { h: "Other sites" },
    {
      p: "Links to other sites (X, LinkedIn, GitHub, FlagYard, bugbounty.sa, drjat.sa) are covered by those sites' own privacy policies. For questions, message @OmarAfet on X or LinkedIn.",
    },
    { p: `Last updated: ${stats.fetchedAt}.` },
  ],
};

const tools = [
  "omarafet_get_profile: who Omar is, experience, education, interests, links",
  "omarafet_get_ctf_stats: FlagYard rank, labs, CTF event results",
  "omarafet_get_bug_bounty_stats: valid findings by severity",
  "omarafet_list_projects: projects, filter by tag (security, ai, rust ...)",
  "omarafet_list_achievements: results and events, filter by section",
  "omarafet_list_certificates: certificates, filter by folder",
];

const docs: Doc = {
  title: "Developer docs: REST API, MCP server and Markdown",
  description:
    "How programs and agents read omarafet.vercel.app: a read-only REST API with an OpenAPI spec, an MCP server, Markdown pages and llms.txt.",
  blocks: [
    {
      p: "Everything here is public and read-only. Authentication: none, so there is no API key and no sign-in. Responses allow any origin (CORS).",
    },
    { h: "REST API" },
    {
      p: "Base URL: https://omarafet.vercel.app/api/v1. OpenAPI 3.1 spec: /openapi.json. API catalog (RFC 9727): /.well-known/api-catalog. Every endpoint is GET.",
    },
    {
      list: [
        { text: "/api/v1/profile: who Omar is, roles, interests, links" },
        { text: "/api/v1/ctf: FlagYard rank, labs, CTF event results" },
        { text: "/api/v1/bug-bounty: valid findings by severity" },
        { text: "/api/v1/projects: projects, ?tag= (security, ai, rust ...)" },
        { text: "/api/v1/achievements: results and events, ?section=" },
        { text: "/api/v1/certificates: certificates, ?folder=" },
        { text: "/api/v1/badges: FlagYard and Tuwaiq badges" },
      ],
    },
    {
      p: "Lists are paginated: ?limit= (1 to 100, default 50) and ?cursor= from next_cursor; a Link header with rel=next points to the next page. Versioning: the version is in the path; a breaking change would go to /api/v2, and /api/v1 keeps its shape.",
    },
    { code: "curl https://omarafet.vercel.app/api/v1/projects?tag=security" },
    { h: "Errors" },
    {
      p: "API errors are application/problem+json (RFC 9457) with a code and a hint: not_found (404), invalid_parameter (400), invalid_cursor (400), method_not_allowed (405: the API is read-only).",
    },
    { h: "Markdown" },
    {
      p: "Request any page with `Accept: text/markdown`, or add `.md` to its path: /index.md, /about.md, /contact.md, /privacy.md, /docs.md. Responses carry `Vary: Accept`. A request that accepts neither HTML nor Markdown gets 406.",
    },
    { code: "curl -H 'Accept: text/markdown' https://omarafet.vercel.app/" },
    { h: "llms.txt and sitemap" },
    {
      p: "/llms.txt lists the pages and says when to use this site. /sitemap.xml lists every page.",
    },
    { h: "MCP server" },
    {
      p: "Endpoint: /mcp (Streamable HTTP, JSON responses, stateless, no auth). Server card: /.well-known/mcp. Protocol versions: 2025-11-25, 2025-06-18, 2025-03-26. Every tool is read-only.",
    },
    { list: tools.map((text) => ({ text })) },
    {
      p: "Resources: the Markdown version of each page. Numbers come from FlagYard, bugbounty.sa and CoderHub, refreshed at each deploy.",
    },
    {
      code: "claude mcp add --transport http omarafet https://omarafet.vercel.app/mcp",
    },
    {
      code: `curl -s https://omarafet.vercel.app/mcp -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"omarafet_get_ctf_stats","arguments":{}}}'`,
    },
  ],
};

export const docsByPage = { about, contact, privacy, docs };
