import { achievements } from "@/data/achievements";
import { badges } from "@/data/badges";
import { certificates, satr } from "@/data/certificates";
import { sessions } from "@/data/experience";
import { interests, links, profile } from "@/data/profile";
import { filters, projects } from "@/data/projects";
import stats from "@/data/stats.json";
import { url } from "./site";

// A small read-only REST API over the same data as the page and the MCP server:
// GET /api/v1/<resource>. Lists are paginated (limit, cursor), errors are
// problem+json (RFC 9457) with a code and a hint. Added 2026-10-19 because the
// developer docs made agent scanners expect an API with an OpenAPI spec.
export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;

type Item = Record<string, unknown>;

type Filter = {
  name: string;
  description: string;
  values: string[];
  matches: (item: Item, value: string) => boolean;
};

export type Resource = {
  operationId: string;
  summary: string;
  description: string;
  schema: string;
  object?: () => Item;
  list?: () => Item[];
  filter?: Filter;
};

const abs = (href: string) => (href.startsWith("/") ? url(href) : href);

const sections = achievements.map((a) => a.section);
const folders = [...certificates.map((c) => c.dir), "tuwaiq-satr"];

export const resources: Record<string, Resource> = {
  profile: {
    operationId: "getProfile",
    summary: "Get Omar Afet's profile",
    description:
      "Who Omar Afet is: headline, location, roles, education, interests and public links.",
    schema: "Profile",
    object: () => ({
      name: profile.name,
      handle: profile.handle,
      headline: profile.headline,
      location: profile.location,
      roles: sessions.map((s) => ({
        ...s,
        ...(s.href && { href: abs(s.href) }),
      })),
      interests,
      links: links.map((l) => ({ name: l.name, url: abs(l.href) })),
    }),
  },
  ctf: {
    operationId: "getCtfStats",
    summary: "Get CTF statistics",
    description:
      "FlagYard rank, level, points, solves by difficulty, completion per lab, and team results in CTF events.",
    schema: "CtfStats",
    object: () => ({
      fetchedAt: stats.fetchedAt,
      flagyard: stats.flagyard,
      writeups: { ...stats.writeups, url: url("/ctf-writeups") },
    }),
  },
  "bug-bounty": {
    operationId: "getBugBountyStats",
    summary: "Get bug bounty statistics",
    description:
      "Count of valid findings on bugbounty.sa by severity. Report details are private by program rules.",
    schema: "BugBountyStats",
    object: () => ({
      fetchedAt: stats.fetchedAt,
      platform: "bugbounty.sa",
      verified: stats.bugbounty.verified,
      validFindings: stats.bugbounty.valid,
      bySeverity: stats.bugbounty.severity,
    }),
  },
  projects: {
    operationId: "listProjects",
    summary: "List projects",
    description:
      "Projects with stack, year, links and state (open: public link; filtered: private; closed: archived or offline).",
    schema: "Project",
    list: () =>
      projects.map((p) => ({
        ...p,
        ...(p.href && { href: abs(p.href) }),
      })),
    filter: {
      name: "tag",
      description: "Only projects with this tag.",
      values: filters,
      matches: (item, value) => (item.tags as string[]).includes(value),
    },
  },
  achievements: {
    operationId: "listAchievements",
    summary: "List achievements",
    description: "Results (placings, awards) and events taken part in.",
    schema: "Achievement",
    list: () =>
      achievements.flatMap((a) =>
        a.items.map((i) => ({ section: a.section, ...i })),
      ),
    filter: {
      name: "section",
      description: "Only this section.",
      values: sections,
      matches: (item, value) => item.section === value,
    },
  },
  certificates: {
    operationId: "listCertificates",
    summary: "List certificates",
    description:
      "Certificates with issuer, date and, where one exists, a verification link.",
    schema: "Certificate",
    list: () => [
      ...certificates.flatMap((c) =>
        c.files.map((f) => ({ folder: c.dir, ...f })),
      ),
      ...satr.map((f) => ({ folder: "tuwaiq-satr", ...f })),
    ],
    filter: {
      name: "folder",
      description: "Only this folder.",
      values: folders,
      matches: (item, value) => item.folder === value,
    },
  },
  badges: {
    operationId: "listBadges",
    summary: "List badges",
    description: "FlagYard and Tuwaiq Academy badges.",
    schema: "Badge",
    list: () =>
      badges.flatMap((b) => b.names.map((name) => ({ source: b.dir, name }))),
  },
};

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control":
    "public, max-age=300, s-maxage=86400, stale-while-revalidate=86400",
};

// RFC 9457 problem details, plus a machine code and a hint for the fix.
export function problem(
  status: number,
  code: string,
  title: string,
  detail: string,
  hint: string,
  headers: Record<string, string> = {},
) {
  return Response.json(
    {
      type: `${url("/docs")}#errors`,
      title,
      status,
      code,
      detail,
      hint,
    },
    {
      status,
      headers: {
        "Content-Type": "application/problem+json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    },
  );
}

export const notFound = (path: string) =>
  problem(
    404,
    "not_found",
    "Not Found",
    `There is no API resource at ${path}.`,
    `List the resources at ${url(API_BASE)} or read ${url("/openapi.json")}.`,
  );

export const notAllowed = () =>
  problem(
    405,
    "method_not_allowed",
    "Method Not Allowed",
    "This API is read-only.",
    "Use GET.",
    { Allow: "GET, OPTIONS" },
  );

export function index() {
  return Response.json(
    {
      version: API_VERSION,
      docs: url("/docs"),
      openapi: url("/openapi.json"),
      resources: Object.entries(resources).map(([name, r]) => ({
        name,
        url: url(`${API_BASE}/${name}`),
        summary: r.summary,
      })),
    },
    { headers: HEADERS },
  );
}

const MAX_LIMIT = 100;

export function get(name: string, params: URLSearchParams) {
  const resource = resources[name];
  if (!resource) return notFound(`${API_BASE}/${name}`);
  const meta = { fetchedAt: stats.fetchedAt };
  if (resource.object)
    return Response.json(
      { data: resource.object(), meta },
      { headers: HEADERS },
    );

  let items = resource.list!();
  const { filter } = resource;
  if (filter && params.has(filter.name)) {
    const value = params.get(filter.name)!;
    if (!filter.values.includes(value))
      return problem(
        400,
        "invalid_parameter",
        "Bad Request",
        `${filter.name} must be one of: ${filter.values.join(", ")}.`,
        `Drop ${filter.name}, or use one of the listed values.`,
      );
    items = items.filter((item) => filter.matches(item, value));
  }

  const limit = Number(params.get("limit") ?? 50);
  const offset = Number(params.get("cursor") ?? 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT)
    return problem(
      400,
      "invalid_parameter",
      "Bad Request",
      `limit must be an integer from 1 to ${MAX_LIMIT}.`,
      "Leave limit out for the default of 50.",
    );
  if (!Number.isInteger(offset) || offset < 0 || offset > items.length)
    return problem(
      400,
      "invalid_cursor",
      "Bad Request",
      "cursor is not one this API returned.",
      "Start without a cursor and follow next_cursor.",
    );

  const next = offset + limit < items.length ? String(offset + limit) : null;
  const headers: Record<string, string> = { ...HEADERS };
  if (next) {
    const nextUrl = new URL(url(`${API_BASE}/${name}`));
    params.forEach((value, key) => nextUrl.searchParams.set(key, value));
    nextUrl.searchParams.set("cursor", next);
    headers.Link = `<${nextUrl}>; rel="next"`;
  }
  return Response.json(
    {
      data: items.slice(offset, offset + limit),
      pagination: { limit, next_cursor: next, total: items.length },
      meta,
    },
    { headers },
  );
}
