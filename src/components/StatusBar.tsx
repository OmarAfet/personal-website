"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { go } from "./go";

type Window = { id: string; name: string };

// tmux shows the time as "04:12 19-Oct-26"; this machine is in Riyadh.
function clock() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  return `${parts.hour}:${parts.minute} ${parts.day}-${parts.month}-${parts.year}`;
}

const everyHalfMinute = (onChange: () => void) => {
  const t = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(t);
};

// The tmux status line: one window per section, the current one marked with *.
export default function StatusBar({ windows }: { windows: Window[] }) {
  const [active, setActive] = useState<string | undefined>(windows[0]?.id);
  // Empty on the server, so the static HTML carries no stale time.
  const time = useSyncExternalStore(everyHalfMinute, clock, () => "");
  const bar = useRef<HTMLElement>(null);

  // On a phone the bar scrolls sideways; keep the current window in it.
  useEffect(() => {
    const el = bar.current;
    const btn = el?.querySelector<HTMLElement>('[aria-current="true"]');
    if (el && btn)
      el.scrollLeft = btn.offsetLeft - (el.clientWidth - btn.offsetWidth) / 2;
  }, [active]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = innerHeight * 0.4;
        let current = windows[0]?.id;
        for (const w of windows) {
          const top = document
            .getElementById(w.id)
            ?.getBoundingClientRect().top;
          if (top !== undefined && top < line) current = w.id;
        }
        // At the end of the page the last section may never reach the line.
        const end =
          innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
        setActive(end ? windows.at(-1)?.id : current);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [windows]);

  return (
    <nav ref={bar} className="tmux" aria-label="Sections">
      <ol>
        <li aria-hidden="true">[omarafet] </li>
        {windows.map((w, i) => (
          <li key={w.id}>
            <button
              type="button"
              aria-current={active === w.id}
              onClick={() => go(w.id)}
            >
              {i}:{w.name}
              {active === w.id ? "*" : " "}
            </button>
          </li>
        ))}
      </ol>
      <span className="right" aria-hidden="true">
        &quot;tty1&quot; {time}
      </span>
    </nav>
  );
}
