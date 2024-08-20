import ProjectCard from "@/components/common/ProjectCard";
import SkillsSection from "@/components/common/SkillsSection";
import SocialLink from "@/components/common/SocialLink";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import UpdateDate from "@/components/common/UpdateDate";
import projects from "@/data/projects";
import social_links from "@/data/social_links";

export default async function Home() {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="center m-auto flex max-w-lg flex-col">
      <h1>Omar Afet</h1>
      <p className="!mt-0 text-muted-foreground text-center">
        Studying Computer Networks & Freelance Developer
      </p>
      <div className="mt-2 flex gap-1">
        {social_links.map(({ href, Icon, ariaLabel }) => (
          <SocialLink key={href} href={href} ariaLabel={ariaLabel}>
            <Icon className="h-6 w-6" />
          </SocialLink>
        ))}
        <ThemeToggle />
      </div>
      <hr className="my-4 w-full" />
      <i>Looking for a Part-Time Job</i>
      <hr className="my-4 w-full" />
      <SkillsSection />
      <hr className="my-4 w-full" />
      <h2 className="mb-2 mt-0 border-none text-[25px]">Projects</h2>
      <div className="flex w-full flex-col gap-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        <i className="center text-xs text-muted-foreground">
          More Coming in the Future...
        </i>
        <UpdateDate />
      </div>
    </div>
  );
}
