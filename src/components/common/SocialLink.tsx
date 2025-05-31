import { cn } from "@/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function SocialLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <Link
      className={cn(`${buttonVariants({ variant: "ghost", size: "icon" })}`)}
      href={href}
      target="_blank"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
