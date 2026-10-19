import { interests, links } from "@/data/profile";
import stats from "@/data/stats.json";

export function Interests() {
  return (
    <ul>
      {interests.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

// Low on the page on purpose: Omar's focus is offensive security (2026-10-19).
export function CoderHubStats() {
  const ch = stats.coderhub;
  return (
    <dl className="kv">
      {Object.entries(ch.solved).map(([lang, solved]) => (
        <div key={lang}>
          <dt>{lang.toLowerCase()}</dt>
          <dd>
            {solved} of {ch.challenges} challenges solved
          </dd>
        </div>
      ))}
      <dt>solutions</dt>
      <dd>
        <a href="/coderhub">/coderhub</a>
      </dd>
    </dl>
  );
}

export function Links({ updated }: { updated: string }) {
  return (
    <>
      <dl className="kv">
        {links.map((l) => (
          <div key={l.name}>
            <dt>{l.name}</dt>
            <dd>
              <a href={l.href}>{l.label}</a>
            </dd>
          </div>
        ))}
      </dl>
      <p className="gap dim">
        # updated {updated}, stats {stats.fetchedAt}. Font: IBM VGA 8x16 from{" "}
        <a href="https://int10h.org/oldschool-pc-fonts/">
          The Ultimate Oldschool PC Font Pack
        </a>{" "}
        by VileR, CC BY-SA 4.0.
      </p>
    </>
  );
}
