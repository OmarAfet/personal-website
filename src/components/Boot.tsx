import type { CSSProperties, ReactNode } from "react";
import { banner } from "@/data/art";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import stats from "@/data/stats.json";

// Lines print one after another, LINE_MS apart (CSS, no JavaScript needed).
const LINE_MS = 30;

const ok = (text: string) => (
  <>
    [<span className="ok">{"  OK  "}</span>] {text}
  </>
);

// The system is "OmarOS", not a real distro: Omar does not use Arch, and the
// Arch name made visitors think he does (2026-10-19). No version: it was his
// age, which Omar took off the site (2026-10-21).
const OS = "OmarOS";

const boot: ReactNode[] = [
  "[    0.000000] Linux version 6.17.2-omaros (root@omarafet)",
  "[    0.412880] Run /init as init process",
  "Starting systemd-udevd version 258",
  "",
  <span key="welcome">
    Welcome to <span className="hi">OmarOS</span>!
  </span>,
  "",
  ok("Reached target Offensive Security."),
  ok(`Started CTF Player (FlagYard ${stats.flagyard.level}).`),
  ok("Started Founder & CEO (DRJAT)."),
  ok("Mounted /ctf-writeups."),
  ok("Mounted /coderhub."),
  ok(`Finished Load ${projects.length} Projects.`),
  ok("Reached target Multi-User System."),
];

// "OMAR" and "AFET" with the block strokes bright and the shadow strokes dim.
function Word({ rows }: { rows: string[] }) {
  return (
    <pre>
      {rows.map((row, i) => (
        <span key={i}>
          {row.split(/(█+)/).map((run, j) =>
            run.startsWith("█") ? (
              run
            ) : (
              <span key={j} className="s">
                {run}
              </span>
            ),
          )}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}

const delay = (i: number) => ({ "--d": `${i * LINE_MS}ms` }) as CSSProperties;

// When the motd has printed and the first command may start.
export const BOOT_MS = (boot.length + 1) * LINE_MS;

export default function Boot() {
  return (
    <>
      <div className="boot" aria-hidden="true">
        {boot.map((line, i) => (
          <p key={i} style={delay(i)}>
            {line}
          </p>
        ))}
      </div>
      <div className="motd" style={delay(boot.length)}>
        <p className="gap" aria-hidden="true">
          {OS} (tty1)
        </p>
        <p className="gap" aria-hidden="true">
          omarafet login: root (automatic login)
        </p>
        <div className="banner" aria-hidden="true">
          <Word rows={banner.omar} />
          <Word rows={banner.afet} />
        </div>
        <p className="hi">{profile.headline}</p>
        <p className="gap">
          To get to know Omar, scroll down, or type <b>help</b> at the prompt at
          the end.
        </p>
        <p>
          For CTF writeups, cd <a href="/ctf-writeups">/ctf-writeups</a>. For
          CoderHub solutions, cd <a href="/coderhub">/coderhub</a>.
        </p>
      </div>
    </>
  );
}
