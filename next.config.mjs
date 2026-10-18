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
