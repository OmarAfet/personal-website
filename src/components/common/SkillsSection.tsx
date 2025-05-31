import skills from "@/data/skills";
import { Badge } from "../ui/badge";

export default function SkillsSection() {
  // Shuffle the skills array
  skills.sort(() => Math.random() - 0.5);
  
  return (
    <div className="items-center justify-center flex w-full flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge key={index} /* style={{ opacity: skill.level / 10 + 0.1 }} */>
          {skill.name}
        </Badge>
      ))}
    </div>
  );
}
