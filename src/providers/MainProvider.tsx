import { ThemeProvider } from "./ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

export default function MainProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      {process.env.NODE_ENV === "production" && (
        <>
          <Analytics />
        </>
      )}
    </ThemeProvider>
  );
}
