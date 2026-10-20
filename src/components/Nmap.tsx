"use client";

import { useState } from "react";
import type { Host } from "@/data/projects";

const label = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// nmap's script output: `|` lines, the last one `|_`.
function Script({ host }: { host: Host }) {
  const rows = [
    host.title,
    [host.year, host.note].filter(Boolean).join(" · "),
    ...[host.href, host.code]
      .filter((url): url is string => !!url)
      .map((url) => (
        <a key={url} href={url}>
          {label(url)}
        </a>
      )),
  ];
  return (
    <span className="script">
      {rows.map((row, i) => (
        <span key={i} className="line">
          <span className="dim">{i === rows.length - 1 ? "|_ " : "|  "}</span>
          {row}
        </span>
      ))}
    </span>
  );
}

export default function Nmap({
  hosts,
  filters,
  started,
}: {
  hosts: Host[];
  filters: string[];
  started: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const match = (h: Host) => !filter || h.tags.includes(filter);
  const shown = hosts.filter(match).length;

  return (
    <>
      <p>
        Starting Nmap ( <a href="https://nmap.org">https://nmap.org</a> ) at{" "}
        {started}
      </p>
      <p>Nmap scan report for omarafet (omarafet.vercel.app)</p>
      <p>Host is up (0.042s latency).</p>
      <p>
        Not shown: older and private repositories at{" "}
        <a href="https://github.com/OmarAfet">github.com/OmarAfet</a>
      </p>

      <div className="filters gap" role="group" aria-label="Filter projects">
        <span className="dim">filter:</span>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="btn"
            aria-pressed={filter === f}
            onClick={() => setFilter(filter === f ? null : f)}
          >
            [{f}]
          </button>
        ))}
      </div>
      <p className="dim" aria-live="polite">
        {filter
          ? `| grep -w ${filter}: ${shown} of ${hosts.length} ports`
          : `${hosts.length} ports, click a filter to grep`}
      </p>

      <p className="ports-head gap hi" aria-hidden="true">
        <span>PORT</span>
        <span>STATE</span>
        <span>SERVICE</span>
        <span className="ver">VERSION</span>
      </p>
      <ul className="ports">
        {hosts.map((h) => (
          <li key={h.port} hidden={!match(h)}>
            <span>{h.port}/tcp</span>
            <span className={`state-${h.state}`}>{h.state}</span>
            <span className="hi">{h.service}</span>
            <span className="ver">{h.version}</span>
            <Script host={h} />
          </li>
        ))}
      </ul>

      <p className="gap">
        Service Info: Host: omarafet; OS: Offensive Security; Location: Riyadh,
        SA
      </p>
      <p className="gap">
        Nmap done: 1 IP address (1 host up) scanned in 1.37 seconds
      </p>
    </>
  );
}
