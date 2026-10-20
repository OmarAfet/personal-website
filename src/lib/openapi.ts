import { API_BASE, resources } from "./api";
import { origin, url } from "./site";

// OpenAPI 3.1 description of the REST API in lib/api.ts, built from the same
// resource table so the two cannot drift apart.
const str = { type: "string" };
const int = { type: "integer" };
const strList = { type: "array", items: str };
const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const schemas = {
  Problem: {
    type: "object",
    description:
      "An error, as RFC 9457 problem details with a code and a hint.",
    required: ["type", "title", "status", "code", "detail"],
    properties: {
      type: { type: "string", format: "uri" },
      title: str,
      status: int,
      code: {
        type: "string",
        enum: [
          "not_found",
          "invalid_parameter",
          "invalid_cursor",
          "method_not_allowed",
        ],
      },
      detail: str,
      hint: str,
    },
  },
  Pagination: {
    type: "object",
    required: ["limit", "next_cursor", "total"],
    properties: {
      limit: int,
      next_cursor: {
        type: ["string", "null"],
        description: "Pass as cursor for the next page.",
      },
      total: int,
    },
  },
  Meta: {
    type: "object",
    properties: { fetchedAt: { type: "string", format: "date" } },
  },
  Profile: {
    type: "object",
    properties: {
      name: str,
      handle: str,
      headline: str,
      location: str,
      roles: {
        type: "array",
        items: {
          type: "object",
          properties: {
            host: str,
            role: str,
            from: str,
            to: { type: ["string", "null"] },
            href: { type: "string", format: "uri" },
          },
        },
      },
      interests: strList,
      links: {
        type: "array",
        items: {
          type: "object",
          properties: { name: str, url: { type: "string", format: "uri" } },
        },
      },
    },
  },
  CtfStats: {
    type: "object",
    properties: {
      fetchedAt: { type: "string", format: "date" },
      flagyard: {
        type: "object",
        properties: {
          username: str,
          url: { type: "string", format: "uri" },
          rank: int,
          players: int,
          points: int,
          level: str,
          firstBloods: int,
          solves: int,
          byDifficulty: { type: "object", additionalProperties: int },
          labs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: str,
                solved: int,
                challenges: int,
                points: int,
                maxPoints: int,
              },
            },
          },
          badges: strList,
          events: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: str,
                stage: str,
                end: { type: "string", format: "date" },
                team: str,
                captain: { type: "boolean" },
                rank: int,
                teams: int,
                points: int,
                teamSolves: int,
                challenges: int,
                mySolves: int,
                myPoints: int,
                myFirstBloods: int,
                url: { type: "string", format: "uri" },
              },
            },
          },
        },
      },
      writeups: {
        type: "object",
        properties: {
          challenges: int,
          solved: int,
          url: { type: "string", format: "uri" },
        },
      },
    },
  },
  BugBountyStats: {
    type: "object",
    properties: {
      fetchedAt: { type: "string", format: "date" },
      platform: str,
      verified: { type: "boolean" },
      validFindings: int,
      bySeverity: { type: "object", additionalProperties: int },
    },
  },
  Project: {
    type: "object",
    required: ["port", "state", "service", "title", "year", "tags"],
    properties: {
      port: int,
      state: { type: "string", enum: ["open", "filtered", "closed"] },
      service: str,
      version: str,
      title: str,
      note: str,
      href: { type: "string", format: "uri" },
      code: { type: "string", format: "uri" },
      year: str,
      tags: strList,
    },
  },
  Achievement: {
    type: "object",
    required: ["section", "mark", "when", "what", "result"],
    properties: {
      section: str,
      mark: {
        type: "string",
        enum: ["+", "*"],
        description: "+ a result, * took part",
      },
      when: str,
      what: str,
      result: str,
      href: { type: "string", format: "uri" },
    },
  },
  Certificate: {
    type: "object",
    required: ["folder", "issuer", "date", "name"],
    properties: {
      folder: str,
      issuer: str,
      date: str,
      name: str,
      href: {
        type: "string",
        format: "uri",
        description: "Public verification page",
      },
    },
  },
  Badge: {
    type: "object",
    required: ["source", "name"],
    properties: { source: str, name: str },
  },
};

const problemResponse = (description: string) => ({
  description,
  content: { "application/problem+json": { schema: ref("Problem") } },
});

function operation(name: string) {
  const r = resources[name]!;
  const list = !!r.list;
  const parameters = list
    ? [
        ...(r.filter
          ? [
              {
                name: r.filter.name,
                in: "query",
                required: false,
                description: r.filter.description,
                schema: { type: "string", enum: r.filter.values },
              },
            ]
          : []),
        {
          name: "limit",
          in: "query",
          required: false,
          description: "Items per page, 1 to 100.",
          schema: { type: "integer", minimum: 1, maximum: 100, default: 50 },
        },
        {
          name: "cursor",
          in: "query",
          required: false,
          description: "next_cursor from the previous page.",
          schema: str,
        },
      ]
    : [];
  const data = list ? { type: "array", items: ref(r.schema) } : ref(r.schema);
  return {
    get: {
      operationId: r.operationId,
      summary: r.summary,
      description: r.description,
      tags: [list ? "lists" : "records"],
      parameters,
      responses: {
        "200": {
          description: r.summary,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: list ? ["data", "pagination"] : ["data"],
                properties: {
                  data,
                  ...(list && { pagination: ref("Pagination") }),
                  meta: ref("Meta"),
                },
              },
            },
          },
        },
        ...(list && {
          "400": problemResponse("A parameter or the cursor is not valid."),
        }),
        "4XX": problemResponse(
          "Another client error, such as a method other than GET.",
        ),
      },
    },
  };
}

export function openapi() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Omar Afet API",
      version: "1.0.0",
      summary: "Read-only facts about Omar Afet.",
      description:
        "CTF results, bug bounty counts, projects, achievements, certificates and badges of Omar Afet. Public and read-only: no authentication. Versioned in the path; breaking changes would go to a new version. The same data is available as Markdown pages and through the MCP server at /mcp.",
      contact: { name: "Omar Afet", url: url("/contact") },
      // The license of this repository (LICENSE), which holds the API and its data.
      license: { name: "MIT", identifier: "MIT" },
    },
    servers: [{ url: origin }],
    // Public: no operation needs authentication.
    security: [],
    externalDocs: { description: "Developer docs", url: url("/docs") },
    tags: [
      { name: "records", description: "Single records" },
      { name: "lists", description: "Paginated lists" },
    ],
    paths: {
      [API_BASE]: {
        get: {
          operationId: "listResources",
          summary: "List the API resources",
          description: "Every resource of this API version, with its URL.",
          tags: ["records"],
          responses: {
            "4XX": problemResponse(
              "A client error, such as a method other than GET.",
            ),
            "200": {
              description: "The resources",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      version: str,
                      docs: { type: "string", format: "uri" },
                      openapi: { type: "string", format: "uri" },
                      resources: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: str,
                            url: { type: "string", format: "uri" },
                            summary: str,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      ...Object.fromEntries(
        Object.keys(resources).map((name) => [
          `${API_BASE}/${name}`,
          operation(name),
        ]),
      ),
    },
    components: { schemas },
  };
}
