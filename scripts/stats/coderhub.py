"""Prints the CoderHub numbers the site shows, as JSON on stdout.

Run it with the coderhub-mcp Python, which has the API client and the login:
    ~/Personal/VSCode/Github/coderhub-mcp/.venv/bin/python -I scripts/stats/coderhub.py
Only solve counts are printed; the account call also returns the name and email.
"""

import json
import sys

from coderhub_mcp.api import Client


def main() -> None:
    w = Client().whoami()
    json.dump(
        {
            "challenges": w["platform_challenges"],
            "solved": {lang: v["solved"] for lang, v in w["solved"].items()},
        },
        sys.stdout,
        indent=2,
    )


if __name__ == "__main__":
    main()
