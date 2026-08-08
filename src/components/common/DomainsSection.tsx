import domains from "@/data/domains";
import SectionLabel from "./SectionLabel";

export default function DomainsSection() {
  return (
    <section>
      <SectionLabel>Works in</SectionLabel>
      <ul className="mt-5 space-y-3.5">
        {domains.map(({ name, detail }) => (
          <li key={name} className="flex flex-col gap-x-3 sm:flex-row">
            <span className="text-foreground sm:w-52 sm:shrink-0">{name}</span>
            <span className="text-muted-foreground text-sm sm:pt-0.5">
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
