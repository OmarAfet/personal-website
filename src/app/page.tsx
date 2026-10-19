import type { ReactNode } from "react";
import Boot, { BOOT_MS } from "@/components/Boot";
import Nmap from "@/components/Nmap";
import Achievements from "@/components/output/Achievements";
import Badges from "@/components/output/Badges";
import BugBounty from "@/components/output/BugBounty";
import Certificates from "@/components/output/Certificates";
import Fastfetch from "@/components/output/Fastfetch";
import { FlagYardEvents, FlagYardProfile } from "@/components/output/FlagYard";
import Last from "@/components/output/Last";
import { CoderHubStats, Interests, Links } from "@/components/output/Misc";
import Shell from "@/components/Shell";
import StatusBar from "@/components/StatusBar";
import Step from "@/components/Step";
import Typewriter from "@/components/Typewriter";
import { age, links, profile } from "@/data/profile";
import { filters, projects } from "@/data/projects";
import { sections } from "@/data/sections";

// The page is prerendered, so these are the build (deploy) time, in Riyadh.
const now = new Date();
const riyadh = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Riyadh", ...opts }).format(
    now,
  );
const today = riyadh({ year: "numeric", month: "2-digit", day: "2-digit" });
const started = `${today} ${riyadh({ hour: "2-digit", minute: "2-digit", hourCycle: "h23" })} +03`;

// The first command types in CSS right after the boot log (Step `auto`); the
// Typewriter takes over after it. Same speed as the Typewriter: 24 ms a key.
const firstMs = Math.min((sections[0]?.cmd.length ?? 0) * 24, 520);

const outputs: Record<string, ReactNode> = {
  fastfetch: <Fastfetch />,
  ctf: <FlagYardProfile />,
  events: <FlagYardEvents />,
  bounty: <BugBounty />,
  projects: (
    <Nmap
      hosts={projects}
      filters={filters}
      started={started}
      uptime={age(now)}
    />
  ),
  experience: <Last />,
  achievements: <Achievements />,
  certs: <Certificates />,
  badges: <Badges />,
  interests: <Interests />,
  coderhub: <CoderHubStats />,
  links: <Links updated={today} />,
};

// Structured data for search engines and agents: the page is the profile of a
// person; DRJAT is the organisation he founded, with its public support
// address (support@drjat.sa, on drjat.sa) as the contact point, since Omar
// publishes no personal email or phone (2026-10-19).
const site = profile.url;
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: profile.name,
      inLanguage: "en",
      publisher: { "@id": `${site}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site}/#profile`,
      url: `${site}/`,
      name: `${profile.name}: ${profile.headline}`,
      isPartOf: { "@id": `${site}/#website` },
      mainEntity: { "@id": `${site}/#person` },
      dateModified: today,
    },
    {
      "@type": "Person",
      "@id": `${site}/#person`,
      name: profile.name,
      alternateName: [profile.fullName, profile.handle],
      url: `${site}/`,
      image: `${site}/opengraph-image`,
      description: profile.headline,
      jobTitle: "Founder & CEO",
      worksFor: { "@id": "https://drjat.sa/#organization" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "King Saud University",
        url: "https://ksu.edu.sa",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riyadh",
        addressCountry: "SA",
      },
      knowsLanguage: ["ar", "en"],
      knowsAbout: [
        "Offensive security",
        "Penetration testing",
        "Red teaming",
        "Capture the flag",
        "Reverse engineering",
      ],
      sameAs: links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
    },
    {
      "@type": "Organization",
      "@id": "https://drjat.sa/#organization",
      name: "DRJAT",
      legalName: "Hulul Drjat Est.",
      url: "https://drjat.sa",
      description: "AI exam preparation for the Saudi Qiyas tests.",
      founder: { "@id": `${site}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riyadh",
        addressCountry: "SA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@drjat.sa",
        areaServed: "SA",
        availableLanguage: ["ar", "en"],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <main id="top" className="tty">
        <h1 className="sr-only">
          {profile.name}: {profile.headline}
        </h1>
        <Boot />
        {sections.map((s, i) => (
          <Step
            key={s.id}
            section={s}
            {...(i === 0 && { auto: { delay: BOOT_MS, type: firstMs } })}
          >
            {outputs[s.id]}
          </Step>
        ))}
        <Shell sections={sections} links={links} uptime={age(now)} />
      </main>
      <StatusBar
        windows={sections.flatMap((s) =>
          s.win ? [{ id: s.id, name: s.win }] : [],
        )}
      />
      <Typewriter startMs={BOOT_MS + firstMs + 120} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
