import { format } from "date-fns";

// The page is prerendered, so this is evaluated at build time - the deploy date.
export default function UpdateDate() {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  return (
    <footer className="border-border text-muted-foreground mt-20 border-t pt-6 font-mono text-xs tracking-wide">
      Updated at <span className="tabular-nums">{formattedDate}</span>
    </footer>
  );
}
