import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
	return (
		<header className="border-b sticky top-0 z-10 backdrop-blur flex items-center justify-between px-4 py-2">
			<Logo />
			<ModeToggle />
		</header>
	);
}
