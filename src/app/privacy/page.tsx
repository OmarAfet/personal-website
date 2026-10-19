import DocPage, { docMetadata } from "@/components/DocPage";
import { docsByPage } from "@/data/pages";

const doc = docsByPage.privacy;

export const metadata = docMetadata("privacy", doc);

export default function Page() {
  return <DocPage page="privacy" doc={doc} />;
}
