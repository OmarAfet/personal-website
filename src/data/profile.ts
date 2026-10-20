import stats from "./stats.json";

export const profile = {
  name: "Omar Afet",
  handle: "OmarAfet",
  // Chosen 2026-10-19 to replace the long X bio everywhere (site, X, LinkedIn, GitHub).
  headline: "Offensive Security · CTF Player · Founder of DRJAT",
  location: "Riyadh, Saudi Arabia",
  url: "https://omarafet.vercel.app",
};

// No age, date of birth or full name: Omar removed them from the site
// (2026-10-21). "Omar Afet" is the only name published.
// No email, phone or photo: Omar did not pick any of them for the site (2026-10-19).
export const links = [
  { name: "x", href: "https://x.com/OmarAfet", label: "x.com/OmarAfet" },
  {
    name: "github",
    href: "https://github.com/OmarAfet",
    label: "github.com/OmarAfet",
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/omarafet/",
    label: "linkedin.com/in/omarafet",
  },
  {
    name: "flagyard",
    href: stats.flagyard.url,
    label: stats.flagyard.url.replace("https://", "").replace("/overview", ""),
  },
  { name: "writeups", href: "/ctf-writeups", label: "/ctf-writeups" },
  { name: "coderhub", href: "/coderhub", label: "/coderhub" },
  { name: "about", href: "/about", label: "/about" },
  { name: "contact", href: "/contact", label: "/contact" },
  { name: "privacy", href: "/privacy", label: "/privacy" },
  { name: "docs", href: "/docs", label: "/docs (Markdown, llms.txt, MCP)" },
];

export const interests = [
  "red teaming",
  "penetration testing",
  "reverse engineering",
  "game hacking",
  "artificial intelligence",
  "quantum computing",
  "the science of time",
];
