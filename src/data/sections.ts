// The page is one shell session: each section is a command and its output.
// `win` names the section in the tmux status line; sections without one are
// reached through the window above them.
export type Section = {
  id: string;
  cmd: string;
  label: string;
  win?: string;
};

export const sections: Section[] = [
  { id: "fastfetch", cmd: "fastfetch", label: "Summary", win: "fastfetch" },
  {
    id: "ctf",
    cmd: "flagyard profile OmarAfet",
    label: "CTF profile",
    win: "ctf",
  },
  { id: "events", cmd: "flagyard events --mine", label: "CTF events" },
  { id: "bounty", cmd: "bbsa stats", label: "Bug bounty", win: "bounty" },
  {
    id: "projects",
    cmd: "nmap -sV -sC omarafet",
    label: "Projects",
    win: "nmap",
  },
  {
    id: "experience",
    cmd: "last omar",
    label: "Experience and education",
    win: "last",
  },
  {
    id: "achievements",
    cmd: "cat ~/achievements.log",
    label: "Achievements",
    win: "loot",
  },
  { id: "certs", cmd: "ls -l ~/certs/*", label: "Certificates", win: "certs" },
  { id: "badges", cmd: "ls ~/badges/*", label: "Badges", win: "badges" },
  { id: "interests", cmd: "cat ~/.interests", label: "Interests" },
  { id: "coderhub", cmd: "coderhub stats", label: "CoderHub" },
  { id: "links", cmd: "cat ~/.links", label: "Links", win: "links" },
];
