"use client";

import { useEffect } from "react";

const CHAR_MS = 24;
const MAX_MS = 520;

// Types each step's command when the step is on screen, then prints its output.
// Steps go in order; a step that was scrolled past prints at once, so nobody
// waits for text they skipped. Any key or click prints everything.
export default function Typewriter({ startMs }: { startMs: number }) {
  useEffect(() => {
    const html = document.documentElement;
    const all = [...document.querySelectorAll<HTMLElement>("[data-step]")];
    const steps = all.filter((s) => !s.classList.contains("auto"));
    const done = (s: HTMLElement) => {
      s.classList.remove("typing");
      s.classList.add("done");
    };

    // Auto steps print in CSS; "done" only shows their command in full.
    all.filter((s) => s.classList.contains("auto")).forEach(done);

    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      /bot|crawl|spider|slurp/i.test(navigator.userAgent)
    ) {
      steps.forEach(done);
      return;
    }

    const onScreen = new Set<Element>();
    let next = 0;
    let busy = false;
    let timer = 0;

    const pump = () => {
      while (!busy && next < steps.length) {
        const s = steps[next]!;
        if (s.getBoundingClientRect().bottom < 0) {
          done(s);
          next++;
          continue;
        }
        if (!onScreen.has(s)) return;
        const n =
          s.querySelector<HTMLElement>(".cmd")?.textContent?.length ?? 8;
        const ms = Math.min(n * CHAR_MS, MAX_MS);
        s.style.setProperty("--t", `${ms}ms`);
        s.classList.add("typing");
        busy = true;
        timer = window.setTimeout(() => {
          done(s);
          next++;
          busy = false;
          pump();
        }, ms);
      }
    };

    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.metaKey || e.ctrlKey || e.altKey))
        return;
      if (e.target instanceof HTMLInputElement) return;
      window.clearTimeout(timer);
      steps.forEach(done);
      next = steps.length;
      html.classList.add("booted");
      stop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onScreen.add(e.target);
          else onScreen.delete(e.target);
        }
        pump();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const start = window.setTimeout(
      () => steps.forEach((s) => io.observe(s)),
      startMs,
    );
    addEventListener("keydown", skip);
    addEventListener("click", skip);

    function stop() {
      io.disconnect();
      removeEventListener("keydown", skip);
      removeEventListener("click", skip);
    }

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
      stop();
    };
  }, [startMs]);

  return null;
}
