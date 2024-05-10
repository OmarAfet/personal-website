import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.link}>
      <Card className="hover:border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {project.title}
            {project.archived && <Badge>Archived</Badge>}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
