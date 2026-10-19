// Scrolls to a section and puts it in the address bar, so it can be shared.
export function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}
