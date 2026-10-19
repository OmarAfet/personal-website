// The archiso zsh prompt (grml config): user in red, path in bold, `#` for root.
export default function Prompt() {
  return (
    <span className="ps1" aria-hidden="true">
      <span className="u">root</span>@omarafet <span className="w">~</span>{" "}
      #{" "}
    </span>
  );
}
