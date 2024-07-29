"use client";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="center mx-auto h-full w-full max-w-lg flex-col gap-8 text-center">
      <div className="center flex-col gap-4">
        <h1 className="font-bold text-red-500">ERROR</h1>
        <Separator />
        <p className="!mt-0">
          We&apos;re sorry, but an error occurred while processing your request.
          Please try again later.
        </p>
      </div>
      <div className="center flex flex-wrap gap-4">
        <Link className={buttonVariants({ variant: "default" })} href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
