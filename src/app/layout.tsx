import { Toaster } from "@/components/ui/toaster";
import MainProvider from "@/providers/MainProvider";
import type { Metadata } from "next";
import { Rubik as Font } from "next/font/google";
import "./globals.css";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omar Afet",
  description: "COOP Training at SDAIA · Self-Taught · King Saud University · AI · Cyber Security · Mathematics · Coding · Science · Quantum Computing · Fascinated by the strength and science of Time",
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
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={font.className}>
        <MainProvider>
          <div className="h-screen">{children}</div>
          <Toaster />
        </MainProvider>
      </body>
    </html>
  );
}
