import { Toaster } from "@/components/ui/toaster";
import MainProvider from "@/providers/MainProvider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

// One superfamily for both scripts, so Arabic and Latin share a voice.
const sans = IBM_Plex_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
});

// Carries the years and the section labels - the data voice.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Omar Afet",
  description:
    "Founder & CEO at DRJAT · Ex-COOP at SDAIA · Fresh Grad at King Saud University · AI · Cyber Security · Coding · Quantum Computing · Fascinated by the science of Time",
  keywords: [
    "Omar Alenezi",
    "OmarAfet",
    "Computer Networks Specialist",
    "Freelance Developer",
  ],
  metadataBase: new URL("https://omarafet.vercel.app"),
  authors: { url: "https://twitter.com/OmarAfet", name: "OmarAfet" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} !scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <MainProvider>
          {children}
          <Toaster />
        </MainProvider>
      </body>
    </html>
  );
}
