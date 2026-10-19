"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Section } from "@/data/sections";
import { go } from "./go";
import Prompt from "./Prompt";

type Link = { name: string; href: string; label: string };
type Entry = { cmd: string; out: ReactNode };

// Words that jump to a section, besides each section's own command and id.
const aliases: Record<string, string> = {
  neofetch: "fastfetch",
  flagyard: "ctf",
  ctf: "ctf",
  events: "events",
  bbsa: "bounty",
  bounty: "bounty",
  bugbounty: "bounty",
  nmap: "projects",
  projects: "projects",
  last: "experience",
  experience: "experience",
  sdaia: "experience",
  achievements: "achievements",
  loot: "achievements",
  certs: "certs",
  certificates: "certs",
  badges: "badges",
  interests: "interests",
  coderhub: "coderhub",
  links: "links",
  contact: "links",
};

// Paths `cd` leaves the page for: the other pages and the two zones.
const zones = [
  "/about",
  "/contact",
  "/privacy",
  "/docs",
  "/ctf-writeups",
  "/coderhub",
];

export default function Shell({
  sections,
  links,
  uptime,
}: {
  sections: Section[];
  links: Link[];
  uptime: number;
}) {
  const [log, setLog] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const back = useRef(0);
  const input = useRef<HTMLInputElement>(null);
  const ids = sections.map((s) => s.id);
  const words = [
    "help",
    "ls",
    "cd",
    "cat",
    "open",
    "clear",
    "history",
    "setfont",
    "uptime",
    "whoami",
    "pwd",
    "date",
    "echo",
    "sudo",
    "exit",
    ...Object.keys(aliases),
  ];

  // Output grows the page below the fold; keep the prompt on screen.
  useEffect(() => {
    if (log.length) input.current?.scrollIntoView({ block: "nearest" });
  }, [log]);

  // "/" brings the prompt into view from anywhere on the page.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.target instanceof HTMLInputElement) return;
      e.preventDefault();
      input.current?.focus();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  function jump(id: string): ReactNode {
    go(id);
    const s = sections.find((x) => x.id === id);
    return <span className="dim">→ {s ? `${s.cmd}  (${s.label})` : id}</span>;
  }

  function run(line: string): ReactNode {
    const [cmd = "", ...args] = line.trim().split(/\s+/);
    const arg = args.join(" ");
    const target = arg.replace(/^~\/?|^\/root\/?/, "").replace(/^\./, "");
    switch (cmd) {
      case "":
        return null;
      case "help":
        return (
          <>
            {"commands:\n"}
            {"  ls                list the sections\n"}
            {"  cd <section>      go to a section, e.g. cd certs\n"}
            {"  cd /ctf-writeups  open the CTF writeups (also /coderhub)\n"}
            {"  cd /about         also /contact, /privacy, /docs\n"}
            {"  open <name>       open a profile: "}
            {links
              .filter((l) => l.href.startsWith("http"))
              .map((l) => l.name)
              .join(", ")}
            {"\n  history, clear, uptime, setfont ter-132b (2x text)\n"}
            {"or type a section's command again, e.g. nmap or fastfetch."}
          </>
        );
      case "ls":
        return [...ids, ...zones].join("  ");
      case "cd":
        if (!arg || arg === "~") return null;
        if (zones.includes(arg)) {
          location.assign(arg);
          return `opening ${arg} ...`;
        }
        if (ids.includes(target)) return jump(target);
        return `cd: no such file or directory: ${arg}`;
      case "cat":
        if (target === "flag.txt") return "FlagY{REDACTED}";
        if (target === "achievements.log") return jump("achievements");
        if (ids.includes(target)) return jump(target);
        return `cat: ${arg || "(nothing)"}: No such file or directory`;
      case "open": {
        const l = links.find((x) => x.name === arg);
        if (!l)
          return `open: try one of: ${links.map((x) => x.name).join(", ")}`;
        window.open(
          l.href,
          l.href.startsWith("http") ? "_blank" : "_self",
          "noopener",
        );
        return `opening ${l.label} ...`;
      }
      case "clear":
        setLog([]);
        return undefined;
      case "history":
        return history.current
          .map((h, i) => `${String(i + 1).padStart(4)}  ${h}`)
          .join("\n");
      case "setfont": {
        const big = arg !== "default";
        document.documentElement.classList.toggle("big", big);
        return big
          ? "setfont: 16x32 cells (setfont default to undo)"
          : "setfont: 8x16 cells";
      }
      case "uptime":
        return ` up ${uptime} years, 1 user, load average: 0.42, 0.13, 0.37`;
      case "whoami":
        return "root";
      case "pwd":
        return "/root";
      case "date":
        return new Date().toString();
      case "echo":
        return arg;
      case "sudo":
        return "sudo: you are already root. With permission, of course.";
      case "rm":
        if (/-\w*r/.test(arg) && args.includes("/"))
          return args.includes("--no-preserve-root")
            ? "Nice try. This box is a honeypot."
            : "rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe";
        return `rm: cannot remove '${arg}': Read-only file system`;
      case "exit":
      case "logout":
        return "logout\n\nomarafet login: root (automatic login)";
      default: {
        const id =
          aliases[cmd] ?? sections.find((s) => s.cmd.split(" ")[0] === cmd)?.id;
        if (id) return jump(id);
        return `zsh: command not found: ${cmd}`;
      }
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const h = history.current;
    if (e.key === "Enter") {
      const line = value;
      const out = run(line);
      if (line.trim()) h.push(line);
      back.current = 0;
      setValue("");
      if (out !== undefined) setLog((l) => [...l, { cmd: line, out }]);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      back.current = Math.max(
        0,
        Math.min(h.length, back.current + (e.key === "ArrowUp" ? 1 : -1)),
      );
      setValue(back.current ? (h[h.length - back.current] ?? "") : "");
    } else if (e.key === "Tab") {
      const hits = words.filter((w) => w.startsWith(value) && value);
      if (hits.length === 1) {
        e.preventDefault();
        setValue(`${hits[0]} `);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    }
  }

  return (
    <section id="shell" className="shell gap" aria-label="Interactive shell">
      {log.map((entry, i) => (
        <div key={i}>
          <p>
            <Prompt />
            <span className="cmd">{entry.cmd}</span>
          </p>
          {entry.out !== null && <p>{entry.out}</p>}
        </div>
      ))}
      <label className="input">
        <Prompt />
        {!value && <span className="cursor" aria-hidden="true" />}
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Command, for example help"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
        />
      </label>
      <p className="dim">type help, or press / to come back to this prompt</p>
    </section>
  );
}
