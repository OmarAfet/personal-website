import Link from "next/link";
import { RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill } from "react-icons/ri";

export default function Socials({ size }: { size: number }) {
	const customSize = `${size}px`;

	return (
		<div className="flex gap-2 text-left items-center">
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://x.com/OmarAfet">
				<RiTwitterXFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://github.com/OmarAfet">
				<RiGithubFill style={{ height: customSize, width: customSize }} />
			</Link>
			<Link className="opacity-50 hover:opacity-100" target="_blank" href="https://www.linkedin.com/in/omarafet/">
				<RiLinkedinBoxFill style={{ height: customSize, width: customSize }} />
			</Link>
		</div>
	);
}
