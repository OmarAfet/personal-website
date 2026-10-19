// Printed as `ls -l` of ~/certs: one folder per kind, the issuer as the file's
// group. Sources: Certificates/INVENTORY.md and the files in the Omar workspace.
// Coursera IDs verify at coursera.org/verify/<id>. The Tuwaiq Satr PDFs print the
// short name "عمر العنزي"; the full list is on profile.tuwaiq.edu.sa/omarafet.
export type Certificate = {
  issuer: string;
  date: string;
  name: string;
  href?: string;
};

const coursera = (id: string) => `https://coursera.org/verify/${id}`;

export const certificates: { dir: string; files: Certificate[] }[] = [
  {
    dir: "security",
    files: [
      {
        issuer: "isc2",
        date: "2025-01-30",
        name: "incident-response-and-recovery",
        href: coursera("NUEXQ41DXEHC"),
      },
      {
        issuer: "isc2",
        date: "2025-01-30",
        name: "network-and-communications-security",
        href: coursera("C7H8HSP5FKE2"),
      },
      {
        issuer: "ibm",
        date: "2025-01-30",
        name: "introduction-to-cybersecurity-essentials",
        href: coursera("TRE7971KKJIC"),
      },
      {
        issuer: "uc-davis",
        date: "2025-01-27",
        name: "principles-of-secure-coding",
        href: coursera("MUFW8H2151HF"),
      },
      { issuer: "tuwaiq", date: "2026-01-30", name: "network-security-102" },
      { issuer: "tuwaiq", date: "2026-01-30", name: "network-security-101" },
    ],
  },
  {
    dir: "work",
    files: [
      {
        issuer: "sdaia",
        date: "2026-07-16",
        name: "coop-training-program-completion",
      },
    ],
  },
  {
    dir: "events",
    files: [
      {
        issuer: "islamicaich",
        date: "2026-10",
        name: "ai-assisted-agentic-software-development",
      },
      {
        issuer: "islamicaich",
        date: "2026-10",
        name: "ai-powered-ui-ux-design",
      },
      {
        issuer: "islamicaich",
        date: "2026-10",
        name: "business-model-innovation",
      },
      {
        issuer: "islamicaich",
        date: "2026-09",
        name: "ai-challenge-participant",
      },
      { issuer: "tuwaiq", date: "2026-03-15", name: "tuwaiq-coding-challenge" },
      { issuer: "aws", date: "2025-05", name: "aws-gameday-participation" },
      { issuer: "ksu", date: "2025-05", name: "transformation-hackathon-2025" },
      {
        issuer: "alibaba-cloud",
        date: "2023-03-27",
        name: "saudi-hackathon-leap-2023",
        href: "https://www.credential.net/e05fbdcd-d9b9-42d1-8e93-9b97e10f4aa4",
      },
    ],
  },
  {
    dir: "courses",
    files: [
      {
        issuer: "calarts",
        date: "2024-08-23",
        name: "plan-a-successful-freelancing-business",
        href: coursera("ASUK51G8YU4D"),
      },
      {
        issuer: "ibm",
        date: "2023-11-05",
        name: "getting-started-with-git-and-github",
        href: coursera("J5UPF9TCDMED"),
      },
      {
        issuer: "ibm",
        date: "2023-11-05",
        name: "web-development-with-html-css-javascript",
        href: coursera("JVRRKGWQDG9A"),
      },
      {
        issuer: "ibm",
        date: "2023-11-02",
        name: "introduction-to-cloud-computing",
        href: coursera("VJXZAKJZE2CX"),
      },
    ],
  },
];

// Tuwaiq Academy's Satr platform: 27 course certificates, newest first.
// network-security-101/102 are listed again above under security.
export const satr: Certificate[] = [
  ["2026-01-30", "network-security-102"],
  ["2026-01-30", "network-security-101"],
  ["2026-01-30", "network-programming-102"],
  ["2026-01-30", "network-programming-101"],
  ["2025-05-24", "flutter-101"],
  ["2024-08-20", "python-101"],
  ["2024-01-19", "swift-102"],
  ["2024-01-18", "firebase-fundamentals"],
  ["2024-01-17", "swift-101"],
  ["2023-08-18", "git-101"],
  ["2023-08-06", "yaml-101"],
  ["2023-07-17", "react-102"],
  ["2023-02-26", "react-101"],
  ["2023-02-26", "heroku"],
  ["2023-02-26", "nodejs-mvc"],
  ["2023-02-26", "mongodb"],
  ["2023-02-26", "express"],
  ["2023-02-26", "nodejs"],
  ["2023-02-26", "sql-102"],
  ["2023-02-26", "sql-101"],
  ["2023-02-26", "python-103"],
  ["2023-02-26", "introduction-to-dom"],
  ["2023-02-26", "python-102"],
  ["2023-02-26", "bootstrap"],
  ["2023-02-26", "javascript-101"],
  ["2023-02-26", "css"],
  ["2023-02-26", "html"],
].map(([date, name]) => ({ issuer: "tuwaiq", date, name }));

export const tuwaiqProfile = "https://profile.tuwaiq.edu.sa/omarafet";
