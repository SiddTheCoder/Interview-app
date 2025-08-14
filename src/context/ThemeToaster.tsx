"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style:
          theme === "light"
            ? {
                background: "#ffffff", // white
                color: "#111111", // black text
              }
            : {
                background: "#111111", // dark green
                color: "#ffffff", // mint text
              },
      }}
    />
  );
}
