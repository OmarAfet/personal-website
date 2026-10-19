import type { ReactNode } from "react";
import { n } from "@/data/achievements";
import { emblem } from "@/data/art";
import { age, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import stats from "@/data/stats.json";

// The 16 console colours, as fastfetch prints them under the info.
const palette = [
  "#000",
  "#a00",
  "#0a0",
  "#a50",
  "#00a",
  "#a0a",
  "#0aa",
  "#aaa",
  "#555",
  "#f55",
  "#5f5",
  "#ff5",
  "#55f",
  "#f5f",
  "#5ff",
  "#fff",
];

export default function Fastfetch() {
  const fy = stats.flagyard;
  const info: [string, ReactNode][] = [
    ["OS", "Offensive Security"],
    ["Host", profile.location],
    ["Kernel", "Founder & CEO @ DRJAT"],
    ["Uptime", `${age()} years`],
    [
      "Packages",
      <a key="p" href="#projects">
        {projects.length} projects
      </a>,
    ],
    ["Shell", "python, rust, typescript, c"],
    ["CTF", `FlagYard #${fy.rank} of ${n(fy.players)} (${fy.level})`],
    ["Bounty", `${stats.bugbounty.valid} valid findings on bugbounty.sa`],
    ["Ex", "SDAIA, COOP 2026"],
    ["Edu", "King Saud University, 2026"],
    ["Locale", "ar_SA.UTF-8, en_US.UTF-8"],
  ];
  return (
    <div className="ff">
      <pre className="logo" aria-hidden="true">
        {emblem.join("\n")}
      </pre>
      <div>
        <p>
          <span className="k">root</span>@<span className="k">omarafet</span>
        </p>
        <p aria-hidden="true">{"-".repeat("root@omarafet".length)}</p>
        <dl>
          {info.map(([k, v]) => (
            <div key={k}>
              <dt className="k">{k}:</dt> <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="colors gap" aria-hidden="true">
          {palette.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </p>
      </div>
    </div>
  );
}
