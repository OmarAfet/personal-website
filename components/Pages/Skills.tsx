"use client";

import skills from "@data/Skills";
import { motion } from "framer-motion";

export default function Skills() {
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col gap-4">
				<div id="Skills" className="center header scroll-mt-12">
					Skills
				</div>
				<div className="flex flex-wrap gap-4 md:mx-[20%] justify-center">
					{skills.map((skill, i) => (
						<motion.div key={skill.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="duration-0">
							<div className="btn-0 shadow-md">{skill.name}</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
