import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function ProjectCard({ project }: { project: Project }) {
  const card = (
    <Card className={project.link ? "hover:border-foreground" : undefined}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {project.title}
          {project.archived && <Badge>Archived</Badge>}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
    </Card>
  );

  if (!project.link) return card;

  return <Link href={project.link}>{card}</Link>;
}
