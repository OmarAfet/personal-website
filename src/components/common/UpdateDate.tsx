import { format } from "date-fns";

// The page is prerendered, so this is evaluated at build time - the deploy date.
export default function UpdateDate() {
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="text-muted-foreground fixed bottom-2 left-2 text-xs">
      Updated at {formattedDate}
    </div>
  );
}
