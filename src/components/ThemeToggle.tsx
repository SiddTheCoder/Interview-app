"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* Light theme button */}
      <Button
        variant={theme === "light" ? "outline" : "ghost"}
        size="icon"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5" />
      </Button>

      {/* Dark theme button */}
      <Button
        variant={theme === "dark" ? "outline" : "ghost"}
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  );
}
