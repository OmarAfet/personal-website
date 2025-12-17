import ProjectCard from "@/components/common/ProjectCard";
import SkillsSection from "@/components/common/SkillsSection";
import SocialLink from "@/components/common/SocialLink";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import UpdateDate from "@/components/common/UpdateDate";
import projects from "@/data/projects";
import social_links from "@/data/social_links";

export default async function Home() {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="items-center justify-center m-auto flex max-w-lg flex-col">
      <h1 className="text-4xl font-black">Omar Afet</h1>
      <p className="!mt-0 text-muted-foreground text-center">
        Computer Networks student at King Saud University · Self-Taught · AI · Mathematics · Coding · Science · Quantum Computing
      </p>
      {/* TODO: Contribution Graph */}
      <div className="mt-2 flex gap-1">
        {social_links.map(({ href, Icon, ariaLabel }) => (
          <SocialLink key={href} href={href} ariaLabel={ariaLabel}>
            <Icon className="h-6 w-6" />
          </SocialLink>
        ))}
        <ThemeSwitcher />
      </div>
      <hr className="my-4 w-full" />
      <SkillsSection />
      <hr className="my-4 w-full" />
      <h2 className="mb-2 mt-0 text-2xl font-bold">Projects</h2>
      <div className="flex w-full flex-col gap-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        <i className="items-center justify-center text-xs text-muted-foreground">
          Much more private projects...
        </i>
        <UpdateDate />
      </div>
    </div>
  );
}
