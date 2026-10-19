"""Prints the FlagYard numbers the site shows, as JSON on stdout.

Run it with the flagyard-mcp Python, which has the API client and the login:
    ~/Personal/VSCode/Github/flagyard-mcp/.venv/bin/python -I scripts/stats/flagyard.py
Only whitelisted fields are printed: the API also returns team join passwords.
"""

import json
import sys

from flagyard_mcp.api import Client

# Events the site lists, in the site's order. Black Hat MEA comes first although
# Madar is newer: it is the harder event with more teams (Omar, 2026-10-19).
EVENTS = (
    ("3468f495-a92c-498b-90c2-994dfb99ea0b", "Black Hat MEA CTF 2026", "Qualifier"),
    ("01a0e83b-fc2e-7f05-92ab-8f70e84c8739", "Madar Al-Himaya CTF", "Qualifier"),
)


def event(c: Client, me: str, event_id: str, name: str, stage: str) -> dict:
    o = c.event_overview(event_id)
    team = o["myTeam"]
    mine = [s for s in o["myTeamSolves"] if s["player"] == me]
    return {
        "name": name,
        "stage": stage,
        "end": o["event"]["eventEndAt"][:10],
        "team": team["name"],
        "captain": team["captain"] == me,
        "rank": team["rank"],
        "teams": o["totalTeams"],
        "points": team["points"],
        "teamSolves": team["solves"],
        "challenges": len(c.list_event_challenges(event_id)["challenges"]),
        "mySolves": len(mine),
        "myPoints": team["memberPoints"].get(me, 0),
        "myFirstBloods": sum(1 for s in mine if s["firstBlood"]),
        "url": o["url"],
    }


def labs(c: Client) -> list[dict]:
    """Solved / available per lab. Points per category are not shown: almost
    every lab is cleared, so they only mirror how many points each category
    offers (the Forensics lab is the largest; Omar, 2026-10-19). Retired
    challenges cannot be solved any more and are left out unless solved."""
    out = []
    for lab in c.list_labs():
        ch = c.list_lab_challenges(lab["id"])["challenges"]
        ch = [x for x in ch if x["solved"] or x["status"] != "retired"]
        if not ch:
            continue
        solved = [x for x in ch if x["solved"]]
        out.append(
            {
                "name": lab["name"],
                "solved": len(solved),
                "challenges": len(ch),
                "points": sum(x["points"] or 0 for x in solved),
                "maxPoints": sum(x["points"] or 0 for x in ch),
            }
        )
    return sorted(out, key=lambda x: (x["solved"] < x["challenges"], -x["maxPoints"]))


def main() -> None:
    c = Client()
    p = c.profile()
    me = p["username"]
    badges = c.profile_badges()
    json.dump(
        {
            "username": me,
            "url": p["url"],
            "rank": p["rank"],
            "players": c.leaderboard(1, 1)["totalItems"],
            "points": p["totalPoints"],
            "level": p["level"],
            "firstBloods": p["firstBloods"],
            "solves": len(c.profile_activity()),
            "byDifficulty": p["solvesByDifficulty"],
            "labs": labs(c),
            "badges": [
                b["name"]
                for group in ("challengesBadge", "difficultyBadges", "socialBadges")
                for b in badges.get(group, [])
                if b["earned"]
            ],
            "events": [event(c, me, *e) for e in EVENTS],
        },
        sys.stdout,
        ensure_ascii=False,
        indent=2,
    )


if __name__ == "__main__":
    main()
