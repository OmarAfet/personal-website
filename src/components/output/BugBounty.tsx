import stats from "@/data/stats.json";

const bb = stats.bugbounty;

// Counts only: programs on bugbounty.sa do not allow disclosure of reports.
// Which reports count as valid is decided in scripts/stats/bugbounty.py; the
// split (accepted, duplicates, downgraded) stays off the page (Omar, 2026-10-19).
export default function BugBounty() {
  const severity = Object.entries(bb.severity)
    .map(([level, count]) => `${count} ${level}`)
    .join(", ");
  return (
    <dl className="kv">
      <dt>platform</dt>
      <dd>
        <a href="https://bugbounty.sa">bugbounty.sa</a>
        {bb.verified ? " · verified researcher" : ""}
      </dd>
      <dt>valid</dt>
      <dd>
        <b>{bb.valid} findings</b> ({severity})
      </dd>
      <dt>details</dt>
      <dd className="dim">private, as the programs require</dd>
    </dl>
  );
}
