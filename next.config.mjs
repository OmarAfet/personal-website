// The CTF writeups site (repo ctf-writeups) is a separate Next.js app served
// under /ctf-writeups on this domain (multi-zones). CTF_WRITEUPS_ORIGIN is that
// app's own deployment URL, e.g. https://ctf-writeups.vercel.app; set it in the
// Vercel project's environment variables.
const ctfWriteups = process.env.CTF_WRITEUPS_ORIGIN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (!ctfWriteups) return [];
    // beforeFiles, not the default afterFiles: Vercel rewrites a segment
    // prefetch to /path.segments/<segment>.segment.rsc before afterFiles run,
    // forwards that path with the prefetch headers, and the writeups app then
    // adds the suffix a second time and returns 404. beforeFiles forwards the
    // original path, so the writeups app adds the suffix once.
    return {
      beforeFiles: [
        { source: "/ctf-writeups", destination: `${ctfWriteups}/ctf-writeups` },
        {
          source: "/ctf-writeups/:path+",
          destination: `${ctfWriteups}/ctf-writeups/:path+`,
        },
      ],
    };
  },
};

export default nextConfig;
