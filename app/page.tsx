import Hero from "@components/Pages/Hero";
import About from "@components/Pages/About";
import Skills from "@components/Pages/Skills";
import Contact from "@components/Pages/Contact";
import Projects from "@components/Pages/Projects";

export default function Home() {
	return (
		<>
			<div className="space-y-48">
				<Hero />
				<hr />
				<About />
				<Skills />
				<Projects />
				<Contact />
			</div>
		</>
	);
}
