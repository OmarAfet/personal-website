// HTTP content negotiation (RFC 9110 §12.5.1) between the two representations
// every page has. After the acceptmarkdown.com Next.js recipe: the most
// specific matching range decides a type's q (so `text/html;q=0, */*` rejects
// HTML), the highest q wins, and on equal q the client's order breaks the tie.
export type Representation = "text/html" | "text/markdown";

const PRODUCES: Representation[] = ["text/html", "text/markdown"];

type Range = { type: string; q: number; specificity: number };

function parse(header: string): Range[] {
  return header.split(",").map((raw) => {
    const [type = "", ...params] = raw.trim().toLowerCase().split(";");
    let q = 1;
    for (const param of params) {
      const [name, value] = param.split("=").map((s) => s.trim());
      if (name === "q" && value !== undefined && !Number.isNaN(Number(value)))
        q = Math.max(0, Math.min(1, Number(value)));
    }
    const t = type.trim();
    return {
      type: t,
      q,
      specificity: t === "*/*" ? 0 : t.endsWith("/*") ? 1 : 2,
    };
  });
}

const matches = (range: Range, type: string) =>
  range.type === "*/*" ||
  (range.type.endsWith("/*") && type.startsWith(range.type.slice(0, -1))) ||
  range.type === type;

// null: the client accepts neither representation (answer 406).
export function negotiate(header: string | null): Representation | null {
  if (!header?.trim()) return "text/html";
  const ranges = parse(header);
  let best: Representation | null = null;
  let bestQ = 0;
  let bestAt = Infinity;
  for (const type of PRODUCES) {
    let match: Range | null = null;
    let at = Infinity;
    for (const [i, range] of ranges.entries()) {
      if (
        matches(range, type) &&
        (!match || range.specificity > match.specificity)
      ) {
        match = range;
        at = i;
      }
    }
    const q = match?.q ?? 0;
    if (q > bestQ || (q === bestQ && q > 0 && at < bestAt)) {
      best = type;
      bestQ = q;
      bestAt = at;
    }
  }
  return best;
}
