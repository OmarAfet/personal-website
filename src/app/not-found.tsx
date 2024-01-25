import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function notFound() {
	return (
		<div className="w-full h-full center gap-8 text-2xl flex-col">
			<div className="center gap-4 text-2xl">
				<h1 className="text-red-500">404</h1>
				<div className="h-12">
					<Separator orientation="vertical" />
				</div>
				<h4>Page Not Found.</h4>
			</div>
			<div>
				<Link href="/">
					<Button variant="outline">Return Home</Button>
				</Link>
			</div>
		</div>
	);
}
