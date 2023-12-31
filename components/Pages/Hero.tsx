import Socials from "@components/Socials";
import Image from "next/image";

export default function Hero() {
	return (
		<div className="flex md:flex-row flex-col-reverse lg:gap-48 gap-16 justify-center items-center">
			<div className="flex flex-col gap-4">
				<div className="header">Hello, I&apos;m Omar</div>
				<div className="subtitle">Hello There! I&apos;m Omar Afet, a teenager freelance developer with an insatiable passion for programming. My ethos revolves around three pillars: Honesty, Simplicity, and Logic. These principles not only shape my coding endeavors but also resonate in every decision I make.</div>
				<Socials size={32} />
			</div>
			<Image priority className="w-64 h-64 aspect-square rounded-full" src="/Avatar.png" alt="Avatar" width={1080} height={1080} />
		</div>
	);
}
