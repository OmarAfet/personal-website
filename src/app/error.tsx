"use client";

import { useEffect } from "react";
import Prompt from "@/components/Prompt";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="tty">
      <h1 className="line bad">Segmentation fault (core dumped)</h1>
      {error.digest ? <p className="dim">digest {error.digest}</p> : null}
      <p className="gap">
        <Prompt />
        <button type="button" className="btn" onClick={() => retry()}>
          [run it again]
        </button>
      </p>
    </main>
  );
}
