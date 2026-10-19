import DocPage, { docMetadata } from "@/components/DocPage";
import { docsByPage } from "@/data/pages";

const doc = docsByPage.docs;

export const metadata = docMetadata("docs", doc);

export default function Page() {
  return <DocPage page="docs" doc={doc} />;
}
