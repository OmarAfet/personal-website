import { sessions } from "@/data/experience";

const MONTHS = "JanFebMarAprMayJunJulAugSepOctNovDec";

// "May 2024" to "Jul 2025" -> "1 yr 2 mo".
const months = (from: string, to: string) => {
  const m = (s: string) => {
    const [mon = "", year = ""] = s.split(" ");
    return Number(year) * 12 + MONTHS.indexOf(mon) / 3;
  };
  const total = m(to) - m(from);
  const y = Math.floor(total / 12);
  const r = total % 12;
  return [y && `${y} yr`, r && `${r} mo`].filter(Boolean).join(" ");
};

// `last`: one login session per role, newest first.
export default function Last() {
  return (
    <>
      <ul className="rec">
        {sessions.map((s) => (
          <li key={s.host}>
            <p>
              omar{"   "}
              <span className="hi">{s.host.padEnd(6)}</span> {s.from} -{" "}
              {s.to ? (
                <>
                  {s.to}{" "}
                  <span className="dim">
                    ({s.host === "ksu" ? "graduated" : months(s.from, s.to)})
                  </span>
                </>
              ) : (
                <span className="ok">still logged in</span>
              )}
            </p>
            <p className="sub">
              {s.href ? <a href={s.href}>{s.role}</a> : s.role}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
