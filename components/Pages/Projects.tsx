"use client";

import ProjectCard from "@components/ProjectCard";
import projects from "@data/Projects";
import { motion } from "framer-motion";

export default function Projects() {
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col gap-4">
				<div id="Projects" className="center header scroll-mt-12">
					Projects
				</div>
				<div className="flex gap-8 flex-wrap center">
					{projects.map((project, i) => (
						<motion.div key={project.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="duration-0">
							<ProjectCard title={project.title} description={project.description} link={project.link} />
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
