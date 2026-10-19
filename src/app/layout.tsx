import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { n, ordinal } from "@/data/achievements";
import { profile } from "@/data/profile";
import stats from "@/data/stats.json";
import "./fonts/vga.css";
import "./globals.css";

// IBM VGA 8x16, the PC and Linux console font, from VileR's Ultimate Oldschool
// PC Font Pack (CC BY-SA 4.0, license next to the file). Chosen 2026-10-19 for
// the Linux console look. A 5 KB subset, since every page waits for it; the
// fallbacks in fonts/vga.css have the same 0.5 em advance, so nothing moves
// when it arrives (scripts/subset-font.py). display "block": no flash of the
// fallback.
const vga = localFont({
  src: "./fonts/WebPlus_IBM_VGA_8x16-subset.woff2",
  variable: "--font-vga",
  display: "block",
  fallback: [
    "VGA Fallback Consolas",
    "VGA Fallback Menlo",
    "VGA Fallback Courier",
    "monospace",
  ],
  adjustFontFallback: false,
});

const fy = stats.flagyard;
const [event] = fy.events;
const title = `${profile.name} — ${profile.headline}`;
const description = [
  `${profile.name} (@${profile.handle}), Riyadh. Offensive security and CTF: `,
  `FlagYard #${fy.rank} of ${n(fy.players)}`,
  event
    ? `, ${ordinal(event.rank)} of ${n(event.teams)} teams in the ${event.name} ${event.stage.toLowerCase()}.`
    : ".",
  " Founder & CEO of DRJAT, ex-COOP at SDAIA. Projects, achievements, certificates.",
].join("");

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  keywords: [
    profile.name,
    profile.handle,
    profile.fullName,
    "offensive security",
    "red teaming",
    "penetration testing",
    "CTF",
    "FlagYard",
    "DRJAT",
    "Riyadh",
  ],
  alternates: {
    canonical: "/",
    // The Markdown twin of the page, for agents (see src/proxy.ts).
    types: { "text/markdown": "/index.md" },
  },
  // Tells is-agentic.com which checks fit this site: a personal content site.
  other: { "is-agentic-site-type": "content" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
    firstName: "Omar",
    lastName: "Afet",
    username: profile.handle,
  },
  twitter: {
    card: "summary_large_image",
    site: "@OmarAfet",
    creator: "@OmarAfet",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Runs before the first paint: the "js" class turns on the typing effect, so
// without JavaScript the page prints at once. Every load boots from the top:
// the browser does not restore the scroll position unless the URL has a #hash.
const early = `document.documentElement.classList.add("js");if(!location.hash){history.scrollRestoration="manual";scrollTo(0,0)}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={vga.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: early }} />
        {children}
        {/* Only on Vercel: elsewhere the analytics script does not exist, and
            the 404 for it is a console error that costs Lighthouse points. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
