import stats from "./stats.json";

// Projects are shown as an nmap scan of "omarafet" (layout chosen 2026-10-19,
// "attack surface"). STATE says what a visitor can open: open = a public site or
// repository, filtered = private, closed = archived or offline. Ports are picked
// to fit the project where one fits: 997 is the Saudi ambulance number, 2222 is
// Cowrie's SSH port, 25565 is Minecraft's, 6463 is Discord's local RPC port, and
// 7878 is the Rust book's web-server example. nmap sorts by port, so archived and
// small projects sit on high ports and the scan opens with the strongest work.
export type Host = {
  port: number;
  state: "open" | "filtered" | "closed";
  service: string;
  version: string;
  title: string;
  note?: string;
  href?: string;
  code?: string;
  year: string;
  // The first tag is the group; the others are filters.
  tags: string[];
};

export const groups = ["security", "ai", "product", "systems", "tools"];

const gh = (repo: string) => `https://github.com/OmarAfet/${repo}`;

const hosts: Host[] = [
  {
    port: 1337,
    state: "open",
    service: "ctf-writeups",
    version: "Next.js · Fumadocs · MDX",
    title: `Catalogue of ${stats.writeups.challenges} FlagYard challenges, ${stats.writeups.solved} solved; writeups in progress.`,
    href: "/ctf-writeups",
    year: "2026",
    tags: ["security", "ctf", "typescript"],
  },
  {
    port: 2222,
    state: "filtered",
    service: "sdn-honeypot",
    version: "Ryu · Open vSwitch · Cowrie · Dionaea",
    title:
      "Instead of blocking an attacker, silently reroute them into a honeypot and record what they do.",
    note: "Graduation project, King Saud University · design",
    year: "2025–26",
    tags: ["security", "python"],
  },
  {
    port: 8004,
    state: "filtered",
    service: "ameen",
    version: "Next.js · LLM · MCP",
    title:
      "Private AI assistant that runs inside a Saudi organisation, so no data leaves it.",
    note: "Tuwaiq Hackathon, Future of Work track · Excellence Award",
    year: "2026",
    tags: ["security", "ai", "llm", "typescript"],
  },
  {
    port: 443,
    state: "open",
    service: "drjat",
    version: "Next.js · Postgres · Gemini · Claude",
    title:
      "AI exam preparation for the Saudi Qiyas tests: 1,000+ questions, real-exam simulator, AI assistant.",
    note: "Founder & CEO · Hulul Drjat Est., Riyadh",
    href: "https://drjat.sa",
    year: "2026",
    tags: ["product", "ai", "llm", "typescript"],
  },
  {
    port: 8443,
    state: "open",
    service: "mnzal",
    version: "Next.js · Supabase",
    title:
      "Saudi real-estate platform: market a property, find one, follow auctions.",
    href: "https://mnzal.sa",
    year: "2026",
    tags: ["product", "typescript"],
  },
  {
    port: 8080,
    state: "open",
    service: "sufrah",
    version: "Twig · Salla Twilight",
    title:
      "Arabic-first restaurant theme for Salla, sold on the Salla Theme Store.",
    href: gh("theme-sufrah-support"),
    year: "2026",
    tags: ["product"],
  },
  {
    port: 3000,
    state: "open",
    service: "dc-designer",
    version: "Next.js · three.js",
    title:
      "3D tool to model and plan data-centre infrastructure in the browser.",
    href: "https://dc-designer.vercel.app",
    year: "2026",
    tags: ["product", "typescript"],
  },
  {
    port: 8081,
    state: "closed",
    service: "bs6h",
    version: "Next.js",
    title: "Free non-profit marketplace for buying and selling, with no fees.",
    note: "Freelance, 2024–2025 · offline",
    year: "2024",
    tags: ["product", "typescript"],
  },
  {
    port: 8000,
    state: "open",
    service: "reqab",
    version: "Next.js · Gemini · RAG",
    title:
      "AI contract guardian for Islamic finance: hidden fees, Sharia and regulatory risks.",
    note: "Amad Hackathon 2026 (Alinma × Tuwaiq) · team submission",
    href: "https://reqab.vercel.app",
    code: gh("reqab"),
    year: "2026",
    tags: ["ai", "llm", "typescript"],
  },
  {
    port: 8001,
    state: "open",
    service: "isnad",
    version: "Python · TypeScript · LLM",
    title:
      "Find a verse or hadith from a vague memory, with its source and named gradings.",
    note: "AI Challenge for Serving Islamic Content 2026, track 04",
    href: "https://isnad-app.vercel.app",
    code: gh("isnad"),
    year: "2026",
    tags: ["ai", "llm", "python", "typescript"],
  },
  {
    port: 997,
    state: "open",
    service: "daqeeqah",
    version: "Next.js · MapLibre · LLM",
    title:
      "Better caller location for 997 ambulance calls: one-tap link, last 50 m, AI reports.",
    note: "Isaafathon 2026, Saudi Red Crescent Authority",
    href: "https://daqeeqah.vercel.app",
    code: gh("daqeeqah"),
    year: "2026",
    tags: ["ai", "llm", "typescript"],
  },
  {
    port: 8002,
    state: "open",
    service: "insaf",
    version: "TypeScript · Jev",
    title:
      "Decides fault in a minor road accident from both drivers' statements.",
    note: "SAIF 2026",
    href: "https://insaf-saif.vercel.app",
    year: "2026",
    tags: ["ai", "llm", "typescript"],
  },
  {
    port: 8003,
    state: "open",
    service: "jawaz-alitiman",
    version: "Next.js · Gemini",
    title:
      "AI CFO for Saudi SMEs: statements and a bank-ready credit memo from ZATCA e-invoices.",
    note: "Amad Hackathon 2026",
    code: gh("jawaz-alitiman"),
    year: "2026",
    tags: ["ai", "llm", "typescript"],
  },
  {
    port: 6463,
    state: "open",
    service: "discord-tab",
    version: "TypeScript · Vencord · llama.cpp",
    title:
      "Ghost-text replies in Discord from a local LLM. It suggests; it never sends.",
    code: gh("discord-tab"),
    year: "2026",
    tags: ["ai", "llm", "typescript"],
  },
  {
    port: 9999,
    state: "open",
    service: "tic-tac-toe",
    version: "Rust · Q-learning",
    title:
      "Unbeatable Tic-Tac-Toe agent, trained on 200,000 games against itself.",
    code: gh("tic_tac_toe"),
    year: "2025",
    tags: ["ai", "rust"],
  },
  {
    port: 25565,
    state: "open",
    service: "obsidium",
    version: "Rust",
    title: "High-performance Minecraft server, written from scratch.",
    code: "https://github.com/ObsidiumMC/Obsidium",
    year: "2025",
    tags: ["systems", "rust"],
  },
  {
    port: 25566,
    state: "open",
    service: "redstonium",
    version: "Rust · GPUI",
    title: "Minecraft launcher.",
    code: gh("Redstonium"),
    year: "2025",
    tags: ["systems", "rust"],
  },
  {
    port: 7878,
    state: "open",
    service: "rustdust",
    version: "Rust · rayon",
    title:
      "Finds and cleans Rust target/ folders: parallel scan, cached results.",
    code: gh("rustdust"),
    year: "2026",
    tags: ["systems", "rust"],
  },
  {
    port: 6000,
    state: "open",
    service: "structure-gen",
    version: "TypeScript · VS Code API",
    title:
      "VS Code extension that maps a workspace's directory tree, with filters.",
    code: gh("structure-generator"),
    year: "2024",
    tags: ["tools", "typescript"],
  },
  {
    port: 25575,
    state: "open",
    service: "set-on-fire",
    version: "Java",
    title: "Minecraft mod: set any entity on fire with flint and steel.",
    href: "https://www.curseforge.com/minecraft/mc-mods/set-on-fire",
    code: gh("set_on_fire"),
    year: "2024",
    tags: ["tools", "java"],
  },
  {
    port: 8888,
    state: "open",
    service: "coderhub",
    version: "Next.js · Fumadocs",
    title: "My accepted CoderHub solutions, in Arabic.",
    href: "/coderhub",
    year: "2022–26",
    tags: ["tools", "python"],
  },
  {
    port: 55000,
    state: "open",
    service: "avg-color",
    version: "JavaScript",
    title: "Finds the average colour of an image.",
    href: "https://omarafet.github.io/image-average-color/",
    year: "2023",
    tags: ["tools"],
  },
  {
    port: 49152,
    state: "closed",
    service: "webernow",
    version: "Next.js",
    title: "Platform to make building web applications simpler.",
    note: "archived",
    year: "2023",
    tags: ["product", "typescript"],
  },
  {
    port: 49153,
    state: "closed",
    service: "smartai",
    version: "JavaScript",
    title: "Site of a team that uses AI to improve people's lives.",
    note: "archived",
    href: "https://omarafet.github.io/SmartAI/",
    year: "2023",
    tags: ["ai"],
  },
];

// nmap lists ports in ascending order.
export const projects = hosts.sort((a, b) => a.port - b.port);

export const filters = [
  ...groups,
  ...new Set(
    projects.flatMap((p) => p.tags).filter((t) => !groups.includes(t)),
  ),
];
