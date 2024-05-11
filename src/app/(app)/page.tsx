import { getLastUpdateDate } from "@/actions";
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

export default async function Home() {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const lastUpdateDate = await getLastUpdateDate();

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
        <ThemeToggle className="fixed left-2 top-2" />
      </div>
      <hr className="my-4 w-full" />
      <i>Looking for an Online Job</i>
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
        <div className="fixed bottom-2 left-2 text-xs text-muted-foreground">
          Updated at{" "}
          {`${new Date(lastUpdateDate.updated_at).getFullYear()}-${new Date(lastUpdateDate.updated_at).getMonth() + 1}-${new Date(lastUpdateDate.updated_at).getDate()}`}
        </div>
      </div>
    </div>
  );
}
