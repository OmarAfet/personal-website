"""Prints the bugbounty.sa numbers the site shows, as JSON on stdout.

Run it with the bugbounty-sa-mcp Python, which has the API client and the login:
    ~/Personal/VSCode/Github/bugbounty-sa-mcp/.venv/bin/python -I scripts/stats/bugbounty.py
Only counts leave this script. Report titles, programs and bounties stay private:
programs do not allow disclosure, and the account holds the IBAN and ID number.

What counts as a valid finding (decided with Omar, 2026-10-19):
- accepted: approved, confirmed or resolved ("resolved" = fix confirmed);
- duplicate: a valid bug that another researcher reported first;
- downgraded: "irrelevantSeverity", accepted with a lower severity than reported
  (it still earns points).
Not counted: informational (the program saw no security impact), not applicable,
out of scope, spam. Reports still in triage are counted on their own.
"""

import json
import sys
from collections import Counter

from bugbounty_sa_mcp.api import Client

KIND = {
    "approved": "accepted",
    "confirmed": "accepted",
    "resolved": "accepted",
    "duplicated": "duplicates",
    "irrelevantSeverity": "downgraded",
    "new": "triage",
    "needsMoreInfo": "triage",
    "companyReview": "triage",
}
VALID = ("accepted", "duplicates", "downgraded")
LEVELS = ("critical", "high", "medium", "low")


def main() -> None:
    c = Client()
    rows, page = [], 1
    while True:
        d = c.list_reports(page, 100)
        rows += d["reports"]
        if page >= (d.get("meta") or {}).get("last_page", 1):
            break
        page += 1
    kinds = Counter(KIND.get(r["status"]) for r in rows)
    valid = [r for r in rows if KIND.get(r["status"]) in VALID]
    severity = Counter(r["severity"] for r in valid)
    json.dump(
        {
            "verified": bool(c.whoami()["is_verified"]),
            "valid": len(valid),
            "severity": {k: severity[k] for k in LEVELS if severity[k]},
            **{k: kinds[k] for k in VALID},
            "fixed": sum(r["status"] == "resolved" for r in rows),
            "triage": kinds["triage"],
        },
        sys.stdout,
        indent=2,
    )


if __name__ == "__main__":
    main()
