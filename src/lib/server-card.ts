import { PROTOCOL_VERSIONS, SERVER } from "./mcp";
import { url } from "./site";

// The MCP server card (draft MCP server-card extension), served at
// /.well-known/mcp and /.well-known/mcp/server-card.json so agents can find
// the /mcp endpoint from the domain alone.
export const serverCard = () => ({
  $schema:
    "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: "io.github.omarafet/omarafet",
  title: SERVER.title,
  description:
    "Read-only facts about Omar Afet: CTF results, bug bounty counts, projects, achievements and certificates.",
  version: SERVER.version,
  websiteUrl: url("/"),
  repository: {
    source: "github",
    url: "https://github.com/OmarAfet/personal-website",
  },
  remotes: [
    {
      type: "streamable-http",
      url: url("/mcp"),
      supportedProtocolVersions: PROTOCOL_VERSIONS,
    },
  ],
});
