import { n, ordinal } from "@/data/achievements";
import stats from "@/data/stats.json";

const fy = stats.flagyard;
const top = (rank: number, of: number) =>
  `top ${Math.ceil((rank / of) * 100)}%`;
const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

// Organisers, from each event's FlagYard description.
const organiser: Record<string, string> = {
  "Madar Al-Himaya CTF": "Saudi Aramco × Tuwaiq Academy",
};

// Completion per lab, not points per category: nearly every lab is cleared,
// so category points only mirror each lab's size (Omar, 2026-10-19).
const sum = (key: "solved" | "challenges" | "points" | "maxPoints") =>
  fy.labs.reduce((total, lab) => total + lab[key], 0);

export function FlagYardProfile() {
  const d = fy.byDifficulty;
  return (
    <>
      <dl className="kv">
        <dt>user</dt>
        <dd>
          <a href={fy.url}>{fy.username}</a> · Saudi Arabia
        </dd>
        <dt>rank</dt>
        <dd>
          <b>
            #{fy.rank} of {n(fy.players)}
          </b>{" "}
          players ({top(fy.rank, fy.players)})
        </dd>
        <dt>level</dt>
        <dd>
          <b>{fy.level}</b> · {n(fy.points)} points ·{" "}
          {plural(fy.firstBloods, "first blood")}
        </dd>
        <dt>solved</dt>
        <dd>
          easy {d.easy} · medium {d.medium} · hard <b>{d.hard}</b> · insane{" "}
          <b>{d.insane}</b>
        </dd>
      </dl>
      <p className="gap">
        labs: <b>{sum("solved")}</b> of {sum("challenges")} challenges ·{" "}
        {n(sum("points"))} of {n(sum("maxPoints"))} points
      </p>
      <p className="dim">
        (retired challenges, which nobody can solve now, are left out)
      </p>
      <ul className="labs gap">
        <li className="hi" aria-hidden="true">
          <span>LAB</span>
          <span className="num">SOLVED</span>
          <span className="num pts">POINTS</span>
        </li>
        {fy.labs.map((lab) => (
          <li key={lab.name}>
            <span>{lab.name}</span>
            <span className="num">
              {lab.solved}/{lab.challenges}
            </span>
            <span className="num pts">{n(lab.points)}</span>
            {lab.solved === lab.challenges ? (
              <span className="ok">cleared</span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="gap">
        writeups: {stats.writeups.challenges} challenges,{" "}
        {stats.writeups.solved} solved, at{" "}
        <a href="/ctf-writeups">/ctf-writeups</a>
      </p>
    </>
  );
}

export function FlagYardEvents() {
  return (
    <>
      {fy.events.map((e) => (
        <div key={e.url} className="event">
          <p>
            <a href={e.url}>
              {e.name} · {e.stage}
            </a>
            {organiser[e.name] ? ` (${organiser[e.name]})` : ""}
          </p>
          <dl className="kv">
            <dt>rank</dt>
            <dd>
              <b>
                {ordinal(e.rank)} of {n(e.teams)} teams
              </b>{" "}
              ({top(e.rank, e.teams)})
            </dd>
            <dt>team</dt>
            <dd>
              {e.team}
              {e.captain ? ", captain: me" : ""} · {e.teamSolves} of{" "}
              {e.challenges} challenges solved
            </dd>
            <dt>mine</dt>
            <dd>
              {e.mySolves} solves · {n(e.myPoints)} of {n(e.points)} points
              {e.myFirstBloods
                ? ` · ${plural(e.myFirstBloods, "first blood")}`
                : ""}
            </dd>
            <dt>ended</dt>
            <dd>{e.end}</dd>
          </dl>
        </div>
      ))}
    </>
  );
}
