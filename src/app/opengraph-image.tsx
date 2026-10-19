import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { n, ordinal } from "@/data/achievements";
import { profile } from "@/data/profile";
import stats from "@/data/stats.json";

export const alt = `${profile.name}: ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card is a screen of the same console: VGA font at 2x (16x32 cells).
const vga = await readFile(
  join(process.cwd(), "src/app/fonts/WebPlus_IBM_VGA_8x16.woff"),
);

const C = {
  gray: "#aaa",
  white: "#fff",
  red: "#f55",
  green: "#5f5",
  dim: "#555",
};

export default function Image() {
  const fy = stats.flagyard;
  const event = fy.events[0];
  const line = (children: React.ReactNode, color = C.gray) => (
    <div style={{ display: "flex", color, height: 32 }}>{children}</div>
  );
  const prompt = (cmd: string) =>
    line(
      <>
        <span style={{ color: C.red }}>root</span>
        <span>@omarafet ~ #&nbsp;</span>
        <span style={{ color: C.white }}>{cmd}</span>
      </>,
    );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 64px",
        background: "#000",
        fontFamily: "VGA",
        fontSize: 32,
      }}
    >
      {prompt("whoami")}
      {line(profile.name, C.white)}
      {line(profile.headline)}
      {line("")}
      {prompt("flagyard profile OmarAfet")}
      {line(`rank   #${fy.rank} of ${n(fy.players)} players · ${fy.level}`)}
      {event
        ? line(
            `event  ${ordinal(event.rank)} of ${n(event.teams)} teams, ${event.name}`,
          )
        : null}
      {line("")}
      {prompt("cat ~/.links")}
      {line(
        "omarafet.vercel.app · x.com/OmarAfet · github.com/OmarAfet",
        C.green,
      )}
      {line(
        <>
          <span style={{ color: C.red }}>root</span>
          <span>@omarafet ~ #&nbsp;</span>
          <span style={{ width: 16, height: 32, background: C.gray }} />
        </>,
      )}
    </div>,
    {
      ...size,
      fonts: [{ name: "VGA", data: vga, style: "normal", weight: 400 }],
    },
  );
}
