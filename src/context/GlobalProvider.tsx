"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { PusherProvider } from "@/context/PusherProvider";
import SessionProvider from "@/context/AuthProvider";
import StateProvider from "@/store/StateProvider";
import ThemedToaster from "@/context/ThemeToaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PusherProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <ThemedToaster />
          {children}
        </ThemeProvider>
      </PusherProvider>
    </SessionProvider>
  );
}
