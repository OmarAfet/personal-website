import stats from "./stats.json";

// Printed like exploit-tool output: [+] a result, [*] took part.
// Sources: FlagYard and bugbounty.sa APIs (stats.json), and the Omar workspace
// (PROFILE.md, Certificates/EMAIL-FINDINGS.md, the certificate files).
export type Achievement = {
  mark: "+" | "*";
  when: string;
  what: string;
  result: string;
  href?: string;
};

export const n = (x: number) => x.toLocaleString("en-US");

// 1st, 2nd, 3rd, 4th ... 11th, 12th, 13th ... 21st, 129th.
export function ordinal(x: number) {
  const tens = x % 100;
  const unit = x % 10;
  const suffix =
    tens >= 11 && tens <= 13
      ? "th"
      : unit === 1
        ? "st"
        : unit === 2
          ? "nd"
          : unit === 3
            ? "rd"
            : "th";
  return `${x}${suffix}`;
}
const fy = stats.flagyard;
const bb = stats.bugbounty;
const month = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export const achievements: { section: string; items: Achievement[] }[] = [
  {
    section: "ctf",
    // Black Hat first: the harder event with more teams (Omar, 2026-10-19).
    items: [
      ...fy.events.map((e) => ({
        mark: "+" as const,
        when: month(e.end),
        what: `${e.name} · ${e.stage}`,
        result: `${ordinal(e.rank)} of ${n(e.teams)} teams${e.captain ? ", as captain" : ""}`,
        href: e.url,
      })),
      {
        mark: "+",
        when: month(stats.fetchedAt),
        what: "FlagYard global ranking",
        result: `#${fy.rank} of ${n(fy.players)} players · ${fy.level}`,
        href: fy.url,
      },
    ],
  },
  {
    section: "bug bounty",
    items: [
      {
        mark: "+",
        when: month(stats.fetchedAt),
        what: "bugbounty.sa",
        result: `${bb.valid} valid findings (${Object.entries(bb.severity)
          .map(([k, v]) => `${v} ${k}`)
          .join(", ")}), ${bb.fixed} fixed`,
      },
    ],
  },
  {
    section: "competitions",
    items: [
      {
        mark: "+",
        when: "Jul 2026",
        what: "Tuwaiq Coding Challenge",
        result: "6th of 70+",
      },
      {
        mark: "+",
        when: "Apr 2026",
        what: "Tuwaiq Hackathon, Future of Work track",
        result: "Excellence Award (an iPhone) for Ameen",
      },
      {
        mark: "+",
        when: "Mar 2026",
        what: "Tuwaiq Coding Challenge, Python",
        result: "top 10 of 100+",
      },
      {
        mark: "+",
        when: "May 2025",
        what: "AWS GameDay at King Saud University",
        result: "5th of 20 teams (team Logic)",
      },
      {
        mark: "+",
        when: "Nov 2023",
        what: "Black Hat MEA 2023 (Tuwaiq Academy)",
        result: "bronze badge, day 3",
      },
    ],
  },
  {
    section: "took part",
    items: [
      {
        mark: "*",
        when: "2026",
        what: "Tuwaiq Cybersecurity Bootcamp",
        result: "in progress",
      },
      {
        mark: "*",
        when: "2026",
        what: "AI Challenge for Serving Islamic Content",
        result: "built Isnad",
      },
      {
        mark: "*",
        when: "2026",
        what: "Isaafathon, Saudi Red Crescent Authority",
        result: "built Daqeeqah",
      },
      { mark: "*", when: "2026", what: "SAIF 2026", result: "built Insaf" },
      {
        mark: "*",
        when: "Jul 2026",
        what: "Amad Hackathon (Alinma × Tuwaiq), Guinness World Records event",
        result: "built Reqab",
      },
      {
        mark: "*",
        when: "2026",
        what: "Gemini 3 Hackathon (Devpost)",
        result: "submitted, 4,500+ entries",
      },
      {
        mark: "*",
        when: "Feb 2026",
        what: "ICAN 2026 conference",
        result: "attended",
      },
      {
        mark: "*",
        when: "Jan 2026",
        what: "Absher Tuwaiq Hackathon",
        result: "took part",
      },
      {
        mark: "*",
        when: "Aug 2025",
        what: "Advanced Reverse Engineering Bootcamp",
        result: "completed",
      },
      {
        mark: "*",
        when: "2025",
        what: "KSU Transformation Hackathon",
        result: "took part",
      },
      {
        mark: "*",
        when: "Feb 2023",
        what: "Alibaba Cloud Saudi Hackathon at LEAP 2023",
        result: "took part",
      },
    ],
  },
];
