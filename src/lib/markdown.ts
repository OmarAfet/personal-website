import { achievements, n, ordinal } from "@/data/achievements";
import { badges } from "@/data/badges";
import { certificates, satr, tuwaiqProfile } from "@/data/certificates";
import { sessions } from "@/data/experience";
import { type Block, type Doc, docsByPage } from "@/data/pages";
import { interests, links, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import stats from "@/data/stats.json";
import { type Page, pagePath, url } from "./site";

// The Markdown representation of each page, for agents (content negotiation,
// the .md URLs, the MCP resources). Same data as the HTML, no console styling.

const abs = (href: string) => (href.startsWith("/") ? url(href) : href);
const md = (text: string, href?: string) =>
  href ? `[${text}](${abs(href)})` : text;

function frontMatter(title: string, description: string, path: string) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `url: ${url(path)}`,
    `updated: ${stats.fetchedAt}`,
    "---",
    "",
  ].join("\n");
}

const footer = () =>
  [
    "---",
    "",
    `For agents: [llms.txt](${url("/llms.txt")}) · [developer docs](${url("/docs.md")}) · MCP server ${url("/mcp")} · [sitemap](${url("/sitemap.xml")})`,
    "",
  ].join("\n");

function home() {
  const fy = stats.flagyard;
  const bb = stats.bugbounty;
  const d = fy.byDifficulty;
  const severity = Object.entries(bb.severity)
    .map(([level, count]) => `${count} ${level}`)
    .join(", ");
  const out: string[] = [
    frontMatter(`${profile.name}: ${profile.headline}`, profile.headline, "/"),
    `# ${profile.name}`,
    "",
    `${profile.headline}. ${profile.location}.`,
    "",
    "## Summary",
    "",
    ...sessions.map(
      (s) => `- ${md(s.role, s.href)}: ${s.from} – ${s.to ?? "present"}`,
    ),
    `- FlagYard: #${fy.rank} of ${n(fy.players)} players, ${fy.level}, ${n(fy.points)} points`,
    `- bugbounty.sa: ${bb.valid} valid findings (${severity}), verified researcher`,
    "",
    "## CTF (FlagYard)",
    "",
    `- Profile: ${md(fy.username, fy.url)}`,
    `- Rank: #${fy.rank} of ${n(fy.players)} players · level ${fy.level} · ${n(fy.points)} points · ${fy.firstBloods} first blood(s)`,
    `- Solved by difficulty: easy ${d.easy}, medium ${d.medium}, hard ${d.hard}, insane ${d.insane}`,
    "",
    "| Lab | Solved | Points |",
    "| --- | --- | --- |",
    ...fy.labs.map(
      (l) =>
        `| ${l.name} | ${l.solved}/${l.challenges}${l.solved === l.challenges ? " (cleared)" : ""} | ${n(l.points)} |`,
    ),
    "",
    "Retired challenges, which nobody can solve now, are left out.",
    "",
    "### Events",
    "",
    ...fy.events.map(
      (e) =>
        `- ${md(`${e.name} · ${e.stage}`, e.url)} (${e.end}): ${ordinal(e.rank)} of ${n(e.teams)} teams · team ${e.team}${e.captain ? " (captain)" : ""} · ${e.teamSolves} of ${e.challenges} solved · mine: ${e.mySolves} solves, ${n(e.myPoints)} of ${n(e.points)} points${e.myFirstBloods ? `, ${e.myFirstBloods} first blood(s)` : ""}`,
    ),
    "",
    `Writeups: ${stats.writeups.challenges} challenges, ${stats.writeups.solved} solved, at ${md("/ctf-writeups", "/ctf-writeups")}.`,
    "",
    "## Bug bounty (bugbounty.sa)",
    "",
    `${bb.valid} valid findings (${severity}). Report details are private, as the programs require.`,
    "",
    "## Projects",
    "",
    ...projects.map((p) => {
      const linksOut = [p.href, p.code]
        .filter((u): u is string => !!u)
        .map((u) => md(u.replace(/^https?:\/\//, ""), u))
        .join(", ");
      return `- **${p.service}** (${p.year}, ${p.state === "open" ? "public" : p.state === "filtered" ? "private" : "archived or offline"}; ${p.version}): ${p.title}${p.note ? ` ${p.note}.` : ""}${linksOut ? ` ${linksOut}` : ""}`;
    }),
    "",
    "## Achievements",
    "",
    ...achievements.flatMap(({ section, items }) => [
      `### ${section}`,
      "",
      ...items.map((a) => `- ${md(a.what, a.href)}: ${a.result} (${a.when})`),
      "",
    ]),
    "## Certificates",
    "",
    ...certificates.flatMap(({ dir, files }) => [
      `### ${dir}`,
      "",
      ...files.map((c) => `- ${md(c.name, c.href)} (${c.issuer}, ${c.date})`),
      "",
    ]),
    `### tuwaiq-satr (${satr.length} courses, ${md("profile", tuwaiqProfile)})`,
    "",
    satr.map((c) => c.name).join(", "),
    "",
    "## Badges",
    "",
    ...badges.map((b) => `- ${b.dir}: ${[...b.names].sort().join(", ")}`),
    "",
    "## Interests",
    "",
    interests.join(", "),
    "",
    "## CoderHub",
    "",
    ...Object.entries(stats.coderhub.solved).map(
      ([lang, solved]) =>
        `- ${lang}: ${solved} of ${stats.coderhub.challenges} challenges solved`,
    ),
    `- Solutions: ${md("/coderhub", "/coderhub")}`,
    "",
    "## Links",
    "",
    ...links.map((l) => `- ${l.name}: ${md(l.label, l.href)}`),
    `- About, contact, privacy: ${md("/about", "/about.md")}, ${md("/contact", "/contact.md")}, ${md("/privacy", "/privacy.md")}`,
    "",
  ];
  return out.join("\n") + footer();
}

function block(b: Block) {
  if ("p" in b) return `${b.p}\n`;
  if ("h" in b) return `## ${b.h}\n`;
  if ("code" in b) return `\`\`\`sh\n${b.code}\n\`\`\`\n`;
  return b.list.map((i) => `- ${md(i.text, i.href)}`).join("\n") + "\n";
}

function doc(page: Exclude<Page, "index">, d: Doc) {
  return (
    frontMatter(d.title, d.description, pagePath(page)) +
    `# ${d.title}\n\n` +
    d.blocks.map(block).join("\n") +
    "\n" +
    footer()
  );
}

export function markdown(page: Page) {
  return page === "index" ? home() : doc(page, docsByPage[page]);
}

export function notFound(path: string) {
  return [
    "# 404 Not Found",
    "",
    `There is no page at \`${path}\` on omarafet.vercel.app.`,
    "",
    `- Home: ${url("/index.md")}`,
    `- Every page: ${url("/llms.txt")} and ${url("/sitemap.xml")}`,
    "",
  ].join("\n");
}

export const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
};
