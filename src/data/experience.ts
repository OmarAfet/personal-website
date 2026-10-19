// Printed as `last`: each role is a login session. Sources: LinkedIn (via
// PROFILE.md), the SDAIA completion certificate (18 Jan - 16 Jul 2026) and the
// KSU graduation certificate (18 Jun 2026).
export type Session = {
  host: string;
  role: string;
  from: string;
  to: string | null;
  href?: string;
};

export const sessions: Session[] = [
  {
    host: "drjat",
    role: "Founder & CEO, DRJAT",
    from: "Jan 2026",
    to: null,
    href: "https://drjat.sa",
  },
  {
    host: "sdaia",
    role: "COOP, Saudi Data & AI Authority (SDAIA)",
    from: "Jan 2026",
    to: "Jul 2026",
  },
  {
    host: "bs6h",
    role: "Freelance developer, BS6H",
    from: "May 2024",
    to: "Jul 2025",
  },
  {
    host: "ksu",
    role: "Bachelor of Applied Computing, King Saud University",
    from: "Jan 2022",
    to: "Jun 2026",
  },
];
