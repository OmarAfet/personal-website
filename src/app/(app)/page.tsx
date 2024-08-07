import { getLastUpdateDate } from "@/actions";
import ProjectCard from "@/components/common/ProjectCard";
import SkillsSection from "@/components/common/SkillsSection";
import SocialLink from "@/components/common/SocialLink";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import projects from "@/data/projects";
import social_links from "@/data/social_links";
import { format } from "date-fns";

export default async function Home() {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const { updated_at } = await getLastUpdateDate();
  const formattedDate = format(new Date(updated_at), "yyyy-MM-dd");

  return (
    <div className="center m-auto flex max-w-lg flex-col">
      <h1>Omar Afet</h1>
      <p className="!mt-0 text-muted-foreground">
        Studying Computer Networks & Freelance Developer
      </p>
      <div className="mt-2 flex gap-1">
        {social_links.map(({ href, Icon }) => (
          <SocialLink key={href} href={href}>
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
      <h3 className="mb-4 mt-0">Projects</h3>
      <div className="flex w-full flex-col gap-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        <i className="center text-xs text-muted-foreground">
          More Coming in the Future...
        </i>
        <div className="fixed bottom-2 left-2 text-xs text-muted-foreground">
          Updated at {formattedDate}
        </div>
      </div>
    </div>
  );
}
