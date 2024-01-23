import Link from "next/link";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="text-xs p-4 border-t flex text-muted-foreground whitespace-pre mt-16">
			&copy; {year}{" "}
			<Link className="link" href="https://github.com/OmarAfet">
				@OmarAfet
			</Link>
		</footer>
	);
}
