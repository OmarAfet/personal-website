import type { CSSProperties, ReactNode } from "react";
import type { Section } from "@/data/sections";
import Prompt from "./Prompt";

// A command line and its output. The Typewriter types the command when the
// step scrolls into view, then prints the output. An `auto` step instead runs
// in CSS right after the boot log (delay and typing time in ms), so the first
// screen does not wait for JavaScript.
export default function Step({
  section: { id, cmd, label },
  auto,
  children,
}: {
  section: Section;
  auto?: { delay: number; type: number };
  children: ReactNode;
}) {
  const timing = auto
    ? ({ "--d": `${auto.delay}ms`, "--t": `${auto.type}ms` } as CSSProperties)
    : undefined;
  return (
    <section
      id={id}
      className={auto ? "step auto" : "step"}
      style={timing}
      data-step
      aria-labelledby={`${id}-cmd`}
    >
      <h2 id={`${id}-cmd`} className="line">
        <span className="sr-only">{label}: </span>
        <Prompt />
        <kbd className="cmd" style={{ "--n": cmd.length } as CSSProperties}>
          {cmd}
        </kbd>
      </h2>
      <div className="out">{children}</div>
    </section>
  );
}
