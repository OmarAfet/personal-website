"use client";

import skills from "@/data/skills";
import { Badge } from "../ui/badge";

export default function SkillsSection() {
  const randomizedSkills = skills.sort(() => Math.random() - 0.5);

  return (
    <div className="center flex w-full flex-wrap gap-2">
      {randomizedSkills.map((skill, index) => (
        <Badge key={index} style={{ opacity: skill.level / 10 + 0.1 }}>
          {skill.name}
        </Badge>
      ))}
    </div>
  );
}
