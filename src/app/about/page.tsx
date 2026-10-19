import DocPage, { docMetadata } from "@/components/DocPage";
import { docsByPage } from "@/data/pages";

const doc = docsByPage.about;

export const metadata = docMetadata("about", doc);

export default function Page() {
  return <DocPage page="about" doc={doc} />;
}
