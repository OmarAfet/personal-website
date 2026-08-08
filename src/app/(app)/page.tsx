import DomainsSection from "@/components/common/DomainsSection";
import SectionLabel from "@/components/common/SectionLabel";
import SocialLink from "@/components/common/SocialLink";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import Timeline from "@/components/common/Timeline";
import UpdateDate from "@/components/common/UpdateDate";
import projects from "@/data/projects";
import social_links from "@/data/social_links";

const handle = (href: string, label: string) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-foreground decoration-time/60 underline-offset-4 hover:underline"
  >
    {label}
  </a>
);

export default function Home() {
  const years = projects.map((p) => new Date(p.createdAt).getFullYear());
  const span = `${Math.min(...years)} — ${Math.max(...years)}`;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Omar Afet
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed text-pretty">
          Founder &amp; CEO {handle("https://x.com/DRJAT_SA", "@DRJAT_SA")} ·
          Ex-COOP {handle("https://x.com/SDAIA_SA", "@SDAIA_SA")} · Fresh Grad{" "}
          {handle("https://x.com/_KSU", "@_KSU")} · AI · Cyber Security · Coding
          · Quantum Computing · Fascinated by the science of Time
        </p>
        <div className="-ml-2 flex gap-0.5 pt-5">
          {social_links.map(({ href, Icon, ariaLabel }) => (
            <SocialLink key={href} href={href} ariaLabel={ariaLabel}>
              <Icon className="h-[1.15rem] w-[1.15rem]" />
            </SocialLink>
          ))}
          <ThemeSwitcher />
        </div>
      </header>

      <div className="mt-16">
        <DomainsSection />
      </div>

      <section className="mt-16">
        <SectionLabel trailing={span}>Selected work</SectionLabel>
        <Timeline projects={projects} />
        <p className="text-muted-foreground/70 pl-6 text-xs italic sm:pl-[5.25rem]">
          Much more private projects...
        </p>
      </section>

      <UpdateDate />
    </main>
  );
}
