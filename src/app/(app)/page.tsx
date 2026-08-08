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
    <div className="m-auto flex max-w-lg flex-col items-center justify-center">
      <h1 className="text-4xl font-black">Omar Afet</h1>
      <p className="text-muted-foreground !mt-0 text-center">
        Founder & CEO{" "}
        <a
          href="https://x.com/DRJAT_SA"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:underline"
        >
          @DRJAT_SA
        </a>{" "}
        · Ex-COOP{" "}
        <a
          href="https://x.com/SDAIA_SA"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:underline"
        >
          @SDAIA_SA
        </a>{" "}
        · Fresh Grad{" "}
        <a
          href="https://x.com/_KSU"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:underline"
        >
          @_KSU
        </a>{" "}
        · AI · Cyber Security · Coding · Quantum Computing · Fascinated by the
        science of Time
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
      <h2 className="mt-0 mb-2 text-2xl font-bold">Projects</h2>
      <div className="flex w-full flex-col gap-2">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        <i className="text-muted-foreground items-center justify-center text-xs">
          Much more private projects...
        </i>
        <UpdateDate />
      </div>
    </div>
  );
}
