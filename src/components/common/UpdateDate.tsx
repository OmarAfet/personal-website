import { getLastUpdateDate } from "@/actions";
import { format } from "date-fns";

export default async function UpdateDate() {
  const { updated_at } = await getLastUpdateDate();
  const formattedDate = format(new Date(updated_at), "yyyy-MM-dd");

  return (
    <div className="text-muted-foreground fixed bottom-2 left-2 text-xs">
      Updated at {formattedDate}
    </div>
  );
}
