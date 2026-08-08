import Link from "next/link";

type YearGroup = { year: string; items: Project[] };

function groupByYear(projects: Project[]): YearGroup[] {
  const sorted = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const groups: YearGroup[] = [];
  for (const project of sorted) {
    const year = String(new Date(project.createdAt).getFullYear());
    const current = groups.at(-1);
    if (current?.year === year) current.items.push(project);
    else groups.push({ year, items: [project] });
  }
  return groups;
}

// The rail is brightest at the present and steps down one year at a time, so
// the fade itself reports how long ago the work happened. Mixed against a
// solid base - --border is translucent and would wash the whole rail out.
function railColor(index: number) {
  const weight = Math.max(12, 100 - index * 22);
  return `color-mix(in oklab, var(--time) ${weight}%, var(--rail-base))`;
}

function Entry({ project }: { project: Project }) {
  const body = (
    <>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {/* No bidi here: short mixed titles must keep their authored order. */}
        <h3 className="group-hover:text-time font-medium tracking-tight transition-colors">
          {project.title}
        </h3>
        {project.archived && (
          <span className="text-muted-foreground font-mono text-[0.625rem] tracking-[0.14em] uppercase">
            Archived
          </span>
        )}
        {project.link && (
          <span
            aria-hidden
            className="text-time translate-y-px text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            ↗
          </span>
        )}
      </div>
      <p className="bidi text-muted-foreground mt-1.5 text-sm leading-relaxed">
        {project.description}
      </p>
      {!project.link && (
        <p className="text-muted-foreground/70 mt-1.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase">
          No public repository
        </p>
      )}
    </>
  );

  if (!project.link) return <article>{body}</article>;

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="focus-visible:ring-ring group block rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      style={{ ["--tw-ring-offset-color" as string]: "var(--background)" }}
    >
      {body}
    </Link>
  );
}

export default function Timeline({ projects }: { projects: Project[] }) {
  const groups = groupByYear(projects);

  return (
    <ol className="mt-8">
      {groups.map(({ year, items }, index) => (
        <li
          key={year}
          className="grid gap-x-6 sm:grid-cols-[3.25rem_1fr] sm:gap-x-8"
        >
          <div
            className={`font-mono text-sm tabular-nums sm:pt-px sm:text-right ${
              index === 0 ? "text-time" : "text-muted-foreground"
            }`}
          >
            {year}
          </div>

          <div
            className="relative border-l pb-10 pl-6 sm:pl-8"
            style={{ borderColor: railColor(index) }}
          >
            <span
              aria-hidden
              className="absolute top-1.5 left-0 size-[7px] -translate-x-1/2 rounded-full"
              style={{ background: railColor(index) }}
            />
            <div className="space-y-9">
              {items.map((project) => (
                <Entry key={project.title} project={project} />
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
