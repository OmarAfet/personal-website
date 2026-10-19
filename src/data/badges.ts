import stats from "./stats.json";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// FlagYard badges come from the API (stats.json). Tuwaiq badges are the 20
// cards in Certificates/Tuwaiq/Badges, translated from Arabic, newest first.
export const badges: { dir: string; names: string[] }[] = [
  { dir: "flagyard", names: stats.flagyard.badges.map(slug) },
  {
    dir: "tuwaiq",
    names: [
      "black-hat-mea-2023-bronze-day-3",
      "nahlam-level-1",
      "participation",
      "python-101",
      "swift-102",
      "swift-101",
      "javascript-level-4",
      "national-day-93-al-majd",
      "national-day-93-al-namaa",
      "python-level-5",
      "national-day-93-al-amal",
      "national-day-93-participant",
      "github",
      "mongodb",
      "express",
      "nodejs",
      "sql-102",
      "sql-101",
      "python-103",
      "python-102",
    ],
  },
];
