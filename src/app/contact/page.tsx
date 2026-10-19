import DocPage, { docMetadata } from "@/components/DocPage";
import { docsByPage } from "@/data/pages";

const doc = docsByPage.contact;

export const metadata = docMetadata("contact", doc);

export default function Page() {
  return <DocPage page="contact" doc={doc} />;
}
