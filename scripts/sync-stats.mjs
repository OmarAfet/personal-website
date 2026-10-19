// Refreshes src/data/stats.json from FlagYard, bugbounty.sa and CoderHub, and
// counts the challenge pages of the ctf-writeups repo.
//
// Each platform script runs with the Python of its MCP repo, which holds the API
// client and the login, so log in there first (the MCP `login` tool). Every
// command is printed before it runs, so a result can be repeated by hand.
// Repo locations: FLAGYARD_MCP, BUGBOUNTY_SA_MCP, CODERHUB_MCP and CTF_WRITEUPS,
// default ~/Personal/VSCode/Github/<repo>.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join } from "node:path";

const root = join(import.meta.dirname, "..");
const repo = (env, name) =>
  process.env[env] ?? join(homedir(), "Personal/VSCode/Github", name);

const sources = [
  ["flagyard", repo("FLAGYARD_MCP", "flagyard-mcp")],
  ["bugbounty", repo("BUGBOUNTY_SA_MCP", "bugbounty-sa-mcp")],
  ["coderhub", repo("CODERHUB_MCP", "coderhub-mcp")],
];

const stats = { fetchedAt: new Date().toISOString().slice(0, 10) };
for (const [key, dir] of sources) {
  const python = join(dir, ".venv/bin/python");
  const script = join(root, "scripts/stats", `${key}.py`);
  console.log(`$ ${python} -I ${script}`);
  const out = execFileSync(python, ["-I", script], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });
  stats[key] = JSON.parse(out);
}

// One .mdx page per challenge; index.mdx pages are folder landings. The front
// matter `status` is "solved", "pending" or "unsolved" (see that repo's README).
const docs = join(repo("CTF_WRITEUPS", "ctf-writeups"), "content/docs");
console.log(`$ grep -h '^status:' ${docs}/**/*.mdx (index.mdx excluded)`);
const pages = readdirSync(docs, { recursive: true }).filter(
  (f) => f.endsWith(".mdx") && basename(f) !== "index.mdx",
);
stats.writeups = {
  challenges: pages.length,
  solved: pages.filter((f) =>
    /^status:\s*"?solved"?\s*$/m.test(readFileSync(join(docs, f), "utf8")),
  ).length,
};

writeFileSync(
  join(root, "src/data/stats.json"),
  JSON.stringify(stats, null, 2) + "\n",
);
console.log("wrote src/data/stats.json");
