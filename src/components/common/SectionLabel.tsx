export default function SectionLabel({
  children,
  trailing,
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="border-border flex items-baseline justify-between gap-4 border-b pb-2">
      <h2 className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
        {children}
      </h2>
      {trailing ? (
        <span className="text-muted-foreground font-mono text-xs tabular-nums">
          {trailing}
        </span>
      ) : null}
    </div>
  );
}
