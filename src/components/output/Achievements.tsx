import { achievements } from "@/data/achievements";

export default function Achievements() {
  return (
    <div className="log">
      {achievements.map(({ section, items }) => (
        <section key={section} aria-label={section}>
          <h3># {section}</h3>
          <ul className="rec">
            {items.map((a) => (
              <li key={a.what}>
                <p>
                  <span className={a.mark === "+" ? "mark-plus" : "mark-star"}>
                    [{a.mark}]
                  </span>{" "}
                  {a.href ? <a href={a.href}>{a.what}</a> : a.what}
                </p>
                <p className="sub">
                  <span className={a.mark === "+" ? "hi" : ""}>{a.result}</span>
                  <span className="dim"> · {a.when}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
