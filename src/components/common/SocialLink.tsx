import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={cn(`${buttonVariants({ variant: "ghost", size: "icon" })}`)}
      href={href}
    >
      {children}
    </Link>
  );
}
