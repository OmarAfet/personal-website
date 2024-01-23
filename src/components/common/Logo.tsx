import Vercel from "@/icons/Vercel";
import Link from "next/link";

export default function Logo() {
	return (
		<Link href="/" className="flex items-center gap-2 cursor-pointer">
			<Vercel />
			<div className="text-xl font-bold">Logo</div>
		</Link>
	);
}
