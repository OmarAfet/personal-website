import ProjectCard from "@/components/common/ProjectCard";
import SkillsSection from "@/components/common/SkillsSection";
import SocialLink from "@/components/common/SocialLink";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import projects from "@/data/projects";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from "react-icons/ri";

export default function Home() {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="center m-auto flex max-w-lg flex-col">
      <h1>Omar Afet</h1>
      <p className="!mt-0 text-muted-foreground">
        Studying Computer Networks & Freelance Developer
      </p>
      <div className="mt-2 flex gap-1">
        <SocialLink href="https://twitter.com/OmarAfet">
          <RiTwitterXFill className="h-6 w-6" />
        </SocialLink>
        <SocialLink href="https://github.com/OmarAfet">
          <RiGithubFill className="h-6 w-6" />
        </SocialLink>
        <SocialLink href="https://www.linkedin.com/in/omarafet/">
          <RiLinkedinBoxFill className="h-6 w-6" />
        </SocialLink>
        <ThemeToggle />
      </div>
      <hr className="my-4 w-full" />
      <SkillsSection />
      <hr className="my-4 w-full" />
      <h3 className="mb-4 mt-0">Projects</h3>
      <div className="flex w-full flex-col gap-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        <div className="center text-xs text-muted-foreground">
          More Coming in the Future...
        </div>
      </div>
    </div>
  );
}
