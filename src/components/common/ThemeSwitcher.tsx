"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <Button
      className={cn(className, "cursor-pointer")}
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
    >
      <SunIcon className="h-6 w-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute h-6 w-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
