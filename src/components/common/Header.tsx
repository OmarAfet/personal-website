import Link from "next/link";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

const links = ["About", "Contact"];

export default function Header() {
	return (
		<header className="border-b sticky top-0 z-10 backdrop-blur flex items-center justify-between px-4 py-2">
			<Logo />
			<div className="flex gap-4 items-center">
				{links.map((link) => (
					<Link key={link} href={`/${link.toLowerCase()}`} className="link">
						{link}
					</Link>
				))}
				<ModeToggle />
			</div>
		</header>
	);
}
