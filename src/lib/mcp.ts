import { achievements } from "@/data/achievements";
import { badges } from "@/data/badges";
import { certificates, satr } from "@/data/certificates";
import { sessions } from "@/data/experience";
import { interests, links, profile } from "@/data/profile";
import { filters, projects } from "@/data/projects";
import stats from "@/data/stats.json";
import { markdown } from "./markdown";
import { type Page, pagePath, pages, url } from "./site";

// The read-only tools and resources of the MCP server at /mcp. Every answer
// comes from the same data as the page; nothing is written or fetched live.
export const PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26"];

export const SERVER = {
  name: "omarafet",
  title: "Omar Afet",
  version: "1.0.0",
};

export const INSTRUCTIONS =
  "Read-only facts about Omar Afet (@OmarAfet), an offensive security practitioner and CTF player from Riyadh and the founder of DRJAT. Call omarafet_get_profile first, then the tool for the topic: CTF results, bug bounty counts, projects, achievements or certificates. Numbers come from FlagYard, bugbounty.sa and CoderHub; `fetchedAt` gives their date.";

const readOnly = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const noArgs = { type: "object", properties: {}, additionalProperties: false };

const sections = achievements.map((a) => a.section);
const folders = [...certificates.map((c) => c.dir), "tuwaiq-satr"];

export const tools = [
  {
    name: "omarafet_get_profile",
    title: "Get Omar Afet's profile",
    description:
      "Who Omar Afet is: headline, location, roles (DRJAT, SDAIA, BS6H), education (King Saud University), interests and public links. Use it first for any question about Omar.",
    inputSchema: noArgs,
    annotations: { title: "Get profile", ...readOnly },
  },
  {
    name: "omarafet_get_ctf_stats",
    title: "Get Omar Afet's CTF statistics",
    description:
      "Omar's FlagYard rank, level, points, solves by difficulty, completion per lab, and his teams' results in CTF events (Black Hat MEA CTF 2026 and Madar Al-Himaya CTF qualifiers).",
    inputSchema: noArgs,
    annotations: { title: "Get CTF statistics", ...readOnly },
  },
  {
    name: "omarafet_get_bug_bounty_stats",
    title: "Get Omar Afet's bug bounty statistics",
    description:
      "Count of Omar's valid findings on bugbounty.sa by severity. Report details are private by program rules and are not available.",
    inputSchema: noArgs,
    annotations: { title: "Get bug bounty statistics", ...readOnly },
  },
  {
    name: "omarafet_list_projects",
    title: "List Omar Afet's projects",
    description:
      "Omar's projects with stack, year, links and state (open: public link; filtered: private; closed: archived or offline). Optionally only those with one tag.",
    inputSchema: {
      type: "object",
      properties: {
        tag: {
          type: "string",
          enum: filters,
          description:
            "Return only projects with this tag, for example security, ai or rust.",
        },
      },
      additionalProperties: false,
    },
    annotations: { title: "List projects", ...readOnly },
  },
  {
    name: "omarafet_list_achievements",
    title: "List Omar Afet's achievements",
    description:
      "Omar's results (placings, awards) and the events he took part in, newest first within each section. Optionally one section only.",
    inputSchema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: sections,
          description: "Return only this section.",
        },
      },
      additionalProperties: false,
    },
    annotations: { title: "List achievements", ...readOnly },
  },
  {
    name: "omarafet_list_certificates",
    title: "List Omar Afet's certificates and badges",
    description:
      "Omar's certificates by folder (issuer, date, verification link where one exists) and his FlagYard and Tuwaiq badges. Optionally one folder only.",
    inputSchema: {
      type: "object",
      properties: {
        folder: {
          type: "string",
          enum: folders,
          description: "Return only this certificate folder.",
        },
      },
      additionalProperties: false,
    },
    annotations: { title: "List certificates", ...readOnly },
  },
];

type Args = Record<string, unknown>;
type Result = { data: unknown } | { error: string };

function arg(
  args: Args,
  name: string,
  allowed: string[],
): Result | string | undefined {
  const value = args[name];
  if (value === undefined) return undefined;
  if (typeof value === "string" && allowed.includes(value)) return value;
  return { error: `${name} must be one of: ${allowed.join(", ")}` };
}

const run: Record<string, (args: Args) => Result> = {
  omarafet_get_profile: () => ({
    data: {
      name: profile.name,
      fullName: profile.fullName,
      handle: profile.handle,
      headline: profile.headline,
      location: profile.location,
      roles: sessions,
      interests,
      links: links.map((l) => ({
        name: l.name,
        url: l.href.startsWith("/") ? url(l.href) : l.href,
      })),
      website: url("/"),
    },
  }),
  omarafet_get_ctf_stats: () => ({
    data: {
      fetchedAt: stats.fetchedAt,
      flagyard: stats.flagyard,
      writeups: stats.writeups,
    },
  }),
  omarafet_get_bug_bounty_stats: () => ({
    data: {
      fetchedAt: stats.fetchedAt,
      platform: "bugbounty.sa",
      verified: stats.bugbounty.verified,
      validFindings: stats.bugbounty.valid,
      bySeverity: stats.bugbounty.severity,
      note: "Report details are private, as the programs require.",
    },
  }),
  omarafet_list_projects: (args) => {
    const tag = arg(args, "tag", filters);
    if (typeof tag === "object") return tag;
    const absolute = projects.map((p) => ({
      ...p,
      ...(p.href && { href: p.href.startsWith("/") ? url(p.href) : p.href }),
    }));
    return {
      data: tag ? absolute.filter((p) => p.tags.includes(tag)) : absolute,
    };
  },
  omarafet_list_achievements: (args) => {
    const section = arg(args, "section", sections);
    if (typeof section === "object") return section;
    return {
      data: section
        ? achievements.filter((a) => a.section === section)
        : achievements,
    };
  },
  omarafet_list_certificates: (args) => {
    const folder = arg(args, "folder", folders);
    if (typeof folder === "object") return folder;
    const all = [...certificates, { dir: "tuwaiq-satr", files: satr }];
    return {
      data: {
        certificates: folder ? all.filter((c) => c.dir === folder) : all,
        badges,
      },
    };
  },
};

export const hasTool = (name: string) => name in run;

export function callTool(name: string, args: Args) {
  const result = run[name]!(args);
  if ("error" in result)
    return { content: [{ type: "text", text: result.error }], isError: true };
  const structuredContent = Array.isArray(result.data)
    ? { items: result.data }
    : result.data;
  return {
    content: [
      { type: "text", text: JSON.stringify(structuredContent, null, 2) },
    ],
    structuredContent,
    isError: false,
  };
}

const titles: Record<Page, string> = {
  index: "Omar Afet: everything on the home page",
  about: "About Omar Afet",
  contact: "Contact Omar Afet",
  privacy: "Privacy of omarafet.vercel.app",
  docs: "Developer docs: Markdown, llms.txt and the MCP server",
};

export const resources = pages.map((page) => ({
  uri: url(page === "index" ? "/index.md" : `${pagePath(page)}.md`),
  name: page,
  title: titles[page],
  mimeType: "text/markdown",
}));

export function readResource(uri: string) {
  const resource = resources.find((r) => r.uri === uri);
  if (!resource) return null;
  return {
    contents: [
      { uri, mimeType: "text/markdown", text: markdown(resource.name as Page) },
    ],
  };
}
