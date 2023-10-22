import Link from "next/link";

export default function AllPages() {
	return (
		<>
			<Link href="#About" className="btn-click">
				About
			</Link>
			<Link href="#Skills" className="btn-click">
				Skills
			</Link>
			<Link href="#Projects" className="btn-click">
				Projects
			</Link>
			<Link href="#Contact" className="btn-click">
				Contact
			</Link>
		</>
	);
}
