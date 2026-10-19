import {
  callTool,
  hasTool,
  INSTRUCTIONS,
  PROTOCOL_VERSIONS,
  readResource,
  resources,
  SERVER,
  tools,
} from "@/lib/mcp";

// A stateless MCP server over Streamable HTTP: each POST carries JSON-RPC and
// gets a JSON reply; there is no SSE stream and no session. Hand-written
// rather than the SDK: six read-only tools, no dependencies (2026-10-19).

type Message = {
  jsonrpc?: unknown;
  id?: string | number | null;
  method?: unknown;
  params?: Record<string, unknown>;
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
  "Cache-Control": "no-store",
};

const result = (id: Message["id"], value: unknown) => ({
  jsonrpc: "2.0",
  id,
  result: value,
});
const error = (id: Message["id"], code: number, message: string) => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

function handle(m: Message) {
  if (
    !m ||
    typeof m !== "object" ||
    m.jsonrpc !== "2.0" ||
    typeof m.method !== "string"
  )
    return error(m?.id, -32600, "Invalid Request");
  // A notification (no id) gets no reply.
  if (m.id === undefined) return null;
  const params = m.params ?? {};

  switch (m.method) {
    case "initialize": {
      const asked = String(params.protocolVersion ?? "");
      return result(m.id, {
        protocolVersion: PROTOCOL_VERSIONS.includes(asked)
          ? asked
          : PROTOCOL_VERSIONS[0],
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false, subscribe: false },
        },
        serverInfo: SERVER,
        instructions: INSTRUCTIONS,
      });
    }
    case "ping":
      return result(m.id, {});
    case "tools/list":
      return result(m.id, { tools });
    case "tools/call": {
      const name = String(params.name ?? "");
      if (!hasTool(name)) return error(m.id, -32602, `Unknown tool: ${name}`);
      const args = params.arguments;
      if (
        args !== undefined &&
        (typeof args !== "object" || args === null || Array.isArray(args))
      )
        return error(m.id, -32602, "arguments must be an object");
      return result(
        m.id,
        callTool(name, (args ?? {}) as Record<string, unknown>),
      );
    }
    case "resources/list":
      return result(m.id, { resources });
    case "resources/templates/list":
      return result(m.id, { resourceTemplates: [] });
    case "resources/read": {
      const read = readResource(String(params.uri ?? ""));
      if (!read)
        return error(
          m.id,
          -32002,
          `Resource not found: ${String(params.uri ?? "")}`,
        );
      return result(m.id, read);
    }
    default:
      return error(m.id, -32601, `Method not found: ${m.method}`);
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(error(null, -32700, "Parse error"), {
      status: 400,
      headers: CORS,
    });
  }
  const batch = Array.isArray(body);
  const replies = (batch ? (body as Message[]) : [body as Message])
    .map(handle)
    .filter((reply) => reply !== null);
  if (replies.length === 0)
    return new Response(null, { status: 202, headers: CORS });
  return Response.json(batch ? replies : replies[0], { headers: CORS });
}

const notAllowed = () =>
  new Response(
    "Method Not Allowed: POST JSON-RPC messages to this endpoint; it has no SSE stream.\n",
    { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } },
  );

export const GET = notAllowed;
export const DELETE = notAllowed;

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Accept, Authorization, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID",
      "Access-Control-Max-Age": "86400",
    },
  });
}
