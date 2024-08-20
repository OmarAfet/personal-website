import { IconType } from "react-icons/lib";

declare global {
  interface Project {
    title: string;
    description: string;
    link: string;
    createdAt: string;
    archived: boolean;
  }

  interface Skill {
    name: string;
    level: number;
  }

  interface SocialLink {
    href: string;
    Icon: IconType;
    ariaLabel: string;
  }
}
