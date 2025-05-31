import { Toaster } from "@/components/ui/toaster";
import MainProvider from "@/providers/MainProvider";
import type { Metadata } from "next";
import { Rubik as Font } from "next/font/google";
import "./globals.css";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omar Afet",
  description: "Computer Networks student at King Saud University, with a strong interest in AI, mathematics, and their applications in science. Freelance developer.",
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
