// Separate Next.js apps served under paths of this domain (multi-zones). Each
// origin is that app's own deployment URL, e.g. https://ctf-writeups.vercel.app;
// set it in the Vercel project's environment variables. A zone whose variable
// is unset is not routed.
// - /ctf-writeups: the CTF writeups site (repo ctf-writeups), CTF_WRITEUPS_ORIGIN.
// - /coderhub: the CoderHub solutions site (repo CoderHub), CODERHUB_ORIGIN.
const zones = [
  { path: "/ctf-writeups", origin: process.env.CTF_WRITEUPS_ORIGIN },
  { path: "/coderhub", origin: process.env.CODERHUB_ORIGIN },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The whole stylesheet is a few KB, so it ships inside the HTML instead of
  // as a render-blocking request (Lighthouse, 2026-10-19: about 120 ms).
  experimental: { inlineCss: true },
  // Pages answer in HTML or Markdown by Accept (src/proxy.ts), so caches must
  // key on it. Next.js sets its own Vary on pages; this adds Accept to it.
  async headers() {
    return [
      {
        source: "/:path((?!_next/|ctf-writeups|coderhub).*)",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        // Discovery for agents on the home page (RFC 8288 Link header).
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</index.md>; rel="alternate"; type="text/markdown"',
              '</llms.txt>; rel="describedby"; type="text/plain"',
              '</docs>; rel="service-doc"; type="text/html"',
              '</.well-known/mcp>; rel="service-desc"; type="application/json"',
            ].join(", "),
          },
        ],
      },
    ];
  },
  async rewrites() {
    // beforeFiles, not the default afterFiles: Vercel rewrites a segment
    // prefetch to /path.segments/<segment>.segment.rsc before afterFiles run,
    // forwards that path with the prefetch headers, and the zone app then
    // adds the suffix a second time and returns 404. beforeFiles forwards the
    // original path, so the zone app adds the suffix once.
    return {
      beforeFiles: zones
        .filter((z) => z.origin)
        .flatMap(({ path, origin }) => [
          { source: path, destination: `${origin}${path}` },
          { source: `${path}/:path+`, destination: `${origin}${path}/:path+` },
        ]),
    };
  },
};

export default nextConfig;
