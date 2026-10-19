import Link from "next/link";
import Prompt from "@/components/Prompt";

export default function NotFound() {
  return (
    <main className="tty">
      <h1 className="line">
        <Prompt />
        <span className="cmd">cd $OLDPWD</span>
      </h1>
      <p>cd: no such file or directory (404)</p>
      <p className="gap">
        <Prompt />
        <Link href="/">cd ~</Link>
      </p>
    </main>
  );
}
