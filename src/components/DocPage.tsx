import type { Metadata } from "next";
import Link from "next/link";
import type { Block, Doc } from "@/data/pages";
import Prompt from "./Prompt";

// /about, /contact, /privacy and /docs: the same console, one `cat` each.
export function docMetadata(page: string, doc: Doc): Metadata {
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `/${page}`,
      types: { "text/markdown": `/${page}.md` },
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: `/${page}`,
    },
  };
}

function Part({ block }: { block: Block }) {
  if ("p" in block) return <p className="gap">{block.p}</p>;
  if ("h" in block) return <h2 className="gap dim"># {block.h}</h2>;
  if ("code" in block) return <p className="gap hi">$ {block.code}</p>;
  return (
    <ul className="gap">
      {block.list.map((item) => (
        <li key={item.text}>
          - {item.href ? <a href={item.href}>{item.text}</a> : item.text}
        </li>
      ))}
    </ul>
  );
}

export default function DocPage({ page, doc }: { page: string; doc: Doc }) {
  return (
    <main className="tty">
      <p>
        <Prompt />
        <span className="cmd">cat ~/{page}.md</span>
      </p>
      <h1 className="gap hi">{doc.title}</h1>
      {doc.blocks.map((block, i) => (
        <Part key={i} block={block} />
      ))}
      <p className="gap">
        <Prompt />
        <Link href="/">cd ~</Link>{" "}
        <span className="dim">
          · <a href={`/${page}.md`}>{page}.md</a>
        </span>
      </p>
    </main>
  );
}
