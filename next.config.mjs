// The CTF writeups site (repo ctf-writeups) is a separate Next.js app served
// under /ctf-writeups on this domain (multi-zones). CTF_WRITEUPS_ORIGIN is that
// app's own deployment URL, e.g. https://ctf-writeups.vercel.app; set it in the
// Vercel project's environment variables.
const ctfWriteups = process.env.CTF_WRITEUPS_ORIGIN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (!ctfWriteups) return [];
    return [
      { source: "/ctf-writeups", destination: `${ctfWriteups}/ctf-writeups` },
      {
        source: "/ctf-writeups/:path+",
        destination: `${ctfWriteups}/ctf-writeups/:path+`,
      },
    ];
  },
};

export default nextConfig;
