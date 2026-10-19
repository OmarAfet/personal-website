import { badges } from "@/data/badges";

// Badges a CTF player would point at first.
const notable = (name: string) =>
  name.endsWith("-master") || name.startsWith("black-hat");

// `ls ~/badges/*`: names in columns, sorted the way ls sorts them.
export default function Badges() {
  return (
    <>
      {badges.map(({ dir, names }) => (
        <section key={dir} aria-label={dir} className="gap">
          <p>/root/badges/{dir}:</p>
          <ul className="ls">
            {[...names].sort().map((name) => (
              <li key={name} className={notable(name) ? "hi" : ""}>
                {name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
