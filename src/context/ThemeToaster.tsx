"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";
// import "./toast-override.css"; // add custom animations

export default function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "slide-in-right", // apply custom animation
        },
        style:
          theme === "light"
            ? {
                background: "#ffffff",
                color: "#111111",
              }
            : {
                border: "none",
                background: "#111111",
                color: "#ffffff",
              },
      }}
    />
  );
}
