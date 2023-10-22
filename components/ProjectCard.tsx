import Link from "next/link";

type ProjectType = {
	title: string;
	description: string;
	link: string;
};

export default function ProjectCard({ title, description, link }: ProjectType) {
	return (
		<div className="pad flex flex-col text-center gap-4 w-64 shadow-lg top-0 relative hover:-top-2">
			<div className="title">{title}</div>
			<div className="subtitle px-2">{description}</div>
			<Link target="_blank" href={link} className="btn-1 mt-16">
				View
			</Link>
		</div>
	);
}
