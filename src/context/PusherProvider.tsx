"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher/pusherClient";

const PusherContext = createContext<any>(null);

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("test-channel");
    channel.bind("test-event", (data: any) => {
      console.log("📡 Received:", data);
      setEvents((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe("test-channel");
    };
  }, []);

  return (
    <PusherContext.Provider value={{ events }}>
      {children}
    </PusherContext.Provider>
  );
}

export function usePusherEvents() {
  return useContext(PusherContext);
}
