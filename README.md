# omarafet.vercel.app

Omar Afet's personal site: one page drawn as a Linux console (tty) of "OmarOS". It boots, logs
in as root, and types commands whose output is the content: `fastfetch`, `flagyard`, `bbsa`, `nmap`
(projects), `last` (experience), `cat ~/achievements.log`, `ls -l ~/certs/*`, `ls ~/badges/*`.
A shell at the end takes commands (`help`), and a tmux status line jumps between sections.

Next.js 16 (App Router, Turbopack), React 19, one plain stylesheet. No UI library.

## Layout

```
src/app/            layout, page, 404, error, icons, Open Graph image, globals.css
src/app/fonts/      IBM VGA 8x16 (woff) and its license
src/components/     Boot, Step, Prompt, Typewriter, Shell, StatusBar, Nmap
src/components/output/   the output of each command
src/data/           all content: profile, projects, achievements, certificates, badges,
                    experience, sections, art; stats.json is generated
scripts/            sync-stats.mjs and its platform scripts, make-icons.py, emblem-art.py
```

Content lives in `src/data`, not in components. To add a project, add a host to
`src/data/projects.ts`; to add a certificate, add a file to `src/data/certificates.ts`.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build (every route is static) |
| `npm run sync:stats` | Refreshes `src/data/stats.json` from FlagYard, bugbounty.sa and CoderHub, and counts the ctf-writeups pages. Prints every command it runs. Needs the logins of the three MCP repos. |
| `python3 -I scripts/make-icons.py <png>` | Builds `favicon.ico`, `icon.png` and `apple-icon.png` from the KSA emblem |
| `python3 -I scripts/emblem-art.py <png> 34 140` | Prints the emblem as half-block text for `src/data/art.ts` |
| `python3 -I scripts/subset-font.py` | Rebuilds the 5 KB WOFF2 subset of the console font (needs `pip install fonttools brotli`) |

## Decisions (2026-10-19)

- **Design: Linux console.** Chosen by Omar from a style lab of eight named styles; he wanted
  the look of a Linux installer: black screen, pixel font, commands that type themselves.
  Projects are an `nmap` scan ("attack surface"), not a timeline.
- **System name: OmarOS**, version = Omar's age. Not "Arch Linux": he does not use Arch, and
  the name made visitors think he does. The look (systemd lines, console font) is generic Linux.
- **Every load boots from the top.** Reloading replays the boot log; the scroll position is not
  restored unless the URL has a `#section`.
- **Font: IBM VGA 8x16**, the PC and Linux console font, from VileR's
  [Ultimate Oldschool PC Font Pack](https://int10h.org/oldschool-pc-fonts/), CC BY-SA 4.0
  (credited on the page, license in `src/app/fonts`). The font has no Arabic, so console text is
  Latin. Pages load a 5 KB WOFF2 subset (ASCII, Latin-1, punctuation, arrows, box and block
  characters); the full WOFF is only read at build time for the Open Graph image.
- **Headline:** "Offensive Security · CTF Player · Founder of DRJAT", to reuse on every profile.
- **Order:** offensive security first. Black Hat MEA is listed before Madar: the harder event
  with more teams. CoderHub is near the end.
- **Privacy:** no email, phone, photo or CV (none was picked). Bug bounty shows counts only:
  programs do not allow disclosure, and the account data holds the IBAN and ID number. No GPA,
  ID numbers, DRJAT trademark number or payment-gateway approval.
- **Bug bounty "valid":** accepted + duplicates (valid bugs reported first by someone else) +
  downgraded ("irrelevant severity": accepted at a lower severity, still earns points).
  Informational reports are not counted: the program saw no security impact. Severities are the
  programs' ratings; Omar's own rating of the downgraded report is shown next to it.
- **FlagYard: completion per lab, not points per category.** Omar has cleared almost every lab,
  so points per category only mirror each lab's size (the Forensics lab is the largest).
- **Typing without waiting:** pages stay readable. Without JavaScript, or with reduced motion,
  everything prints at once; any key or click prints the rest; a step that was scrolled past
  prints at once. The first command runs in CSS, so the first screen does not wait for
  JavaScript. Boot lines wait at 1% opacity instead of hidden, so the first frame is the
  Largest Contentful Paint (Lighthouse mobile performance).
- **Analytics only on Vercel:** off Vercel the script 404s, a console error (Best Practices).
- **Contrast:** dim text is #808080, not VGA #555 (2.8:1); links are underlined, as terminals
  underline hyperlinks.
- **No Tailwind, no shadcn/ui:** one stylesheet on a fixed 8x16 cell grid; widths are in `ch`.

## For agents

- **Markdown:** every page answers `Accept: text/markdown` (and `/<page>.md`, `?mode=agent`) with
  Markdown and `Vary: Accept`; a request that takes neither HTML nor Markdown gets 406; an unknown
  path asked for in Markdown gets a Markdown 404. `src/proxy.ts`, `src/lib/negotiate.ts`,
  `src/lib/markdown.ts`. Browsers (`Accept: text/html,…`) skip the proxy: that header always
  means HTML, and the proxy cost about 40 ms on the first byte.
- **llms.txt, sitemap.xml, robots.txt:** `src/app/llms.txt`, `src/app/sitemap.ts`, `src/app/robots.ts`.
- **MCP server:** `/mcp`, Streamable HTTP, stateless, six read-only tools and the Markdown pages
  as resources (`src/app/mcp/route.ts`, `src/lib/mcp.ts`). Server card at `/.well-known/mcp`.
  Hand-written, no SDK: it only answers JSON-RPC over POST.
- **Trust pages:** `/about`, `/contact`, `/privacy`, `/docs` (`src/data/pages.ts`, one source for
  the HTML and the Markdown).
- **JSON-LD:** WebSite, ProfilePage, Person and Organization (DRJAT, with its public support
  address as the contact point; Omar publishes no personal email or phone).

Checked 2026-10-19 with `npx is-agentic <url>` (is-agentic.com) and Lighthouse 13.

## Hosting

Vercel project `omarafet`. Two other Next.js apps are served under this domain (multi-zones,
`next.config.mjs`): `/ctf-writeups` (repo ctf-writeups, env `CTF_WRITEUPS_ORIGIN`) and
`/coderhub` (repo CoderHub, env `CODERHUB_ORIGIN`). Links to them are plain `<a>` tags, as
Next.js requires between zones.
